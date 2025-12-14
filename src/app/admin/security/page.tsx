'use client';

import { useState } from 'react';

export default function SecurityPage() {
    const [logs] = useState([
        { id: 1, event: 'Connexion Admin', user: 'admin@diwaan.sn', ip: '192.168.1.100', time: '10 Déc 14:30', status: 'Succès' },
        { id: 2, event: 'Tentative de connexion échouée', user: 'unknown@email.com', ip: '45.123.45.67', time: '10 Déc 12:15', status: 'Échec' },
        { id: 3, event: 'Modification utilisateur', user: 'admin@diwaan.sn', ip: '192.168.1.100', time: '10 Déc 11:00', status: 'Succès' },
        { id: 4, event: 'Export données CSV', user: 'agent@diwaan.sn', ip: '192.168.1.105', time: '09 Déc 16:45', status: 'Succès' },
    ]);

    return (
        <div>
            <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1B254B', marginBottom: '24px' }}>Sécurité & Logs</h1>

            {/* Security Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '32px' }}>
                <SecurityStat icon="🔒" title="Sessions Actives" value="12" color="#05CD99" />
                <SecurityStat icon="⚠️" title="Tentatives Échouées" value="3" color="#FFB547" />
                <SecurityStat icon="🔐" title="2FA Activé" value="85%" color="#006AFF" />
                <SecurityStat icon="🛡️" title="Sauvegardes" value="Quotidiennes" color="#4318FF" />
            </div>

            {/* Security Settings */}
            <div style={{ background: 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)', marginBottom: '24px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '24px', color: '#1B254B' }}>Paramètres de Sécurité</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <SecurityToggle title="Authentification à deux facteurs (2FA)" description="Requiert un code SMS ou app pour se connecter" enabled={true} />
                    <SecurityToggle title="Exiger des mots de passe forts" description="12+ caractères, majuscules, chiffres, symboles" enabled={true} />
                    <SecurityToggle title="Déconnexion automatique" description="Après 30 minutes d'inactivité" enabled={true} />
                    <SecurityToggle title="Limitation des tentatives" description="Bloquer après 5 tentatives échouées" enabled={true} />
                    <SecurityToggle title="Notifications de sécurité" description="Email lors d'événements suspects" enabled={false} />
                </div>
            </div>

            {/* Activity Logs */}
            <div style={{ background: 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1B254B' }}>Journal d'Activité</h3>
                    <button style={{ background: 'transparent', border: '1px solid #ddd', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px' }}>
                        📥 Exporter Logs
                    </button>
                </div>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ textAlign: 'left', color: '#A3AED0', borderBottom: '1px solid #eee' }}>
                            <th style={{ padding: '12px' }}>Événement</th>
                            <th style={{ padding: '12px' }}>Utilisateur</th>
                            <th style={{ padding: '12px' }}>Adresse IP</th>
                            <th style={{ padding: '12px' }}>Heure</th>
                            <th style={{ padding: '12px' }}>Statut</th>
                        </tr>
                    </thead>
                    <tbody>
                        {logs.map(log => (
                            <tr key={log.id} style={{ borderBottom: '1px solid #f9f9f9', fontSize: '14px' }}>
                                <td style={{ padding: '12px', color: '#1B254B', fontWeight: '500' }}>{log.event}</td>
                                <td style={{ padding: '12px', color: '#666' }}>{log.user}</td>
                                <td style={{ padding: '12px', fontFamily: 'monospace', color: '#666', fontSize: '12px' }}>{log.ip}</td>
                                <td style={{ padding: '12px', color: '#888', fontSize: '13px' }}>{log.time}</td>
                                <td style={{ padding: '12px' }}>
                                    <span style={{
                                        padding: '4px 10px',
                                        borderRadius: '6px',
                                        fontSize: '11px',
                                        fontWeight: 'bold',
                                        background: log.status === 'Succès' ? '#E6F8F1' : '#FFEBEB',
                                        color: log.status === 'Succès' ? '#05CD99' : '#E31A1A'
                                    }}>
                                        {log.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function SecurityStat({ icon, title, value, color }: any) {
    return (
        <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)', borderLeft: `4px solid ${color}` }}>
            <div style={{ fontSize: '28px', marginBottom: '8px' }}>{icon}</div>
            <p style={{ fontSize: '12px', color: '#A3AED0', marginBottom: '4px' }}>{title}</p>
            <h4 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1B254B' }}>{value}</h4>
        </div>
    );
}

function SecurityToggle({ title, description, enabled }: any) {
    const [isEnabled, setIsEnabled] = useState(enabled);

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', background: '#F9FAFB', borderRadius: '8px' }}>
            <div>
                <h5 style={{ fontWeight: '600', color: '#1B254B', marginBottom: '4px', fontSize: '14px' }}>{title}</h5>
                <p style={{ fontSize: '12px', color: '#666' }}>{description}</p>
            </div>
            <button
                onClick={() => setIsEnabled(!isEnabled)}
                style={{
                    width: '48px',
                    height: '24px',
                    borderRadius: '12px',
                    border: 'none',
                    background: isEnabled ? '#05CD99' : '#ddd',
                    position: 'relative',
                    cursor: 'pointer',
                    transition: 'background 0.2s'
                }}
            >
                <div style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    background: 'white',
                    position: 'absolute',
                    top: '2px',
                    left: isEnabled ? '26px' : '2px',
                    transition: 'left 0.2s'
                }}></div>
            </button>
        </div>
    );
}
