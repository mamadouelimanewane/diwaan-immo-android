'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function AdminSidebar() {
    const pathname = usePathname();
    const [openMenus, setOpenMenus] = useState<string[]>(['partnership']);

    const toggleMenu = (menu: string) => {
        setOpenMenus(prev =>
            prev.includes(menu)
                ? prev.filter(m => m !== menu)
                : [...prev, menu]
        );
    };

    const isActive = (path: string) => pathname === path;

    const menuItems = [
        {
            title: 'Dashboard',
            icon: '📊',
            path: '/admin',
        },
        {
            title: 'Propriétés',
            icon: '🏠',
            submenu: [
                { title: 'Toutes les propriétés', path: '/admin/properties' },
                { title: 'Ajouter une propriété', path: '/admin/properties/new' },
                { title: 'Catégories', path: '/admin/properties/categories' },
            ],
        },
        {
            title: 'Utilisateurs',
            icon: '👥',
            submenu: [
                { title: 'Tous les utilisateurs', path: '/admin/users' },
                { title: 'Agents', path: '/admin/users/agents' },
                { title: 'Propriétaires', path: '/admin/users/owners' },
            ],
        },
        {
            title: 'Système de Partenariat',
            icon: '🤝',
            id: 'partnership',
            highlight: true,
            submenu: [
                {
                    title: 'Promoteurs',
                    path: '/admin/partnership/developers',
                    icon: '🏗️',
                    badge: 'NEW'
                },
                {
                    title: 'Agences Immobilières',
                    path: '/admin/partnership/agencies',
                    icon: '🏢'
                },
                {
                    title: 'Contrats de Partenariat',
                    path: '/admin/partnership/partnerships',
                    icon: '📄'
                },
                {
                    title: 'Projets & Lotissements',
                    path: '/admin/partnership/projects',
                    icon: '🏗️'
                },
                {
                    title: 'Parcelles',
                    path: '/admin/partnership/plots',
                    icon: '📦'
                },
                {
                    title: 'Réservations',
                    path: '/admin/partnership/reservations',
                    icon: '📋'
                },
                {
                    title: 'Configuration Prix',
                    path: '/admin/partnership/pricing-rules',
                    icon: '💰'
                },
                {
                    title: 'Marges & Commissions',
                    path: '/admin/partnership/margins',
                    icon: '💵'
                },
            ],
        },
        {
            title: 'Agence Dashboard',
            icon: '🏢',
            submenu: [
                { title: 'Mon Dashboard', path: '/agency/dashboard' },
                { title: 'Nouvelle Réservation', path: '/agency/reservations/new' },
                { title: 'Mes Réservations', path: '/agency/reservations' },
                { title: 'Mes Agents', path: '/agency/agents' },
                { title: 'Rapports', path: '/agency/reports' },
            ],
        },
        {
            title: 'Messages',
            icon: '💬',
            path: '/admin/messages',
            badge: '12',
        },
        {
            title: 'Paramètres',
            icon: '⚙️',
            submenu: [
                { title: 'Général', path: '/admin/settings/general' },
                { title: 'Email', path: '/admin/settings/email' },
                { title: 'Paiements', path: '/admin/settings/payments' },
            ],
        },
    ];

    return (
        <aside
            className="w-64 bg-gray-900 text-white min-h-screen fixed left-0 top-0 overflow-y-auto"
            style={{
                position: 'fixed',
                left: 0,
                top: 0,
                width: '256px',
                height: '100vh',
                backgroundColor: '#111827',
                color: 'white',
                overflowY: 'auto',
                zIndex: 1000
            }}
        >
            {/* Logo */}
            <div className="p-6 border-b border-gray-800">
                <Link href="/" className="flex items-center gap-2">
                    <span className="text-2xl">🏠</span>
                    <div>
                        <h1 className="text-xl font-bold">Diwaan</h1>
                        <p className="text-xs text-gray-400">Backoffice Admin</p>
                    </div>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="p-4">
                <div className="space-y-1">
                    {menuItems.map((item, index) => (
                        <div key={index}>
                            {item.submenu ? (
                                <div>
                                    <button
                                        onClick={() => toggleMenu(item.id || item.title)}
                                        className={`w-full flex items-center justify-between px-4 py-3 rounded-lg hover:bg-gray-800 transition ${item.highlight ? 'bg-blue-900 bg-opacity-30 border border-blue-700' : ''
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className="text-xl">{item.icon}</span>
                                            <span className="font-medium">{item.title}</span>
                                        </div>
                                        <span className={`transform transition ${openMenus.includes(item.id || item.title) ? 'rotate-180' : ''
                                            }`}>
                                            ▼
                                        </span>
                                    </button>

                                    {openMenus.includes(item.id || item.title) && (
                                        <div className="ml-4 mt-1 space-y-1">
                                            {item.submenu.map((subitem: any, subindex) => (
                                                <Link
                                                    key={subindex}
                                                    href={subitem.path}
                                                    className={`flex items-center justify-between px-4 py-2 rounded-lg hover:bg-gray-800 transition ${isActive(subitem.path) ? 'bg-blue-600' : ''
                                                        }`}
                                                >
                                                    <div className="flex items-center gap-2">
                                                        {subitem.icon && <span className="text-sm">{subitem.icon}</span>}
                                                        <span className="text-sm">{subitem.title}</span>
                                                    </div>
                                                    {subitem.badge && (
                                                        <span className="px-2 py-0.5 text-xs bg-green-500 text-white rounded-full">
                                                            {subitem.badge}
                                                        </span>
                                                    )}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <Link
                                    href={item.path!}
                                    className={`flex items-center justify-between px-4 py-3 rounded-lg hover:bg-gray-800 transition ${isActive(item.path!) ? 'bg-blue-600' : ''
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="text-xl">{item.icon}</span>
                                        <span className="font-medium">{item.title}</span>
                                    </div>
                                    {item.badge && (
                                        <span className="px-2 py-1 text-xs bg-red-500 rounded-full">
                                            {item.badge}
                                        </span>
                                    )}
                                </Link>
                            )}
                        </div>
                    ))}
                </div>
            </nav>

            {/* User Info */}
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800" style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-lg">👤</span>
                    </div>
                    <div className="flex-1">
                        <p className="text-sm font-medium">Admin User</p>
                        <p className="text-xs text-gray-400">admin@diwaan.sn</p>
                    </div>
                    <button className="text-gray-400 hover:text-white">
                        ⋮
                    </button>
                </div>
            </div>
        </aside>
    );
}
