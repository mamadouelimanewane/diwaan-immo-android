'use client';

import Link from 'next/link';

export default function GuideConstructionPage() {
    return (
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 24px' }}>
            <div style={{ marginBottom: '30px', fontSize: '14px', color: '#666' }}>
                <Link href="/guides" style={{ color: '#006AFF' }}>← Retour aux guides</Link>
            </div>

            <div style={{ marginBottom: '40px', textAlign: 'center' }}>
                <div style={{ fontSize: '64px', marginBottom: '20px' }}>🏗️</div>
                <h1 style={{ fontSize: '42px', fontWeight: 'bold', color: '#1B254B', marginBottom: '16px' }}>
                    Guide Construire sa Maison
                </h1>
                <p style={{ fontSize: '18px', color: '#666', lineHeight: '1.6' }}>
                    Du terrain aux finitions : tout pour réussir votre projet de construction au Sénégal
                </p>
            </div>

            <div style={{ fontSize: '16px', lineHeight: '1.8', color: '#333' }}>

                <section style={{ marginBottom: '60px' }}>
                    <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: '#1B254B', marginBottom: '20px', borderLeft: '5px solid #4318FF', paddingLeft: '20px' }}>
                        🏞️ Choisir et Acheter un Terrain
                    </h2>

                    <div style={{ background: '#F0F0FF', padding: '30px', borderRadius: '12px', marginBottom: '25px' }}>
                        <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px' }}>
                            📋 Checklist terrain
                        </h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' }}>
                            {[
                                { check: 'Titre foncier TF', critique: true },
                                { check: 'Viabilité (eau, électricité)', critique: true },
                                { check: 'Accès route goudronnée', critique: false },
                                { check: 'Zonage constructible', critique: true },
                                { check: 'Pas en zone inondable', critique: true },
                                { check: 'Proximité services', critique: false },
                                { check: 'Qualité sol (étude)', critique: true },
                                { check: 'Bornage clair', critique: true }
                            ].map((item, i) => (
                                <div key={i} style={{ padding: '15px', background: 'white', borderRadius: '8px', border: `2px solid ${item.critique ? '#E63946' : '#4318FF'}` }}>
                                    <span style={{ fontWeight: 'bold', color: item.critique ? '#E63946' : '#4318FF' }}>
                                        {item.critique ? '⚠️' : '✓'} {item.check}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div style={{ background: '#E6F2FF', padding: '25px', borderRadius: '12px' }}>
                        <h4 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '15px', color: '#006AFF' }}>
                            💰 Prix terrain par zone (Dakar)
                        </h4>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <tbody>
                                {[
                                    { zone: 'Almadies / Ngor', prix: '80.000-150.000' },
                                    { zone: 'Ouakam / Yoff', prix: '50.000-100.000' },
                                    { zone: 'Pikine / Guédiawaye', prix: '20.000-40.000' },
                                    { zone: 'Rufisque / Bargny', prix: '15.000-30.000' },
                                    { zone: 'Thiès / Saly', prix: '10.000-25.000' }
                                ].map((z, i) => (
                                    <tr key={i} style={{ borderBottom: '1px solid #ddd', background: i % 2 === 0 ? 'white' : '#F9FAFB' }}>
                                        <td style={{ padding: '12px', fontWeight: '500' }}>{z.zone}</td>
                                        <td style={{ padding: '12px', textAlign: 'right', color: '#006AFF', fontWeight: 'bold' }}>{z.prix} FCFA/m²</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                <section style={{ marginBottom: '60px' }}>
                    <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: '#1B254B', marginBottom: '20px', borderLeft: '5px solid #FFB547', paddingLeft: '20px' }}>
                        🏛️ Permis de Construire
                    </h2>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '30px' }}>
                        <div style={{ padding: '25px', background: '#FFF7E6', borderRadius: '12px' }}>
                            <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '15px', color: '#FFB547' }}>
                                📄 Documents requis
                            </h3>
                            <ul style={{ marginLeft: '20px', lineHeight: '2', fontSize: '14px' }}>
                                <li>Demande timbréeSérigraphiée</li>
                                <li>Titre foncier (copie)</li>
                                <li>Plan de situation</li>
                                <li>Plan masse côté</li>
                                <li>Plans architecture (4 ex)</li>
                                <li>Étude technique BET</li>
                                <li>Devis estimatif</li>
                            </ul>
                        </div>

                        <div style={{ padding: '25px', background: '#FFF7E6', borderRadius: '12px' }}>
                            <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '15px', color: '#FFB547' }}>
                                ⏱️ Délais
                            </h3>
                            <div style={{ lineHeight: '2.5', fontSize: '15px' }}>
                                <div><strong>Dakar :</strong> 2-3 mois</div>
                                <div><strong>Thiès :</strong> 1-2 mois</div>
                                <div><strong>Autres :</strong> 3-6 mois</div>
                                <div style={{ marginTop: '15px', fontSize: '13px', color: '#666' }}>
                                    💡 Accéléré possible avec intermédiaire
                                </div>
                            </div>
                        </div>

                        <div style={{ padding: '25px', background: '#FFF7E6', borderRadius: '12px' }}>
                            <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '15px', color: '#FFB547' }}>
                                💰 Coûts
                            </h3>
                            <div style={{ lineHeight: '2.5', fontSize: '15px' }}>
                                <div>Frais communes : <strong>300-500K</strong></div>
                                <div>Plans architecte : <strong>1-2M</strong></div>
                                <div>Étude technique : <strong>500K-1M</strong></div>
                                <div style={{ marginTop: '15px', padding: '10px', background: '#FFB547', color: 'white', borderRadius: '8px', textAlign: 'center', fontWeight: 'bold' }}>
                                    Total : 2-3.5M FCFA
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section style={{ marginBottom: '60px' }}>
                    <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: '#1B254B', marginBottom: '20px', borderLeft: '5px solid #05CD99', paddingLeft: '20px' }}>
                        👷 Budget de Construction
                    </h2>

                    <div style={{ background: 'linear-gradient(135deg, #05CD99 0%, #00A67E 100%)', padding: '40px', borderRadius: '16px', color: 'white', marginBottom: '30px' }}>
                        <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '25px', textAlign: 'center' }}>
                            💰 Coût au m² selon standing
                        </h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                            {[
                                { type: 'Économique', cout: '150-200K', desc: 'Finitions simples' },
                                { type: 'Standard', cout: '200-280K', desc: 'Bon rapport qualité/prix' },
                                { type: 'Standing', cout: '280-350K', desc: 'Finitions soignées' },
                                { type: 'Haut de gamme', cout: '350-500K+', desc: 'Luxe et prestations' }
                            ].map((s, i) => (
                                <div key={i} style={{ padding: '25px', background: 'rgba(255,255,255,0.2)', borderRadius: '12px', textAlign: 'center' }}>
                                    <div style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>{s.type}</div>
                                    <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>{s.cout} FCFA/m²</div>
                                    <div style={{ fontSize: '13px', opacity: 0.9 }}>{s.desc}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div style={{ background: '#E6F8F1', padding: '30px', borderRadius: '12px' }}>
                        <h4 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px' }}>
                            🏠 Exemple : Villa R+1 de 150m²
                        </h4>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '15px' }}>
                            <tbody>
                                {[
                                    { poste: 'Terrain (300m²)', montant: '9.000.000' },
                                    { poste: 'Plans + Permis', montant: '2.500.000' },
                                    { poste: 'Gros œuvre', montant: '15.000.000' },
                                    { poste: 'Second œuvre', montant: '10.000.000' },
                                    { poste: 'Finitions', montant: '7.000.000' },
                                    { poste: 'VRD + Aménagements', montant: '3.000.000' },
                                    { poste: 'Imprévus (10%)', montant: '4.650.000' }
                                ].map((p, i) => (
                                    <tr key={i} style={{ borderBottom: '1px solid #ddd', lineHeight: '2.5' }}>
                                        <td style={{ padding: '8px' }}>{p.poste}</td>
                                        <td style={{ padding: '8px', textAlign: 'right', fontWeight: '500' }}>{parseInt(p.montant).toLocaleString()} FCFA</td>
                                    </tr>
                                ))}
                                <tr style={{ borderTop: '3px solid #05CD99', fontWeight: 'bold', fontSize: '18px', background: '#05CD99', color: 'white' }}>
                                    <td style={{ padding: '15px' }}>TOTAL PROJET</td>
                                    <td style={{ padding: '15px', textAlign: 'right' }}>51.150.000 FCFA</td>
                                </tr>
                            </tbody>
                        </table>
                        <p style={{ fontSize: '14px', color: '#666', marginTop: '15px', textAlign: 'center', fontStyle: 'italic' }}>
                            Soit environ 341.000 FCFA/m² (standing moyen)
                        </p>
                    </div>
                </section>

                <section style={{ marginBottom: '60px' }}>
                    <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: '#1B254B', marginBottom: '20px', borderLeft: '5px solid #E63946', paddingLeft: '20px' }}>
                        👨‍🔧 Trouver des Professionnels
                    </h2>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                        {[
                            {
                                pro: 'Architecte',
                                tarif: '8-12% du budget',
                                mission: 'Plans, permis, coordination',
                                conseil: 'Obligatoire dès 150m²'
                            },
                            {
                                pro: 'Entreprise générale',
                                tarif: 'Budget global',
                                mission: 'Tout-en-un clé en main',
                                conseil: 'Sécurisant mais +15% cher'
                            },
                            {
                                pro: 'Tâcheron / Artisans',
                                tarif: 'Au m² ou forfait',
                                mission: 'Construction directe',
                                conseil: 'Moins cher mais risqué'
                            },
                            {
                                pro: 'Bureau d\'études (BET)',
                                tarif: '500K-1.5M',
                                mission: 'Calculs structures',
                                conseil: 'Obligatoire R+1 et +'
                            }
                        ].map((p, i) => (
                            <div key={i} style={{ padding: '20px', background: '#FFEBEB', borderRadius: '12px', border: '2px solid #E63946' }}>
                                <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px', color: '#E63946' }}>
                                    {p.pro}
                                </h3>
                                <div style={{ fontSize: '14px', lineHeight: '2' }}>
                                    <div><strong>Tarif :</strong> {p.tarif}</div>
                                    <div><strong>Mission :</strong> {p.mission}</div>
                                    <div style={{ marginTop: '10px', padding: '8px', background: 'white', borderRadius: '6px', fontSize: '13px' }}>
                                        💡 {p.conseil}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section style={{ marginBottom: '60px' }}>
                    <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: '#1B254B', marginBottom: '20px', borderLeft: '5px solid #4318FF', paddingLeft: '20px' }}>
                        📅 Planning Type
                    </h2>

                    <div style={{ background: 'linear-gradient(135deg, #4318FF 0%, #6B46C1 100%)', padding: '40px', borderRadius: '16px', color: 'white' }}>
                        <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '25px' }}>
                            ⏱️ Durée totale : 12-18 mois
                        </h3>
                        <div style={{ lineHeight: '3', fontSize: '16px' }}>
                            <div>📋 Études + Permis : <strong>3-4 mois</strong></div>
                            <div>🏗️ Gros œuvre : <strong>4-6 mois</strong></div>
                            <div>🔧 Second œuvre : <strong>3-4 mois</strong></div>
                            <div>🎨 Finitions : <strong>2-3 mois</strong></div>
                            <div>🌳 Aménagements : <strong>1 mois</strong></div>
                        </div>
                    </div>
                </section>

                <div style={{ marginTop: '60px', padding: '40px', background: 'linear-gradient(135deg, #4318FF 0%, #6B46C1 100%)', borderRadius: '16px', color: 'white', textAlign: 'center' }}>
                    <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '20px' }}>
                        Un projet de construction ?
                    </h2>
                    <p style={{ fontSize: '18px', marginBottom: '30px', opacity: 0.9 }}>
                        Trouvez terrains, architectes et entreprises de confiance
                    </p>
                    <Link
                        href="/search?type=land"
                        style={{
                            display: 'inline-block',
                            padding: '16px 40px',
                            background: 'white',
                            color: '#4318FF',
                            borderRadius: '12px',
                            fontWeight: 'bold',
                            fontSize: '18px',
                            textDecoration: 'none',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
                        }}
                    >
                        🏞️ Voir les terrains →
                    </Link>
                </div>
            </div>
        </div>
    );
}
