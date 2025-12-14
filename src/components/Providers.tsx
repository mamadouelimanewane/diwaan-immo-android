'use client';

import { ReactNode } from 'react';
import { FavoritesProvider } from '@/context/FavoritesContext';
import { ThemeProvider } from '@/context/ThemeContext';

import { LanguageProvider } from '@/context/LanguageContext';

export function Providers({ children }: { children: ReactNode }) {
    return (
        <ThemeProvider>
            <LanguageProvider>
                <FavoritesProvider>
                    {children}
                </FavoritesProvider>
            </LanguageProvider>
        </ThemeProvider>
    );
}
