# 🚀 GUIDE DE DÉPLOIEMENT COMPLET - VERCEL & MONGODB

## ✅ SYSTÈME À DÉPLOYER

### Ce Qui Est Prêt

**Backend** :
- 9 API Routes fonctionnelles
- Moteur de calcul intelligent
- Système d'emails (Resend)
- Génération PDF

**Frontend** :
- Dashboard Admin intégré
- Dashboard Promoteur
- Dashboard Agence
- Formulaire Réservation

**Base de Données** :
- 23 modèles Prisma
- Schema complet synchronisé

---

## 📋 CHECKLIST PRÉ-DÉPLOIEMENT

### 1. Vérifications Locales

#### A. Prisma Schema
```bash
# Vérifier le schema
npx prisma validate

# Générer le client
npx prisma generate
```

#### B. Build Local
```bash
# Tester le build
npm run build

# Vérifier qu'il n'y a pas d'erreurs
```

#### C. Variables d'Environnement
Vérifier que `.env.local` contient :
```env
DATABASE_URL="mongodb+srv://admin:Astelwane123@diwaan.wsogaea.mongodb.net/diwaan"
RESEND_API_KEY="re_..."
```

---

## 🗄️ ÉTAPE 1 : MONGODB ATLAS

### Mise à Jour du Schema

#### Option A : Via Prisma Push (Recommandé)
```bash
# Push le nouveau schema vers MongoDB Atlas
npx prisma db push
```

**Résultat attendu** :
```
✔ Your database is now in sync with your Prisma schema.
✔ Generated Prisma Client
```

#### Option B : Vérification Manuelle

1. **Connexion MongoDB Atlas**
   ```
   https://cloud.mongodb.com/
   ```

2. **Vérifier les Collections**
   - Aller dans "Browse Collections"
   - Database : `diwaan`
   - Vérifier les 23 collections :
     ```
     users
     properties
     property_inquiries
     favorites
     transactions
     messages
     developers ✅ NEW
     real_estate_agencies ✅ NEW
     commercial_agents ✅ NEW
     partnerships ✅ NEW
     contract_clauses ✅ NEW
     developer_projects ✅ NEW
     plot_type_configs ✅ NEW
     developer_plots ✅ NEW
     pricing_rules ✅ NEW
     margin_configs ✅ NEW
     commission_structures ✅ NEW
     plot_price_revisions ✅ NEW
     plot_reservations ✅ NEW
     reservation_payments ✅ NEW
     developer_sales ✅ NEW
     agent_commissions ✅ NEW
     price_calculation_history ✅ NEW
     ```

### Seed des Données (Optionnel)

Si vous voulez peupler la base :

```bash
# Lancer le seed
node prisma/seed-partnership.ts
```

---

## 🌐 ÉTAPE 2 : VERCEL

### A. Préparer le Déploiement

#### 1. Commit tous les changements
```bash
git add .
git commit -m "feat: Add partnership system - Complete integration"
git push origin main
```

#### 2. Fichiers à vérifier

**`package.json`** - Scripts corrects :
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "postinstall": "prisma generate"
  }
}
```

**`next.config.mjs`** - Config Vercel :
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['randomuser.me', 'images.unsplash.com'],
  },
};

export default nextConfig;
```

### B. Déployer sur Vercel

#### Via Dashboard Vercel

1. **Aller sur** : https://vercel.com/dashboard

2. **Import Project**
   - Cliquer "Add New..."
   - Sélectionner "Project"
   - Importer depuis Git

3. **Configuration**
   - Repository : `zillow-clone`
   - Framework Preset : `Next.js`
   - Root Directory : `./`

4. **Environment Variables** ⭐ IMPORTANT
   
   Ajouter dans Vercel :
   
   ```env
   DATABASE_URL=mongodb+srv://admin:Astelwane123@diwaan.wsogaea.mongodb.net/diwaan
   RESEND_API_KEY=re_DqXU3uWu_FATJMZMvQ7RWDkJgfaTPBqUy
   ```

   **Comment** :
   - Settings → Environment Variables
   - Add Variable
   - Name : `DATABASE_URL`
   - Value : `mongodb+srv://...`
   - Environnements : Production, Preview, Development
   - Save

5. **Deploy**
   - Cliquer "Deploy"
   - Attendre ~3-5 minutes

#### Via CLI Vercel

```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter
vercel login

# Déployer
vercel

# Ou directement en production
vercel --prod
```

### C. Configuration Post-Déploiement

#### 1. Vérifier le Déploiement

**URL** : `https://zillow-clone-five.vercel.app/`

**Tester** :
```
✅ Homepage
✅ /admin (Dashboard avec section partenariat)
✅ /agency/dashboard
✅ /agency/reservations/new
```

#### 2. Vérifier les APIs

**Tester dans le navigateur ou Postman** :
```
GET https://zillow-clone-five.vercel.app/api/developers
GET https://zillow-clone-five.vercel.app/api/agencies
GET https://zillow-clone-five.vercel.app/api/partnerships
GET https://zillow-clone-five.vercel.app/api/projects
GET https://zillow-clone-five.vercel.app/api/plots
GET https://zillow-clone-five.vercel.app/api/reservations
```

**Réponse attendue** :
```json
{
  "success": true,
  "developers": [],
  "count": 0
}
```

#### 3. Vérifier Prisma

**Dans les logs Vercel** :
```
Functions → Logs
```

Chercher :
```
✔ Generated Prisma Client
```

---

## 🔧 RÉSOLUTION DES PROBLÈMES

### Problème 1 : Prisma Client Not Generated

**Erreur** :
```
Error: Cannot find module '@prisma/client'
```

**Solution** :
```bash
# package.json doit avoir
"postinstall": "prisma generate"

# Redéployer
vercel --prod
```

### Problème 2 : DATABASE_URL Not Found

**Erreur** :
```
PrismaClientInitializationError: error: Environment variable not found: DATABASE_URL
```

**Solution** :
1. Vercel Dashboard
2. Settings → Environment Variables
3. Ajouter `DATABASE_URL`
4. Redeploy

### Problème 3 : MongoDB Connection Failed

**Erreur** :
```
MongoServerError: bad auth
```

**Solution** :
1. Vérifier le mot de passe dans `DATABASE_URL`
2. MongoDB Atlas → Database Access
3. Vérifier que l'utilisateur `admin` existe
4. Vérifier Network Access (0.0.0.0/0 autorisé)

### Problème 4 : Build Failed

**Erreur** :
```
Type error: ...
```

**Solution** :
```bash
# Tester le build localement
npm run build

# Corriger les erreurs TypeScript
# Puis commit et push
```

---

## ✅ VÉRIFICATION FINALE

### Checklist de Déploiement

```
✅ [ ] Git push réussi
✅ [ ] Vercel build success
✅ [ ] Environment variables configurées
✅ [ ] Prisma client généré
✅ [ ] MongoDB connecté
✅ [ ] Homepage accessible
✅ [ ] /admin accessible
✅ [ ] APIs fonctionnelles
✅ [ ] Emails Resend configurés
```

### Tests Post-Déploiement

#### 1. Tester le Dashboard Admin
```
https://zillow-clone-five.vercel.app/admin
```

**Vérifier** :
- Section "Système de Partenariat" visible
- Statistiques chargées (0 au début)
- Liens fonctionnels

#### 2. Tester une API
```bash
curl https://zillow-clone-five.vercel.app/api/developers
```

**Réponse attendue** :
```json
{
  "success": true,
  "developers": [],
  "count": 0
}
```

#### 3. Créer un Promoteur
```bash
curl -X POST https://zillow-clone-five.vercel.app/api/developers \
  -H "Content-Type: application/json" \
  -d '{
    "legalName": "TEST PROMO SA",
    "rccm": "TEST001",
    "ninea": "TEST002",
    "email": "test@promoteur.sn",
    "address": "Dakar",
    "city": "Dakar",
    "phone": "+221771234567",
    "representativeName": "Test User",
    "representativeTitle": "CEO"
  }'
```

#### 4. Vérifier MongoDB
```
MongoDB Atlas → Collections → developers
```

Devrait contenir le promoteur créé.

---

## 📊 MONITORING

### Vercel Analytics

**Activer** :
- Dashboard Vercel
- Onglet "Analytics"
- Activer Web Analytics

**Métriques** :
- Temps de réponse APIs
- Taux d'erreur
- Trafic temps réel

### Logs

**Accéder aux logs** :
```
Vercel Dashboard → Functions → Logs
```

**Filtrer** :
- Par fonction
- Par erreur
- Par période

---

## 🚀 COMMANDES RAPIDES

### Déploiement Complet

```bash
# 1. Vérifier le schema
npx prisma validate

# 2. Générer le client
npx prisma generate

# 3. Tester le build
npm run build

# 4. Commit
git add .
git commit -m "Update: Partnership system deployment"
git push origin main

# 5. Déployer
vercel --prod

# 6. Push schema vers MongoDB
npx prisma db push
```

### Rollback

Si problème :
```bash
# Vercel Dashboard → Deployments
# Trouver le dernier déploiement stable
# Cliquer "..." → Promote to Production
```

---

## 📝 NOTES IMPORTANTES

### 1. Environment Variables

**Toujours ajouter dans** :
- Production
- Preview
- Development

**Ne JAMAIS commit** :
- `.env.local`
- `.env`

### 2. MongoDB Atlas

**Sécurité** :
- Utiliser un mot de passe fort
- Limiter les IP si possible
- Activer MongoDB Atlas logs

### 3. Resend API

**Limites** :
- Free: 100 emails/jour
- Surveiller la consommation
- Upgrade si nécessaire

---

## 🎊 SUCCÈS !

**Votre système de partenariat est maintenant déployé sur Vercel !**

### URLs

- **Production** : https://zillow-clone-five.vercel.app/
- **Admin** : https://zillow-clone-five.vercel.app/admin
- **Agence** : https://zillow-clone-five.vercel.app/agency/dashboard

### Prochaines Étapes

1. ✅ Tester toutes les fonctionnalités
2. ✅ Créer les données de test
3. ✅ Former les utilisateurs
4. ✅ Monitorer les performances
5. ✅ Collecter les feedbacks

---

**Le système est opérationnel et accessible en ligne !** 🎉🚀
