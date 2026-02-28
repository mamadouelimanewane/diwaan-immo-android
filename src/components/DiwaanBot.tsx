'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles, Home, Scale, Info } from 'lucide-react';
import styles from './DiwaanBot.module.css';

interface Message {
    role: 'user' | 'assistant';
    content: string;
    data?: any[];
}

export default function DiwaanBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { role: 'assistant', content: 'Bonjour ! Je suis **Diwaan AI**. Votre assistant intelligent pour l\'immobilier au Sénégal. Comment puis-je vous éclairer aujourd\'hui ?' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const suggestions = [
        { text: 'Caution loyer ?', icon: <Scale size={14} /> },
        { text: 'Appartement Dakar', icon: <Home size={14} /> },
        { text: 'Frais de notaire', icon: <Info size={14} /> },
    ];

    const toggleOpen = () => setIsOpen(!isOpen);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, isLoading]);

    const handleSend = async (text?: string) => {
        const messageText = text || input;
        if (!messageText.trim() || isLoading) return;

        const newMessages: Message[] = [...messages, { role: 'user', content: messageText }];
        setMessages(newMessages);
        setInput('');
        setIsLoading(true);

        try {
            const response = await fetch('/api/ai/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: newMessages.map(m => ({ role: m.role, content: m.content }))
                })
            });

            const data = await response.json();

            if (data.error) throw new Error(data.error);

            setMessages(prev => [...prev, {
                role: 'assistant',
                content: data.message,
                data: data.data // Property search results
            }]);
        } catch (err) {
            console.error(err);
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: 'Désolé, je rencontre une petite zone de turbulence technique. Posez-moi votre question à nouveau ?'
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    // Helper to render markdown-like bold text (simple version)
    const renderContent = (content: string) => {
        return content.split('**').map((part, i) =>
            i % 2 === 1 ? <strong key={i}>{part}</strong> : part
        );
    };

    return (
        <div className={styles.container}>
            {isOpen ? (
                <div className={styles.chatWindow}>
                    <div className={styles.header}>
                        <div className={styles.headerInfo}>
                            <div className={styles.statusIcon}></div>
                            <div className={styles.title}>Diwaan AI</div>
                            <Sparkles size={16} color="#FFD700" />
                        </div>
                        <button onClick={toggleOpen} className={styles.closeBtn}>
                            <X size={18} />
                        </button>
                    </div>

                    <div className={styles.messages}>
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`${styles.message} ${msg.role === 'assistant' ? styles.bot : styles.user}`}>
                                {renderContent(msg.content)}

                                {msg.data && msg.data.length > 0 && (
                                    <div className={styles.propertyResults}>
                                        {msg.data.map((prop: any) => (
                                            <div key={prop.id} className={styles.propertyCard}>
                                                {prop.images && prop.images[0] && (
                                                    <img src={prop.images[0]} alt={prop.title} className={styles.propertyImg} />
                                                )}
                                                <div className={styles.propertyInfo}>
                                                    <div className={styles.propertyTitle}>{prop.title}</div>
                                                    <div className={styles.propertyPrice}>
                                                        {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XOF' }).format(prop.price)}
                                                    </div>
                                                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{prop.city}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                        {isLoading && (
                            <div className={`${styles.message} ${styles.bot} ${styles.typing}`}>
                                <div className={styles.dot}></div>
                                <div className={styles.dot}></div>
                                <div className={styles.dot}></div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className={styles.inputArea}>
                        <div className={styles.suggestions}>
                            {suggestions.map((s, i) => (
                                <button
                                    key={i}
                                    className={styles.suggestionBtn}
                                    onClick={() => handleSend(s.text)}
                                >
                                    {s.icon} <span style={{ marginLeft: '4px' }}>{s.text}</span>
                                </button>
                            ))}
                        </div>
                        <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className={styles.inputWrapper}>
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Posez votre question..."
                                className={styles.input}
                            />
                            <button type="submit" className={styles.sendBtn} disabled={isLoading || !input.trim()}>
                                <Send size={18} />
                            </button>
                        </form>
                    </div>
                </div>
            ) : (
                <button onClick={toggleOpen} className={styles.floatBtn}>
                    <MessageCircle size={32} />
                    <span className={styles.tooltip}>Conseil & Recherche IA</span>
                </button>
            )}
        </div>
    );
}
