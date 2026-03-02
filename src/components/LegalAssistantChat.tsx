'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, RotateCcw } from 'lucide-react';
import styles from './LegalAssistantChat.module.css';

// ─── Knowledge Base (fallback only when API is completely down) ──────────────
const LEGAL_KB: Record<string, string> = {
    'titre foncier': `📜 Le Titre Foncier (TF) est le document le plus sécurisé au Sénégal.\n\n• Il confère un droit de propriété définitif et inattaquable (Loi n° 2011-07 du 30 mars 2011).\n• Délivré par la Conservation de la Propriété Foncière.\n• Pour vérifier un TF, demandez un État de droits réels récent.\n• Moins de 3% des terres au Sénégal disposent d'un TF.\n\n💡 Conseil Diwaan : Avant tout achat, exigez une copie certifiée du TF et vérifiez qu'il n'y a pas d'hypothèque inscrite.`,
    'domaine national': `📜 Le Domaine National (Loi n° 64-46 du 17 juin 1964)\n\nCette loi regroupe environ 95% des terres du Sénégal, classées en 4 zones :\n\n1. Zones urbaines – Gérées par les communes\n2. Zones classées – Forêts et espaces protégés\n3. Zones de terroir – Terres agricoles et pastorales\n4. Zones pionnières – Projets de développement\n\n⚠️ Les terres du Domaine National ne peuvent pas être vendues. On obtient un droit d'usage par délibération du conseil municipal.\n\n💡 Conseil : Envisagez une procédure de régularisation vers un bail ou un TF.`,
    'bail': `📜 Le Bail Foncier au Sénégal\n\n• Bail ordinaire – Durée limitée (3, 6, 9 ans), renouvelable.\n• Bail emphytéotique – Durée de 18 à 99 ans (Loi n° 76-66).\n• Bail commercial – Protection du locataire commerçant.\n\n🔄 Transformation Bail → TF : Depuis la Loi 2011-07, un bail peut être transformé en Titre Foncier.`,
    'nicad': `📜 Le NICAD (Numéro d'Identification Cadastrale)\n\nIdentifiant unique de chaque parcelle dans le système cadastral.\n• Obligatoire pour toute transaction foncière formelle.\n• Délivré par la Direction du Cadastre.\n\n💡 Un terrain sans NICAD est suspect. Exigez-le systématiquement.`,
    'notaire': `📜 Frais de Notaire au Sénégal\n\nTerrains nus : environ 15-17% du prix\nBiens bâtis : environ 10-12% du prix\n\nCela inclut :\n• Droits d'enregistrement (5-10%)\n• Émoluments notaire (3-5%)\n• Conservation foncière (1-2%)`,
    'mutation': `📜 La Mutation Foncière\n\nÉtapes :\n1. Acte de vente chez le notaire\n2. Droits d'enregistrement (Direction des Impôts)\n3. Publication au Journal Officiel (30 jours)\n4. Inscription à la Conservation Foncière\n5. Nouveau Titre Foncier\n\nDélai : 3 à 6 mois`,
    'permis de construire': `📜 Permis de Construire (Code de l'Urbanisme 2023)\n\nDossier :\n• Copie du TF ou Bail\n• Plans architecturaux (architecte agréé)\n• Certificat d'urbanisme\n\nDélai d'instruction : 45 jours\n\n⚠️ Sans permis : amende de 500 000 à 5 000 000 FCFA`,
};

function generateFallbackResponse(userText: string): string {
    const lower = userText.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    if (/^(bonjour|salut|bonsoir|hello|hi|hey|coucou)/i.test(lower)) {
        return `Bonjour ! 👋 Je suis Diwaan AI Expert, votre assistant immobilier et juridique.\n\nJe peux vous aider à :\n🏠 Rechercher un bien (villa, appartement, terrain)\n⚖️ Comprendre le droit foncier sénégalais\n💰 Estimer les prix et frais\n📋 Expliquer les procédures\n\nQue puis-je faire pour vous ?`;
    }

    for (const [key, value] of Object.entries(LEGAL_KB)) {
        if (lower.includes(key.replace(/[éèê]/g, 'e'))) return value;
    }

    if (lower.includes('notaire') || lower.includes('frais')) return LEGAL_KB['notaire'];
    if (lower.includes('loi') || lower.includes('legislation') || lower.includes('code')) {
        return `📜 Corpus Juridique Foncier du Sénégal\n\nLois fondamentales :\n• Loi n° 64-46 (1964) – Domaine National\n• Loi n° 76-66 (1976) – Code du Domaine de l'État\n• Loi n° 2011-07 (2011) – Propriété Foncière\n• Loi n° 2023-20 – Code de l'Urbanisme\n\nDécrets :\n• Décret du 26 juillet 1932 – Propriété foncière\n• Décret n° 72-1288 – Affectation des terres\n\nSur quel texte souhaitez-vous des précisions ?`;
    }

    return `Merci pour votre question ! Je suis spécialisé en immobilier et droit foncier au Sénégal.\n\n🏠 Recherche immobilière – Dites-moi le type et la zone\n⚖️ Droit foncier – Titres fonciers, baux, domaine national\n💰 Estimation – Frais de notaire, prix par zone\n📋 Procédures – Permis, mutation, transformation de bail\n\nReformulez votre question et je ferai de mon mieux !`;
}

// ─── Component ──────────────────────────────────────────────────────────────────
export default function LegalAssistantChat() {
    const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([
        { content: 'Bonjour ! 👋 Je suis Diwaan AI Expert, votre assistant immobilier et juridique intelligent. Posez-moi vos questions sur les biens, le droit foncier, les prix ou les procédures au Sénégal.', role: 'assistant' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(true);
    const [suggestionCategory, setSuggestionCategory] = useState<string>('Dakar');

    const suggestedCategories: Record<string, string[]> = {
        'Dakar': [
            "Villa avec piscine à Ouakam",
            "Appartement aux Almadies",
            "Studio à louer à Mermoz",
            "Bureau au Plateau",
            "Terrain à Diamniadio"
        ],
        'Petite Côte': [
            "Villa vacances à Saly",
            "Terrain bord de mer Mbour",
            "Investir à Ngaparou",
            "Maison Somone",
            "Prix terrain Saly"
        ],
        'Juridique': [
            "C'est quoi un Titre Foncier ?",
            "Frais de notaire pour une villa",
            "Différence Bail et Titre Foncier",
            "Comment obtenir un permis de construire ?",
            "Qu'est-ce que le Domaine National ?",
            "C'est quoi le NICAD ?",
            "Étapes pour acheter un terrain"
        ],
        'Budget': [
            "Villa à moins de 100 millions",
            "Appartement à 300 000 CFA/mois",
            "Combien coûte une mutation ?",
            "Viabilisation d'un terrain",
            "Quartier le moins cher à Dakar"
        ]
    };

    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => { scrollToBottom(); }, [messages]);

    const resetChat = () => {
        setMessages([
            { content: 'Bonjour ! 👋 Je suis Diwaan AI Expert, votre assistant immobilier et juridique intelligent. Posez-moi vos questions sur les biens, le droit foncier, les prix ou les procédures au Sénégal.', role: 'assistant' }
        ]);
        setInput('');
        setIsLoading(false);
        setShowSuggestions(true);
    };

    const handleSuggestionClick = (q: string) => {
        setInput('');
        setShowSuggestions(false);
        handleSendDirect(q);
    };

    const handleSendDirect = async (text: string) => {
        if (!text.trim() || isLoading) return;
        const userMsg = { content: text, role: 'user' as const };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsLoading(true);

        try {
            // ── Call the REAL API route /api/ai/chat ──────────────────
            const apiMessages = [...messages, userMsg].slice(-12).map(m => ({
                role: m.role,
                content: m.content
            }));

            const response = await fetch('/api/ai/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: apiMessages })
            });

            if (!response.ok) {
                throw new Error(`API Error: ${response.status}`);
            }

            const data = await response.json();

            if (data.error) {
                throw new Error(data.error);
            }

            let botText = data.message || "Je n'ai pas pu traiter votre demande.";

            // If the API returned property data, format it nicely
            if (data.data && Array.isArray(data.data) && data.data.length > 0) {
                botText += '\n\n🏠 Biens trouvés :';
                data.data.forEach((prop: any, idx: number) => {
                    const priceFormatted = prop.price
                        ? new Intl.NumberFormat('fr-FR').format(prop.price) + ' FCFA'
                        : 'Prix sur demande';
                    botText += `\n${idx + 1}. ${prop.title} – ${priceFormatted} (${prop.city || ''})`;
                });
            }

            setMessages(prev => [...prev, { content: botText, role: 'assistant' }]);

        } catch (err) {
            console.error('Chat API Error:', err);
            // ── Fallback to local knowledge base ───────────────────
            const fallback = generateFallbackResponse(text);
            setMessages(prev => [...prev, {
                content: fallback,
                role: 'assistant'
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;
        handleSendDirect(input);
    };

    // ── Render bold markdown ─────────────────────────────────────
    const renderContent = (text: string) => {
        const parts = text.split(/(\*\*[^*]+\*\*)/g);
        return parts.map((part, i) => {
            if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={i}>{part.slice(2, -2)}</strong>;
            }
            return <span key={i}>{part}</span>;
        });
    };

    return (
        <div className={styles.container}>
            <div className={styles.messages}>
                <div style={{ display: 'flex', justifyContent: 'flex-end', paddingBottom: '10px' }}>
                    <button onClick={resetChat} className={styles.resetBtn} title="Réinitialiser la conversation">
                        <RotateCcw size={14} style={{ marginRight: '4px' }} /> Nouveau chat
                    </button>
                </div>
                {messages.map((msg, idx) => (
                    <div key={idx} className={`${styles.message} ${msg.role === 'assistant' ? styles.bot : styles.user}`}>
                        <div className={styles.avatar}>
                            {msg.role === 'assistant' ? <Bot size={18} /> : <User size={18} />}
                        </div>
                        <div className={styles.content}>
                            {renderContent(msg.content)}
                        </div>
                    </div>
                ))}

                {isLoading && (
                    <div className={`${styles.message} ${styles.bot}`}>
                        <div className={styles.avatar}>
                            <Bot size={18} />
                        </div>
                        <div className={styles.content}>
                            <span className={styles.typingIndicator}>
                                <span></span><span></span><span></span>
                            </span>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {showSuggestions && (
                <div className={styles.suggestionsContainer}>
                    <div className={styles.suggestionTabs}>
                        {Object.keys(suggestedCategories).map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSuggestionCategory(cat)}
                                className={`${styles.tabBtn} ${suggestionCategory === cat ? styles.activeTab : ''}`}
                            >
                                {cat === 'Dakar' ? '🏘️ ' : cat === 'Petite Côte' ? '🏖️ ' : cat === 'Juridique' ? '⚖️ ' : '💰 '}{cat}
                            </button>
                        ))}
                    </div>
                    <div className={styles.suggestions}>
                        {suggestedCategories[suggestionCategory].map((q, i) => (
                            <button key={i} onClick={() => handleSuggestionClick(q)} className={styles.suggestionBtn}>
                                {q}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            <form onSubmit={handleSend} className={styles.inputArea}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => { setInput(e.target.value); setShowSuggestions(false); }}
                    placeholder="Ex: Villa à Ouakam / C'est quoi un Titre Foncier ?..."
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
