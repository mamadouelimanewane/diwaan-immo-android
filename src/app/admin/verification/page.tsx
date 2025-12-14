'use client';

import { useState } from 'react';

export default function VerificationPage() {
    const [selectedDoc, setSelectedDoc] = useState<any>(null);

    const pendingDocs = [
        { id: 1, user: 'Moussa Diop', type: 'CNI / Passeport', date: '10 Déc 2025', status: 'En attente', score: 98 },
        { id: 2, user: 'Agence Teranga', type: 'Registre Commerce', date: '09 Déc 2025', status: 'En attente', score: 100 },
        { id: 3, user: 'Jean Gomis', type: 'Titre Foncier #4421', date: '09 Déc 2025', status: 'Suspect', score: 45 },
    ];

    return (
        <div style={{ height: 'calc(100vh - 140px)', display: 'grid', gridTemplateColumns: '350px 1fr', gap: '24px' }}>

            {/* List */}
            <div style={{ background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)', overflowY: 'auto' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1B254B', marginBottom: '20px' }}>Documents en attente</h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {pendingDocs.map(doc => (
                        <div
                            key={doc.id}
                            onClick={() => setSelectedDoc(doc)}
                            style={{
                                padding: '16px',
                                border: selectedDoc?.id === doc.id ? '2px solid #006AFF' : '1px solid #eee',
                                borderRadius: '12px',
                                cursor: 'pointer',
                                background: selectedDoc?.id === doc.id ? '#F4F7FE' : 'white'
                            }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                <span style={{ fontWeight: 'bold', fontSize: '14px' }}>{doc.user}</span>
                                <span style={{ fontSize: '12px', color: '#888' }}>{doc.date}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: '13px', color: '#444' }}>{doc.type}</span>
                                <span style={{
                                    fontSize: '11px',
                                    padding: '2px 8px',
                                    borderRadius: '10px',
                                    background: doc.score > 80 ? '#E6F8F1' : doc.score > 50 ? '#FFF7E6' : '#FFEBEB',
                                    color: doc.score > 80 ? '#05CD99' : doc.score > 50 ? '#FFB547' : '#E31A1A',
                                    fontWeight: 'bold'
                                }}>
                                    IA: {doc.score}%
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Preview & Action */}
            <div style={{ background: 'white', borderRadius: '16px', padding: '32px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column' }}>
                {selectedDoc ? (
                    <>
                        <div style={{ flex: 1, background: '#333', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', flexDirection: 'column', marginBottom: '24px' }}>
                            <span style={{ fontSize: '48px', marginBottom: '16px' }}>📄</span>
                            <p>Aperçu du document {selectedDoc.type}</p>
                            <button style={{ marginTop: '16px', padding: '8px 16px', background: 'rgba(255,255,255,0.2)', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Ouvrir en grand</button>
                        </div>

                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
                                <div>
                                    <p style={{ fontSize: '12px', color: '#888', marginBottom: '4px' }}>Soumis par</p>
                                    <p style={{ fontWeight: 'bold' }}>{selectedDoc.user}</p>
                                </div>
                                <div>
                                    <p style={{ fontSize: '12px', color: '#888', marginBottom: '4px' }}>Analyse IA</p>
                                    <p style={{ fontWeight: 'bold', color: selectedDoc.score > 80 ? '#05CD99' : '#FFB547' }}>
                                        {selectedDoc.score > 80 ? 'Document Authentique' : 'Vérification requise'}
                                    </p>
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                                <button style={{ padding: '14px', background: '#05CD99', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>✅ Valider</button>
                                <button style={{ padding: '14px', background: '#FFB547', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>⚠️ Complément</button>
                                <button style={{ padding: '14px', background: '#E31A1A', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>🚫 Rejeter</button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ccc', flexDirection: 'column' }}>
                        <span style={{ fontSize: '48px', marginBottom: '16px' }}>👈</span>
                        <p>Sélectionnez un document à vérifier</p>
                    </div>
                )}
            </div>

        </div>
    );
}
