'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User } from 'lucide-react';
import styles from './LegalAssistantChat.module.css';

export default function LegalAssistantChat() {
    const [messages, setMessages] = useState([
        { text: 'Bonjour ! Je suis votre assistant immobilier et juridique. Posez-moi vos questions sur le droit immobilier, les contrats ou les procédures au Sénégal.', isBot: true }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userText = input;
        const userMsg = { text: userText, isBot: false };

        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsLoading(true);

        try {
            // Check if API key exists, otherwise mock
            // We check this BEFORE importing openai to avoid any initialization errors if the key is missing/invalid
            if (!process.env.NEXT_PUBLIC_OPENAI_API_KEY) {
                setTimeout(() => {
                    let botText = "Je peux vous aider avec les aspects juridiques.";
                    const lower = userText.toLowerCase();

                    if (lower.includes('notaire') || lower.includes('frais')) {
                        botText = "Les frais de notaire au Sénégal s'élèvent généralement à environ 15-17% du prix de vente pour les terrains nus, et un peu moins pour les immeubles bâtis. Cela inclut les droits d'enregistrement, la TVA et les émoluments du notaire.";
                    } else if (lower.includes('bail') || lower.includes('contrat')) {
                        botText = "Un contrat de bail doit être écrit et enregistré pour être pleinement opposable aux tiers. Je peux vous aider à vérifier les clauses essentielles : durée, montant du loyer, conditions de révision.";
                    } else if (lower.includes('permis') || lower.includes('construire')) {
                        botText = "Le permis de construire est obligatoire. Vous devez déposer un dossier à la mairie et à l'urbanisme. Il faut les plans architecturaux, le titre de propriété et les pièces d'identité.";
                    } else if (lower.includes('acheter') || lower.includes('vente') || lower.includes('terrain')) {
                        botText = "Pour acheter un terrain au Sénégal, vérifiez d'abord le titre foncier au Cadastre. Exigez un certificat d'urbanisme. La vente doit obligatoirement se faire devant notaire pour être valide.";
                    } else if (lower.includes('bonjour') || lower.includes('salut')) {
                        botText = "Bonjour ! En quoi puis-je vous aider juridiquement aujourd'hui ?";
                    } else {
                        botText = "C'est une excellente question juridique. En tant qu'assistant IA, je vous recommande de consulter un notaire pour valider ce point précis, mais voici ce que dit généralement la loi sénégalaise : [Information générique sur le droit immobilier].";
                    }

                    setMessages(prev => [...prev, { text: botText, isBot: true }]);
                    setIsLoading(false);
                }, 1000);
                return;
            }

            // Import dynamically only if we have a key
            const { getChatCompletion } = await import('@/lib/openai');
            const response = await getChatCompletion(userText);

            // Check if response is null (meaning api key was missing inside the lib or other error)
            if (response === null) {
                throw new Error("API Response was null");
            }

            setMessages(prev => [...prev, { text: response || "Je n'ai pas compris.", isBot: true }]);

        } catch (err) {
            console.error(err);
            // Fallback to mock if real API fails
            setMessages(prev => [...prev, { text: "Désolé, j'ai rencontré une erreur technique. Toutefois, pour acheter un terrain, n'oubliez pas de vérifier le titre foncier.", isBot: true }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.messages}>
                {messages.map((msg, idx) => (
                    <div key={idx} className={`${styles.message} ${msg.isBot ? styles.bot : styles.user}`}>
                        {msg.text}
                    </div>
                ))}
                {isLoading && (
                    <div className={`${styles.message} ${styles.bot}`}>
                        <span style={{ fontStyle: 'italic', color: 'var(--text-secondary)' }}>Analyse en cours...</span>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>
            <form onSubmit={handleSend} className={styles.inputArea}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Posez une question juridique ou immobilière..."
                    className={styles.input}
                    disabled={isLoading}
                />
                <button type="submit" className={styles.sendBtn} disabled={isLoading || !input.trim()}>
                    <Send size={20} />
                </button>
            </form>
        </div>
    );
}
