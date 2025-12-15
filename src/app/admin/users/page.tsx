'use client';

import { useState, useEffect } from 'react';

export default function UsersPage() {
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState<any>(null);

    // Load users from API
    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/users');
            const data = await response.json();
            if (data.success) {
                setUsers(data.users);
            }
        } catch (error) {
            console.error('Failed to load users', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
            try {
                const response = await fetch(`/api/users/${id}`, {
                    method: 'DELETE'
                });
                const data = await response.json();
                if (data.success) {
                    loadUsers(); // Reload list
                } else {
                    alert('Erreur lors de la suppression');
                }
            } catch (error) {
                alert('Erreur lors de la suppression');
                console.error(error);
            }
        }
    };

    const handleEdit = (user: any) => {
        setSelectedUser(user);
        setShowEditModal(true);
    };

    const handleGodMode = (user: any) => {
        alert(`Mode God activé pour ${user.name}. Vous êtes maintenant connecté en tant que cet utilisateur.`);
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1B254B' }}>Utilisateurs ({users.length})</h1>
                <button
                    onClick={() => setShowAddModal(true)}
                    style={{ background: '#006AFF', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                    + Nouvel Utilisateur
                </button>
            </div>

            <div style={{ background: 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
                {loading ? (
                    <div style={{ padding: '40px', textAlign: 'center', color: '#888' }}>Chargement des utilisateurs...</div>
                ) : (
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ textAlign: 'left', color: '#A3AED0', borderBottom: '1px solid #eee' }}>
                                <th style={{ padding: '16px' }}>Nom</th>
                                <th style={{ padding: '16px' }}>Email</th>
                                <th style={{ padding: '16px' }}>Rôle</th>
                                <th style={{ padding: '16px' }}>Dernière Connexion</th>
                                <th style={{ padding: '16px' }}>Statut</th>
                                <th style={{ padding: '16px', textAlign: 'right' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id} style={{ borderBottom: '1px solid #f9f9f9', fontSize: '14px' }}>
                                    <td style={{ padding: '16px', fontWeight: 'bold', color: '#1B254B' }}>{user.name}</td>
                                    <td style={{ padding: '16px', color: '#666' }}>{user.email}</td>
                                    <td style={{ padding: '16px' }}>
                                        <span style={{
                                            padding: '4px 10px',
                                            borderRadius: '6px',
                                            fontWeight: 'bold',
                                            fontSize: '12px',
                                            background: user.role === 'Admin' ? '#E6E6FA' : user.role === 'Agent' ? '#E6F8F1' : '#F4F7FE',
                                            color: user.role === 'Admin' ? '#4318FF' : user.role === 'Agent' ? '#05CD99' : '#006AFF'
                                        }}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td style={{ padding: '16px', color: '#666' }}>{user.lastLogin}</td>
                                    <td style={{ padding: '16px' }}>
                                        <span style={{
                                            color: user.status === 'Actif' ? '#05CD99' : '#E31A1A',
                                            fontWeight: 'bold'
                                        }}>
                                            • {user.status}
                                        </span>
                                    </td>
                                    <td style={{ padding: '16px', textAlign: 'right' }}>
                                        <button
                                            onClick={() => handleGodMode(user)}
                                            style={{ background: 'none', border: 'none', cursor: 'pointer', marginRight: '8px', fontSize: '18px' }}
                                            title="Se connecter en tant que (God Mode)"
                                        >
                                            🔑
                                        </button>
                                        <button
                                            onClick={() => handleEdit(user)}
                                            style={{ background: 'none', border: 'none', cursor: 'pointer', marginRight: '8px', fontSize: '18px' }}
                                            title="Modifier"
                                        >
                                            ✏️
                                        </button>
                                        <button
                                            onClick={() => handleDelete(user.id)}
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

            {/* Modal Ajouter */}
            {showAddModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
                    <div style={{ background: 'white', padding: '32px', borderRadius: '16px', width: '500px', maxWidth: '90%' }}>
                        <h2 style={{ marginBottom: '24px', color: '#1B254B' }}>Ajouter un utilisateur</h2>
                        <form onSubmit={(e) => { e.preventDefault(); alert('Utilisateur ajouté!'); setShowAddModal(false); }}>
                            <div style={{ marginBottom: '16px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#666' }}>Nom complet</label>
                                <input type="text" required style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }} />
                            </div>
                            <div style={{ marginBottom: '16px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#666' }}>Email</label>
                                <input type="email" required style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }} />
                            </div>
                            <div style={{ marginBottom: '16px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#666' }}>Rôle</label>
                                <select style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }}>
                                    <option>Utilisateur</option>
                                    <option>Agent</option>
                                    <option>Admin</option>
                                </select>
                            </div>
                            <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                                <button type="button" onClick={() => setShowAddModal(false)} style={{ flex: 1, padding: '12px', background: '#eee', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>Annuler</button>
                                <button type="submit" style={{ flex: 1, padding: '12px', background: '#006AFF', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>Ajouter</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal Modifier */}
            {showEditModal && selectedUser && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
                    <div style={{ background: 'white', padding: '32px', borderRadius: '16px', width: '500px', maxWidth: '90%' }}>
                        <h2 style={{ marginBottom: '24px', color: '#1B254B' }}>Modifier l'utilisateur</h2>
                        <form onSubmit={(e) => { e.preventDefault(); alert('Utilisateur modifié!'); setShowEditModal(false); }}>
                            <div style={{ marginBottom: '16px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#666' }}>Nom</label>
                                <input type="text" defaultValue={selectedUser.name} style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }} />
                            </div>
                            <div style={{ marginBottom: '16px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#666' }}>Email</label>
                                <input type="email" defaultValue={selectedUser.email} style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }} />
                            </div>
                            <div style={{ marginBottom: '16px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#666' }}>Rôle</label>
                                <select defaultValue={selectedUser.role} style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }}>
                                    <option>Utilisateur</option>
                                    <option>Agent</option>
                                    <option>Admin</option>
                                </select>
                            </div>
                            <div style={{ marginBottom: '16px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#666' }}>Statut</label>
                                <select defaultValue={selectedUser.status} style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }}>
                                    <option>Actif</option>
                                    <option>Suspendu</option>
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
        </div>
    );
}
