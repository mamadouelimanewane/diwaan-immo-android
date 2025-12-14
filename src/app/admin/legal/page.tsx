'use client';

import { useState } from 'react';
import { RefreshCw, Plus, Upload, FileText, Trash, ExternalLink } from 'lucide-react';

export default function LegalAdminPage() {
    const [loading, setLoading] = useState(false);
    const [lastUpdate, setLastUpdate] = useState("12 Décembre 2025");
    const [laws, setLaws] = useState([
        { id: 1, title: 'Loi n° 64-46 (Domaine National)', category: 'Foncier', date: '1964-06-17', status: 'Actif' },
        { id: 2, title: 'Code de l\'Urbanisme 2023', category: 'Urbanisme', date: '2023-12-29', status: 'Actif' },
        { id: 3, title: 'Loi sur la copropriété', category: 'Immobilier', date: '1988-01-15', status: 'Actif' },
    ]);

    const handleRefresh = () => {
        setLoading(true);
        // Simulation d'une requête vers un service de veille juridique ou scraping
        setTimeout(() => {
            setLoading(false);
            const today = new Date().toLocaleDateString("fr-FR", { day: 'numeric', month: 'long', year: 'numeric' });
            setLastUpdate(today);
            alert(`Veille juridique terminée le ${today}.\n\nAnalyse : Aucun nouveau texte législatif majeur détecté sur le site du Secrétariat Général du Gouvernement.`);
        }, 2500);
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <div>
                    <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1B254B' }}>Gestion Juridique & Base Documentaire</h1>
                    <p style={{ color: '#666', fontSize: '14px' }}>Gérez les sources de données pour l'Assistant IA et la conformité.</p>
                </div>
                <button
                    onClick={handleRefresh}
                    className="btn btn-primary"
                    disabled={loading}
                    style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px' }}
                >
                    <RefreshCw size={18} className={loading ? 'spin' : ''} style={{ animation: loading ? 'spin 1s linear infinite' : 'none' }} />
                    {loading ? 'Recherche en cours...' : 'Actualiser la Veille Juridique'}
                </button>
            </div>

            <style jsx>{`
                @keyframes spin { 100% { transform: rotate(360deg); } }
            `}</style>

            {/* Stats / Info */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px', marginBottom: '32px' }}>
                <StatCard title="Textes Référencés" value={laws.length} icon="📚" />
                <StatCard title="Dernière M.A.J" value={lastUpdate} icon="🕒" />
                <StatCard title="Source Principale" value="Journal Officiel" icon="🏛️" />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
                {/* List */}
                <div style={{ gridColumn: 'span 2' }}>
                    <div style={{ background: 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                            <h3 style={{ fontSize: '18px', fontWeight: 'bold' }}>Textes en Base</h3>
                            <input type="text" placeholder="Rechercher un texte..." style={{ padding: '8px 12px', border: '1px solid #ddd', borderRadius: '6px', width: '250px' }} />
                        </div>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ background: '#f8f9fa', color: '#666', fontSize: '13px', textAlign: 'left' }}>
                                    <th style={{ padding: '12px', borderRadius: '8px 0 0 8px' }}>Titre</th>
                                    <th style={{ padding: '12px' }}>Catégorie</th>
                                    <th style={{ padding: '12px' }}>Date</th>
                                    <th style={{ padding: '12px', borderRadius: '0 8px 8px 0', textAlign: 'right' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {laws.map(law => (
                                    <tr key={law.id} style={{ borderBottom: '1px solid #eee' }}>
                                        <td style={{ padding: '16px 12px', fontWeight: '500', color: '#1B254B' }}>{law.title}</td>
                                        <td style={{ padding: '16px 12px' }}>
                                            <span style={{
                                                padding: '4px 10px',
                                                background: law.category === 'Foncier' ? '#e0edff' : '#ffe0e0',
                                                color: law.category === 'Foncier' ? '#006AFF' : '#ff4444',
                                                borderRadius: '20px',
                                                fontSize: '12px',
                                                fontWeight: '600'
                                            }}>
                                                {law.category}
                                            </span>
                                        </td>
                                        <td style={{ padding: '16px 12px', color: '#666', fontSize: '14px' }}>{law.date}</td>
                                        <td style={{ padding: '16px 12px', textAlign: 'right' }}>
                                            <button style={{ background: 'none', border: 'none', color: '#A3AED0', cursor: 'pointer' }}><Trash size={18} /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Upload Form */}
                <div style={{ minWidth: '300px' }}>
                    <div style={{ background: 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', position: 'sticky', top: '100px' }}>
                        <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px', color: '#1B254B' }}>
                            <Upload size={20} /> Ajout Manuel
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: 'bold', color: '#444' }}>Titre du Texte</label>
                                <input type="text" placeholder="Ex: Décret n°..." style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px', outline: 'none' }} />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: 'bold', color: '#444' }}>Catégorie</label>
                                <select style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px', outline: 'none', background: 'white' }}>
                                    <option>Foncier</option>
                                    <option>Fiscalité</option>
                                    <option>Urbanisme</option>
                                    <option>Construction</option>
                                </select>
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: 'bold', color: '#444' }}>Source / Fichier</label>
                                <div style={{ border: '2px dashed #ddd', padding: '30px', textAlign: 'center', borderRadius: '8px', cursor: 'pointer', background: '#f8f9fa' }}>
                                    <FileText size={32} style={{ color: '#ccc', marginBottom: '8px' }} />
                                    <p style={{ fontSize: '13px', color: '#666', margin: 0 }}>Glisser un fichier (PDF) ou cliquer pour parcourir</p>
                                </div>
                            </div>
                            <button className="btn btn-primary" style={{ width: '100%', padding: '14px', borderRadius: '8px', fontWeight: 'bold' }}>
                                <Plus size={18} style={{ marginRight: '8px', verticalAlign: 'text-bottom' }} />
                                Ajouter à la base
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatCard({ title, value, icon }: any) {
    return (
        <div style={{ background: 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '56px', height: '56px', background: '#F4F7FE', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>{icon}</div>
            <div>
                <div style={{ fontSize: '14px', color: '#A3AED0', marginBottom: '4px' }}>{title}</div>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1B254B' }}>{value}</div>
            </div>
        </div>
    )
}
