import { useState, useEffect } from 'react';
import logo from '../assets/logo.png';
import './Sidebar.css';

function Sidebar({ currentPage, onNavigate }) {
    const [isCollapsed, setIsCollapsed] = useState(() => {
        // Check localStorage for saved preference
        const saved = localStorage.getItem('sidebarCollapsed');
        return saved ? JSON.parse(saved) : false;
    });
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [mobileOpen, setMobileOpen] = useState(false);

    const navItems = [
        { id: 'home', icon: 'home', label: 'Home', shortcut: 'H' },
        { id: 'dashboard', icon: 'dashboard', label: 'Dashboard', shortcut: 'D' },
        { id: 'event-log', icon: 'list', label: 'Event Log', shortcut: 'E' },
        { id: 'todos', icon: 'check_circle', label: 'Todos', shortcut: 'T' },
        { id: 'settings', icon: 'settings', label: 'Settings', shortcut: 'S' }
    ];


    const handleLogoClick = (e) => {
        // On desktop: toggle sidebar collapse/expand
        // On mobile: toggle menu open/close
        if (!isMobile) {
            e.preventDefault();
            setIsCollapsed(prev => {
                const newState = !prev;
                localStorage.setItem('sidebarCollapsed', JSON.stringify(newState));
                return newState;
            });
        } else {
            // On mobile: toggle menu
            setMobileOpen(prev => !prev);
        }
    };

    const handleLogoDoubleClick = () => {
        // Double-click navigates to home
        if (!isMobile) {
            onNavigate('home');
        }
    };

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth <= 768;
            setIsMobile(mobile);
            if (mobile) {
                setMobileOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleNavClick = (itemId) => {
        onNavigate(itemId);
        if (isMobile) {
            setMobileOpen(false);
        }
    };

    useEffect(() => {
        // Update body class for collapsed state
        if (!isMobile) {
            document.body.classList.toggle('sidebar-collapsed', isCollapsed);
        }
        return () => {
            document.body.classList.remove('sidebar-collapsed');
        };
    }, [isCollapsed, isMobile]);

    return (
        <>
            {isMobile && mobileOpen && (
                <div 
                    className="sidebar-overlay"
                    onClick={() => setMobileOpen(false)}
                    aria-hidden="true"
                />
            )}
            <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''} ${mobileOpen ? 'mobile-open' : ''}`}>
            <div className="sidebar-header">
                <div 
                    className={`sidebar-brand ${isCollapsed ? 'collapsed' : ''}`}
                    onClick={handleLogoClick}
                    onDoubleClick={handleLogoDoubleClick}
                    title={isMobile ? 'Toggle menu' : isCollapsed ? 'Click to expand, double-click for home' : 'Click to collapse, double-click for home'}
                    aria-label={isMobile ? 'Toggle menu' : isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                >
                    <img src={logo} alt="Quirk Counter Logo" className="sidebar-logo" />
                    {!isCollapsed && <h2 className="sidebar-title">Quirk Counter</h2>}
                    {!isMobile && (
                        <span className="sidebar-toggle-indicator">
                            <span className="material-icons">
                                {isCollapsed ? 'chevron_right' : 'chevron_left'}
                            </span>
                        </span>
                    )}
                </div>
            </div>

            <nav className="sidebar-nav" role="navigation" aria-label="Main navigation">
                <ul className="nav-list">
                    {navItems.map((item) => (
                        <li key={item.id}>
                            <button
                                className={`nav-link ${currentPage === item.id ? 'active' : ''}`}
                                onClick={() => handleNavClick(item.id)}
                                aria-label={`${item.label} page`}
                                title={isCollapsed || isMobile ? `${item.label} (${item.shortcut})` : `(${item.shortcut})`}
                            >
                                <span className="nav-link-icon">
                                    <span className="material-icons">{item.icon}</span>
                                </span>
                                {!isCollapsed && (
                                    <span className="nav-link-label">{item.label}</span>
                                )}
                                {!isCollapsed && (
                                    <span className="nav-link-shortcut">{item.shortcut}</span>
                                )}
                                {currentPage === item.id && (
                                    <span className="nav-link-indicator"></span>
                                )}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
        {isMobile && (
            <button
                className="mobile-sidebar-toggle"
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
            >
                <span className="material-icons">menu</span>
            </button>
        )}
        </>
    );
}

export default Sidebar;

