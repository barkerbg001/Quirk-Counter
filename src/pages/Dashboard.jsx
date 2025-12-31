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
        appState.events.forEach(event => {
            const hour = new Date(event.timestamp).getHours();
            hourCounts[hour]++;
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

        return {
            totals,
            todayEvents,
            mostActive: mostActive ? appState.getCategoryName(mostActive) : null,
            peakHour: `${peakHour}:00`,
            totalEvents: total,
            hourCounts,
            maxValue,
            maxHourValue
        };
    }, [appState.categories, appState.events, appState.getCategoryName]);

    const getManagersNote = () => {
        if (!analytics.mostActive) return "No activity recorded today.";
        
        const categoryId = appState.categories.find(c => appState.getCategoryName(c.id) === analytics.mostActive)?.id;
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

    if (!appState.isInitialized) {
        return <LoadingSpinner message="Loading dashboard..." />;
    }

    return (
        <div className="page active">
            <section className="dashboard-section">
                <h2 className="dashboard-header">Analytics Dashboard</h2>
                
                <div className="kpi-grid">
                    <div className="kpi-card">
                        <div className="kpi-label">Total Events</div>
                        <div className="kpi-value">{analytics.totalEvents}</div>
                    </div>
                    <div className="kpi-card">
                        <div className="kpi-label">Total Burps</div>
                        <div className="kpi-value">{analytics.totals.burp || 0}</div>
                    </div>
                    <div className="kpi-card">
                        <div className="kpi-label">Total Farts</div>
                        <div className="kpi-value">{analytics.totals.fart || 0}</div>
                    </div>
                    <div className="kpi-card">
                        <div className="kpi-label">Total Bugs</div>
                        <div className="kpi-value">{analytics.totals.bug || 0}</div>
                    </div>
                    <div className="kpi-card">
                        <div className="kpi-label">Most Active Today</div>
                        <div className={`kpi-value ${!analytics.mostActive || analytics.mostActive === "N/A" ? 'text-value' : ''}`}>
                            {analytics.mostActive || "N/A"}
                        </div>
                    </div>
                    <div className="kpi-card">
                        <div className="kpi-label">Peak Hour</div>
                        <div className="kpi-value">{analytics.peakHour}</div>
                    </div>
                </div>

                <div className="daily-summary">
                    <div className="summary-card">
                        <h3 className="summary-title">Today's Summary</h3>
                        <div className="summary-grid">
                            <div className="summary-item">
                                <span className="summary-label">Events Today:</span>
                                <span className="summary-value">{analytics.todayEvents.length}</span>
                            </div>
                            <div className="summary-item">
                                <span className="summary-label">First Event:</span>
                                <span className="summary-value">
                                    {analytics.todayEvents.length > 0 
                                        ? new Date(analytics.todayEvents[analytics.todayEvents.length - 1].timestamp).toLocaleTimeString()
                                        : "N/A"}
                                </span>
                            </div>
                            <div className="summary-item">
                                <span className="summary-label">Last Event:</span>
                                <span className="summary-value">
                                    {analytics.todayEvents.length > 0 
                                        ? new Date(analytics.todayEvents[0].timestamp).toLocaleTimeString()
                                        : "N/A"}
                                </span>
                            </div>
                            <div className="summary-item">
                                <span className="summary-label">Most Active:</span>
                                <span className="summary-value">{analytics.mostActive || "N/A"}</span>
                            </div>
                        </div>
                        <div className="managers-note">
                            <strong>Manager's Note:</strong> {getManagersNote()}
                        </div>
                    </div>
                </div>

                <div className="breakdown-section">
                    <h3 className="section-title">Category Breakdown</h3>
                    <div className="breakdown-grid">
                        {appState.categories.map(category => {
                            const percentage = analytics.totalEvents > 0 
                                ? ((category.count / analytics.totalEvents) * 100).toFixed(1) 
                                : 0;
                            return (
                                <div key={category.id} className="breakdown-card">
                                    <div className="breakdown-name">{appState.getCategoryName(category.id)}</div>
                                    <div className="breakdown-count">{category.count}</div>
                                    <div className="breakdown-percentage">{percentage}%</div>
                                    <div className="breakdown-bar">
                                        <div className="breakdown-bar-fill" style={{ width: `${percentage}%` }}></div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="charts-section">
                    <div className="chart-container">
                        <h3 className="section-title">Events by Category</h3>
                        <div className="bar-chart">
                            {appState.categories.map(category => {
                                const value = analytics.totals[category.id] || 0;
                                const height = analytics.maxValue > 0 ? (value / analytics.maxValue) * 100 : 0;
                                return (
                                    <div key={category.id} className="bar-item">
                                        <div className="bar-label">{appState.getCategoryName(category.id)}</div>
                                        <div className="bar-wrapper">
                                            <div className="bar" style={{ height: `${height}%` }}></div>
                                            <div className="bar-value">{value}</div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="chart-container">
                        <h3 className="section-title">Events Over Time</h3>
                        <div className="line-chart">
                            <div className="line-chart-container">
                                <svg viewBox="0 0 1000 200" className="line-chart-svg">
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
                                    {[0, 3, 6, 9, 12, 15, 18, 21].map(hour => (
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

