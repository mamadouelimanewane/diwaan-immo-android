'use client';

import { useState } from 'react';
import { Briefcase, User, Mail, Phone, MapPin, Upload, CheckCircle } from 'lucide-react';

export default function CareersPage() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        city: '',
        experience: 'junior',
        resume: null as File | null,
        coverLetter: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFormData(prev => ({ ...prev, resume: e.target.files![0] }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        setIsSuccess(true);
    };

    if (isSuccess) {
        return (
            <div style={{ maxWidth: '600px', margin: '80px auto', padding: '40px', textAlign: 'center', background: '#F0FFF4', borderRadius: '16px', border: '1px solid #9AE6B4' }}>
                <CheckCircle size={64} color="#38A169" style={{ margin: '0 auto 24px' }} />
                <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: '#2F855A', marginBottom: '16px' }}>Candidature Envoyée !</h2>
                <p style={{ fontSize: '18px', color: '#4A5568', lineHeight: '1.6' }}>
                    Merci de votre intérêt pour Diwaan. Notre équipe RH va examiner votre profil et vous contactera très prochainement si votre candidature correspond à nos besoins.
                </p>
                <button
                    onClick={() => setIsSuccess(false)}
                    style={{ marginTop: '32px', padding: '12px 24px', background: '#38A169', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
                >
                    Envoyer une autre candidature
                </button>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 24px' }}>
            <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '64px', height: '64px', background: '#E6F2FF', borderRadius: '50%', marginBottom: '24px' }}>
                    <Briefcase size={32} color="#006AFF" />
                </div>
                <h1 style={{ fontSize: '42px', fontWeight: 'bold', color: '#1A202C', marginBottom: '16px' }}>
                    Rejoignez l'équipe Diwaan
                </h1>
                <p style={{ fontSize: '20px', color: '#4A5568', maxWidth: '700px', margin: '0 auto' }}>
                    Devenez un acteur clé de la transformation de l'immobilier au Sénégal. Nous recherchons des agents passionnés et ambitieux.
                </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) minmax(300px, 2fr)', gap: '60px' }}>

                {/* Sidebar Info */}
                <div>
                    <div style={{ background: '#F7FAFC', padding: '32px', borderRadius: '16px' }}>
                        <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px', color: '#2D3748' }}>Pourquoi nous rejoindre ?</h3>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            {[
                                { title: "Commission attractive", desc: "Jusqu'à 70% de commission sur vos ventes" },
                                { title: "Formation continue", desc: "Académie Diwaan pour perfectionner vos compétences" },
                                { title: "Outils digitaux", desc: "CRM puissant et application mobile dédiée" },
                                { title: "Réseau national", desc: "Accès à notre inventaire partagé partout au Sénégal" }
                            ].map((item, i) => (
                                <li key={i} style={{ marginBottom: '24px' }}>
                                    <h4 style={{ fontWeight: 'bold', fontSize: '18px', color: '#006AFF', marginBottom: '4px' }}>{item.title}</h4>
                                    <p style={{ color: '#718096', fontSize: '15px' }}>{item.desc}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Application Form */}
                <div style={{ background: 'white', padding: '40px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: '1px solid #E2E8F0' }}>
                    <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '32px', borderBottom: '2px solid #E2E8F0', paddingBottom: '16px' }}>
                        Postuler maintenant
                    </h2>

                    <form onSubmit={handleSubmit}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
                            <div>
                                <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#4A5568' }}>Prénom</label>
                                <div style={{ position: 'relative' }}>
                                    <div style={{ position: 'absolute', top: '12px', left: '12px', color: '#A0AEC0' }}><User size={20} /></div>
                                    <input
                                        type="text" name="firstName" required
                                        value={formData.firstName} onChange={handleInputChange}
                                        style={{ width: '100%', padding: '12px 12px 12px 44px', borderRadius: '8px', border: '1px solid #CBD5E0', fontSize: '16px' }}
                                        placeholder="Votre prénom"
                                    />
                                </div>
                            </div>
                            <div>
                                <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#4A5568' }}>Nom</label>
                                <div style={{ position: 'relative' }}>
                                    <div style={{ position: 'absolute', top: '12px', left: '12px', color: '#A0AEC0' }}><User size={20} /></div>
                                    <input
                                        type="text" name="lastName" required
                                        value={formData.lastName} onChange={handleInputChange}
                                        style={{ width: '100%', padding: '12px 12px 12px 44px', borderRadius: '8px', border: '1px solid #CBD5E0', fontSize: '16px' }}
                                        placeholder="Votre nom"
                                    />
                                </div>
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
                            <div>
                                <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#4A5568' }}>Email</label>
                                <div style={{ position: 'relative' }}>
                                    <div style={{ position: 'absolute', top: '12px', left: '12px', color: '#A0AEC0' }}><Mail size={20} /></div>
                                    <input
                                        type="email" name="email" required
                                        value={formData.email} onChange={handleInputChange}
                                        style={{ width: '100%', padding: '12px 12px 12px 44px', borderRadius: '8px', border: '1px solid #CBD5E0', fontSize: '16px' }}
                                        placeholder="vous@exemple.com"
                                    />
                                </div>
                            </div>
                            <div>
                                <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#4A5568' }}>Téléphone</label>
                                <div style={{ position: 'relative' }}>
                                    <div style={{ position: 'absolute', top: '12px', left: '12px', color: '#A0AEC0' }}><Phone size={20} /></div>
                                    <input
                                        type="tel" name="phone" required
                                        value={formData.phone} onChange={handleInputChange}
                                        style={{ width: '100%', padding: '12px 12px 12px 44px', borderRadius: '8px', border: '1px solid #CBD5E0', fontSize: '16px' }}
                                        placeholder="+221 77 000 00 00"
                                    />
                                </div>
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
                            <div>
                                <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#4A5568' }}>Ville de résidence</label>
                                <div style={{ position: 'relative' }}>
                                    <div style={{ position: 'absolute', top: '12px', left: '12px', color: '#A0AEC0' }}><MapPin size={20} /></div>
                                    <input
                                        type="text" name="city" required
                                        value={formData.city} onChange={handleInputChange}
                                        style={{ width: '100%', padding: '12px 12px 12px 44px', borderRadius: '8px', border: '1px solid #CBD5E0', fontSize: '16px' }}
                                        placeholder="Ex: Dakar, Saly..."
                                    />
                                </div>
                            </div>
                            <div>
                                <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#4A5568' }}>Expérience Immo</label>
                                <select
                                    name="experience"
                                    value={formData.experience} onChange={handleInputChange}
                                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #CBD5E0', fontSize: '16px', background: 'white' }}
                                >
                                    <option value="junior">Débutant (0-2 ans)</option>
                                    <option value="intermediaire">Confirmé (2-5 ans)</option>
                                    <option value="senior">Expert (5+ ans)</option>
                                    <option value="agence">Je représente une agence</option>
                                </select>
                            </div>
                        </div>

                        <div style={{ marginBottom: '24px' }}>
                            <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#4A5568' }}>CV (PDF, Word)</label>
                            <div style={{ border: '2px dashed #CBD5E0', borderRadius: '8px', padding: '24px', textAlign: 'center', cursor: 'pointer', background: '#F7FAFC' }}>
                                <Upload size={32} color="#A0AEC0" style={{ marginBottom: '8px' }} />
                                <p style={{ color: '#718096', fontSize: '14px', marginBottom: '12px' }}>Glissez votre CV ici ou cliquez pour parcourir</p>
                                <input
                                    type="file" name="resume" accept=".pdf,.doc,.docx"
                                    onChange={handleFileChange}
                                    style={{ display: 'none' }}
                                    id="resume-upload"
                                />
                                <label htmlFor="resume-upload" style={{ background: 'white', border: '1px solid #CBD5E0', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', fontWeight: 600, color: '#4A5568' }}>
                                    Choisir un fichier
                                </label>
                                {formData.resume && (
                                    <p style={{ marginTop: '12px', color: '#2F855A', fontWeight: 'bold' }}>
                                        Fichier sélectionné : {formData.resume.name}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div style={{ marginBottom: '32px' }}>
                            <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#4A5568' }}>Message de motivation</label>
                            <textarea
                                name="coverLetter" rows={5}
                                value={formData.coverLetter} onChange={handleInputChange}
                                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #CBD5E0', fontSize: '16px', resize: 'vertical' }}
                                placeholder="Dites-nous pourquoi vous souhaitez rejoindre Diwaan..."
                            />
                        </div>

                        <button
                            type="submit" disabled={isSubmitting}
                            style={{
                                width: '100%',
                                padding: '16px',
                                background: isSubmitting ? '#A0AEC0' : '#006AFF',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                fontSize: '18px',
                                fontWeight: 'bold',
                                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                                transition: 'background 0.2s'
                            }}
                        >
                            {isSubmitting ? 'Envoi en cours...' : 'Envoyer ma candidature'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
