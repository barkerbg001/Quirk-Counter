import { useEffect } from 'react';
import logo from '../assets/logo.png';
import './About.css';

function About({ onNavigate }) {
    useEffect(() => {
        // Mark that user has seen the about page
        localStorage.setItem('hasSeenAbout', 'true');
    }, []);

    const features = [
        {
            icon: 'track_changes',
            title: 'Track Events',
            description: 'Count and track any quirky events with customizable categories'
        },
        {
            icon: 'analytics',
            title: 'Analytics Dashboard',
            description: 'Comprehensive insights with charts, trends, and statistics'
        },
        {
            icon: 'palette',
            title: 'Beautiful Themes',
            description: 'Four stunning themes to match your style and mood'
        },
        {
            icon: 'checklist',
            title: 'Todo Management',
            description: 'Built-in Kanban board for managing your tasks'
        },
        {
            icon: 'search',
            title: 'Smart Search',
            description: 'Find events quickly with real-time search and filtering'
        },
        {
            icon: 'download',
            title: 'Data Export',
            description: 'Export your data as JSON or CSV for backup or analysis'
        }
    ];

    const themes = [
        {
            name: 'Dragon Dynasty',
            emoji: '🐉',
            color: '#D4AF37',
            description: 'Chinese restaurant-inspired with warm golds and elegant styling'
        },
        {
            name: 'Neon Nexus',
            emoji: '⚡',
            color: '#22d3ee',
            description: 'Cyberpunk vibes with neon blues and futuristic aesthetics'
        },
        {
            name: 'Forest Grove',
            emoji: '🌲',
            color: '#52B788',
            description: 'Nature-inspired with earthy greens and organic tones'
        },
        {
            name: 'Ruby Sea',
            emoji: '💎',
            color: '#FF4C5A',
            description: 'Oceanic theme with coral reds and deep sea blues'
        }
    ];

    return (
        <div className="page active about-page">
            <div className="about-hero">
                <div className="hero-content">
                    <div className="hero-logo">
                        <img src={logo} alt="Quirk Counter Logo" className="about-logo" />
                    </div>
                    <h1 className="hero-title">Welcome to Quirk Counter</h1>
                    <p className="hero-subtitle">
                        Track your quirky moments, habits, and events with style. 
                        A beautiful, feature-rich counter app with analytics, themes, and more.
                    </p>
                    <div className="hero-actions">
                        <button 
                            className="cta-button primary"
                            onClick={() => onNavigate('home')}
                        >
                            <span className="material-icons">play_arrow</span>
                            Get Started
                        </button>
                        <button 
                            className="cta-button secondary"
                            onClick={() => onNavigate('dashboard')}
                        >
                            <span className="material-icons">dashboard</span>
                            View Dashboard
                        </button>
                    </div>
                </div>
            </div>

            <div className="about-section">
                <h2 className="section-title">What is Quirk Counter?</h2>
                <p className="section-description">
                    Quirk Counter is a modern, feature-rich event tracking application that helps you 
                    count and analyze any type of event or habit. Whether you're tracking burps, 
                    coffee cups, bugs fixed, or anything else quirky, Quirk Counter makes it fun 
                    and insightful with beautiful themes, comprehensive analytics, and an intuitive interface.
                </p>
            </div>

            <div className="about-section features-section">
                <h2 className="section-title">Key Features</h2>
                <div className="features-grid">
                    {features.map((feature, index) => (
                        <div key={index} className="feature-card">
                            <div className="feature-icon">
                                <span className="material-icons">{feature.icon}</span>
                            </div>
                            <h3 className="feature-title">{feature.title}</h3>
                            <p className="feature-description">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="about-section themes-section">
                <h2 className="section-title">Beautiful Themes</h2>
                <p className="section-description">
                    Choose from four stunning themes, each with unique colors, fonts, and styling. 
                    The logo even adapts to match your chosen theme!
                </p>
                <div className="themes-grid">
                    {themes.map((theme, index) => (
                        <div key={index} className="theme-preview-card">
                            <div className="theme-emoji">{theme.emoji}</div>
                            <h3 className="theme-name">{theme.name}</h3>
                            <p className="theme-description">{theme.description}</p>
                            <div 
                                className="theme-color-swatch"
                                style={{ backgroundColor: theme.color }}
                            ></div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="about-section cta-section">
                <h2 className="section-title">Ready to Start Tracking?</h2>
                <p className="section-description">
                    Join thousands of users tracking their quirky moments. 
                    Get started in seconds - no account required!
                </p>
                <div className="cta-buttons">
                    <button 
                        className="cta-button primary large"
                        onClick={() => onNavigate('home')}
                    >
                        <span className="material-icons">rocket_launch</span>
                        Start Tracking Now
                    </button>
                </div>
            </div>

            <div className="about-section quick-links">
                <h2 className="section-title">Quick Links</h2>
                <div className="quick-links-grid">
                    <button 
                        className="quick-link-card"
                        onClick={() => onNavigate('home')}
                    >
                        <span className="material-icons">home</span>
                        <span>Home</span>
                    </button>
                    <button 
                        className="quick-link-card"
                        onClick={() => onNavigate('dashboard')}
                    >
                        <span className="material-icons">dashboard</span>
                        <span>Dashboard</span>
                    </button>
                    <button 
                        className="quick-link-card"
                        onClick={() => onNavigate('event-log')}
                    >
                        <span className="material-icons">list</span>
                        <span>Event Log</span>
                    </button>
                    <button 
                        className="quick-link-card"
                        onClick={() => onNavigate('todos')}
                    >
                        <span className="material-icons">check_circle</span>
                        <span>Todos</span>
                    </button>
                    <button 
                        className="quick-link-card"
                        onClick={() => onNavigate('settings')}
                    >
                        <span className="material-icons">settings</span>
                        <span>Settings</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default About;

