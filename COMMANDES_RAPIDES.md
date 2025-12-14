# ⚡ COMMANDES RAPIDES - DIWAAN

## 🎯 Installation et Activation Immédiate

### 1️⃣ Installer jsPDF (PRIORITAIRE)
```bash
cd c:\gravity\zillow-clone
npm install jspdf
```
**Résultat** : Génération PDF fonctionnelle ✅

---

### 2️⃣ Redémarrer le serveur
```bash
# Dans le terminal où tourne npm run dev
# Appuyez sur Ctrl+C pour arrêter

# Puis relancez
npm run dev
```

---

### 3️⃣ Tester
Ouvrez : http://localhost:3001/invoicing
- Remplissez le formulaire
- Cliquez "✨ Générer"
- Cliquez "📥 Télécharger PDF"
- ✅ PDF téléchargé !

---

## 🚀 Installation Complète (Optionnel)

Si vous voulez TOUTES les fonctionnalités :

```bash
npm install jspdf resend twilio googleapis
```

**Coût** : 
- jsPDF : Gratuit
- Resend : Gratuit (3000/mois)
- Twilio : ~$30/mois (production)
- googleapis : Gratuit

---

## 📧 Configuration Email (Si installé Resend)

### 1. Créer compte Resend
```
https://resend.com/signup
```

### 2. Copier API Key
Après inscription, copier votre API key

### 3. Ajouter dans .env.local
```bash
# Créer/Éditer le fichier .env.local
echo "RESEND_API_KEY=re_xxxxxxxxxxxxx" >> .env.local
```

### 4. Créer API Route
Le code est déjà fourni dans `docs/IMPLEMENTATION_AVANCEE.md`
Copier dans `src/app/api/send-invoice/route.ts`

---

## 📱 Configuration WhatsApp (Si installé Twilio)

### 1. Créer compte Twilio
```
https://www.twilio.com/try-twilio
```

### 2. Activer WhatsApp Sandbox
- Console Twilio → Messaging → Try it out → WhatsApp
- Suivre les instructions

### 3. Ajouter credentials
```bash
echo "TWILIO_ACCOUNT_SID=ACxxxxxxxx" >> .env.local
echo "TWILIO_AUTH_TOKEN=xxxxxxxx" >> .env.local
echo "TWILIO_WHATSAPP_NUMBER=+14155238886" >> .env.local
```

### 4. Créer API Route
Code dans `docs/IMPLEMENTATION_AVANCEE.md`
Copier dans `src/app/api/send-whatsapp/route.ts`

---

## ☁️ Configuration Google Drive (Si installé googleapis)

### 1. Créer projet Google Cloud
```
https://console.cloud.google.com
```

### 2. Activer Google Drive API
- APIs & Services → Enable APIs
- Chercher "Google Drive API"
- Cliquer Enable

### 3. Créer Service Account
- IAM & Admin → Service Accounts
- Create Service Account
- Télécharger JSON key

### 4. Placer le fichier
```bash
mkdir credentials
# Copier votre fichier JSON dans credentials/
# Renommer en google-service-account.json
```

### 5. Ajouter dans .env.local
```bash
echo "GOOGLE_SERVICE_ACCOUNT_KEY_FILE=./credentials/google-service-account.json" >> .env.local
```

---

## 🔍 Vérification Installation

### Vérifier les packages
```bash
npm list jspdf
npm list resend
npm list twilio
npm list googleapis
```

### Vérifier .env.local
```bash
cat .env.local
```

Devrait contenir :
```
RESEND_API_KEY=re_xxxxx
TWILIO_ACCOUNT_SID=ACxxxxx
TWILIO_AUTH_TOKEN=xxxxxxx
TWILIO_WHATSAPP_NUMBER=+14155238886
GOOGLE_SERVICE_ACCOUNT_KEY_FILE=./credentials/google-service-account.json
```

---

## 🧹 Nettoyage (Si problèmes)

### Réinstaller node_modules
```bash
rm -rf node_modules package-lock.json
npm install
```

### Nettoyer cache Next.js
```bash
rm -rf .next
npm run dev
```

### Vérifier version Node
```bash
node --version
# Devrait être >= 18.x
```

---

## 📊 Commandes Utiles

### Lancer en mode développement
```bash
npm run dev
```

### Build production
```bash
npm run build
```

### Lancer production
```bash
npm start
```

### Linter
```bash
npm run lint
```

---

## 🎯 Installation Minimale (Recommandé pour démarrer)

Pour démarrer rapidement avec l'essentiel gratuit :

```bash
# 1. Installer jsPDF
npm install jspdf

# 2. Redémarrer
# Ctrl+C puis
npm run dev

# 3. Tester sur /invoicing
```

**Résultat** :
- ✅ PDF professionnels
- ✅ Facturation complète
- ✅ 100% gratuit
- ✅ Production ready

---

## 📚 Aide

### Documentation
- `RECAP_IMPLEMENTATIONS.md` - Vue d'ensemble
- `docs/IMPLEMENTATION_AVANCEE.md` - Guide détaillé
- `INSTALLATION_PACKAGES.md` - Packages nécessaires
- `MODIFICATION_BOUTON_PDF.md` - Modification manuelle

### Support
- Email : contact@diwaan.sn
- 📄 Docs dans `/docs/`

---

## ✅ Checklist Rapide

- [ ] `npm install jspdf` exécuté
- [ ] Serveur redémarré
- [ ] Page /invoicing testée
- [ ] PDF généré avec succès
- [ ] Design validé
- [ ] (Optionnel) Resend configuré
- [ ] (Optionnel) Twilio configuré
- [ ] (Optionnel) Google Drive configuré

---

**© 2025 Diwaan**

*Une seule commande pour commencer : `npm install jspdf`* 🚀
