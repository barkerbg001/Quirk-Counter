import { useState, useEffect, useRef } from 'react';
import logo from '../assets/logo.png';
import './Header.css';

function Header({ currentPage, onNavigate }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navRef = useRef(null);
    const toggleRef = useRef(null);
    
    const navItems = [
        { id: 'home', icon: 'home', label: 'Home', shortcut: 'H' },
        { id: 'dashboard', icon: 'dashboard', label: 'Dashboard', shortcut: 'D' },
        { id: 'event-log', icon: 'list', label: 'Event Log', shortcut: 'E' },
        { id: 'todos', icon: 'check_circle', label: 'Todos', shortcut: 'T' },
        { id: 'settings', icon: 'settings', label: 'Settings', shortcut: 'S' }
    ];

    const handleNavClick = (itemId) => {
        onNavigate(itemId);
        setMobileMenuOpen(false);
    };

    const handleLogoClick = () => {
        onNavigate('home');
        setMobileMenuOpen(false);
    };

    // Close mobile menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                mobileMenuOpen &&
                navRef.current &&
                !navRef.current.contains(event.target) &&
                toggleRef.current &&
                !toggleRef.current.contains(event.target)
            ) {
                setMobileMenuOpen(false);
            }
        };

        if (mobileMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.body.style.overflow = '';
        };
    }, [mobileMenuOpen]);

    return (
        <header>
            <div className="header-wrapper">
                <div className="header-brand" onClick={handleLogoClick}>
                    <img src={logo} alt="Quirk Counter Logo" className="logo" />
                    <h1>Quirk Counter</h1>
                </div>
                
                <button 
                    ref={toggleRef}
                    className={`mobile-menu-toggle ${mobileMenuOpen ? 'active' : ''}`}
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle menu"
                    aria-expanded={mobileMenuOpen}
                >
                    <span className="hamburger-line"></span>
                    <span className="hamburger-line"></span>
                    <span className="hamburger-line"></span>
                </button>
            </div>
            
            {mobileMenuOpen && (
                <div 
                    className="mobile-menu-overlay"
                    onClick={() => setMobileMenuOpen(false)}
                    aria-hidden="true"
                />
            )}
            <nav 
                ref={navRef}
                className={`main-nav ${mobileMenuOpen ? 'mobile-open' : ''}`} 
                role="navigation" 
                aria-label="Main navigation"
            >
                <div className="nav-items">
                    {navItems.map((item, index) => (
                        <button
                            key={item.id}
                            className={`nav-item ${currentPage === item.id ? 'active' : ''}`}
                            onClick={() => handleNavClick(item.id)}
                            aria-label={`${item.label} page`}
                            title={`${item.label} (${item.shortcut})`}
                            style={{ '--delay': `${index * 0.05}s` }}
                        >
                            <span className="nav-item-background"></span>
                            <span className="nav-item-content">
                                <span className="material-icons nav-icon">{item.icon}</span>
                                <span className="nav-label">{item.label}</span>
                            </span>
                            {currentPage === item.id && (
                                <span className="nav-active-indicator"></span>
                            )}
                        </button>
                    ))}
                </div>
            </nav>
        </header>
    );
}

export default Header;
