export default function FSBOPage() {
    return (
        <div className="container" style={{ padding: '60px 24px', maxWidth: '800px' }}>
            <h1 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '24px' }}>Vendre par Soi-même (FSBO)</h1>
            <p style={{ fontSize: '18px', color: '#666', marginBottom: '40px' }}>
                Vous souhaitez vendre votre bien sans intermédiaire ? C'est possible sur Diwaan. Suivez ces étapes pour une transaction réussie.
            </p>

            <div style={{ background: '#f8f9fa', padding: '30px', borderRadius: '12px', border: '1px solid #ddd', marginBottom: '40px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Créer votre annonce gratuite</h2>
                <form style={{ display: 'grid', gap: '20px' }}>
                    <input type="text" placeholder="Adresse complète du bien" style={{ padding: '16px', borderRadius: '8px', border: '1px solid #ccc' }} />
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                        <input type="text" placeholder="Prix (FCFA)" style={{ padding: '16px', borderRadius: '8px', border: '1px solid #ccc' }} />
                        <input type="text" placeholder="Surface (m²)" style={{ padding: '16px', borderRadius: '8px', border: '1px solid #ccc' }} />
                    </div>
                    <textarea placeholder="Description du bien..." rows={5} style={{ padding: '16px', borderRadius: '8px', border: '1px solid #ccc' }}></textarea>
                    <button className="btn btn-primary" style={{ justifySelf: 'start' }}>Publier mon annonce</button>
                </form>
            </div>

            <div>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>Conseils pour les vendeurs FSBO</h3>
                <ul style={{ listStyle: 'disc', paddingLeft: '20px', lineHeight: 1.8, color: '#444' }}>
                    <li>Prenez des photos de haute qualité, bien éclairées.</li>
                    <li>Fixez un prix réaliste en utilisant notre outil d'estimation.</li>
                    <li>Préparez tous les documents légaux (titre foncier, etc.) à l'avance.</li>
                    <li>Soyez disponible pour les visites, y compris les week-ends.</li>
                </ul>
            </div>
        </div>
    );
}
