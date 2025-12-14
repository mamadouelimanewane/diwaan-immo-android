'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api-client';

const chartData = [65, 78, 90, 81, 86, 105, 120, 135, 142, 150, 165, 180];
const monthLabels = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Dec'];

export default function AdminDashboard() {
    const maxValue = Math.max(...chartData);
    const [stats, setStats] = useState([
        { title: 'Revenu Total', value: '45.2M CFA', change: '+12%', icon: '💰', color: '#4318FF' },
        { title: 'Annonces Actives', value: '0', change: '+5.2%', icon: '🏠', color: '#006AFF' },
        { title: 'Utilisateurs', value: '0', change: '+18%', icon: '👥', color: '#05CD99' },
        { title: 'En attente', value: '0', change: '-2%', icon: '⏳', color: '#FFB547' },
    ]);
    const [partnershipStats, setPartnershipStats] = useState({
        totalDevelopers: 0,
        totalAgencies: 0,
        activePartnerships: 0,
        totalReservations: 0,
        partnershipRevenue: 0,
    });
    const [pendingListings, setPendingListings] = useState<any[]>([]);

    useEffect(() => {
        const loadDashboardData = async () => {
            try {
                // 1. Fetch Stats
                const statsRes = await fetch('/api/admin/stats');
                const statsData = await statsRes.json();

                if (statsData.success) {
                    setStats([
                        { title: 'Revenu Total', value: statsData.stats.revenue, change: '+12%', icon: '💰', color: '#4318FF' },
                        { title: 'Annonces Actives', value: statsData.stats.activeListings.toString(), change: '+5.2%', icon: '🏠', color: '#006AFF' },
                        { title: 'Utilisateurs', value: statsData.stats.totalUsers.toString(), change: '+18%', icon: '👥', color: '#05CD99' },
                        { title: 'En attente', value: statsData.stats.pendingListings.toString(), change: '-2%', icon: '⏳', color: '#FFB547' },
                    ]);
                }

                // 2. Fetch Pending Listings
                // Assuming status 'PENDING' allows admin to see draft/pending items
                const pendingRes = await api.properties.getAll({ status: 'PENDING' } as any);
                if (pendingRes.success) {
                    setPendingListings(pendingRes.properties.slice(0, 4)); // Show recent 4
                }

                // 3. Fetch Partnership Stats
                try {
                    const [devsRes, agenciesRes, partnershipsRes, reservationsRes] = await Promise.all([
                        fetch('/api/developers'),
                        fetch('/api/agencies'),
                        fetch('/api/partnerships?status=ACTIVE'),
                        fetch('/api/reservations')
                    ]);

                    const devsData = await devsRes.json();
                    const agenciesData = await agenciesRes.json();
                    const partnershipsData = await partnershipsRes.json();
                    const reservationsData = await reservationsRes.json();

                    if (devsData.success && agenciesData.success && partnershipsData.success && reservationsData.success) {
                        setPartnershipStats({
                            totalDevelopers: devsData.count || 0,
                            totalAgencies: agenciesData.count || 0,
                            activePartnerships: partnershipsData.count || 0,
                            totalReservations: reservationsData.count || 0,
                            partnershipRevenue: reservationsData.reservations?.reduce((sum: number, r: any) => sum + (r.agencyMargin || 0), 0) || 0,
                        });
                    }
                } catch (error) {
                    console.error('Partnership stats fetch failed', error);
                }
            } catch (error) {
                console.error("Dashboard verify failed", error);
            }
        };

        loadDashboardData();
    }, []);

    return (
        <div>
            <div style={{ marginBottom: '32px' }}>
                <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1B254B', marginBottom: '8px' }}>Tableau de bord</h1>
                <p style={{ color: '#888' }}>Bienvenue sur votre interface d'administration Diwaan.</p>
            </div>

            {/* Stats Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px', marginBottom: '32px' }}>
                {stats.map((stat, index) => (
                    <div key={index} style={{ background: 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)', display: 'flex', alignItems: 'center' }}>
                        <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: `${stat.color}15`, color: stat.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', marginRight: '16px' }}>
                            {stat.icon}
                        </div>
                        <div>
                            <p style={{ color: '#A3AED0', fontSize: '14px', marginBottom: '4px' }}>{stat.title}</p>
                            <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1B254B', marginBottom: '2px' }}>{stat.value}</h3>
                            <span style={{ fontSize: '12px', color: stat.change.startsWith('+') ? '#05CD99' : '#E31A1A' }}>
                                {stat.change} <span style={{ color: '#A3AED0' }}>ce mois</span>
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts & Tables Section */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
                {/* Main Chart */}
                <div style={{ background: 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                        <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1B254B' }}>Statistiques des Annonces</h3>
                        <select style={{ padding: '8px', borderRadius: '8px', border: '1px solid #ddd', background: '#F4F7FE' }}>
                            <option>Cette année</option>
                            <option>Ce mois</option>
                        </select>
                    </div>
                    <div style={{ height: '300px', position: 'relative' }}>
                        {/* Simple SVG Chart */}
                        <svg width="100%" height="100%" style={{ display: 'block' }}>
                            {/* Grid */}
                            {[0, 1, 2, 3, 4].map(i => (
                                <line key={i} x1="0" y1={`${i * 25}%`} x2="100%" y2={`${i * 25}%`} stroke="#E5E7EB" strokeWidth="1" />
                            ))}
                            {/* Line */}
                            <polyline
                                fill="none"
                                stroke="#006AFF"
                                strokeWidth="3"
                                points={chartData.map((val, idx) => {
                                    const x = (idx / (chartData.length - 1)) * 100;
                                    const y = 100 - ((val / maxValue) * 80) - 10;
                                    return `${x}%,${y}%`;
                                }).join(' ')}
                            />
                            {/* Points */}
                            {chartData.map((val, idx) => {
                                const x = (idx / (chartData.length - 1)) * 100;
                                const y = 100 - ((val / maxValue) * 80) - 10;
                                return <circle key={idx} cx={`${x}%`} cy={`${y}%`} r="4" fill="#006AFF" />;
                            })}
                        </svg>
                        {/* Labels */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px', fontSize: '12px', color: '#9CA3AF' }}>
                            {monthLabels.map((label, idx) => <span key={idx}>{label}</span>)}
                        </div>
                    </div>
                </div>

                {/* Recent Activities / Pending */}
                <div style={{ background: 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
                    <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1B254B', marginBottom: '24px' }}>Validations en attente</h3>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {pendingListings.length === 0 && <p style={{ color: '#888', fontStyle: 'italic' }}>Aucune annonce en attente.</p>}
                        {pendingListings.map((item) => (
                            <div key={item.id} style={{ display: 'flex', alignItems: 'center', paddingBottom: '16px', borderBottom: '1px solid #eee' }}>
                                <div style={{ width: '48px', height: '48px', borderRadius: '8px', background: '#eee', marginRight: '16px', overflow: 'hidden' }}>
                                    {item.images?.[0] ?
                                        <img src={item.images[0]} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> :
                                        <div style={{ width: '100%', height: '100%', background: '#ddd' }}></div>
                                    }
                                </div>
                                <div style={{ flex: 1 }}>
                                    <h4 style={{ fontSize: '14px', fontWeight: 'bold', color: '#1B254B', marginBottom: '4px' }}>{item.title}</h4>
                                    <p style={{ fontSize: '12px', color: '#A3AED0' }}>{(item.owner?.name || 'Inconnu')} • {new Date(item.createdAt).toLocaleDateString()}</p>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <button style={{ background: '#006AFF', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', cursor: 'pointer' }}>Voir</button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button style={{ width: '100%', marginTop: 'auto', padding: '12px', background: '#F4F7FE', color: '#006AFF', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
                        Voir tout
                    </button>
                </div>
            </div>

            {/* Partnership System Section */}
            <div style={{ marginTop: '32px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', padding: '32px', borderRadius: '16px', boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <div>
                        <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>🤝 Système de Partenariat</h2>
                        <p style={{ opacity: 0.9 }}>Gestion des promoteurs, agences et réservations</p>
                    </div>
                    <a href="/admin/partnership/developers" style={{ background: 'white', color: '#667eea', padding: '12px 24px', borderRadius: '8px', fontWeight: 'bold', textDecoration: 'none', display: 'inline-block' }}>
                        Accéder au module →
                    </a>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                    <div style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', padding: '20px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.2)' }}>
                        <div style={{ fontSize: '32px', marginBottom: '8px' }}>🏗️</div>
                        <div style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '4px' }}>{partnershipStats.totalDevelopers}</div>
                        <div style={{ opacity: 0.9, fontSize: '14px' }}>Promoteurs</div>
                    </div>

                    <div style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', padding: '20px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.2)' }}>
                        <div style={{ fontSize: '32px', marginBottom: '8px' }}>🏢</div>
                        <div style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '4px' }}>{partnershipStats.totalAgencies}</div>
                        <div style={{ opacity: 0.9, fontSize: '14px' }}>Agences</div>
                    </div>

                    <div style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', padding: '20px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.2)' }}>
                        <div style={{ fontSize: '32px', marginBottom: '8px' }}>📄</div>
                        <div style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '4px' }}>{partnershipStats.activePartnerships}</div>
                        <div style={{ opacity: 0.9, fontSize: '14px' }}>Contrats Actifs</div>
                    </div>

                    <div style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', padding: '20px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.2)' }}>
                        <div style={{ fontSize: '32px', marginBottom: '8px' }}>📋</div>
                        <div style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '4px' }}>{partnershipStats.totalReservations}</div>
                        <div style={{ opacity: 0.9, fontSize: '14px' }}>Réservations</div>
                    </div>

                    <div style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', padding: '20px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.2)' }}>
                        <div style={{ fontSize: '32px', marginBottom: '8px' }}>💰</div>
                        <div style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '4px' }}>{(partnershipStats.partnershipRevenue / 1000000).toFixed(1)}M</div>
                        <div style={{ opacity: 0.9, fontSize: '14px' }}>CA Partenariat</div>
                    </div>
                </div>

                <div style={{ marginTop: '24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
                    <a href="/admin/partnership/developers" style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', padding: '16px 20px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.2)', textDecoration: 'none', color: 'white', display: 'flex', alignItems: 'center', gap: '12px', transition: 'all 0.3s' }}>
                        <span style={{ fontSize: '24px' }}>🏗️</span>
                        <span style={{ fontWeight: 'bold' }}>Gérer les Promoteurs</span>
                    </a>

                    <a href="/admin/partnership/agencies" style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', padding: '16px 20px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.2)', textDecoration: 'none', color: 'white', display: 'flex', alignItems: 'center', gap: '12px', transition: 'all 0.3s' }}>
                        <span style={{ fontSize: '24px' }}>🏢</span>
                        <span style={{ fontWeight: 'bold' }}>Gérer les Agences</span>
                    </a>

                    <a href="/admin/partnership/reservations" style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', padding: '16px 20px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.2)', textDecoration: 'none', color: 'white', display: 'flex', alignItems: 'center', gap: '12px', transition: 'all 0.3s' }}>
                        <span style={{ fontSize: '24px' }}>📋</span>
                        <span style={{ fontWeight: 'bold' }}>Voir les Réservations</span>
                    </a>
                </div>
            </div>

            {/* Recent Transactions Table */}
            <div style={{ marginTop: '32px', background: 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1B254B', marginBottom: '24px' }}>Transactions Récentes</h3>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ textAlign: 'left', color: '#A3AED0', borderBottom: '1px solid #eee' }}>
                            <th style={{ padding: '12px', fontWeight: '500' }}>Propriété</th>
                            <th style={{ padding: '12px', fontWeight: '500' }}>Type</th>
                            <th style={{ padding: '12px', fontWeight: '500' }}>Date</th>
                            <th style={{ padding: '12px', fontWeight: '500' }}>Montant</th>
                            <th style={{ padding: '12px', fontWeight: '500' }}>Statut</th>
                            <th style={{ padding: '12px', fontWeight: '500' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style={{ borderBottom: '1px solid #f9f9f9' }}>
                            <td style={{ padding: '16px 12px', fontWeight: 'bold', color: '#1B254B' }}>Appartement F4 Plateau</td>
                            <td style={{ padding: '16px 12px' }}>Location</td>
                            <td style={{ padding: '16px 12px' }}>06 Déc 2025</td>
                            <td style={{ padding: '16px 12px' }}>1.200.000 CFA</td>
                            <td style={{ padding: '16px 12px' }}><span style={{ background: '#E6F8F1', color: '#05CD99', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold' }}>Payé</span></td>
                            <td style={{ padding: '16px 12px' }}>...</td>
                        </tr>
                        <tr style={{ borderBottom: '1px solid #f9f9f9' }}>
                            <td style={{ padding: '16px 12px', fontWeight: 'bold', color: '#1B254B' }}>Villa Saly Portudal</td>
                            <td style={{ padding: '16px 12px' }}>Vente</td>
                            <td style={{ padding: '16px 12px' }}>04 Déc 2025</td>
                            <td style={{ padding: '16px 12px' }}>85.000.000 CFA</td>
                            <td style={{ padding: '16px 12px' }}><span style={{ background: '#FFF7E6', color: '#FFB547', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold' }}>En cours</span></td>
                            <td style={{ padding: '16px 12px' }}>...</td>
                        </tr>
                        <tr style={{ borderBottom: '1px solid #f9f9f9' }}>
                            <td style={{ padding: '16px 12px', fontWeight: 'bold', color: '#1B254B' }}>Bureau Point E</td>
                            <td style={{ padding: '16px 12px' }}>Location</td>
                            <td style={{ padding: '16px 12px' }}>03 Déc 2025</td>
                            <td style={{ padding: '16px 12px' }}>500.000 CFA</td>
                            <td style={{ padding: '16px 12px' }}><span style={{ background: '#E6F8F1', color: '#05CD99', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold' }}>Payé</span></td>
                            <td style={{ padding: '16px 12px' }}>...</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
