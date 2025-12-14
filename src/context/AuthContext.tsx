'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '@/lib/api-client';

interface User {
    id: string;
    email: string;
    name: string;
    role: string;
    avatar?: string;
    phone?: string;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (data: any) => Promise<void>;
    logout: () => void;
    updateProfile: (data: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Vérifier si l'utilisateur est déjà connecté au chargement
    useEffect(() => {
        const checkAuth = async () => {
            const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

            if (token) {
                try {
                    const { user } = await api.auth.me();
                    setUser(user);
                } catch (error) {
                    console.error('Session expirée ou invalide', error);
                    // Token invalide ou expiré
                    if (typeof window !== 'undefined') {
                        localStorage.removeItem('token');
                        localStorage.removeItem('user');
                    }
                    setUser(null);
                }
            }

            setIsLoading(false);
        };

        checkAuth();
    }, []);

    const login = async (email: string, password: string) => {
        setIsLoading(true);
        try {
            const { user } = await api.auth.login({ email, password });
            setUser(user);
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (data: any) => {
        setIsLoading(true);
        try {
            const { user } = await api.auth.register(data);
            setUser(user);
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        api.auth.logout();
        setUser(null);
    };

    const updateProfile = async (data: Partial<User>) => {
        // Note: L'endpoint update profile n'est pas encore implémenté dans l'API de base
        // C'est une simulation locale pour l'instant
        if (user) {
            const updatedUser = { ...user, ...data };
            setUser(updatedUser);
            localStorage.setItem('user', JSON.stringify(updatedUser));
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!user,
                isLoading,
                login,
                logout,
                register,
                updateProfile,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};
