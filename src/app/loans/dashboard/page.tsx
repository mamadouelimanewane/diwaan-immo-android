'use client';

import Link from 'next/link';

export default function LoanDashboardPage() {
    return (
        <div className="container" style={{ padding: '60px 24px', maxWidth: '1000px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '40px' }}>Mon Tableau de Bord Prêts</h1>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '40px' }}>
                <div>
                    <div style={{ background: 'white', border: '1px solid #e0e0e0', borderRadius: '12px', padding: '32px', marginBottom: '32px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                            <h2 style={{ fontSize: '20px', fontWeight: 'bold' }}>Demande en cours</h2>
                            <span style={{ padding: '4px 12px', background: '#f0f0f0', borderRadius: '16px', fontSize: '12px', fontWeight: 'bold', color: '#666' }}>NON COMMENCÉE</span>
                        </div>

                        <div style={{ display: 'flex', gap: '16px', marginBottom: '32px' }}>
                            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#006AFF', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>1</div>
                            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#eee', color: '#999', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>2</div>
                            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#eee', color: '#999', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>3</div>
                            <div style={{ flex: 1, height: '4px', background: '#f0f0f0', alignSelf: 'center', borderRadius: '2px' }}></div>
                        </div>

                        <p style={{ marginBottom: '24px', color: '#666' }}>Vous n'avez pas encore de demande active. Commencez dès maintenant pour obtenir votre pré-accord en moins de 24h.</p>

                        <Link href="/loans/pre-qualify" className="btn btn-primary">Commencer ma demande</Link>
                    </div>

                    <div style={{ background: 'white', border: '1px solid #e0e0e0', borderRadius: '12px', padding: '32px' }}>
                        <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>Documents requis</h2>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            <li style={{ padding: '12px 0', borderBottom: '1px solid #f0f0f0', display: 'flex', gap: '12px', alignItems: 'center', color: '#666' }}>
                                <span style={{ width: '20px', height: '20px', border: '2px solid #ddd', borderRadius: '50%' }}></span>
                                Pièce d'identité (CNI ou Passeport)
                            </li>
                            <li style={{ padding: '12px 0', borderBottom: '1px solid #f0f0f0', display: 'flex', gap: '12px', alignItems: 'center', color: '#666' }}>
                                <span style={{ width: '20px', height: '20px', border: '2px solid #ddd', borderRadius: '50%' }}></span>
                                3 derniers bulletins de salaire
                            </li>
                            <li style={{ padding: '12px 0', borderBottom: '1px solid #f0f0f0', display: 'flex', gap: '12px', alignItems: 'center', color: '#666' }}>
                                <span style={{ width: '20px', height: '20px', border: '2px solid #ddd', borderRadius: '50%' }}></span>
                                Relevés bancaires (3 mois)
                            </li>
                        </ul>
                    </div>
                </div>

                <div>
                    <div style={{ background: '#002B49', color: 'white', padding: '32px', borderRadius: '12px', marginBottom: '24px' }}>
                        <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px' }}>Pourquoi Diwaan Home Loans ?</h3>
                        <ul style={{ fontSize: '14px', lineHeight: 1.6, paddingLeft: '20px' }}>
                            <li style={{ marginBottom: '8px' }}>Taux compétitifs négociés pour vous</li>
                            <li style={{ marginBottom: '8px' }}>Processus 100% en ligne</li>
                            <li style={{ marginBottom: '8px' }}>Support client 7j/7</li>
                        </ul>
                    </div>
                    <div style={{ background: 'white', border: '1px solid #e0e0e0', padding: '32px', borderRadius: '12px' }}>
                        <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px' }}>Besoin d'aide ?</h3>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                            <div style={{ width: '40px', height: '40px', background: '#eee', borderRadius: '50%' }}></div>
                            <div>
                                <div style={{ fontWeight: 'bold', fontSize: '14px' }}>Awa Ndiaye</div>
                                <div style={{ fontSize: '12px', color: '#666' }}>Conseillère Prêts</div>
                            </div>
                        </div>
                        <button className="btn btn-outline" style={{ width: '100%', fontSize: '14px' }}>Contacter Awa</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
