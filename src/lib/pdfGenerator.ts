import jsPDF from 'jspdf';

interface InvoiceData {
    invoiceNumber: string;
    landlordName: string;
    landlordAddress: string;
    tenantName: string;
    tenantAddress: string;
    propertyAddress: string;
    rentAmount: string;
    charges: string;
    month: string;
    isCommercial?: boolean;
}

export const generateInvoicePDF = (data: InvoiceData) => {
    const doc = new jsPDF();

    // Configuration de base
    doc.setFont('helvetica');

    // En-tête avec gradient simulé
    doc.setFillColor(0, 106, 255);
    doc.rect(0, 0, 210, 40, 'F');

    // Logo/Titre
    doc.setFontSize(28);
    doc.setTextColor(255, 255, 255);
    doc.text('DIWAAN', 105, 20, { align: 'center' });
    doc.setFontSize(16);
    doc.text(data.isCommercial ? 'FACTURE COMMERCIALE' : 'FACTURE DE LOYER', 105, 30, { align: 'center' });

    // Reset couleur
    doc.setTextColor(0, 0, 0);

    // Informations facture
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text(`N° Facture : ${data.invoiceNumber}`, 20, 50);
    doc.setFont('helvetica', 'normal');
    doc.text(`Date d'émission : ${new Date().toLocaleDateString('fr-FR')}`, 20, 56);
    doc.text(data.isCommercial ? 'Assujetti à TVA (18%)' : 'Exonéré de TVA', 20, 62);

    // Ligne de séparation
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.5);
    doc.line(20, 68, 190, 68);

    // BAILLEUR - Colonne gauche
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 106, 255);
    doc.text('BAILLEUR', 20, 78);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text(data.landlordName || '[Nom du propriétaire]', 20, 85);
    doc.text(data.landlordAddress || '[Adresse]', 20, 91);
    if (data.isCommercial) {
        doc.text('NINEA : [À COMPLÉTER]', 20, 97);
    } else {
        doc.text('CNI : [À COMPLÉTER]', 20, 97);
    }

    // LOCATAIRE - Colonne droite
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 106, 255);
    doc.text('LOCATAIRE', 120, 78);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text(data.tenantName || '[Nom du locataire]', 120, 85);
    doc.text(data.tenantAddress || '[Adresse]', 120, 91);
    if (data.isCommercial) {
        doc.text('NINEA : [À COMPLÉTER]', 120, 97);
    } else {
        doc.text('CNI : [À COMPLÉTER]', 120, 97);
    }

    // BIEN LOUÉ
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 106, 255);
    doc.text('BIEN LOUÉ', 20, 110);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text(data.propertyAddress || '[Adresse du bien]', 20, 117);
    doc.text(data.isCommercial ? 'Usage : Commercial / Bureaux' : 'Usage : Habitation', 20, 123);

    // Ligne de séparation
    doc.line(20, 130, 190, 130);

    // DÉTAIL - Tableau
    const startY = 140;

    // En-tête tableau
    doc.setFillColor(0, 106, 255);
    doc.rect(20, startY, 170, 10, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text('DÉSIGNATION', 25, startY + 7);
    doc.text('MONTANT', 165, startY + 7, { align: 'right' });

    // Lignes du tableau
    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);

    let y = startY + 17;

    // Loyer
    doc.text(`Loyer mensuel ${data.month}`, 25, y);
    doc.text(`${parseInt(data.rentAmount || '0').toLocaleString()} FCFA`, 165, y, { align: 'right' });

    // Ligne séparation tableau
    doc.setDrawColor(230, 230, 230);
    doc.line(20, y + 3, 190, y + 3);
    y += 8;

    // Charges
    doc.text('Charges locatives', 25, y);
    doc.text(`${parseInt(data.charges || '0').toLocaleString()} FCFA`, 165, y, { align: 'right' });
    doc.line(20, y + 3, 190, y + 3);

    // TVA si commercial
    if (data.isCommercial) {
        y += 8;
        const subtotal = parseInt(data.rentAmount || '0') + parseInt(data.charges || '0');
        doc.text('Sous-total HT', 25, y);
        doc.text(`${subtotal.toLocaleString()} FCFA`, 165, y, { align: 'right' });
        doc.line(20, y + 3, 190, y + 3);

        y += 8;
        const tva = subtotal * 0.18;
        doc.text('TVA (18%)', 25, y);
        doc.text(`${tva.toLocaleString()} FCFA`, 165, y, { align: 'right' });
        doc.line(20, y + 3, 190, y + 3);
    }

    // TOTAL
    y += 10;
    doc.setFillColor(240, 240, 240);
    doc.rect(20, y - 5, 170, 12, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    const total = parseInt(data.rentAmount || '0') + parseInt(data.charges || '0') + (data.isCommercial ? (parseInt(data.rentAmount || '0') + parseInt(data.charges || '0')) * 0.18 : 0);
    doc.text('TOTAL À PAYER', 25, y + 2);
    doc.setTextColor(0, 106, 255);
    doc.setFontSize(14);
    doc.text(`${Math.round(total).toLocaleString()} FCFA`, 165, y + 2, { align: 'right' });

    // Bordure tableau
    doc.setDrawColor(0, 106, 255);
    doc.setLineWidth(0.5);
    doc.rect(20, startY, 170, y - startY + 7);

    // CONDITIONS DE PAIEMENT
    y += 20;
    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text('CONDITIONS DE PAIEMENT', 20, y);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    y += 6;
    doc.text('Échéance : Le 5 du mois en cours', 20, y);
    y += 5;
    doc.text('Mode de paiement accepté : Virement, Chèque, Espèces, Mobile Money', 20, y);

    y += 8;
    doc.setFont('helvetica', 'bold');
    doc.text('Coordonnées bancaires :', 20, y);
    doc.setFont('helvetica', 'normal');
    y += 5;
    doc.text('Banque : [NOM DE LA BANQUE]', 20, y);
    y += 5;
    doc.text('IBAN : [IBAN]', 20, y);
    y += 5;
    doc.text(`Titulaire : ${data.landlordName || '[NOM]'}`, 20, y);

    // Avertissement
    y += 10;
    doc.setFontSize(8);
    doc.setTextColor(220, 53, 69);
    doc.text('⚠️  PÉNALITÉS DE RETARD : 1% par mois de retard', 20, y);
    y += 4;
    doc.text('⚠️  INDEMNITÉ FORFAITAIRE : 40€ en cas de retard de paiement', 20, y);

    // Pied de page
    doc.setFontSize(8);
    doc.setTextColor(128, 128, 128);
    doc.text('Document généré automatiquement par Diwaan', 105, 275, { align: 'center' });
    doc.text(`www.diwaan.sn | contact@diwaan.sn | +221 77 XXX XX XX`, 105, 280, { align: 'center' });
    doc.text(`${new Date().toLocaleString('fr-FR')}`, 105, 285, { align: 'center' });

    // Télécharger
    doc.save(`Facture_${data.invoiceNumber}_${data.tenantName?.replace(/\s/g, '_') || 'Document'}.pdf`);
};

export const generateReceiptPDF = (data: InvoiceData & { paymentDate: string; paymentMethod: string }) => {
    const doc = new jsPDF();

    // En-tête
    doc.setFillColor(5, 205, 153);
    doc.rect(0, 0, 210, 40, 'F');

    doc.setFontSize(28);
    doc.setTextColor(255, 255, 255);
    doc.text('DIWAAN', 105, 20, { align: 'center' });
    doc.setFontSize(16);
    doc.text('REÇU DE PAIEMENT DE LOYER', 105, 30, { align: 'center' });

    doc.setTextColor(0, 0, 0);

    // Infos
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text(`N° Reçu : ${data.invoiceNumber.replace('FAC', 'REC')}`, 20, 50);
    doc.setFont('helvetica', 'normal');
    doc.text(`Date de paiement : ${new Date(data.paymentDate).toLocaleDateString('fr-FR')}`, 20, 56);

    doc.line(20, 63, 190, 63);

    // Déclaration
    doc.setFontSize(11);
    const y = 75;
    doc.text('Je soussigné(e) :', 20, y);
    doc.setFont('helvetica', 'bold');
    doc.text(data.landlordName || '[NOM DU PROPRIÉTAIRE]', 20, y + 6);
    doc.setFont('helvetica', 'normal');
    doc.text(data.landlordAddress || '[ADRESSE]', 20, y + 12);

    doc.setFont('helvetica', 'bold');
    doc.text('RECONNAIS AVOIR REÇU DE :', 20, y + 22);
    doc.setFont('helvetica', 'normal');
    doc.text(data.tenantName || '[NOM DU LOCATAIRE]', 20, y + 28);
    doc.text(data.tenantAddress || '[ADRESSE]', 20, y + 34);

    // Bien concerné
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(5, 205, 153);
    doc.text('BIEN CONCERNÉ', 20, y + 46);
    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'normal');
    doc.text(data.propertyAddress || '[ADRESSE DU BIEN]', 20, y + 52);

    // Montant (tableau simplifié)
    const tableY = y + 65;
    doc.setFillColor(5, 205, 153);
    doc.rect(20, tableY, 170, 10, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.text('MONTANT PERÇU', 105, tableY + 7, { align: 'center' });

    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'normal');
    let ty = tableY + 17;
    doc.text(`Loyer ${data.month}`, 25, ty);
    doc.text(`${parseInt(data.rentAmount || '0').toLocaleString()} FCFA`, 165, ty, { align: 'right' });

    ty += 8;
    doc.text('Charges', 25, ty);
    doc.text(`${parseInt(data.charges || '0').toLocaleString()} FCFA`, 165, ty, { align: 'right' });

    ty += 10;
    doc.setFillColor(240, 240, 240);
    doc.rect(20, ty - 5, 170, 12, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    const total = parseInt(data.rentAmount || '0') + parseInt(data.charges || '0');
    doc.text('TOTAL PERÇU', 25, ty + 2);
    doc.setTextColor(5, 205, 153);
    doc.setFontSize(14);
    doc.text(`${total.toLocaleString()} FCFA`, 165, ty + 2, { align: 'right' });

    doc.setDrawColor(5, 205, 153);
    doc.setLineWidth(0.5);
    doc.rect(20, tableY, 170, ty - tableY + 7);

    // Mode de paiement
    ty += 15;
    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text('MODE DE PAIEMENT', 20, ty);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    const paymentMethods: any = {
        virement: '💳 Virement bancaire',
        cheque: '📝 Chèque',
        especes: '💵 Espèces',
        mobile: '📱 Mobile Money'
    };
    doc.text(paymentMethods[data.paymentMethod] || data.paymentMethod, 20, ty + 6);

    // Statut
    ty += 15;
    doc.setFillColor(230, 252, 245);
    doc.rect(20, ty, 170, 15, 'F');
    doc.setTextColor(5, 205, 153);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text('✅ Le locataire est À JOUR de ses paiements pour la période indiquée.', 25, ty + 10);

    // Signatures
    ty += 25;
    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text(`Fait à Dakar, le ${new Date(data.paymentDate).toLocaleDateString('fr-FR')}`, 20, ty);

    ty += 15;
    doc.text('Le Bailleur,', 40, ty);
    doc.text('Le Locataire,', 140, ty);

    ty += 20;
    doc.line(30, ty, 80, ty);
    doc.line(130, ty, 180, ty);

    ty += 5;
    doc.setFontSize(9);
    doc.text(data.landlordName || '[Signature]', 55, ty, { align: 'center' });
    doc.text(data.tenantName || '[Signature]', 155, ty, { align: 'center' });

    // Pied de page
    doc.setFontSize(8);
    doc.setTextColor(128, 128, 128);
    doc.text('📄 Document officiel valant quittance de loyer', 105, 275, { align: 'center' });
    doc.text('Document généré par Diwaan - www.diwaan.sn', 105, 280, { align: 'center' });
    doc.text(data.isCommercial ? 'Document comptable à conserver 10 ans' : 'À conserver avec le bail', 105, 285, { align: 'center' });

    doc.save(`Recu_${data.invoiceNumber.replace('FAC', 'REC')}_${data.tenantName?.replace(/\s/g, '_') || 'Document'}.pdf`);
};
