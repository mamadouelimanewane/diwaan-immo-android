export default function ProResourcesPage() {
    return (
        <div className="container" style={{ padding: '60px 24px' }}>
            <h1 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '24px' }}>Centre de Ressources pour Agents</h1>
            <p style={{ fontSize: '18px', color: '#666', marginBottom: '40px' }}>
                Outils, guides et modèles pour propulser votre carrière immobilière au Sénégal.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
                <div style={{ border: '1px solid #ddd', borderRadius: '12px', overflow: 'hidden' }}>
                    <div style={{ height: '150px', background: '#006AFF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '40px' }}>📊</div>
                    <div style={{ padding: '24px' }}>
                        <h3 style={{ fontWeight: 'bold', marginBottom: '12px' }}>Business Plan Immobilier</h3>
                        <p style={{ color: '#666', marginBottom: '20px' }}>Un modèle complet pour structurer vos objectifs et stratégies de croissance.</p>
                        <a href="/pros/resources/business-plan" className="btn btn-outline" style={{ display: 'block', textAlign: 'center' }}>Télécharger le modèle</a>
                    </div>
                </div>

                <div style={{ border: '1px solid #ddd', borderRadius: '12px', overflow: 'hidden' }}>
                    <div style={{ height: '150px', background: '#00D06C', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '40px' }}>💬</div>
                    <div style={{ padding: '24px' }}>
                        <h3 style={{ fontWeight: 'bold', marginBottom: '12px' }}>Scripts de Vente</h3>
                        <p style={{ color: '#666', marginBottom: '20px' }}>Ce qu'il faut dire pour convaincre les propriétaires et acheteurs hésitants.</p>
                        <a href="#" className="btn btn-outline" style={{ display: 'block', textAlign: 'center' }}>Voir les scripts</a>
                    </div>
                </div>

                <div style={{ border: '1px solid #ddd', borderRadius: '12px', overflow: 'hidden' }}>
                    <div style={{ height: '150px', background: '#F59E0B', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '40px' }}>📄</div>
                    <div style={{ padding: '24px' }}>
                        <h3 style={{ fontWeight: 'bold', marginBottom: '12px' }}>Modèles de Flyers</h3>
                        <p style={{ color: '#666', marginBottom: '20px' }}>Designs professionnels prêts à imprimer pour vos journées portes ouvertes.</p>
                        <a href="#" className="btn btn-outline" style={{ display: 'block', textAlign: 'center' }}>Accéder aux templates</a>
                    </div>
                </div>
            </div>
        </div>
    );
}
