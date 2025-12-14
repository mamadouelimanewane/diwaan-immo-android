'use client';

import { useState } from 'react';

export default function AgentsPage() {
    const [agents, setAgents] = useState([
        { id: 1, name: 'Moussa Diop', agency: 'Diop Immobilier', properties: 12, rating: 4.8, status: 'Vérifié', joined: 'Jan 2024' },
        { id: 2, name: 'Agence Teranga', agency: 'Teranga Immo', properties: 45, rating: 4.5, status: 'Vérifié', joined: 'Fév 2024' },
        { id: 3, name: 'Jean Gomis', agency: 'Indépendant', properties: 3, rating: 3.9, status: 'En attente', joined: 'Déc 2025' },
        { id: 4, name: 'Sarah Ndiaye', agency: 'Prestige Dakar', properties: 28, rating: 4.9, status: 'Vérifié', joined: 'Mar 2024' },
    ]);

    const [showValidateModal, setShowValidateModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [selectedAgent, setSelectedAgent] = useState<any>(null);

    const handleView = (agent: any) => {
        setSelectedAgent(agent);
        setShowViewModal(true);
    };

    const handleSuspend = (id: number) => {
        if (confirm('Êtes-vous sûr de vouloir suspendre cet agent ?')) {
            alert('Agent suspendu avec succès');
        }
    };

    const handleValidate = (id: number) => {
        setAgents(agents.map(a =>
            a.id === id ? { ...a, status: 'Vérifié' } : a
        ));
        alert('Agent validé avec succès!');
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1B254B' }}>Agents & Professionnels</h1>
                <button
                    onClick={() => setShowValidateModal(true)}
                    style={{ background: '#006AFF', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                    + Valider un agent
                </button>
            </div>

            <div style={{ background: 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ textAlign: 'left', color: '#A3AED0', borderBottom: '1px solid #eee' }}>
                            <th style={{ padding: '16px' }}>Agent / Agence</th>
                            <th style={{ padding: '16px' }}>Société</th>
                            <th style={{ padding: '16px' }}>Propriétés</th>
                            <th style={{ padding: '16px' }}>Note</th>
                            <th style={{ padding: '16px' }}>Rejoint le</th>
                            <th style={{ padding: '16px' }}>Statut</th>
                            <th style={{ padding: '16px', textAlign: 'right' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {agents.map((agent) => (
                            <tr key={agent.id} style={{ borderBottom: '1px solid #f9f9f9', fontSize: '14px' }}>
                                <td style={{ padding: '16px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#666' }}>
                                            {agent.name.charAt(0)}
                                        </div>
                                        <div style={{ fontWeight: 'bold', color: '#1B254B' }}>{agent.name}</div>
                                    </div>
                                </td>
                                <td style={{ padding: '16px', color: '#666' }}>{agent.agency}</td>
                                <td style={{ padding: '16px', fontWeight: 'bold' }}>{agent.properties}</td>
                                <td style={{ padding: '16px' }}>⭐ {agent.rating}</td>
                                <td style={{ padding: '16px', color: '#666' }}>{agent.joined}</td>
                                <td style={{ padding: '16px' }}>
                                    <span style={{
                                        padding: '4px 10px',
                                        borderRadius: '6px',
                                        fontWeight: 'bold',
                                        fontSize: '12px',
                                        background: agent.status === 'Vérifié' ? '#E6F8F1' : '#FFF7E6',
                                        color: agent.status === 'Vérifié' ? '#05CD99' : '#FFB547'
                                    }}>
                                        {agent.status}
                                    </span>
                                </td>
                                <td style={{ padding: '16px', textAlign: 'right' }}>
                                    {agent.status === 'En attente' && (
                                        <button
                                            onClick={() => handleValidate(agent.id)}
                                            style={{ background: '#05CD99', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', marginRight: '8px', fontSize: '12px', fontWeight: 'bold' }}
                                        >
                                            ✓ Valider
                                        </button>
                                    )}
                                    <button
                                        onClick={() => handleView(agent)}
                                        style={{ background: 'none', border: 'none', cursor: 'pointer', marginRight: '8px', fontSize: '18px' }}
                                        title="Voir le profil"
                                    >
                                        🔍
                                    </button>
                                    <button
                                        onClick={() => handleSuspend(agent.id)}
                                        style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px' }}
                                        title="Suspendre"
                                    >
                                        🚫
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal Validation */}
            {showValidateModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
                    <div style={{ background: 'white', padding: '32px', borderRadius: '16px', width: '500px', maxWidth: '90%' }}>
                        <h2 style={{ marginBottom: '24px', color: '#1B254B' }}>Valider un nouvel agent</h2>
                        <form onSubmit={(e) => { e.preventDefault(); alert('Agent validé!'); setShowValidateModal(false); }}>
                            <div style={{ marginBottom: '16px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#666' }}>Nom de l'agent</label>
                                <input type="text" required style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }} />
                            </div>
                            <div style={{ marginBottom: '16px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#666' }}>Agence/Société</label>
                                <input type="text" required style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }} />
                            </div>
                            <div style={{ marginBottom: '16px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#666' }}>Email professionnel</label>
                                <input type="email" required style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }} />
                            </div>
                            <div style={{ marginBottom: '16px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#666' }}>Téléphone</label>
                                <input type="tel" required style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }} />
                            </div>
                            <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                                <button type="button" onClick={() => setShowValidateModal(false)} style={{ flex: 1, padding: '12px', background: '#eee', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>Annuler</button>
                                <button type="submit" style={{ flex: 1, padding: '12px', background: '#006AFF', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>Valider</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal Voir */}
            {showViewModal && selectedAgent && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
                    <div style={{ background: 'white', padding: '32px', borderRadius: '16px', width: '500px', maxWidth: '90%' }}>
                        <h2 style={{ marginBottom: '24px', color: '#1B254B' }}>Profil de l'agent</h2>
                        <div style={{ marginBottom: '16px' }}>
                            <strong>Nom:</strong> {selectedAgent.name}
                        </div>
                        <div style={{ marginBottom: '16px' }}>
                            <strong>Agence:</strong> {selectedAgent.agency}
                        </div>
                        <div style={{ marginBottom: '16px' }}>
                            <strong>Nombre de propriétés:</strong> {selectedAgent.properties}
                        </div>
                        <div style={{ marginBottom: '16px' }}>
                            <strong>Note moyenne:</strong> ⭐ {selectedAgent.rating}/5
                        </div>
                        <div style={{ marginBottom: '16px' }}>
                            <strong>Rejoint le:</strong> {selectedAgent.joined}
                        </div>
                        <div style={{ marginBottom: '16px' }}>
                            <strong>Statut:</strong> {selectedAgent.status}
                        </div>
                        <button onClick={() => setShowViewModal(false)} style={{ width: '100%', padding: '12px', background: '#006AFF', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', marginTop: '16px' }}>Fermer</button>
                    </div>
                </div>
            )}
        </div>
    );
}
