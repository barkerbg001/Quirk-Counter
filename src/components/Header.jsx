import './Header.css';

function Header({ currentPage, onNavigate }) {
    const navItems = [
        { id: 'home', icon: 'home', label: 'Home' },
        { id: 'dashboard', icon: 'dashboard', label: 'Dashboard' },
        { id: 'event-log', icon: 'list', label: 'Event Log' },
        { id: 'todos', icon: 'check_circle', label: 'Todos' },
        { id: 'settings', icon: 'settings', label: 'Settings' }
    ];

    return (
        <header>
            <h1>Quirk Counter</h1>
            <nav className="main-nav" role="navigation" aria-label="Main navigation">
                {navItems.map(item => (
                    <button
                        key={item.id}
                        className={`nav-button ${currentPage === item.id ? 'active' : ''}`}
                        onClick={() => onNavigate(item.id)}
                        aria-label={`${item.label} page`}
                    >
                        <span className="material-icons nav-icon">{item.icon}</span>
                        <span className="nav-text">{item.label}</span>
                    </button>
                ))}
            </nav>
        </header>
    );
}

export default Header;

