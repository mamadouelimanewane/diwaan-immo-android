export default function RatesPage() {
    return (
        <div className="container" style={{ padding: '60px 24px', maxWidth: '1000px' }}>
            <h1 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '16px' }}>Taux Immobiliers Actuels</h1>
            <p style={{ marginBottom: '40px', color: '#666' }}>Moyennes nationales mises à jour le 06/12/2025.</p>

            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', marginBottom: '40px' }}>
                <thead>
                    <tr style={{ background: '#f8f9fa', borderBottom: '2px solid #ddd' }}>
                        <th style={{ padding: '16px' }}>Type de Prêt</th>
                        <th style={{ padding: '16px' }}>Taux d'intérêt</th>
                        <th style={{ padding: '16px' }}>Taux Annuel Effectif Global (TAEG)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style={{ borderBottom: '1px solid #eee' }}>
                        <td style={{ padding: '16px', fontWeight: 'bold' }}>Fixe 15 ans</td>
                        <td style={{ padding: '16px', color: '#006AFF', fontWeight: 'bold' }}>5.85%</td>
                        <td style={{ padding: '16px' }}>6.12%</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #eee' }}>
                        <td style={{ padding: '16px', fontWeight: 'bold' }}>Fixe 20 ans</td>
                        <td style={{ padding: '16px', color: '#006AFF', fontWeight: 'bold' }}>6.50%</td>
                        <td style={{ padding: '16px' }}>6.78%</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #eee' }}>
                        <td style={{ padding: '16px', fontWeight: 'bold' }}>Fixe 25 ans</td>
                        <td style={{ padding: '16px', color: '#006AFF', fontWeight: 'bold' }}>6.95%</td>
                        <td style={{ padding: '16px' }}>7.25%</td>
                    </tr>
                </tbody>
            </table>

            <div style={{ background: '#fff3cd', border: '1px solid #ffeeba', padding: '24px', borderRadius: '8px' }}>
                <h3 style={{ fontWeight: 'bold', color: '#856404', marginBottom: '8px' }}>💡 Conseil d'expert</h3>
                <p style={{ color: '#856404' }}>
                    Les taux peuvent varier selon votre profil (revenus, apport, durée).
                    Une pré-qualification vous permet de bloquer un taux pendant 30 jours.
                </p>
            </div>
        </div>
    );
}
