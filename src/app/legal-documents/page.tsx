'use client';

import { useState } from 'react';
import Link from 'next/link';
import contractTemplates from '@/lib/contractTemplates';

export default function LegalDocumentsPage() {
    const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
    const [showGenerator, setShowGenerator] = useState(false);
    const [generatedContract, setGeneratedContract] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [formData, setFormData] = useState({
        type: 'vente',
        sellerName: '',
        buyerName: '',
        propertyAddress: '',
        price: '',
        date: new Date().toISOString().split('T')[0],
        sellerAddress: '',
        buyerAddress: '',
        sqft: '',
        beds: '',
        baths: '',
        invoiceNumber: 'CONT-' + Date.now(),
    });

    const templates = [
        {
            id: 'vente',
            name: 'Contrat de Vente Immobilière',
            icon: '🏠',
            description: 'Contrat complet pour la vente d\'un bien immobilier au Sénégal',
            category: 'Vente',
            tags: ['Vente', 'Propriété', 'Acte de vente']
        },
        {
            id: 'location',
            name: 'Bail de Location',
            icon: '🔑',
            description: 'Contrat de location résidentielle conforme au droit sénégalais',
            category: 'Location',
            tags: ['Location', 'Bail', 'Logement']
        },
        {
            id: 'location-commerciale',
            name: 'Bail Commercial',
            icon: '🏢',
            description: 'Contrat de location pour locaux commerciaux et bureaux',
            category: 'Location',
            tags: ['Commercial', 'Bureau', 'Local']
        },
        {
            id: 'promesse-vente',
            name: 'Promesse de Vente',
            icon: '📝',
            description: 'Engagement préalable à la vente d\'un bien immobilier',
            category: 'Vente',
            tags: ['Promesse', 'Avant-contrat']
        },
        {
            id: 'mandat-vente',
            name: 'Mandat de Vente Exclusif',
            icon: '🤝',
            description: 'Contrat entre propriétaire et agent immobilier',
            category: 'Mandat',
            tags: ['Agent', 'Mandat', 'Exclusif']
        },
        {
            id: 'compromis',
            name: 'Compromis de Vente',
            icon: '✍️',
            description: 'Avant-contrat définitif avec conditions suspensives',
            category: 'Vente',
            tags: ['Compromis', 'Avant-contrat']
        },
        {
            id: 'etat-lieux',
            name: 'État des Lieux',
            icon: '📋',
            description: 'Constat détaillé de l\'état du bien loué',
            category: 'Location',
            tags: ['État des lieux', 'Inventaire']
        },
        {
            id: 'quittance',
            name: 'Quittance de Loyer',
            icon: '💰',
            description: 'Reçu officiel de paiement de loyer',
            category: 'Location',
            tags: ['Paiement', 'Quittance']
        },
    ];

    const handleGenerateContract = async () => {
        setIsGenerating(true);

        // Simulation génération IA (2 secondes)
        setTimeout(() => {
            let contract = '';

            // Utiliser les vrais templates
            if (formData.type === 'vente' && contractTemplates.vente) {
                contract = contractTemplates.vente(formData);
            } else if (formData.type === 'location' && contractTemplates.location) {
                contract = contractTemplates.location(formData);
            } else {
                // Fallback pour les modèles pas encore implémentés
                contract = generateFallbackContract(formData);
            }

            setGeneratedContract(contract);
            setIsGenerating(false);
        }, 2000);
    };

    const generateFallbackContract = (data: any) => {
        return `📄 CONTRAT - ${data.type.toUpperCase()}

Ce modèle est en cours de finalisation.
Pour l'instant, voici une version simplifiée.

══════════════════════════════════════════════
LES PARTIES
══════════════════════════════════════════════

Partie 1 : ${data.sellerName || '[À COMPLÉTER]'}
Partie 2 : ${data.buyerName || '[À COMPLÉTER]'}

Bien concerné : ${data.propertyAddress || '[À COMPLÉTER]'}
Montant : ${data.price ? parseInt(data.price).toLocaleString() : '[À COMPLÉTER]'} FCFA
Date : ${data.date}

══════════════════════════════════════════════

⚠️  Document simplifié - Version complète en cours d'implémentation
Référence : ${data.invoiceNumber}
Généré par Diwaan IA - ${new Date().toLocaleString('fr-FR')}

📞 Contactez notre support juridique pour assistance personnalisée
`;
    };

    const downloadAsText = () => {
        const element = document.createElement('a');
        const file = new Blob([generatedContract], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = `Contrat_${formData.type}_${formData.invoiceNumber}.txt`;
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };

    const downloadAsPDF = () => {
        // Pour l'instant, télécharge en TXT
        // TODO: Implémenter vraie génération PDF avec jsPDF
        alert('📥 Téléchargement du contrat...\n\nNote : La génération PDF sera disponible prochainement.\nPour l\'instant, vous pouvez télécharger en format texte ou copier le contenu.');
        downloadAsText();
    };

    const generateContractText = (data: any) => {
        if (data.type === 'vente') {
            return `CONTRAT DE VENTE IMMOBILIÈRE

Entre les soussignés :

LE VENDEUR :
Nom : ${data.sellerName || '[NOM DU VENDEUR]'}
Adresse : [ADRESSE COMPLÈTE]
CNI N° : [NUMÉRO CNI]

ET

L'ACHETEUR :
Nom : ${data.buyerName || '[NOM DE L\'ACHETEUR]'}
Adresse : [ADRESSE COMPLÈTE]  
CNI N° : [NUMÉRO CNI]

IL A ÉTÉ CONVENU CE QUI SUIT :

ARTICLE 1 - OBJET DE LA VENTE
Le vendeur cède à l'acheteur, qui accepte, la propriété sise à :
${data.propertyAddress || '[ADRESSE DU BIEN]'}

Référence cadastrale : [RÉFÉRENCE]
Superficie : [SURFACE] m²

ARTICLE 2 - PRIX DE VENTE
Le prix de vente est fixé à la somme de ${data.price || '[PRIX]'} FCFA (${data.price ? convertNumberToWords(parseInt(data.price)) : '[PRIX EN LETTRES]'} francs CFA).

ARTICLE 3 - CONDITIONS DE PAIEMENT
Le prix sera payé comme suit :
- Acompte de 10% lors de la signature : ${data.price ? (parseInt(data.price) * 0.1).toLocaleString() : '[MONTANT]'} FCFA
- Solde à la remise des clés : ${data.price ? (parseInt(data.price) * 0.9).toLocaleString() : '[MONTANT]'} FCFA

ARTICLE 4 - GARANTIE
Le vendeur garantit qu'il est seul et unique propriétaire du bien vendu, libre de toutes charges, hypothèques, ou servitudes non déclarées.

ARTICLE 5 - ÉTAT DU BIEN
Le bien est vendu dans l'état où il se trouve au jour de la visite, l'acheteur déclarant bien le connaître.

ARTICLE 6 - FRAIS
Les frais de notaire, droits d'enregistrement et taxes sont à la charge de l'acheteur.

ARTICLE 7 - PRISE D'EFFET
Le présent contrat prend effet à la date du ${data.date || '[DATE]'}.

Fait à Dakar, le ${new Date().toLocaleDateString('fr-FR')}

En deux exemplaires originaux

LE VENDEUR                           L'ACHETEUR
(Signature)                          (Signature)

---
Document généré par Diwaan IA - Assistant Juridique
⚠️ Ce document doit être vérifié par un notaire avant signature définitive.`;
        } else if (data.type === 'location') {
            return `CONTRAT DE BAIL DE LOCATION

Entre les soussignés :

LE BAILLEUR :
Nom : ${data.sellerName || '[NOM DU PROPRIÉTAIRE]'}

ET

LE LOCATAIRE :
Nom : ${data.buyerName || '[NOM DU LOCATAIRE]'}

ARTICLE 1 - DÉSIGNATION DU LOCAL
Le bailleur loue au locataire les locaux suivants :
${data.propertyAddress || '[ADRESSE DU BIEN]'}

Type : [Appartement/Villa/Studio]
Nombre de pièces : [NOMBRE]

ARTICLE 2 - DURÉE
Le bail est consenti pour une durée de [X] ans à compter du ${data.date || '[DATE]'}.

ARTICLE 3 - LOYER
Le loyer mensuel est fixé à ${data.price || '[MONTANT]'} FCFA, payable d'avance le 1er de chaque mois.

ARTICLE 4 - CHARGES
En sus du loyer, le locataire paiera :
- Eau
- Électricité  
- Entretien parties communes (le cas échéant)

ARTICLE 5 - DÉPÔT DE GARANTIE
Un dépôt de garantie de ${data.price ? (parseInt(data.price) * 2).toLocaleString() : '[MONTANT]'} FCFA (2 mois de loyer) est versé à la signature.

ARTICLE 6 - OBLIGATIONS DU LOCATAIRE
Le locataire s'engage à :
- User du local paisiblement en bon père de famille
- Effectuer les réparations locatives
- Souscrire une assurance habitation
- Ne pas sous-louer sans accord écrit

ARTICLE 7 - RÉSILIATION
Chaque partie peut résilier le bail avec un préavis de 3 mois par lettre recommandée.

Fait à Dakar, le ${new Date().toLocaleDateString('fr-FR')}

LE BAILLEUR                          LE LOCATAIRE
(Signature)                          (Signature)

---
Document généré par Diwaan IA - Assistant Juridique`;
        }
        return 'Contrat en cours de génération...';
    };

    const convertNumberToWords = (num: number): string => {
        // Simplification - à implémenter complètement
        return num.toLocaleString() + ' (conversion en lettres à implémenter)';
    };

    return (
        <div className="container" style={{ padding: '40px 24px', maxWidth: '1200px', margin: '0 auto' }}>
            {/* Header */}
            <div style={{ marginBottom: '40px' }}>
                <h1 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '12px', color: '#1B254B' }}>
                    📄 Documents Juridiques & Contrats
                </h1>
                <p style={{ fontSize: '18px', color: '#666' }}>
                    Modèles de contrats conformes au droit sénégalais + Assistance IA pour personnalisation
                </p>
            </div>

            {/* CTA Generator */}
            <div style={{ background: 'linear-gradient(135deg, #FF6B35 0%, #E63946 100%)', padding: '32px', borderRadius: '16px', marginBottom: '40px', color: 'white' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
                    <div>
                        <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>
                            🤖 Générateur IA de Contrats
                        </h2>
                        <p style={{ opacity: 0.9 }}>
                            Créez un contrat personnalisé en 2 minutes avec l'assistance de notre IA juridique
                        </p>
                    </div>
                    <button
                        onClick={() => setShowGenerator(!showGenerator)}
                        style={{
                            background: 'white',
                            color: '#FF6B35',
                            padding: '16px 32px',
                            borderRadius: '12px',
                            border: 'none',
                            fontWeight: 'bold',
                            fontSize: '16px',
                            cursor: 'pointer',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                        }}
                    >
                        {showGenerator ? '✕ Fermer' : '✨ Générer un Contrat'}
                    </button>
                </div>
            </div>

            {/* AI Generator Form */}
            {showGenerator && (
                <div style={{ background: 'white', padding: '32px', borderRadius: '16px', marginBottom: '40px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
                    <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '24px', color: '#1B254B' }}>
                        Informations du Contrat
                    </h3>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#666' }}>Type de contrat</label>
                            <select
                                value={formData.type}
                                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
                            >
                                <option value="vente">Vente Immobilière</option>
                                <option value="location">Bail de Location</option>
                                <option value="location-commerciale">Bail Commercial</option>
                                <option value="promesse-vente">Promesse de Vente</option>
                            </select>
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#666' }}>
                                {formData.type === 'vente' ? 'Nom du Vendeur' : 'Nom du Propriétaire'}
                            </label>
                            <input
                                type="text"
                                value={formData.sellerName}
                                onChange={(e) => setFormData({ ...formData, sellerName: e.target.value })}
                                placeholder="Prénom Nom"
                                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#666' }}>
                                {formData.type === 'vente' ? 'Nom de l\'Acheteur' : 'Nom du Locataire'}
                            </label>
                            <input
                                type="text"
                                value={formData.buyerName}
                                onChange={(e) => setFormData({ ...formData, buyerName: e.target.value })}
                                placeholder="Prénom Nom"
                                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#666' }}>Adresse du Bien</label>
                            <input
                                type="text"
                                value={formData.propertyAddress}
                                onChange={(e) => setFormData({ ...formData, propertyAddress: e.target.value })}
                                placeholder="Adresse complète"
                                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#666' }}>
                                {formData.type === 'vente' ? 'Prix de Vente (FCFA)' : 'Loyer Mensuel (FCFA)'}
                            </label>
                            <input
                                type="number"
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                placeholder="50000000"
                                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#666' }}>Date</label>
                            <input
                                type="date"
                                value={formData.date}
                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
                            />
                        </div>
                    </div>

                    <button
                        onClick={handleGenerateContract}
                        style={{
                            marginTop: '24px',
                            background: '#FF6B35',
                            color: 'white',
                            padding: '14px 32px',
                            borderRadius: '8px',
                            border: 'none',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            fontSize: '16px'
                        }}
                    >
                        🤖 Générer avec IA
                    </button>

                    {generatedContract && (
                        <div style={{ marginTop: '32px' }}>
                            <h4 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px', color: '#1B254B' }}>
                                📄 Contrat Généré
                            </h4>
                            <div style={{ background: '#F9FAFB', padding: '24px', borderRadius: '12px', border: '1px solid #E5E7EB', whiteSpace: 'pre-wrap', fontFamily: 'monospace', fontSize: '13px', maxHeight: '500px', overflow: 'auto' }}>
                                {generatedContract}
                            </div>
                            <div style={{ display: 'flex', gap: '12px', marginTop: '16px', flexWrap: 'wrap' }}>
                                <button
                                    onClick={downloadAsPDF}
                                    style={{ padding: '12px 24px', background: '#006AFF', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
                                >
                                    📥 Télécharger TXT
                                </button>
                                <button
                                    onClick={() => {
                                        navigator.clipboard.writeText(generatedContract);
                                        alert('✅ Contrat copié dans le presse-papiers !');
                                    }}
                                    style={{ padding: '12px 24px', background: '#eee', color: '#666', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
                                >
                                    📋 Copier
                                </button>
                                <button
                                    onClick={() => {
                                        const printWindow = window.open('', '_blank');
                                        if (printWindow) {
                                            printWindow.document.write('<pre style="font-family: monospace; padding: 20px; white-space: pre-wrap;">' + generatedContract + '</pre>');
                                            printWindow.document.close();
                                            printWindow.print();
                                        }
                                    }}
                                    style={{ padding: '12px 24px', background: 'white', color: '#666', border: '2px solid #ddd', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
                                >
                                    🖨️ Imprimer
                                </button>
                            </div>
                            <div style={{ marginTop: '12px', padding: '12px', background: '#EFF6FF', borderRadius: '8px', fontSize: '13px', color: '#1E40AF' }}>
                                💡 <strong>Astuce :</strong> Vous pouvez copier le contrat, l'imprimer ou le télécharger. Pour une version PDF professionnelle, contactez notre support.
                            </div>
                        </div>
                    )}

                    {isGenerating && (
                        <div style={{ marginTop: '32px', textAlign: 'center', padding: '40px' }}>
                            <div style={{ fontSize: '48px', marginBottom: '16px' }}>⏳</div>
                            <p style={{ fontSize: '16px', color: '#666' }}>Génération du contrat en cours...</p>
                            <p style={{ fontSize: '14px', color: '#999', marginTop: '8px' }}>L'IA analyse vos informations</p>
                        </div>
                    )}
                </div>
            )}

            {/* Templates Grid */}
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px', color: '#1B254B' }}>
                Modèles Disponibles
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
                {templates.map(template => (
                    <div
                        key={template.id}
                        style={{
                            background: 'white',
                            padding: '24px',
                            borderRadius: '16px',
                            boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                            cursor: 'pointer',
                            transition: 'transform 0.2s, box-shadow 0.2s',
                            border: '1px solid #eee'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-4px)';
                            e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
                        }}
                    >
                        <div style={{ fontSize: '48px', marginBottom: '12px' }}>{template.icon}</div>
                        <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px', color: '#1B254B' }}>
                            {template.name}
                        </h3>
                        <p style={{ fontSize: '14px', color: '#666', marginBottom: '16px', lineHeight: '1.5' }}>
                            {template.description}
                        </p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
                            {template.tags.map(tag => (
                                <span key={tag} style={{ padding: '4px 10px', background: '#F4F7FE', color: '#006AFF', borderRadius: '6px', fontSize: '12px', fontWeight: '500' }}>
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <button
                                onClick={() => {
                                    setFormData({ ...formData, type: template.id });
                                    setShowGenerator(true);
                                }}
                                style={{ flex: 1, padding: '10px', background: '#FF6B35', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer' }}
                            >
                                Utiliser ce modèle
                            </button>
                            <button style={{ padding: '10px 16px', background: 'white', color: '#666', border: '1px solid #ddd', borderRadius: '8px', cursor: 'pointer' }}>
                                👁️ Aperçu
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Legal Notice */}
            <div style={{ marginTop: '48px', padding: '24px', background: '#FFF7E6', borderRadius: '12px', borderLeft: '4px solid #FFB547' }}>
                <h4 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px', color: '#1B254B' }}>
                    ⚠️ Avertissement Juridique
                </h4>
                <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6' }}>
                    Les modèles de contrats fournis par Diwaan sont des documents types à usage informatif.
                    Ils doivent être adaptés à votre situation spécifique et <strong>vérifiés par un notaire ou avocat</strong> avant signature.
                    Diwaan ne peut être tenu responsable des conséquences juridiques liées à l'utilisation de ces modèles.
                </p>
            </div>

            {/* Help Section */}
            <div style={{ marginTop: '32px', textAlign: 'center' }}>
                <h3 style={{ fontSize: '18px', marginBottom: '12px', color: '#1B254B' }}>Besoin d'aide ?</h3>
                <p style={{ color: '#666', marginBottom: '16px' }}>Notre équipe juridique peut vous assister</p>
                <Link href="/help" style={{ display: 'inline-block', padding: '12px 24px', background: 'white', color: '#006AFF', border: '2px solid #006AFF', borderRadius: '8px', fontWeight: 'bold', textDecoration: 'none' }}>
                    💬 Contacter le Support Juridique
                </Link>
            </div>
        </div>
    );
}
