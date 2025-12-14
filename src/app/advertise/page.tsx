import Link from 'next/link';
import Image from 'next/image';
import Footer from '@/components/layout/Footer';

export default function AdvertisePage() {
    return (
        <div style={{ background: '#fff', color: '#002B49', fontFamily: 'sans-serif' }}>
            {/* Hero Section */}
            <div style={{ background: '#002B49', color: 'white', padding: '80px 24px', textAlign: 'center' }}>
                <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
                    <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '24px' }}>Devenez partenaire de Zillow pour développer votre entreprise</h1>
                    <p style={{ fontSize: '24px', opacity: 0.9, lineHeight: 1.4 }}>
                        Touchez des millions d'acheteurs, de vendeurs et de locataires sur le plus grand réseau immobilier du web.
                    </p>
                </div>
            </div>

            {/* Categories Grid */}
            <div className="container" style={{ padding: '60px 24px', maxWidth: '1200px', margin: '0 auto', marginTop: '-40px' }}>
                <div style={{ background: 'white', borderRadius: '12px', boxShadow: '0 8px 30px rgba(0,0,0,0.1)', padding: '60px 40px' }}>
                    <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '40px', textAlign: 'center', color: '#002B49' }}>Sélectionnez votre secteur d'activité pour commencer.</h2>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
                        {/* 1. Agent */}
                        <Link href="/pros/solutions" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <div style={{ border: '1px solid #eee', borderRadius: '12px', overflow: 'hidden', height: '100%', transition: 'transform 0.2s', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                                <div style={{ height: '220px', position: 'relative' }}>
                                    <Image src="/images/advertise/agent_broker_door.png" alt="Agent ou courtier" fill style={{ objectFit: 'cover' }} />
                                </div>
                                <div style={{ padding: '24px' }}>
                                    <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#006AFF' }}>Je suis agent ou courtier</h3>
                                </div>
                            </div>
                        </Link>

                        {/* 2. Manager */}
                        <Link href="/rent/manager" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <div style={{ border: '1px solid #eee', borderRadius: '12px', overflow: 'hidden', height: '100%', transition: 'transform 0.2s', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                                <div style={{ height: '220px', position: 'relative' }}>
                                    <Image src="/images/advertise/property_manager_building.png" alt="Gestionnaire immobilier" fill style={{ objectFit: 'cover' }} />
                                </div>
                                <div style={{ padding: '24px' }}>
                                    <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#006AFF' }}>Je suis gestionnaire immobilier</h3>
                                </div>
                            </div>
                        </Link>

                        {/* 3. Landlord */}
                        <Link href="/rent/manager/list" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <div style={{ border: '1px solid #eee', borderRadius: '12px', overflow: 'hidden', height: '100%', transition: 'transform 0.2s', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                                <div style={{ height: '220px', position: 'relative' }}>
                                    <Image src="/images/advertise/landlord_group.png" alt="Propriétaire" fill style={{ objectFit: 'cover' }} />
                                </div>
                                <div style={{ padding: '24px' }}>
                                    <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#006AFF' }}>Je suis propriétaire.</h3>
                                </div>
                            </div>
                        </Link>

                        {/* 4. Lender */}
                        <Link href="/pros" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <div style={{ border: '1px solid #eee', borderRadius: '12px', overflow: 'hidden', height: '100%', transition: 'transform 0.2s', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                                <div style={{ height: '220px', position: 'relative' }}>
                                    <Image src="/images/advertise/lender_walking.png" alt="Prêteur" fill style={{ objectFit: 'cover' }} />
                                </div>
                                <div style={{ padding: '24px' }}>
                                    <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#006AFF' }}>Je suis un prêteur ou un agent de crédit</h3>
                                </div>
                            </div>
                        </Link>

                        {/* 5. Builder */}
                        <Link href="/pros/builders" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <div style={{ border: '1px solid #eee', borderRadius: '12px', overflow: 'hidden', height: '100%', transition: 'transform 0.2s', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                                <div style={{ height: '220px', position: 'relative' }}>
                                    <Image src="/images/advertise/builder_construction.png" alt="Constructeur" fill style={{ objectFit: 'cover' }} />
                                </div>
                                <div style={{ padding: '24px' }}>
                                    <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#006AFF' }}>Je suis un constructeur</h3>
                                </div>
                            </div>
                        </Link>

                        {/* 6. Brand */}
                        <Link href="/contact" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <div style={{ border: '1px solid #eee', borderRadius: '12px', overflow: 'hidden', height: '100%', transition: 'transform 0.2s', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                                <div style={{ height: '220px', position: 'relative' }}>
                                    <Image src="/images/advertise/brand_laptop.png" alt="Annonceur" fill style={{ objectFit: 'cover' }} />
                                </div>
                                <div style={{ padding: '24px' }}>
                                    <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#006AFF' }}>Je suis un annonceur de marque ou local</h3>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Audience Section */}
            <div style={{ background: '#f8f9fa', padding: '80px 24px' }}>
                <div className="container" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
                    <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '20px', color: '#002B49' }}>Touchez votre public cible grâce à notre réseau de sites immobiliers de premier plan.</h2>
                    <p style={{ fontSize: '18px', color: '#666', marginBottom: '40px' }}>Audience du groupe Zillow</p>
                </div>
            </div>

            <Footer />
        </div>
    );
}
