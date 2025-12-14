# 🚀 GUIDE D'IMPLÉMENTATION - FONCTIONNALITÉS AVANCÉES
## Diwaan - Facturation Professionnelle

**Version** : 2.0.0  
**Date** : 11 Décembre 2025  
**Temps total** : 2-3 jours  
**Budget** : ~200€/mois (APIs)

---

## 📋 TABLE DES MATIÈRES

1. [Génération PDF Professionnelle](#1-génération-pdf-professionnelle)
2. [Email Automatique](#2-email-automatique)
3. [WhatsApp Business API](#3-whatsapp-business-api)
4. [Signature Électronique](#4-signature-électronique)
5. [Archivage Cloud](#5-archivage-cloud)
6. [Configuration Complète](#6-configuration-complète)

---

## 1. 📄 GÉNÉRATION PDF PROFESSIONNELLE

### Option A : jsPDF (Simple)

**Installation** :
```bash
npm install jspdf
```

**Implémentation** :
```typescript
// src/lib/pdfGenerator.ts
import jsPDF from 'jspdf';

export const generateInvoicePDF = (invoiceData: any) => {
  const doc = new jsPDF();
  
  // Configuration de base
  doc.setFont('helvetica');
  
  // En-tête
  doc.setFontSize(22);
  doc.setTextColor(0, 106, 255);
  doc.text('FACTURE DE LOYER', 105, 20, { align: 'center' });
  
  // Ligne de séparation
  doc.setDrawColor(0, 106, 255);
  doc.setLineWidth(0.5);
  doc.line(20, 25, 190, 25);
  
  // Informations facture
  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);
  doc.text(`N° Facture : ${invoiceData.invoiceNumber}`, 20, 35);
  doc.text(`Date : ${new Date().toLocaleDateString('fr-FR')}`, 20, 41);
  
  // Bailleur
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('BAILLEUR', 20, 55);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text(invoiceData.landlordName, 20, 62);
  doc.text(invoiceData.landlordAddress, 20, 68);
  
  // Locataire
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('LOCATAIRE', 120, 55);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text(invoiceData.tenantName, 120, 62);
  doc.text(invoiceData.tenantAddress, 120, 68);
  
  // Tableau
  const startY = 90;
  
  // En-tête tableau
  doc.setFillColor(0, 106, 255);
  doc.rect(20, startY, 170, 10, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.text('DÉSIGNATION', 25, startY + 7);
  doc.text('MONTANT', 155, startY + 7);
  
  // Lignes
  doc.setTextColor(0, 0, 0);
  doc.setFont('helvetica', 'normal');
  let y = startY + 15;
  
  doc.text(`Loyer ${invoiceData.month}`, 25, y);
  doc.text(`${parseInt(invoiceData.rentAmount).toLocaleString()} FCFA`, 155, y);
  y += 7;
  
  doc.text('Charges locatives', 25, y);
  doc.text(`${parseInt(invoiceData.charges).toLocaleString()} FCFA`, 155, y);
  y += 10;
  
  // Total
  doc.setFillColor(240, 240, 240);
  doc.rect(20, y, 170, 10, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  const total = parseInt(invoiceData.rentAmount) + parseInt(invoiceData.charges);
  doc.text('TOTAL À PAYER', 25, y + 7);
  doc.text(`${total.toLocaleString()} FCFA`, 155, y + 7);
  
  // Conditions de paiement
  y += 25;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('CONDITIONS DE PAIEMENT', 20, y);
  doc.setFont('helvetica', 'normal');
  doc.text('Échéance : Le 5 du mois en cours', 20, y + 6);
  doc.text('Mode : Virement, Chèque, Espèces', 20, y + 12);
  
  // Pied de page
  doc.setFontSize(8);
  doc.setTextColor(128, 128, 128);
  doc.text('Document généré automatiquement par Diwaan', 105, 280, { align: 'center' });
  doc.text('www.diwaan.sn | contact@diwaan.sn', 105, 285, { align: 'center' });
  
  // Télécharger
  doc.save(`Facture_${invoiceData.invoiceNumber}.pdf`);
};
```

**Usage** :
```typescript
import { generateInvoicePDF } from '@/lib/pdfGenerator';

const handleDownloadPDF = () => {
  generateInvoicePDF(formData);
};
```

---

### Option B : PDFMake (Avancé)

**Installation** :
```bash
npm install pdfmake
```

**Implémentation** :
```typescript
// src/lib/pdfMakeGenerator.ts
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export const generateProfessionalInvoice = (data: any) => {
  const docDefinition = {
    pageSize: 'A4',
    pageMargins: [40, 60, 40, 60],
    
    header: {
      columns: [
        {
          image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==', // Logo ici
          width: 50,
          margin: [40, 20, 0, 0]
        },
        {
          text: 'DIWAAN',
          fontSize: 20,
          bold: true,
          color: '#006AFF',
          margin: [0, 25, 40, 0],
          alignment: 'right'
        }
      ]
    },
    
    content: [
      {
        text: 'FACTURE DE LOYER',
        fontSize: 24,
        bold: true,
        alignment: 'center',
        margin: [0, 0, 0, 20]
      },
      
      {
        columns: [
          {
            width: '50%',
            text: [
              { text: 'N° Facture : ', bold: true },
              data.invoiceNumber + '\n',
              { text: 'Date : ', bold: true },
              new Date().toLocaleDateString('fr-FR')
            ]
          },
          {
            width: '50%',
            text: data.isCommercial ? 'Assujetti à TVA' : 'Exonéré de TVA',
            alignment: 'right',
            color: '#666666'
          }
        ],
        margin: [0, 0, 0, 30]
      },
      
      {
        columns: [
          {
            width: '50%',
            stack: [
              { text: 'BAILLEUR', style: 'sectionHeader' },
              { text: data.landlordName, bold: true },
              { text: data.landlordAddress },
              { text: data.landlordCNI ? `CNI : ${data.landlordCNI}` : '' }
            ]
          },
          {
            width: '50%',
            stack: [
              { text: 'LOCATAIRE', style: 'sectionHeader' },
              { text: data.tenantName, bold: true },
              { text: data.tenantAddress },
              { text: data.tenantCNI ? `CNI : ${data.tenantCNI}` : '' }
            ]
          }
        ],
        margin: [0, 0, 0, 30]
      },
      
      {
        text: 'BIEN LOUÉ',
        style: 'sectionHeader'
      },
      {
        text: data.propertyAddress,
        margin: [0, 0, 0, 30]
      },
      
      {
        table: {
          headerRows: 1,
          widths: ['*', 'auto'],
          body: [
            [
              { text: 'DÉSIGNATION', style: 'tableHeader' },
              { text: 'MONTANT', style: 'tableHeader', alignment: 'right' }
            ],
            [
              `Loyer ${data.month}`,
              { text: `${parseInt(data.rentAmount).toLocaleString()} FCFA`, alignment: 'right' }
            ],
            [
              'Charges locatives',
              { text: `${parseInt(data.charges).toLocaleString()} FCFA`, alignment: 'right' }
            ],
            ...(data.isCommercial ? [[
              'TVA (18%)',
              { text: `${(parseInt(data.rentAmount) * 0.18).toLocaleString()} FCFA`, alignment: 'right' }
            ]] : []),
            [
              { text: 'TOTAL À PAYER', bold: true },
              {
                text: `${(parseInt(data.rentAmount) + parseInt(data.charges) + (data.isCommercial ? parseInt(data.rentAmount) * 0.18 : 0)).toLocaleString()} FCFA`,
                bold: true,
                fontSize: 14,
                alignment: 'right'
              }
            ]
          ]
        },
        layout: {
          fillColor: (rowIndex: number) => rowIndex === 0 ? '#006AFF' : rowIndex % 2 === 0 ? '#f5f5f5' : null,
          hLineColor: () => '#dddddd',
          vLineColor: () => '#dddddd',
        },
        margin: [0, 0, 0, 30]
      },
      
      {
        text: 'CONDITIONS DE PAIEMENT',
        style: 'sectionHeader'
      },
      {
        ul: [
          'Échéance : Le 5 du mois en cours',
          'Mode de paiement : Virement, Chèque, Espèces',
          '⚠️ Pénalités de retard : 1% par mois'
        ],
        margin: [0, 0, 0, 20]
      },
      
      {
        text: [
          { text: 'Coordonnées bancaires\n', bold: true },
          `Banque : ${data.bankName || '[À COMPLÉTER]'}\n`,
          `IBAN : ${data.iban || '[À COMPLÉTER]'}\n`,
          `Titulaire : ${data.landlordName}`
        ],
        margin: [0, 0, 0, 40]
      }
    ],
    
    footer: (currentPage: number, pageCount: number) => {
      return {
        columns: [
          {
            text: `Document généré par Diwaan - ${new Date().toLocaleString('fr-FR')}`,
            alignment: 'center',
            fontSize: 8,
            color: '#999999'
          }
        ],
        margin: [40, 0, 40, 20]
      };
    },
    
    styles: {
      sectionHeader: {
        fontSize: 12,
        bold: true,
        color: '#006AFF',
        margin: [0, 0, 0, 10]
      },
      tableHeader: {
        bold: true,
        fontSize: 11,
        color: 'white',
        fillColor: '#006AFF'
      }
    },
    
    defaultStyle: {
      fontSize: 10,
      lineHeight: 1.3
    }
  };
  
  pdfMake.createPdf(docDefinition).download(`Facture_${data.invoiceNumber}.pdf`);
};
```

**Coût** : **Gratuit** ✅

---

## 2. 📧 EMAIL AUTOMATIQUE

### Option A : Resend (Recommandé - Simple)

**Pourquoi Resend** :
- API moderne et simple
- 3000 emails/mois gratuits
- Templates React
- Excellente délivrabilité

**Installation** :
```bash
npm install resend
```

**Configuration** :
```typescript
// src/lib/emailService.ts
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendInvoiceEmail = async (data: {
  to: string;
  tenantName: string;
  landlordName: string;
  invoiceNumber: string;
  amount: number;
  month: string;
  pdfBuffer?: Buffer;
}) => {
  try {
    const result = await resend.emails.send({
      from: 'Diwaan <facturation@diwaan.sn>',
      to: data.to,
      subject: `Facture de Loyer - ${data.invoiceNumber}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #006AFF 0%, #0052CC 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; border-top: none; }
            .footer { background: #f9fafb; padding: 20px; text-align: center; font-size: 12px; color: #666; border-radius: 0 0 10px 10px; }
            .button { display: inline-block; background: #006AFF; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
            .amount { font-size: 24px; color: #006AFF; font-weight: bold; }
            table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            th, td { padding: 12px; text-align: left; border-bottom: 1px solid #e5e7eb; }
            th { background: #f9fafb; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0;">📄 Facture de Loyer</h1>
              <p style="margin: 10px 0 0 0;">N° ${data.invoiceNumber}</p>
            </div>
            
            <div class="content">
              <p>Bonjour <strong>${data.tenantName}</strong>,</p>
              
              <p>Veuillez trouver ci-joint votre facture de loyer pour le mois de <strong>${data.month}</strong>.</p>
              
              <table>
                <tr>
                  <th>Période</th>
                  <td>${data.month}</td>
                </tr>
                <tr>
                  <th>Montant dû</th>
                  <td class="amount">${data.amount.toLocaleString()} FCFA</td>
                </tr>
                <tr>
                  <th>Échéance</th>
                  <td>Le 5 du mois en cours</td>
                </tr>
              </table>
              
              <p><strong>Modes de paiement acceptés :</strong></p>
              <ul>
                <li>💳 Virement bancaire</li>
                <li>📝 Chèque</li>
                <li>💵 Espèces</li>
                <li>📱 Mobile Money</li>
              </ul>
              
              <p>Pour toute question, n'hésitez pas à nous contacter.</p>
              
              <p>Cordialement,<br><strong>${data.landlordName}</strong></p>
            </div>
            
            <div class="footer">
              <p>📧 contact@diwaan.sn | 📱 +221 77 XXX XX XX</p>
              <p>© 2025 Diwaan - Gestion Immobilière Intelligente</p>
              <p style="font-size: 10px; color: #999;">
                Cet email a été envoyé automatiquement, merci de ne pas y répondre.
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
      attachments: data.pdfBuffer ? [{
        filename: `Facture_${data.invoiceNumber}.pdf`,
        content: data.pdfBuffer
      }] : []
    });

    return { success: true, messageId: result.id };
  } catch (error) {
    console.error('Erreur envoi email:', error);
    return { success: false, error };
  }
};
```

**API Route** :
```typescript
// src/app/api/send-invoice/route.ts
import { NextResponse } from 'next/server';
import { sendInvoiceEmail } from '@/lib/emailService';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    const result = await sendInvoiceEmail({
      to: data.tenantEmail,
      tenantName: data.tenantName,
      landlordName: data.landlordName,
      invoiceNumber: data.invoiceNumber,
      amount: data.amount,
      month: data.month,
      pdfBuffer: data.pdfBuffer
    });

    if (result.success) {
      return NextResponse.json({ success: true, messageId: result.messageId });
    } else {
      return NextResponse.json({ success: false, error: result.error }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Erreur serveur' }, { status: 500 });
  }
}
```

**Utilisation** :
```typescript
const sendInvoiceByEmail = async () => {
  try {
    const response = await fetch('/api/send-invoice', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tenantEmail: 'tenant@example.com',
        tenantName: formData.tenantName,
        landlordName: formData.landlordName,
        invoiceNumber: formData.invoiceNumber,
        amount: parseInt(formData.rentAmount) + parseInt(formData.charges),
        month: formData.month
      })
    });

    const data = await response.json();
    
    if (data.success) {
      alert('✅ Email envoyé avec succès !');
    } else {
      alert('❌ Erreur lors de l\'envoi');
    }
  } catch (error) {
    console.error(error);
  }
};
```

**Variables d'environnement** :
```env
# .env.local
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxx
```

**Inscription** :
1. Allez sur https://resend.com
2. Créez un compte
3. Vérifiez votre domaine (ou utilisez onboarding@resend.dev)
4. Copiez votre API Key

**Coût** : **Gratuit** (3000 emails/mois) ✅

---

### Option B : SendGrid (Alternative)

**Installation** :
```bash
npm install @sendgrid/mail
```

**Configuration** :
```typescript
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export const sendViaSendGrid = async (data: any) => {
  const msg = {
    to: data.to,
    from: 'facturation@diwaan.sn',
    subject: `Facture ${data.invoiceNumber}`,
    html: '...' // Template
  };

  await sgMail.send(msg);
};
```

**Coût** : **Gratuit** (100 emails/jour) ✅

---

## 3. 📱 WHATSAPP BUSINESS API

### Twilio WhatsApp Business

**Installation** :
```bash
npm install twilio
```

**Configuration** :
```typescript
// src/lib/whatsappService.ts
import twilio from 'twilio';

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export const sendWhatsAppInvoice = async (data: {
  to: string; // Format: whatsapp:+221771234567
  tenantName: string;
  invoiceNumber: string;
  amount: number;
  month: string;
  pdfUrl?: string;
}) => {
  try {
    const message = await client.messages.create({
      from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
      to: data.to,
      body: `Bonjour ${data.tenantName},

📄 *Facture de Loyer* - ${data.invoiceNumber}

Période : ${data.month}
Montant : *${data.amount.toLocaleString()} FCFA*

Échéance : Le 5 du mois en cours

Modes de paiement :
💳 Virement bancaire
📝 Chèque  
💵 Espèces
📱 Mobile Money

${data.pdfUrl ? `\n📥 Télécharger la facture : ${data.pdfUrl}` : ''}

Merci !
*Diwaan Gestion Immobilière*`,
      ...(data.pdfUrl && {
        mediaUrl: [data.pdfUrl]
      })
    });

    return { success: true, sid: message.sid };
  } catch (error) {
    console.error('Erreur WhatsApp:', error);
    return { success: false, error };
  }
};
```

**API Route** :
```typescript
// src/app/api/send-whatsapp/route.ts
import { NextResponse } from 'next/server';
import { sendWhatsAppInvoice } from '@/lib/whatsappService';

export async function POST(request: Request) {
  const data = await request.json();
  
  const result = await sendWhatsAppInvoice({
    to: `whatsapp:${data.phoneNumber}`,
    tenantName: data.tenantName,
    invoiceNumber: data.invoiceNumber,
    amount: data.amount,
    month: data.month,
    pdfUrl: data.pdfUrl
  });

  return NextResponse.json(result);
}
```

**Variables d'environnement** :
```env
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_WHATSAPP_NUMBER=+14155238886
```

**Inscription** :
1. https://www.twilio.com/try-twilio
2. Créer compte
3. WhatsApp Sandbox (test) ou Business account (production)
4. Copier credentials

**Coût** : 
- **Sandbox** : Gratuit (test)
- **Production** : $0.005/message (~3 FCFA)

---

## 4. ✍️ SIGNATURE ÉLECTRONIQUE

### DocuSign Integration

**Installation** :
```bash
npm install docusign-esign
```

**Configuration** :
```typescript
// src/lib/docusignService.ts
import docusign from 'docusign-esign';

const apiClient = new docusign.ApiClient();
apiClient.setBasePath(process.env.DOCUSIGN_BASE_PATH!);
apiClient.addDefaultHeader('Authorization', `Bearer ${process.env.DOCUSIGN_ACCESS_TOKEN}`);

export const sendForSignature = async (data: {
  documentBase64: string;
  documentName: string;
  signerEmail: string;
  signerName: string;
  landlordEmail: string;
  landlordName: string;
}) => {
  try {
    const envelopesApi = new docusign.EnvelopesApi(apiClient);
    
    // Créer l'enveloppe
    const envelope = {
      emailSubject: `Signature requise - ${data.documentName}`,
      documents: [{
        documentBase64: data.documentBase64,
        name: data.documentName,
        fileExtension: 'pdf',
        documentId: '1'
      }],
      recipients: {
        signers: [
          {
            email: data.landlordEmail,
            name: data.landlordName,
            recipientId: '1',
            routingOrder: '1',
            tabs: {
              signHereTabs: [{
                xPosition: '100',
                yPosition: '200',
                documentId: '1',
                pageNumber: '1'
              }]
            }
          },
          {
            email: data.signerEmail,
            name: data.signerName,
            recipientId: '2',
            routingOrder: '2',
            tabs: {
              signHereTabs: [{
                xPosition: '300',
                yPosition: '200',
                documentId: '1',
                pageNumber: '1'
              }]
            }
          }
        ]
      },
      status: 'sent'
    };

    const result = await envelopesApi.createEnvelope(
      process.env.DOCUSIGN_ACCOUNT_ID!,
      { envelopeDefinition: envelope }
    );

    return { success: true, envelopeId: result.envelopeId };
  } catch (error) {
    console.error('Erreur DocuSign:', error);
    return { success: false, error };
  }
};
```

**Variables d'environnement** :
```env
DOCUSIGN_INTEGRATION_KEY=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
DOCUSIGN_USER_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
DOCUSIGN_ACCOUNT_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
DOCUSIGN_BASE_PATH=https://demo.docusign.net/restapi
DOCUSIGN_ACCESS_TOKEN=eyJ0eXAiOiJNVCIsImFsZ...
```

**Inscription** :
1. https://www.docusign.com/developer-center
2. Créer compte développeur
3. Créer Integration Key
4. Générer Access Token (OAuth)

**Coût** :
- **Developer** : Gratuit (sandbox)
- **Production** : $25/mois (10 enveloppes) ou $40/mois (illimité)

---

## 5. ☁️ ARCHIVAGE CLOUD

### Option A : Google Drive

**Installation** :
```bash
npm install googleapis
```

**Configuration** :
```typescript
// src/lib/googleDriveService.ts
import { google } from 'googleapis';
import fs from 'fs';

const auth = new google.auth.GoogleAuth({
  keyFile: process.env.GOOGLE_SERVICE_ACCOUNT_KEY_FILE,
  scopes: ['https://www.googleapis.com/auth/drive.file']
});

const drive = google.drive({ version: 'v3', auth });

export const uploadToGoogleDrive = async (data: {
  fileName: string;
  fileBuffer: Buffer;
  mimeType: string;
  folderId?: string;
}) => {
  try {
    const fileMetadata = {
      name: data.fileName,
      ...(data.folderId && { parents: [data.folderId] })
    };

    const media = {
      mimeType: data.mimeType,
      body: require('stream').Readable.from(data.fileBuffer)
    };

    const file = await drive.files.create({
      requestBody: fileMetadata,
      media: media,
      fields: 'id, webViewLink, webContentLink'
    });

    // Partager publiquement (optionnel)
    await drive.permissions.create({
      fileId: file.data.id!,
      requestBody: {
        role: 'reader',
        type: 'anyone'
      }
    });

    return {
      success: true,
      fileId: file.data.id,
      webViewLink: file.data.webViewLink,
      webContentLink: file.data.webContentLink
    };
  } catch (error) {
    console.error('Erreur Google Drive:', error);
    return { success: false, error };
  }
};

// Créer un dossier pour un locataire
export const createTenantFolder = async (tenantName: string) => {
  const fileMetadata = {
    name: `Diwaan - ${tenantName}`,
    mimeType: 'application/vnd.google-apps.folder'
  };

  const folder = await drive.files.create({
    requestBody: fileMetadata,
    fields: 'id'
  });

  return folder.data.id;
};
```

**Service Account Setup** :
1. https://console.cloud.google.com
2. Créer projet
3. Activer Google Drive API
4. Créer Service Account
5. Télécharger JSON key
6. Placer dans `credentials/google-service-account.json`

**Variables d'environnement** :
```env
GOOGLE_SERVICE_ACCOUNT_KEY_FILE=./credentials/google-service-account.json
GOOGLE_DRIVE_FOLDER_ID=1aBcDeFg...
```

**Coût** : **Gratuit** (15GB) ✅

---

### Option B : Dropbox

**Installation** :
```bash
npm install dropbox
```

**Configuration** :
```typescript
// src/lib/dropboxService.ts
import { Dropbox } from 'dropbox';

const dbx = new Dropbox({
  accessToken: process.env.DROPBOX_ACCESS_TOKEN
});

export const uploadToDropbox = async (data: {
  path: string;
  fileBuffer: Buffer;
}) => {
  try {
    const result = await dbx.filesUpload({
      path: data.path,
      contents: data.fileBuffer,
      mode: { '.tag': 'overwrite' }
    });

    // Créer lien de partage
    const sharedLink = await dbx.sharingCreateSharedLinkWithSettings({
      path: result.result.path_display!
    });

    return {
      success: true,
      path: result.result.path_display,
      sharedLink: sharedLink.result.url
    };
  } catch (error) {
    return { success: false, error };
  }
};
```

**Variables d'environnement** :
```env
DROPBOX_ACCESS_TOKEN=sl.xxxxxxxxxxxxxxxxxx
```

**Coût** : **Gratuit** (2GB) ✅

---

## 6. ⚙️ CONFIGURATION COMPLÈTE

### Installation Complète

```bash
# PDF
npm install jspdf pdfmake

# Email
npm install resend @sendgrid/mail

# WhatsApp
npm install twilio

# Signature
npm install docusign-esign

# Cloud Storage
npm install googleapis dropbox

# Utilities
npm install dotenv
```

### Variables d'Environnement (.env.local)

```env
# Resend (Email)
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxx

# SendGrid (Alternative Email)
SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxxxxxxxx

# Twilio (WhatsApp)
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_WHATSAPP_NUMBER=+14155238886

# DocuSign (Signature)
DOCUSIGN_INTEGRATION_KEY=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
DOCUSIGN_USER_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
DOCUSIGN_ACCOUNT_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
DOCUSIGN_BASE_PATH=https://demo.docusign.net/restapi
DOCUSIGN_ACCESS_TOKEN=eyJ0eXAiOiJNVCIsImFsZ...

# Google Drive
GOOGLE_SERVICE_ACCOUNT_KEY_FILE=./credentials/google-service-account.json
GOOGLE_DRIVE_FOLDER_ID=1aBcDeFg...

# Dropbox
DROPBOX_ACCESS_TOKEN=sl.xxxxxxxxxxxxxxxxxx

# Application
NEXT_PUBLIC_APP_URL=http://localhost:3001
```

---

## 📊 COMPARAISON DES SOLUTIONS

| Service | Installation | Coût/mois | Difficulté | Recommandé |
|---------|--------------|-----------|------------|------------|
| **jsPDF** | ⭐ Simple | Gratuit | ⭐ Facile | ✅ Oui |
| **PDFMake** | ⭐⭐ Moyen | Gratuit | ⭐⭐ Moyen | ✅ Oui |
| **Resend** | ⭐ Simple | Gratuit | ⭐ Facile | ✅✅ Très recommandé |
| **SendGrid** | ⭐⭐ Moyen | Gratuit | ⭐⭐ Moyen | ✅ Alternat human |
| **Twilio WhatsApp** | ⭐⭐ Moyen | $20-50 | ⭐⭐⭐ Avancé | ✅ Production |
| **DocuSign** | ⭐⭐⭐ Complexe | $25-40 | ⭐⭐⭐ Avancé | ⚠️ Si nécessaire |
| **Google Drive** | ⭐⭐ Moyen | Gratuit | ⭐⭐ Moyen | ✅ Oui |
| **Dropbox** | ⭐ Simple | Gratuit | ⭐ Facile | ✅ Alternative |

---

## 🎯 PLAN D'IMPLÉMENTATION RECOMMANDÉ

### Phase 1 (Jour 1)
1. ✅ jsPDF pour PDF basique
2. ✅ Resend pour emails
3. ✅ Google Drive pour archivage

**Résultat** : Système fonctionnel gratuit

### Phase 2 (Jour 2)
4. ✅ PDFMake pour PDF professionnel
5. ✅ Templates email avancés

**Résultat** : Qualité professionnelle

### Phase 3 (Jour 3)
6. ✅ Twilio WhatsApp
7. ✅ DocuSign (si budget)

**Résultat** : Solution complète

---

## 💰 BUDGET TOTAL

### Version Gratuite
- PDF : jsPDF (**Gratuit**)
- Email : Resend 3000/mois (**Gratuit**)
- Cloud : Google Drive (**Gratuit**)
**TOTAL** : **0 FCFA/mois** ✅

### Version Professionnelle
- PDF : PDFMake (**Gratuit**)
- Email : Resend Unlimited (**20$/mois**)
- WhatsApp : Twilio (**~30$/mois**)
- Signature : DocuSign (**25$/mois**)
- Cloud : Google Drive (**Gratuit**)
**TOTAL** : **~75$/mois** (~45.000 FCFA)

---

## 🚀 PROCHAINES ÉTAPES

1. **Choisir les services** selon budget
2. **Créer les comptes** (Resend, Twilio, etc.)
3. **Copier les clés API** dans `.env.local`
4. **Implémenter progressivement** (Phase 1 → 2 → 3)
5. **Tester** en environnement dev
6. **Déployer** en production

---

## ✅ CHECKLIST FINALE

- [ ] jsPDF installé et testé
- [ ] PDFMake configuré (optionnel)
- [ ] Resend account créé
- [ ] Variables d'environnement configurées
- [ ] Test envoi email réussi
- [ ] Twilio account créé (si WhatsApp)
- [ ] Google Drive API activée
- [ ] Service Account créé
- [ ] Upload test Drive réussi
- [ ] DocuSign configuré (optionnel)
- [ ] Documentation lue

---

**© 2025 Diwaan - Guide d'Implémentation v2.0**

*Besoin d'aide ? contact@diwaan.sn*
