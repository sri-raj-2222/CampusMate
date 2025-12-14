import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Announcement } from '../types';

interface AnnouncementsContextType {
  announcements: Announcement[];
  addAnnouncement: (announcement: Announcement) => void;
  deleteAnnouncement: (id: string) => void;
}

const AnnouncementsContext = createContext<AnnouncementsContextType | undefined>(undefined);

const STORAGE_KEY = 'campusMate_announcements';

const INITIAL_DATA: Announcement[] = [
    { 
        id: '1', 
        title: "Library hours extended for finals week", 
        date: "2 hours ago", 
        category: "Academic",
        description: "The central library will remain open 24/7 starting this Monday for the upcoming end-semester examinations."
    },
    { 
        id: '2', 
        title: "Cafeteria menu voting is now open", 
        date: "Yesterday", 
        category: "Campus Life",
        description: "Please cast your votes for the new monthly menu on the student portal."
    },
    { 
        id: '3', 
        title: "Guest lecture: AI in Healthcare", 
        date: "2 days ago", 
        category: "Event",
        description: "Dr. Smith will be delivering a talk on the applications of Generative AI in modern diagnostics."
    },
];

export const AnnouncementsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [announcements, setAnnouncements] = useState<Announcement[]>(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : INITIAL_DATA;
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(announcements));
    }, [announcements]);

    const addAnnouncement = (announcement: Announcement) => {
        setAnnouncements(prev => [announcement, ...prev]);
    };

    const deleteAnnouncement = (id: string) => {
        setAnnouncements(prev => prev.filter(a => a.id !== id));
    };

    return (
        <AnnouncementsContext.Provider value={{ announcements, addAnnouncement, deleteAnnouncement }}>
            {children}
        </AnnouncementsContext.Provider>
    );
};

export const useAnnouncements = () => {
    const context = useContext(AnnouncementsContext);
    if (!context) {
        throw new Error('useAnnouncements must be used within an AnnouncementsProvider');
    }
    return context;
};