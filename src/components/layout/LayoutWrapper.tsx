'use client';

import { usePathname } from 'next/navigation';
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import DiwaanBot from "@/components/DiwaanBot";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    // Hide public header/footer on admin routes and login page
    const isAdminOrLogin = pathname?.startsWith('/admin') || pathname?.startsWith('/login');

    return (
        <>
            {!isAdminOrLogin && <Header />}
            <main>{children}</main>
            {!isAdminOrLogin && <Footer />}
            {!isAdminOrLogin && <DiwaanBot />}
        </>
    );
}
