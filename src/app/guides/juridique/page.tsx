'use client';

import Link from 'next/link';

export default function GuideJuridiquePage() {
    return (
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 24px' }}>
            <div style={{ marginBottom: '30px', fontSize: '14px', color: '#666' }}>
                <Link href="/guides" style={{ color: '#006AFF' }}>← Retour aux guides</Link>
            </div>

            <div style={{ marginBottom: '40px', textAlign: 'center' }}>
                <div style={{ fontSize: '64px', marginBottom: '20px' }}>📝</div>
                <h1 style={{ fontSize: '42px', fontWeight: 'bold', color: '#1B254B', marginBottom: '16px' }}>
                    Guide Juridique & Notaires
                </h1>
                <p style={{ fontSize: '18px', color: '#666', lineHeight: '1.6' }}>
                    Sécurisez votre transaction immobilière : documents, notaires, démarches légales
                </p>
                <div style={{ marginTop: '20px', display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <span style={{ padding: '6px 16px', background: '#E6F2FF', color: '#006AFF', borderRadius: '20px', fontSize: '14px', fontWeight: '500' }}>
                        ⏱️ Temps de lecture : 10 min
                    </span>
                    <span style={{ padding: '6px 16px', background: '#E6F8F1', color: '#05CD99', borderRadius: '20px', fontSize: '14px', fontWeight: '500' }}>
                        ✅ Conforme OHADA
                    </span>
                </div>
            </div>

            <div style={{ fontSize: '16px', lineHeight: '1.8', color: '#333' }}>

                <section style={{ marginBottom: '60px' }}>
                    <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: '#1B254B', marginBottom: '20px', borderLeft: '5px solid #E63946', paddingLeft: '20px' }}>
                        👨‍⚖️ Le Rôle du Notaire
                    </h2>

                    <div style={{ background: '#FFEBEB', padding: '30px', borderRadius: '12px', marginBottom: '25px' }}>
                        <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px' }}>
                            Missions obligatoires du notaire
                        </h3>
                        <ul style={{ marginLeft: '30px', lineHeight: '2.2' }}>
                            <li><strong>Authentification de l'acte</strong> : Donne force exécutoire au document</li>
                            <li><strong>Vérification juridique</strong> : Contrôle titre foncier et hypothèques</li>
                            <li><strong>Conseil impartial</strong> : Informe acheteur et vendeur</li>
                            <li><strong>Rédaction acte de vente</strong> : Document conforme au Code Civil</li>
                            <li><strong>Enregistrement</strong> : Conservation Foncière et impôts</li>
                            <li><strong>Archivage</strong> : Conservation 75 ans minimum</li>
                        </ul>
                    </div>

                    <div style={{ background: '#E6F2FF', padding: '25px', borderRadius: '12px' }}>
                        <h4 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '15px', color: '#006AFF' }}>
                            💰 Frais de notaire détaillés
                        </h4>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <tbody>
                                {[
                                    { libelle: 'Droits d\'enregistrement', taux: '10%', exemple: '5.000.000 FCFA' },
                                    { libelle: 'Honoraires notaire', taux: '1-2%', exemple: '500.000 - 1.000.000 FCFA' },
                                    { libelle: 'Conservation Foncière', taux: 'Fixe', exemple: '100.000 - 300.000 FCFA' },
                                    { libelle: 'Frais divers (copies, timbres)', taux: 'Variable', exemple: '50.000 - 150.000 FCFA' }
                                ].map((f, i) => (
                                    <tr key={i} style={{ borderBottom: '1px solid #ddd', background: i % 2 === 0 ? 'white' : '#F9FAFB' }}>
                                        <td style={{ padding: '12px' }}>{f.libelle}</td>
                                        <td style={{ padding: '12px', fontWeight: 'bold', color: '#006AFF' }}>{f.taux}</td>
                                        <td style={{ padding: '12px', textAlign: 'right' }}>{f.exemple}</td>
                                    </tr>
                                ))}
                                <tr style={{ borderTop: '3px solid #006AFF', background: '#E6F2FF', fontWeight: 'bold', fontSize: '16px' }}>
                                    <td style={{ padding: '15px' }} colSpan={2}>TOTAL (pour un bien à 50M)</td>
                                    <td style={{ padding: '15px', textAlign: 'right', color: '#E63946' }}>~5.650.000 - 6.450.000 FCFA</td>
                                </tr>
                            </tbody>
                        </table>
                        <p style={{ fontSize: '14px', color: '#666', marginTop: '15px', fontStyle: 'italic' }}>
                            💡 Soit environ 11-13% du prix du bien
                        </p>
                    </div>
                </section>

                <section style={{ marginBottom: '60px' }}>
                    <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: '#1B254B', marginBottom: '20px', borderLeft: '5px solid #006AFF', paddingLeft: '20px' }}>
                        📄 Documents Juridiques Essentiels
                    </h2>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '30px' }}>
                        {[
                            {
                                doc: 'Titre Foncier (TF)',
                                desc: 'Document le PLUS IMPORTANT. Prouve la propriété du bien.',
                                checks: ['Vérifier nom propriétaire', 'Superficie exacte', 'Références cadastrales', 'Date dernière mutation']
                            },
                            {
                                doc: 'Certificat de Propriété',
                                desc: 'Titre provisoire en attendant le TF définitif.',
                                checks: ['Délai validité (2 ans)', 'Procédure TF en cours', 'Attestation mairie']
                            },
                            {
                                doc: 'Attestation Non-Hypothèque',
                                desc: 'Prouve qu\'aucune dette ne grève le bien.',
                                checks: ['Moins de 3 mois', 'Conservation Foncière', 'Aucune mention']
                            },
                            {
                                doc: 'Plan Cadastral',
                                desc: 'Plan officiel des limites du terrain.',
                                checks: ['À jour', 'Signé géomètre', 'Correspond au TF']
                            }
                        ].map((item, i) => (
                            <div key={i} style={{ padding: '20px', background: '#E6F2FF', borderRadius: '12px', border: '2px solid #006AFF' }}>
                                <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px', color: '#006AFF' }}>
                                    {item.doc}
                                </h3>
                                <p style={{ fontSize: '14px', marginBottom: '15px' }}>{item.desc}</p>
                                <div style={{ fontSize: '13px' }}>
                                    <strong>À vérifier :</strong>
                                    <ul style={{ marginLeft: '15px', marginTop: '8px', lineHeight: '1.8' }}>
                                        {item.checks.map((c, j) => <li key={j}>✅ {c}</li>)}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section style={{ marginBottom: '60px' }}>
                    <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: '#1B254B', marginBottom: '20px', borderLeft: '5px solid #05CD99', paddingLeft: '20px' }}>
                        🔄 Étapes chez le Notaire
                    </h2>

                    <div style={{ position: 'relative', paddingLeft: '40px' }}>
                        {[
                            { num: 1, titre: 'Vérification titre foncier', duree: '1-2 semaines', desc: 'Notaire vérifie authenticité et situation juridique' },
                            { num: 2, titre: 'Rédaction avant-contrat', duree: '3-5 jours', desc: 'Compromis ou promesse de vente' },
                            { num: 3, titre: 'Signature chez notaire', duree: '1 jour', desc: 'Acte authentique devant notaire + témoins' },
                            { num: 4, titre: 'Enregistrement Conservation', duree: '2-4 mois', desc: 'Inscription nouveau propriétaire' },
                            { num: 5, titre: 'Remise nouveau TF', duree: '4-6 mois total', desc: 'Titre foncier à votre nom reçu' }
                        ].map((etape, i) => (
                            <div key={i} style={{ position: 'relative', marginBottom: '30px', paddingLeft: '30px', borderLeft: i === 4 ? 'none' : '3px solid #05CD99' }}>
                                <div style={{ position: 'absolute', left: '-18px', top: '0', width: '36px', height: '36px', background: '#05CD99', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', fontSize: '18px' }}>
                                    {etape.num}
                                </div>
                                <div style={{ background: '#E6F8F1', padding: '20px', borderRadius: '12px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                                        <h4 style={{ fontSize: '18px', fontWeight: 'bold' }}>{etape.titre}</h4>
                                        <span style={{ padding: '4px 12px', background: '#05CD99', color: 'white', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' }}>
                                            {etape.duree}
                                        </span>
                                    </div>
                                    <p style={{ fontSize: '15px', color: '#666' }}>{etape.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section style={{ marginBottom: '60px' }}>
                    <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: '#1B254B', marginBottom: '20px', borderLeft: '5px solid #4318FF', paddingLeft: '20px' }}>
                        ⚖️ Législation Applicable
                    </h2>

                    <div style={{ background: 'linear-gradient(135deg, #4318FF 0%, #6B46C1 100%)', padding: '40px', borderRadius: '16px', color: 'white', marginBottom: '30px' }}>
                        <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '25px' }}>
                            📚 Textes de référence
                        </h3>
                        <ul style={{ marginLeft: '25px', lineHeight: '2.5', fontSize: '16px' }}>
                            <li><strong>Code Civil sénégalais</strong> : Base du droit des contrats</li>
                            <li><strong>Loi 2011-07</strong> : Régime foncier et domanial</li>
                            <li><strong>Décret 2012-1315</strong> : Procédures d'immatriculation</li>
                            <li><strong>Actes Uniformes OHADA</strong> : Droit commercial et sûretés</li>
                            <li><strong>Code Général des Impôts</strong> : Fiscalité immobilière</li>
                        </ul>
                    </div>

                    <div style={{ background: '#FFEBEB', padding: '25px', borderRadius: '12px' }}>
                        <h4 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '15px', color: '#E63946' }}>
                            ⚠️ Pièges juridiques à éviter
                        </h4>
                        <ul style={{ marginLeft: '25px', lineHeight: '2.2' }}>
                            <li>Acheter sans vérifier le titre foncier (risque d'escroquerie)</li>
                            <li>Accepter un "certificat" au lieu d'un TF (non définitif)</li>
                            <li>Signer sans avocat/notaire (invalide juridiquement)</li>
                            <li>Oublier de vérifier les hypothèques (dettes cachées)</li>
                            <li>Ne pas exiger plan cadastral à jour (litiges de bornage)</li>
                        </ul>
                    </div>
                </section>

                <div style={{ marginTop: '60px', padding: '40px', background: 'linear-gradient(135deg, #E63946 0%, #C62828 100%)', borderRadius: '16px', color: 'white', textAlign: 'center' }}>
                    <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '20px' }}>
                        Besoin d'un accompagnement juridique ?
                    </h2>
                    <p style={{ fontSize: '18px', marginBottom: '30px', opacity: 0.9 }}>
                        Nos experts vérifient vos documents et sécurisent votre transaction
                    </p>
                    <Link
                        href="/legal-assistant"
                        style={{
                            display: 'inline-block',
                            padding: '16px 40px',
                            background: 'white',
                            color: '#E63946',
                            borderRadius: '12px',
                            fontWeight: 'bold',
                            fontSize: '18px',
                            textDecoration: 'none',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
                        }}
                    >
                        🤖 Assistant Juridique →
                    </Link>
                </div>
            </div>
        </div>
    );
}
