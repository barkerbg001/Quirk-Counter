import { useState, useMemo } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import './EventLog.css';

function EventLog({ appState }) {
    const [sortColumn, setSortColumn] = useState('timestamp');
    const [sortDirection, setSortDirection] = useState('desc');
    const [searchQuery, setSearchQuery] = useState('');

    const sortedEvents = useMemo(() => {
        let filtered = [...appState.events];
        
        // Apply search filter
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase().trim();
            filtered = filtered.filter(event => {
                const categoryName = appState.getCategoryName(event.categoryId).toLowerCase();
                const phrase = event.phrase.toLowerCase();
                const timestamp = new Date(event.timestamp).toLocaleString().toLowerCase();
                return categoryName.includes(query) || 
                       phrase.includes(query) || 
                       timestamp.includes(query) ||
                       event.categoryId.toLowerCase().includes(query);
            });
        }
        
        // Apply sorting
        const sorted = filtered.sort((a, b) => {
            if (sortColumn === 'timestamp') {
                const dateA = new Date(a.timestamp);
                const dateB = new Date(b.timestamp);
                return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
            } else {
                const nameA = appState.getCategoryName(a.categoryId);
                const nameB = appState.getCategoryName(b.categoryId);
                return sortDirection === 'asc' 
                    ? nameA.localeCompare(nameB)
                    : nameB.localeCompare(nameA);
            }
        });
        return sorted;
    }, [appState.events, sortColumn, sortDirection, searchQuery, appState.getCategoryName]);

    const handleSort = (column) => {
        if (sortColumn === column) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortDirection('asc');
        }
    };

    const exportEvents = () => {
        if (!appState.events || appState.events.length === 0) {
            return;
        }

        const now = new Date();
        const ts = now.toISOString().slice(0, 19).replace(/[:T]/g, '-');

        // JSON export
        try {
            const jsonBlob = new Blob([JSON.stringify(appState.events, null, 2)], { type: 'application/json' });
            downloadBlob(jsonBlob, `quirk-events-${ts}.json`);
        } catch (e) {
            console.error('Error exporting JSON:', e);
        }

        // CSV export
        try {
            const headers = ['timestamp', 'categoryId', 'categoryName', 'phrase'];
            const rows = [headers.join(',')];
            appState.events.forEach(ev => {
                const categoryName = appState.getCategoryName(ev.categoryId).replace(/\n/g, ' ');
                const r = [ev.timestamp, ev.categoryId, categoryName, ev.phrase];
                rows.push(r.map(escapeCSV).join(','));
            });
            const csvBlob = new Blob([rows.join('\n')], { type: 'text/csv;charset=utf-8;' });
            downloadBlob(csvBlob, `quirk-events-${ts}.csv`);
        } catch (e) {
            console.error('Error exporting CSV:', e);
        }
    };

    const downloadBlob = (blob, filename) => {
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
    };

    const escapeCSV = (value) => {
        if (value === null || value === undefined) return '';
        const str = String(value);
        if (str.includes(',') || str.includes('"') || str.includes('\n')) {
            return '"' + str.replace(/"/g, '""') + '"';
        }
        return str;
    };

    if (!appState.isInitialized) {
        return <LoadingSpinner message="Loading events..." />;
    }

    return (
        <div className="page active">
            <section className="event-log-section">
                <div className="page-header-hero">
                    <div className="page-header-hero-content">
                        <h1 className="page-header">Event Log</h1>
                        <p className="page-header-subtitle">
                            Browse and search through all your tracked events with detailed timestamps and categories.
                        </p>
                    </div>
                </div>
                <div className="event-log-actions">
                    <input
                        type="text"
                        placeholder="Search events..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="event-search-input"
                        aria-label="Search events"
                    />
                    <button 
                        className="export-button" 
                        onClick={exportEvents}
                        title="Export events as JSON and CSV" 
                        aria-label="Export events"
                    >
                        Export
                    </button>
                </div>
                {searchQuery && (
                    <div className="search-results-info">
                        Showing {sortedEvents.length} of {appState.events.length} events
                    </div>
                )}
                <div className="table-wrapper">
                    <table className="event-table">
                        <thead>
                            <tr>
                                <th 
                                    className="sortable" 
                                    onClick={() => handleSort('timestamp')}
                                >
                                    Timestamp 
                                    <span className="sort-icon">
                                        {sortColumn === 'timestamp' ? (sortDirection === 'asc' ? '↑' : '↓') : '↕'}
                                    </span>
                                </th>
                                <th 
                                    className="sortable" 
                                    onClick={() => handleSort('category')}
                                >
                                    Category 
                                    <span className="sort-icon">
                                        {sortColumn === 'category' ? (sortDirection === 'asc' ? '↑' : '↓') : '↕'}
                                    </span>
                                </th>
                                <th>Phrase Used</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedEvents.length === 0 ? (
                                <tr>
                                    <td colSpan="3" className="no-events">
                                        {searchQuery ? 'No events match your search' : 'No events recorded yet'}
                                    </td>
                                </tr>
                            ) : (
                                sortedEvents.map((event, idx) => {
                                    const date = new Date(event.timestamp);
                                    const formattedDate = date.toLocaleString();
                                    const categoryName = appState.getCategoryName(event.categoryId);
                                    
                                    return (
                                        <tr key={idx}>
                                            <td>{formattedDate}</td>
                                            <td>{categoryName}</td>
                                            <td>{event.phrase}</td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}

export default EventLog;
