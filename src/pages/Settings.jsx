import { useState } from 'react';
import { themes } from '../utils/constants';
import './Settings.css';

function Settings({ appState, showToast, showDialog }) {
    const [showAddForm, setShowAddForm] = useState(false);
    const [newCategoryId, setNewCategoryId] = useState('');
    const [newCategoryName, setNewCategoryName] = useState('');

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
            showToast(`${categoryName} deleted`);
        }
    };

    if (!appState.isInitialized) {
        return <LoadingSpinner message="Loading settings..." />;
    }

    return (
        <div className="page active">
            <section className="settings-section">
                <h2 className="page-header">Settings</h2>
                
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
            </section>
        </div>
    );
}

export default Settings;

