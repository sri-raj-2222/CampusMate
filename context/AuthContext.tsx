import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AuthUser, UserRole } from '../types';

interface AuthContextType {
  user: AuthUser | null;
  login: (role: UserRole, email: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<AuthUser | null>(null);

    const login = (role: UserRole, email: string) => {
        // Mock login logic
        setUser({
            id: Date.now().toString(),
            name: role === 'student' ? 'Surya' : 'Prof. Sharma',
            email: email,
            role: role
        });
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};