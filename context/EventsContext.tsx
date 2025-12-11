import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Event } from '../types';

interface EventsContextType {
  events: Event[];
  addEvent: (event: Event) => void;
  isEventAdded: (id: string) => boolean;
}

const EventsContext = createContext<EventsContextType | undefined>(undefined);

export const EventsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // Initial data
    const [events, setEvents] = useState<Event[]>([
        { id: '1', title: 'Linear Algebra Exam', type: 'Exam', date: new Date(2024, 4, 15), time: '10:00 AM', location: 'Hall A' },
        { id: '2', title: 'Physics Lab Final', type: 'Exam', date: new Date(2024, 4, 18), time: '02:00 PM', location: 'Lab 3' },
        { id: '3', title: 'Project Submission', type: 'Deadline', date: new Date(2024, 4, 25), time: '11:59 PM' },
    ]);

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