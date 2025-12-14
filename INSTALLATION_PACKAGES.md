# 🚀 COMMANDES D'INSTALLATION - FONCTIONNALITÉS AVANCÉES

## 📦 Installation des Packages

Exécutez ces commandes dans l'ordre :

### 1️⃣ PDF Generation (PRIORITAIRE)
```bash
npm install jspdf
```

### 2️⃣ Email (Optionnel - si vous voulez les emails automatiques)
```bash
npm install resend
```

### 3️⃣ WhatsApp (Optionnel - si vous voulez WhatsApp Business)
```bash
npm install twilio
```

### 4️⃣ Cloud Storage (Optionnel - Google Drive)
```bash
npm install googleapis
```

---

## ⚡ INSTALLATION RAPIDE (Tout en une fois)

```bash
cd c:\gravity\zillow-clone

# Installation complète
npm install jspdf resend twilio googleapis

# OU seulement l'essentiel
npm install jspdf
```

---

## ✅ APRÈS INSTALLATION

Une fois jsPDF installé, les fonctionnalités suivantes seront actives :

1. ✅ **Télécharger PDF** - Bouton fonctionnel
2. ✅ **Factures professionnelles** - Design complet
3. ✅ **Reçus de paiement** - Format légal
4. ✅ **Export automatique** - Nom personnalisé

---

## 🔧 VÉRIFICATION

Pour vérifier que jsPDF est bien installé :

```bash
npm list jspdf
```

Devrait afficher : `jspdf@X.X.X`

---

## 📄 FICHIERS CRÉÉS

✅ `src/lib/pdfGenerator.ts` - Générateur PDF complet
- generateInvoicePDF() - Pour factures
- generateReceiptPDF() - Pour reçus

---

## 🎯 PROCHAINE ÉTAPE

Après l'installation de jsPDF :
1. Redémarrer le serveur dev (npm run dev)
2. Tester la génération PDF sur /invoicing
3. Vérifier le téléchargement

---

**Note** : jsPDF est le seul package VRAIMENT nécessaire pour commencer.
Les autres (resend, twilio) sont optionnels pour fonctionnalités avancées.

---

© 2025 Diwaan - Guide d'Installation
