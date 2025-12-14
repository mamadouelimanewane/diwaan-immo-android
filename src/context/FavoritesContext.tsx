'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface FavoritesContextType {
    favorites: string[];
    toggleFavorite: (id: string) => void;
    isFavorite: (id: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
    const [favorites, setFavorites] = useState<string[]>([]);

    // Load from localStorage on mount
    useEffect(() => {
        const stored = localStorage.getItem('diwaan_favorites');
        if (stored) {
            setFavorites(JSON.parse(stored));
        }
    }, []);

    // Save to localStorage just in time or on change is fine
    const toggleFavorite = (id: string) => {
        let newFavorites;
        if (favorites.includes(id)) {
            newFavorites = favorites.filter(fav => fav !== id);
        } else {
            newFavorites = [...favorites, id];
        }
        setFavorites(newFavorites);
        localStorage.setItem('diwaan_favorites', JSON.stringify(newFavorites));
    };

    const isFavorite = (id: string) => favorites.includes(id);

    return (
        <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
}

export function useFavorites() {
    const context = useContext(FavoritesContext);
    if (context === undefined) {
        throw new Error('useFavorites must be used within a FavoritesProvider');
    }
    return context;
}
