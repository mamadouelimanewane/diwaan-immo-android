'use client';

import { useState } from 'react';
// import { generateInvoicePDF, generateReceiptPDF } from '@/lib/pdfGenerator';

export default function InvoicingPage() {
    const [activeTab, setActiveTab] = useState<'generate' | 'history'>('generate');
    const [invoiceType, setInvoiceType] = useState<'facture' | 'recu'>('facture');
    const [locationType, setLocationType] = useState<'residentiel' | 'commercial'>('residentiel');
    const [generatedDoc, setGeneratedDoc] = useState('');

    const [formData, setFormData] = useState({
        landlordName: '',
        landlordAddress: '',
        tenantName: '',
        tenantAddress: '',
        propertyAddress: '',
        rentAmount: '',
        charges: '',
        month: new Date().toISOString().slice(0, 7), // YYYY-MM
        paymentDate: new Date().toISOString().split('T')[0],
        paymentMethod: 'virement',
        invoiceNumber: `FAC-${Date.now().toString().slice(-6)}`,
    });

    const [invoiceHistory] = useState([
        { id: 1, number: 'FAC-001234', type: 'Facture', locataire: 'Moussa Diop', montant: '350.000', date: '30 Nov 2025', statut: 'Payée' },
        { id: 2, number: 'REC-001235', type: 'Reçu', locataire: 'Fatou Sow', montant: '500.000', date: '28 Nov 2025', statut: 'Émis' },
        { id: 3, number: 'FAC-001236', type: 'Facture', locataire: 'Boutique Teranga SARL', montant: '1.200.000', date: '25 Nov 2025', statut: 'En attente' },
    ]);

    const generateDocument = () => {
        const total = (parseInt(formData.rentAmount || '0') + parseInt(formData.charges || '0')).toLocaleString();
        const monthName = new Date(formData.month + '-01').toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
        const isCommercial = locationType === 'commercial';
        const tva = isCommercial ? (parseInt(formData.rentAmount || '0') * 0.18) : 0;
        const totalTTC = isCommercial ? parseInt(formData.rentAmount || '0') + parseInt(formData.charges || '0') + tva : parseInt(total.replace(/\s/g, '') || '0');

        if (invoiceType === 'facture') {
            setGeneratedDoc(`
═══════════════════════════════════════════════════════════
                    ${isCommercial ? 'FACTURE COMMERCIALE' : 'FACTURE DE LOYER'}
═══════════════════════════════════════════════════════════

N° FACTURE : ${formData.invoiceNumber}
Date d'émission : ${new Date().toLocaleDateString('fr-FR')}
${isCommercial ? 'Assujetti à TVA' : 'Exonéré de TVA (Location résidentielle)'}

───────────────────────────────────────────────────────────
BAILLEUR
───────────────────────────────────────────────────────────
${formData.landlordName || '[NOM DU PROPRIÉTAIRE]'}
${formData.landlordAddress || '[ADRESSE COMPLÈTE]'}
${isCommercial ? 'NINEA : [NUMÉRO NINEA]\nRC : [REGISTRE COMMERCE]' : 'CNI : [NUMÉRO CNI]'}

───────────────────────────────────────────────────────────
LOCATAIRE (Facturé à)
───────────────────────────────────────────────────────────
${formData.tenantName || '[NOM DU LOCATAIRE]'}
${formData.tenantAddress || '[ADRESSE DU LOCATAIRE]'}
${isCommercial ? 'NINEA : [NUMÉRO NINEA]' : 'CNI : [NUMÉRO CNI]'}

───────────────────────────────────────────────────────────
BIEN LOUÉ
───────────────────────────────────────────────────────────
${formData.propertyAddress || '[ADRESSE DU BIEN]'}
${isCommercial ? 'Usage : Commercial / Bureaux' : 'Usage : Habitation'}

═══════════════════════════════════════════════════════════
                         DÉTAIL
═══════════════════════════════════════════════════════════

Période : ${monthName}

┌─────────────────────────────────────────┬──────────────┐
│ DÉSIGNATION                             │    MONTANT   │
├─────────────────────────────────────────┼──────────────┤
│ Loyer mensuel ${monthName}              │ ${(parseInt(formData.rentAmount || '0')).toLocaleString()} FCFA │
│ Charges locatives                       │ ${(parseInt(formData.charges || '0')).toLocaleString()} FCFA │
${isCommercial ? `├─────────────────────────────────────────┼──────────────┤
│ Sous-total HT                           │ ${total} FCFA │
│ TVA (18%)                               │ ${tva.toLocaleString()} FCFA │` : ''}
├═════════════════════════════════════════┼══════════════┤
│ TOTAL ${isCommercial ? 'TTC' : ''} À PAYER                       │ ${totalTTC.toLocaleString()} FCFA │
└─────────────────────────────────────────┴──────────────┘

En lettres : ${convertToWords(totalTTC)} francs CFA

───────────────────────────────────────────────────────────
CONDITIONS DE PAIEMENT
───────────────────────────────────────────────────────────
Échéance : Le 5 du mois en cours
Mode de paiement accepté : Virement, Chèque, Espèces

Coordonnées bancaires :
Banque : [NOM DE LA BANQUE]
IBAN : [IBAN]
Titulaire : ${formData.landlordName || '[NOM]'}

⚠️  PÉNALITÉS DE RETARD : 1% par mois de retard
⚠️  INDEMNITÉ FORFAITAIRE : 40€ en cas de retard de paiement

${isCommercial ? `
───────────────────────────────────────────────────────────
MENTIONS LÉGALES
───────────────────────────────────────────────────────────
TVA 18% incluse | En cas de retard de paiement, indemnité forfaitaire
de recouvrement de 40€ (Loi n° 2008-08 du 25 janvier 2008)
` : ''}
═══════════════════════════════════════════════════════════

            📧 Pour toute question : ${formData.landlordName?.split(' ')[0] || 'contact'}@diwaan.sn
            📱 Téléphone : +221 77 XXX XX XX

═══════════════════════════════════════════════════════════
Document généré automatiquement par Diwaan - ${new Date().toLocaleString('fr-FR')}
            `);
        } else {
            // Reçu de paiement
            setGeneratedDoc(`
═══════════════════════════════════════════════════════════
                      REÇU DE PAIEMENT DE LOYER
═══════════════════════════════════════════════════════════

N° REÇU : ${formData.invoiceNumber.replace('FAC', 'REC')}
Date de paiement : ${new Date(formData.paymentDate).toLocaleDateString('fr-FR')}

Je soussigné(e) : ${formData.landlordName || '[NOM DU PROPRIÉTAIRE]'}
Adresse : ${formData.landlordAddress || '[ADRESSE]'}

RECONNAIS AVOIR REÇU DE :

Locataire : ${formData.tenantName || '[NOM DU LOCATAIRE]'}
Adresse : ${formData.tenantAddress || '[ADRESSE]'}

───────────────────────────────────────────────────────────
BIEN CONCERNÉ
───────────────────────────────────────────────────────────
${formData.propertyAddress || '[ADRESSE DU BIEN LOUÉ]'}

═══════════════════════════════════════════════════════════
                    MONTANT REÇU
═══════════════════════════════════════════════════════════

Période : ${monthName}

┌─────────────────────────────────────────┬──────────────┐
│ Loyer ${monthName}                      │ ${(parseInt(formData.rentAmount || '0')).toLocaleString()} FCFA │
│ Charges                                 │ ${(parseInt(formData.charges || '0')).toLocaleString()} FCFA │
${isCommercial ? `│ TVA (18%)                               │ ${tva.toLocaleString()} FCFA │` : ''}
├═════════════════════════════════════════┼══════════════┤
│ TOTAL PERÇU                             │ ${totalTTC.toLocaleString()} FCFA │
└─────────────────────────────────────────┴──────────────┘

Somme en lettres : ${convertToWords(totalTTC)} francs CFA

───────────────────────────────────────────────────────────
MODE DE PAIEMENT
───────────────────────────────────────────────────────────
${formData.paymentMethod === 'virement' ? '💳 Virement bancaire' :
                    formData.paymentMethod === 'cheque' ? '📝 Chèque' :
                        formData.paymentMethod === 'especes' ? '💵 Espèces' :
                            '🔲 Mobile Money'}

${formData.paymentMethod === 'cheque' ? 'N° Chèque : [NUMÉRO]\nBanque : [NOM BANQUE]' : ''}
${formData.paymentMethod === 'virement' ? 'Référence : [REF VIREMENT]' : ''}

───────────────────────────────────────────────────────────

✅ Le locataire est À JOUR de ses paiements pour la période indiquée.

Ce reçu fait foi de paiement et annule toute quittance antérieure 
pour la période concernée.

═══════════════════════════════════════════════════════════

Fait à Dakar, le ${new Date(formData.paymentDate).toLocaleDateString('fr-FR')}


Le Bailleur,                              Le Locataire,


_____________________                     _____________________
${formData.landlordName || '[Signature]'}                           ${formData.tenantName || '[Signature]'}


═══════════════════════════════════════════════════════════
📄 Document officiel valant quittance de loyer
Document généré par Diwaan - www.diwaan.sn
${isCommercial ? 'Document comptable à conserver 10 ans (Code Commerce)' : 'À conserver avec le bail'}
═══════════════════════════════════════════════════════════
            `);
        }
    };

    const convertToWords = (num: number): string => {
        // Simplification
        return `${num.toLocaleString()} (${Math.floor(num / 1000000) > 0 ? Math.floor(num / 1000000) + ' millions' : ''} ${Math.floor((num % 1000000) / 1000)} mille)`;
    };

    const downloadAsText = () => {
        const element = document.createElement('a');
        const file = new Blob([generatedDoc], { type: 'text/plain; charset=utf-8' });
        element.href = URL.createObjectURL(file);
        const docType = invoiceType === 'facture' ? 'Facture' : 'Recu';
        element.download = `${docType}_${formData.invoiceNumber}_${formData.tenantName || 'Document'}.txt`;
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
        alert(`✅ ${docType} téléchargé avec succès !`);
    };

    const downloadPDF = async () => {
        try {
            // Vérifier si jsPDF est disponible
            const { generateInvoicePDF, generateReceiptPDF } = await import('@/lib/pdfGenerator');

            if (invoiceType === 'facture') {
                generateInvoicePDF({
                    invoiceNumber: formData.invoiceNumber,
                    landlordName: formData.landlordName,
                    landlordAddress: formData.landlordAddress,
                    tenantName: formData.tenantName,
                    tenantAddress: formData.tenantAddress,
                    propertyAddress: formData.propertyAddress,
                    rentAmount: formData.rentAmount,
                    charges: formData.charges,
                    month: new Date(formData.month + '-01').toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' }),
                    isCommercial: locationType === 'commercial'
                });
            } else {
                generateReceiptPDF({
                    invoiceNumber: formData.invoiceNumber,
                    landlordName: formData.landlordName,
                    landlordAddress: formData.landlordAddress,
                    tenantName: formData.tenantName,
                    tenantAddress: formData.tenantAddress,
                    propertyAddress: formData.propertyAddress,
                    rentAmount: formData.rentAmount,
                    charges: formData.charges,
                    month: new Date(formData.month + '-01').toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' }),
                    paymentDate: formData.paymentDate,
                    paymentMethod: formData.paymentMethod,
                    isCommercial: locationType === 'commercial'
                });
            }

            alert('✅ PDF généré avec succès !');
        } catch (error) {
            console.error('jsPDF non installé:', error);
            alert('📥 Installation requise : npm install jspdf\n\nEn attendant, téléchargement en format texte...');
            downloadAsText();
        }
    };

    const sendByEmail = () => {
        const subject = `${invoiceType === 'facture' ? 'Facture' : 'Reçu'} de Loyer - ${formData.invoiceNumber}`;
        const body = encodeURIComponent(generatedDoc);
        const mailto = `mailto:${formData.tenantName?.toLowerCase().replace(' ', '.')}@example.com?subject=${encodeURIComponent(subject)}&body=${body}`;

        // Ouvrir client email
        window.open(mailto, '_blank');

        setTimeout(() => {
            alert('📧 Client email ouvert !\n\nNote : Pour un envoi automatique, intégrez un service comme SendGrid ou Mailgun.');
        }, 500);
    };

    const sendByWhatsApp = () => {
        const docType = invoiceType === 'facture' ? 'Facture' : 'Reçu';
        const message = `Bonjour ${formData.tenantName || 'Cher locataire'},\n\nVeuillez trouver ci-dessous votre ${docType.toLowerCase()} de loyer :\n\n${generatedDoc}`;
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;

        window.open(whatsappUrl, '_blank');

        setTimeout(() => {
            alert(`📱 WhatsApp ouvert !\n\nNote : Vous pouvez sélectionner le contact du locataire dans WhatsApp.`);
        }, 500);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generatedDoc).then(() => {
            alert('✅ Document copié dans le presse-papiers !');
        }).catch(err => {
            // Fallback
            const textArea = document.createElement('textarea');
            textArea.value = generatedDoc;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            alert('✅ Document copié !');
        });
    };

    return (
        <div className="container" style={{ padding: '40px 24px', maxWidth: '1400px', margin: '0 auto' }}>
            {/* Header */}
            <div style={{ marginBottom: '32px' }}>
                <h1 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '12px', color: '#1B254B' }}>
                    💰 Facturation & Reçus de Loyer
                </h1>
                <p style={{ fontSize: '18px', color: '#666' }}>
                    Générez automatiquement vos factures et reçus de paiement pour locations résidentielles et commerciales
                </p>
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '32px', borderBottom: '2px solid #eee' }}>
                <button
                    onClick={() => setActiveTab('generate')}
                    style={{
                        padding: '12px 32px',
                        border: 'none',
                        background: 'none',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        color: activeTab === 'generate' ? '#FF6B35' : '#666',
                        borderBottom: activeTab === 'generate' ? '3px solid #FF6B35' : 'none',
                        marginBottom: '-2px'
                    }}
                >
                    ✨ Générer Document
                </button>
                <button
                    onClick={() => setActiveTab('history')}
                    style={{
                        padding: '12px 32px',
                        border: 'none',
                        background: 'none',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        color: activeTab === 'history' ? '#FF6B35' : '#666',
                        borderBottom: activeTab === 'history' ? '3px solid #FF6B35' : 'none',
                        marginBottom: '-2px'
                    }}
                >
                    📋 Historique
                </button>
            </div>

            {activeTab === 'generate' && (
                <>
                    {/* Type Selection */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '32px' }}>
                        <div
                            onClick={() => setInvoiceType('facture')}
                            style={{
                                padding: '24px',
                                background: invoiceType === 'facture' ? 'linear-gradient(135deg, #FF6B35 0%, #E63946 100%)' : 'white',
                                color: invoiceType === 'facture' ? 'white' : '#1B254B',
                                borderRadius: '16px',
                                cursor: 'pointer',
                                border: invoiceType === 'facture' ? 'none' : '2px solid #eee',
                                textAlign: 'center',
                                transition: 'all 0.3s'
                            }}
                        >
                            <div style={{ fontSize: '48px', marginBottom: '12px' }}>📄</div>
                            <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>Facture de Loyer</h3>
                            <p style={{ fontSize: '14px', opacity: 0.9 }}>Demande de paiement en début de mois</p>
                        </div>

                        <div
                            onClick={() => setInvoiceType('recu')}
                            style={{
                                padding: '24px',
                                background: invoiceType === 'recu' ? 'linear-gradient(135deg, #FF6B35 0%, #E63946 100%)' : 'white',
                                color: invoiceType === 'recu' ? 'white' : '#1B254B',
                                borderRadius: '16px',
                                cursor: 'pointer',
                                border: invoiceType === 'recu' ? 'none' : '2px solid #eee',
                                textAlign: 'center',
                                transition: 'all 0.3s'
                            }}
                        >
                            <div style={{ fontSize: '48px', marginBottom: '12px' }}>✅</div>
                            <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>Reçu de Paiement</h3>
                            <p style={{ fontSize: '14px', opacity: 0.9 }}>Quittance après réception du loyer</p>
                        </div>
                    </div>

                    {/* Location Type */}
                    <div style={{ marginBottom: '32px' }}>
                        <label style={{ display: 'block', marginBottom: '12px', fontWeight: 'bold', color: '#1B254B' }}>
                            Type de Location
                        </label>
                        <div style={{ display: 'flex', gap: '16px' }}>
                            <button
                                onClick={() => setLocationType('residentiel')}
                                style={{
                                    flex: 1,
                                    padding: '16px',
                                    background: locationType === 'residentiel' ? '#FF6B35' : 'white',
                                    color: locationType === 'residentiel' ? 'white' : '#666',
                                    border: locationType === 'residentiel' ? 'none' : '2px solid #ddd',
                                    borderRadius: '12px',
                                    fontWeight: 'bold',
                                    cursor: 'pointer'
                                }}
                            >
                                🏠 Résidentiel (Sans TVA)
                            </button>
                            <button
                                onClick={() => setLocationType('commercial')}
                                style={{
                                    flex: 1,
                                    padding: '16px',
                                    background: locationType === 'commercial' ? '#FF6B35' : 'white',
                                    color: locationType === 'commercial' ? 'white' : '#666',
                                    border: locationType === 'commercial' ? 'none' : '2px solid #ddd',
                                    borderRadius: '12px',
                                    fontWeight: 'bold',
                                    cursor: 'pointer'
                                }}
                            >
                                🏢 Commercial (TVA 18%)
                            </button>
                        </div>
                    </div>

                    {/* Form */}
                    <div style={{ background: 'white', padding: '32px', borderRadius: '16px', marginBottom: '32px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
                        <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '24px', color: '#1B254B' }}>
                            Informations
                        </h3>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#666' }}>Nom du Propriétaire</label>
                                <input
                                    type="text"
                                    value={formData.landlordName}
                                    onChange={(e) => setFormData({ ...formData, landlordName: e.target.value })}
                                    placeholder="Fatou Diop"
                                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
                                />
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#666' }}>Adresse Propriétaire</label>
                                <input
                                    type="text"
                                    value={formData.landlordAddress}
                                    onChange={(e) => setFormData({ ...formData, landlordAddress: e.target.value })}
                                    placeholder="Dakar Plateau, Rue X"
                                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
                                />
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#666' }}>Nom du Locataire</label>
                                <input
                                    type="text"
                                    value={formData.tenantName}
                                    onChange={(e) => setFormData({ ...formData, tenantName: e.target.value })}
                                    placeholder="Moussa Ndiaye"
                                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
                                />
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#666' }}>Adresse Locataire</label>
                                <input
                                    type="text"
                                    value={formData.tenantAddress}
                                    onChange={(e) => setFormData({ ...formData, tenantAddress: e.target.value })}
                                    placeholder="Adresse complète"
                                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
                                />
                            </div>

                            <div style={{ gridColumn: 'span 2' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#666' }}>Adresse du Bien Loué</label>
                                <input
                                    type="text"
                                    value={formData.propertyAddress}
                                    onChange={(e) => setFormData({ ...formData, propertyAddress: e.target.value })}
                                    placeholder="Villa Sicap Liberté, Rue 10"
                                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
                                />
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#666' }}>
                                    Montant Loyer (FCFA)
                                </label>
                                <input
                                    type="number"
                                    value={formData.rentAmount}
                                    onChange={(e) => setFormData({ ...formData, rentAmount: e.target.value })}
                                    placeholder="350000"
                                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
                                />
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#666' }}>
                                    Charges (FCFA)
                                </label>
                                <input
                                    type="number"
                                    value={formData.charges}
                                    onChange={(e) => setFormData({ ...formData, charges: e.target.value })}
                                    placeholder="25000"
                                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
                                />
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#666' }}>Mois/Année</label>
                                <input
                                    type="month"
                                    value={formData.month}
                                    onChange={(e) => setFormData({ ...formData, month: e.target.value })}
                                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
                                />
                            </div>

                            {invoiceType === 'recu' && (
                                <>
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#666' }}>Date de Paiement</label>
                                        <input
                                            type="date"
                                            value={formData.paymentDate}
                                            onChange={(e) => setFormData({ ...formData, paymentDate: e.target.value })}
                                            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
                                        />
                                    </div>

                                    <div>
                                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#666' }}>Mode de Paiement</label>
                                        <select
                                            value={formData.paymentMethod}
                                            onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                                            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
                                        >
                                            <option value="virement">Virement bancaire</option>
                                            <option value="cheque">Chèque</option>
                                            <option value="especes">Espèces</option>
                                            <option value="mobile">Mobile Money</option>
                                        </select>
                                    </div>
                                </>
                            )}
                        </div>

                        <button
                            onClick={generateDocument}
                            style={{
                                marginTop: '24px',
                                background: '#FF6B35',
                                color: 'white',
                                padding: '14px 32px',
                                borderRadius: '8px',
                                border: 'none',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                fontSize: '16px',
                                width: '100%'
                            }}
                        >
                            ✨ Générer {invoiceType === 'facture' ? 'la Facture' : 'le Reçu'}
                        </button>
                    </div>

                    {/* Generated Document */}
                    {generatedDoc && (
                        <div style={{ background: 'white', padding: '32px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
                            <h4 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px', color: '#1B254B' }}>
                                {invoiceType === 'facture' ? '📄 Facture Générée' : '✅ Reçu Généré'}
                            </h4>
                            <div style={{
                                background: '#1e1e1e',
                                padding: '24px',
                                borderRadius: '12px',
                                whiteSpace: 'pre-wrap',
                                fontFamily: 'monospace',
                                fontSize: '12px',
                                maxHeight: '600px',
                                overflow: 'auto',
                                color: '#00ff00',
                                lineHeight: '1.6'
                            }}>
                                {generatedDoc}
                            </div>
                            <div style={{ display: 'flex', gap: '12px', marginTop: '16px', flexWrap: 'wrap' }}>
                                <button
                                    onClick={downloadAsText}
                                    style={{ padding: '12px 24px', background: '#006AFF', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
                                >
                                    📥 Télécharger TXT
                                </button>
                                <button
                                    onClick={sendByEmail}
                                    style={{ padding: '12px 24px', background: 'white', color: '#006AFF', border: '2px solid #006AFF', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
                                >
                                    📧 Envoyer par Email
                                </button>
                                <button
                                    onClick={sendByWhatsApp}
                                    style={{ padding: '12px 24px', background: '#25D366', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
                                >
                                    📱 Envoyer WhatsApp
                                </button>
                                <button
                                    onClick={copyToClipboard}
                                    style={{ padding: '12px 24px', background: '#eee', color: '#666', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
                                >
                                    📋 Copier
                                </button>
                            </div>
                            <div style={{ marginTop: '12px', padding: '12px', background: '#EFF6FF', borderRadius: '8px', fontSize: '13px', color: '#1E40AF' }}>
                                💡 <strong>Astuce :</strong> Vous pouvez télécharger, copier ou partager le document directement avec votre locataire via Email ou WhatsApp.
                            </div>
                        </div>
                    )}
                </>
            )}

            {activeTab === 'history' && (
                <div style={{ background: 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', alignItems: 'center' }}>
                        <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1B254B' }}>Historique des Documents</h3>
                        <button style={{ padding: '10px 20px', background: 'white', border: '1px solid #ddd', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
                            📥 Exporter CSV
                        </button>
                    </div>

                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ textAlign: 'left', background: '#F9FAFB', borderBottom: '2px solid #E5E7EB' }}>
                                <th style={{ padding: '12px' }}>N° Document</th>
                                <th style={{ padding: '12px' }}>Type</th>
                                <th style={{ padding: '12px' }}>Locataire</th>
                                <th style={{ padding: '12px' }}>Montant</th>
                                <th style={{ padding: '12px' }}>Date</th>
                                <th style={{ padding: '12px' }}>Statut</th>
                                <th style={{ padding: '12px' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {invoiceHistory.map(invoice => (
                                <tr key={invoice.id} style={{ borderBottom: '1px solid #f5f5f5' }}>
                                    <td style={{ padding: '16px', fontFamily: 'monospace', fontWeight: 'bold' }}>{invoice.number}</td>
                                    <td style={{ padding: '16px' }}>
                                        <span style={{
                                            padding: '4px 10px',
                                            background: invoice.type === 'Facture' ? '#FFF7E6' : '#E6F8F1',
                                            color: invoice.type === 'Facture' ? '#FFB547' : '#05CD99',
                                            borderRadius: '6px',
                                            fontSize: '12px',
                                            fontWeight: 'bold'
                                        }}>
                                            {invoice.type}
                                        </span>
                                    </td>
                                    <td style={{ padding: '16px' }}>{invoice.locataire}</td>
                                    <td style={{ padding: '16px', fontWeight: 'bold' }}>{invoice.montant} FCFA</td>
                                    <td style={{ padding: '16px', color: '#666' }}>{invoice.date}</td>
                                    <td style={{ padding: '16px' }}>
                                        <span style={{
                                            padding: '4px 10px',
                                            borderRadius: '6px',
                                            fontSize: '12px',
                                            fontWeight: 'bold',
                                            background: invoice.statut === 'Payée' ? '#E6F8F1' : invoice.statut === 'Émis' ? '#E6F2FF' : '#FFEBEB',
                                            color: invoice.statut === 'Payée' ? '#05CD99' : invoice.statut === 'Émis' ? '#006AFF' : '#E31A1A'
                                        }}>
                                            {invoice.statut}
                                        </span>
                                    </td>
                                    <td style={{ padding: '16px' }}>
                                        <button style={{ marginRight: '8px', cursor: 'pointer', background: 'none', border: 'none', fontSize: '18px' }} title="Voir">👁️</button>
                                        <button style={{ marginRight: '8px', cursor: 'pointer', background: 'none', border: 'none', fontSize: '18px' }} title="Télécharger">📥</button>
                                        <button style={{ cursor: 'pointer', background: 'none', border: 'none', fontSize: '18px' }} title="Envoyer">📧</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Help */}
            <div style={{ marginTop: '40px', padding: '24px', background: '#E6F2FF', borderRadius: '12px' }}>
                <h4 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px', color: '#1B254B' }}>
                    💡 Conseil
                </h4>
                <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6' }}>
                    <strong>Automatisation :</strong> Activez la génération automatique mensuelle pour recevoir vos factures chaque 1er du mois et vos reçus après paiement.
                    Disponible dans Paramètres → Automatisation.
                </p>
            </div>
        </div>
    );
}
