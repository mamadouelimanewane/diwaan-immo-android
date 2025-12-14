'use client';

import { useState } from 'react';
import ImageUpload from '@/components/ImageUpload';

export default function AddPropertyForm() {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        beds: '',
        baths: '',
        sqft: '',
        address: '',
        city: 'Dakar',
        type: 'HOUSE',
        images: [] as string[],
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleImageUpload = (url: string) => {
        setFormData(prev => ({
            ...prev,
            images: [...prev.images, url]
        }));
    };

    const handleImageRemove = (url: string) => {
        setFormData(prev => ({
            ...prev,
            images: prev.images.filter(img => img !== url)
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Validation
            if (formData.images.length === 0) {
                alert('Veuillez ajouter au moins une photo');
                setIsSubmitting(false);
                return;
            }

            // TODO: Envoyer à l'API
            console.log('Données à envoyer:', formData);

            // Simulation
            await new Promise(resolve => setTimeout(resolve, 1500));

            alert('✅ Propriété ajoutée avec succès !');

            // Reset form
            setFormData({
                title: '',
                description: '',
                price: '',
                beds: '',
                baths: '',
                sqft: '',
                address: '',
                city: 'Dakar',
                type: 'HOUSE',
                images: [],
            });

        } catch (error) {
            console.error('Erreur:', error);
            alert('❌ Erreur lors de l\'ajout de la propriété');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 24px' }}>
            <div style={{ marginBottom: '32px' }}>
                <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '8px', color: '#1B254B' }}>
                    Ajouter une Propriété
                </h1>
                <p style={{ color: '#666', fontSize: '16px' }}>
                    Remplissez les informations ci-dessous pour publier votre annonce
                </p>
            </div>

            <form onSubmit={handleSubmit}>
                {/* Upload Images */}
                <ImageUpload
                    images={formData.images}
                    onUpload={handleImageUpload}
                    onRemove={handleImageRemove}
                    maxImages={10}
                />

                {/* Informations de Base */}
                <div style={{ background: 'white', padding: '32px', borderRadius: '16px', marginBottom: '24px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                    <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '24px', color: '#1B254B' }}>
                        Informations de Base
                    </h2>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                        <div style={{ gridColumn: 'span 2' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#374151' }}>
                                Titre de l'annonce *
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                placeholder="Ex: Belle villa moderne à Almadies"
                                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #D1D5DB' }}
                            />
                        </div>

                        <div style={{ gridColumn: 'span 2' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#374151' }}>
                                Description
                            </label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                placeholder="Décrivez votre propriété en détail..."
                                rows={5}
                                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #D1D5DB', resize: 'vertical' }}
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#374151' }}>
                                Prix (FCFA) *
                            </label>
                            <input
                                type="number"
                                required
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                placeholder="50000000"
                                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #D1D5DB' }}
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#374151' }}>
                                Type de Propriété *
                            </label>
                            <select
                                required
                                value={formData.type}
                                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #D1D5DB' }}
                            >
                                <option value="HOUSE">Maison</option>
                                <option value="APARTMENT">Appartement</option>
                                <option value="VILLA">Villa</option>
                                <option value="LAND">Terrain</option>
                                <option value="COMMERCIAL">Commercial</option>
                            </select>
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#374151' }}>
                                Chambres
                            </label>
                            <input
                                type="number"
                                value={formData.beds}
                                onChange={(e) => setFormData({ ...formData, beds: e.target.value })}
                                placeholder="3"
                                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #D1D5DB' }}
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#374151' }}>
                                Salles de Bain
                            </label>
                            <input
                                type="number"
                                value={formData.baths}
                                onChange={(e) => setFormData({ ...formData, baths: e.target.value })}
                                placeholder="2"
                                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #D1D5DB' }}
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#374151' }}>
                                Surface (m²)
                            </label>
                            <input
                                type="number"
                                value={formData.sqft}
                                onChange={(e) => setFormData({ ...formData, sqft: e.target.value })}
                                placeholder="200"
                                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #D1D5DB' }}
                            />
                        </div>
                    </div>
                </div>

                {/* Localisation */}
                <div style={{ background: 'white', padding: '32px', borderRadius: '16px', marginBottom: '32px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                    <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '24px', color: '#1B254B' }}>
                        Localisation
                    </h2>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                        <div style={{ gridColumn: 'span 2' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#374151' }}>
                                Adresse Complète *
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.address}
                                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                placeholder="Rue, quartier, ville"
                                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #D1D5DB' }}
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#374151' }}>
                                Ville *
                            </label>
                            <select
                                required
                                value={formData.city}
                                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #D1D5DB' }}
                            >
                                <option value="Dakar">Dakar</option>
                                <option value="Thiès">Thiès</option>
                                <option value="Saly">Saly</option>
                                <option value="Mbour">Mbour</option>
                                <option value="Saint-Louis">Saint-Louis</option>
                                <option value="Touba">Touba</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '16px', justifyContent: 'flex-end' }}>
                    <button
                        type="button"
                        onClick={() => window.history.back()}
                        style={{
                            padding: '14px 32px',
                            background: 'white',
                            color: '#6B7280',
                            border: '2px solid #D1D5DB',
                            borderRadius: '8px',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            fontSize: '16px'
                        }}
                    >
                        Annuler
                    </button>
                    <button
                        type="submit"
                        disabled={isSubmitting || formData.images.length === 0}
                        style={{
                            padding: '14px 32px',
                            background: isSubmitting || formData.images.length === 0 ? '#D1D5DB' : '#006AFF',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            fontWeight: 'bold',
                            cursor: isSubmitting || formData.images.length === 0 ? 'not-allowed' : 'pointer',
                            fontSize: '16px'
                        }}
                    >
                        {isSubmitting ? '⏳ Publication...' : '✓ Publier l\'Annonce'}
                    </button>
                </div>
            </form>
        </div>
    );
}
