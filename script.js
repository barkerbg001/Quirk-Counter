// Default categories
const DEFAULT_CATEGORIES = [
    { id: "burp", name: "Burps", count: 0 },
    { id: "fart", name: "Farts", count: 0 },
    { id: "bug", name: "Bugs Introduced", count: 0 },
    { id: "coffee", name: "Coffee Consumed", count: 0 }
];

// Theme definitions
const themes = {
    "dragon-dynasty": {
        name: "Dragon Dynasty",
        colors: {
            background: "#B71C1C",
            cardBackground: "#FAFAF5",
            text: "#4E342E",
            accent: "#D4AF37",
            border: "#D4AF37",
            gold: "#D4AF37",
            jade: "#2E7D32",
            lantern: "#FFE082"
        },
        font: "'Noto Serif SC', serif",
        icons: {
            burp: "💨",
            fart: "🌬️",
            bug: "🥠",
            coffee: "☕",
            default: "🏮"
        },
        categoryNames: {
            burp: "Satisfied Belches",
            fart: "Aromatic Winds",
            bug: "Kitchen Mishaps",
            coffee: "Tea Ceremonies"
        },
        phrases: {
            burp: [
                "A satisfied burp — must've been good food!",
                "Approval from the belly!",
                "Another happy customer sound."
            ],
            fart: [
                "Kitchen exhaust… from the customer side.",
                "A mysterious aroma escapes the dining hall.",
                "A wandering scent travels past the tables."
            ],
            bug: [
                "A bug in the kitchen — not the food kind.",
                "Recipe error! Something needs fixing.",
                "This dish was undercooked… in code."
            ],
            coffee: [
                "Order added to the chef's ledger.",
                "Recorded on today's specials board.",
                "Another entry for the restaurant log."
            ],
            default: [
                "Order added to the chef's ledger.",
                "Recorded on today's specials board.",
                "Another entry for the restaurant log."
            ]
        }
    },
    "neon-nexus": {
        name: "Neon Nexus",
        colors: {
            background: "#020617",
            cardBackground: "#0f172a",
            text: "#ffffff",
            accent: "#22d3ee",
            border: "#1e293b"
        },
        font: "'JetBrains Mono', monospace",
        categoryNames: {
            burp: "Audio Packets",
            fart: "Gas Leaks",
            bug: "System Errors",
            coffee: "Energy Drinks"
        },
        phrases: {
            burp: [
                "Audio packet overflow detected.",
                "Sound wave anomaly registered.",
                "Vocal frequency spike logged."
            ],
            fart: [
                "Stealth gas leak registered.",
                "Atmospheric disturbance detected.",
                "Bio-emission signal captured."
            ],
            bug: [
                "Unhandled exception vibes.",
                "System integrity compromised.",
                "Error code: HUMAN_INTERVENTION_REQUIRED"
            ],
            coffee: [
                "Caffeine injection successful.",
                "Processing power increased by 200%.",
                "System alertness level: MAXIMUM"
            ],
            default: [
                "Event synced to mainframe.",
                "Data point logged successfully.",
                "New entry added to database."
            ]
        }
    }
};

// State management
let state = {
    categories: [],
    theme: "dragon-dynasty",
    events: [] // Array of { timestamp, categoryId, phrase }
};

// DOM elements
let cardsContainer;
let toastContainer;
let themeOptions;
let addCategoryButton;
let addCategoryForm;
let newCategoryIdInput;
let newCategoryNameInput;

// Initialize the application
function init() {
    // Get DOM elements
    cardsContainer = document.getElementById("cards-container");
    toastContainer = document.getElementById("toast-container");
    themeOptions = document.querySelectorAll(".theme-option");

    // Load state from localStorage
    loadState();

    // Apply theme
    applyTheme(state.theme);

    // Update active theme button
    updateActiveThemeButton(state.theme);

    // Render cards
    renderCards();

    // Render dashboard
    renderDashboard();

    // Set up event listeners
    themeOptions.forEach(option => {
        option.addEventListener("click", () => {
            const themeKey = option.getAttribute("data-theme");
            handleThemeChange(themeKey);
        });
    });

    // Set up undo button
    const undoButton = document.getElementById("undo-button");
    if (undoButton) {
        undoButton.addEventListener("click", handleUndoLast);
        updateUndoButtonState();
    }

    // Set up add-category UI
    addCategoryButton = document.getElementById('add-category-button');
    addCategoryForm = document.getElementById('add-category-form');
    newCategoryIdInput = document.getElementById('new-category-id');
    newCategoryNameInput = document.getElementById('new-category-name');

    if (addCategoryButton && addCategoryForm) {
        addCategoryButton.addEventListener('click', () => {
            const isShown = addCategoryForm.classList.toggle('show');
            addCategoryButton.setAttribute('aria-expanded', String(isShown));
            addCategoryForm.setAttribute('aria-hidden', String(!isShown));
            if (isShown) newCategoryIdInput.focus();
        });

        const cancelBtn = document.getElementById('add-category-cancel');
        cancelBtn && cancelBtn.addEventListener('click', () => {
            hideAddCategoryForm();
        });

        addCategoryForm.addEventListener('submit', handleAddCategorySubmit);
    }

    // Set up table sorting
    setupTableSorting();
}

// Load state from localStorage
function loadState() {
    const saved = localStorage.getItem("quirkCounterState");
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            state.categories = parsed.categories || DEFAULT_CATEGORIES;
            state.theme = parsed.theme || "dragon-dynasty";
            state.events = parsed.events || [];
        } catch (e) {
            console.error("Error loading state:", e);
            state.categories = [...DEFAULT_CATEGORIES];
            state.events = [];
        }
    } else {
        state.categories = [...DEFAULT_CATEGORIES];
        state.events = [];
    }
}

// Save state to localStorage
function saveState() {
    try {
        localStorage.setItem("quirkCounterState", JSON.stringify(state));
    } catch (e) {
        console.error("Error saving state:", e);
    }
}

// Apply theme by updating CSS variables
function applyTheme(themeKey) {
    const theme = themes[themeKey];
    if (!theme) return;

    const root = document.documentElement;
    const body = document.body;
    
    root.style.setProperty("--background", theme.colors.background);
    root.style.setProperty("--card-background", theme.colors.cardBackground);
    root.style.setProperty("--text", theme.colors.text);
    root.style.setProperty("--accent", theme.colors.accent);
    root.style.setProperty("--border", theme.colors.border);
    root.style.setProperty("--font-family", theme.font);
    
    // Set additional theme colors if they exist
    if (theme.colors.gold) {
        root.style.setProperty("--gold", theme.colors.gold);
    }
    if (theme.colors.jade) {
        root.style.setProperty("--jade", theme.colors.jade);
    }
    if (theme.colors.lantern) {
        root.style.setProperty("--lantern", theme.colors.lantern);
    }
    
    // Set data attribute for theme-specific styling
    body.setAttribute("data-theme", themeKey);
}

// Update active theme button
function updateActiveThemeButton(themeKey) {
    themeOptions.forEach(option => {
        const optionTheme = option.getAttribute("data-theme");
        if (optionTheme === themeKey) {
            option.classList.add("active");
            option.setAttribute("aria-pressed", "true");
        } else {
            option.classList.remove("active");
            option.setAttribute("aria-pressed", "false");
        }
    });
}

// Handle theme change
function handleThemeChange(themeKey) {
    state.theme = themeKey;
    applyTheme(themeKey);
    updateActiveThemeButton(themeKey);
    saveState();
    renderCards(); // Re-render to update any theme-specific styling
    renderDashboard(); // Re-render dashboard with new theme
}

// Get random phrase for category
function getRandomPhrase(categoryId) {
    const theme = themes[state.theme];
    if (!theme) return "Event recorded!";

    const categoryPhrases = theme.phrases[categoryId];
    if (categoryPhrases && categoryPhrases.length > 0) {
        return categoryPhrases[Math.floor(Math.random() * categoryPhrases.length)];
    }

    const defaultPhrases = theme.phrases.default;
    if (defaultPhrases && defaultPhrases.length > 0) {
        return defaultPhrases[Math.floor(Math.random() * defaultPhrases.length)];
    }

    return "Event recorded!";
}

// Show toast message
function showMessage(text) {
    // Create toast element
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = text;
    toast.setAttribute("role", "alert");
    
    // Add to container
    toastContainer.appendChild(toast);
    
    // Auto-dismiss after 3 seconds
    setTimeout(() => {
        dismissToast(toast);
    }, 3000);
}

// Dismiss toast with animation
function dismissToast(toast) {
    toast.classList.add("dismissing");
    setTimeout(() => {
        if (toast.parentNode) {
            toast.parentNode.removeChild(toast);
        }
    }, 300);
}

// Handle counter increment
function handleIncrement(categoryId) {
    // Find and update category
    const category = state.categories.find(cat => cat.id === categoryId);
    if (category) {
        category.count++;
    } else {
        // If category doesn't exist, add it
        state.categories.push({ id: categoryId, name: categoryId, count: 1 });
    }

    // Record event with timestamp
    const phrase = getRandomPhrase(categoryId);
    const event = {
        timestamp: new Date().toISOString(),
        categoryId: categoryId,
        phrase: phrase
    };
    state.events.push(event);

    // Save to localStorage
    saveState();

    // Re-render cards
    renderCards();

    // Show random phrase
    showMessage(phrase);

    // Add pulse animation to the clicked card
    const card = document.querySelector(`[data-category-id="${categoryId}"]`);
    if (card) {
        card.classList.add("pulse");
        setTimeout(() => {
            card.classList.remove("pulse");
        }, 500);
    }

    // Update dashboard
    renderDashboard();

    // Update undo button state
    updateUndoButtonState();
}

// Handle undo last entry
function handleUndoLast() {
    if (state.events.length === 0) {
        showMessage("No entries to undo");
        return;
    }

    // Get the last event
    const lastEvent = state.events[state.events.length - 1];
    
    // Remove the event
    state.events.pop();
    
    // Decrement the category count
    const category = state.categories.find(cat => cat.id === lastEvent.categoryId);
    if (category && category.count > 0) {
        category.count--;
    }

    // Save to localStorage
    saveState();

    // Re-render cards
    renderCards();

    // Update dashboard
    renderDashboard();

    // Update undo button state
    updateUndoButtonState();

    // Show confirmation message
    const categoryName = getCategoryName(lastEvent.categoryId);
    showMessage(`Undone: ${categoryName} entry removed`);
}

// Update undo button state (enable/disable)
function updateUndoButtonState() {
    const undoButton = document.getElementById("undo-button");
    if (!undoButton) return;

    if (state.events.length === 0) {
        undoButton.disabled = true;
        undoButton.classList.add("disabled");
    } else {
        undoButton.disabled = false;
        undoButton.classList.remove("disabled");
    }
}

// Show/hide add category form
function hideAddCategoryForm() {
    if (!addCategoryForm || !addCategoryButton) return;
    addCategoryForm.classList.remove('show');
    addCategoryForm.setAttribute('aria-hidden', 'true');
    addCategoryButton.setAttribute('aria-expanded', 'false');
    if (newCategoryIdInput) newCategoryIdInput.value = '';
    if (newCategoryNameInput) newCategoryNameInput.value = '';
}

// Validate category id (lowercase alnum, hyphen, underscore)
function isValidCategoryId(id) {
    return /^[a-z0-9_-]+$/.test(id);
}

function handleAddCategorySubmit(e) {
    e.preventDefault();
    const rawId = (newCategoryIdInput && newCategoryIdInput.value || '').trim();
    const name = (newCategoryNameInput && newCategoryNameInput.value || '').trim();

    if (!rawId || !name) {
        showMessage('Please provide both id and display name');
        return;
    }

    const id = rawId.toLowerCase();

    if (!isValidCategoryId(id)) {
        showMessage('Invalid id — use lowercase letters, numbers, - or _');
        return;
    }

    if (state.categories.some(c => c.id === id)) {
        showMessage('Category id already exists');
        return;
    }

    const newCat = { id: id, name: name, count: 0 };
    state.categories.push(newCat);

    // Ensure theme fallbacks exist so display name/phrases are available
    Object.keys(themes).forEach(themeKey => {
        const theme = themes[themeKey];
        if (!theme.categoryNames) theme.categoryNames = {};
        if (!theme.phrases) theme.phrases = {};
        if (!theme.categoryNames[id]) theme.categoryNames[id] = name;
        if (!theme.phrases[id]) theme.phrases[id] = theme.phrases && theme.phrases.default ? [...theme.phrases.default] : ['Event added.'];
    });

    saveState();
    renderCards();
    renderDashboard();
    showMessage(`${name} category created`);
    hideAddCategoryForm();
}

// Get theme-specific category name
function getCategoryName(categoryId) {
    const theme = themes[state.theme];
    if (theme && theme.categoryNames && theme.categoryNames[categoryId]) {
        return theme.categoryNames[categoryId];
    }
    // Fallback to default name
    const category = state.categories.find(c => c.id === categoryId);
    return category ? category.name : categoryId;
}

// Render all category cards
function renderCards() {
    cardsContainer.innerHTML = "";

    state.categories.forEach(category => {
        const card = document.createElement("div");
        card.className = "card";
        card.setAttribute("data-category-id", category.id);

        const title = document.createElement("div");
        title.className = "card-title";
        title.textContent = getCategoryName(category.id);

        const count = document.createElement("div");
        count.className = "card-count";
        count.textContent = category.count;

        const button = document.createElement("button");
        button.className = "add-button";
        button.textContent = "+ Add";
        button.setAttribute("aria-label", `Add one to ${getCategoryName(category.id)}`);
        button.addEventListener("click", () => handleIncrement(category.id));

        card.appendChild(title);
        card.appendChild(count);
        card.appendChild(button);

        cardsContainer.appendChild(card);
    });

    // Update undo button state
    updateUndoButtonState();
}

// ============================================
// ANALYTICS FUNCTIONS
// ============================================

// Calculate total events
function getTotalEvents() {
    return state.events.length;
}

// Calculate category totals
function getCategoryTotals() {
    const totals = {};
    state.categories.forEach(cat => {
        totals[cat.id] = cat.count;
    });
    return totals;
}

// Get events for today
function getTodayEvents() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return state.events.filter(event => {
        const eventDate = new Date(event.timestamp);
        eventDate.setHours(0, 0, 0, 0);
        return eventDate.getTime() === today.getTime();
    });
}

// Get most active category today
function getMostActiveCategoryToday() {
    const todayEvents = getTodayEvents();
    if (todayEvents.length === 0) return null;
    
    const categoryCounts = {};
    todayEvents.forEach(event => {
        categoryCounts[event.categoryId] = (categoryCounts[event.categoryId] || 0) + 1;
    });
    
    let maxCount = 0;
    let mostActive = null;
    Object.keys(categoryCounts).forEach(catId => {
        if (categoryCounts[catId] > maxCount) {
            maxCount = categoryCounts[catId];
            mostActive = catId;
        }
    });
    
    return mostActive ? getCategoryName(mostActive) : null;
}

// Get peak hour
function getPeakHour() {
    if (state.events.length === 0) return "N/A";
    
    const hourCounts = {};
    state.events.forEach(event => {
        const hour = new Date(event.timestamp).getHours();
        hourCounts[hour] = (hourCounts[hour] || 0) + 1;
    });
    
    let maxCount = 0;
    let peakHour = 0;
    Object.keys(hourCounts).forEach(hour => {
        if (hourCounts[hour] > maxCount) {
            maxCount = hourCounts[hour];
            peakHour = parseInt(hour);
        }
    });
    
    return `${peakHour}:00`;
}

// Get events per hour for line chart
function getEventsPerHour() {
    const hourCounts = Array(24).fill(0);
    state.events.forEach(event => {
        const hour = new Date(event.timestamp).getHours();
        hourCounts[hour]++;
    });
    return hourCounts;
}

// Get manager's note
function getManagersNote() {
    const mostActive = getMostActiveCategoryToday();
    if (!mostActive) return "No activity recorded today.";
    
    const categoryId = state.categories.find(c => getCategoryName(c.id) === mostActive)?.id;
    
    if (state.theme === "dragon-dynasty") {
        const notes = {
            "burp": "Many satisfied customers today!",
            "fart": "Air circulation struggling in the dining hall!",
            "bug": "Chef requests an urgent code inspection!",
            "coffee": "Staff running on high-octane fuel today!"
        };
        return notes[categoryId] || `High activity in ${mostActive} today!`;
    } else {
        const notes = {
            "burp": "Audio systems experiencing heavy load.",
            "fart": "Atmospheric sensors detecting anomalies.",
            "bug": "System diagnostics required immediately.",
            "coffee": "Energy levels at maximum capacity."
        };
        return notes[categoryId] || `High activity in ${mostActive} today!`;
    }
}

// Render KPI Cards
function renderKPIs() {
    const kpiGrid = document.getElementById("kpi-grid");
    if (!kpiGrid) return;
    
    const totals = getCategoryTotals();
    const todayEvents = getTodayEvents();
    const mostActive = getMostActiveCategoryToday();
    
    kpiGrid.innerHTML = `
        <div class="kpi-card">
            <div class="kpi-label">Total Events</div>
            <div class="kpi-value">${getTotalEvents()}</div>
        </div>
        <div class="kpi-card">
            <div class="kpi-label">Total Burps</div>
            <div class="kpi-value">${totals.burp || 0}</div>
        </div>
        <div class="kpi-card">
            <div class="kpi-label">Total Farts</div>
            <div class="kpi-value">${totals.fart || 0}</div>
        </div>
        <div class="kpi-card">
            <div class="kpi-label">Total Bugs</div>
            <div class="kpi-value">${totals.bug || 0}</div>
        </div>
        <div class="kpi-card">
            <div class="kpi-label">Most Active Today</div>
            <div class="kpi-value">${mostActive || "N/A"}</div>
        </div>
        <div class="kpi-card">
            <div class="kpi-label">Peak Hour</div>
            <div class="kpi-value">${getPeakHour()}</div>
        </div>
    `;
    
    // Add animation
    kpiGrid.querySelectorAll('.kpi-card').forEach(card => {
        card.style.animation = 'none';
        setTimeout(() => {
            card.style.animation = 'kpiUpdate 0.5s ease';
        }, 10);
    });
}

// Render Category Breakdown
function renderBreakdownGrid() {
    const breakdownGrid = document.getElementById("breakdown-grid");
    if (!breakdownGrid) return;
    
    const total = getTotalEvents();
    breakdownGrid.innerHTML = "";
    
    state.categories.forEach(category => {
        const percentage = total > 0 ? ((category.count / total) * 100).toFixed(1) : 0;
        const card = document.createElement("div");
        card.className = "breakdown-card";
        card.innerHTML = `
            <div class="breakdown-name">${getCategoryName(category.id)}</div>
            <div class="breakdown-count">${category.count}</div>
            <div class="breakdown-percentage">${percentage}%</div>
            <div class="breakdown-bar">
                <div class="breakdown-bar-fill" style="width: ${percentage}%"></div>
            </div>
        `;
        breakdownGrid.appendChild(card);
    });
}

// Render Bar Chart
function renderBarChart() {
    const barChart = document.getElementById("bar-chart");
    if (!barChart) return;
    
    const totals = getCategoryTotals();
    const maxValue = Math.max(...Object.values(totals), 1);
    
    barChart.innerHTML = "";
    
    state.categories.forEach(category => {
        const value = totals[category.id] || 0;
        const height = maxValue > 0 ? (value / maxValue) * 100 : 0;
        
        const barContainer = document.createElement("div");
        barContainer.className = "bar-item";
        barContainer.innerHTML = `
            <div class="bar-label">${getCategoryName(category.id)}</div>
            <div class="bar-wrapper">
                <div class="bar" style="height: ${height}%"></div>
                <div class="bar-value">${value}</div>
            </div>
        `;
        barChart.appendChild(barContainer);
    });
}

// Render Line Chart
function renderLineChart() {
    const lineChart = document.getElementById("line-chart");
    if (!lineChart) return;
    
    const hourData = getEventsPerHour();
    const maxValue = Math.max(...hourData, 1);
    
    lineChart.innerHTML = "";
    
    // Create grid
    const chartContainer = document.createElement("div");
    chartContainer.className = "line-chart-container";
    
    // Create line path
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 1000 200");
    svg.setAttribute("class", "line-chart-svg");
    
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    let pathData = "";
    
    hourData.forEach((value, hour) => {
        const x = (hour / 23) * 1000;
        const y = 200 - (value / maxValue) * 180;
        if (hour === 0) {
            pathData = `M ${x} ${y}`;
        } else {
            pathData += ` L ${x} ${y}`;
        }
    });
    
    path.setAttribute("d", pathData);
    path.setAttribute("fill", "none");
    path.setAttribute("stroke", "var(--accent)");
    path.setAttribute("stroke-width", "3");
    svg.appendChild(path);
    
    // Add hour labels
    const labelsContainer = document.createElement("div");
    labelsContainer.className = "line-chart-labels";
    
    for (let i = 0; i < 24; i += 3) {
        const label = document.createElement("div");
        label.className = "line-chart-label";
        label.textContent = `${i}:00`;
        label.style.left = `${(i / 23) * 100}%`;
        labelsContainer.appendChild(label);
    }
    
    chartContainer.appendChild(svg);
    chartContainer.appendChild(labelsContainer);
    lineChart.appendChild(chartContainer);
}

// Render Event Table
function renderEventTable() {
    const tableBody = document.getElementById("event-table-body");
    if (!tableBody) return;
    
    // Sort events by timestamp (newest first)
    const sortedEvents = [...state.events].sort((a, b) => 
        new Date(b.timestamp) - new Date(a.timestamp)
    );
    
    tableBody.innerHTML = "";
    
    if (sortedEvents.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="3" class="no-events">No events recorded yet</td></tr>';
        return;
    }
    
    sortedEvents.forEach(event => {
        const row = document.createElement("tr");
        const date = new Date(event.timestamp);
        const formattedDate = date.toLocaleString();
        const categoryName = getCategoryName(event.categoryId);
        
        row.innerHTML = `
            <td>${formattedDate}</td>
            <td>${categoryName}</td>
            <td>${event.phrase}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Setup table sorting
function setupTableSorting() {
    const sortableHeaders = document.querySelectorAll('.sortable');
    let currentSort = { column: null, direction: 'asc' };
    
    sortableHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const column = header.getAttribute('data-sort');
            const direction = currentSort.column === column && currentSort.direction === 'asc' ? 'desc' : 'asc';
            currentSort = { column, direction };
            
            sortTable(column, direction);
            updateSortIcons(header, direction);
        });
    });
}

function sortTable(column, direction) {
    const tableBody = document.getElementById("event-table-body");
    if (!tableBody) return;
    
    const rows = Array.from(tableBody.querySelectorAll('tr'));
    if (rows.length === 0) return;
    
    rows.sort((a, b) => {
        const aVal = a.cells[column === 'timestamp' ? 0 : 1].textContent;
        const bVal = b.cells[column === 'timestamp' ? 0 : 1].textContent;
        
        if (column === 'timestamp') {
            return direction === 'asc' 
                ? new Date(aVal) - new Date(bVal)
                : new Date(bVal) - new Date(aVal);
        } else {
            return direction === 'asc' 
                ? aVal.localeCompare(bVal)
                : bVal.localeCompare(aVal);
        }
    });
    
    rows.forEach(row => tableBody.appendChild(row));
}

function updateSortIcons(activeHeader, direction) {
    document.querySelectorAll('.sort-icon').forEach(icon => {
        icon.textContent = '↕';
    });
    const icon = activeHeader.querySelector('.sort-icon');
    icon.textContent = direction === 'asc' ? '↑' : '↓';
}

// Render Daily Summary
function renderDailySummary() {
    const dailySummary = document.getElementById("daily-summary");
    if (!dailySummary) return;
    
    const todayEvents = getTodayEvents();
    const firstEvent = todayEvents.length > 0 ? todayEvents[todayEvents.length - 1] : null;
    const lastEvent = todayEvents.length > 0 ? todayEvents[0] : null;
    const mostActive = getMostActiveCategoryToday();
    
    dailySummary.innerHTML = `
        <div class="summary-card">
            <h3 class="summary-title">Today's Summary</h3>
            <div class="summary-grid">
                <div class="summary-item">
                    <span class="summary-label">Events Today:</span>
                    <span class="summary-value">${todayEvents.length}</span>
                </div>
                <div class="summary-item">
                    <span class="summary-label">First Event:</span>
                    <span class="summary-value">${firstEvent ? new Date(firstEvent.timestamp).toLocaleTimeString() : "N/A"}</span>
                </div>
                <div class="summary-item">
                    <span class="summary-label">Last Event:</span>
                    <span class="summary-value">${lastEvent ? new Date(lastEvent.timestamp).toLocaleTimeString() : "N/A"}</span>
                </div>
                <div class="summary-item">
                    <span class="summary-label">Most Active:</span>
                    <span class="summary-value">${mostActive || "N/A"}</span>
                </div>
            </div>
            <div class="managers-note">
                <strong>Manager's Note:</strong> ${getManagersNote()}
            </div>
        </div>
    `;
}

// Main dashboard render function
function renderDashboard() {
    renderKPIs();
    renderDailySummary();
    renderBreakdownGrid();
    renderBarChart();
    renderLineChart();
    renderEventTable();
}

// Initialize when DOM is ready
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
} else {
    init();
}

