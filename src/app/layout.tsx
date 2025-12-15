'use client';

import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { AuthProvider } from "@/context/AuthContext";
import LayoutWrapper from "@/components/layout/LayoutWrapper";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    useEffect(() => {
        // Enregistrer le Service Worker pour la PWA
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js').then(
                    (registration) => {
                        console.log('Service Worker enregistré avec succès:', registration);
                    },
                    (error) => {
                        console.log('Échec de l\'enregistrement du Service Worker:', error);
                    }
                );
            });
        }
    }, []);

    return (
        <html lang="fr">
            <head>
                <meta name="application-name" content="Diwaan Immo" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-status-bar-style" content="default" />
                <meta name="apple-mobile-web-app-title" content="Diwaan Immo" />
                <meta name="description" content="Plateforme immobilière intelligente au Sénégal" />
                <meta name="format-detection" content="telephone=no" />
                <meta name="mobile-web-app-capable" content="yes" />
                <meta name="theme-color" content="#006AFF" />

                <link rel="manifest" href="/manifest.json" />
                <link rel="apple-touch-icon" href="/icon-192x192.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/icon-192x192.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/icon-192x192.png" />
            </head>
            <body className={inter.className}>
                <AuthProvider>
                    <Providers>
                        <LayoutWrapper>
                            {children}
                        </LayoutWrapper>
                    </Providers>
                </AuthProvider>
            </body>
        </html>
    );
}
