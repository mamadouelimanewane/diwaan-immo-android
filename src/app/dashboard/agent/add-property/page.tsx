'use client';

import { useState } from 'react';
import { Camera, MapPin, Upload, Check, Home, DollarSign, FileText } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api-client';

export default function AddPropertyPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    // Form Stats
    const [formData, setFormData] = useState({
        // Step 1
        transactionType: 'SALE' as 'SALE' | 'RENT',
        type: 'APARTMENT',
        price: '',
        title: '',

        // Step 2
        surface: '',
        bedrooms: '',
        bathrooms: '',
        description: '',

        // Step 3
        address: '',
        city: 'Dakar',
        neighborhood: '',

        features: {
            hasGenerator: false,
            hasWaterTank: false,
            hasSecurity: false,
            hasPool: false,
            isFurnished: false,
        }
    });

    // Helper to update form data
    const updateForm = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const toggleFeature = (key: keyof typeof formData.features) => {
        setFormData(prev => ({
            ...prev,
            features: {
                ...prev.features,
                [key]: !prev.features[key]
            }
        }));
    };

    const nextStep = () => setStep(prev => prev + 1);
    const prevStep = () => setStep(prev => prev - 1);

    const handleSubmit = async () => {
        setIsSubmitting(true);
        setError('');

        try {
            // Mapping for API
            const payload = {
                title: formData.title || `${formData.type} à ${formData.city}`,
                description: formData.description || 'Pas de description',
                type: formData.type,
                transactionType: formData.transactionType,
                price: Number(formData.price),
                surface: Number(formData.surface),
                bedrooms: Number(formData.bedrooms),
                bathrooms: Number(formData.bathrooms),
                address: formData.address || formData.neighborhood,
                city: formData.city,
                neighborhood: formData.neighborhood || 'Quartier Inconnu',
                images: ["/properties/house-1.jpg"], // Placeholder image required by schema

                // Amenities
                hasGenerator: formData.features.hasGenerator,
                hasWaterTank: formData.features.hasWaterTank,
                hasSecurity: formData.features.hasSecurity,
                hasPool: formData.features.hasPool,
                isFurnished: formData.features.isFurnished,
            };

            await api.properties.create(payload);

            // Redirect using router
            router.push('/dashboard/agent');
        } catch (err: any) {
            console.error(err);
            setError(err.message || 'Une erreur est survenue');
            setIsSubmitting(false);
        }
    };

    return (
        <div style={{ maxWidth: '800px', margin: '40px auto', padding: '0 24px' }}>
            {/* Header / Progress */}
            <div style={{ marginBottom: '40px' }}>
                <Link href="/dashboard/agent" style={{ color: '#718096', textDecoration: 'none', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '16px' }}>
                    ← Retour au tableau de bord
                </Link>
                <h1 style={{ fontSize: '32px', fontWeight: 'bold' }}>Ajouter un nouveau bien</h1>
                <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} style={{ flex: 1, height: '6px', background: i <= step ? '#006AFF' : '#E2E8F0', borderRadius: '3px' }} />
                    ))}
                </div>
            </div>

            {error && (
                <div style={{ padding: '16px', background: '#FED7D7', color: '#C53030', borderRadius: '8px', marginBottom: '24px' }}>
                    {error}
                </div>
            )}

            {/* Step 1: Basic Info */}
            {step === 1 && (
                <div style={{ background: 'white', padding: '32px', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                    <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '24px' }}>Type de transaction</h2>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '32px' }}>
                        <button
                            onClick={() => updateForm('transactionType', 'SALE')}
                            style={{
                                padding: '24px',
                                border: formData.transactionType === 'SALE' ? '2px solid #006AFF' : '1px solid #E2E8F0',
                                background: formData.transactionType === 'SALE' ? '#EBF8FF' : 'white',
                                borderRadius: '12px',
                                color: formData.transactionType === 'SALE' ? '#006AFF' : '#4A5568',
                                fontWeight: 'bold', fontSize: '18px', cursor: 'pointer'
                            }}
                        >
                            A Vendre
                        </button>
                        <button
                            onClick={() => updateForm('transactionType', 'RENT')}
                            style={{
                                padding: '24px',
                                border: formData.transactionType === 'RENT' ? '2px solid #006AFF' : '1px solid #E2E8F0',
                                background: formData.transactionType === 'RENT' ? '#EBF8FF' : 'white',
                                borderRadius: '12px',
                                color: formData.transactionType === 'RENT' ? '#006AFF' : '#4A5568',
                                fontWeight: 'bold', fontSize: '18px', cursor: 'pointer'
                            }}
                        >
                            A Louer
                        </button>
                    </div>

                    <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '24px' }}>Type de bien</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '32px' }}>
                        {[
                            { label: 'Appartement', val: 'APARTMENT' },
                            { label: 'Maison / Villa', val: 'HOUSE' },
                            { label: 'Terrain', val: 'LAND' },
                            { label: 'Commercial', val: 'COMMERCIAL' },
                            { label: 'Villa', val: 'VILLA' },
                            { label: 'Studio', val: 'STUDIO' }
                        ].map(type => (
                            <button
                                key={type.val}
                                onClick={() => updateForm('type', type.val)}
                                style={{
                                    padding: '16px',
                                    border: formData.type === type.val ? '2px solid #006AFF' : '1px solid #E2E8F0',
                                    background: formData.type === type.val ? '#EBF8FF' : 'white',
                                    borderRadius: '12px',
                                    fontWeight: '600',
                                    color: formData.type === type.val ? '#006AFF' : '#4A5568',
                                    cursor: 'pointer'
                                }}
                            >
                                {type.label}
                            </button>
                        ))}
                    </div>

                    <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '24px' }}>Prix</h2>
                    <div style={{ position: 'relative', marginBottom: '32px' }}>
                        <DollarSign color="#A0AEC0" style={{ position: 'absolute', left: '16px', top: '16px' }} />
                        <input
                            type="number"
                            value={formData.price}
                            onChange={(e) => updateForm('price', e.target.value)}
                            placeholder="Montant (FCFA)"
                            style={{ width: '100%', padding: '16px 16px 16px 48px', fontSize: '18px', borderRadius: '12px', border: '1px solid #CBD5E0' }}
                        />
                    </div>

                    <button onClick={nextStep} style={{ width: '100%', padding: '16px', background: '#006AFF', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer' }}>
                        Continuer
                    </button>
                </div>
            )}

            {/* Step 2: Details & Features (Local Context) */}
            {step === 2 && (
                <div style={{ background: 'white', padding: '32px', borderRadius: '16px', border: '1px solid #E2E8F0' }}>

                    <div style={{ marginBottom: '24px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#4A5568' }}>Titre de l'annonce</label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => updateForm('title', e.target.value)}
                            placeholder="Ex: Belle villa avec piscine aux Almadies"
                            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #CBD5E0' }}
                        />
                    </div>

                    <div style={{ display: 'flex', gap: '24px', marginBottom: '32px' }}>
                        <div style={{ flex: 1 }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#4A5568' }}>Surface (m²)</label>
                            <input
                                type="number"
                                value={formData.surface}
                                onChange={(e) => updateForm('surface', e.target.value)}
                                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #CBD5E0' }}
                            />
                        </div>
                        <div style={{ flex: 1 }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#4A5568' }}>Chambres</label>
                            <input
                                type="number"
                                value={formData.bedrooms}
                                onChange={(e) => updateForm('bedrooms', e.target.value)}
                                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #CBD5E0' }}
                            />
                        </div>
                        <div style={{ flex: 1 }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#4A5568' }}>Salles de bain</label>
                            <input
                                type="number"
                                value={formData.bathrooms}
                                onChange={(e) => updateForm('bathrooms', e.target.value)}
                                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #CBD5E0' }}
                            />
                        </div>
                    </div>

                    <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '24px' }}>Commodités (Spécial Sénégal)</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '32px' }}>
                        <label
                            onClick={() => toggleFeature('hasGenerator')}
                            style={{
                                display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', borderRadius: '12px', cursor: 'pointer',
                                border: formData.features.hasGenerator ? '2px solid #38A169' : '1px solid #E2E8F0',
                                background: formData.features.hasGenerator ? '#F0FFF4' : 'white'
                            }}
                        >
                            <div style={{ width: '24px', height: '24px', borderRadius: '50%', border: '2px solid #CBD5E0', background: formData.features.hasGenerator ? '#38A169' : 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                {formData.features.hasGenerator && <Check size={14} color="white" />}
                            </div>
                            <span style={{ fontWeight: '600' }}>⚡ Groupe Électrogène</span>
                        </label>

                        <label
                            onClick={() => toggleFeature('hasWaterTank')}
                            style={{
                                display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', borderRadius: '12px', cursor: 'pointer',
                                border: formData.features.hasWaterTank ? '2px solid #38A169' : '1px solid #E2E8F0',
                                background: formData.features.hasWaterTank ? '#F0FFF4' : 'white'
                            }}
                        >
                            <div style={{ width: '24px', height: '24px', borderRadius: '50%', border: '2px solid #CBD5E0', background: formData.features.hasWaterTank ? '#38A169' : 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                {formData.features.hasWaterTank && <Check size={14} color="white" />}
                            </div>
                            <span style={{ fontWeight: '600' }}>💧 Réservoir / Surpresseur</span>
                        </label>

                        <label
                            onClick={() => toggleFeature('hasSecurity')}
                            style={{
                                display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', borderRadius: '12px', cursor: 'pointer',
                                border: formData.features.hasSecurity ? '2px solid #38A169' : '1px solid #E2E8F0',
                                background: formData.features.hasSecurity ? '#F0FFF4' : 'white'
                            }}
                        >
                            <div style={{ width: '24px', height: '24px', borderRadius: '50%', border: '2px solid #CBD5E0', background: formData.features.hasSecurity ? '#38A169' : 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                {formData.features.hasSecurity && <Check size={14} color="white" />}
                            </div>
                            <span style={{ fontWeight: '600' }}>🛡️ Gardiennage 24h/24</span>
                        </label>

                        <label
                            onClick={() => toggleFeature('hasPool')}
                            style={{
                                display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', borderRadius: '12px', cursor: 'pointer',
                                border: formData.features.hasPool ? '2px solid #38A169' : '1px solid #E2E8F0',
                                background: formData.features.hasPool ? '#F0FFF4' : 'white'
                            }}
                        >
                            <div style={{ width: '24px', height: '24px', borderRadius: '50%', border: '2px solid #CBD5E0', background: formData.features.hasPool ? '#38A169' : 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                {formData.features.hasPool && <Check size={14} color="white" />}
                            </div>
                            <span style={{ fontWeight: '600' }}>🏊 Piscine</span>
                        </label>
                    </div>

                    <div style={{ marginBottom: '32px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#4A5568' }}>Description</label>
                        <textarea
                            rows={5}
                            value={formData.description}
                            onChange={(e) => updateForm('description', e.target.value)}
                            placeholder="Décrivez le bien, le quartier, les atouts..."
                            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #CBD5E0' }}
                        />
                    </div>

                    <div style={{ display: 'flex', gap: '16px' }}>
                        <button onClick={prevStep} style={{ flex: 1, padding: '16px', background: '#EDF2F7', color: '#4A5568', border: 'none', borderRadius: '12px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer' }}>
                            Retour
                        </button>
                        <button onClick={nextStep} style={{ flex: 2, padding: '16px', background: '#006AFF', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer' }}>
                            Continuer
                        </button>
                    </div>
                </div>
            )}

            {/* Step 3: Location & Photos */}
            {step === 3 && (
                <div style={{ background: 'white', padding: '32px', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
                    <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '24px' }}>Localisation</h2>
                    <div style={{ marginBottom: '32px' }}>
                        <div style={{ marginBottom: '16px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#4A5568' }}>Ville</label>
                            <input
                                type="text"
                                value={formData.city}
                                onChange={(e) => updateForm('city', e.target.value)}
                                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #CBD5E0' }}
                            />
                        </div>
                        <div style={{ marginBottom: '16px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#4A5568' }}>Quartier</label>
                            <input
                                type="text"
                                value={formData.neighborhood}
                                onChange={(e) => updateForm('neighborhood', e.target.value)}
                                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #CBD5E0' }}
                            />
                        </div>
                        <div style={{ position: 'relative', marginBottom: '16px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#4A5568' }}>Adresse précise</label>
                            <MapPin color="#A0AEC0" style={{ position: 'absolute', left: '16px', top: '44px' }} />
                            <input
                                type="text"
                                value={formData.address}
                                onChange={(e) => updateForm('address', e.target.value)}
                                placeholder="Rue, Point de repère..."
                                style={{ width: '100%', padding: '16px 16px 16px 48px', fontSize: '16px', borderRadius: '12px', border: '1px solid #CBD5E0' }}
                            />
                        </div>
                    </div>

                    <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '24px' }}>Photos</h2>
                    <div style={{ border: '2px dashed #CBD5E0', borderRadius: '12px', padding: '40px', textAlign: 'center', background: '#F7FAFC', cursor: 'pointer', marginBottom: '32px' }}>
                        <Camera size={48} color="#A0AEC0" style={{ marginBottom: '16px' }} />
                        <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#2D3748', marginBottom: '8px' }}>Ajouter des photos</h3>
                        <p style={{ color: '#718096' }}>Fonctionnalité d'upload simulée. Une image par défaut sera utilisée.</p>
                    </div>

                    <div style={{ display: 'flex', gap: '16px' }}>
                        <button onClick={prevStep} style={{ flex: 1, padding: '16px', background: '#EDF2F7', color: '#4A5568', border: 'none', borderRadius: '12px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer' }}>
                            Retour
                        </button>
                        <button onClick={nextStep} style={{ flex: 2, padding: '16px', background: '#006AFF', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer' }}>
                            Voir le récapitulatif
                        </button>
                    </div>
                </div>
            )}

            {/* Step 4: Review */}
            {step === 4 && (
                <div style={{ textAlign: 'center', padding: '40px' }}>
                    <div style={{ width: '80px', height: '80px', background: '#C6F6D5', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                        <Check size={40} color="#22543D" />
                    </div>
                    <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#2F855A', marginBottom: '16px' }}>Prêt à publier !</h2>
                    <p style={{ color: '#4A5568', fontSize: '18px', marginBottom: '32px' }}>
                        Votre annonce est prête. Elle sera soumise instantanément.
                    </p>
                    <button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        style={{
                            padding: '16px 32px',
                            background: isSubmitting ? '#A0AEC0' : '#006AFF',
                            color: 'white',
                            border: 'none',
                            borderRadius: '12px',
                            fontWeight: 'bold',
                            fontSize: '18px',
                            cursor: isSubmitting ? 'not-allowed' : 'pointer'
                        }}
                    >
                        {isSubmitting ? 'Publication...' : 'Publier l\'annonce'}
                    </button>
                </div>
            )}
        </div>
    );
}
