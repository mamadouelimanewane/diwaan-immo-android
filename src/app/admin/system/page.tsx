'use client';

import { useState } from 'react';

export default function SystemPage() {
    const [activeTab, setActiveTab] = useState('profile');
    const [primaryColor, setPrimaryColor] = useState('#006AFF');
    const [themeMode, setThemeMode] = useState('light');

    // Mock Data for Roles
    const roles = [
        { id: 1, name: 'Super Admin', users: 2, permissions: ['Tout accès', 'Gestion Totale'], color: '#4318FF' },
        { id: 2, name: 'Modérateur', users: 5, permissions: ['Valider annonces', 'Gérer contenu', 'Bannir utilisateurs'], color: '#006AFF' },
        { id: 3, name: 'Support', users: 8, permissions: ['Lire messages', 'Répondre', 'Voir profils'], color: '#05CD99' },
        { id: 4, name: 'Agent', users: 142, permissions: ['Créer annonces', 'Gérer son profil', 'Voir statistiques'], color: '#FFB547' },
    ];

    const colors = ['#006AFF', '#4318FF', '#05CD99', '#FFB547', '#E31A1A', '#1B254B'];

    return (
        <div>
            <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1B254B', marginBottom: '24px' }}>Système & Configuration</h1>

            {/* Navigation Tabs */}
            <div style={{ display: 'flex', gap: '20px', marginBottom: '24px', borderBottom: '1px solid #eee', overflowX: 'auto' }}>
                <button
                    onClick={() => setActiveTab('profile')}
                    style={{
                        padding: '12px 16px',
                        background: 'none',
                        border: 'none',
                        borderBottom: activeTab === 'profile' ? '3px solid #006AFF' : '3px solid transparent',
                        color: activeTab === 'profile' ? '#006AFF' : '#666',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        fontSize: '15px',
                        whiteSpace: 'nowrap'
                    }}>
                    Profil Entreprise
                </button>
                <button
                    onClick={() => setActiveTab('appearance')}
                    style={{
                        padding: '12px 16px',
                        background: 'none',
                        border: 'none',
                        borderBottom: activeTab === 'appearance' ? '3px solid #006AFF' : '3px solid transparent',
                        color: activeTab === 'appearance' ? '#006AFF' : '#666',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        fontSize: '15px',
                        whiteSpace: 'nowrap'
                    }}>
                    Thèmes & Apparence
                </button>
                <button
                    onClick={() => setActiveTab('roles')}
                    style={{
                        padding: '12px 16px',
                        background: 'none',
                        border: 'none',
                        borderBottom: activeTab === 'roles' ? '3px solid #006AFF' : '3px solid transparent',
                        color: activeTab === 'roles' ? '#006AFF' : '#666',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        fontSize: '15px',
                        whiteSpace: 'nowrap'
                    }}>
                    Rôles & Permissions
                </button>
                <button
                    onClick={() => setActiveTab('security')}
                    style={{
                        padding: '12px 16px',
                        background: 'none',
                        border: 'none',
                        borderBottom: activeTab === 'security' ? '3px solid #006AFF' : '3px solid transparent',
                        color: activeTab === 'security' ? '#006AFF' : '#666',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        fontSize: '15px',
                        whiteSpace: 'nowrap'
                    }}>
                    Sécurité & Backups
                </button>
                <button
                    onClick={() => setActiveTab('fiscality')}
                    style={{
                        padding: '12px 16px',
                        background: 'none',
                        border: 'none',
                        borderBottom: activeTab === 'fiscality' ? '3px solid #006AFF' : '3px solid transparent',
                        color: activeTab === 'fiscality' ? '#006AFF' : '#666',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        fontSize: '15px',
                        whiteSpace: 'nowrap'
                    }}>
                    Fiscalité & Taxes
                </button>
            </div>

            {/* Content Areas */}

            {/* --- PROFIL ENTREPRISE --- */}
            {activeTab === 'profile' && (
                <div style={{ background: 'white', padding: '32px', borderRadius: '16px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)', maxWidth: '900px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1B254B', marginBottom: '24px' }}>Identité de l'entreprise</h3>

                    {/* Logo & Basic Info */}
                    <div style={{ display: 'flex', gap: '32px', marginBottom: '32px', borderBottom: '1px solid #f5f5f5', paddingBottom: '32px' }}>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: '#F4F7FE', border: '2px dashed #ccc', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px', overflow: 'hidden' }}>
                                <span style={{ fontSize: '40px' }}>🏢</span>
                                {/* <img src="/logo.png" alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> */}
                            </div>
                            <button style={{ background: 'none', border: '1px solid #ddd', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', cursor: 'pointer', color: '#444' }}>Changer le logo</button>
                        </div>

                        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#444' }}>Nom de l'entreprise</label>
                                <input type="text" defaultValue="Diwaan Immobilier" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }} />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#444' }}>Slogan</label>
                                <input type="text" defaultValue="L'immobilier en toute confiance" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }} />
                            </div>
                            <div style={{ gridColumn: 'span 2' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#444' }}>Description courte (SEO)</label>
                                <textarea style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', height: '80px', resize: 'none' }} defaultValue="Diwaan est la plateforme leader de l'immobilier au Sénégal. Achetez, louez et vendez en toute simplicité." />
                            </div>
                        </div>
                    </div>

                    {/* Contact & Legal */}
                    <h4 style={{ fontSize: '16px', fontWeight: 'bold', color: '#1B254B', marginBottom: '16px' }}>Coordonnées & Mentions Légales</h4>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#444' }}>Email de contact</label>
                            <input type="email" defaultValue="contact@diwaan.sn" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#444' }}>Téléphone</label>
                            <input type="tel" defaultValue="+221 33 800 00 00" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#444' }}>Adresse Siège</label>
                            <input type="text" defaultValue="Point E, Avenue Cheikh Anta Diop, Dakar" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#444' }}>NINEA / RC</label>
                            <input type="text" defaultValue="SN-DKR-2024-B-12345" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }} />
                        </div>
                    </div>

                    <div style={{ marginTop: '32px', textAlign: 'right' }}>
                        <button style={{ background: '#006AFF', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>Sauvegarder le profil</button>
                    </div>
                </div>
            )}

            {/* --- APPARENCE --- */}
            {activeTab === 'appearance' && (
                <div style={{ background: 'white', padding: '32px', borderRadius: '16px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)', maxWidth: '900px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1B254B', marginBottom: '24px' }}>Personnalisation & Thèmes</h3>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>

                        {/* Left Column: Controls */}
                        <div>
                            <div style={{ marginBottom: '32px' }}>
                                <label style={{ display: 'block', marginBottom: '12px', fontSize: '14px', fontWeight: 'bold', color: '#444' }}>Couleur Principale</label>
                                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                                    {['#006AFF', '#4318FF', '#05CD99', '#FFB547', '#E31A1A', '#1B254B'].map(color => (
                                        <div
                                            key={color}
                                            onClick={() => setPrimaryColor(color)}
                                            style={{
                                                width: '40px',
                                                height: '40px',
                                                borderRadius: '50%',
                                                background: color,
                                                cursor: 'pointer',
                                                border: primaryColor === color ? '3px solid white' : 'none',
                                                boxShadow: primaryColor === color ? `0 0 0 2px ${color}` : 'none'
                                            }}
                                        />
                                    ))}
                                    <input type="color" value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} style={{ width: '40px', height: '40px', padding: 0, border: 'none', background: 'none', cursor: 'pointer' }} />
                                </div>
                            </div>

                            <div style={{ marginBottom: '32px' }}>
                                <label style={{ display: 'block', marginBottom: '12px', fontSize: '14px', fontWeight: 'bold', color: '#444' }}>Mode d'affichage (Défaut)</label>
                                <div style={{ display: 'flex', gap: '12px' }}>
                                    <div
                                        onClick={() => setThemeMode('light')}
                                        style={{
                                            flex: 1,
                                            padding: '16px',
                                            border: themeMode === 'light' ? `2px solid ${primaryColor}` : '1px solid #ddd',
                                            borderRadius: '8px',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '8px'
                                        }}>
                                        <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'white', border: '1px solid #ccc' }}></div>
                                        <span style={{ fontWeight: '500' }}>Clair</span>
                                    </div>
                                    <div
                                        onClick={() => setThemeMode('dark')}
                                        style={{
                                            flex: 1,
                                            padding: '16px',
                                            border: themeMode === 'dark' ? `2px solid ${primaryColor}` : '1px solid #ddd',
                                            borderRadius: '8px',
                                            cursor: 'pointer',
                                            background: '#1B254B',
                                            color: 'white',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '8px'
                                        }}>
                                        <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#333', border: '1px solid #555' }}></div>
                                        <span style={{ fontWeight: '500' }}>Sombre</span>
                                    </div>
                                </div>
                            </div>

                            <div style={{ marginBottom: '32px' }}>
                                <label style={{ display: 'block', marginBottom: '12px', fontSize: '14px', fontWeight: 'bold', color: '#444' }}>Police d'écriture</label>
                                <select style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}>
                                    <option>Inter (Défaut)</option>
                                    <option>Roboto</option>
                                    <option>Poppins</option>
                                    <option>Lato</option>
                                </select>
                            </div>
                        </div>

                        {/* Right Column: Preview */}
                        <div style={{ background: themeMode === 'dark' ? '#111' : '#F4F7FE', borderRadius: '16px', padding: '24px', border: '1px solid #eee' }}>
                            <h4 style={{ fontSize: '12px', textTransform: 'uppercase', color: '#888', marginBottom: '16px', fontWeight: 'bold' }}>Aperçu en direct</h4>

                            <div style={{ background: themeMode === 'dark' ? '#222' : 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                                    <div style={{ fontWeight: 'bold', color: themeMode === 'dark' ? 'white' : '#1B254B' }}>Mon Espace</div>
                                    <div style={{ color: primaryColor, fontWeight: 'bold' }}>Action</div>
                                </div>
                                <div style={{ height: '8px', width: '60%', background: '#eee', borderRadius: '4px', marginBottom: '24px' }}></div>

                                <button style={{ width: '100%', padding: '10px', background: primaryColor, color: 'white', border: 'none', borderRadius: '6px', fontWeight: 'bold' }}>
                                    Bouton Principal
                                </button>
                            </div>
                        </div>
                    </div>

                    <div style={{ marginTop: '32px', textAlign: 'right' }}>
                        <button style={{ background: primaryColor, color: 'white', border: 'none', padding: '12px 24px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>Appliquer le Thème</button>
                    </div>
                </div>
            )}

            {/* --- ROLES (EXISTING) --- */}
            {activeTab === 'roles' && (
                <div style={{ background: 'white', padding: '32px', borderRadius: '16px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                        <div>
                            <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1B254B' }}>Gestion des Rôles</h3>
                            <p style={{ color: '#888', fontSize: '14px', marginTop: '4px' }}>Définissez qui peut faire quoi sur la plateforme.</p>
                        </div>
                        <button style={{ background: '#006AFF', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>+ Nouveau Rôle</button>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
                        {roles.map((role) => (
                            <div key={role.id} style={{ border: '1px solid #eee', borderRadius: '12px', padding: '24px', transition: 'box-shadow 0.2s' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                                    <div style={{ padding: '8px 16px', borderRadius: '20px', background: `${role.color}15`, color: role.color, fontWeight: 'bold', fontSize: '14px' }}>
                                        {role.name}
                                    </div>
                                    <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#888', fontSize: '18px' }}>⚙️</button>
                                </div>
                                <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#1B254B', marginBottom: '8px' }}>
                                    {role.users} <span style={{ fontSize: '14px', fontWeight: 'normal', color: '#888' }}>utilisateurs</span>
                                </div>
                                <div style={{ borderTop: '1px solid #f9f9f9', paddingTop: '16px', marginTop: '16px' }}>
                                    <p style={{ fontSize: '12px', color: '#A3AED0', marginBottom: '10px', fontWeight: 'bold', textTransform: 'uppercase' }}>Permissions</p>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                        {role.permissions.map((perm, idx) => (
                                            <span key={idx} style={{ fontSize: '12px', background: '#F4F7FE', padding: '4px 10px', borderRadius: '4px', color: '#555', fontWeight: '500' }}>{perm}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* --- FISCALITE --- */}
            {activeTab === 'fiscality' && (
                <div style={{ background: 'white', padding: '32px', borderRadius: '16px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)', maxWidth: '900px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1B254B', marginBottom: '8px' }}>Configuration Fiscale</h3>
                    <p style={{ color: '#666', fontSize: '14px', marginBottom: '32px' }}>Définissez les taux de taxes et frais appliqués par défaut sur la plateforme.</p>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>

                        {/* TVA et Taxes Générales */}
                        <div>
                            <h4 style={{ fontSize: '14px', fontWeight: 'bold', color: '#1B254B', marginBottom: '16px', textTransform: 'uppercase', borderBottom: '1px solid #eee', paddingBottom: '8px' }}>Taxes Générales</h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#444' }}>Taux TVA (Taxe sur la Valeur Ajoutée)</label>
                                    <div style={{ position: 'relative' }}>
                                        <input type="number" defaultValue="18" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }} />
                                        <span style={{ position: 'absolute', right: '12px', top: '12px', color: '#888' }}>%</span>
                                    </div>
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#444' }}>TOM (Taxe Ordures Ménagères)</label>
                                    <div style={{ position: 'relative' }}>
                                        <input type="number" defaultValue="3.5" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }} />
                                        <span style={{ position: 'absolute', right: '12px', top: '12px', color: '#888' }}>%</span>
                                    </div>
                                    <div style={{ fontSize: '11px', color: '#888', marginTop: '4px' }}>Appliqué sur la valeur locative / foncière</div>
                                </div>
                            </div>
                        </div>

                        {/* Frais Immobiliers */}
                        <div>
                            <h4 style={{ fontSize: '14px', fontWeight: 'bold', color: '#1B254B', marginBottom: '16px', textTransform: 'uppercase', borderBottom: '1px solid #eee', paddingBottom: '8px' }}>Transactions Immobilières</h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#444' }}>Droits d'Enregistrement (Vente)</label>
                                    <div style={{ position: 'relative' }}>
                                        <input type="number" defaultValue="5" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }} />
                                        <span style={{ position: 'absolute', right: '12px', top: '12px', color: '#888' }}>%</span>
                                    </div>
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#444' }}>Frais de Notaire (Est.)</label>
                                    <div style={{ position: 'relative' }}>
                                        <input type="number" defaultValue="3" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }} />
                                        <span style={{ position: 'absolute', right: '12px', top: '12px', color: '#888' }}>%</span>
                                    </div>
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#444' }}>Frais de Dossier (Location)</label>
                                    <div style={{ position: 'relative' }}>
                                        <input type="number" defaultValue="5000" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }} />
                                        <span style={{ position: 'absolute', right: '12px', top: '12px', color: '#888' }}>CFA</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={{ marginTop: '32px', padding: '16px', background: '#FFF7E6', borderRadius: '8px', border: '1px solid #FFB547', display: 'flex', gap: '12px', alignItems: 'start' }}>
                        <span style={{ fontSize: '20px' }}>⚠️</span>
                        <div>
                            <div style={{ fontWeight: 'bold', fontSize: '14px', color: '#B7791F', marginBottom: '4px' }}>Note importante</div>
                            <div style={{ fontSize: '13px', color: '#666' }}>
                                Ces taux sont utilisés pour les estimations automatiques affichées aux utilisateurs sur les pages de biens. Ils n'ont pas valeur légale finale. Veuillez consulter un notaire pour valider ces chiffres.
                            </div>
                        </div>
                    </div>

                    <div style={{ marginTop: '32px', textAlign: 'right' }}>
                        <button style={{ background: '#006AFF', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>Mettre à jour les taux</button>
                    </div>
                </div>
            )}
        </div>
    );
}
