import { useEffect } from 'react';

/**
 * Custom hook for keyboard shortcuts
 * @param {Object} shortcuts - Object mapping key combinations to callbacks
 * @example
 * useKeyboardShortcuts({
 *   'h': () => navigate('home'),
 *   'd': () => navigate('dashboard'),
 *   'ctrl+k': () => openSearch()
 * })
 */
export function useKeyboardShortcuts(shortcuts) {
    useEffect(() => {
        const handleKeyDown = (e) => {
            // Build key string (e.g., 'ctrl+k', 'shift+h', 'h')
            const parts = [];
            if (e.ctrlKey || e.metaKey) parts.push('ctrl');
            if (e.shiftKey) parts.push('shift');
            if (e.altKey) parts.push('alt');
            parts.push(e.key.toLowerCase());
            
            const keyString = parts.join('+');
            
            // Check if we have a handler for this key combination
            if (shortcuts[keyString]) {
                // Don't trigger if user is typing in an input
                const target = e.target;
                const isInput = target.tagName === 'INPUT' || 
                               target.tagName === 'TEXTAREA' || 
                               target.isContentEditable;
                
                if (!isInput || keyString.includes('ctrl') || keyString.includes('meta')) {
                    e.preventDefault();
                    shortcuts[keyString](e);
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [shortcuts]);
}

