import { useState, useEffect } from 'react';
import { DEFAULT_CATEGORIES, themes } from '../utils/constants';
import { loadState, saveState, getTodayDateString } from '../utils/storage';

export function useAppState() {
    const [categories, setCategories] = useState([]);
    const [theme, setTheme] = useState("dragon-dynasty");
    const [events, setEvents] = useState([]);
    const [lastResetDate, setLastResetDate] = useState(null);
    const [todos, setTodos] = useState([]);
    const [isInitialized, setIsInitialized] = useState(false);

    // Initialize state from localStorage
    useEffect(() => {
        const saved = loadState();
        const today = getTodayDateString();
        
        if (saved) {
            let loadedCategories = saved.categories || DEFAULT_CATEGORIES;
            let loadedTheme = saved.theme || "dragon-dynasty";
            let loadedEvents = saved.events || [];
            let loadedLastResetDate = saved.lastResetDate || null;
            let loadedTodos = saved.todos || [];
            
            // Check if it's a new day - reset counts if needed
            if (loadedLastResetDate !== today) {
                // Reset all category counts to 0
                loadedCategories = loadedCategories.map(cat => ({ ...cat, count: 0 }));
                
                // Recalculate counts from today's events
                const todayEvents = loadedEvents.filter(event => {
                    const eventDate = new Date(event.timestamp);
                    eventDate.setHours(0, 0, 0, 0);
                    const todayDate = new Date();
                    todayDate.setHours(0, 0, 0, 0);
                    return eventDate.getTime() === todayDate.getTime();
                });
                
                todayEvents.forEach(event => {
                    const category = loadedCategories.find(cat => cat.id === event.categoryId);
                    if (category) {
                        category.count++;
                    }
                });
                
                loadedLastResetDate = today;
            }
            
            setCategories(loadedCategories);
            setTheme(loadedTheme);
            setEvents(loadedEvents);
            setLastResetDate(loadedLastResetDate);
            setTodos(loadedTodos);
        } else {
            setCategories([...DEFAULT_CATEGORIES]);
            setEvents([]);
            setLastResetDate(today);
            setTodos([]);
        }
        
        setIsInitialized(true);
    }, []);

    // Save state whenever it changes
    useEffect(() => {
        if (isInitialized) {
            saveState({
                categories,
                theme,
                events,
                lastResetDate,
                todos
            });
        }
    }, [categories, theme, events, lastResetDate, todos, isInitialized]);

    // Apply theme to document
    useEffect(() => {
        const themeObj = themes[theme];
        if (!themeObj) return;

        const root = document.documentElement;
        const body = document.body;
        
        root.style.setProperty("--background", themeObj.colors.background);
        root.style.setProperty("--card-background", themeObj.colors.cardBackground);
        root.style.setProperty("--text", themeObj.colors.text);
        root.style.setProperty("--accent", themeObj.colors.accent);
        root.style.setProperty("--border", themeObj.colors.border);
        root.style.setProperty("--font-family", themeObj.font);
        
        if (themeObj.colors.gold) {
            root.style.setProperty("--gold", themeObj.colors.gold);
        }
        if (themeObj.colors.jade) {
            root.style.setProperty("--jade", themeObj.colors.jade);
        }
        if (themeObj.colors.lantern) {
            root.style.setProperty("--lantern", themeObj.colors.lantern);
        }
        
        body.setAttribute("data-theme", theme);
    }, [theme]);

    const incrementCategory = (categoryId) => {
        const category = categories.find(cat => cat.id === categoryId);
        const themeObj = themes[theme];
        
        if (category) {
            setCategories(cats => 
                cats.map(cat => 
                    cat.id === categoryId ? { ...cat, count: cat.count + 1 } : cat
                )
            );
        } else {
            setCategories(cats => [...cats, { id: categoryId, name: categoryId, count: 1 }]);
        }

        // Get random phrase
        const categoryPhrases = themeObj?.phrases[categoryId];
        const defaultPhrases = themeObj?.phrases?.default;
        const phrases = categoryPhrases || defaultPhrases || ["Event recorded!"];
        const phrase = phrases[Math.floor(Math.random() * phrases.length)];

        // Record event
        const event = {
            timestamp: new Date().toISOString(),
            categoryId: categoryId,
            phrase: phrase
        };
        setEvents(evts => [...evts, event]);
        
        return phrase;
    };

    const decrementCategory = (categoryId) => {
        const category = categories.find(cat => cat.id === categoryId);
        if (!category || category.count === 0) {
            return null;
        }

        setCategories(cats => 
            cats.map(cat => 
                cat.id === categoryId ? { ...cat, count: cat.count - 1 } : cat
            )
        );

        // Remove the most recent event for this category
        setEvents(evts => {
            for (let i = evts.length - 1; i >= 0; i--) {
                if (evts[i].categoryId === categoryId) {
                    return evts.filter((_, idx) => idx !== i);
                }
            }
            return evts;
        });

        const themeObj = themes[theme];
        const categoryName = themeObj?.categoryNames?.[categoryId] || category.name;
        return `Removed: ${categoryName} entry`;
    };

    const deleteCategory = (categoryId) => {
        setCategories(cats => cats.filter(cat => cat.id !== categoryId));
        setEvents(evts => evts.filter(e => e.categoryId !== categoryId));
    };

    const addCategory = (id, name) => {
        const newCat = { id: id, name: name, count: 0 };
        setCategories(cats => [...cats, newCat]);
        
        // Ensure theme fallbacks exist
        Object.keys(themes).forEach(themeKey => {
            const themeObj = themes[themeKey];
            if (!themeObj.categoryNames) themeObj.categoryNames = {};
            if (!themeObj.phrases) themeObj.phrases = {};
            if (!themeObj.categoryNames[id]) themeObj.categoryNames[id] = name;
            if (!themeObj.phrases[id]) {
                themeObj.phrases[id] = themeObj.phrases?.default ? [...themeObj.phrases.default] : ['Event added.'];
            }
        });
    };

    const changeTheme = (themeKey) => {
        setTheme(themeKey);
    };

    const getCategoryName = (categoryId) => {
        const themeObj = themes[theme];
        if (themeObj?.categoryNames?.[categoryId]) {
            return themeObj.categoryNames[categoryId];
        }
        const category = categories.find(c => c.id === categoryId);
        return category ? category.name : categoryId;
    };

    const addTodo = (text) => {
        const newTodo = {
            id: `todo-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            text: text,
            status: 'todo',
            createdAt: new Date().toISOString()
        };
        setTodos(tds => [...tds, newTodo]);
    };

    const updateTodoStatus = (todoId, newStatus) => {
        setTodos(tds => 
            tds.map(todo => 
                todo.id === todoId ? { ...todo, status: newStatus } : todo
            )
        );
    };

    const deleteTodo = (todoId) => {
        setTodos(tds => tds.filter(t => t.id !== todoId));
    };

    return {
        categories,
        theme,
        events,
        todos,
        isInitialized,
        incrementCategory,
        decrementCategory,
        deleteCategory,
        addCategory,
        changeTheme,
        getCategoryName,
        addTodo,
        updateTodoStatus,
        deleteTodo
    };
}

