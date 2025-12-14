import LegalAssistantChat from "@/components/LegalAssistantChat";
import { Book, FileText, Scale, ExternalLink } from "lucide-react";
import Link from "next/link";

export const metadata = {
    title: "Assistant Juridique IA | Diwaan",
    description: "Obtenez des réponses instantanées à vos questions sur l'immobilier et le droit au Sénégal.",
};

export default function LegalAssistantPage() {
    return (
        <div style={{ padding: '40px 24px', minHeight: 'calc(10vh - 80px)', backgroundColor: 'var(--muted)' }}>
            <div className="container">
                <div style={{ marginBottom: '40px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '24px', marginBottom: '16px', flexWrap: 'wrap' }}>
                        <h1 style={{ fontSize: '32px', margin: 0, color: 'var(--secondary)' }}>Expertise Juridique Instantanée</h1>
                        <Link href="/guides" style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            color: '#ff5722',
                            fontWeight: 'bold',
                            fontSize: '20px',
                            textDecoration: 'none',
                            background: 'white',
                            padding: '8px 16px',
                            borderRadius: '100px',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                        }}>
                            Voir tous les guides <ExternalLink size={24} />
                        </Link>
                    </div>
                    <p style={{ fontSize: '18px', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
                        Notre intelligence artificielle est formée sur le code de l'urbanisme et la législation immobilière sénégalaise pour vous guider.
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px', alignItems: 'start' }}>
                    {/* Main Chat Area */}
                    <div style={{ maxWidth: '800px', width: '100%' }}>
                        <div style={{
                            background: '#e0edff',
                            border: '1px solid #cce0ff',
                            borderRadius: '12px',
                            padding: '20px',
                            marginBottom: '24px',
                            display: 'flex',
                            gap: '16px',
                            alignItems: 'center'
                        }}>
                            <div style={{
                                width: '50px',
                                height: '50px',
                                background: 'white',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '24px'
                            }}>
                                🤖
                            </div>
                            <div>
                                <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '4px', color: '#0044aa' }}>Bienvenue !</h3>
                                <p style={{ fontSize: '14px', margin: 0, color: '#333' }}>
                                    Bonjour ! Je suis votre assistant immobilier et juridique. Posez-moi vos questions sur le droit immobilier, les contrats ou les procédures au Sénégal.
                                </p>
                            </div>
                        </div>

                        <div style={{ height: '600px', background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                            <LegalAssistantChat />
                        </div>

                        <div style={{ marginTop: '24px', fontSize: '13px', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                            <p>Note : Cet assistant fournit des informations basées sur les textes officiels mais ne remplace pas une consultation formelle avec un notaire ou un avocat.</p>
                        </div>
                    </div>

                    {/* Sidebar: Lois et Textes */}
                    <div style={{ background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', border: '1px solid var(--border)' }}>
                        <h2 style={{ fontSize: '20px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--primary)' }}>
                            <Scale size={24} />
                            Législation Foncière
                        </h2>

                        <div style={{ marginBottom: '30px' }}>
                            <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '12px', textTransform: 'uppercase', color: '#666' }}>
                                Lois Fondamentales
                            </h3>
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                <li style={{ marginBottom: '12px' }}>
                                    <Link href="/documents/loi-64-46.pdf" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', gap: '10px', textDecoration: 'none', color: 'inherit', alignItems: 'start' }}>
                                        <Book size={18} style={{ color: 'var(--primary)', flexShrink: 0, marginTop: '2px' }} />
                                        <div>
                                            <div style={{ fontWeight: '600', fontSize: '14px' }}>Loi n° 64-46 du 17 juin 1964</div>
                                            <div style={{ fontSize: '13px', color: '#666' }}>Relative au Domaine National (Réforme foncière majeure).</div>
                                        </div>
                                    </Link>
                                </li>
                                <li style={{ marginBottom: '12px' }}>
                                    <Link href="/documents/loi-2011-07.pdf" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', gap: '10px', textDecoration: 'none', color: 'inherit', alignItems: 'start' }}>
                                        <Book size={18} style={{ color: 'var(--primary)', flexShrink: 0, marginTop: '2px' }} />
                                        <div>
                                            <div style={{ fontWeight: '600', fontSize: '14px' }}>Loi n° 2011-07 du 30 mars 2011</div>
                                            <div style={{ fontSize: '13px', color: '#666' }}>Portant régime de la Propriété Foncière (Titres Fonciers).</div>
                                        </div>
                                    </Link>
                                </li>
                                <li style={{ marginBottom: '12px' }}>
                                    <Link href="/documents/code-urbanisme-2023.pdf" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', gap: '10px', textDecoration: 'none', color: 'inherit', alignItems: 'start' }}>
                                        <Book size={18} style={{ color: 'var(--primary)', flexShrink: 0, marginTop: '2px' }} />
                                        <div>
                                            <div style={{ fontWeight: '600', fontSize: '14px' }}>Code de l'Urbanisme (2023)</div>
                                            <div style={{ fontSize: '13px', color: '#666' }}>Loi n° 2023-20 régissant l'aménagement et les constructions.</div>
                                        </div>
                                    </Link>
                                </li>
                                <li style={{ marginBottom: '12px' }}>
                                    <Link href="/documents/code-domaine-etat.pdf" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', gap: '10px', textDecoration: 'none', color: 'inherit', alignItems: 'start' }}>
                                        <Book size={18} style={{ color: 'var(--primary)', flexShrink: 0, marginTop: '2px' }} />
                                        <div>
                                            <div style={{ fontWeight: '600', fontSize: '14px' }}>Code du Domaine de l'État</div>
                                            <div style={{ fontSize: '13px', color: '#666' }}>Loi n° 76-66 du 2 juillet 1976.</div>
                                        </div>
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '12px', textTransform: 'uppercase', color: '#666' }}>
                                Textes Réglementaires
                            </h3>
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                <li style={{ marginBottom: '12px' }}>
                                    <Link href="/documents/decret-2009-1450.pdf" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', gap: '10px', textDecoration: 'none', color: 'inherit', alignItems: 'start' }}>
                                        <FileText size={18} style={{ color: '#006AFF', flexShrink: 0, marginTop: '2px' }} />
                                        <div>
                                            <div style={{ fontWeight: '600', fontSize: '14px' }}>Décret n° 2009-1450</div>
                                            <div style={{ fontSize: '13px', color: '#666' }}>Partie réglementaire du Code de l'Urbanisme.</div>
                                        </div>
                                    </Link>
                                </li>
                                <li style={{ marginBottom: '12px' }}>
                                    <Link href="/documents/decret-72-1288.pdf" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', gap: '10px', textDecoration: 'none', color: 'inherit', alignItems: 'start' }}>
                                        <FileText size={18} style={{ color: '#006AFF', flexShrink: 0, marginTop: '2px' }} />
                                        <div>
                                            <div style={{ fontWeight: '600', fontSize: '14px' }}>Décret n° 72-1288</div>
                                            <div style={{ fontSize: '13px', color: '#666' }}>Conditions d'affectation et de désaffectation des terres.</div>
                                        </div>
                                    </Link>
                                </li>
                                <li style={{ marginBottom: '12px' }}>
                                    <Link href="/documents/bareme-transactions.pdf" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', gap: '10px', textDecoration: 'none', color: 'inherit', alignItems: 'start' }}>
                                        <FileText size={18} style={{ color: '#006AFF', flexShrink: 0, marginTop: '2px' }} />
                                        <div>
                                            <div style={{ fontWeight: '600', fontSize: '14px' }}>Barème des Transactions</div>
                                            <div style={{ fontSize: '13px', color: '#666' }}>Frais de notaire et droits d'enregistrement (CGI).</div>
                                        </div>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
