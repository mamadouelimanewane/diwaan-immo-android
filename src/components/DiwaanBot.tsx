'use client';

import { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import styles from './DiwaanBot.module.css';

export default function DiwaanBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { text: 'Bonjour ! Je suis votre assistant immobilier et juridique. Comment puis-je vous aider ?', isBot: true }
    ]);
    const [input, setInput] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    const toggleOpen = () => setIsOpen(!isOpen);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userText = input;
        const userMsg = { text: userText, isBot: false };

        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsLoading(true);

        try {
            // Import dynamically to avoid server-side issues if env is missing
            const { getChatCompletion } = await import('@/lib/openai');

            // --- LOCAL KNOWLEDGE BASE (RAG SIMULATION) ---
            const legalDocs = {
                bail: "Selon la Loi n° 2014-03 du 22 janvier 2014, le montant du cautionnement ne peut excéder deux mois de loyer (Article 27). Le bailleur doit obligatoirement délivrer un contrat écrit.",
                frais: "Les frais d'agence ne peuvent dépasser un mois de loyer selon le décret d'application. En matière de vente, les droits d'enregistrement sont généralement de 5% du prix de cession.",
                impot: "La Contribution Foncière des Propriétés Bâties (CFPB) est due par le propriétaire au 1er janvier de l'année d'imposition.",
                foncier: "L'article 14 du Code de l'Urbanisme précise que tout projet de construction doit faire l'objet d'une demande de permis de construire instruite par les services techniques municipaux.",
            };

            const wolofResponses = {
                greeting: "Salaam aleekum ! Naka laa la mëna dimbalee ci wàllu kër walla yoon ?",
                rent: "So bëgge luwé kër, man naa la won li nekk. Ndax da nga bëgg appartement walla villa ?",
                buy: "Jënd kër mooy investissement bu am solo. Saytu nañu kër yi nekk ci site bi ?",
                price: "Loyer yi dañu leen encadré ci Sénégal. Loi 2014 bi dafa nangu 2 mois acompte rek.",
                fallback: "Maa ngi jéem a dégg Wolof. Mën nga ma wax li nga soxla ci Français bu neexee ?",
            };

            // If no API key is set, fallback to advanced simulation
            if (!process.env.NEXT_PUBLIC_OPENAI_API_KEY) {
                setTimeout(() => {
                    let botText = "Je peux vous aider à naviguer sur Diwaan. Que cherchez-vous ?";
                    const lowerInput = userText.toLowerCase();

                    // --- WOLOF DETECTION ---
                    if (lowerInput.includes('salaam') || lowerInput.includes('naka') || lowerInput.includes('diam') || lowerInput.includes('jamm')) {
                        botText = wolofResponses.greeting;
                    }
                    else if (lowerInput.includes('luwe') || lowerInput.includes('luwé')) {
                        botText = wolofResponses.rent;
                    }
                    else if (lowerInput.includes('jënd') || lowerInput.includes('jend')) {
                        botText = wolofResponses.buy;
                    }
                    // --- LEGAL RAG DETECTION ---
                    else if (lowerInput.includes('caution') || lowerInput.includes('mois') || lowerInput.includes('avance')) {
                        botText = `📌 *Note Juridique :* ${legalDocs.bail}`;
                    }
                    else if (lowerInput.includes('frais') || lowerInput.includes('notaire') || lowerInput.includes('enregistrement')) {
                        botText = `⚖️ *Fiscalité & Frais :* ${legalDocs.frais}`;
                    }
                    else if (lowerInput.includes('permis') || lowerInput.includes('construire')) {
                        botText = `🏗️ *Code de l'Urbanisme :* ${legalDocs.foncier}`;
                    }
                    // --- STANDARD NAVIGATION ---
                    else if (lowerInput.includes('bonjour') || lowerInput.includes('salut')) {
                        botText = "Bonjour ! Diwaan Assistant est là. Posez-moi une question juridique ou demandez-moi de trouver un bien.";
                    } else if (lowerInput.includes('vendre')) {
                        botText = "Pour vendre votre bien, visitez notre section 'Vendre'. Les propriétaires obtiennent une estimation gratuite.";
                    } else {
                        // Default Fallback
                        botText = "Intéressant. Je peux aussi vous renseigner sur la *Loi 2014 sur les loyers* ou le *Code de l'Urbanisme*. Essayez de demander 'Quels sont les frais de notaire ?'";
                    }

                    setMessages(prev => [...prev, { text: botText, isBot: true }]);
                    setIsLoading(false);
                }, 1000);
                return;
            }

            // --- REAL OPENAI CALL WITH SYSTEM PROMPT ---
            // We inject the context into the prompt
            const systemPrompt = `Tu es DiwaanBot, un expert immobilier au Sénégal. 
            Contexte Juridique :
            1. Loi 2014 baisse des loyers : caution max 2 mois.
            2. Frais agence : max 1 mois ou 5% vente.
            3. Parle Français et Wolof.
            4. Si l'utilisateur parle Wolof, réponds en Wolof.
            `;

            const response = await getChatCompletion(systemPrompt + "\nUser: " + userText);
            setMessages(prev => [...prev, { text: response || "Je n'ai pas compris.", isBot: true }]);
        } catch (err) {
            setMessages(prev => [...prev, { text: "Erreur de connexion.", isBot: true }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            {isOpen ? (
                <div className={styles.chatWindow}>
                    <div className={styles.header}>
                        <span>Assistant Juridique</span>
                        <button onClick={toggleOpen} className={styles.closeBtn}><X size={18} /></button>
                    </div>
                    <div className={styles.messages}>
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`${styles.message} ${msg.isBot ? styles.bot : styles.user}`}>
                                {msg.text}
                            </div>
                        ))}
                    </div>
                    <form onSubmit={handleSend} className={styles.inputArea}>
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Écrivez un message..."
                            className={styles.input}
                        />
                        <button type="submit" className={styles.sendBtn}><Send size={18} /></button>
                    </form>
                </div>
            ) : (
                <button onClick={toggleOpen} className={styles.floatBtn}>
                    <MessageCircle size={28} />
                    <span className={styles.tooltip}>Besoin d'aide ?</span>
                </button>
            )}
        </div>
    );
}
