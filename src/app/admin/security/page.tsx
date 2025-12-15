'use client';

import { useState } from 'react';

export default function SecurityPage() {
    const [activeTab, setActiveTab] = useState<'backup' | 'audit' | 'permissions'>('backup');
    const [backupStatus, setBackupStatus] = useState<'idle' | 'running' | 'success' | 'error'>('idle');

    const handleBackup = async () => {
        setBackupStatus('running');
        try {
            const response = await fetch('/api/admin/backup', {
                method: 'POST'
            });
            const data = await response.json();
            if (data.success) {
                setBackupStatus('success');
                setTimeout(() => setBackupStatus('idle'), 3000);
            } else {
                setBackupStatus('error');
            }
        } catch (error) {
            setBackupStatus('error');
        }
    };

    return (
        <div>
            <div style={{ marginBottom: '32px' }}>
                <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1B254B', marginBottom: '8px' }}>
                    🛡️ Sécurité & Sauvegarde
                </h1>
                <p style={{ color: '#888' }}>Gérez la sécurité et les sauvegardes de la plateforme</p>
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: '16px', marginBottom: '32px', borderBottom: '2px solid #eee' }}>
                <button
                    onClick={() => setActiveTab('backup')}
                    style={{
                        padding: '12px 24px',
                        background: 'none',
                        border: 'none',
                        borderBottom: activeTab === 'backup' ? '3px solid #006AFF' : '3px solid transparent',
                        color: activeTab === 'backup' ? '#006AFF' : '#666',
                        fontWeight: 'bold',
                        cursor: 'pointer'
                    }}
                >
                    💾 Sauvegardes
                </button>
                <button
                    onClick={() => setActiveTab('audit')}
                    style={{
                        padding: '12px 24px',
                        background: 'none',
                        border: 'none',
                        borderBottom: activeTab === 'audit' ? '3px solid #006AFF' : '3px solid transparent',
                        color: activeTab === 'audit' ? '#006AFF' : '#666',
                        fontWeight: 'bold',
                        cursor: 'pointer'
                    }}
                >
                    📋 Audit Logs
                </button>
                <button
                    onClick={() => setActiveTab('permissions')}
                    style={{
                        padding: '12px 24px',
                        background: 'none',
                        border: 'none',
                        borderBottom: activeTab === 'permissions' ? '3px solid #006AFF' : '3px solid transparent',
                        color: activeTab === 'permissions' ? '#006AFF' : '#666',
                        fontWeight: 'bold',
                        cursor: 'pointer'
                    }}
                >
                    🔐 Permissions
                </button>
            </div>

            {/* Backup Tab */}
            {activeTab === 'backup' && (
                <div style={{ display: 'grid', gap: '24px' }}>
                    {/* Backup Status */}
                    <div style={{ background: 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
                        <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1B254B', marginBottom: '16px' }}>
                            État des Sauvegardes
                        </h2>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
                            <div style={{ padding: '16px', background: '#E6F8F1', borderRadius: '8px' }}>
                                <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>Dernière sauvegarde</div>
                                <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#05CD99' }}>Aujourd'hui 03:00</div>
                            </div>
                            <div style={{ padding: '16px', background: '#F4F7FE', borderRadius: '8px' }}>
                                <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>Taille totale</div>
                                <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#006AFF' }}>2.4 GB</div>
                            </div>
                            <div style={{ padding: '16px', background: '#FFF7E6', borderRadius: '8px' }}>
                                <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>Sauvegardes disponibles</div>
                                <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#FFB547' }}>7 derniers jours</div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '12px' }}>
                            <button
                                onClick={handleBackup}
                                disabled={backupStatus === 'running'}
                                style={{
                                    padding: '12px 24px',
                                    background: backupStatus === 'running' ? '#ccc' : '#006AFF',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '8px',
                                    fontWeight: 'bold',
                                    cursor: backupStatus === 'running' ? 'not-allowed' : 'pointer'
                                }}
                            >
                                {backupStatus === 'running' ? '⏳ Sauvegarde en cours...' : '💾 Créer une sauvegarde maintenant'}
                            </button>

                            {backupStatus === 'success' && (
                                <div style={{ padding: '12px 24px', background: '#E6F8F1', color: '#05CD99', borderRadius: '8px', fontWeight: 'bold' }}>
                                    ✅ Sauvegarde réussie !
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Backup Configuration */}
                    <div style={{ background: 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
                        <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1B254B', marginBottom: '16px' }}>
                            Configuration
                        </h3>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: '#f9f9f9', borderRadius: '8px' }}>
                                <span>Sauvegarde automatique quotidienne</span>
                                <span style={{ background: '#E6F8F1', color: '#05CD99', padding: '4px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold' }}>Activé</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: '#f9f9f9', borderRadius: '8px' }}>
                                <span>Heure de sauvegarde</span>
                                <span style={{ fontWeight: 'bold' }}>03:00 GMT</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: '#f9f9f9', borderRadius: '8px' }}>
                                <span>Rétention</span>
                                <span style={{ fontWeight: 'bold' }}>7 jours</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: '#f9f9f9', borderRadius: '8px' }}>
                                <span>Stockage externe (MongoDB Atlas)</span>
                                <span style={{ background: '#E6F8F1', color: '#05CD99', padding: '4px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold' }}>Connecté</span>
                            </div>
                        </div>
                    </div>

                    {/* Recent Backups List */}
                    <div style={{ background: 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
                        <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1B254B', marginBottom: '16px' }}>
                            Sauvegardes Récentes
                        </h3>

                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid #eee', color: '#A3AED0' }}>
                                    <th style={{ padding: '12px', textAlign: 'left' }}>Date</th>
                                    <th style={{ padding: '12px', textAlign: 'left' }}>Taille</th>
                                    <th style={{ padding: '12px', textAlign: 'left' }}>Type</th>
                                    <th style={{ padding: '12px', textAlign: 'left' }}>Statut</th>
                                    <th style={{ padding: '12px', textAlign: 'right' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { date: 'Aujourd\'hui 03:00', size: '2.4 GB', type: 'Auto', status: 'Complète' },
                                    { date: 'Hier 03:00', size: '2.3 GB', type: 'Auto', status: 'Complète' },
                                    { date: '13 Déc 03:00', size: '2.3 GB', type: 'Auto', status: 'Complète' },
                                ].map((backup, idx) => (
                                    <tr key={idx} style={{ borderBottom: '1px solid #f9f9f9' }}>
                                        <td style={{ padding: '16px', fontWeight: 'bold' }}>{backup.date}</td>
                                        <td style={{ padding: '16px' }}>{backup.size}</td>
                                        <td style={{ padding: '16px' }}>
                                            <span style={{ padding: '4px 8px', background: '#F4F7FE', borderRadius: '4px', fontSize: '12px' }}>
                                                {backup.type}
                                            </span>
                                        </td>
                                        <td style={{ padding: '16px' }}>
                                            <span style={{ color: '#05CD99', fontWeight: 'bold' }}>• {backup.status}</span>
                                        </td>
                                        <td style={{ padding: '16px', textAlign: 'right' }}>
                                            <button style={{ background: 'none', border: '1px solid #ddd', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' }}>
                                                📥 Restaurer
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Audit Logs Tab */}
            {activeTab === 'audit' && (
                <div style={{ background: 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
                    <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1B254B', marginBottom: '16px' }}>
                        Journal d'Audit
                    </h2>

                    <div style={{ marginBottom: '24px', display: 'flex', gap: '12px' }}>
                        <input
                            type="text"
                            placeholder="Rechercher dans les logs..."
                            style={{ flex: 1, padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }}
                        />
                        <select style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }}>
                            <option>Toutes les actions</option>
                            <option>Connexions</option>
                            <option>Modifications</option>
                            <option>Suppressions</option>
                        </select>
                    </div>

                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid #eee', color: '#A3AED0' }}>
                                <th style={{ padding: '12px', textAlign: 'left' }}>Date/Heure</th>
                                <th style={{ padding: '12px', textAlign: 'left' }}>Utilisateur</th>
                                <th style={{ padding: '12px', textAlign: 'left' }}>Action</th>
                                <th style={{ padding: '12px', textAlign: 'left' }}>Ressource</th>
                                <th style={{ padding: '12px', textAlign: 'left' }}>IP</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                { time: 'Maintenant', user: 'admin@diwaan.sn', action: 'Consultation', resource: 'Page Sécurité', ip: '192.168.1.1' },
                                { time: 'Il y a 5 min', user: 'admin@diwaan.sn', action: 'Connexion', resource: 'Admin Panel', ip: '192.168.1.1' },
                                { time: 'Il y a 1h', user: 'agent@diwaan.sn', action: 'Création', resource: 'Propriété #45', ip: '197.149.1.50' },
                            ].map((log, idx) => (
                                <tr key={idx} style={{ borderBottom: '1px solid #f9f9f9', fontSize: '14px' }}>
                                    <td style={{ padding: '16px', color: '#888' }}>{log.time}</td>
                                    <td style={{ padding: '16px', fontWeight: 'bold' }}>{log.user}</td>
                                    <td style={{ padding: '16px' }}>
                                        <span style={{ padding: '4px 8px', background: '#E6F8F1', color: '#05CD99', borderRadius: '4px', fontSize: '12px' }}>
                                            {log.action}
                                        </span>
                                    </td>
                                    <td style={{ padding: '16px' }}>{log.resource}</td>
                                    <td style={{ padding: '16px', color: '#666', fontFamily: 'monospace', fontSize: '12px' }}>{log.ip}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Permissions Tab */}
            {activeTab === 'permissions' && (
                <div style={{ background: 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
                    <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1B254B', marginBottom: '16px' }}>
                        Matrice de Permissions
                    </h2>

                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ borderBottom: '2px solid #006AFF' }}>
                                    <th style={{ padding: '16px', textAlign: 'left', color: '#1B254B' }}>Ressource</th>
                                    <th style={{ padding: '16px', textAlign: 'center', color: '#666' }}>USER</th>
                                    <th style={{ padding: '16px', textAlign: 'center', color: '#05CD99' }}>AGENT</th>
                                    <th style={{ padding: '16px', textAlign: 'center', color: '#006AFF' }}>ADMIN</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { resource: 'Propriétés (Lecture)', user: '✅', agent: '✅', admin: '✅' },
                                    { resource: 'Propriétés (Création)', user: '❌', agent: '✅', admin: '✅' },
                                    { resource: 'Propriétés (Modification)', user: '❌', agent: '✅ (propres)', admin: '✅ (toutes)' },
                                    { resource: 'Propriétés (Suppression)', user: '❌', agent: '✅ (propres)', admin: '✅ (toutes)' },
                                    { resource: 'Utilisateurs (Gestion)', user: '❌', agent: '❌', admin: '✅' },
                                    { resource: 'Dashboard Admin', user: '❌', agent: '❌', admin: '✅' },
                                    { resource: 'Rental Manager', user: '❌', agent: '✅', admin: '✅' },
                                    { resource: 'Partenariats', user: '❌', agent: '❌', admin: '✅' },
                                ].map((perm, idx) => (
                                    <tr key={idx} style={{ borderBottom: '1px solid #f9f9f9' }}>
                                        <td style={{ padding: '16px', fontWeight: 'bold' }}>{perm.resource}</td>
                                        <td style={{ padding: '16px', textAlign: 'center' }}>{perm.user}</td>
                                        <td style={{ padding: '16px', textAlign: 'center' }}>{perm.agent}</td>
                                        <td style={{ padding: '16px', textAlign: 'center' }}>{perm.admin}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
