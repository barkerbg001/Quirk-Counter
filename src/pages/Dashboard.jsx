import { useMemo, memo } from 'react';
import { themes } from '../utils/constants';
import LoadingSpinner from '../components/LoadingSpinner';
import './Dashboard.css';

function Dashboard({ appState }) {
    const analytics = useMemo(() => {
        const totals = {};
        appState.categories.forEach(cat => {
            totals[cat.id] = cat.count;
        });

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const todayEvents = appState.events.filter(event => {
            const eventDate = new Date(event.timestamp);
            eventDate.setHours(0, 0, 0, 0);
            return eventDate.getTime() === today.getTime();
        });

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

        const hourCounts = Array(24).fill(0);
        const dayCounts = Array(7).fill(0); // Last 7 days
        const now = new Date();
        
        appState.events.forEach(event => {
            const eventDate = new Date(event.timestamp);
            const hour = eventDate.getHours();
            hourCounts[hour]++;
            
            // Calculate days ago
            const daysAgo = Math.floor((now - eventDate) / (1000 * 60 * 60 * 24));
            if (daysAgo >= 0 && daysAgo < 7) {
                dayCounts[daysAgo]++;
            }
        });

        let peakHour = 0;
        let peakCount = 0;
        hourCounts.forEach((count, hour) => {
            if (count > peakCount) {
                peakCount = count;
                peakHour = hour;
            }
        });

        const total = appState.events.length;
        const maxValue = Math.max(...Object.values(totals), 1);
        const maxHourValue = Math.max(...hourCounts, 1);
        const maxDayValue = Math.max(...dayCounts, 1);
        
        // Calculate averages
        const avgPerDay = todayEvents.length > 0 ? (todayEvents.length / 24).toFixed(1) : 0;
        const avgPerCategory = appState.categories.length > 0 
            ? (total / appState.categories.length).toFixed(1) 
            : 0;

        // Calculate trends (comparing today vs yesterday)
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayEvents = appState.events.filter(event => {
            const eventDate = new Date(event.timestamp);
            eventDate.setHours(0, 0, 0, 0);
            return eventDate.getTime() === yesterday.getTime();
        });
        const trend = todayEvents.length - yesterdayEvents.length;
        const trendPercent = yesterdayEvents.length > 0 
            ? ((trend / yesterdayEvents.length) * 100).toFixed(1)
            : todayEvents.length > 0 ? 100 : 0;

        return {
            totals,
            todayEvents,
            yesterdayEvents,
            mostActive: mostActive ? appState.getCategoryName(mostActive) : null,
            mostActiveId: mostActive,
            peakHour: `${peakHour}:00`,
            peakHourNum: peakHour,
            peakCount,
            totalEvents: total,
            hourCounts,
            dayCounts,
            maxValue,
            maxHourValue,
            maxDayValue,
            avgPerDay,
            avgPerCategory,
            trend,
            trendPercent,
            categoryCounts
        };
    }, [appState.categories, appState.events, appState.getCategoryName]);

    const getManagersNote = () => {
        if (!analytics.mostActive) return "No activity recorded today.";
        
        const categoryId = analytics.mostActiveId;
        const theme = themes[appState.theme];
        
        if (appState.theme === "dragon-dynasty") {
            const notes = {
                "burp": "Many satisfied customers today!",
                "fart": "Air circulation struggling in the dining hall!",
                "bug": "Chef requests an urgent code inspection!",
                "coffee": "Staff running on high-octane fuel today!"
            };
            return notes[categoryId] || `High activity in ${analytics.mostActive} today!`;
        } else if (appState.theme === "neon-nexus") {
            const notes = {
                "burp": "Audio systems experiencing heavy load.",
                "fart": "Atmospheric sensors detecting anomalies.",
                "bug": "System diagnostics required immediately.",
                "coffee": "Energy levels at maximum capacity."
            };
            return notes[categoryId] || `High activity in ${analytics.mostActive} today!`;
        } else if (appState.theme === "forest-grove") {
            const notes = {
                "burp": "Natural moments of contentment in the grove.",
                "fart": "Gentle breezes flowing through the forest.",
                "bug": "Nature's discoveries keeping us grounded.",
                "coffee": "Fresh energy flowing like morning dew."
            };
            return notes[categoryId] || `Natural activity in ${analytics.mostActive} today!`;
        } else if (appState.theme === "ruby-sea") {
            const notes = {
                "burp": "Bubbles rising from the ocean depths!",
                "fart": "Currents stirring in the Ruby Sea.",
                "bug": "Treasures discovered in the coral reefs.",
                "coffee": "Diving deeper into the ocean's bounty."
            };
            return notes[categoryId] || `Oceanic activity in ${analytics.mostActive} today!`;
        } else {
            return `High activity in ${analytics.mostActive} today!`;
        }
    };

    const formatTime = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    if (!appState.isInitialized) {
        return <LoadingSpinner message="Loading dashboard..." />;
    }

    return (
        <div className="page active">
            <section className="dashboard-section">
                <div className="dashboard-header-container">
                    <h2 className="dashboard-header">Analytics Dashboard</h2>
                    <div className="dashboard-subtitle">Real-time insights and statistics</div>
                </div>
                
                {/* Main KPI Cards */}
                <div className="kpi-grid">
                    <div className="kpi-card kpi-card-primary">
                        <div className="kpi-icon">
                            <span className="material-icons">analytics</span>
                        </div>
                        <div className="kpi-label">Total Events</div>
                        <div className="kpi-value">{analytics.totalEvents.toLocaleString()}</div>
                        <div className="kpi-trend">
                            {analytics.trend !== 0 && (
                                <span className={`trend-indicator ${analytics.trend > 0 ? 'trend-up' : 'trend-down'}`}>
                                    <span className="material-icons">
                                        {analytics.trend > 0 ? 'trending_up' : 'trending_down'}
                                    </span>
                                    {Math.abs(analytics.trend)} ({analytics.trendPercent}%)
                                </span>
                            )}
                        </div>
                    </div>
                    
                    <div className="kpi-card">
                        <div className="kpi-icon">
                            <span className="material-icons">today</span>
                        </div>
                        <div className="kpi-label">Today's Events</div>
                        <div className="kpi-value">{analytics.todayEvents.length}</div>
                        <div className="kpi-subtext">vs {analytics.yesterdayEvents.length} yesterday</div>
                    </div>
                    
                    <div className="kpi-card">
                        <div className="kpi-icon">
                            <span className="material-icons">schedule</span>
                        </div>
                        <div className="kpi-label">Peak Hour</div>
                        <div className="kpi-value">{analytics.peakHour}</div>
                        <div className="kpi-subtext">{analytics.peakCount} events</div>
                    </div>
                    
                    <div className="kpi-card">
                        <div className="kpi-icon">
                            <span className="material-icons">star</span>
                        </div>
                        <div className="kpi-label">Most Active</div>
                        <div className={`kpi-value ${!analytics.mostActive || analytics.mostActive === "N/A" ? 'text-value' : ''}`}>
                            {analytics.mostActive || "N/A"}
                        </div>
                        {analytics.mostActiveId && (
                            <div className="kpi-subtext">
                                {analytics.categoryCounts[analytics.mostActiveId]} events today
                            </div>
                        )}
                    </div>
                </div>

                {/* Category KPI Cards - Dynamic */}
                <div className="category-kpi-section">
                    <h3 className="section-title">Category Totals</h3>
                    <div className="category-kpi-grid">
                        {appState.categories.map(category => {
                            const count = analytics.totals[category.id] || 0;
                            const todayCount = analytics.categoryCounts[category.id] || 0;
                            return (
                                <div key={category.id} className="category-kpi-card">
                                    <div className="category-kpi-header">
                                        <div className="category-kpi-name">{appState.getCategoryName(category.id)}</div>
                                        <div className="category-kpi-icon">
                                            <span className="material-icons">category</span>
                                        </div>
                                    </div>
                                    <div className="category-kpi-value">{count.toLocaleString()}</div>
                                    <div className="category-kpi-today">+{todayCount} today</div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Daily Summary */}
                <div className="daily-summary">
                    <div className="summary-card">
                        <div className="summary-header">
                            <h3 className="summary-title">
                                <span className="material-icons">summarize</span>
                                Today's Summary
                            </h3>
                        </div>
                        <div className="summary-grid">
                            <div className="summary-item">
                                <span className="summary-icon">
                                    <span className="material-icons">event</span>
                                </span>
                                <div className="summary-content">
                                    <span className="summary-label">Events Today</span>
                                    <span className="summary-value">{analytics.todayEvents.length}</span>
                                </div>
                            </div>
                            <div className="summary-item">
                                <span className="summary-icon">
                                    <span className="material-icons">schedule</span>
                                </span>
                                <div className="summary-content">
                                    <span className="summary-label">First Event</span>
                                    <span className="summary-value">
                                        {analytics.todayEvents.length > 0 
                                            ? formatTime(analytics.todayEvents[analytics.todayEvents.length - 1].timestamp)
                                            : "N/A"}
                                    </span>
                                </div>
                            </div>
                            <div className="summary-item">
                                <span className="summary-icon">
                                    <span className="material-icons">update</span>
                                </span>
                                <div className="summary-content">
                                    <span className="summary-label">Last Event</span>
                                    <span className="summary-value">
                                        {analytics.todayEvents.length > 0 
                                            ? formatTime(analytics.todayEvents[0].timestamp)
                                            : "N/A"}
                                    </span>
                                </div>
                            </div>
                            <div className="summary-item">
                                <span className="summary-icon">
                                    <span className="material-icons">trending_up</span>
                                </span>
                                <div className="summary-content">
                                    <span className="summary-label">Avg/Hour</span>
                                    <span className="summary-value">{analytics.avgPerDay}</span>
                                </div>
                            </div>
                        </div>
                        <div className="managers-note">
                            <div className="managers-note-header">
                                <span className="material-icons">note</span>
                                <strong>Manager's Note</strong>
                            </div>
                            <p>{getManagersNote()}</p>
                        </div>
                    </div>
                </div>

                {/* Category Breakdown */}
                <div className="breakdown-section">
                    <h3 className="section-title">
                        <span className="material-icons">pie_chart</span>
                        Category Breakdown
                    </h3>
                    <div className="breakdown-grid">
                        {appState.categories.map(category => {
                            const percentage = analytics.totalEvents > 0 
                                ? ((category.count / analytics.totalEvents) * 100).toFixed(1) 
                                : 0;
                            return (
                                <div key={category.id} className="breakdown-card">
                                    <div className="breakdown-header">
                                        <div className="breakdown-name">{appState.getCategoryName(category.id)}</div>
                                        <div className="breakdown-percentage">{percentage}%</div>
                                    </div>
                                    <div className="breakdown-count">{category.count.toLocaleString()}</div>
                                    <div className="breakdown-bar">
                                        <div 
                                            className="breakdown-bar-fill" 
                                            style={{ width: `${percentage}%` }}
                                        ></div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Charts Section */}
                <div className="charts-section">
                    <div className="chart-container">
                        <div className="chart-header">
                            <h3 className="section-title">
                                <span className="material-icons">bar_chart</span>
                                Events by Category
                            </h3>
                        </div>
                        <div className="bar-chart">
                            {appState.categories.map(category => {
                                const value = analytics.totals[category.id] || 0;
                                const height = analytics.maxValue > 0 ? (value / analytics.maxValue) * 100 : 0;
                                return (
                                    <div key={category.id} className="bar-item">
                                        <div className="bar-label">{appState.getCategoryName(category.id)}</div>
                                        <div className="bar-wrapper">
                                            <div 
                                                className="bar" 
                                                style={{ height: `${height}%` }}
                                                title={`${value} events`}
                                            >
                                                <div className="bar-value">{value}</div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    
                    <div className="chart-container">
                        <div className="chart-header">
                            <h3 className="section-title">
                                <span className="material-icons">show_chart</span>
                                Events Over Time (24h)
                            </h3>
                        </div>
                        <div className="line-chart">
                            <div className="line-chart-container">
                                <svg viewBox="0 0 1000 200" className="line-chart-svg">
                                    <defs>
                                        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.3" />
                                            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
                                        </linearGradient>
                                    </defs>
                                    <path
                                        d={analytics.hourCounts.reduce((path, value, hour) => {
                                            const x = (hour / 23) * 1000;
                                            const y = 200 - (value / analytics.maxHourValue) * 180;
                                            return hour === 0 
                                                ? `M ${x} ${y}` 
                                                : `${path} L ${x} ${y}`;
                                        }, '') + ` L 1000 200 L 0 200 Z`}
                                        fill="url(#lineGradient)"
                                        stroke="var(--accent)"
                                        strokeWidth="3"
                                    />
                                    <path
                                        d={analytics.hourCounts.reduce((path, value, hour) => {
                                            const x = (hour / 23) * 1000;
                                            const y = 200 - (value / analytics.maxHourValue) * 180;
                                            return hour === 0 
                                                ? `M ${x} ${y}` 
                                                : `${path} L ${x} ${y}`;
                                        }, '')}
                                        fill="none"
                                        stroke="var(--accent)"
                                        strokeWidth="3"
                                    />
                                </svg>
                                <div className="line-chart-labels">
                                    {[0, 6, 12, 18].map(hour => (
                                        <div 
                                            key={hour} 
                                            className="line-chart-label"
                                            style={{ left: `${(hour / 23) * 100}%` }}
                                        >
                                            {hour}:00
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default memo(Dashboard);
