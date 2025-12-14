'use client';

import { useState } from 'react';

export default function MessagesPage() {
    const [messages] = useState([
        { id: 1, sender: 'Fatou Sow', email: 'fatou.s@gmail.com', subject: 'Problème de connexion', preview: 'Bonjour, je n\'arrive pas à accéder à mon compte depuis hier...', content: 'Bonjour, je n\'arrive pas à accéder à mon compte depuis hier. Pouvez-vous m\'aider ?', time: '10:30', status: 'Nouveau' },
        { id: 2, sender: 'Agence Immobilière X', email: 'contact@agencex.sn', subject: 'Partenariat', preview: 'Nous souhaiterions discuter des offres pour les professionnels...', content: 'Nous souhaiterions discuter des offres pour les professionnels. Merci de nous contacter.', time: 'Hier', status: 'Lu' },
        { id: 3, sender: 'Moussa Ndiaye', email: 'moussa.n@yahoo.fr', subject: 'Question annonce #402', preview: 'Le prix est-il négociable pour la villa aux Almadies ?', content: 'Bonjour, je suis intéressé par la villa aux Almadies. Le prix est-il négociable ?', time: 'Hier', status: 'Répondu' },
    ]);

    const [selectedMessage, setSelectedMessage] = useState<any>(null);
    const [showReply, setShowReply] = useState(false);

    return (
        <div style={{ height: 'calc(100vh - 140px)', display: 'flex', flexDirection: 'column' }}>
            <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1B254B', marginBottom: '24px' }}>Messagerie</h1>

            <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '350px 1fr', gap: '24px', height: '100%' }}>
                {/* Message List */}
                <div style={{ background: 'white', borderRadius: '16px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ padding: '16px', borderBottom: '1px solid #eee' }}>
                        <input type="text" placeholder="Rechercher..." style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd', background: '#F4F7FE' }} />
                    </div>
                    <div style={{ flex: 1, overflowY: 'auto' }}>
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                onClick={() => setSelectedMessage(msg)}
                                style={{
                                    padding: '16px',
                                    borderBottom: '1px solid #f5f5f5',
                                    cursor: 'pointer',
                                    background: selectedMessage?.id === msg.id ? '#E6F2FF' : msg.status === 'Nouveau' ? '#F4F7FE' : 'white'
                                }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                    <span style={{ fontWeight: 'bold', fontSize: '14px', color: '#1B254B' }}>{msg.sender}</span>
                                    <span style={{ fontSize: '11px', color: '#888' }}>{msg.time}</span>
                                </div>
                                <div style={{ fontSize: '13px', color: '#444', marginBottom: '4px', fontWeight: '500' }}>{msg.subject}</div>
                                <div style={{ fontSize: '12px', color: '#888', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{msg.preview}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Message Detail */}
                {selectedMessage ? (
                    <div style={{ background: 'white', borderRadius: '16px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)', padding: '32px', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ marginBottom: '24px', paddingBottom: '24px', borderBottom: '1px solid #eee' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '16px' }}>
                                <div>
                                    <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1B254B', marginBottom: '8px' }}>{selectedMessage.subject}</h2>
                                    <div style={{ fontSize: '14px', color: '#666' }}>
                                        <strong>{selectedMessage.sender}</strong> ({selectedMessage.email})
                                    </div>
                                    <div style={{ fontSize: '12px', color: '#888', marginTop: '4px' }}>{selectedMessage.time}</div>
                                </div>
                                <span style={{
                                    padding: '4px 12px',
                                    borderRadius: '6px',
                                    fontSize: '12px',
                                    fontWeight: 'bold',
                                    background: selectedMessage.status === 'Nouveau' ? '#FFF7E6' : selectedMessage.status === 'Répondu' ? '#E6F8F1' : '#F4F7FE',
                                    color: selectedMessage.status === 'Nouveau' ? '#FFB547' : selectedMessage.status === 'Répondu' ? '#05CD99' : '#006AFF'
                                }}>
                                    {selectedMessage.status}
                                </span>
                            </div>
                        </div>

                        <div style={{ flex: 1, overflow: 'auto', marginBottom: '24px' }}>
                            <p style={{ lineHeight: '1.6', color: '#333' }}>{selectedMessage.content}</p>
                        </div>

                        <div style={{ display: 'flex', gap: '12px' }}>
                            <button
                                onClick={() => setShowReply(!showReply)}
                                style={{ flex: 1, padding: '12px', background: '#006AFF', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
                            >
                                ✉️ Répondre
                            </button>
                            <button
                                onClick={() => alert(`Message de ${selectedMessage.sender} archivé!`)}
                                style={{ padding: '12px 20px', background: '#eee', color: '#666', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
                            >
                                📁 Archiver
                            </button>
                            <button
                                onClick={() => { if (confirm('Supprimer ce message ?')) { setSelectedMessage(null); } }}
                                style={{ padding: '12px 20px', background: '#FFEBEB', color: '#E31A1A', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
                            >
                                🗑️
                            </button>
                        </div>

                        {showReply && (
                            <div style={{ marginTop: '24px', padding: '20px', background: '#F4F7FE', borderRadius: '12px' }}>
                                <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '12px', color: '#1B254B' }}>Répondre à {selectedMessage.sender}</h3>
                                <textarea
                                    placeholder="Votre réponse..."
                                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', minHeight: '120px', fontFamily: 'inherit' }}
                                ></textarea>
                                <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                                    <button
                                        onClick={() => { alert('Réponse envoyée!'); setShowReply(false); }}
                                        style={{ padding: '10px 20px', background: '#006AFF', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
                                    >
                                        Envoyer
                                    </button>
                                    <button
                                        onClick={() => setShowReply(false)}
                                        style={{ padding: '10px 20px', background: 'white', color: '#666', border: '1px solid #ddd', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
                                    >
                                        Annuler
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div style={{ background: 'white', borderRadius: '16px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)', padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: '#888' }}>
                        <div style={{ fontSize: '48px', marginBottom: '16px' }}>✉️</div>
                        <p>Sélectionnez un message pour le lire</p>
                    </div>
                )}
            </div>
        </div>
    );
}
