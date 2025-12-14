'use client';

import Link from 'next/link';
import { Plus, Home, TrendingUp, Users, Settings } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/lib/api-client';
import { useState, useEffect } from 'react';

export default function AgentDashboard() {
    const { user } = useAuth();
    const [properties, setProperties] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProperties = async () => {
            if (!user) return;

            setLoading(true);
            try {
                // Fetch ALL properties for this owner (status=ANY)
                const response = await api.properties.getAll({
                    ownerId: user.id,
                    status: 'ANY'
                });
                if (response.success) {
                    setProperties(response.properties);
                }
            } catch (error) {
                console.error("Failed to fetch agent properties", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProperties();
    }, [user]);

    // Stats calculation
    const activeCount = properties.filter(p => p.status === 'ACTIVE').length;
    const totalViews = properties.reduce((acc, curr) => acc + (curr.views || 0), 0);

    return (
        <div className="container" style={{ padding: '40px 24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                <div>
                    <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#1A202C' }}>Tableau de Bord Agent</h1>
                    <p style={{ color: '#718096' }}>Bienvenue, {user?.name || 'Agent'}. Gérez vos biens et votre performance.</p>
                </div>
                <Link href="/dashboard/agent/add-property">
                    <button style={{
                        display: 'flex', alignItems: 'center', gap: '8px',
                        padding: '12px 24px', background: '#006AFF', color: 'white',
                        border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer'
                    }}>
                        <Plus size={20} /> Ajouter un bien
                    </button>
                </Link>
            </div>

            {/* Stats Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px', marginBottom: '40px' }}>
                {[
                    { label: 'Biens en ligne', value: activeCount.toString(), icon: <Home color="#006AFF" />, change: 'Mise à jour instantanée' },
                    { label: 'Vues totales', value: totalViews.toLocaleString(), icon: <TrendingUp color="#38A169" />, change: 'Global' },
                    { label: 'Biens en attente', value: properties.filter(p => p.status === 'PENDING').length.toString(), icon: <Users color="#D69E2E" />, change: 'En cours de validation' },
                    { label: 'Total Annonces', value: properties.length.toString(), icon: <TrendingUp color="#805AD5" />, change: 'Cumulé' },
                ].map((stat, i) => (
                    <div key={i} style={{ background: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                            <div style={{ color: '#718096', fontWeight: 600 }}>{stat.label}</div>
                            <div style={{ padding: '8px', background: '#F7FAFC', borderRadius: '8px' }}>{stat.icon}</div>
                        </div>
                        <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#1A202C', marginBottom: '8px' }}>{stat.value}</div>
                        <div style={{ fontSize: '13px', color: '#718096' }}>{stat.change}</div>
                    </div>
                ))}
            </div>

            {/* Main Content Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '40px' }}>

                {/* Listings Section */}
                <div style={{ background: 'white', padding: '32px', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                        <h2 style={{ fontSize: '20px', fontWeight: 'bold' }}>Mes Annonces ({properties.length})</h2>
                        <Link href="/rent/manager/listings" style={{ color: '#006AFF', fontWeight: 600, textDecoration: 'none' }}>Tout voir</Link>
                    </div>

                    {loading ? (
                        <div style={{ padding: '40px', textAlign: 'center', color: '#666' }}>Chargement...</div>
                    ) : properties.length === 0 ? (
                        <div style={{ padding: '40px', textAlign: 'center', background: '#F7FAFC', borderRadius: '12px' }}>
                            <Home size={40} color="#CBD5E0" style={{ marginBottom: '16px' }} />
                            <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#4A5568' }}>Aucune annonce</h3>
                            <p style={{ color: '#718096', marginBottom: '16px' }}>Vous n'avez pas encore publié de bien.</p>
                            <Link href="/dashboard/agent/add-property">
                                <button style={{ padding: '10px 20px', background: '#006AFF', color: 'white', borderRadius: '8px', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>
                                    Créer ma première annonce
                                </button>
                            </Link>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {properties.map((item) => (
                                <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', border: '1px solid #EDF2F7', borderRadius: '12px' }}>
                                    <div style={{ width: '60px', height: '60px', background: '#F7FAFC', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', borderRadius: '8px' }}>
                                        {item.type === 'APARTMENT' ? '🏢' : item.type === 'HOUSE' ? '🏠' : '📍'}
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontWeight: 'bold', color: '#2D3748' }}>{item.title}</div>
                                        <div style={{ color: '#718096', fontSize: '14px' }}>{item.price?.toLocaleString()} FCFA • {item.views} vues</div>
                                    </div>
                                    <div>
                                        <span style={{
                                            padding: '4px 12px',
                                            borderRadius: '20px',
                                            fontSize: '12px',
                                            fontWeight: 'bold',
                                            background: item.status === 'ACTIVE' ? '#C6F6D5' : '#FEFCBF',
                                            color: item.status === 'ACTIVE' ? '#22543D' : '#744210'
                                        }}>
                                            {item.status}
                                        </span>
                                    </div>
                                    <button style={{ padding: '8px', color: '#A0AEC0', background: 'none', border: 'none', cursor: 'pointer' }}>
                                        <Settings size={20} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Verification/Leads Sidebar */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

                    {/* Verified Badge Widget */}
                    <div style={{ background: 'linear-gradient(135deg, #006AFF 0%, #0049B0 100%)', padding: '24px', borderRadius: '16px', color: 'white' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                            <div style={{ padding: '8px', background: 'rgba(255,255,255,0.2)', borderRadius: '50%' }}>
                                <Users size={24} />
                            </div>
                            <span style={{ fontWeight: 'bold' }}>Certification Agent</span>
                        </div>
                        <p style={{ fontSize: '14px', marginBottom: '16px', opacity: 0.9 }}>
                            Profil Agent Standard. Ajoutez votre carte professionnelle pour obtenir le badge officiel Diwaan Pro.
                        </p>
                        <button style={{ width: '100%', padding: '10px', background: 'white', color: '#006AFF', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
                            Compléter mon profil
                        </button>
                    </div>

                    {/* Recent Leads - Simulated for now */}
                    <div style={{ background: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
                        <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px' }}>Derniers Contacts</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {[
                                { name: "Moussa Diop", type: "Achât", time: "2h" },
                                { name: "Fatou Sow", type: "Location", time: "5h" },
                                { name: "Jean Gomis", type: "Visite", time: "1j" },
                            ].map((lead, i) => (
                                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <div style={{ width: '32px', height: '32px', background: '#E2E8F0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 'bold' }}>
                                            {lead.name.charAt(0)}
                                        </div>
                                        <div>
                                            <div style={{ fontSize: '14px', fontWeight: '600' }}>{lead.name}</div>
                                            <div style={{ fontSize: '12px', color: '#718096' }}>Pour {lead.type}</div>
                                        </div>
                                    </div>
                                    <div style={{ fontSize: '12px', color: '#A0AEC0' }}>{lead.time}</div>
                                </div>
                            ))}
                        </div>
                        <button style={{ width: '100%', marginTop: '16px', padding: '10px', border: '1px solid #E2E8F0', background: 'none', borderRadius: '8px', color: '#4A5568', fontWeight: '600', cursor: 'pointer' }}>
                            Voir tous les contacts
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}
