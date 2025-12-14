'use client';

import { useState } from 'react';

export default function AdsPage() {
    const [showModal, setShowModal] = useState(false);
    const [campaigns] = useState([
        { id: 1, name: "Promo Hiver - Saly", client: "Agence Saly Immo", placement: "Homepage Banner", period: "01 Déc - 31 Déc", clicks: 1240, status: "Active" },
        { id: 2, name: "Lancement Programme Neuf", client: "BATIMAT", placement: "Sidebar Search", period: "15 Nov - 15 Déc", clicks: 850, status: "Active" },
        { id: 3, name: "Assurance Habitation", client: "AXA Sénégal", placement: "Footer", period: "01 Nov - 30 Nov", clicks: 420, status: "Terminé" },
    ]);

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1B254B' }}>Publicités & Sponsors</h1>
                <button
                    onClick={() => setShowModal(true)}
                    style={{ background: '#006AFF', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                    + Nouvelle Campagne
                </button>
            </div>

            {/* Top Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '32px' }}>
                <StatCard title="Revenus Pubs" value="1.2M CFA" change="+15%" />
                <StatCard title="Campagnes Actives" value="8" change="+2" />
                <StatCard title="Clics (CTR)" value="2.4%" change="-0.1%" />
                <StatCard title="Impressions" value="450k" change="+12%" />
            </div>

            {/* Campaign List */}
            <div style={{ background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1B254B', marginBottom: '24px' }}>Campagnes en cours</h3>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ textAlign: 'left', color: '#A3AED0', borderBottom: '1px solid #eee' }}>
                            <th style={{ padding: '16px' }}>Campagne</th>
                            <th style={{ padding: '16px' }}>Client</th>
                            <th style={{ padding: '16px' }}>Placement</th>
                            <th style={{ padding: '16px' }}>Période</th>
                            <th style={{ padding: '16px' }}>Performance</th>
                            <th style={{ padding: '16px' }}>Statut</th>
                        </tr>
                    </thead>
                    <tbody>
                        {campaigns.map(campaign => (
                            <CampaignRow key={campaign.id} {...campaign} />
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal Nouvelle Campagne */}
            {showModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
                    <div style={{ background: 'white', padding: '32px', borderRadius: '16px', width: '500px', maxWidth: '90%' }}>
                        <h2 style={{ marginBottom: '24px', color: '#1B254B' }}>Nouvelle campagne publicitaire</h2>
                        <form onSubmit={(e) => { e.preventDefault(); alert('Campagne créée!'); setShowModal(false); }}>
                            <div style={{ marginBottom: '16px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#666' }}>Nom de la campagne</label>
                                <input type="text" required style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }} />
                            </div>
                            <div style={{ marginBottom: '16px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#666' }}>Client/Annonceur</label>
                                <input type="text" required style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }} />
                            </div>
                            <div style={{ marginBottom: '16px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#666' }}>Emplacement</label>
                                <select style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }}>
                                    <option>Homepage Banner</option>
                                    <option>Sidebar Search</option>
                                    <option>Footer</option>
                                    <option>Modal Popup</option>
                                </select>
                            </div>
                            <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                                <button type="button" onClick={() => setShowModal(false)} style={{ flex: 1, padding: '12px', background: '#eee', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>Annuler</button>
                                <button type="submit" style={{ flex: 1, padding: '12px', background: '#006AFF', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>Créer</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

function StatCard({ title, value, change }: any) {
    return (
        <div style={{ background: 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
            <p style={{ color: '#A3AED0', fontSize: '14px', marginBottom: '8px' }}>{title}</p>
            <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1B254B' }}>{value}</h3>
            <span style={{ fontSize: '12px', color: change.includes('+') ? '#05CD99' : '#E31A1A' }}>{change}</span>
        </div>
    );
}

function CampaignRow({ name, client, placement, period, clicks, status }: any) {
    return (
        <tr style={{ borderBottom: '1px solid #f9f9f9', fontSize: '14px' }}>
            <td style={{ padding: '16px', fontWeight: 'bold', color: '#1B254B' }}>{name}</td>
            <td style={{ padding: '16px', color: '#666' }}>{client}</td>
            <td style={{ padding: '16px' }}>{placement}</td>
            <td style={{ padding: '16px', color: '#666' }}>{period}</td>
            <td style={{ padding: '16px', fontWeight: 'bold' }}>{clicks.toLocaleString()} clics</td>
            <td style={{ padding: '16px' }}>
                <span style={{
                    padding: '4px 10px',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    background: status === 'Active' ? '#E6F8F1' : '#eee',
                    color: status === 'Active' ? '#05CD99' : '#888'
                }}>
                    {status}
                </span>
            </td>
        </tr>
    );
}
