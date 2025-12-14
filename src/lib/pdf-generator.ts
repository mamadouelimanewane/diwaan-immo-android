// Générateur de PDF pour les contrats de réservation et de partenariat
// Utilise jsPDF pour la génération client-side ou server-side

interface ReservationPDFData {
    reservationNumber: string;
    date: Date;

    // Client
    clientFirstName: string;
    clientLastName: string;
    clientEmail: string;
    clientPhone: string;
    clientAddress?: string;
    clientCIN?: string;

    // Parcelle
    plotNumber: string;
    block?: string;
    surfaceArea: number;
    projectName: string;
    projectLocation: string;

    // Prix
    cessionPricePerSqm: number;
    agencyMarginPerSqm: number;
    finalPricePerSqm: number;
    cessionPrice: number;
    agencyMargin: number;
    finalPrice: number;
    cashDiscount: number;

    // Paiement
    paymentType: 'CASH' | 'INSTALLMENT';
    downPayment: number;
    balance: number;

    // Agence
    agencyName: string;
    agencyAddress: string;
    agencyPhone: string;
    agencyEmail: string;

    // Promoteur
    developerName: string;
    developerAddress: string;
}

/**
 * Génère le contenu HTML d'un contrat de réservation
 * Peut être utilisé pour générer un PDF ou afficher directement
 */
export function generateReservationContractHTML(data: ReservationPDFData): string {
    const formatPrice = (price: number) => price.toLocaleString('fr-FR');
    const formatDate = (date: Date) => date.toLocaleDateString('fr-FR');

    return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Contrat de Réservation - ${data.reservationNumber}</title>
  <style>
    body {
      font-family: 'Arial', sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      text-align: center;
      border-bottom: 3px solid #2196F3;
      padding-bottom: 20px;
      margin-bottom: 30px;
    }
    .header h1 {
      color: #2196F3;
      margin: 0;
      font-size: 28px;
    }
    .header .ref {
      color: #666;
      font-size: 14px;
      margin-top: 10px;
    }
    .section {
      margin-bottom: 25px;
    }
    .section h2 {
      color: #2196F3;
      font-size: 18px;
      border-bottom: 2px solid #e0e0e0;
      padding-bottom: 5px;
      margin-bottom: 15px;
    }
    .info-grid {
      display: grid;
      grid-template-columns: 200px 1fr;
      gap: 10px;
      margin-bottom: 15px;
    }
    .info-label {
      font-weight: bold;
      color: #555;
    }
    .price-table {
      width: 100%;
      border-collapse: collapse;
      margin: 15px 0;
    }
    .price-table th,
    .price-table td {
      padding: 12px;
      text-align: left;
      border: 1px solid #ddd;
    }
    .price-table th {
      background-color: #2196F3;
      color: white;
      font-weight: bold;
    }
    .price-table tr:nth-child(even) {
      background-color: #f9f9f9;
    }
    .price-table .total {
      background-color: #e3f2fd;
      font-weight: bold;
      font-size: 16px;
    }
    .highlight {
      background-color: #fff176;
      padding: 2px 5px;
    }
    .signatures {
      margin-top: 60px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 50px;
    }
    .signature-block {
      text-align: center;
    }
    .signature-line {
      border-top: 1px solid #333;
      margin-top: 80px;
      padding-top: 10px;
    }
    .footer {
      margin-top: 40px;
      padding-top: 20px;
      border-top: 1px solid #ddd;
      font-size: 12px;
      color: #666;
      text-align: center;
    }
    @media print {
      body {
        padding: 0;
      }
      .no-print {
        display: none;
      }
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>CONTRAT DE RÉSERVATION</h1>
    <div class="ref">Numéro: ${data.reservationNumber}</div>
    <div class="ref">Date: ${formatDate(data.date)}</div>
  </div>

  <div class="section">
    <h2>ENTRE</h2>
    <div class="info-grid">
      <div class="info-label">Promoteur:</div>
      <div>${data.developerName}</div>
      <div class="info-label">Adresse:</div>
      <div>${data.developerAddress}</div>
    </div>
    <div style="text-align: center; margin: 20px 0;">
      <strong>ET</strong>
    </div>
    <div class="info-grid">
      <div class="info-label">Agence:</div>
      <div>${data.agencyName}</div>
      <div class="info-label">Adresse:</div>
      <div>${data.agencyAddress}</div>
      <div class="info-label">Téléphone:</div>
      <div>${data.agencyPhone}</div>
      <div class="info-label">Email:</div>
      <div>${data.agencyEmail}</div>
    </div>
    <div style="text-align: center; margin: 20px 0;">
      <strong>POUR LE COMPTE DE</strong>
    </div>
    <div class="info-grid">
      <div class="info-label">Nom complet:</div>
      <div>${data.clientFirstName} ${data.clientLastName}</div>
      <div class="info-label">Email:</div>
      <div>${data.clientEmail}</div>
      <div class="info-label">Téléphone:</div>
      <div>${data.clientPhone}</div>
      ${data.clientAddress ? `
      <div class="info-label">Adresse:</div>
      <div>${data.clientAddress}</div>
      ` : ''}
      ${data.clientCIN ? `
      <div class="info-label">N° CIN:</div>
      <div>${data.clientCIN}</div>
      ` : ''}
    </div>
  </div>

  <div class="section">
    <h2>OBJET DE LA RÉSERVATION</h2>
    <div class="info-grid">
      <div class="info-label">Projet:</div>
      <div>${data.projectName}</div>
      <div class="info-label">Localisation:</div>
      <div>${data.projectLocation}</div>
      <div class="info-label">Parcelle N°:</div>
      <div>${data.plotNumber}</div>
      ${data.block ? `
      <div class="info-label">Bloc:</div>
      <div>${data.block}</div>
      ` : ''}
      <div class="info-label">Surface:</div>
      <div class="highlight">${formatPrice(data.surfaceArea)} m²</div>
    </div>
  </div>

  <div class="section">
    <h2>CONDITIONS FINANCIÈRES</h2>
    <table class="price-table">
      <thead>
        <tr>
          <th>Désignation</th>
          <th style="text-align: right;">Prix au m²</th>
          <th style="text-align: right;">Montant Total</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Prix de cession promoteur</td>
          <td style="text-align: right;">${formatPrice(data.cessionPricePerSqm)} FCFA</td>
          <td style="text-align: right;">${formatPrice(data.cessionPrice)} FCFA</td>
        </tr>
        ${data.cashDiscount > 0 ? `
        <tr>
          <td>Rabais paiement comptant (5%)</td>
          <td style="text-align: right;">-</td>
          <td style="text-align: right; color: green;">-${formatPrice(data.cashDiscount)} FCFA</td>
        </tr>
        ` : ''}
        <tr>
          <td>Marge commerciale agence</td>
          <td style="text-align: right;">${formatPrice(data.agencyMarginPerSqm)} FCFA</td>
          <td style="text-align: right;">${formatPrice(data.agencyMargin)} FCFA</td>
        </tr>
        <tr class="total">
          <td colspan="2"><strong>PRIX TOTAL À PAYER</strong></td>
          <td style="text-align: right;"><strong>${formatPrice(data.finalPrice)} FCFA</strong></td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="section">
    <h2>MODALITÉS DE PAIEMENT</h2>
    <div class="info-grid">
      <div class="info-label">Type de paiement:</div>
      <div class="highlight">${data.paymentType === 'CASH' ? 'COMPTANT' : 'ÉCHELONNÉ'}</div>
      <div class="info-label">Acompte versé (50%):</div>
      <div class="highlight">${formatPrice(data.downPayment)} FCFA</div>
      <div class="info-label">Solde restant:</div>
      <div class="highlight">${formatPrice(data.balance)} FCFA</div>
    </div>
  </div>

  <div class="section">
    <h2>CONDITIONS GÉNÉRALES</h2>
    <ol style="line-height: 2;">
      <li>La présente réservation est valable pour une durée de <strong>30 jours</strong>.</li>
      <li>Un acompte minimum de <strong>50%</strong> du prix total est requis pour valider définitivement la réservation.</li>
      <li>Le solde devra être versé dans un délai maximum de <strong>90 jours</strong> (sauf accord contraire).</li>
      <li>En cas de défaut de paiement persistant (3 échéances manquées), le promoteur se réserve le droit d'annuler le contrat.</li>
      <li>Les frais de mutation et de notaire sont à la charge de l'acquéreur.</li>
      <li>La parcelle sera remise à l'acquéreur après paiement intégral du prix et signature de l'acte de vente.</li>
    </ol>
  </div>

  <div class="signatures">
    <div class="signature-block">
      <div><strong>L'ACQUÉREUR</strong></div>
      <div class="signature-line">
        ${data.clientFirstName} ${data.clientLastName}
      </div>
    </div>
    <div class="signature-block">
      <div><strong>L'AGENCE</strong></div>
      <div class="signature-line">
        ${data.agencyName}
      </div>
    </div>
  </div>

  <div class="footer">
    <p>Document généré le ${formatDate(new Date())} par la plateforme Diwaan</p>
    <p>Pour toute question, contactez ${data.agencyEmail} ou ${data.agencyPhone}</p>
  </div>

  <div class="no-print" style="margin-top: 30px; text-align: center;">
    <button onclick="window.print()" style="
      background-color: #2196F3;
      color: white;
      border: none;
      padding: 12px 30px;
      font-size: 16px;
      cursor: pointer;
      border-radius: 4px;
    ">
      Imprimer / Sauvegarder en PDF
    </button>
  </div>
</body>
</html>
  `.trim();
}

/**
 * Génère le contenu HTML d'un bordereau de paiement
 */
export function generatePaymentReceipt  HTML(data: any): string {
    const formatPrice = (price: number) => price.toLocaleString('fr-FR');
    const formatDate = (date: Date) => date.toLocaleDateString('fr-FR');

    return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Bordereau de Paiement</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .receipt-header {
      text-align: center;
      background-color: #2196F3;
      color: white;
      padding: 20px;
      border-radius: 8px;
      margin-bottom: 30px;
    }
    .receipt-header h1 {
      margin: 0;
      font-size: 24px;
    }
    .info-row {
      display: flex;
      justify-content: space-between;
      padding: 10px 0;
      border-bottom: 1px solid #e0e0e0;
    }
    .info-label {
      font-weight: bold;
      color: #555;
    }
    .amount {
      font-size: 32px;
      text-align: center;
      color: #2196F3;
      font-weight: bold;
      margin: 30px 0;
    }
    @media print {
      button { display: none; }
    }
  </style>
</head>
<body>
  <div class="receipt-header">
    <h1>BORDEREAU DE PAIEMENT</h1>
    <div>${data.reference}</div>
  </div>

  <div class="info-row">
    <span class="info-label">Date:</span>
    <span>${formatDate(data.date)}</span>
  </div>
  <div class="info-row">
    <span class="info-label">Client:</span>
    <span>${data.clientName}</span>
  </div>
  <div class="info-row">
    <span class="info-label">Réservation:</span>
    <span>${data.reservationNumber}</span>
  </div>
  <div class="info-row">
    <span class="info-label">Parcelle:</span>
    <span>${data.plotNumber}</span>
  </div>
  <div class="info-row">
    <span class="info-label">Mode de paiement:</span>
    <span>${data.method}</span>
  </div>

  <div class="amount">
    ${formatPrice(data.amount)} FCFA
  </div>

  <div style="text-align: center; margin-top: 40px;">
    <button onclick="window.print()" style="
      background-color: #2196F3;
      color: white;
      border: none;
      padding: 12px 30px;
      font-size: 16px;
      cursor: pointer;
      border-radius: 4px;
    ">
      Imprimer
    </button>
  </div>
</body>
</html>
  `.trim();
}

export { ReservationPDFData };
