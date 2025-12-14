'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ImageUpload from '@/components/ImageUpload';
import { api } from '@/lib/api-client';
import { useAuth } from '@/context/AuthContext';

export default function ListRentalPage() {
    const router = useRouter();
    const { isAuthenticated, user } = useAuth();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [images, setImages] = useState<string[]>([]);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        address: '',
        city: '',
        neighborhood: '',
        price: '',
        deposit: '', // Not sent to backend as separate field yet, maybe part of description
        surface: '',
        bedrooms: '',
        bathrooms: '',
        type: 'APARTMENT'
    });

    const handleImageUpload = (url: string) => {
        setImages(prev => [...prev, url]);
    };

    const handleImageRemove = (url: string) => {
        setImages(prev => prev.filter(img => img !== url));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (step === 1) {
            setStep(2);
            return;
        }

        // Final submission
        if (!isAuthenticated) {
            alert("Vous devez être connecté pour publier une annonce.");
            return;
        }

        if (images.length === 0) {
            alert("Veuillez ajouter au moins une photo.");
            return;
        }

        setLoading(true);

        try {
            const payload = {
                title: formData.title || `${formData.type} à louer - ${formData.city}`,
                description: formData.description || `Superbe ${formData.type.toLowerCase()} situé à ${formData.neighborhood}, ${formData.city}.`,
                type: formData.type,
                transactionType: 'RENT',
                price: parseFloat(formData.price),
                surface: parseFloat(formData.surface),
                bedrooms: formData.bedrooms ? parseInt(formData.bedrooms) : 0,
                bathrooms: formData.bathrooms ? parseInt(formData.bathrooms) : 0,
                address: formData.address,
                city: formData.city,
                neighborhood: formData.neighborhood,
                images: images
            };

            const response = await api.properties.create(payload);

            if (response.success) {
                alert("Annonce publiée avec succès !");
                router.push('/dashboard/agent');
            }
        } catch (error: any) {
            console.error(error);
            alert(error.message || "Une erreur est survenue lors de la publication.");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="container" style={{ padding: '60px 24px', maxWidth: '800px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '24px' }}>Publier votre location</h1>

            <div style={{ padding: '40px', border: '1px solid #ddd', borderRadius: '12px' }}>
                <h2 style={{ marginBottom: '24px' }}>{step === 1 ? 'Détails du bien' : 'Photos du bien'}</h2>

                <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '24px' }}>
                    {step === 1 ? (
                        <>
                            {/* Type et Titre */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Type de bien</label>
                                    <select
                                        name="type"
                                        value={formData.type}
                                        onChange={handleChange}
                                        style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ccc' }}
                                    >
                                        <option value="APARTMENT">Appartement</option>
                                        <option value="HOUSE">Maison</option>
                                        <option value="VILLA">Villa</option>
                                        <option value="STUDIO">Studio</option>
                                        <option value="COMMERCIAL">Commercial</option>
                                    </select>
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Titre de l'annonce</label>
                                    <input
                                        type="text"
                                        name="title"
                                        placeholder="Ex: Bel appartement 3 pièces..."
                                        style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ccc' }}
                                        value={formData.title}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            {/* Adresse Complete */}
                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Adresse exacte</label>
                                <input
                                    type="text"
                                    name="address"
                                    required
                                    placeholder="Adresse complète"
                                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ccc' }}
                                    value={formData.address}
                                    onChange={handleChange}
                                />
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Ville</label>
                                    <input
                                        type="text"
                                        name="city"
                                        required
                                        placeholder="Ex: Dakar"
                                        style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ccc' }}
                                        value={formData.city}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Quartier</label>
                                    <input
                                        type="text"
                                        name="neighborhood"
                                        required
                                        placeholder="Ex: Plateau"
                                        style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ccc' }}
                                        value={formData.neighborhood}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            {/* Prix et Surface */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Loyer Mensuel (FCFA)</label>
                                    <input
                                        type="number"
                                        name="price"
                                        required
                                        placeholder="0"
                                        style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ccc' }}
                                        value={formData.price}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Surface (m²)</label>
                                    <input
                                        type="number"
                                        name="surface"
                                        required
                                        placeholder="0"
                                        style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ccc' }}
                                        value={formData.surface}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            {/* Détails */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Chambres</label>
                                    <input
                                        type="number"
                                        name="bedrooms"
                                        placeholder="0"
                                        style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ccc' }}
                                        value={formData.bedrooms}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Salles de bain</label>
                                    <input
                                        type="number"
                                        name="bathrooms"
                                        placeholder="0"
                                        style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ccc' }}
                                        value={formData.bathrooms}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Description</label>
                                <textarea
                                    name="description"
                                    required
                                    placeholder="Décrivez votre bien..."
                                    rows={5}
                                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ccc', resize: 'vertical' }}
                                    value={formData.description}
                                    onChange={handleChange}
                                />
                            </div>
                        </>
                    ) : (
                        <div>
                            <p style={{ marginBottom: '16px' }}>Ajoutez de belles photos pour attirer plus de locataires.</p>
                            <ImageUpload
                                onUpload={handleImageUpload}
                                onRemove={handleImageRemove}
                                images={images}
                            />
                        </div>
                    )}

                    <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                        {step === 2 && (
                            <button
                                type="button"
                                onClick={() => setStep(1)}
                                className="btn"
                                style={{ padding: '16px 32px', border: '1px solid #ddd', background: 'white' }}
                            >
                                Retour
                            </button>
                        )}
                        <button
                            type="submit"
                            className="btn btn-primary"
                            style={{
                                padding: '16px 32px',
                                background: loading ? '#ccc' : '#006AFF',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                cursor: loading ? 'not-allowed' : 'pointer'
                            }}
                            disabled={loading}
                        >
                            {loading ? 'Publication...' : (step === 1 ? 'Continuer vers les photos' : 'Publier l\'annonce')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
