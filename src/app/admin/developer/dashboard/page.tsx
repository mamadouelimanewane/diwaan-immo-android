'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Stats {
    totalProjects: number;
    totalPlots: number;
    availablePlots: number;
    reservedPlots: number;
    soldPlots: number;
    totalRevenue: number;
    activePartnerships: number;
}

export default function DeveloperDashboard() {
    const [developer, setDeveloper] = useState<any>(null);
    const [stats, setStats] = useState<Stats | null>(null);
    const [loading, setLoading] = useState(true);

    // TODO: Récupérer l'ID du développeur depuis l'authentification
    const developerId = 'developer-id-here'; // À remplacer par auth

    useEffect(() => {
        fetchDeveloperData();
    }, []);

    const fetchDeveloperData = async () => {
        try {
            const response = await fetch(`/api/developers/${developerId}`);
            const data = await response.json();

            if (data.success) {
                setDeveloper(data.developer);
                setStats(data.developer.stats);
            }
        } catch (error) {
            console.error('Error fetching developer data:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Chargement...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="md:flex md:items-center md:justify-between">
                        <div className="flex-1 min-w-0">
                            <h1 className="text-3xl font-bold text-gray-900">
                                {developer?.legalName}
                            </h1>
                            <p className="mt-1 text-sm text-gray-500">
                                Dashboard Promoteur
                            </p>
                        </div>
                        <div className="mt-4 flex md:mt-0 md:ml-4">
                            <Link
                                href="/admin/projects/new"
                                className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                            >
                                + Nouveau Projet
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    <StatCard
                        title="Projets"
                        value={stats?.totalProjects || 0}
                        icon="🏗️"
                        color="blue"
                    />
                    <StatCard
                        title="Parcelles Disponibles"
                        value={stats?.availablePlots || 0}
                        subtitle={`sur ${stats?.totalPlots || 0} total`}
                        icon="📦"
                        color="green"
                    />
                    <StatCard
                        title="Réservées"
                        value={stats?.reservedPlots || 0}
                        icon="🔒"
                        color="yellow"
                    />
                    <StatCard
                        title="Vendues"
                        value={stats?.soldPlots || 0}
                        icon="✅"
                        color="purple"
                    />
                </div>

                {/* Revenue Card */}
                <div className="mt-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-blue-100 text-sm font-medium">Chiffre d'Affaires Total</p>
                            <p className="text-4xl font-bold mt-2">
                                {(stats?.totalRevenue || 0).toLocaleString()} FCFA
                            </p>
                        </div>
                        <div className="text-6xl">💰</div>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Projects */}
                    <div className="bg-white rounded-lg shadow">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h2 className="text-lg font-semibold text-gray-900">Mes Projets</h2>
                        </div>
                        <div className="p-6">
                            {developer?.projects?.length > 0 ? (
                                <div className="space-y-4">
                                    {developer.projects.map((project: any) => (
                                        <Link
                                            key={project.id}
                                            href={`/admin/projects/${project.id}`}
                                            className="block p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition"
                                        >
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h3 className="font-medium text-gray-900">{project.name}</h3>
                                                    <p className="text-sm text-gray-500 mt-1">
                                                        {project._count?.plots || 0} parcelles
                                                    </p>
                                                </div>
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${project.status === 'ACTIVE'
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-gray-100 text-gray-800'
                                                    }`}>
                                                    {project.status}
                                                </span>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500 text-center py-8">Aucun projet</p>
                            )}
                        </div>
                    </div>

                    {/* Partnerships */}
                    <div className="bg-white rounded-lg shadow">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h2 className="text-lg font-semibold text-gray-900">Partenariats</h2>
                        </div>
                        <div className="p-6">
                            {developer?.partnerships?.length > 0 ? (
                                <div className="space-y-4">
                                    {developer.partnerships.map((partnership: any) => (
                                        <Link
                                            key={partnership.id}
                                            href={`/admin/partnerships/${partnership.id}`}
                                            className="block p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition"
                                        >
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h3 className="font-medium text-gray-900">
                                                        {partnership.agency.legalName}
                                                    </h3>
                                                    <p className="text-sm text-gray-500 mt-1">
                                                        {partnership.contractNumber}
                                                    </p>
                                                </div>
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${partnership.status === 'ACTIVE'
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-gray-100 text-gray-800'
                                                    }`}>
                                                    {partnership.status}
                                                </span>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <p className="text-gray-500 mb-4">Aucun partenariat</p>
                                    <Link
                                        href="/admin/partnerships/new"
                                        className="inline-flex items-center px-4 py-2 border border-blue-600 rounded-md text-sm font-medium text-blue-600 hover:bg-blue-50"
                                    >
                                        + Créer un partenariat
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="mt-8 bg-white rounded-lg shadow p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Actions Rapides</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Link
                            href="/admin/projects/new"
                            className="flex items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition"
                        >
                            <div className="flex-shrink-0 text-3xl mr-4">🏗️</div>
                            <div>
                                <p className="font-medium text-gray-900">Créer un Projet</p>
                                <p className="text-sm text-gray-500">Nouveau lotissement</p>
                            </div>
                        </Link>

                        <Link
                            href="/admin/plots"
                            className="flex items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition"
                        >
                            <div className="flex-shrink-0 text-3xl mr-4">📦</div>
                            <div>
                                <p className="font-medium text-gray-900">Gérer les Parcelles</p>
                                <p className="text-sm text-gray-500">Attribution, prix</p>
                            </div>
                        </Link>

                        <Link
                            href="/admin/partnerships/new"
                            className="flex items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition"
                        >
                            <div className="flex-shrink-0 text-3xl mr-4">🤝</div>
                            <div>
                                <p className="font-medium text-gray-900">Nouveau Partenariat</p>
                                <p className="text-sm text-gray-500">Agence commerciale</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Composant Stat Card
function StatCard({ title, value, subtitle, icon, color }: any) {
    const colorClasses = {
        blue: 'bg-blue-50 text-blue-600',
        green: 'bg-green-50 text-green-600',
        yellow: 'bg-yellow-50 text-yellow-600',
        purple: 'bg-purple-50 text-purple-600',
    };

    return (
        <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
                <div className="flex items-center">
                    <div className={`flex-shrink-0 rounded-md p-3 ${colorClasses[color as keyof typeof colorClasses]}`}>
                        <span className="text-2xl">{icon}</span>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                        <dl>
                            <dt className="text-sm font-medium text-gray-500 truncate">
                                {title}
                            </dt>
                            <dd className="flex items-baseline">
                                <div className="text-2xl font-semibold text-gray-900">
                                    {value}
                                </div>
                                {subtitle && (
                                    <div className="ml-2 text-sm text-gray-500">
                                        {subtitle}
                                    </div>
                                )}
                            </dd>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    );
}
