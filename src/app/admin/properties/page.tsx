'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api-client';

export default function PropertiesPage() {
    const [properties, setProperties] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const [showAddModal, setShowAddModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedProperty, setSelectedProperty] = useState<any>(null);

    const loadProperties = async () => {
        setLoading(true);
        try {
            const response = await api.properties.getAll({ limit: 100 } as any);
            if (response.success) {
                setProperties(response.properties);
            }
        } catch (error) {
            console.error("Failed to load properties", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProperties();
    }, []);

    const handleDelete = async (id: string) => {
        if (confirm('Êtes-vous sûr de vouloir supprimer cette propriété ?')) {
            try {
                await api.properties.delete(id);
                // Refresh list
                loadProperties();
            } catch (error) {
                alert('Erreur lors de la suppression');
                console.error(error);
            }
        }
    };

    const handleView = (prop: any) => {
        setSelectedProperty(prop);
        setShowViewModal(true);
    };

    const handleEdit = (prop: any) => {
        setSelectedProperty(prop);
        setShowEditModal(true);
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1B254B' }}>Gestion des Propriétés</h1>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <button onClick={loadProperties} style={{ background: 'white', border: '1px solid #ddd', padding: '12px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', color: '#666' }}>Actualiser</button>
                    <button
                        onClick={() => setShowAddModal(true)}
                        style={{ background: '#006AFF', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                        + Ajouter
                    </button>
                </div>
            </div>

            <div style={{ background: 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
                {loading ? (
                    <div style={{ padding: '40px', textAlign: 'center', color: '#888' }}>Chargement des propriétés...</div>
                ) : (
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ textAlign: 'left', color: '#A3AED0', borderBottom: '1px solid #eee' }}>
                                <th style={{ padding: '16px' }}>Propriété</th>
                                <th style={{ padding: '16px' }}>Type</th>
                                <th style={{ padding: '16px' }}>Prix</th>
                                <th style={{ padding: '16px' }}>Propriétaire/Agent</th>
                                <th style={{ padding: '16px' }}>Date</th>
                                <th style={{ padding: '16px' }}>Statut</th>
                                <th style={{ padding: '16px', textAlign: 'right' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {properties.length === 0 && (
                                <tr>
                                    <td colSpan={7} style={{ padding: '32px', textAlign: 'center', color: '#888' }}>Aucune propriété trouvée.</td>
                                </tr>
                            )}
                            {properties.map((prop) => (
                                <tr key={prop.id} style={{ borderBottom: '1px solid #f9f9f9', fontSize: '14px' }}>
                                    <td style={{ padding: '16px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                            <div style={{ width: '60px', height: '40px', background: '#eee', borderRadius: '6px', overflow: 'hidden' }}>
                                                {prop.images?.[0] && <img src={prop.images[0]} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                                            </div>
                                            <div>
                                                <div style={{ fontWeight: 'bold', color: '#1B254B' }}>{prop.title}</div>
                                                <div style={{ fontSize: '11px', color: '#888' }}>{prop.id.substring(0, 8)}...</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td style={{ padding: '16px' }}>
                                        <span style={{ fontSize: '12px', padding: '4px 8px', borderRadius: '4px', background: '#f0f4f8' }}>
                                            {prop.type} ({prop.transactionType === 'SALE' ? 'Vente' : 'Loc'})
                                        </span>
                                    </td>
                                    <td style={{ padding: '16px', fontWeight: 'bold' }}>{prop.price.toLocaleString()} CFA</td>
                                    <td style={{ padding: '16px', color: '#666' }}>{prop.owner?.name || 'Admin'}</td>
                                    <td style={{ padding: '16px', color: '#666' }}>{new Date(prop.createdAt).toLocaleDateString()}</td>
                                    <td style={{ padding: '16px' }}>
                                        <span style={{
                                            padding: '4px 10px',
                                            borderRadius: '6px',
                                            fontWeight: 'bold',
                                            fontSize: '12px',
                                            background: prop.status === 'ACTIVE' ? '#E6F8F1' : prop.status === 'PENDING' ? '#FFF7E6' : '#FFEBEB',
                                            color: prop.status === 'ACTIVE' ? '#05CD99' : prop.status === 'PENDING' ? '#FFB547' : '#E31A1A'
                                        }}>
                                            {prop.status}
                                        </span>
                                    </td>
                                    <td style={{ padding: '16px', textAlign: 'right' }}>
                                        <button
                                            onClick={() => handleView(prop)}
                                            style={{ background: 'none', border: 'none', cursor: 'pointer', marginRight: '8px', fontSize: '18px' }}
                                            title="Voir"
                                        >
                                            👁️
                                        </button>
                                        <button
                                            onClick={() => handleDelete(prop.id)}
                                            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px', color: '#E31A1A' }}
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
                        <h2 style={{ marginBottom: '24px', color: '#1B254B' }}>Ajouter une propriété</h2>
                        <form onSubmit={(e) => { e.preventDefault(); alert('Propriété ajoutée!'); setShowAddModal(false); }}>
                            <div style={{ marginBottom: '16px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#666' }}>Titre</label>
                                <input type="text" required style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }} />
                            </div>
                            <div style={{ marginBottom: '16px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#666' }}>Type</label>
                                <select style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }}>
                                    <option>Vente</option>
                                    <option>Location</option>
                                </select>
                            </div>
                            <div style={{ marginBottom: '16px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#666' }}>Prix</label>
                                <input type="text" required style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }} />
                            </div>
                            <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                                <button type="button" onClick={() => setShowAddModal(false)} style={{ flex: 1, padding: '12px', background: '#eee', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>Annuler</button>
                                <button type="submit" style={{ flex: 1, padding: '12px', background: '#006AFF', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>Ajouter</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal Voir */}
            {showViewModal && selectedProperty && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
                    <div style={{ background: 'white', padding: '32px', borderRadius: '16px', width: '500px', maxWidth: '90%' }}>
                        <h2 style={{ marginBottom: '24px', color: '#1B254B' }}>Détails de la propriété</h2>
                        <div style={{ marginBottom: '16px' }}>
                            <strong>ID:</strong> {selectedProperty.id}
                        </div>
                        <div style={{ marginBottom: '16px' }}>
                            <strong>Titre:</strong> {selectedProperty.title}
                        </div>
                        <div style={{ marginBottom: '16px' }}>
                            <strong>Type:</strong> {selectedProperty.type}
                        </div>
                        <div style={{ marginBottom: '16px' }}>
                            <strong>Prix:</strong> {selectedProperty.price}
                        </div>
                        <div style={{ marginBottom: '16px' }}>
                            <strong>Agent:</strong> {selectedProperty.agent}
                        </div>
                        <div style={{ marginBottom: '16px' }}>
                            <strong>Statut:</strong> {selectedProperty.status}
                        </div>
                        <button onClick={() => setShowViewModal(false)} style={{ width: '100%', padding: '12px', background: '#006AFF', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', marginTop: '16px' }}>Fermer</button>
                    </div>
                </div>
            )}

            {/* Modal Modifier */}
            {showEditModal && selectedProperty && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
                    <div style={{ background: 'white', padding: '32px', borderRadius: '16px', width: '500px', maxWidth: '90%' }}>
                        <h2 style={{ marginBottom: '24px', color: '#1B254B' }}>Modifier la propriété</h2>
                        <form onSubmit={(e) => { e.preventDefault(); alert('Propriété modifiée!'); setShowEditModal(false); }}>
                            <div style={{ marginBottom: '16px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#666' }}>Titre</label>
                                <input type="text" defaultValue={selectedProperty.title} style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }} />
                            </div>
                            <div style={{ marginBottom: '16px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#666' }}>Prix</label>
                                <input type="text" defaultValue={selectedProperty.price} style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }} />
                            </div>
                            <div style={{ marginBottom: '16px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#666' }}>Statut</label>
                                <select defaultValue={selectedProperty.status} style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }}>
                                    <option>Actif</option>
                                    <option>En attente</option>
                                    <option>Rejeté</option>
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
