export default function PrivacyPage() {
    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '60px 24px', lineHeight: '1.6', color: '#4A5568' }}>
            <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: '#1A202C', marginBottom: '32px' }}>Politique de Confidentialité</h1>

            <p style={{ marginBottom: '24px' }}>
                Chez <strong>Diwaan</strong>, nous accordons une importance capitale à la protection de vos données personnelles. Cette politique de confidentialité explique comment nous collectons, utilisons et protégeons vos informations lorsque vous utilisez notre plateforme.
            </p>

            <section style={{ marginBottom: '32px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#2D3748', marginBottom: '16px' }}>1. Collecte des Informations</h2>
                <p>Nous collectons les informations que vous nous fournissez directement lorsque vous :</p>
                <ul style={{ listStyleType: 'disc', paddingLeft: '24px', marginTop: '12px' }}>
                    <li>Créez un compte utilisateur.</li>
                    <li>Remplissez un formulaire de contact ou de candidature.</li>
                    <li>Publiez une annonce immobilière.</li>
                    <li>Utilisez nos outils de simulation financière.</li>
                </ul>
            </section>

            <section style={{ marginBottom: '32px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#2D3748', marginBottom: '16px' }}>2. Utilisation des Données</h2>
                <p>Vos données sont utilisées pour :</p>
                <ul style={{ listStyleType: 'disc', paddingLeft: '24px', marginTop: '12px' }}>
                    <li>Fournir et améliorer nos services immobiliers.</li>
                    <li>Vous mettre en relation avec des agents ou des propriétaires.</li>
                    <li>Vous envoyer des notifications pertinentes (alertes de recherche, mises à jour).</li>
                    <li>Assurer la sécurité de la plateforme et prévenir la fraude.</li>
                </ul>
            </section>

            <section style={{ marginBottom: '32px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#2D3748', marginBottom: '16px' }}>3. Partage des Données</h2>
                <p>
                    Nous ne vendons jamais vos données personnelles à des tiers. Nous pouvons partager certaines informations avec des partenaires de confiance (banques, notaires) uniquement avec votre consentement explicite, dans le cadre de votre projet immobilier.
                </p>
            </section>

            <section style={{ marginBottom: '32px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#2D3748', marginBottom: '16px' }}>4. Vos Droits</h2>
                <p>
                    Conformément à la législation sénégalaise sur la protection des données à caractère personnel, vous disposez d'un droit d'accès, de rectification et de suppression de vos données. Pour exercer ce droit, contactez-nous à <a href="mailto:contact@diwaan.com" style={{ color: '#006AFF' }}>contact@diwaan.com</a>.
                </p>
            </section>

            <section>
                <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#2D3748', marginBottom: '16px' }}>5. Cookies</h2>
                <p>
                    Notre site utilise des cookies pour améliorer votre expérience utilisateur et analyser le trafic. Vous pouvez gérer vos préférences de cookies dans les paramètres de votre navigateur.
                </p>
            </section>
        </div>
    );
}
