'use client';

import { useState } from 'react';

export default function AccountingPage() {
    const [activeTab, setActiveTab] = useState<'journal' | 'ledger' | 'balance' | 'reports'>('journal');
    const [showNewEntry, setShowNewEntry] = useState(false);

    // Plan comptable OHADA adapté agences immobilières
    const chartOfAccounts = {
        'Classe 1': {
            name: 'COMPTES DE RESSOURCES DURABLES',
            accounts: [
                { code: '101', name: 'Capital social', type: 'Capitaux propres' },
                { code: '106', name: 'Réserves', type: 'Capitaux propres' },
                { code: '110', name: 'Report à nouveau', type: 'Capitaux propres' },
                { code: '121', name: 'Résultat (bénéfice)', type: 'Résultat' },
                { code: '129', name: 'Résultat (perte)', type: 'Résultat' },
                { code: '161', name: 'Emprunts bancaires', type: 'Dettes financières' },
            ]
        },
        'Classe 2': {
            name: 'COMPTES D\'ACTIF IMMOBILISÉ',
            accounts: [
                { code: '211', name: 'Terrains', type: 'Immobilisations' },
                { code: '231', name: 'Immeubles de rapport', type: 'Immobilisations' },
                { code: '241', name: 'Matériel de bureau', type: 'Mobilier' },
                { code: '244', name: 'Matériel informatique', type: 'Équipements' },
                { code: '245', name: 'Véhicules', type: 'Matériel de transport' },
                { code: '281', name: 'Amortissements des immobilisations', type: 'Amortissements' },
            ]
        },
        'Classe 3': {
            name: 'COMPTES DE STOCKS',
            accounts: [
                { code: '351', name: 'Biens immobiliers en stock (VEFA)', type: 'Stocks' },
                { code: '358', name: 'Programmes en cours', type: 'Stocks' },
            ]
        },
        'Classe 4': {
            name: 'COMPTES DE TIERS',
            accounts: [
                { code: '401', name: 'Fournisseurs', type: 'Dettes' },
                { code: '411', name: 'Clients - Commissions à recevoir', type: 'Créances' },
                { code: '413', name: 'Clients - Mandats de gestion', type: 'Créances' },
                { code: '421', name: 'Personnel - Rémunérations dues', type: 'Dettes sociales' },
                { code: '431', name: 'Sécurité sociale', type: 'Organismes sociaux' },
                { code: '441', name: 'État - Impôts sur les bénéfices', type: 'État' },
                { code: '443', name: 'État - TVA collectée', type: 'TVA' },
                { code: '445', name: 'État - TVA récupérable', type: 'TVA' },
                { code: '455', name: 'Comptes courants associés', type: 'Associés' },
                { code: '467', name: 'Dépôts de garantie reçus', type: 'Dettes diverses' },
                { code: '468', name: 'Dépôts de garantie versés', type: 'Créances diverses' },
            ]
        },
        'Classe 5': {
            name: 'COMPTES DE TRÉSORERIE',
            accounts: [
                { code: '521', name: 'Banque compte principal', type: 'Banques' },
                { code: '522', name: 'Banque compte séquestre', type: 'Banques' },
                { code: '531', name: 'Caisse', type: 'Caisse' },
                { code: '532', name: 'Mobile Money', type: 'Autres' },
            ]
        },
        'Classe 6': {
            name: 'COMPTES DE CHARGES',
            accounts: [
                { code: '601', name: 'Achats de matériel bureau', type: 'Achats' },
                { code: '605', name: 'Achats publicité et marketing', type: 'Achats' },
                { code: '611', name: 'Sous-traitance visites virtuelles', type: 'Services extérieurs' },
                { code: '613', name: 'Locations (bureaux)', type: 'Services extérieurs' },
                { code: '621', name: 'Honoraires notaires', type: 'Services extérieurs' },
                { code: '622', name: 'Honoraires experts (diagnostics)', type: 'Services extérieurs' },
                { code: '625', name: 'Frais de déplacements agents', type: 'Services extérieurs' },
                { code: '627', name: 'Publicité (panneaux, sites)', type: 'Marketing' },
                { code: '631', name: 'Frais bancaires', type: 'Charges financières' },
                { code: '641', name: 'Impôts et taxes', type: 'Impôts' },
                { code: '661', name: 'Salaires bruts', type: 'Charges de personnel' },
                { code: '663', name: 'Indemnités agents', type: 'Charges de personnel' },
                { code: '664', name: 'Charges sociales (CSS, IPRES)', type: 'Charges sociales' },
                { code: '681', name: 'Dotations aux amortissements', type: 'Dotations' },
            ]
        },
        'Classe 7': {
            name: 'COMPTES DE PRODUITS',
            accounts: [
                { code: '701', name: 'Commissions ventes immobilières', type: 'Chiffre d\'affaires' },
                { code: '702', name: 'Commissions locations', type: 'Chiffre d\'affaires' },
                { code: '703', name: 'Honoraires gestion locative', type: 'Chiffre d\'affaires' },
                { code: '704', name: 'Honoraires mandats exclusifs', type: 'Chiffre d\'affaires' },
                { code: '705', name: 'Services expertise/estimation', type: 'Services' },
                { code: '706', name: 'Commissions courtage prêts', type: 'Activités connexes' },
                { code: '708', name: 'Produits accessoires (photos, visites)', type: 'Autres produits' },
                { code: '771', name: 'Produits financiers (intérêts)', type: 'Produits financiers' },
            ]
        },
        'Classe 8': {
            name: 'COMPTES HORS BILAN',
            accounts: [
                { code: '801', name: 'Engagements donnés (cautions)', type: 'Engagements' },
                { code: '809', name: 'Biens sous mandat de vente', type: 'Mandats' },
            ]
        }
    };

    // Écritures comptables exemple
    const [journalEntries] = useState([
        {
            id: 1,
            date: '2025-12-01',
            libelle: 'Commission vente Villa Almadies',
            debit: '411',
            debitLib: 'Clients',
            credit: '701',
            creditLib: 'Commissions ventes',
            montant: '4500000',
            piece: 'FAC-001',
            periode: 'Décembre 2025'
        },
        {
            id: 2,
            date: '2025-12-03',
            libelle: 'Paiement loyer bureaux Plateau',
            debit: '613',
            debitLib: 'Locations',
            credit: '521',
            creditLib: 'Banque',
            montant: '500000',
            piece: 'CHQ-4521',
            periode: 'Décembre 2025'
        },
        {
            id: 3,
            date: '2025-12-05',
            libelle: 'Salaire agent commercial - Novembre',
            debit: '661',
            debitLib: 'Salaires',
            credit: '421',
            creditLib: 'Personnel',
            montant: '350000',
            piece: 'PAY-NOV',
            periode: 'Décembre 2025'
        },
        {
            id: 4,
            date: '2025-12-08',
            libelle: 'Campagne Facebook Ads',
            debit: '627',
            debitLib: 'Publicité',
            credit: '521',
            creditLib: 'Banque',
            montant: '75000',
            piece: 'FB-INV-12',
            periode: 'Décembre 2025'
        },
    ]);

    const [newEntry, setNewEntry] = useState({
        date: new Date().toISOString().split('T')[0],
        libelle: '',
        debit: '',
        credit: '',
        montant: '',
        piece: '',
    });

    const handleAddEntry = () => {
        alert(`Écriture ajoutée :\n${newEntry.libelle}\nDébit: ${newEntry.debit} | Crédit: ${newEntry.credit}\nMontant: ${newEntry.montant} FCFA`);
        setShowNewEntry(false);
    };

    // Calcul balance
    const calculateBalance = () => {
        const balance: any = {};

        journalEntries.forEach(entry => {
            if (!balance[entry.debit]) {
                balance[entry.debit] = { debit: 0, credit: 0, libelle: entry.debitLib };
            }
            if (!balance[entry.credit]) {
                balance[entry.credit] = { debit: 0, credit: 0, libelle: entry.creditLib };
            }

            balance[entry.debit].debit += parseInt(entry.montant);
            balance[entry.credit].credit += parseInt(entry.montant);
        });

        return balance;
    };

    return (
        <div className="container" style={{ padding: '40px 24px', maxWidth: '1600px', margin: '0 auto' }}>
            {/* Header */}
            <div style={{ marginBottom: '32px' }}>
                <h1 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '12px', color: '#1B254B' }}>
                    📊 Comptabilité OHADA - Agence Immobilière
                </h1>
                <p style={{ fontSize: '18px', color: '#666' }}>
                    Système comptable complet conforme au Plan SYSCOHADA Révisé
                </p>
            </div>

            {/* Stats Quick */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '32px' }}>
                <div style={{ background: 'linear-gradient(135deg, #FF6B35 0%, #E63946 100%)', padding: '24px', borderRadius: '16px', color: 'white' }}>
                    <div style={{ fontSize: '14px', opacity: 0.9, marginBottom: '8px' }}>Chiffre d'Affaires</div>
                    <div style={{ fontSize: '32px', fontWeight: 'bold' }}>12.5M FCFA</div>
                    <div style={{ fontSize: '12px', opacity: 0.8, marginTop: '4px' }}>+18% vs mois dernier</div>
                </div>
                <div style={{ background: 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                    <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>Charges du Mois</div>
                    <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#E31A1A' }}>3.2M FCFA</div>
                    <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>Personnel + Fonctionnement</div>
                </div>
                <div style={{ background: 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                    <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>Résultat Net</div>
                    <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#05CD99' }}>9.3M FCFA</div>
                    <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>Marge : 74%</div>
                </div>
                <div style={{ background: 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                    <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>Trésorerie</div>
                    <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#006AFF' }}>18.7M FCFA</div>
                    <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>Banque + Caisse</div>
                </div>
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '32px', borderBottom: '2px solid #eee', flexWrap: 'wrap' }}>
                {['journal', 'ledger', 'balance', 'reports'].map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab as any)}
                        style={{
                            padding: '12px 24px',
                            border: 'none',
                            background: 'none',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            color: activeTab === tab ? '#FF6B35' : '#666',
                            borderBottom: activeTab === tab ? '3px solid #FF6B35' : 'none',
                            marginBottom: '-2px'
                        }}
                    >
                        {tab === 'journal' && '📖 Journal'}
                        {tab === 'ledger' && '📚 Grand Livre'}
                        {tab === 'balance' && '⚖️ Balance'}
                        {tab === 'reports' && '📊 États Financiers'}
                    </button>
                ))}
            </div>

            {/* Journal */}
            {activeTab === 'journal' && (
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', alignItems: 'center' }}>
                        <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1B254B' }}>Journal Général</h2>
                        <button
                            onClick={() => setShowNewEntry(!showNewEntry)}
                            style={{ padding: '12px 24px', background: '#FF6B35', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
                        >
                            {showNewEntry ? '✕ Annuler' : '+ Nouvelle Écriture'}
                        </button>
                    </div>

                    {showNewEntry && (
                        <div style={{ background: 'white', padding: '24px', borderRadius: '16px', marginBottom: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
                            <h3 style={{ marginBottom: '16px', color: '#1B254B' }}>Nouvelle Écriture Comptable</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Date</label>
                                    <input type="date" value={newEntry.date} onChange={(e) => setNewEntry({ ...newEntry, date: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }} />
                                </div>
                                <div style={{ gridColumn: 'span 2' }}>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Libellé</label>
                                    <input type="text" value={newEntry.libelle} onChange={(e) => setNewEntry({ ...newEntry, libelle: e.target.value })} placeholder="Description de l'opération" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Compte Débit</label>
                                    <select value={newEntry.debit} onChange={(e) => setNewEntry({ ...newEntry, debit: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}>
                                        <option value="">Sélectionner...</option>
                                        {Object.entries(chartOfAccounts).map(([classe, data]) => (
                                            <optgroup key={classe} label={data.name}>
                                                {data.accounts.map(acc => (
                                                    <option key={acc.code} value={acc.code}>{acc.code} - {acc.name}</option>
                                                ))}
                                            </optgroup>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Compte Crédit</label>
                                    <select value={newEntry.credit} onChange={(e) => setNewEntry({ ...newEntry, credit: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}>
                                        <option value="">Sélectionner...</option>
                                        {Object.entries(chartOfAccounts).map(([classe, data]) => (
                                            <optgroup key={classe} label={data.name}>
                                                {data.accounts.map(acc => (
                                                    <option key={acc.code} value={acc.code}>{acc.code} - {acc.name}</option>
                                                ))}
                                            </optgroup>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Montant (FCFA)</label>
                                    <input type="number" value={newEntry.montant} onChange={(e) => setNewEntry({ ...newEntry, montant: e.target.value })} placeholder="0" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>N° Pièce</label>
                                    <input type="text" value={newEntry.piece} onChange={(e) => setNewEntry({ ...newEntry, piece: e.target.value })} placeholder="FAC-001" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }} />
                                </div>
                            </div>
                            <button onClick={handleAddEntry} style={{ marginTop: '16px', padding: '12px 32px', background: '#05CD99', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
                                ✓ Enregistrer l'écriture
                            </button>
                        </div>
                    )}

                    <div style={{ background: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ background: '#F9FAFB', borderBottom: '2px solid #E5E7EB' }}>
                                    <th style={{ padding: '16px', textAlign: 'left', fontWeight: 'bold' }}>Date</th>
                                    <th style={{ padding: '16px', textAlign: 'left', fontWeight: 'bold' }}>Libellé</th>
                                    <th style={{ padding: '16px', textAlign: 'left', fontWeight: 'bold' }}>Débit</th>
                                    <th style={{ padding: '16px', textAlign: 'left', fontWeight: 'bold' }}>Crédit</th>
                                    <th style={{ padding: '16px', textAlign: 'right', fontWeight: 'bold' }}>Montant</th>
                                    <th style={{ padding: '16px', textAlign: 'center', fontWeight: 'bold' }}>Pièce</th>
                                </tr>
                            </thead>
                            <tbody>
                                {journalEntries.map(entry => (
                                    <tr key={entry.id} style={{ borderBottom: '1px solid #f5f5f5' }}>
                                        <td style={{ padding: '16px', color: '#666' }}>{new Date(entry.date).toLocaleDateString('fr-FR')}</td>
                                        <td style={{ padding: '16px', fontWeight: '500' }}>{entry.libelle}</td>
                                        <td style={{ padding: '16px' }}>
                                            <div style={{ fontSize: '12px', color: '#666' }}>{entry.debit}</div>
                                            <div style={{ fontSize: '14px', fontWeight: '500' }}>{entry.debitLib}</div>
                                        </td>
                                        <td style={{ padding: '16px' }}>
                                            <div style={{ fontSize: '12px', color: '#666' }}>{entry.credit}</div>
                                            <div style={{ fontSize: '14px', fontWeight: '500' }}>{entry.creditLib}</div>
                                        </td>
                                        <td style={{ padding: '16px', textAlign: 'right', fontFamily: 'monospace', fontWeight: 'bold', color: '#1B254B' }}>
                                            {parseInt(entry.montant).toLocaleString()} FCFA
                                        </td>
                                        <td style={{ padding: '16px', textAlign: 'center', fontFamily: 'monospace', fontSize: '12px', color: '#666' }}>{entry.piece}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Balance */}
            {activeTab === 'balance' && (
                <div style={{ background: 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                    <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px', color: '#1B254B' }}>
                        Balance Générale - Décembre 2025
                    </h2>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ background: '#F9FAFB', borderBottom: '2px solid #E5E7EB' }}>
                                <th style={{ padding: '12px', textAlign: 'left' }}>N° Compte</th>
                                <th style={{ padding: '12px', textAlign: 'left' }}>Intitulé</th>
                                <th style={{ padding: '12px', textAlign: 'right' }}>Débit</th>
                                <th style={{ padding: '12px', textAlign: 'right' }}>Crédit</th>
                                <th style={{ padding: '12px', textAlign: 'right' }}>Solde</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.entries(calculateBalance()).map(([compte, data]: any) => {
                                const solde = data.debit - data.credit;
                                return (
                                    <tr key={compte} style={{ borderBottom: '1px solid #f5f5f5' }}>
                                        <td style={{ padding: '12px', fontFamily: 'monospace', fontWeight: 'bold' }}>{compte}</td>
                                        <td style={{ padding: '12px' }}>{data.libelle}</td>
                                        <td style={{ padding: '12px', textAlign: 'right', fontFamily: 'monospace' }}>
                                            {data.debit > 0 ? data.debit.toLocaleString() : '-'}
                                        </td>
                                        <td style={{ padding: '12px', textAlign: 'right', fontFamily: 'monospace' }}>
                                            {data.credit > 0 ? data.credit.toLocaleString() : '-'}
                                        </td>
                                        <td style={{ padding: '12px', textAlign: 'right', fontFamily: 'monospace', fontWeight: 'bold', color: solde >= 0 ? '#05CD99' : '#E31A1A' }}>
                                            {Math.abs(solde).toLocaleString()} {solde >= 0 ? 'D' : 'C'}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Reports */}
            {activeTab === 'reports' && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
                    <div style={{ background: 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                        <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px', color: '#1B254B' }}>📄 Bilan OHADA</h3>
                        <p style={{ color: '#666', marginBottom: '16px' }}>Balance Sheet conforme SYSCOHADA</p>
                        <button style={{ width: '100%', padding: '12px', background: '#FF6B35', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
                            Générer le Bilan
                        </button>
                    </div>

                    <div style={{ background: 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                        <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px', color: '#1B254B' }}>💰 Compte de Résultat</h3>
                        <p style={{ color: '#666', marginBottom: '16px' }}>Produits et Charges de l'exercice</p>
                        <button style={{ width: '100%', padding: '12px', background: '#006AFF', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
                            Générer le Compte de Résultat
                        </button>
                    </div>

                    <div style={{ background: 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                        <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px', color: '#1B254B' }}>📊 TAFIRE</h3>
                        <p style={{ color: '#666', marginBottom: '16px' }}>Tableau Financier des Ressources et Emplois</p>
                        <button style={{ width: '100%', padding: '12px', background: '#05CD99', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
                            Générer le TAFIRE
                        </button>
                    </div>

                    <div style={{ background: 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                        <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px', color: '#1B254B' }}>📋 DSF (Liasse Fiscale)</h3>
                        <p style={{ color: '#666', marginBottom: '16px' }}>Déclaration Statistique et Fiscale</p>
                        <button style={{ width: '100%', padding: '12px', background: '#FFB547', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
                            Générer la DSF
                        </button>
                    </div>
                </div>
            )}

            {/* Help */}
            <div style={{ marginTop: '40px', padding: '24px', background: '#E6F2FF', borderRadius: '12px' }}>
                <h4 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px', color: '#1B254B' }}>
                    ℹ️ Conformité OHADA
                </h4>
                <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6' }}>
                    Ce système comptable est conforme au <strong>SYSCOHADA Révisé</strong> (Acte Uniforme relatif au Droit Comptable).
                    Tous les comptes suivent le plan comptable officiel des pays de l'OHADA. Conservez vos pièces justificatives 10 ans minimum.
                </p>
            </div>
        </div>
    );
}
