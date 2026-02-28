'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User } from 'lucide-react';
import styles from './LegalAssistantChat.module.css';

export default function LegalAssistantChat() {
    const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([
        { content: 'Bonjour ! Je suis votre assistant immobilier et juridique. Posez-moi vos questions sur le droit immobilier, les contrats ou les procédures au Sénégal.', role: 'assistant' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(true);
    const [suggestionCategory, setSuggestionCategory] = useState<string>('Dakar');

    const suggestedCategories: Record<string, string[]> = {
        'Dakar': [
            "Villa avec piscine à Ouakam",
            "Alternative aux Almadies ?",
            "Studio climatisé à Mermoz",
            "Terrain à vendre à Diamniadio",
            "Bureau luxueux au Plateau"
        ],

        'Petite Côte': [
            "Villa vacances avec piscine à Saly",
            "Terrain bord de mer Ngaparou",
            "Maison à vendre à Mbour",
            "Appartement Saly Portudal",
            "Maison Somone proche lagune"
        ],
        'Budget & Types': [
            "Villa à moins de 100 millions",
            "Appartement à 300 000 CFA/mois",
            "Immeuble de rapport à Dakar",
            "Terrain titre foncier direct",
            "Maison avec panneaux solaires"
        ],
        'Juridique': [
            "Frais de notaire pour une villa ?",
            "Loi sur le Domaine National",
            "Mutation titre foncier étapes",
            "Authenticité d'un bail ?",
            "Amendes construction sans permis"
        ]
    };


    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const resetChat = () => {
        setMessages([
            { content: 'Bonjour ! Je suis votre assistant immobilier et juridique. Posez-moi vos questions sur le droit immobilier, les contrats ou les procédures au Sénégal.', role: 'assistant' }
        ]);
        setInput('');
        setIsLoading(false);
    };

    const handleSuggestionClick = (q: string) => {
        setInput(q);
        setShowSuggestions(false);
    };

    const handleSend = async (e: React.FormEvent) => {

        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userText = input;
        const userMsg = { content: userText, role: 'user' as const };

        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsLoading(true);

        try {
            if (!process.env.NEXT_PUBLIC_OPENAI_API_KEY) {
                setTimeout(() => {
                    let botText = "Je peux vous aider à trouver le bien idéal.";
                    const lower = userText.toLowerCase();

                    // Advanced Mock Property Search
                    const locations = ['ouakam', 'almadies', 'mermoz', 'plateau', 'ngor', 'saly', 'mbour', 'thiès', 'diamniadio', 'sacre-coeur'];
                    const types = ['villa', 'appartement', 'maison', 'terrain', 'bureau'];
                    const amenities = ['piscine', 'jardin', 'clim', 'garage', 'vue mer'];

                    const alternatives: Record<string, string> = {
                        'almadies': 'Ngor ou Yoff',
                        'ouakam': 'Mermoz ou Sacré-Cœur',
                        'plateau': 'Fann Hock',
                        'saly': 'Ngaparou ou Somone',
                        'thiès': 'Diamniadio (plus proche de Dakar)'
                    };

                    // Advanced Enrichment: Professional Acronyms & Lifestyles
                    const villaSynonyms = ['villa', 'maison de luxe', 'propriété', 'grande maison', 'keur', 'r+1', 'r+2', 'clés en main', 'gros oeuvre'];
                    const apartmentSynonyms = ['appartement', 'appart', 'standing', 'studio', 'logement', 'f3', 'f4', 'sicap', 'hlm'];
                    const landSynonyms = ['terrain', 'parcelle', 'site', 'verger', 'titre foncier', 'tf', 'bail', 'nicad'];

                    const stressKeywords = ['urgent', 'vite', 'immédiat', 'rapidement', 'pressé'];
                    const lifestyleKeywords = {
                        calm: ['calme', 'tranquille', 'paisible', 'résidentiel'],
                        business: ['vdn', 'plateau', 'business', 'bureau', 'proche route'],
                        ocean: ['mer', 'plage', 'corniche', 'océan', 'vue mer']
                    };

                    const lowerText = lower;
                    const isStressed = stressKeywords.some(w => lowerText.includes(w));
                    const isLookingForLand = landSynonyms.some(s => lowerText.includes(s));
                    const containsVilla = villaSynonyms.some(s => lowerText.includes(s));
                    const containsApartment = apartmentSynonyms.some(s => lowerText.includes(s));

                    const detectedLifestyle = Object.keys(lifestyleKeywords).find(key =>
                        lifestyleKeywords[key as keyof typeof lifestyleKeywords].some(w => lowerText.includes(w))
                    );

                    const intents: RegExp[] = [/je cherche/i, /je veux/i, /je souhaiterais/i, /trouve-moi/i, /recherche de/i, /disponible/i];
                    const isSearchIntent = intents.some((regex: RegExp) => regex.test(lowerText));

                    const foundLocation = locations.find(l => lowerText.includes(l));
                    const foundType = isLookingForLand ? 'terrain' : (containsVilla ? 'villa' : (containsApartment ? 'appartement' : types.find(t => lowerText.includes(t))));
                    const foundAmenity = amenities.find(a => lowerText.includes(a));

                    if (foundLocation && (foundType || isSearchIntent)) {
                        const displayType = foundType || 'bien';

                        if (isStressed) botText = "Je comprends parfaitement l'urgence. Pour un dossier prioritaire à **" + foundLocation.toUpperCase() + "**, voici ce que nous pouvons faire. ";
                        else if (detectedLifestyle === 'calm') botText = "Le calme est précieux. Le quartier de **" + foundLocation.toUpperCase() + "** est justement réputé pour sa tranquillité. ";
                        else if (detectedLifestyle === 'ocean') botText = "Rien ne vaut la proximité de l'Atlantique. C'est un excellent choix d'investissement. ";
                        else botText = "C'est une excellente zone pour votre projet. ";

                        botText += `On part sur une recherche de **${displayType}**. `;

                        if (isLookingForLand || lowerText.includes('tf') || lowerText.includes('bail') || lowerText.includes('titre')) {
                            botText += "\n\n⚖️ **Expertise Foncière :** ";
                            if (lowerText.includes('tf') || lowerText.includes('titre foncier')) {
                                botText += "L'achat d'un bien avec **Titre Foncier (TF)** est la forme de propriété la plus sécurisée au Sénégal. Nous devrons demander un état de droits réels récent à la conservation foncière.";
                            } else if (lowerText.includes('bail')) {
                                botText += "Pour un **Bail**, vérifiez bien si c'est un bail de l'État. Saviez-vous que vous pouvez entamer une procédure de transformation de bail en Titre Foncier (Loi 2011-07) ?";
                            } else if (lowerText.includes('domaine national') || lowerText.includes('délibération')) {
                                botText += "Attention, les terres du **Domaine National** (Loi 64-46) sont régies par des délibérations. Nous recommandons une régularisation pour sécuriser votre investissement.";
                            } else {
                                botText += "S'agit-il d'un **Titre Foncier**, d'un **Bail** ou d'une simple **Délibération** ? La sécurisation de votre investissement dépend du numéro **NICAD** que nous allons vérifier.";
                            }
                        }

                        if (alternatives[foundLocation]) {
                            botText += `\n\n💡 **Option Alternative :** Si vous ne trouvez pas exactement ce que vous voulez, je vous recommande vivement d'explorer **${alternatives[foundLocation]}**, souvent plus accessible et en plein développement.`;
                        }

                        botText += `\n\n**Question technique :** Souhaitez-vous un bien **"Clé en main"** ou du **"Gros œuvre"** ? Et quelle est votre exigence sur l'accessibilité cadastrale ?`;
                    } else if (lower.includes('notaire') || lower.includes('frais')) {

                        botText = "Les frais de notaire au Sénégal s'élèvent généralement à environ 15-17% du prix de vente pour les terrains nus, et environ 10% pour les biens bâtis. Cela inclut les droits d'enregistrement et les émoluments.";
                    } else if (lower.includes('bail') || lower.includes('contrat')) {
                        botText = "Un contrat de bail au Sénégal doit être écrit et enregistré aux impôts pour être valide. Je peux vous lister les clauses obligatoires si vous le souhaitez.";
                    } else if (lower.includes('prix') || lower.includes('combien') || lower.includes('million')) {
                        botText = "Les prix varient énormément. Par exemple, un terrain aux Almadies peut dépasser 1 million FCFA/m², tandis qu'à Diamniadio, on trouve encore des opportunités beaucoup plus abordables.";
                    } else if (lower.includes('bonjour') || lower.includes('salut')) {
                        botText = "Bonjour ! Je suis l'assistant Diwaan. Que recherchez-vous aujourd'hui : une villa, un appartement ou un terrain ?";
                    } else {
                        botText = "C'est une excellente requête. Pour ce type de recherche spécifique, je vous recommande de filtrer nos résultats sur la page principale ou de me donner votre budget approximatif pour que je puisse mieux vous orienter.";
                    }

                    setMessages(prev => [...prev, { content: botText, role: 'assistant' }]);
                    setIsLoading(false);
                }, 1000);
                return;
            }


            const { getChatCompletion } = await import('@/lib/openai');

            // Send history up to last 10 messages to keep context without hitting token limits easily
            const history = [...messages, userMsg].map(m => ({
                role: m.role as 'user' | 'assistant' | 'system',
                content: m.content
            }));

            const response = await getChatCompletion(history);

            if (response === null) {
                throw new Error("API Response was null");
            }

            setMessages(prev => [...prev, { content: response || "Je n'ai pas compris.", role: 'assistant' }]);

        } catch (err) {
            console.error(err);
            setMessages(prev => [...prev, { content: "Désolé, j'ai rencontré une erreur technique. Toutefois, pour acheter un terrain, n'oubliez pas de vérifier le titre foncier.", role: 'assistant' }]);
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className={styles.container}>
            <div className={styles.messages}>
                <div style={{ display: 'flex', justifyContent: 'flex-end', paddingBottom: '10px' }}>
                    <button onClick={resetChat} className={styles.resetBtn} title="Réinitialiser la conversation">
                        Effacer l'historique
                    </button>
                </div>
                {messages.map((msg, idx) => (
                    <div key={idx} className={`${styles.message} ${msg.role === 'assistant' ? styles.bot : styles.user}`}>
                        <div className={styles.avatar}>
                            {msg.role === 'assistant' ? <Bot size={18} /> : <User size={18} />}
                        </div>
                        <div className={styles.content}>
                            {msg.content}
                        </div>
                    </div>
                ))}

                {isLoading && (
                    <div className={`${styles.message} ${styles.bot}`}>
                        <div className={styles.avatar}>
                            <Bot size={18} />
                        </div>
                        <div className={styles.content}>
                            <span style={{ fontStyle: 'italic', color: 'var(--text-secondary)' }}>Analyse en cours...</span>
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
                                {cat}
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
