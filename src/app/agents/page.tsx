'use client';

import Link from 'next/link';
import { useState } from 'react';
import { agents as agentsData } from '@/lib/data';

export default function AgentsPage() {
    const [searchQuery, setSearchQuery] = useState('');

    // Filter agents based on search
    const filteredAgents = agentsData.filter(agent =>
        agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        agent.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        agent.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
    };

    const handleContact = (agent: any) => {
        alert(`📞 Contacter ${agent.name}\n\nEmail: ${agent.email}\nTél: ${agent.phone}\n\nUn formulaire de contact sera bientôt disponible.`);
    };

    return (
        <div className="container" style={{ padding: '40px 24px' }}>
            <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 40px' }}>
                <h1 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '16px' }}>Trouver un Agent Immobilier</h1>
                <p style={{ fontSize: '18px', color: '#666', marginBottom: '30px' }}>
                    Que vous achetiez ou vendiez, Diwaan vous connecte avec les meilleurs experts locaux.
                </p>

                <form onSubmit={handleSearch} style={{ display: 'flex', gap: '10px', background: 'white', padding: '10px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                    <input
                        type="text"
                        placeholder="Ville, Quartier, ou Nom de l'agent"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{ flex: 1, padding: '12px 16px', borderRadius: '4px', border: '1px solid transparent', outline: 'none', fontSize: '16px' }}
                    />
                    <button type="submit" className="btn btn-primary" style={{ padding: '0 32px' }}>Rechercher</button>
                </form>
            </div>

            <div style={{ marginBottom: '40px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>
                    {searchQuery ? `Résultats pour "${searchQuery}"` : 'Agents à la Une'} ({filteredAgents.length})
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '30px' }}>
                    {filteredAgents.map((agent) => (
                        <div key={agent.id} style={{ border: '1px solid var(--border)', borderRadius: '12px', padding: '24px', transition: 'box-shadow 0.2s', background: 'var(--card)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                                <img
                                    src={agent.image}
                                    alt={agent.name}
                                    style={{ width: '70px', height: '70px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #006AFF' }}
                                />
                                <div>
                                    <h3 style={{ fontWeight: 'bold', fontSize: '18px' }}>{agent.name}</h3>
                                    <div style={{ fontSize: '13px', color: '#006AFF', fontWeight: '500' }}>{agent.agency}</div>
                                    <div style={{ fontSize: '13px', color: '#666' }}>📍 {agent.location}</div>
                                </div>
                            </div>

                            {/* Specialties */}
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px' }}>
                                {agent.specialties.slice(0, 3).map((spec, i) => (
                                    <span key={i} style={{ background: '#EBF8FF', color: '#006AFF', padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: '500' }}>
                                        {spec}
                                    </span>
                                ))}
                            </div>

                            {/* Stats */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontSize: '13px' }}>
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{ fontWeight: 'bold', color: '#1B254B' }}>{agent.propertiesSold}</div>
                                    <div style={{ color: '#888' }}>Ventes</div>
                                </div>
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{ fontWeight: 'bold', color: '#1B254B' }}>{agent.yearsExperience} ans</div>
                                    <div style={{ color: '#888' }}>Expérience</div>
                                </div>
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                                        <span style={{ color: '#F59E0B' }}>★</span>
                                        <span style={{ fontWeight: 'bold', color: '#1B254B' }}>{agent.rating}</span>
                                    </div>
                                    <div style={{ color: '#888' }}>{agent.reviewCount} avis</div>
                                </div>
                            </div>

                            {/* Languages */}
                            <div style={{ fontSize: '12px', color: '#666', marginBottom: '16px' }}>
                                🌍 {agent.languages.join(', ')}
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                                <button
                                    onClick={() => handleContact(agent)}
                                    className="btn btn-primary"
                                    style={{ fontSize: '14px' }}
                                >
                                    Contacter
                                </button>
                                <Link
                                    href={`/agents/${agent.id}`}
                                    className="btn btn-outline"
                                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', textDecoration: 'none' }}
                                >
                                    Profil
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div style={{ background: '#f0f4f8', padding: '40px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
                <div>
                    <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '12px' }}>Vous êtes un agent immobilier ?</h2>
                    <p style={{ color: '#666', marginBottom: '20px' }}>Rejoignez Diwaan Pro pour développer votre clientèle.</p>
                    <Link href="/pros" className="btn btn-outline">Découvrir les solutions Pro</Link>
                </div>
                <div style={{ fontSize: '60px' }}>🤝</div>
            </div>
        </div>
    );
}
