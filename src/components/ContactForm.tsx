'use client';

import { useState } from 'react';
import styles from './ContactForm.module.css';

interface ContactFormProps {
    agentName: string;
    agentPhone: string;
    agentImage: string;
    propertyAddress: string;
    propertyId: string;
}

export default function ContactForm({ agentName, agentPhone, agentImage, propertyAddress, propertyId }: ContactFormProps) {
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('submitting');

        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get('name'),
            phone: formData.get('phone'),
            email: formData.get('email'),
            message: formData.get('message'),
            propertyId: propertyId
        };

        try {
            const response = await fetch('/api/inquiries', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                setStatus('success');
                alert(`Message envoyé à ${agentName} avec succès !`);
            } else {
                setStatus('error');
                alert("Une erreur est survenue lors de l'envoi du message.");
            }
        } catch (error) {
            console.error(error);
            setStatus('error');
            alert("Erreur de connexion.");
        }
    };

    return (
        <div className={styles.contactCard}>
            <div className={styles.agentInfo}>
                <img src={agentImage} alt={agentName} className={styles.agentImage} />
                <div>
                    <div className={styles.agentName}>{agentName}</div>
                    <div className={styles.agentPhone}>{agentPhone}</div>
                </div>
            </div>
            <form className={styles.contactForm} onSubmit={handleSubmit}>
                <input
                    name="name"
                    type="text"
                    placeholder="Nom"
                    className={styles.input}
                    defaultValue="Mamadou Dia"
                    required
                />
                <input
                    name="phone"
                    type="text"
                    placeholder="Téléphone"
                    className={styles.input}
                    defaultValue="777529299"
                />
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    className={styles.input}
                    defaultValue="mamadoueliman.dia@gmail.com"
                    required
                />
                <textarea
                    name="message"
                    placeholder="Je suis intéressé par ce bien..."
                    className={styles.textarea}
                    defaultValue={`Je suis intéressé par ${propertyAddress}.`}
                    required
                />
                <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ width: '100%' }}
                    disabled={status === 'submitting' || status === 'success'}
                >
                    {status === 'submitting' ? "Envoi..." : status === 'success' ? "Message Envoyé" : "Contacter l'Agent"}
                </button>
            </form>
        </div>
    );
}
