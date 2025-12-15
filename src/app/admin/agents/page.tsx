'use client';

import { useState, useEffect } from 'react';

interface AgentFormData {
    name: string;
    email: string;
    phone: string;
    role: string;
}

export default function AgentsPage() {
    const [agents, setAgents] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showValidateModal, setShowValidateModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedAgent, setSelectedAgent] = useState<any>(null);
    const [formData, setFormData] = useState<AgentFormData>({
        name: '',
        email: '',
        phone: '',
        role: 'AGENT'
    });

    const loadAgents = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('/api/users?role=AGENT', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            if (data.success) {
                setAgents(data.users);
            }
        } catch (error) {
            console.error('Erreur lors du chargement des agents:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadAgents();
    }, []);

    const handleView = (agent: any) => {
        setSelectedAgent(agent);
        setShowViewModal(true);
    };

    const handleEdit = (agent: any) => {
        setSelectedAgent(agent);
        setFormData({
            name: agent.name,
            email: agent.email,
            phone: agent.phone || '',
            role: agent.role
        });
        setShowEditModal(true);
    };

    const handleUpdateAgent = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`/api/users/${selectedAgent.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            if (data.success) {
                alert('Agent modifié avec succès!');
                setShowEditModal(false);
                loadAgents();
            } else {
                alert('Erreur lors de la modification: ' + data.error);
            }
        } catch (error) {
            console.error('Erreur:', error);
            alert('Erreur lors de la modification');
        }
    };

    const handleSuspend = async (id: string) => {
        if (confirm('Êtes-vous sûr de vouloir suspendre cet agent ?')) {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`/api/users/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    alert('Agent suspendu avec succès');
                    loadAgents();
                }
            } catch (error) {
                console.error('Erreur:', error);
                alert('Erreur lors de la suspension');
            }
        }
    };

    const handleValidate = async (id: string) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`/api/users/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ verified: true })
            });

            if (response.ok) {
                alert('Agent validé avec succès!');
                loadAgents();
            }
        } catch (error) {
            console.error('Erreur:', error);
            alert('Erreur lors de la validation');
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1B254B' }}>Agents & Professionnels</h1>
                <button
                    onClick={loadAgents}
                    style={{ background: '#006AFF', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                    🔄 Actualiser
                </button>
            </div>

            <div style={{ background: 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
                {loading ? (
                    <div style={{ padding: '40px', textAlign: 'center', color: '#888' }}>Chargement des agents...</div>
                ) : (
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ textAlign: 'left', color: '#A3AED0', borderBottom: '1px solid #eee' }}>
                                <th style={{ padding: '16px' }}>Agent / Agence</th>
                                <th style={{ padding: '16px' }}>Email</th>
                                <th style={{ padding: '16px' }}>Téléphone</th>
                                <th style={{ padding: '16px' }}>Rôle</th>
                                <th style={{ padding: '16px' }}>Rejoint le</th>
                                <th style={{ padding: '16px', textAlign: 'right' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {agents.length === 0 && (
                                <tr>
                                    <td colSpan={6} style={{ padding: '32px', textAlign: 'center', color: '#888' }}>Aucun agent trouvé.</td>
                                </tr>
                            )}
                            {agents.map((agent) => (
                                <tr key={agent.id} style={{ borderBottom: '1px solid #f9f9f9', fontSize: '14px' }}>
                                    <td style={{ padding: '16px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#666' }}>
                                                {agent.name.charAt(0).toUpperCase()}
                                            </div>
                                            <div style={{ fontWeight: 'bold', color: '#1B254B' }}>{agent.name}</div>
                                        </div>
                                    </td>
                                    <td style={{ padding: '16px', color: '#666' }}>{agent.email}</td>
                                    <td style={{ padding: '16px', color: '#666' }}>{agent.phone || 'N/A'}</td>
                                    <td style={{ padding: '16px' }}>
                                        <span style={{
                                            padding: '4px 10px',
                                            borderRadius: '6px',
                                            fontWeight: 'bold',
                                            fontSize: '12px',
                                            background: agent.role === 'AGENT' ? '#E6F8F1' : '#FFF7E6',
                                            color: agent.role === 'AGENT' ? '#05CD99' : '#FFB547'
                                        }}>
                                            {agent.role}
                                        </span>
                                    </td>
                                    <td style={{ padding: '16px', color: '#666' }}>
                                        {new Date(agent.createdAt).toLocaleDateString('fr-FR')}
                                    </td>
                                    <td style={{ padding: '16px', textAlign: 'right' }}>
                                        <button
                                            onClick={() => handleEdit(agent)}
                                            style={{ background: '#006AFF', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', marginRight: '8px', fontSize: '12px', fontWeight: 'bold' }}
                                        >
                                            ✏️ Modifier
                                        </button>
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
                                            title="Supprimer"
                                        >
                                            🗑️
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
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

            {/* Modal Modifier */}
            {showEditModal && selectedAgent && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
                    <div style={{ background: 'white', padding: '32px', borderRadius: '16px', width: '500px', maxWidth: '90%' }}>
                        <h2 style={{ marginBottom: '24px', color: '#1B254B' }}>Modifier l'agent</h2>
                        <form onSubmit={handleUpdateAgent}>
                            <div style={{ marginBottom: '16px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#666' }}>Nom complet</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                    style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }}
                                />
                            </div>
                            <div style={{ marginBottom: '16px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#666' }}>Email</label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                    style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }}
                                />
                            </div>
                            <div style={{ marginBottom: '16px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#666' }}>Téléphone</label>
                                <input
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }}
                                />
                            </div>
                            <div style={{ marginBottom: '16px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#666' }}>Rôle</label>
                                <select
                                    value={formData.role}
                                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                    style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }}
                                >
                                    <option value="USER">Utilisateur</option>
                                    <option value="AGENT">Agent</option>
                                    <option value="OWNER">Propriétaire</option>
                                    <option value="ADMIN">Administrateur</option>
                                </select>
                            </div>
                            <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                                <button type="button" onClick={() => setShowEditModal(false)} style={{ flex: 1, padding: '12px', background: '#eee', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>Annuler</button>
                                <button type="submit" style={{ flex: 1, padding: '12px', background: '#006AFF', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>Enregistrer</button>
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
