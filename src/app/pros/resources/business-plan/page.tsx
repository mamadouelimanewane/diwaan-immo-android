export default function ProBusinessPlanPage() {
    return (
        <div className="container" style={{ padding: '60px 24px', maxWidth: '800px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '24px' }}>Business Plan pour Agent Immobilier</h1>

            <div style={{ background: '#f8f9fa', padding: '40px', borderRadius: '12px', border: '1px solid #ddd', textAlign: 'center' }}>
                <div style={{ fontSize: '60px', marginBottom: '24px' }}>📈</div>
                <h2 style={{ marginBottom: '16px' }}>Téléchargez votre modèle gratuit</h2>
                <p style={{ color: '#666', marginBottom: '32px' }}>
                    Ce document PDF modifiable vous guidera étape par étape pour définir votre marché cible, vos objectifs financiers et votre stratégie marketing pour 2025.
                </p>
                <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
                    <button className="btn btn-primary">Télécharger (PDF)</button>
                    <button className="btn btn-outline">Télécharger (Word)</button>
                </div>
            </div>

            <div style={{ marginTop: '60px' }}>
                <h3 style={{ marginBottom: '20px', fontWeight: 'bold' }}>Ce que contient ce guide :</h3>
                <ul style={{ lineHeight: 2, paddingLeft: '20px', color: '#444' }}>
                    <li>Analyse SWOT du marché immobilier sénégalais.</li>
                    <li>Modèle de budget prévisionnel (Revenus vs Dépenses).</li>
                    <li>Calendrier marketing hebdomadaire.</li>
                    <li>Scripts de prospection téléphonique.</li>
                </ul>
            </div>
        </div>
    );
}
