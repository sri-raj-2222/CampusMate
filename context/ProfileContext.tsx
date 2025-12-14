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

const STORAGE_KEY_PREFIX = 'campusMate_profile_';

export const ProfileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { user: authUser } = useAuth();
    const [user, setUser] = useState<UserProfile>(STUDENT_PROFILE);

    // Initialize or load profile based on authUser
    useEffect(() => {
        if (!authUser) return;

        const key = `${STORAGE_KEY_PREFIX}${authUser.role}`;
        const saved = localStorage.getItem(key);

        if (saved) {
            const savedProfile = JSON.parse(saved);
            // Ensure the name matches the auth user's name if they just signed up/logged in
            if (savedProfile.name !== authUser.name) {
                // Update basic info from auth if it differs (e.g. fresh signup)
                setUser({ ...savedProfile, name: authUser.name, email: authUser.email });
            } else {
                setUser(savedProfile);
            }
        } else {
            // Load default template if no save exists
            let defaultProfile = authUser.role === 'faculty' ? FACULTY_PROFILE : STUDENT_PROFILE;
            // Overwrite defaults with actual auth data
            defaultProfile = { ...defaultProfile, name: authUser.name, email: authUser.email };
            
            if (authUser.role === 'student') {
                // If it's a new signup, we might not have roll number yet, rely on AuthUser ID or blank
                // For demo simplicity, we keep default mock data unless overwritten
            }
            
            setUser(defaultProfile);
        }
    }, [authUser]);

    const updateUser = (data: UserProfile) => {
        setUser(data);
        if (authUser) {
            const key = `${STORAGE_KEY_PREFIX}${authUser.role}`;
            localStorage.setItem(key, JSON.stringify(data));
        }
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