'use client';

import { useState } from 'react';

export default function WorkflowsPage() {
    const [showModal, setShowModal] = useState(false);
    const [workflows, setWorkflows] = useState([
        { id: 1, name: 'Bienvenue Nouvel Agent', active: true, executions: 142, color: '#006AFF' },
        { id: 2, name: 'Relance Paiement', active: true, executions: 28, color: '#FFB547' },
    ]);

    const handleToggle = (id: number) => {
        setWorkflows(workflows.map(w =>
            w.id === id ? { ...w, active: !w.active } : w
        ));
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1B254B' }}>Automatisation (Workflows)</h1>
                <button
                    onClick={() => setShowModal(true)}
                    style={{ background: '#006AFF', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                    + Créer une règle
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>

                {workflows.map(workflow => (
                    <div key={workflow.id} style={{ background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)', borderLeft: `4px solid ${workflow.color}` }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                            <span style={{
                                background: workflow.active ? '#E6F8F1' : '#FFEBEB',
                                color: workflow.active ? '#05CD99' : '#E31A1A',
                                padding: '4px 8px',
                                borderRadius: '4px',
                                fontSize: '11px',
                                fontWeight: 'bold'
                            }}>
                                {workflow.active ? 'ACTIF' : 'INACTIF'}
                            </span>
                            <button
                                onClick={() => handleToggle(workflow.id)}
                                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px' }}
                                title="Activer/Désactiver"
                            >
                                ⚙️
                            </button>
                        </div>
                        <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#1B254B', marginBottom: '12px' }}>{workflow.name}</h3>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', position: 'relative' }}>
                            <div style={{ padding: '8px', background: '#F4F7FE', borderRadius: '6px', fontSize: '12px', border: '1px solid #ddd' }}>
                                ⚡ <strong>SI</strong> {workflow.name.includes('Agent') ? 'Nouvel utilisateur s\'inscrit (Rôle: Agent)' : 'Facture impayée > 7 jours'}
                            </div>
                            <div style={{ textAlign: 'center', fontSize: '12px', color: '#ccc' }}>⬇️</div>
                            <div style={{ padding: '8px', background: '#F4F7FE', borderRadius: '6px', fontSize: '12px', border: '1px solid #ddd' }}>
                                🚀 <strong>ALORS</strong> {workflow.name.includes('Agent') ? 'Envoyer Email "Kit de démarrage"' : 'Envoyer Rappel SMS'}
                            </div>
                            {workflow.name.includes('Agent') && (
                                <>
                                    <div style={{ textAlign: 'center', fontSize: '12px', color: '#ccc' }}>⬇️</div>
                                    <div style={{ padding: '8px', background: '#F4F7FE', borderRadius: '6px', fontSize: '12px', border: '1px solid #ddd' }}>
                                        🔔 <strong>ET</strong> Notifier Admin "Support"
                                    </div>
                                </>
                            )}
                        </div>

                        <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #f9f9f9', fontSize: '12px', color: '#888' }}>
                            Exécuté {workflow.executions} fois
                        </div>
                    </div>
                ))}

                {/* Placeholder Add New */}
                <div
                    onClick={() => setShowModal(true)}
                    style={{ border: '2px dashed #ddd', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', background: '#fafafa', color: '#888', flexDirection: 'column', minHeight: '250px' }}
                >
                    <span style={{ fontSize: '32px', marginBottom: '8px' }}>+</span>
                    <span style={{ fontWeight: 'bold', fontSize: '14px' }}>Nouveau Workflow</span>
                </div>

            </div>

            {/* Modal Créer Workflow */}
            {showModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
                    <div style={{ background: 'white', padding: '32px', borderRadius: '16px', width: '500px', maxWidth: '90%' }}>
                        <h2 style={{ marginBottom: '24px', color: '#1B254B' }}>Créer un nouveau workflow</h2>
                        <form onSubmit={(e) => { e.preventDefault(); alert('Workflow créé!'); setShowModal(false); }}>
                            <div style={{ marginBottom: '16px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#666' }}>Nom du workflow</label>
                                <input type="text" required style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }} />
                            </div>
                            <div style={{ marginBottom: '16px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#666' }}>Déclencheur (SI...)</label>
                                <select style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }}>
                                    <option>Nouvel utilisateur créé</option>
                                    <option>Propriété publiée</option>
                                    <option>Paiement reçu</option>
                                    <option>Facture en retard</option>
                                </select>
                            </div>
                            <div style={{ marginBottom: '16px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#666' }}>Action (ALORS...)</label>
                                <select style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }}>
                                    <option>Envoyer un email</option>
                                    <option>Envoyer un SMS</option>
                                    <option>Créer une tâche</option>
                                    <option>Notifier l'admin</option>
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
