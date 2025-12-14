'use client';

import Link from 'next/link';

export default function GuideVendeurPage() {
    return (
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 24px' }}>
            <div style={{ marginBottom: '30px', fontSize: '14px', color: '#666' }}>
                <Link href="/guides" style={{ color: '#006AFF' }}>← Retour aux guides</Link>
            </div>

            <div style={{ marginBottom: '40px', textAlign: 'center' }}>
                <div style={{ fontSize: '64px', marginBottom: '20px' }}>🏷️</div>
                <h1 style={{ fontSize: '42px', fontWeight: 'bold', color: '#1B254B', marginBottom: '16px' }}>
                    Guide Complet du Vendeur Immobilier
                </h1>
                <p style={{ fontSize: '18px', color: '#666', lineHeight: '1.6' }}>
                    Vendez votre bien au meilleur prix et dans les meilleures conditions au Sénégal
                </p>
                <div style={{ marginTop: '20px', display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <span style={{ padding: '6px 16px', background: '#E6F2FF', color: '#006AFF', borderRadius: '20px', fontSize: '14px', fontWeight: '500' }}>
                        ⏱️ Temps de lecture : 12 min
                    </span>
                    <span style={{ padding: '6px 16px', background: '#E6F8F1', color: '#05CD99', borderRadius: '20px', fontSize: '14px', fontWeight: '500' }}>
                        ✅ Conforme Code Civil
                    </span>
                    <span style={{ padding: '6px 16px', background: '#FFF7E6', color: '#FFB547', borderRadius: '20px', fontSize: '14px', fontWeight: '500' }}>
                        📅 Mis à jour 2025
                    </span>
                </div>
            </div>

            <div style={{ background: '#F9FAFB', padding: '30px', borderRadius: '12px', marginBottom: '40px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px', color: '#1B254B' }}>
                    📋 Table des Matières
                </h2>
                <ol style={{ marginLeft: '20px', lineHeight: '2' }}>
                    <li><a href="#estimation" style={{ color: '#006AFF' }}>Estimer le juste prix de votre bien</a></li>
                    <li><a href="#preparation" style={{ color: '#006AFF' }}>Préparer votre propriété pour la vente</a></li>
                    <li><a href="#agence" style={{ color: '#006AFF' }}>Vendre seul ou via une agence ?</a></li>
                    <li><a href="#annonce" style={{ color: '#006AFF' }}>Créer une annonce irrésistible</a></li>
                    <li><a href="#visites" style={{ color: '#006AFF' }}>Organiser et réussir les visites</a></li>
                    <li><a href="#negociation" style={{ color: '#006AFF' }}>Négocier et accepter une offre</a></li>
                    <li><a href="#signature" style={{ color: '#006AFF' }}>Du compromis à l'acte définitif</a></li>
                    <li><a href="#fiscalite" style={{ color: '#006AFF' }}>Fiscalité de la plus-value</a></li>
                </ol>
            </div>

            <div style={{ fontSize: '16px', lineHeight: '1.8', color: '#333' }}>

                <section id="estimation" style={{ marginBottom: '60px' }}>
                    <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: '#1B254B', marginBottom: '20px', borderLeft: '5px solid #05CD99', paddingLeft: '20px' }}>
                        1️⃣ Estimer le Juste Prix de Votre Bien
                    </h2>

                    <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1B254B', marginTop: '30px', marginBottom: '15px' }}>
                        💰 Pourquoi l'estimation est cruciale ?
                    </h3>
                    <ul style={{ marginLeft: '30px', marginBottom: '25px', lineHeight: '2' }}>
                        <li><strong>Prix trop élevé</strong> : Votre bien ne se vend pas (durée moyenne 6+ mois)</li>
                        <li><strong>Prix trop bas</strong> : Vous perdez de l'argent (jusqu'à 10-15%)</li>
                        <li><strong>Juste prix</strong> : Vente en 2-3 mois au meilleur prix</li>
                    </ul>

                    <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1B254B', marginTop: '30px', marginBottom: '15px' }}>
                        📊 Méthodes d'estimation
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '30px' }}>
                        <div style={{ padding: '25px', background: '#E6F8F1', borderRadius: '12px', borderLeft: '4px solid #05CD99' }}>
                            <h4 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '12px', color: '#05CD99' }}>
                                1. Comparaison marché
                            </h4>
                            <p style={{ fontSize: '15px', marginBottom: '10px' }}>
                                Analysez les biens similaires vendus récemment dans votre quartier
                            </p>
                            <p style={{ fontSize: '14px', fontStyle: 'italic', color: '#666' }}>
                                ✅ Gratuit • ⏱️ 1-2 heures
                            </p>
                        </div>

                        <div style={{ padding: '25px', background: '#E6F2FF', borderRadius: '12px', borderLeft: '4px solid #006AFF' }}>
                            <h4 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '12px', color: '#006AFF' }}>
                                2. Outil en ligne Diwaan
                            </h4>
                            <p style={{ fontSize: '15px', marginBottom: '10px' }}>
                                Estimation automatique basée sur 10.000+ transactions
                            </p>
                            <p style={{ fontSize: '14px', fontStyle: 'italic', color: '#666' }}>
                                ✅ Gratuit • ⏱️ 2 minutes
                            </p>
                        </div>

                        <div style={{ padding: '25px', background: '#FFF7E6', borderRadius: '12px', borderLeft: '4px solid #FFB547' }}>
                            <h4 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '12px', color: '#FFB547' }}>
                                3. Expert immobilier
                            </h4>
                            <p style={{ fontSize: '15px', marginBottom: '10px' }}>
                                Visite sur place et rapport détaillé officiel
                            </p>
                            <p style={{ fontSize: '14px', fontStyle: 'italic', color: '#666' }}>
                                💰 50-150K FCFA • ⏱️ 3-5 jours
                            </p>
                        </div>
                    </div>

                    <div style={{ background: '#E6F2FF', padding: '25px', borderRadius: '12px', marginBottom: '20px' }}>
                        <h4 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '15px', color: '#006AFF' }}>
                            🎯 Critères qui influencent le prix
                        </h4>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                            {[
                                { critere: 'Localisation', impact: '+/- 30%' },
                                { critere: 'Surface habitable', impact: '+/- 20%' },
                                { critere: 'État général', impact: '+/- 15%' },
                                { critere: 'Vue et exposition', impact: '+/- 10%' },
                                { critere: 'Étage (immeuble)', impact: '+/- 5%' },
                                { critere: 'Parking/Jardin', impact: '+/- 10%' }
                            ].map((item, i) => (
                                <div key={i} style={{ padding: '12px', background: 'white', borderRadius: '8px' }}>
                                    <strong>{item.critere}</strong>
                                    <div style={{ color: '#05CD99', fontWeight: 'bold', marginTop: '5px' }}>{item.impact}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section id="preparation" style={{ marginBottom: '60px' }}>
                    <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: '#1B254B', marginBottom: '20px', borderLeft: '5px solid #FFB547', paddingLeft: '20px' }}>
                        2️⃣ Préparer Votre Propriété pour la Vente
                    </h2>

                    <div style={{ background: '#FFF7E6', padding: '30px', borderRadius: '12px', marginBottom: '30px' }}>
                        <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px' }}>
                            ✨ Règle d'or : Première impression = décision d'achat
                        </h3>
                        <p style={{ fontSize: '16px', marginBottom: '15px' }}>
                            Les acheteurs décident dans les <strong>90 premières secondes</strong> de visite !
                        </p>
                    </div>

                    <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1B254B', marginTop: '30px', marginBottom: '15px' }}>
                        🏠 Checklist de préparation
                    </h3>

                    <div style={{ marginBottom: '30px' }}>
                        <h4 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '15px', color: '#FFB547' }}>
                            Travaux essentiels (ROI élevé)
                        </h4>
                        <ul style={{ marginLeft: '30px', lineHeight: '2.2' }}>
                            <li><strong>Peinture fraîche</strong> : Blanc/beige neutre (ROI: 100-150%)</li>
                            <li><strong>Petites réparations</strong> : Robinets, portes, prises (ROI: 200%+)</li>
                            <li><strong>Jardinage</strong> : Tonte, désherbage, fleurs (ROI: 150%)</li>
                            <li><strong>Éclairage</strong> : Ampoules neuves partout (ROI: 300%)</li>
                            <li><strong>Nettoyage profond</strong> : Sol, vitres, salle de bain (Indispensable)</li>
                        </ul>
                    </div>

                    <div style={{ marginBottom: '30px' }}>
                        <h4 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '15px', color: '#FFB547' }}>
                            Travaux optionnels (selon budget)
                        </h4>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ background: '#F9FAFB', borderBottom: '2px solid #E5E7EB' }}>
                                    <th style={{ padding: '12px', textAlign: 'left' }}>Travaux</th>
                                    <th style={{ padding: '12px', textAlign: 'left' }}>Coût</th>
                                    <th style={{ padding: '12px', textAlign: 'left' }}>Plus-value</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { travaux: 'Cuisine moderne', cout: '3-5M', plus: '+8-12%' },
                                    { travaux: 'Salle de bain rénovée', cout: '2-4M', plus: '+6-10%' },
                                    { travaux: 'Carrelage neuf', cout: '1-3M', plus: '+5-8%' },
                                    { travaux: 'Climatisation', cout: '500K-1.5M', plus: '+3-5%' }
                                ].map((row, i) => (
                                    <tr key={i} style={{ borderBottom: '1px solid #E5E7EB' }}>
                                        <td style={{ padding: '12px' }}>{row.travaux}</td>
                                        <td style={{ padding: '12px' }}>{row.cout} FCFA</td>
                                        <td style={{ padding: '12px', color: '#05CD99', fontWeight: 'bold' }}>{row.plus}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div style={{ background: '#FFEBEB', padding: '20px', borderRadius: '12px', marginTop: '25px' }}>
                        <h4 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '10px', color: '#E63946' }}>
                            ⚠️ Travaux à éviter avant vente
                        </h4>
                        <ul style={{ marginLeft: '20px', fontSize: '15px' }}>
                            <li>Gros travaux structurels (extension, etc.) - ROI faible</li>
                            <li>Personnalisation extrême (couleurs vives, style unique)</li>
                            <li>Piscine si pas courante dans le quartier</li>
                            <li>Tout ce qui coûte plus de 5% de la valeur du bien</li>
                        </ul>
                    </div>
                </section>

                <section id="agence" style={{ marginBottom: '60px' }}>
                    <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: '#1B254B', marginBottom: '20px', borderLeft: '5px solid #4318FF', paddingLeft: '20px' }}>
                        3️⃣ Vendre Seul ou via une Agence ?
                    </h2>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '25px', marginBottom: '30px' }}>
                        <div style={{ padding: '30px', background: '#F0F9FF', borderRadius: '16px', border: '2px solid #006AFF' }}>
                            <h3 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '20px', color: '#006AFF' }}>
                                🏠 Vente directe (FSBO)
                            </h3>
                            <div style={{ marginBottom: '20px' }}>
                                <h4 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '10px', color: '#05CD99' }}>
                                    ✅ Avantages
                                </h4>
                                <ul style={{ marginLeft: '20px', lineHeight: '1.8' }}>
                                    <li>Économie commission (3-5%)</li>
                                    <li>Contrôle total du processus</li>
                                    <li>Contact direct acheteurs</li>
                                </ul>
                            </div>
                            <div>
                                <h4 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '10px', color: '#E63946' }}>
                                    ❌ Inconvénients
                                </h4>
                                <ul style={{ marginLeft: '20px', lineHeight: '1.8' }}>
                                    <li>Temps et énergie importants</li>
                                    <li>Pas de réseau d'acheteurs</li>
                                    <li>Risque erreurs juridiques</li>
                                    <li>Négociation plus difficile</li>
                                </ul>
                            </div>
                        </div>

                        <div style={{ padding: '30px', background: '#F0F9FF', borderRadius: '16px', border: '2px solid #006AFF' }}>
                            <h3 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '20px', color: '#006AFF' }}>
                                🏢 Via une agence
                            </h3>
                            <div style={{ marginBottom: '20px' }}>
                                <h4 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '10px', color: '#05CD99' }}>
                                    ✅ Avantages
                                </h4>
                                <ul style={{ marginLeft: '20px', lineHeight: '1.8' }}>
                                    <li>Expertise prix et marché</li>
                                    <li>Marketing professionnel</li>
                                    <li>Réseau acheteurs qualifiés</li>
                                    <li>Gestion complète dossier</li>
                                    <li>Vente souvent plus rapide</li>
                                </ul>
                            </div>
                            <div>
                                <h4 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '10px', color: '#E63946' }}>
                                    ❌ Inconvénients
                                </h4>
                                <ul style={{ marginLeft: '20px', lineHeight: '1.8' }}>
                                    <li>Commission 3-5% (vendeur)</li>
                                    <li>Moins de contrôle direct</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div style={{ background: '#E6F2FF', padding: '25px', borderRadius: '12px' }}>
                        <h4 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '15px', color: '#006AFF' }}>
                            💰 Exemple chiffré (Bien à 50M FCFA)
                        </h4>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                            <div>
                                <strong>Vente directe :</strong>
                                <div style={{ marginTop: '10px', fontSize: '15px' }}>
                                    Prix net : <span style={{ color: '#05CD99', fontWeight: 'bold', fontSize: '18px' }}>50M FCFA</span>
                                </div>
                            </div>
                            <div>
                                <strong>Via agence (4%) :</strong>
                                <div style={{ marginTop: '10px', fontSize: '15px' }}>
                                    Prix net : <span style={{ color: '#FFB547', fontWeight: 'bold', fontSize: '18px' }}>48M FCFA</span>
                                </div>
                                <div style={{ fontSize: '13px', color: '#666', marginTop: '5px' }}>
                                    Mais vente 2x plus rapide !
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="annonce" style={{ marginBottom: '60px' }}>
                    <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: '#1B254B', marginBottom: '20px', borderLeft: '5px solid #E63946', paddingLeft: '20px' }}>
                        4️⃣ Créer une Annonce Irrésistible
                    </h2>

                    <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1B254B', marginTop: '30px', marginBottom: '15px' }}>
                        📸 Photos professionnelles (Crucial!)
                    </h3>
                    <div style={{ background: '#FFF7E6', padding: '25px', borderRadius: '12px', marginBottom: '25px' }}>
                        <p style={{ fontSize: '16px', marginBottom: '15px' }}>
                            <strong>Statistique :</strong> Annonces avec photos pro = <span style={{ color: '#05CD99', fontWeight: 'bold' }}>3x plus de visites</span> et vente <span style={{ color: '#05CD99', fontWeight: 'bold' }}>32% plus rapide</span> !
                        </p>
                        <h4 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '10px' }}>Conseils photos :</h4>
                        <ul style={{ marginLeft: '20px', lineHeight: '2' }}>
                            <li><strong>15-25 photos</strong> minimum (chaque pièce, extérieurs)</li>
                            <li><strong>Lumière naturelle</strong> : Photographier en journée, volets ouverts</li>
                            <li><strong>Angles larges</strong> : Capturer l'espace maximum</li>
                            <li><strong>Mise en scène</strong> : Rangé, propre, décoré sobrement</li>
                            <li><strong>Première photo</strong> : Vue extérieure ou pièce principale</li>
                            <li><strong>Vidéo</strong> : Tour de 2-3 min = +50% d'intérêt</li>
                        </ul>
                    </div>

                    <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1B254B', marginTop: '30px', marginBottom: '15px' }}>
                        ✍️ Description qui vend
                    </h3>
                    <div style={{ background: '#E6F8F1', padding: '25px', borderRadius: '12px' }}>
                        <h4 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '15px', color: '#05CD99' }}>
                            ✅ Structure gagnante :
                        </h4>
                        <ol style={{ marginLeft: '20px', lineHeight: '2' }}>
                            <li><strong>Titre accrocheur</strong> : "Magnifique Villa R+2 Almadies Vue Mer"</li>
                            <li><strong>Caractéristiques clés</strong> : Surface, chambres, localisation précise</li>
                            <li><strong>Points forts</strong> : Vue, rénovation récente, quartier calme</li>
                            <li><strong>Équipements</strong> : Clim, parking, jardin, piscine</li>
                            <li><strong>Proximités</strong> : Écoles, commerces, transports</li>
                            <li><strong>Call-to-action</strong> : "Visite sur RDV - Contactez-nous"</li>
                        </ol>
                    </div>
                </section>

                <section id="fiscalite" style={{ marginBottom: '60px' }}>
                    <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: '#1B254B', marginBottom: '20px', borderLeft: '5px solid #4318FF', paddingLeft: '20px' }}>
                        8️⃣ Fiscalité de la Plus-Value
                    </h2>

                    <div style={{ background: '#F0F0FF', padding: '30px', borderRadius: '12px', marginBottom: '25px' }}>
                        <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px' }}>
                            💰 Calcul de la plus-value
                        </h3>
                        <p style={{ fontSize: '16px', marginBottom: '15px' }}>
                            <strong>Plus-value</strong> = Prix de vente - (Prix d'achat + Travaux + Frais d'acquisition)
                        </p>
                        <p style={{ fontSize: '16px', marginBottom: '15px' }}>
                            <strong>Impôt</strong> = Plus-value × 20%
                        </p>
                        <div style={{ background: 'white', padding: '20px', borderRadius: '8px', marginTop: '20px' }}>
                            <h4 style={{ fontWeight: 'bold', marginBottom: '10px' }}>Exemple :</h4>
                            <ul style={{ listStyle: 'none', padding: 0, lineHeight: '2' }}>
                                <li>Prix de vente : <strong>60M FCFA</strong></li>
                                <li>Prix d'achat : <strong>40M FCFA</strong></li>
                                <li>Travaux justifiés : <strong>5M FCFA</strong></li>
                                <li>Frais achat (15%) : <strong>6M FCFA</strong></li>
                                <li style={{ borderTop: '2px solid #ddd', marginTop: '10px', paddingTop: '10px' }}>
                                    Plus-value imposable : <span style={{ color: '#4318FF', fontWeight: 'bold' }}>9M FCFA</span>
                                </li>
                                <li>Impôt (20%) : <span style={{ color: '#E63946', fontWeight: 'bold' }}>1.8M FCFA</span></li>
                            </ul>
                        </div>
                    </div>

                    <div style={{ background: '#E6F8F1', padding: '25px', borderRadius: '12px' }}>
                        <h4 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '15px', color: '#05CD99' }}>
                            ✅ Exonérations possibles
                        </h4>
                        <ul style={{ marginLeft: '20px', lineHeight: '2.2' }}>
                            <li><strong>Résidence principale</strong> : Exonération totale si occupée 5+ ans</li>
                            <li><strong>Première vente</strong> : Exonération partielle dans certains cas</li>
                            <li><strong>Abattements</strong> : Pour durée de détention (6% par an après 5 ans)</li>
                        </ul>
                    </div>
                </section>

                <div style={{ marginTop: '60px', padding: '40px', background: 'linear-gradient(135deg, #05CD99 0%, #00A67E 100%)', borderRadius: '16px', color: 'white', textAlign: 'center' }}>
                    <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '20px' }}>
                        Prêt à vendre votre bien ?
                    </h2>
                    <p style={{ fontSize: '18px', marginBottom: '30px', opacity: 0.9 }}>
                        Publiez votre annonce gratuitement et touchez des milliers d'acheteurs
                    </p>
                    <Link
                        href="/sell"
                        style={{
                            display: 'inline-block',
                            padding: '16px 40px',
                            background: 'white',
                            color: '#05CD99',
                            borderRadius: '12px',
                            fontWeight: 'bold',
                            fontSize: '18px',
                            textDecoration: 'none',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
                        }}
                    >
                        🏷️ Vendre mon bien →
                    </Link>
                </div>
            </div>
        </div>
    );
}
