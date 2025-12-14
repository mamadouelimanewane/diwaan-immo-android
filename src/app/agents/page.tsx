'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function AgentsPage() {
    const [searchQuery, setSearchQuery] = useState('');

    const agents = [
        { id: 1, name: "Moussa Diop", spec: "Spécialiste Vente • Dakar", review: "4.9 (45 avis)", email: "m.diop@diwaan.sn", phone: "+221 77 123 45 67" },
        { id: 2, name: "Fatou Ndiaye", spec: "Location & Gestion • Saly", review: "5.0 (32 avis)", email: "f.ndiaye@diwaan.sn", phone: "+221 76 234 56 78" },
        { id: 3, name: "Jean Gomis", spec: "Immobilier de Luxe", review: "4.8 (28 avis)", email: "j.gomis@diwaan.sn", phone: "+221 75 345 67 89" },
        { id: 4, name: "Agence Teranga", spec: "Terrains & Constructeurs", review: "4.7 (50+ avis)", email: "contact@teranga.sn", phone: "+221 33 456 78 90" }
    ];

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        alert(`Recherche pour: ${searchQuery}`);
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
                <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Agents à la Une</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '30px' }}>
                    {agents.map((agent) => (
                        <div key={agent.id} style={{ border: '1px solid var(--border)', borderRadius: '12px', padding: '24px', transition: 'box-shadow 0.2s', background: 'var(--card)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                                <div style={{ width: '60px', height: '60px', background: '#006AFF', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '24px', fontWeight: 'bold' }}>
                                    {agent.name.charAt(0)}
                                </div>
                                <div>
                                    <h3 style={{ fontWeight: 'bold' }}>{agent.name}</h3>
                                    <div style={{ fontSize: '14px', color: '#666' }}>{agent.spec}</div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '20px' }}>
                                <span style={{ color: '#F59E0B' }}>★</span>
                                <span style={{ fontWeight: 'bold' }}>{agent.review}</span>
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
