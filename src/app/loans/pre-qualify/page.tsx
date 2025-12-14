export default function PreQualifyPage() {
    return (
        <div className="container" style={{ padding: '60px 24px', maxWidth: '600px', textAlign: 'center' }}>
            <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '24px' }}>Obtenez votre Pré-qualification</h1>
            <p style={{ fontSize: '18px', color: '#666', marginBottom: '40px' }}>
                Montrez aux vendeurs que vous êtes un acheteur sérieux. C'est rapide, gratuit et sans engagement.
            </p>

            <div style={{ padding: '40px', border: '1px solid #ddd', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                <div style={{ fontSize: '48px', marginBottom: '24px' }}>📝</div>
                <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>Prêt à commencer ?</h2>
                <p style={{ marginBottom: '32px', color: '#555' }}>
                    Nous allons vous poser quelques questions sur vos revenus et votre situation professionnelle.
                </p>
                <button className="btn btn-primary" style={{ width: '100%', padding: '16px', fontSize: '18px' }}>Démarrer (3 minutes)</button>
                <div style={{ marginTop: '24px', fontSize: '12px', color: '#999' }}>
                    Vos données sont sécurisées et ne seront partagées qu'avec votre accord.
                </div>
            </div>
        </div>
    );
}
