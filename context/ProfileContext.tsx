import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { UserProfile } from '../types';
import { useAuth } from './AuthContext';

interface ProfileContextType {
  user: UserProfile;
  updateUser: (data: UserProfile) => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

const STUDENT_PROFILE: UserProfile = {
    name: 'Surya',
    rollNumber: '21A91A0588',
    email: 'surya.student@aditya.edu',
    phone: '+91 98765 43210',
    branch: 'Computer Science & Engineering',
    semester: '6th Semester',
    section: 'Section B',
    cgpa: '8.9',
    bio: 'Passionate full-stack developer and AI enthusiast. Lead of the Campus Coding Club.',
};

const FACULTY_PROFILE: UserProfile = {
    name: 'Dr. A. Sharma',
    employeeId: 'FAC2024099',
    email: 'a.sharma@aditya.edu',
    phone: '+91 98765 11223',
    department: 'Computer Science & Engineering',
    designation: 'Associate Professor',
    bio: 'Researcher in Artificial Intelligence and Machine Learning. Mentor for the Student Innovation Cell.',
};

export const ProfileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { user: authUser } = useAuth();
    const [user, setUser] = useState<UserProfile>(STUDENT_PROFILE);

    useEffect(() => {
        if (authUser?.role === 'faculty') {
            setUser(FACULTY_PROFILE);
        } else {
            setUser(STUDENT_PROFILE);
        }
    }, [authUser]);

    const updateUser = (data: UserProfile) => {
        setUser(data);
    };

    return (
        <ProfileContext.Provider value={{ user, updateUser }}>
            {children}
        </ProfileContext.Provider>
    );
};

export const useProfile = () => {
    const context = useContext(ProfileContext);
    if (!context) {
        throw new Error('useProfile must be used within a ProfileProvider');
    }
    return context;
};