import { useEffect, useRef } from 'react';

export function useReminders(reminders, categories, getCategoryName, showToast, updateReminder) {
    const intervalRef = useRef(null);
    const triggeredRef = useRef(new Set());

    useEffect(() => {
        // Request notification permission on mount
        if ('Notification' in window && Notification.permission === 'default') {
            Notification.requestPermission();
        }

        // Check reminders every minute
        const checkReminders = () => {
            const now = new Date();
            const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
            
            reminders.forEach(reminder => {
                if (!reminder.enabled) return;
                
                const category = categories.find(c => c.id === reminder.categoryId);
                if (!category) return;

                // Check if it's time for this reminder
                if (reminder.time === currentTime) {
                    const reminderKey = `${reminder.categoryId}-${currentTime}`;
                    
                    // Check if we already triggered this reminder in the last minute
                    const lastTriggered = reminder.lastTriggered 
                        ? new Date(reminder.lastTriggered)
                        : null;
                    
                    const shouldTrigger = !lastTriggered || 
                        (now - lastTriggered) > 60000; // At least 1 minute since last trigger
                    
                    if (shouldTrigger && !triggeredRef.current.has(reminderKey)) {
                        const categoryName = getCategoryName(reminder.categoryId);
                        const message = `⏰ Time to track ${categoryName}!`;
                        
                        // Show in-app toast
                        if (showToast) {
                            showToast(message, 5000);
                        }
                        
                        // Show browser notification if permission granted
                        if ('Notification' in window && Notification.permission === 'granted') {
                            try {
                                new Notification('Quirk Counter Reminder', {
                                    body: message,
                                    icon: '/favicon.ico',
                                    tag: reminderKey, // Prevent duplicates
                                    requireInteraction: false
                                });
                            } catch (e) {
                                console.error('Error showing notification:', e);
                            }
                        }
                        
                        // Update lastTriggered timestamp
                        if (updateReminder) {
                            updateReminder(reminder.categoryId, { lastTriggered: now.toISOString() });
                        }
                        
                        // Mark as triggered for this minute
                        triggeredRef.current.add(reminderKey);
                        
                        // Clear after 2 minutes to allow next trigger
                        setTimeout(() => {
                            triggeredRef.current.delete(reminderKey);
                        }, 120000);
                    }
                }
            });
        };

        // Check immediately
        checkReminders();
        
        // Then check every minute
        intervalRef.current = setInterval(checkReminders, 60000);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
            triggeredRef.current.clear();
        };
    }, [reminders, categories, getCategoryName, showToast, updateReminder]);

    return null;
}

