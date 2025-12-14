'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Calculator, FileText, Globe, Building, Info, CheckCircle2 } from 'lucide-react';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function FinancingGuidePage() {
    // Calculator State
    const [propertyType, setPropertyType] = useState('apartment');
    const [price, setPrice] = useState(50000000);
    const [downPayment, setDownPayment] = useState(10000000);
    const [rate, setRate] = useState(7.5); // Taux moyen plus réaliste au Sénégal
    const [years, setYears] = useState(15);
    const [monthlyPayment, setMonthlyPayment] = useState(0);
    const [totalInterest, setTotalInterest] = useState(0);
    const [chartData, setChartData] = useState<any>(null);

    // Active Tab for "Dossier"
    const [activeProfile, setActiveProfile] = useState<'salarie' | 'independant' | 'diaspora'>('salarie');

    useEffect(() => {
        // Adjust defaults based on property type (Simple simulation logic)
        if (propertyType === 'land') {
            // Terrains souvent moins de temps et taux plus élevés parfois
            // setRate(8.0);
            // setYears(10);
        }
    }, [propertyType]);

    useEffect(() => {
        const principal = price - downPayment;
        const monthlyRate = rate / 100 / 12;
        const numberOfPayments = years * 12;

        let payment = 0;
        if (monthlyRate === 0) {
            payment = principal / numberOfPayments;
        } else {
            payment = (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
                (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
        }

        setMonthlyPayment(payment);
        setTotalInterest((payment * numberOfPayments) - principal);

        // Chart Data
        setChartData({
            labels: ['Principal', 'Intérêts Totaux', 'Frais Annexes (Est.)'],
            datasets: [
                {
                    data: [principal, Math.round((payment * numberOfPayments) - principal), Math.round(price * 0.07)], // 7% Notaire approx
                    backgroundColor: ['#006AFF', '#FF6B6B', '#A0AEC0'],
                    borderWidth: 0,
                },
            ],
        });
    }, [price, downPayment, rate, years]);

    const formatCurrency = (amount: number) => {
        return Math.round(amount).toLocaleString('fr-FR') + ' FCFA';
    };

    return (
        <div className="container" style={{ padding: '40px 24px', maxWidth: '1200px' }}>

            {/* Header & Disclaimer */}
            <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                <h1 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '16px', color: '#1A202C' }}>Guide du Financement Immobilier au Sénégal</h1>
                <p style={{ fontSize: '18px', color: '#4A5568', maxWidth: '800px', margin: '0 auto' }}>
                    Tout ce qu'il faut savoir pour préparer votre crédit immobilier : calculatrices, documents requis et conseils pour la diaspora.
                </p>

                <div style={{ marginTop: '24px', padding: '12px 20px', background: '#FFF5F5', border: '1px solid #FED7D7', borderRadius: '8px', display: 'inline-flex', alignItems: 'center', gap: '12px', textAlign: 'left' }}>
                    <Info size={24} color="#C53030" />
                    <div style={{ fontSize: '14px', color: '#742A2A' }}>
                        <strong>Note Importante :</strong> Diwaan n'est pas une banque. Nous vous fournissons ces outils à titre informatif pour vous aider à préparer votre dossier auprès de nos banques partenaires.
                    </div>
                </div>
            </div>

            {/* Main Grid Layout */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', gap: '60px' }}>

                {/* 1. CALCULATOR SECTION */}
                <section id="calculator" style={{ scrollMarginTop: '100px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
                        <div style={{ padding: '10px', background: '#EBF8FF', borderRadius: '12px' }}><Calculator color="#006AFF" size={32} /></div>
                        <h2 style={{ fontSize: '28px', fontWeight: 'bold' }}>Simulateur de Crédit</h2>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '40px', background: '#FFFFFF', padding: '32px', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
                        <div className="calculator-inputs">
                            <div style={{ marginBottom: '24px' }}>
                                <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px' }}>Type de Bien</label>
                                <div style={{ display: 'flex', gap: '12px' }}>
                                    {[
                                        { id: 'apartment', label: 'Appartement' },
                                        { id: 'house', label: 'Maison / Villa' },
                                        { id: 'land', label: 'Terrain' }
                                    ].map((type) => (
                                        <button
                                            key={type.id}
                                            onClick={() => setPropertyType(type.id)}
                                            style={{
                                                padding: '10px 20px',
                                                borderRadius: '8px',
                                                border: `1px solid ${propertyType === type.id ? '#006AFF' : '#E2E8F0'}`,
                                                background: propertyType === type.id ? '#EBF8FF' : '#FFF',
                                                color: propertyType === type.id ? '#006AFF' : '#4A5568',
                                                cursor: 'pointer',
                                                fontWeight: 600
                                            }}
                                        >
                                            {type.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div style={{ marginBottom: '24px' }}>
                                <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px' }}>Prix du Bien</label>
                                <input
                                    type="range" min="5000000" max="500000000" step="1000000"
                                    value={price} onChange={(e) => setPrice(Number(e.target.value))}
                                    style={{ width: '100%', marginBottom: '8px' }}
                                />
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <input
                                        type="number"
                                        value={price}
                                        onChange={(e) => setPrice(Number(e.target.value))}
                                        style={{ padding: '8px', borderRadius: '6px', border: '1px solid #CBD5E0', width: '150px', fontWeight: 'bold' }}
                                    />
                                    <span style={{ fontSize: '14px', color: '#718096' }}>FCFA</span>
                                </div>
                            </div>

                            <div style={{ marginBottom: '24px' }}>
                                <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px' }}>Apport Personnel ({Math.round(downPayment / price * 100)}%)</label>
                                <input
                                    type="range" min="0" max={price} step="500000"
                                    value={downPayment} onChange={(e) => setDownPayment(Number(e.target.value))}
                                    style={{ width: '100%', marginBottom: '8px' }}
                                />
                                <input
                                    type="number"
                                    value={downPayment}
                                    onChange={(e) => setDownPayment(Number(e.target.value))}
                                    style={{ padding: '8px', borderRadius: '6px', border: '1px solid #CBD5E0', width: '150px', fontWeight: 'bold' }}
                                />
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                                <div>
                                    <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px' }}>Taux d'intérêt (%)</label>
                                    <input
                                        type="number" step="0.1"
                                        value={rate}
                                        onChange={(e) => setRate(Number(e.target.value))}
                                        style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #CBD5E0' }}
                                    />
                                    <div style={{ fontSize: '12px', color: '#718096', marginTop: '4px' }}>Moyenne Sénégal: 6.5% - 8.5%</div>
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px' }}>Durée (Années)</label>
                                    <select
                                        value={years}
                                        onChange={(e) => setYears(Number(e.target.value))}
                                        style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #CBD5E0' }}
                                    >
                                        {[5, 7, 10, 12, 15, 20, 25].map(y => (
                                            <option key={y} value={y}>{y} ans</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="calculator-results" style={{ background: '#F7FAFC', padding: '24px', borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <div style={{ marginBottom: '8px', fontSize: '14px', color: '#4A5568', fontWeight: 600 }}>Mensualité Estimée</div>
                            <div style={{ fontSize: '42px', fontWeight: '800', color: '#006AFF', marginBottom: '24px' }}>
                                {Math.round(monthlyPayment).toLocaleString('fr-FR')} <span style={{ fontSize: '20px', color: '#718096' }}>FCFA</span>
                            </div>

                            <div style={{ width: '200px', height: '200px', marginBottom: '24px' }}>
                                {chartData && <Doughnut data={chartData} options={{ maintainAspectRatio: false }} />}
                            </div>

                            <div style={{ width: '100%', fontSize: '14px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                    <span style={{ color: '#4A5568' }}>Montant du prêt :</span>
                                    <span style={{ fontWeight: '600' }}>{formatCurrency(price - downPayment)}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                    <span style={{ color: '#4A5568' }}>Coût total crédit :</span>
                                    <span style={{ fontWeight: '600' }}>{formatCurrency(totalInterest)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 2. DOSSIER DE PRET */}
                <section>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
                        <div style={{ padding: '10px', background: '#EBF8FF', borderRadius: '12px' }}><FileText color="#006AFF" size={32} /></div>
                        <h2 style={{ fontSize: '28px', fontWeight: 'bold' }}>Constituer votre Dossier</h2>
                    </div>

                    <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px', overflow: 'hidden' }}>
                        <div style={{ display: 'flex', borderBottom: '1px solid #E2E8F0' }}>
                            {[
                                { id: 'salarie', label: 'Salarié (CDI)' },
                                { id: 'independant', label: 'Professionnel / Indépendant' },
                                { id: 'diaspora', label: 'Diaspora / Non-Résident' }
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveProfile(tab.id as any)}
                                    style={{
                                        flex: 1,
                                        padding: '16px',
                                        background: activeProfile === tab.id ? '#FFF' : '#F7FAFC',
                                        borderBottom: activeProfile === tab.id ? '2px solid #006AFF' : 'none',
                                        fontWeight: activeProfile === tab.id ? '700' : '500',
                                        color: activeProfile === tab.id ? '#006AFF' : '#4A5568',
                                        cursor: 'pointer'
                                    }}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        <div style={{ padding: '32px' }}>
                            <h3 style={{ fontSize: '20px', marginBottom: '20px', fontWeight: 'bold' }}>Documents Requis pour {activeProfile === 'salarie' ? 'les Salariés' : activeProfile === 'independant' ? 'les Indépendants' : 'la Diaspora'}</h3>
                            <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                                {activeProfile === 'salarie' && [
                                    "Demande de prêt manuscrite ou formulaire banque",
                                    "Copie CNI ou Passeport en cours de validité",
                                    "3 derniers bulletins de salaire",
                                    "Attestation de travail ou Contrat de travail (CDI)",
                                    "Relevés bancaires des 6 derniers mois",
                                    "Attestation de non-engagement (si autre banque)",
                                    "Compromis de vente ou Titre de propriété",
                                    "Devis des travaux (si construction)"
                                ].map((item, i) => (
                                    <li key={i} style={{ display: 'flex', alignItems: 'start', gap: '10px' }}>
                                        <CheckCircle2 size={20} color="#38A169" style={{ marginTop: '2px' }} />
                                        <span>{item}</span>
                                    </li>
                                ))}

                                {activeProfile === 'independant' && [
                                    "Registre de Commerce (NINEA)",
                                    "États financiers des 2 ou 3 derniers exercices",
                                    "Relevés bancaires professionnels (12 derniers mois)",
                                    "Copie CNI ou Passeport du gérant",
                                    "Plan de trésorerie prévisionnel",
                                    "Justificatifs des marchés en cours (Contrats, Bons de commande)",
                                    "Compromis de vente du bien visé",
                                    "Titre foncier ou Bail du bien à financer"
                                ].map((item, i) => (
                                    <li key={i} style={{ display: 'flex', alignItems: 'start', gap: '10px' }}>
                                        <CheckCircle2 size={20} color="#38A169" style={{ marginTop: '2px' }} />
                                        <span>{item}</span>
                                    </li>
                                ))}

                                {activeProfile === 'diaspora' && [
                                    "Copie Passeport et Carte Consulaire",
                                    "Contrat de travail du pays de résidence",
                                    "3 derniers bulletins de salaire",
                                    "Avis d'imposition des 2 dernières années",
                                    "Relevés compte bancaire étranger (6 derniers mois)",
                                    "Relevé d'information crédit (Bureau de crédit pays résidence)",
                                    "Procuration (si représenté au Sénégal)",
                                    "Ouverture de compte 'Diaspora' dans la banque locale"
                                ].map((item, i) => (
                                    <li key={i} style={{ display: 'flex', alignItems: 'start', gap: '10px' }}>
                                        <CheckCircle2 size={20} color="#38A169" style={{ marginTop: '2px' }} />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>

                {/* 3. DIWAAN DIASPORA GUIDE */}
                <section style={{ background: '#2D3748', color: 'white', padding: '40px', borderRadius: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                        <Globe color="#63B3ED" size={32} />
                        <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: 'white' }}>Acquérir un bien depuis l'Étranger</h2>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
                        <div>
                            <p style={{ marginBottom: '16px', lineHeight: '1.6', color: '#E2E8F0' }}>
                                Investir au Sénégal quand on vit à l'étranger peut sembler complexe, mais les banques sénégalaises proposent désormais des produits dédiés à la Diaspora (Pack Diaspora).
                            </p>
                            <h4 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '12px', color: '#63B3ED' }}>Le Processus :</h4>
                            <ol style={{ paddingLeft: '20px', color: '#E2E8F0', lineHeight: '1.8' }}>
                                <li style={{ marginBottom: '8px' }}>Ouvrir un compte bancaire "Diaspora" à distance auprès d'une banque locale.</li>
                                <li style={{ marginBottom: '8px' }}>Identifier le bien via des agences vérifiées (comme Diwaan).</li>
                                <li style={{ marginBottom: '8px' }}>Signer une promesse de vente (peut se faire par procuration notariée).</li>
                                <li style={{ marginBottom: '8px' }}>Soumettre le dossier de crédit (voir liste ci-dessus).</li>
                                <li style={{ marginBottom: '8px' }}>Déblocage des fonds directement chez le notaire (jamais au vendeur).</li>
                            </ol>
                        </div>
                        <div style={{ background: 'rgba(255,255,255,0.1)', padding: '24px', borderRadius: '12px' }}>
                            <h4 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '12px', color: '#F6E05E' }}>Conseils de Sécurité</h4>
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                <li style={{ marginBottom: '12px', display: 'flex', gap: '10px' }}>
                                    <span>⚠️</span>
                                    <span>Ne jamais envoyer d'argent via des services de transfert rapide pour un achat immobilier.</span>
                                </li>
                                <li style={{ marginBottom: '12px', display: 'flex', gap: '10px' }}>
                                    <span>🏛️</span>
                                    <span>Exigez toujours de passer par un notaire sénégalais agrée.</span>
                                </li>
                                <li style={{ marginBottom: '12px', display: 'flex', gap: '10px' }}>
                                    <span>🔍</span>
                                    <span>Vérifiez que le titre foncier est bien au nom du vendeur (État de Droits Réels).</span>
                                </li>
                            </ul>
                            <Link href="/agents">
                                <button style={{ marginTop: '20px', width: '100%', padding: '12px', background: 'white', color: '#2D3748', fontWeight: 'bold', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>
                                    Parler à un agent spécialisé Diaspora
                                </button>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* 4. BANQUES PARTENAIRES */}
                <section>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
                        <div style={{ padding: '10px', background: '#EBF8FF', borderRadius: '12px' }}><Building color="#006AFF" size={32} /></div>
                        <h2 style={{ fontSize: '28px', fontWeight: 'bold' }}>Banques au Sénégal</h2>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
                        {[
                            { name: "CBAO Groupe Attijariwafa Bank", type: "Généraliste" },
                            { name: "SGBS (Société Générale)", type: "Généraliste" },
                            { name: "BICIS (Groupe Sunu)", type: "Généraliste" },
                            { name: "Ecobank Sénégal", type: "Panafricaine" },
                            { name: "BOA (Bank Of Africa)", type: "Réseau Africain" },
                            { name: "BHS (Banque de l'Habitat)", type: "Spécialiste Immobilier" },
                            { name: "Orabank", type: "Généraliste" },
                            { name: "Coris Bank", type: "PME / Retail" }
                        ].map((bank, idx) => (
                            <div key={idx} style={{ padding: '24px', border: '1px solid #E2E8F0', borderRadius: '12px', textAlign: 'center', background: '#FFF' }}>
                                <div style={{ width: '60px', height: '60px', background: '#F7FAFC', borderRadius: '50%', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Building size={24} color="#A0AEC0" />
                                </div>
                                <h3 style={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '8px' }}>{bank.name}</h3>
                                <span style={{ fontSize: '12px', color: '#006AFF', background: '#EBF8FF', padding: '4px 10px', borderRadius: '20px' }}>
                                    {bank.type}
                                </span>
                            </div>
                        ))}
                    </div>
                </section>

            </div>
        </div>
    );
}
