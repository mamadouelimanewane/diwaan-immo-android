'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function AgencyDashboard() {
    const [agency, setAgency] = useState<any>(null);
    const [stats, setStats] = useState({
        totalReservations: 0,
        pendingReservations: 0,
        validatedReservations: 0,
        totalRevenue: 0,
        availablePlots: 0,
        agents: 0,
    });
    const [recentReservations, setRecentReservations] = useState([]);
    const [loading, setLoading] = useState(true);

    // TODO: Récupérer l'ID de l'agence depuis l'authentification
    const agencyId = 'agency-id-here';

    useEffect(() => {
        fetchAgencyData();
    }, []);

    const fetchAgencyData = async () => {
        try {
            // Récupérer agence
            const agencyResponse = await fetch(`/api/agencies/${agencyId}`);
            const agencyData = await agencyResponse.json();

            if (agencyData.success) {
                setAgency(agencyData.agency);
                setStats({
                    totalReservations: agencyData.agency._count?.reservations || 0,
                    pendingReservations: 0,
                    validatedReservations: 0,
                    totalRevenue: agencyData.agency.totalRevenue || 0,
                    availablePlots: agencyData.agency._count?.plots || 0,
                    agents: agencyData.agency._count?.agents || 0,
                });
            }

            // Récupérer réservations récentes
            const reservationsResponse = await fetch(`/api/reservations?agencyId=${agencyId}&limit=5`);
            const reservationsData = await reservationsResponse.json();

            if (reservationsData.success) {
                setRecentReservations(reservationsData.reservations);
            }
        } catch (error) {
            console.error('Error fetching agency data:', error);
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
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="md:flex md:items-center md:justify-between">
                        <div>
                            <h1 className="text-3xl font-bold">{agency?.legalName}</h1>
                            <p className="mt-1 text-blue-100">Dashboard Agence Immobilière</p>
                        </div>
                        <div className="mt-4 md:mt-0">
                            <Link
                                href="/agency/reservations/new"
                                className="inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100 font-semibold shadow-lg"
                            >
                                + Nouvelle Réservation
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatCard
                        title="Réservations"
                        value={stats.totalReservations}
                        icon="📋"
                        color="blue"
                        trend="+12%"
                    />
                    <StatCard
                        title="En Attente"
                        value={stats.pendingReservations}
                        icon="⏳"
                        color="yellow"
                    />
                    <StatCard
                        title="Parcelles Disponibles"
                        value={stats.availablePlots}
                        icon="📦"
                        color="green"
                    />
                    <StatCard
                        title="Agents Actifs"
                        value={stats.agents}
                        icon="👥"
                        color="purple"
                    />
                </div>

                {/* Revenue Card */}
                <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-xl p-8 mb-8 text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-green-100 text-sm font-medium mb-2">
                                Chiffre d'Affaires Total (Marges)
                            </p>
                            <p className="text-5xl font-bold">
                                {stats.totalRevenue.toLocaleString()} FCFA
                            </p>
                            <p className="text-green-100 text-sm mt-2">
                                Commissions générées ce mois
                            </p>
                        </div>
                        <div className="text-7xl opacity-20">💰</div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Réservations Récentes */}
                    <div className="lg:col-span-2 bg-white rounded-xl shadow">
                        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                            <h2 className="text-xl font-semibold text-gray-900">
                                Réservations Récentes
                            </h2>
                            <Link
                                href="/agency/reservations"
                                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                            >
                                Voir tout →
                            </Link>
                        </div>
                        <div className="p-6">
                            {recentReservations.length > 0 ? (
                                <div className="space-y-4">
                                    {recentReservations.map((reservation: any) => (
                                        <div
                                            key={reservation.id}
                                            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                                        >
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                                        <span className="text-lg">📋</span>
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-gray-900">
                                                            {reservation.clientFirstName} {reservation.clientLastName}
                                                        </p>
                                                        <p className="text-sm text-gray-600">
                                                            Parcelle {reservation.plot?.plotNumber} • {reservation.reservationNumber}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-bold text-gray-900">
                                                    {reservation.finalPrice?.toLocaleString()} FCFA
                                                </p>
                                                <span
                                                    className={`inline-block px-2 py-1 text-xs rounded-full mt-1 ${reservation.status === 'VALIDATED'
                                                            ? 'bg-green-100 text-green-800'
                                                            : 'bg-yellow-100 text-yellow-800'
                                                        }`}
                                                >
                                                    {reservation.status}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <p className="text-gray-500 mb-4">Aucune réservation</p>
                                    <Link
                                        href="/agency/reservations/new"
                                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                    >
                                        Créer une réservation
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Actions Rapides */}
                    <div className="bg-white rounded-xl shadow">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h2 className="text-xl font-semibold text-gray-900">
                                Actions Rapides
                            </h2>
                        </div>
                        <div className="p-6 space-y-3">
                            <Link
                                href="/agency/reservations/new"
                                className="flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition group"
                            >
                                <span className="text-3xl mr-3 group-hover:scale-110 transition">📋</span>
                                <div>
                                    <p className="font-semibold text-gray-900">Nouvelle Réservation</p>
                                    <p className="text-xs text-gray-600">Réserver une parcelle</p>
                                </div>
                            </Link>

                            <Link
                                href="/agency/plots"
                                className="flex items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition group"
                            >
                                <span className="text-3xl mr-3 group-hover:scale-110 transition">📦</span>
                                <div>
                                    <p className="font-semibold text-gray-900">Parcelles Disponibles</p>
                                    <p className="text-xs text-gray-600">Voir toutes les parcelles</p>
                                </div>
                            </Link>

                            <Link
                                href="/agency/agents"
                                className="flex items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition group"
                            >
                                <span className="text-3xl mr-3 group-hover:scale-110 transition">👥</span>
                                <div>
                                    <p className="font-semibold text-gray-900">Mes Agents</p>
                                    <p className="text-xs text-gray-600">Gérer l'équipe</p>
                                </div>
                            </Link>

                            <Link
                                href="/agency/reports"
                                className="flex items-center p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition group"
                            >
                                <span className="text-3xl mr-3 group-hover:scale-110 transition">📊</span>
                                <div>
                                    <p className="font-semibold text-gray-900">Rapports</p>
                                    <p className="text-xs text-gray-600">Statistiques & CA</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Performance Agents */}
                <div className="mt-8 bg-white rounded-xl shadow">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-900">
                            Top Agents du Mois
                        </h2>
                    </div>
                    <div className="p-6">
                        {agency?.agents?.length > 0 ? (
                            <div className="space-y-3">
                                {agency.agents.slice(0, 5).map((agent: any, index: number) => (
                                    <div
                                        key={agent.id}
                                        className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${index === 0 ? 'bg-yellow-500' :
                                                    index === 1 ? 'bg-gray-400' :
                                                        index === 2 ? 'bg-orange-600' :
                                                            'bg-gray-300'
                                                }`}>
                                                {index + 1}
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-900">
                                                    {agent.firstName} {agent.lastName}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    {agent.totalSales || 0} ventes
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold text-gray-900">
                                                {(agent.totalRevenue || 0).toLocaleString()} FCFA
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-center text-gray-500 py-8">
                                Aucun agent enregistré
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatCard({ title, value, icon, color, trend }: any) {
    const colorClasses = {
        blue: 'from-blue-500 to-blue-600',
        green: 'from-green-500 to-green-600',
        yellow: 'from-yellow-500 to-yellow-600',
        purple: 'from-purple-500 to-purple-600',
    };

    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className={`bg-gradient-to-r ${colorClasses[color as keyof typeof colorClasses]} p-6 text-white`}>
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm opacity-90 mb-1">{title}</p>
                        <p className="text-3xl font-bold">{value}</p>
                        {trend && (
                            <p className="text-xs mt-2 opacity-90">{trend} ce mois</p>
                        )}
                    </div>
                    <span className="text-5xl opacity-30">{icon}</span>
                </div>
            </div>
        </div>
    );
}
