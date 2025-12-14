'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function BuyAbilityPage() {
    const [income, setIncome] = useState('');
    const [debts, setDebts] = useState('');
    const [downPayment, setDownPayment] = useState('');
    const [interestRate, setInterestRate] = useState(6.5);
    const [duration, setDuration] = useState(20);
    const [result, setResult] = useState<number | null>(null);

    const calculate = (e: React.FormEvent) => {
        e.preventDefault();
        const monthlyIncome = parseFloat(income) || 0;
        const monthlyDebts = parseFloat(debts) || 0;
        const deposit = parseFloat(downPayment) || 0;

        // Debt-to-income ratio (usually 33% in Senegal)
        const maxDebtRatio = 0.33;
        const maxMonthlyPayment = (monthlyIncome * maxDebtRatio) - monthlyDebts;

        if (maxMonthlyPayment <= 0) {
            setResult(0);
            return;
        }

        // PV formula: PMT * (1 - (1 + r)^-n) / r
        const monthlyRate = interestRate / 100 / 12;
        const numberOfPayments = duration * 12;

        const principal = maxMonthlyPayment * (1 - Math.pow(1 + monthlyRate, -numberOfPayments)) / monthlyRate;

        // Total budget = Principal (Loan) + Down Payment
        setResult(principal + deposit);
    };

    return (
        <div className="container" style={{ padding: '60px 24px', maxWidth: '1000px' }}>
            <h1 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '24px' }}>Combien puis-je emprunter ?</h1>
            <p style={{ fontSize: '18px', color: '#666', marginBottom: '40px' }}>
                Utilisez notre simulateur de capacité d'achat pour estimer votre budget immobilier en fonction de vos revenus et dettes.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'start' }}>
                <form onSubmit={calculate} style={{ padding: '30px', background: 'white', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', border: '1px solid #eee' }}>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Revenus Mensuels Nets (FCFA)</label>
                        <input
                            type="number"
                            value={income}
                            onChange={e => setIncome(e.target.value)}
                            placeholder="ex: 800000"
                            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ccc', fontSize: '16px' }}
                            required
                        />
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Mensualités de crédits en cours</label>
                        <input
                            type="number"
                            value={debts}
                            onChange={e => setDebts(e.target.value)}
                            placeholder="ex: 100000"
                            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ccc', fontSize: '16px' }}
                        />
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Apport Personnel</label>
                        <input
                            type="number"
                            value={downPayment}
                            onChange={e => setDownPayment(e.target.value)}
                            placeholder="ex: 5000000"
                            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ccc', fontSize: '16px' }}
                        />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#666' }}>Taux d'intérêt (%)</label>
                            <input
                                type="number"
                                value={interestRate}
                                step="0.1"
                                onChange={e => setInterestRate(parseFloat(e.target.value))}
                                style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#666' }}>Durée (années)</label>
                            <input
                                type="number"
                                value={duration}
                                onChange={e => setDuration(parseInt(e.target.value))}
                                style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }}
                            />
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '16px', fontSize: '16px', fontWeight: 'bold' }}>Calculer ma capacité</button>
                </form>

                <div style={{ background: '#f8f9fa', padding: '40px', borderRadius: '12px', textAlign: 'center', border: '1px solid #ddd' }}>
                    {result !== null ? (
                        <>
                            <div style={{ fontSize: '16px', color: '#666', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>Votre Budget Immobilier Estimé</div>
                            <div style={{ fontSize: '48px', fontWeight: 'bold', color: '#006AFF', marginBottom: '24px' }}>
                                {Math.round(result).toLocaleString('fr-FR')} FCFA
                            </div>

                            <div style={{ textAlign: 'left', background: 'white', padding: '20px', borderRadius: '8px', marginBottom: '24px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                    <span>Capacité d'emprunt :</span>
                                    <span style={{ fontWeight: 'bold' }}>{Math.round(result - (parseFloat(downPayment) || 0)).toLocaleString('fr-FR')} FCFA</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span>Apport inclus :</span>
                                    <span style={{ fontWeight: 'bold' }}>{(parseFloat(downPayment) || 0).toLocaleString('fr-FR')} FCFA</span>
                                </div>
                            </div>

                            <p style={{ fontSize: '14px', color: '#666', lineHeight: 1.6, marginBottom: '24px' }}>
                                Cette estimation est basée sur un taux d'endettement maximal de 33%, standard pour les banques au Sénégal.
                            </p>

                            <Link href="/search" className="btn btn-outline" style={{ display: 'inline-block', width: '100%' }}>Voir les biens à ce prix</Link>
                        </>
                    ) : (
                        <div style={{ padding: '40px 0' }}>
                            <div style={{ fontSize: '48px', marginBottom: '16px', color: '#ccc' }}>🏠</div>
                            <p style={{ fontSize: '18px', color: '#666' }}>Remplissez le formulaire pour découvrir votre pouvoir d'achat immobilier.</p>
                        </div>
                    )}
                </div>
            </div>

            <div style={{ marginTop: '60px', padding: '24px', background: '#e6f0ff', borderRadius: '12px', display: 'flex', gap: '20px', alignItems: 'center' }}>
                <div style={{ fontSize: '32px' }}>💡</div>
                <div>
                    <h3 style={{ fontWeight: 'bold', marginBottom: '4px', color: '#006AFF' }}>Bon à savoir</h3>
                    <p style={{ fontSize: '14px', color: '#333' }}>
                        Pour augmenter votre capacité d'emprunt, vous pouvez allonger la durée du prêt ou augmenter votre apport personnel.
                        Un courtier Diwaan peut vous aider à optimiser votre dossier.
                    </p>
                </div>
            </div>
        </div>
    );
}
