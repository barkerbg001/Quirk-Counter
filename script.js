// Default categories
const DEFAULT_CATEGORIES = [
    { id: "burp", name: "Burps", count: 0 },
    { id: "fart", name: "Farts", count: 0 },
    { id: "bug", name: "Bugs Introduced", count: 0 },
    { id: "coffee", name: "Coffee Consumed", count: 0 },
    { id: "sass", name: "Sass", count: 0 }
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
        font: "'Inter', sans-serif",
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
            sass: [
                "A pinch of sass was sprinkled.",
                "Sass logged — served with attitude.",
                "Seasoned with sassiness."
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
            sass: [
                "SASS module injected.",
                "Style attitude recorded.",
                "Sass event committed to memory."
            ],
            default: [
                "Event synced to mainframe.",
                "Data point logged successfully.",
                "New entry added to database."
            ]
        }
    },
    "forest-grove": {
        name: "Forest Grove",
        colors: {
            background: "#1B4332",
            cardBackground: "#F0F7F4",
            text: "#2D3E2D",
            accent: "#52B788",
            border: "#74C69D",
            gold: "#95D5B2",
            jade: "#2D6A4F",
            lantern: "#B7E4C7"
        },
        font: "'Inter', sans-serif",
        categoryNames: {
            burp: "Forest Echoes",
            fart: "Nature's Whispers",
            bug: "Garden Discoveries",
            coffee: "Morning Dew"
        },
        phrases: {
            burp: [
                "A natural release into the forest air.",
                "The earth's satisfaction expressed.",
                "A moment of natural contentment."
            ],
            fart: [
                "A gentle breeze through the leaves.",
                "Nature's way of expressing itself.",
                "A soft whisper in the grove."
            ],
            bug: [
                "A discovery along the forest path.",
                "Nature's gentle surprises.",
                "The forest keeps us humble."
            ],
            coffee: [
                "Freshness added to the morning collection.",
                "Another moment of natural energy.",
                "The forest's vitality preserved."
            ],
            sass: [
                "A touch of nature's attitude.",
                "Sassiness grows like forest moss.",
                "Attitude added with natural flair."
            ],
            default: [
                "A moment captured in the forest light.",
                "Nature's rhythm preserved.",
                "Another note in the forest's song."
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

    // Set up navigation
    setupNavigation();

    // Render initial page
    renderCurrentPage();

    // Set up event listeners
    themeOptions.forEach(option => {
        option.addEventListener("click", () => {
            const themeKey = option.getAttribute("data-theme");
            handleThemeChange(themeKey);
        });
    });

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

    // Set up export button on event log
    const exportBtn = document.getElementById('export-events-button');
    exportBtn && exportBtn.addEventListener('click', exportEvents);
}

// Navigation state
let currentPage = 'home';

// Set up navigation
function setupNavigation() {
    const navButtons = document.querySelectorAll('.nav-button');
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const page = button.getAttribute('data-page');
            navigateToPage(page);
        });
    });
}

// Navigate to a page
function navigateToPage(page) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    
    // Show selected page
    const targetPage = document.getElementById(`page-${page}`);
    if (targetPage) {
        targetPage.classList.add('active');
    }

    // Update nav buttons
    document.querySelectorAll('.nav-button').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-page') === page) {
            btn.classList.add('active');
        }
    });

    currentPage = page;
    renderCurrentPage();
}

// Render current page content
function renderCurrentPage() {
    switch (currentPage) {
        case 'home':
            renderCards();
            break;
        case 'dashboard':
            renderDashboard();
            break;
        case 'event-log':
            renderEventTable();
            break;
        case 'settings':
            renderCategoriesList();
            break;
    }
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

// Export events as JSON and CSV
function exportEvents() {
    if (!state || !Array.isArray(state.events)) {
        showMessage('No events to export');
        return;
    }

    const now = new Date();
    const ts = now.toISOString().slice(0,19).replace(/[:T]/g, '-');

    // JSON export (events only)
    try {
        const jsonBlob = new Blob([JSON.stringify(state.events, null, 2)], { type: 'application/json' });
        downloadBlob(jsonBlob, `quirk-events-${ts}.json`);
    } catch (e) {
        console.error('Error exporting JSON:', e);
        showMessage('Failed to export JSON');
    }

    // CSV export (events with category name)
    try {
        const headers = ['timestamp', 'categoryId', 'categoryName', 'phrase'];
        const rows = [headers.join(',')];
        state.events.forEach(ev => {
            const categoryName = getCategoryName(ev.categoryId).replace(/\n/g, ' ');
            const r = [ev.timestamp, ev.categoryId, categoryName, ev.phrase];
            rows.push(r.map(escapeCSV).join(','));
        });
        const csvBlob = new Blob([rows.join('\n')], { type: 'text/csv;charset=utf-8;' });
        downloadBlob(csvBlob, `quirk-events-${ts}.csv`);
    } catch (e) {
        console.error('Error exporting CSV:', e);
        showMessage('Failed to export CSV');
    }

    showMessage('Export started — check your downloads');
}

function downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, 100);
}

function escapeCSV(value) {
    if (value === null || value === undefined) return '';
    const str = String(value);
    if (str.includes(',') || str.includes('"') || str.includes('\n')) {
        return '"' + str.replace(/"/g, '""') + '"';
    }
    return str;
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
    renderCurrentPage(); // Re-render current page with new theme
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

    // Update dashboard and settings if on those pages
    if (currentPage === 'dashboard') {
        renderDashboard();
    }
    if (currentPage === 'settings') {
        renderCategoriesList();
    }
}

// Handle counter decrement
function handleDecrement(categoryId) {
    // Find and update category
    const category = state.categories.find(cat => cat.id === categoryId);
    if (!category || category.count === 0) {
        return;
    }

    category.count--;

    // Remove the most recent event for this category
    for (let i = state.events.length - 1; i >= 0; i--) {
        if (state.events[i].categoryId === categoryId) {
            state.events.splice(i, 1);
            break;
        }
    }

    // Save to localStorage
    saveState();

    // Re-render cards
    renderCards();

    // Show confirmation message
    const categoryName = getCategoryName(categoryId);
    showMessage(`Removed: ${categoryName} entry`);

    // Update dashboard and settings if on those pages
    if (currentPage === 'dashboard') {
        renderDashboard();
    }
    if (currentPage === 'settings') {
        renderCategoriesList();
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
    renderCategoriesList();
    showMessage(`${name} category created`);
    hideAddCategoryForm();
}

// Delete category and associated events
function handleDeleteCategory(categoryId) {
    const category = state.categories.find(c => c.id === categoryId);
    if (!category) return;

    const categoryName = getCategoryName(categoryId);
    const confirmed = window.confirm(`Delete category "${categoryName}"? This will remove all associated events.`);
    if (!confirmed) return;

    // Remove category
    state.categories = state.categories.filter(c => c.id !== categoryId);

    // Remove related events
    state.events = state.events.filter(e => e.categoryId !== categoryId);

    saveState();
    renderCards();
    renderDashboard();
    renderCategoriesList();
    showMessage(`${categoryName} deleted`);
}

// Render categories list in settings
function renderCategoriesList() {
    const categoriesList = document.getElementById('categories-list');
    if (!categoriesList) return;

    categoriesList.innerHTML = '';

    if (state.categories.length === 0) {
        categoriesList.innerHTML = '<p style="text-align: center; color: var(--text); opacity: 0.7; padding: 20px;">No categories yet. Add one above!</p>';
        return;
    }

    state.categories.forEach(category => {
        const item = document.createElement('div');
        item.className = 'category-item';

        const info = document.createElement('div');
        info.className = 'category-item-info';

        const name = document.createElement('div');
        name.className = 'category-item-name';
        name.textContent = getCategoryName(category.id);

        const id = document.createElement('div');
        id.className = 'category-item-id';
        id.textContent = `ID: ${category.id}`;

        info.appendChild(name);
        info.appendChild(id);

        const count = document.createElement('div');
        count.className = 'category-item-count';
        count.textContent = category.count;

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'category-item-delete';
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => {
            handleDeleteCategory(category.id);
        });

        item.appendChild(info);
        item.appendChild(count);
        item.appendChild(deleteBtn);

        categoriesList.appendChild(item);
    });
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

        // Minus button
        const minusButton = document.createElement("button");
        minusButton.className = "minus-button";
        minusButton.textContent = "−";
        minusButton.setAttribute("aria-label", `Remove one from ${getCategoryName(category.id)}`);
        minusButton.disabled = category.count === 0;
        minusButton.addEventListener("click", (ev) => {
            ev.stopPropagation();
            handleDecrement(category.id);
        });

        const button = document.createElement("button");
        button.className = "add-button";
        button.textContent = "+";
        button.setAttribute("aria-label", `Add one to ${getCategoryName(category.id)}`);
        button.addEventListener("click", () => handleIncrement(category.id));

        // Delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-category-button';
        deleteBtn.setAttribute('aria-label', `Delete ${getCategoryName(category.id)}`);
        deleteBtn.title = 'Delete category';
        const deleteIcon = document.createElement('span');
        deleteIcon.className = 'material-icons';
        deleteIcon.textContent = 'delete';
        deleteBtn.appendChild(deleteIcon);
        deleteBtn.addEventListener('click', (ev) => {
            ev.stopPropagation();
            handleDeleteCategory(category.id);
        });

        // Button container
        const buttonContainer = document.createElement("div");
        buttonContainer.className = "card-buttons";
        buttonContainer.appendChild(minusButton);
        buttonContainer.appendChild(button);

        card.appendChild(title);
        card.appendChild(count);
        card.appendChild(deleteBtn);
        card.appendChild(buttonContainer);

        cardsContainer.appendChild(card);
    });
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
    } else if (state.theme === "neon-nexus") {
        const notes = {
            "burp": "Audio systems experiencing heavy load.",
            "fart": "Atmospheric sensors detecting anomalies.",
            "bug": "System diagnostics required immediately.",
            "coffee": "Energy levels at maximum capacity."
        };
        return notes[categoryId] || `High activity in ${mostActive} today!`;
    } else if (state.theme === "forest-grove") {
        const notes = {
            "burp": "Natural moments of contentment in the grove.",
            "fart": "Gentle breezes flowing through the forest.",
            "bug": "Nature's discoveries keeping us grounded.",
            "coffee": "Fresh energy flowing like morning dew."
        };
        return notes[categoryId] || `Natural activity in ${mostActive} today!`;
    } else {
        return `High activity in ${mostActive} today!`;
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
            <div class="kpi-value ${!mostActive || mostActive === "N/A" || !/^\d+$/.test(String(mostActive)) ? 'text-value' : ''}">${mostActive || "N/A"}</div>
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
}

// Initialize when DOM is ready
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
} else {
    init();
}

