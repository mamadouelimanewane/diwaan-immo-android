import Link from 'next/link';

export default function DownPaymentAssistancePage() {
    return (
        <div className="container" style={{ padding: '60px 24px', maxWidth: '800px' }}>
            <h1 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '24px', color: '#006AFF' }}>Aide à l'Apport Personnel</h1>
            <p style={{ fontSize: '18px', lineHeight: 1.6, color: '#666', marginBottom: '40px' }}>
                L'achat d'une maison est un grand pas, et constituer un apport personnel peut être difficile.
                Diwaan s'associe à des organismes pour vous aider à franchir cette étape.
            </p>

            <div style={{ display: 'grid', gap: '30px' }}>
                <div style={{ padding: '30px', border: '1px solid #eee', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                    <h2>Prêt à Taux Zéro (PTZ) Sénégal</h2>
                    <p style={{ margin: '16px 0', color: '#555' }}>
                        Découvrez si vous êtes éligible au programme national d'aide à l'accession à la propriété.
                        Ce dispositif permet de financer jusqu'à 20% de votre bien sans intérêts.
                    </p>
                    <button className="btn btn-primary">Vérifier mon éligibilité</button>
                </div>

                <div style={{ padding: '30px', border: '1px solid #eee', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                    <h2>Programmes Employeurs</h2>
                    <p style={{ margin: '16px 0', color: '#555' }}>
                        De nombreuses grandes entreprises au Sénégal proposent des prêts bonifiés à leurs employés pour l'achat immobilier.
                        Consultez notre base de données des partenaires.
                    </p>
                    <button className="btn btn-outline">Voir la liste des partenaires</button>
                </div>
            </div>
        </div>
    );
}
