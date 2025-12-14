import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { OutpassRequest } from '../types';

interface OutpassContextType {
  requests: OutpassRequest[];
  createRequest: (data: Omit<OutpassRequest, 'id' | 'status' | 'requestDate'>) => void;
  updateRequestStatus: (id: string, status: 'Approved' | 'Rejected') => void;
  getMyRequests: (studentId: string) => OutpassRequest[];
  getPendingRequests: () => OutpassRequest[];
}

const OutpassContext = createContext<OutpassContextType | undefined>(undefined);

const STORAGE_KEY = 'campusMate_outpasses';

const INITIAL_DATA: OutpassRequest[] = [
    {
        id: '1',
        studentName: 'Rahul Verma',
        studentId: '21A91A0501',
        type: 'Home',
        reason: 'Going home for sister\'s wedding',
        fromDate: '2024-05-20',
        toDate: '2024-05-25',
        status: 'Pending',
        requestDate: '2024-05-18'
    },
    {
        id: '2',
        studentName: 'Priya Reddy',
        studentId: '21A91A0512',
        type: 'City',
        reason: 'Medical appointment at Apollo Hospital',
        fromDate: '2024-05-19',
        toDate: '2024-05-19',
        status: 'Pending',
        requestDate: '2024-05-18'
    }
];

export const OutpassProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [requests, setRequests] = useState<OutpassRequest[]>(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : INITIAL_DATA;
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(requests));
    }, [requests]);

    const createRequest = (data: Omit<OutpassRequest, 'id' | 'status' | 'requestDate'>) => {
        const newRequest: OutpassRequest = {
            ...data,
            id: Date.now().toString(),
            status: 'Pending',
            requestDate: new Date().toISOString().split('T')[0]
        };
        setRequests(prev => [newRequest, ...prev]);
    };

    const updateRequestStatus = (id: string, status: 'Approved' | 'Rejected') => {
        setRequests(prev => prev.map(req => 
            req.id === id ? { ...req, status } : req
        ));
    };

    const getMyRequests = (studentId: string) => {
        // In a real DB, we would query by ID. 
        // Here we just filter. For demo consistency, if studentId is generic/from signup, 
        // we might return everything or filter strictly.
        // For better demo experience, we will return requests that match ID OR if ID is 'UNKNOWN' (new users)
        return requests.filter(req => req.studentId === studentId || req.studentId === 'UNKNOWN');
    };

    const getPendingRequests = () => {
        return requests.filter(req => req.status === 'Pending');
    };

    return (
        <OutpassContext.Provider value={{ requests, createRequest, updateRequestStatus, getMyRequests, getPendingRequests }}>
            {children}
        </OutpassContext.Provider>
    );
};

export const useOutpass = () => {
    const context = useContext(OutpassContext);
    if (!context) {
        throw new Error('useOutpass must be used within an OutpassProvider');
    }
    return context;
};