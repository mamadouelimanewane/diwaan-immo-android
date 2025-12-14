'use client';

import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { AuthProvider } from "@/context/AuthContext";
import LayoutWrapper from "@/components/layout/LayoutWrapper";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="fr">
            <head>
                <link rel="manifest" href="/manifest.json" />
                <meta name="theme-color" content="#006AFF" />
                <link rel="apple-touch-icon" href="/icon-192x192.png" />
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
