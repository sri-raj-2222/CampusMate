import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Opportunity } from '../types';

interface OpportunitiesContextType {
  opportunities: Opportunity[];
  addOpportunity: (opp: Opportunity) => void;
  deleteOpportunity: (id: string) => void;
}

const OpportunitiesContext = createContext<OpportunitiesContextType | undefined>(undefined);

const STORAGE_KEY = 'campusMate_opportunities';

const INITIAL_DATA: Opportunity[] = [
    {
        id: '1',
        title: 'CodeFest 2024',
        type: 'Hackathon',
        companyOrOrg: 'Aditya Innovation Hub',
        date: 'June 10-12, 2024',
        tags: ['AI/ML', 'Web3', 'Open Innovation'],
        link: '#'
    },
    {
        id: '2',
        title: 'Summer Frontend Intern',
        type: 'Internship',
        companyOrOrg: 'StartUp Inc.',
        date: 'Apply by May 30',
        tags: ['React', 'TypeScript', 'Remote'],
        link: '#'
    },
    {
        id: '3',
        title: 'Cloud Computing Workshop',
        type: 'Workshop',
        companyOrOrg: 'Google Developer Student Club',
        date: 'May 20, 2024',
        tags: ['GCP', 'Cloud', 'Beginner'],
        link: '#'
    },
    {
        id: '4',
        title: 'Backend Engineer Intern',
        type: 'Internship',
        companyOrOrg: 'FinTech Solutions',
        date: 'Apply by June 5',
        tags: ['Node.js', 'PostgreSQL', 'Hybrid'],
        link: '#'
    }
];

export const OpportunitiesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [opportunities, setOpportunities] = useState<Opportunity[]>(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : INITIAL_DATA;
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(opportunities));
    }, [opportunities]);

    const addOpportunity = (opp: Opportunity) => {
        setOpportunities(prev => [opp, ...prev]);
    };

    const deleteOpportunity = (id: string) => {
        setOpportunities(prev => prev.filter(o => o.id !== id));
    };

    return (
        <OpportunitiesContext.Provider value={{ opportunities, addOpportunity, deleteOpportunity }}>
            {children}
        </OpportunitiesContext.Provider>
    );
};

export const useOpportunities = () => {
    const context = useContext(OpportunitiesContext);
    if (!context) {
        throw new Error('useOpportunities must be used within an OpportunitiesProvider');
    }
    return context;
};