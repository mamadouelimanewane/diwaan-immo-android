'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function DevelopersPage() {
    const [developers, setDevelopers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({ total: 0, active: 0, totalRevenue: 0 });

    useEffect(() => {
        fetchDevelopers();
    }, []);

    const fetchDevelopers = async () => {
        try {
            const response = await fetch('/api/developers');
            const data = await response.json();

            if (data.success) {
                setDevelopers(data.developers);
                setStats({
                    total: data.count || 0,
                    active: data.developers.filter((d: any) => d.status === 'ACTIVE').length,
                    totalRevenue: data.developers.reduce((sum: number, d: any) => sum + (d.totalRevenue || 0), 0)
                });
            }
        } catch (error) {
            console.error('Erreur:', error);
        } finally {
            setLoading(false);
        }
    };

    const deleteDeveloper = async (id: string) => {
        if (!confirm('Êtes-vous sûr de vouloir supprimer ce promoteur ?')) return;

        try {
            const response = await fetch(`/api/developers/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                fetchDevelopers();
            }
        } catch (error) {
            console.error('Erreur:', error);
        }
    };

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '48px', marginBottom: '16px' }}>⏳</div>
                    <p>Chargement...</p>
                </div>
            </div>
        );
    }

    return (
        <div>
            {/* Header */}
            <div style={{ marginBottom: '32px' }}>
                <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1B254B', marginBottom: '8px' }}>
                    🏗️ Promoteurs Immobiliers
                </h1>
                <p style={{ color: '#888' }}>Gestion des promoteurs et développeurs</p>
            </div>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '32px' }}>
                <StatCard icon="🏗️" title="Total Promoteurs" value={stats.total} color="#4318FF" />
                <StatCard icon="✅" title="Actifs" value={stats.active} color="#05CD99" />
                <StatCard icon="💰" title="CA Total" value={`${(stats.totalRevenue / 1000000).toFixed(1)}M FCFA`} color="#006AFF" />
            </div>

            {/* Actions */}
            <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1B254B' }}>
                    Liste des Promoteurs ({developers.length})
                </h2>
                <button
                    onClick={() => window.location.href = '/admin/partnership/developers/new'}
                    style={{
                        background: '#006AFF',
                        color: 'white',
                        border: 'none',
                        padding: '12px 24px',
                        borderRadius: '8px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        fontSize: '14px'
                    }}
                >
                    + Ajouter un Promoteur
                </button>
            </div>

            {/* Liste */}
            {developers.length === 0 ? (
                <div style={{ background: 'white', padding: '60px', borderRadius: '16px', textAlign: 'center' }}>
                    <div style={{ fontSize: '64px', marginBottom: '16px' }}>🏗️</div>
                    <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>Aucun promoteur</h3>
                    <p style={{ color: '#888', marginBottom: '24px' }}>Commencez par ajouter votre premier promoteur</p>
                    <button
                        onClick={() => window.location.href = '/admin/partnership/developers/new'}
                        style={{
                            background: '#006AFF',
                            color: 'white',
                            border: 'none',
                            padding: '12px 24px',
                            borderRadius: '8px',
                            fontWeight: 'bold',
                            cursor: 'pointer'
                        }}
                    >
                        Ajouter un Promoteur
                    </button>
                </div>
            ) : (
                <div style={{ background: 'white', borderRadius: '16px', overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead style={{ background: '#F4F7FE' }}>
                            <tr>
                                <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', color: '#1B254B' }}>Promoteur</th>
                                <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', color: '#1B254B' }}>Contact</th>
                                <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', color: '#1B254B' }}>Projets</th>
                                <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', color: '#1B254B' }}>Parcelles</th>
                                <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', color: '#1B254B' }}>Statut</th>
                                <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', color: '#1B254B' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {developers.map((dev) => (
                                <tr key={dev.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                                    <td style={{ padding: '16px' }}>
                                        <div style={{ fontWeight: 'bold', color: '#1B254B', marginBottom: '4px' }}>{dev.legalName}</div>
                                        <div style={{ fontSize: '12px', color: '#888' }}>RCCM: {dev.rccm}</div>
                                    </td>
                                    <td style={{ padding: '16px' }}>
                                        <div style={{ fontSize: '14px', color: '#1B254B', marginBottom: '4px' }}>{dev.email}</div>
                                        <div style={{ fontSize: '12px', color: '#888' }}>{dev.phone}</div>
                                    </td>
                                    <td style={{ padding: '16px' }}>
                                        <span style={{ fontWeight: 'bold', color: '#1B254B' }}>{dev._count?.projects || 0}</span>
                                    </td>
                                    <td style={{ padding: '16px' }}>
                                        <span style={{ fontWeight: 'bold', color: '#1B254B' }}>{dev._count?.plots || 0}</span>
                                    </td>
                                    <td style={{ padding: '16px' }}>
                                        <span style={{
                                            padding: '4px 12px',
                                            borderRadius: '6px',
                                            fontSize: '12px',
                                            fontWeight: 'bold',
                                            background: dev.status === 'ACTIVE' ? '#E6F8F1' : '#FFE6E6',
                                            color: dev.status === 'ACTIVE' ? '#05CD99' : '#FF4444'
                                        }}>
                                            {dev.status === 'ACTIVE' ? 'Actif' : 'Inactif'}
                                        </span>
                                    </td>
                                    <td style={{ padding: '16px' }}>
                                        <div style={{ display: 'flex', gap: '8px' }}>
                                            <button
                                                onClick={() => window.location.href = `/admin/partnership/developers/${dev.id}`}
                                                style={{
                                                    background: '#006AFF',
                                                    color: 'white',
                                                    border: 'none',
                                                    padding: '6px 12px',
                                                    borderRadius: '6px',
                                                    cursor: 'pointer',
                                                    fontSize: '12px'
                                                }}
                                            >
                                                Voir
                                            </button>
                                            <button
                                                onClick={() => deleteDeveloper(dev.id)}
                                                style={{
                                                    background: '#FF4444',
                                                    color: 'white',
                                                    border: 'none',
                                                    padding: '6px 12px',
                                                    borderRadius: '6px',
                                                    cursor: 'pointer',
                                                    fontSize: '12px'
                                                }}
                                            >
                                                Supprimer
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

function StatCard({ icon, title, value, color }: any) {
    return (
        <div style={{ background: 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>{icon}</div>
            <div style={{ fontSize: '12px', color: '#A3AED0', marginBottom: '4px' }}>{title}</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color }}>{value}</div>
        </div>
    );
}
