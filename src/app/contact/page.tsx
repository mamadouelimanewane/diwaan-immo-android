'use client';

import { Mail, Phone, MapPin, Send } from 'lucide-react';


export default function ContactPage() {
    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '60px 24px' }}>
            <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                <h1 style={{ fontSize: '42px', fontWeight: 'bold', color: '#1A202C', marginBottom: '16px' }}>Contactez-nous</h1>
                <p style={{ fontSize: '18px', color: '#4A5568' }}>Notre équipe est à votre écoute pour vous accompagner dans tous vos projets immobiliers.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px' }}>

                {/* Contact Info */}
                <div style={{ background: '#F7FAFC', padding: '40px', borderRadius: '16px' }}>
                    <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '32px', color: '#2D3748' }}>Nos Coordonnées</h2>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                        <div style={{ padding: '12px', background: 'white', borderRadius: '50%', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                            <Mail color="#006AFF" size={24} />
                        </div>
                        <div>
                            <div style={{ fontSize: '14px', color: '#718096', marginBottom: '4px' }}>Email</div>
                            <a href="mailto:contact@diwaan.com" style={{ fontSize: '18px', fontWeight: '600', color: '#2D3748', textDecoration: 'none' }}>
                                contact@diwaan.com
                            </a>
                        </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                        <div style={{ padding: '12px', background: 'white', borderRadius: '50%', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                            <Phone color="#006AFF" size={24} />
                        </div>
                        <div>
                            <div style={{ fontSize: '14px', color: '#718096', marginBottom: '4px' }}>Téléphone / WhatsApp</div>
                            <a href="tel:+221777529288" style={{ fontSize: '18px', fontWeight: '600', color: '#2D3748', textDecoration: 'none' }}>
                                +221 77 752 92 88
                            </a>
                        </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div style={{ padding: '12px', background: 'white', borderRadius: '50%', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                            <MapPin color="#006AFF" size={24} />
                        </div>
                        <div>
                            <div style={{ fontSize: '14px', color: '#718096', marginBottom: '4px' }}>Adresse</div>
                            <div style={{ fontSize: '18px', fontWeight: '600', color: '#2D3748' }}>
                                VDN, Mermoz<br />Dakar, Sénégal
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div style={{ background: 'white', padding: '40px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: '1px solid #E2E8F0' }}>
                    <form action="mailto:contact@diwaan.com" method="post" encType="text/plain">
                        <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px' }}>Envoyez-nous un message</h2>

                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#4A5568' }}>Nom Complet</label>
                            <input type="text" name="name" required style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #CBD5E0' }} />
                        </div>

                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#4A5568' }}>Email</label>
                            <input type="email" name="email" required style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #CBD5E0' }} />
                        </div>

                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#4A5568' }}>Sujet</label>
                            <select name="subject" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #CBD5E0', background: 'white' }}>
                                <option>Demande d'informations</option>
                                <option>Vendre un bien</option>
                                <option>Partenariat</option>
                                <option>Support technique</option>
                                <option>Autre</option>
                            </select>
                        </div>

                        <div style={{ marginBottom: '32px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#4A5568' }}>Message</label>
                            <textarea name="message" rows={5} required style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #CBD5E0', resize: 'vertical' }}></textarea>
                        </div>

                        <button type="submit" style={{ width: '100%', padding: '16px', background: '#006AFF', color: 'white', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                            <Send size={20} /> Envoyer le message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
