'use client';

import { useState } from 'react';

export default function FinancePage() {
    const [transactions] = useState([
        { id: 'TRX-8821', type: 'Commission', amount: 450000, date: '08 Déc 2025', status: 'Complété', description: 'Vente Villa Almadies' },
        { id: 'TRX-8822', type: 'Abonnement', amount: 25000, date: '08 Déc 2025', status: 'Complété', description: 'Pack Premium - Agence Teranga' },
        { id: 'TRX-8823', type: 'Remboursement', amount: -50000, date: '07 Déc 2025', status: 'En attente', description: 'Annulation réservation' },
        { id: 'TRX-8824', type: 'Commission', amount: 120000, date: '06 Déc 2025', status: 'Complété', description: 'Location F4 Plateau' },
    ]);

    const handleExportCSV = () => {
        const csv = [
            ['ID', 'Description', 'Type', 'Date', 'Montant', 'Statut'],
            ...transactions.map(t => [t.id, t.description, t.type, t.date, t.amount, t.status])
        ].map(row => row.join(',')).join('\n');

        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `transactions_${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
    };

    const totalRevenue = transactions.reduce((sum, t) => sum + (t.amount > 0 ? t.amount : 0), 0);
    const totalExpenses = Math.abs(transactions.reduce((sum, t) => sum + (t.amount < 0 ? t.amount : 0), 0));
    const pending = transactions.filter(t => t.status === 'En attente').reduce((sum, t) => sum + t.amount, 0);

    return (
        <div>
            <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1B254B', marginBottom: '24px' }}>Finance & Revenus</h1>

            {/* Financial Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '32px' }}>
                <div style={{ background: 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
                    <p style={{ color: '#A3AED0', fontSize: '14px', marginBottom: '8px' }}>Revenus Totaux</p>
                    <h3 style={{ fontSize: '32px', fontWeight: 'bold', color: '#1B254B' }}>{totalRevenue.toLocaleString()} CFA</h3>
                    <p style={{ color: '#05CD99', fontSize: '12px', marginTop: '4px' }}>+12% par rapport au mois dernier</p>
                </div>
                <div style={{ background: 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
                    <p style={{ color: '#A3AED0', fontSize: '14px', marginBottom: '8px' }}>Montant en attente</p>
                    <h3 style={{ fontSize: '32px', fontWeight: 'bold', color: '#1B254B' }}>{Math.abs(pending).toLocaleString()} CFA</h3>
                    <p style={{ color: '#FFB547', fontSize: '12px', marginTop: '4px' }}>{transactions.filter(t => t.status === 'En attente').length} transactions</p>
                </div>
                <div style={{ background: 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
                    <p style={{ color: '#A3AED0', fontSize: '14px', marginBottom: '8px' }}>Dépenses Totales</p>
                    <h3 style={{ fontSize: '32px', fontWeight: 'bold', color: '#1B254B' }}>{totalExpenses.toLocaleString()} CFA</h3>
                    <p style={{ color: '#E31A1A', fontSize: '12px', marginTop: '4px' }}>Serveurs, Marketing, API</p>
                </div>
            </div>

            {/* Transactions List */}
            <div style={{ background: 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
                    <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1B254B' }}>Historique des Transactions</h3>
                    <button
                        onClick={handleExportCSV}
                        style={{ background: 'transparent', border: '1px solid #ddd', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                        📥 Exporter CSV
                    </button>
                </div>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ textAlign: 'left', color: '#A3AED0', borderBottom: '1px solid #eee' }}>
                            <th style={{ padding: '16px' }}>ID</th>
                            <th style={{ padding: '16px' }}>Description</th>
                            <th style={{ padding: '16px' }}>Type</th>
                            <th style={{ padding: '16px' }}>Date</th>
                            <th style={{ padding: '16px' }}>Montant</th>
                            <th style={{ padding: '16px' }}>Statut</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((trx) => (
                            <tr key={trx.id} style={{ borderBottom: '1px solid #f9f9f9', fontSize: '14px' }}>
                                <td style={{ padding: '16px', fontFamily: 'monospace', color: '#666' }}>{trx.id}</td>
                                <td style={{ padding: '16px', fontWeight: 'bold', color: '#1B254B' }}>{trx.description}</td>
                                <td style={{ padding: '16px' }}>{trx.type}</td>
                                <td style={{ padding: '16px', color: '#666' }}>{trx.date}</td>
                                <td style={{ padding: '16px', fontWeight: 'bold', color: trx.amount > 0 ? '#05CD99' : '#E31A1A' }}>
                                    {trx.amount > 0 ? '+' : ''}{trx.amount.toLocaleString()} CFA
                                </td>
                                <td style={{ padding: '16px' }}>
                                    <span style={{
                                        padding: '4px 10px',
                                        borderRadius: '6px',
                                        fontWeight: 'bold',
                                        fontSize: '12px',
                                        background: trx.status === 'Complété' ? '#E6F8F1' : '#FFF7E6',
                                        color: trx.status === 'Complété' ? '#05CD99' : '#FFB547'
                                    }}>
                                        {trx.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
