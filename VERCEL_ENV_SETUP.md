# Variables d'Environnement pour Vercel

## Comment configurer dans Vercel:

1. Aller sur https://vercel.com/dashboard
2. Sélectionner votre projet
3. Settings → Environment Variables
4. Ajouter chaque variable ci-dessous

---

## Variables CRITIQUES (Obligatoires)

### Base de Données MongoDB
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/diwaan?retryWrites=true&w=majority"
# ⚠️ Remplacer par votre vraie URL MongoDB Atlas
# 📝 Comment obtenir: https://www.mongodb.com/cloud/atlas → Create Cluster → Connect

### Email (Resend)
RESEND_API_KEY="re_votre_clé_ici"
# ⚠️ Utiliser votre clé existante: re_7MAWCQAx_6zJGCBhdZMAyc6huBBnkBSHj
# 📝 Ou régénérer sur: https://resend.com/api-keys

### Authentication
JWT_SECRET="votre_secret_jwt_minimum_32_caracteres_aleatoires_change_moi"
NEXTAUTH_SECRET="autre_secret_nextauth_different_minimum_32_caracteres"
NEXTAUTH_URL="https://votre-app.vercel.app"
# ⚠️ NEXTAUTH_URL: Remplacer par votre URL Vercel après premier déploiement

---

## Variables OPTIONNELLES (Si fonctionnalités utilisées)

### Cloudinary (Upload d'images)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="votre_cloud_name"
CLOUDINARY_API_KEY="votre_api_key"
CLOUDINARY_API_SECRET="votre_api_secret"
# 📝 Créer compte: https://cloudinary.com

### OpenAI (Assistant IA)
NEXT_PUBLIC_OPENAI_API_KEY="sk-..."
# 📝 Obtenir clé: https://platform.openai.com/api-keys

### Twilio (WhatsApp - optionnel)
TWILIO_ACCOUNT_SID="votre_account_sid"
TWILIO_AUTH_TOKEN="votre_auth_token"
TWILIO_WHATSAPP_NUMBER="+14155238886"

### Google Drive (optionnel)
GOOGLE_SERVICE_ACCOUNT_KEY_FILE="le_contenu_json_du_service_account"

---

## Configuration dans Vercel

### Pour chaque variable:
1. Name: Le nom exacte (ex: DATABASE_URL)
2. Value: La valeur (copier-coller)
3. Environment: Cocher "Production" ET "Preview"
4. Sensitive: ✅ COCHER pour toutes les clés secrètes

### Variables à marquer "Sensitive":
- ✅ DATABASE_URL
- ✅ RESEND_API_KEY
- ✅ JWT_SECRET
- ✅ NEXTAUTH_SECRET
- ✅ All API keys

### Variables publiques (PAS sensitive):
- NEXTAUTH_URL
- NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME

---

## Génération de secrets sécurisés

### Pour JWT_SECRET et NEXTAUTH_SECRET:
```bash
# Option 1: OpenSSL
openssl rand -base64 32

# Option 2: Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# Option 3: En ligne
# https://generate-secret.vercel.app/32
```

---

## Vérification

Après configuration, redéployer:
```bash
vercel --prod
```

Vérifier les logs:
```bash
vercel logs <deployment-url>
```

---

## ⚠️ IMPORTANT

- Ne JAMAIS commiter ces valeurs dans Git
- `.env` et `.env.local` sont déjà gitignorés ✅
- Régénérer les clés si exposées publiquement
- Utiliser des valeurs différentes pour Production vs Preview

---

## Support

- Documentation Vercel: https://vercel.com/docs/environment-variables
- MongoDB Atlas: https://www.mongodb.com/docs/atlas/
- Resend Docs: https://resend.com/docs
