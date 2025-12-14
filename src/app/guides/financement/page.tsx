'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Calculator } from 'lucide-react';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function GuideFinancementPage() {
    // Calculator State
    const [propertyType, setPropertyType] = useState('apartment');
    const [price, setPrice] = useState(50000000);
    const [downPayment, setDownPayment] = useState(10000000);
    const [rate, setRate] = useState(7.5);
    const [years, setYears] = useState(15);
    const [monthlyPayment, setMonthlyPayment] = useState(0);
    const [totalInterest, setTotalInterest] = useState(0);
    const [chartData, setChartData] = useState<any>(null);

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

        setChartData({
            labels: ['Principal', 'Intérêts Totaux', 'Frais Annexes (7%)'],
            datasets: [
                {
                    data: [principal, Math.round((payment * numberOfPayments) - principal), Math.round(price * 0.07)],
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
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 24px' }}>
            <div style={{ marginBottom: '30px', fontSize: '14px', color: '#666' }}>
                <Link href="/guides" style={{ color: '#006AFF' }}>← Retour aux guides</Link>
            </div>

            <div style={{ marginBottom: '40px', textAlign: 'center' }}>
                <div style={{ fontSize: '64px', marginBottom: '20px' }}>💰</div>
                <h1 style={{ fontSize: '42px', fontWeight: 'bold', color: '#1B254B', marginBottom: '16px' }}>
                    Guide Financement & Prêts Immobiliers
                </h1>
                <p style={{ fontSize: '18px', color: '#666', lineHeight: '1.6' }}>
                    Tout savoir sur les prêts immobiliers au Sénégal : banques, taux, conditions
                </p>
            </div>

            {/* INTEGRATED CALCULATOR - TOP POSITION */}
            <section style={{ marginBottom: '60px', scrollMarginTop: '100px' }} id="calculator">
                <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: '#1B254B', marginBottom: '20px', borderLeft: '5px solid #05CD99', paddingLeft: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Calculator size={32} /> Simulateur de Crédit Rapide
                </h2>

                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1.2fr) minmax(300px, 0.8fr)', gap: '40px', background: '#FFFFFF', padding: '32px', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: '0 8px 30px rgba(0,0,0,0.08)' }}>
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
                                            border: `1px solid ${propertyType === type.id ? '#05CD99' : '#E2E8F0'}`,
                                            background: propertyType === type.id ? '#E6FFFA' : '#FFF',
                                            color: propertyType === type.id ? '#05CD99' : '#4A5568',
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

                    <div className="calculator-results" style={{ background: '#F0FFF4', padding: '24px', borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '1px solid #C6F6D5' }}>
                        <div style={{ marginBottom: '8px', fontSize: '14px', color: '#2F855A', fontWeight: 600 }}>Mensualité Estimée</div>
                        <div style={{ fontSize: '42px', fontWeight: '800', color: '#276749', marginBottom: '24px' }}>
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

            <div style={{ fontSize: '16px', lineHeight: '1.8', color: '#333' }}>
                {/* Types de prêts */}
                <section style={{ marginBottom: '60px' }}>
                    <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: '#1B254B', marginBottom: '20px', borderLeft: '5px solid #FFB547', paddingLeft: '20px' }}>
                        📋 Types de Prêts Disponibles
                    </h2>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '30px' }}>
                        {[
                            {
                                nom: 'Prêt Classique',
                                description: 'Financement standard pour achat immobilier',
                                taux: '6-8%',
                                duree: '10-25 ans',
                                apport: '10-20%'
                            },
                            {
                                nom: 'Prêt Social (SNHLM)',
                                description: 'Accession à la propriété pour revenus moyens',
                                taux: '4-5%',
                                duree: '15-25 ans',
                                apport: '5-10%'
                            },
                            {
                                nom: 'Prêt Relais',
                                description: 'Acheter avant de vendre l\'ancien bien',
                                taux: '7-9%',
                                duree: '12-24 mois',
                                apport: '20%+'
                            }
                        ].map((pret, i) => (
                            <div key={i} style={{ padding: '25px', background: '#FFF7E6', borderRadius: '12px', border: '2px solid #FFB547' }}>
                                <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', color: '#FFB547' }}>
                                    {pret.nom}
                                </h3>
                                <p style={{ marginBottom: '15px', fontSize: '15px' }}>{pret.description}</p>
                                <div style={{ fontSize: '14px', lineHeight: '2' }}>
                                    <div><strong>Taux :</strong> {pret.taux}</div>
                                    <div><strong>Durée :</strong> {pret.duree}</div>
                                    <div><strong>Apport :</strong> {pret.apport}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Banques */}
                <section style={{ marginBottom: '60px' }}>
                    <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: '#1B254B', marginBottom: '20px', borderLeft: '5px solid #006AFF', paddingLeft: '20px' }}>
                        🏦 Banques Partenaires au Sénégal
                    </h2>

                    <div style={{ background: '#E6F2FF', padding: '30px', borderRadius: '12px', marginBottom: '25px' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ borderBottom: '2px solid #006AFF' }}>
                                    <th style={{ padding: '12px', textAlign: 'left' }}>Banque</th>
                                    <th style={{ padding: '12px', textAlign: 'left' }}>Taux min</th>
                                    <th style={{ padding: '12px', textAlign: 'left' }}>Durée max</th>
                                    <th style={{ padding: '12px', textAlign: 'left' }}>Particularité</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { banque: '🏦 CBAO', taux: '6%', duree: '25 ans', info: 'Meilleur taux' },
                                    { banque: '🏦 SGBS', taux: '6.5%', duree: '20 ans', info: 'Réponse rapide' },
                                    { banque: '🏦 Ecobank', taux: '7%', duree: '20 ans', info: 'Réseau Afrique' },
                                    { banque: '🏦 BHS', taux: '6%', duree: '25 ans', info: 'Habitat social' },
                                    { banque: '🏦 BOA', taux: '7.5%', duree: '20 ans', info: 'Service premium' },
                                    { banque: '🏦 BICIS', taux: '7%', duree: '20 ans', info: 'Conditions souples' }
                                ].map((b, i) => (
                                    <tr key={i} style={{ borderBottom: '1px solid #ddd', background: i % 2 === 0 ? 'white' : '#F9FAFB' }}>
                                        <td style={{ padding: '12px', fontWeight: 'bold' }}>{b.banque}</td>
                                        <td style={{ padding: '12px', color: '#05CD99', fontWeight: 'bold' }}>{b.taux}</td>
                                        <td style={{ padding: '12px' }}>{b.duree}</td>
                                        <td style={{ padding: '12px', fontSize: '14px' }}>{b.info}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* Documents */}
                <section style={{ marginBottom: '60px' }}>
                    <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: '#1B254B', marginBottom: '20px', borderLeft: '5px solid #E63946', paddingLeft: '20px' }}>
                        📄 Documents Requis
                    </h2>

                    <div style={{ background: '#FFEBEB', padding: '30px', borderRadius: '12px' }}>
                        <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px' }}>
                            ✅ Checklist complète
                        </h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' }}>
                            {[
                                'CNI ou Passeport',
                                'Bulletins de paie (3 mois)',
                                'Attestation de travail',
                                'Avis d\'imposition (2 ans)',
                                'Relevés bancaires (6 mois)',
                                'Justificatif de domicile',
                                'Compromis de vente',
                                'Titre foncier du bien',
                                'Devis travaux (si rénovation)',
                                'Plan de financement'
                            ].map((doc, i) => (
                                <div key={i} style={{ padding: '12px', background: 'white', borderRadius: '8px', display: 'flex', alignItems: 'center' }}>
                                    <span style={{ marginRight: '10px', fontSize: '18px' }}>✅</span>
                                    <span style={{ fontSize: '14px' }}>{doc}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Conseils */}
                <section style={{ marginBottom: '60px' }}>
                    <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: '#1B254B', marginBottom: '20px', borderLeft: '5px solid #4318FF', paddingLeft: '20px' }}>
                        🎓 Conseils d'Experts
                    </h2>

                    <div style={{ background: 'linear-gradient(135deg, #4318FF 0%, #6B46C1 100%)', padding: '40px', borderRadius: '16px', color: 'white' }}>
                        <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '25px' }}>
                            💎 5 Astuces pour obtenir le meilleur taux
                        </h3>
                        <ul style={{ marginLeft: '25px', lineHeight: '2.5', fontSize: '16px' }}>
                            <li><strong>Comparez 4-5 banques</strong> minimum et mettez-les en concurrence</li>
                            <li><strong>Apport élevé = meilleur taux</strong> (20%+ recommandé)</li>
                            <li><strong>Domiciliez votre salaire</strong> pour obtenir -0.5% à -1%</li>
                            <li><strong>Négociez l'assurance</strong> emprunteur (économie 30%)</li>
                            <li><strong>Période d'achat</strong> : Fin d'année = meilleures offres</li>
                        </ul>
                    </div>
                </section>
            </div>
        </div>
    );
}
