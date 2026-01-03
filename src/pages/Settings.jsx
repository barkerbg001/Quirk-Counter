import { useState } from 'react';
import { themes } from '../utils/constants';
import LoadingSpinner from '../components/LoadingSpinner';
import './Settings.css';

function Settings({ appState, showToast, showDialog }) {
    const [showAddForm, setShowAddForm] = useState(false);
    const [newCategoryId, setNewCategoryId] = useState('');
    const [newCategoryName, setNewCategoryName] = useState('');
    const [editingReminder, setEditingReminder] = useState(null);
    const [reminderTime, setReminderTime] = useState('09:00');

    const handleThemeChange = (themeKey) => {
        appState.changeTheme(themeKey);
    };

    const isValidCategoryId = (id) => {
        return /^[a-z0-9_-]+$/.test(id);
    };

    const handleAddCategory = (e) => {
        e.preventDefault();
        const rawId = newCategoryId.trim();
        const name = newCategoryName.trim();

        if (!rawId || !name) {
            showToast('Please provide both id and display name');
            return;
        }

        const id = rawId.toLowerCase();

        if (!isValidCategoryId(id)) {
            showToast('Invalid id — use lowercase letters, numbers, - or _');
            return;
        }

        if (appState.categories.some(c => c.id === id)) {
            showToast('Category id already exists');
            return;
        }

        appState.addCategory(id, name);
        showToast(`${name} category created`);
        setShowAddForm(false);
        setNewCategoryId('');
        setNewCategoryName('');
    };

    const handleDeleteCategory = async (categoryId) => {
        const categoryName = appState.getCategoryName(categoryId);
        const confirmed = await showDialog(`Delete category "${categoryName}"? This will remove all associated events.`);
        
        if (confirmed) {
            appState.deleteCategory(categoryId);
            // Also delete any reminders for this category
            appState.deleteReminder(categoryId);
            showToast(`${categoryName} deleted`);
        }
    };

    const handleAddReminder = (categoryId) => {
        appState.addReminder(categoryId, reminderTime, true);
        showToast('Reminder added');
        setEditingReminder(null);
        setReminderTime('09:00');
    };

    const handleUpdateReminder = (categoryId) => {
        appState.updateReminder(categoryId, { time: reminderTime });
        showToast('Reminder updated');
        setEditingReminder(null);
        setReminderTime('09:00');
    };

    const handleDeleteReminder = async (categoryId) => {
        const categoryName = appState.getCategoryName(categoryId);
        const confirmed = await showDialog(`Delete reminder for "${categoryName}"?`);
        
        if (confirmed) {
            appState.deleteReminder(categoryId);
            showToast('Reminder deleted');
        }
    };

    const handleRequestNotificationPermission = async () => {
        if ('Notification' in window) {
            const permission = await Notification.requestPermission();
            if (permission === 'granted') {
                showToast('Notifications enabled! You\'ll receive gentle reminders.');
            } else if (permission === 'denied') {
                showToast('Notifications blocked. Please enable them in your browser settings.');
            }
        } else {
            showToast('Your browser doesn\'t support notifications.');
        }
    };

    const getReminderForCategory = (categoryId) => {
        return appState.reminders.find(r => r.categoryId === categoryId);
    };

    if (!appState.isInitialized) {
        return <LoadingSpinner message="Loading settings..." />;
    }

    return (
        <div className="page active">
            <section className="settings-section">
                <div className="page-header-hero">
                    <div className="page-header-hero-content">
                        <h1 className="page-header">Settings</h1>
                        <p className="page-header-subtitle">
                            Customize your Quirk Counter experience with themes, categories, and preferences.
                        </p>
                    </div>
                </div>
                
                <div className="settings-group">
                    <h3 className="settings-title">Theme</h3>
                    <div className="theme-toggle" role="group" aria-label="Select theme">
                        {Object.keys(themes).map(themeKey => (
                            <button
                                key={themeKey}
                                className={`theme-option ${appState.theme === themeKey ? 'active' : ''}`}
                                onClick={() => handleThemeChange(themeKey)}
                                aria-pressed={appState.theme === themeKey}
                                aria-label={`${themes[themeKey].name} theme`}
                                title={themes[themeKey].name}
                            >
                                <span className="material-icons theme-icon">
                                    {themeKey === 'dragon-dynasty' ? 'auto_awesome' : 
                                     themeKey === 'neon-nexus' ? 'bolt' : 
                                     themeKey === 'forest-grove' ? 'park' : 'water'}
                                </span>
                                <span className="theme-name">{themes[themeKey].name}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="settings-group">
                    <div className="settings-title-row">
                        <h3 className="settings-title">Categories</h3>
                        <button
                            className="add-category-button-inline"
                            onClick={() => {
                                setShowAddForm(!showAddForm);
                            }}
                            aria-expanded={showAddForm}
                            title="Add category"
                        >
                            ＋
                        </button>
                    </div>
                    <div className="add-category-wrapper">
                        <form
                            className={`add-category-form ${showAddForm ? 'show' : ''}`}
                            aria-hidden={!showAddForm}
                            onSubmit={handleAddCategory}
                        >
                            <input
                                type="text"
                                placeholder="id (no spaces)"
                                aria-label="New category id"
                                value={newCategoryId}
                                onChange={(e) => setNewCategoryId(e.target.value)}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Display name"
                                aria-label="New category display name"
                                value={newCategoryName}
                                onChange={(e) => setNewCategoryName(e.target.value)}
                                required
                            />
                            <div className="add-category-actions">
                                <button type="submit" className="add-category-submit">Create</button>
                                <button
                                    type="button"
                                    className="add-category-cancel"
                                    onClick={() => {
                                        setShowAddForm(false);
                                        setNewCategoryId('');
                                        setNewCategoryName('');
                                    }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="categories-list">
                        {appState.categories.length === 0 ? (
                            <p style={{ textAlign: 'center', color: 'var(--text)', opacity: 0.7, padding: '20px' }}>
                                No categories yet. Add one above!
                            </p>
                        ) : (
                            appState.categories.map(category => (
                                <div key={category.id} className="category-item">
                                    <div className="category-item-info">
                                        <div className="category-item-name">
                                            {appState.getCategoryName(category.id)}
                                        </div>
                                        <div className="category-item-id">ID: {category.id}</div>
                                    </div>
                                    <div className="category-item-count">{category.count}</div>
                                    <button
                                        className="category-item-delete"
                                        onClick={() => handleDeleteCategory(category.id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                <div className="settings-group">
                    <div className="settings-title-row">
                        <h3 className="settings-title">Smart Reminders</h3>
                        {('Notification' in window && Notification.permission !== 'granted') && (
                            <button
                                className="notification-permission-button"
                                onClick={handleRequestNotificationPermission}
                                title="Enable browser notifications"
                            >
                                <span className="material-icons">notifications_off</span>
                                Enable Notifications
                            </button>
                        )}
                    </div>
                    <p className="settings-description">
                        Set gentle reminders to help you never miss tracking your habits. 
                        Reminders will show as in-app notifications and browser notifications (if enabled).
                    </p>
                    
                    {appState.categories.length === 0 ? (
                        <p style={{ textAlign: 'center', color: 'var(--text)', opacity: 0.7, padding: '20px' }}>
                            Add categories first to set up reminders.
                        </p>
                    ) : (
                        <div className="reminders-list">
                            {appState.categories.map(category => {
                                const reminder = getReminderForCategory(category.id);
                                const isEditing = editingReminder === category.id;
                                
                                return (
                                    <div key={category.id} className="reminder-item">
                                        <div className="reminder-item-info">
                                            <div className="reminder-item-name">
                                                {appState.getCategoryName(category.id)}
                                            </div>
                                            {reminder && !isEditing && (
                                                <div className="reminder-item-time">
                                                    <span className="material-icons">schedule</span>
                                                    {reminder.time}
                                                    {reminder.enabled ? (
                                                        <span className="reminder-status enabled">Active</span>
                                                    ) : (
                                                        <span className="reminder-status disabled">Paused</span>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                        
                                        {isEditing ? (
                                            <div className="reminder-edit-form">
                                                <input
                                                    type="time"
                                                    value={reminderTime}
                                                    onChange={(e) => setReminderTime(e.target.value)}
                                                    className="reminder-time-input"
                                                />
                                                <div className="reminder-edit-actions">
                                                    <button
                                                        className="reminder-save-button"
                                                        onClick={() => {
                                                            if (reminder) {
                                                                handleUpdateReminder(category.id);
                                                            } else {
                                                                handleAddReminder(category.id);
                                                            }
                                                        }}
                                                    >
                                                        Save
                                                    </button>
                                                    <button
                                                        className="reminder-cancel-button"
                                                        onClick={() => {
                                                            setEditingReminder(null);
                                                            setReminderTime('09:00');
                                                        }}
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="reminder-item-actions">
                                                {reminder ? (
                                                    <>
                                                        <button
                                                            className="reminder-toggle-button"
                                                            onClick={() => {
                                                                appState.toggleReminder(category.id);
                                                                showToast(reminder.enabled ? 'Reminder paused' : 'Reminder enabled');
                                                            }}
                                                            title={reminder.enabled ? 'Pause reminder' : 'Enable reminder'}
                                                        >
                                                            <span className="material-icons">
                                                                {reminder.enabled ? 'notifications' : 'notifications_off'}
                                                            </span>
                                                        </button>
                                                        <button
                                                            className="reminder-edit-button"
                                                            onClick={() => {
                                                                setEditingReminder(category.id);
                                                                setReminderTime(reminder.time);
                                                            }}
                                                            title="Edit reminder"
                                                        >
                                                            <span className="material-icons">edit</span>
                                                        </button>
                                                        <button
                                                            className="reminder-delete-button"
                                                            onClick={() => handleDeleteReminder(category.id)}
                                                            title="Delete reminder"
                                                        >
                                                            <span className="material-icons">delete</span>
                                                        </button>
                                                    </>
                                                ) : (
                                                    <button
                                                        className="reminder-add-button"
                                                        onClick={() => {
                                                            setEditingReminder(category.id);
                                                            setReminderTime('09:00');
                                                        }}
                                                        title="Add reminder"
                                                    >
                                                        <span className="material-icons">add</span>
                                                        Add Reminder
                                                    </button>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}

export default Settings;

