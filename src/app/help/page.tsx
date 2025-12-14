import Link from 'next/link';
import Image from 'next/image';
import Footer from '@/components/layout/Footer';

export default function HelpPage() {
    return (
        <div style={{ background: '#fff', color: '#000', fontFamily: 'sans-serif' }}>
            {/* Search Hero Section */}
            <div style={{ background: '#f8f9fa', padding: '60px 24px', textAlign: 'center' }}>
                <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <h1 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '16px', color: '#000' }}>Bonjour, comment pouvons-nous vous aider ?</h1>
                    <p style={{ fontSize: '18px', color: '#444', marginBottom: '32px' }}>
                        Explorez les sujets populaires ou demandez de l'aide à l'assistant numérique.
                    </p>

                    <div style={{ position: 'relative', maxWidth: '600px', margin: '0 auto', marginBottom: '16px' }}>
                        <input
                            type="text"
                            placeholder="Posez votre question ici…"
                            style={{
                                width: '100%',
                                padding: '16px 20px',
                                fontSize: '16px',
                                border: '1px solid #ccc',
                                borderRadius: '8px',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                                outline: 'none'
                            }}
                        />
                        <button style={{
                            position: 'absolute',
                            right: '10px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            background: '#006AFF',
                            color: 'white',
                            border: 'none',
                            padding: '10px 20px',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontWeight: 'bold'
                        }}>
                            Recherche
                        </button>
                    </div>
                    <p style={{ fontSize: '14px', color: '#666' }}>Pour obtenir des instructions étape par étape, ajoutez un « ? » à la fin.</p>
                </div>
            </div>

            {/* Main Categories */}
            <div className="container" style={{ padding: '60px 24px', maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', marginBottom: '80px' }}>
                    {/* Professional */}
                    <div style={{ textAlign: 'center', padding: '30px', border: '1px solid #eee', borderRadius: '8px', transition: 'box-shadow 0.2s', cursor: 'pointer' }}>
                        <div style={{ height: '180px', position: 'relative', marginBottom: '20px' }}>
                            <Image src="/images/help/real_estate_professional.png" alt="Professionnel de l'immobilier" fill style={{ objectFit: 'contain' }} />
                        </div>
                        <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>Professionnel de l'immobilier</h3>
                        <p style={{ color: '#006AFF', fontWeight: 'bold' }}>Agent, courtier</p>
                    </div>

                    {/* Buyer/Seller */}
                    <div style={{ textAlign: 'center', padding: '30px', border: '1px solid #eee', borderRadius: '8px', transition: 'box-shadow 0.2s', cursor: 'pointer' }}>
                        <div style={{ height: '180px', position: 'relative', marginBottom: '20px' }}>
                            <Image src="/images/help/house_for_sale.png" alt="Maison à vendre" fill style={{ objectFit: 'contain' }} />
                        </div>
                        <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>Propriétaire, vendeur, acheteur</h3>
                    </div>

                    {/* Landlord/Tenant */}
                    <div style={{ textAlign: 'center', padding: '30px', border: '1px solid #eee', borderRadius: '8px', transition: 'box-shadow 0.2s', cursor: 'pointer' }}>
                        <div style={{ height: '180px', position: 'relative', marginBottom: '20px' }}>
                            <Image src="/images/help/owner_illustration.png" alt="Propriétaire et locataire" fill style={{ objectFit: 'contain' }} />
                        </div>
                        <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>Locataire, propriétaire, gestionnaire immobilier</h3>
                    </div>
                </div>

                {/* Popular Articles */}
                <div style={{ marginBottom: '80px' }}>
                    <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>Articles populaires</h2>
                    <p style={{ color: '#666', marginBottom: '30px' }}>Réponses rapides aux questions fréquentes, ainsi que des guides étape par étape.</p>

                    <div style={{ overflowX: 'auto', display: 'flex', gap: '20px', paddingBottom: '20px' }}>
                        {/* Article 1 */}
                        <div style={{ minWidth: '300px', border: '1px solid #eee', padding: '24px', borderRadius: '8px' }}>
                            <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '12px', color: '#006AFF' }}>Comment créer un compte professionnel immobilier sur Zillow Group ?</h3>
                            <p style={{ fontSize: '14px', color: '#444', lineHeight: '1.5', marginBottom: '16px' }}>Pour créer un compte immobilier professionnel sur Zillow, rendez-vous sur leur site web, inscrivez-vous avec votre adresse e-mail et votre mot de passe, sélectionnez le type de compte professionnel...</p>
                            <Link href="#" style={{ color: '#006AFF', fontWeight: 'bold', fontSize: '14px', textDecoration: 'none' }}>Aller à l'article →</Link>
                        </div>

                        {/* Article 2 */}
                        <div style={{ minWidth: '300px', border: '1px solid #eee', padding: '24px', borderRadius: '8px' }}>
                            <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '12px', color: '#006AFF' }}>Comment réinitialiser mon mot de passe ?</h3>
                            <p style={{ fontSize: '14px', color: '#444', lineHeight: '1.5', marginBottom: '16px' }}>Si vous avez oublié votre mot de passe, demandez une réinitialisation pour recevoir un courriel contenant un lien vous permettant d'en créer un nouveau.</p>
                            <Link href="#" style={{ color: '#006AFF', fontWeight: 'bold', fontSize: '14px', textDecoration: 'none' }}>Aller à l'article →</Link>
                        </div>

                        {/* Article 3 */}
                        <div style={{ minWidth: '300px', border: '1px solid #eee', padding: '24px', borderRadius: '8px' }}>
                            <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '12px', color: '#006AFF' }}>Mon annonce n'apparaît pas / J'ai un problème avec une annonce</h3>
                            <p style={{ fontSize: '14px', color: '#444', lineHeight: '1.5', marginBottom: '16px' }}>Zillow affiche les annonces provenant de sources telles que le MLS et les courtiers. Les utilisateurs doivent activer les annonces à la source.</p>
                            <Link href="#" style={{ color: '#006AFF', fontWeight: 'bold', fontSize: '14px', textDecoration: 'none' }}>Aller à l'article →</Link>
                        </div>

                        {/* Article 4 */}
                        <div style={{ minWidth: '300px', border: '1px solid #eee', padding: '24px', borderRadius: '8px' }}>
                            <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '12px', color: '#006AFF' }}>Que signifie travailler avec un agent sur Zillow ?</h3>
                            <p style={{ fontSize: '14px', color: '#444', lineHeight: '1.5', marginBottom: '16px' }}>Collaborer avec un agent Zillow vous apporte un soutien tout au long de votre recherche immobilière. Vous pouvez poser des questions...</p>
                            <Link href="#" style={{ color: '#006AFF', fontWeight: 'bold', fontSize: '14px', textDecoration: 'none' }}>Aller à l'article →</Link>
                        </div>

                        {/* Article 5 */}
                        <div style={{ minWidth: '300px', border: '1px solid #eee', padding: '24px', borderRadius: '8px' }}>
                            <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '12px', color: '#006AFF' }}>Où se trouve mon annonce de vente entre particuliers ?</h3>
                            <p style={{ fontSize: '14px', color: '#444', lineHeight: '1.5', marginBottom: '16px' }}>Toutes les annonces de vente entre particuliers sur Zillow font l'objet d'un processus de vérification...</p>
                            <Link href="#" style={{ color: '#006AFF', fontWeight: 'bold', fontSize: '14px', textDecoration: 'none' }}>Aller à l'article →</Link>
                        </div>
                    </div>
                    <div style={{ marginTop: '20px', textAlign: 'center' }}>
                        <Link href="#" style={{ display: 'inline-block', padding: '10px 24px', border: '1px solid #006AFF', borderRadius: '4px', color: '#006AFF', textDecoration: 'none', fontWeight: 'bold' }}>Parcourir tous les sujets</Link>
                    </div>
                </div>

                {/* Contact Section */}
                <div style={{ display: 'flex', alignItems: 'center', background: '#fff', border: '1px solid #eee', borderRadius: '8px', padding: '40px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                    <div style={{ flex: '0 0 300px', height: '200px', position: 'relative', marginRight: '40px' }}>
                        <Image src="/images/help/support_team.png" alt="Équipe de soutien" fill style={{ objectFit: 'contain' }} />
                    </div>
                    <div>
                        <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>Entrer en contact</h2>
                        <p style={{ fontSize: '16px', color: '#444', marginBottom: '24px' }}>
                            Commençons par quelques questions pour vous orienter vers le bon endroit.
                        </p>
                        <button style={{
                            background: '#006AFF',
                            color: 'white',
                            border: 'none',
                            padding: '12px 24px',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            fontSize: '16px'
                        }}>
                            Contactez-nous
                        </button>
                    </div>
                </div>
            </div>

            {/* Footer Links - Simplified for Help Page */}
            <div style={{ borderTop: '1px solid #e0e0e0', padding: '40px 24px', fontSize: '13px', background: '#f8f9fa' }}>
                <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <p style={{ color: '#666', lineHeight: 1.6, marginBottom: '24px' }}>
                        Le groupe Zillow s'engage à garantir l'accessibilité numérique aux personnes en situation de handicap. Nous travaillons sans cesse à améliorer l'accessibilité de notre site web pour tous et nous accueillons favorablement vos commentaires et demandes d'aménagement. Si vous souhaitez signaler un problème ou demander un aménagement, n'hésitez pas à nous contacter.
                    </p>
                    <p style={{ color: '#666', lineHeight: 1.6, marginBottom: '24px' }}>
                        Chez Zillow, nous accordons une grande importance à la protection de votre vie privée. Pour en savoir plus sur la manière dont nous traitons vos informations, veuillez consulter notre <Link href="/privacy" style={{ color: '#006AFF' }}>Avis de confidentialité</Link>.
                    </p>
                    <p style={{ color: '#666', lineHeight: 1.6 }}>Zillow, Inc. détient des licences de courtage immobilier dans plusieurs États américains.</p>
                </div>
            </div>
            <Footer />
        </div>
    );
}
