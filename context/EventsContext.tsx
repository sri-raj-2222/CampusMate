import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Event } from '../types';

interface EventsContextType {
  events: Event[];
  addEvent: (event: Event) => void;
  isEventAdded: (id: string) => boolean;
}

const EventsContext = createContext<EventsContextType | undefined>(undefined);

const STORAGE_KEY = 'campusMate_events';

const INITIAL_DATA: Event[] = [
    { id: '1', title: 'Linear Algebra Exam', type: 'Exam', date: new Date(2024, 4, 15), time: '10:00 AM', location: 'Hall A' },
    { id: '2', title: 'Physics Lab Final', type: 'Exam', date: new Date(2024, 4, 18), time: '02:00 PM', location: 'Lab 3' },
    { id: '3', title: 'Project Submission', type: 'Deadline', date: new Date(2024, 4, 25), time: '11:59 PM' },
];

export const EventsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [events, setEvents] = useState<Event[]>(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            // Need to revive Date objects because JSON stores them as strings
            return JSON.parse(saved, (key, value) => {
                if (key === 'date') return new Date(value);
                return value;
            });
        }
        return INITIAL_DATA;
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
    }, [events]);

    const addEvent = (event: Event) => {
        // Avoid duplicates
        if (!events.some(e => e.id === event.id)) {
            setEvents(prev => [...prev, event]);
        }
    };

    const isEventAdded = (id: string) => {
        return events.some(e => e.id === id);
    };

    return (
        <EventsContext.Provider value={{ events, addEvent, isEventAdded }}>
            {children}
        </EventsContext.Provider>
    );
};

export const useEvents = () => {
    const context = useContext(EventsContext);
    if (!context) {
        throw new Error('useEvents must be used within an EventsProvider');
    }
    return context;
};