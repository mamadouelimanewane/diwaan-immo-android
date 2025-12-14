# 🔧 Guide : MongoDB Local + Seed + Email

## 1. 📧 Corriger l'Email (RESEND_API_KEY)

### Pourquoi vous ne recevez pas d'email ?

La variable **RESEND_API_KEY** n'est **pas configurée dans Vercel**.

### Solution

**Vercel Dashboard** :
1. Projet "zillow-clone" → Settings → Environment Variables
2. Cliquer "Add Variable"

```
Name         : RESEND_API_KEY
Value        : re_7MAWCQAx_6zJGCBhdZMAyc6huBBnkBSHj
Environments : ✅ Production ✅ Preview ✅ Development
Sensitive    : ✅ Cocher
```

3. **Save**
4. **Redeploy** (Deployments → ... → Redeploy)
5. **Retester** le formulaire de contact

**Résultat attendu** : Email reçu sur mamadouelimane.dia@gmail.com

---

## 2. 🔌 Utiliser MongoDB Local en Développement

### Configuration Environnements Multiples

Vous voulez :
- **Local (dev)** : MongoDB local (127.0.0.1)
- **Vercel (prod)** : MongoDB Atlas cloud

### Solution : Fichiers .env séparés

**Créer `.env.local`** (pour développement local) :
```env
# MongoDB Local
DATABASE_URL="mongodb://127.0.0.1:27017/diwaan"

# Resend (même clé partout)
RESEND_API_KEY="re_7MAWCQAx_6zJGCBhdZMAyc6huBBnkBSHj"

# Autres variables locales
JWT_SECRET="dev_secret_change_in_production"
NEXTAUTH_SECRET="dev_nextauth_secret"
NEXTAUTH_URL="http://localhost:3001"
```

**`.env.local` est déjà gitignored** ✅

### Démarrage MongoDB Local

**Windows** :
```powershell
# Si MongoDB pas encore installé
# Télécharger : https://www.mongodb.com/try/download/community

# Démarrer MongoDB (dans un terminal séparé)
mongod

# Ou si installé comme service
net start MongoDB
```

**Vérifier** :
```powershell
# Dans un autre terminal
mongosh
# Si ça se connecte → MongoDB fonctionne
# Taper: exit
```

### Structure Finale

```
Local (votre PC)
├─ .env.local              → mongodb://127.0.0.1:27017/diwaan
└─ MongoDB installé localement

Vercel (Production)
├─ Environment Variables   → mongodb+srv://...@diwaan.wsogaea.mongodb.net/diwaan
└─ Connecté à MongoDB Atlas (cloud)
```

**Avantage** :
- Développement rapide en local (pas besoin d'internet)
- Production utilise MongoDB cloud (accessible partout)
- Données séparées (pas de risque de modifier prod en dev)

---

## 3. 📊 Remplir la Base avec Données et Images

Vous avez **déjà un excellent script** : `prisma/seed.ts`

### Contenu du Script (Déjà Présent)

**Le script crée** :
- ✅ 7 utilisateurs (agents, propriétaires, admin)
- ✅ 14 propriétés variées (villas, appartements, terrains)
- ✅ Images Unsplash (gratuites et de qualité)
- ✅ Données réalistes (Dakar, Saly, Thiès, etc.)

### Lancer le Seed

#### Option 1 : Seed MongoDB Local

```powershell
# S'assurer que MongoDB local tourne
mongod

# Terminal du projet
cd c:\gravity\zillow-clone

# Vérifier .env.local pointe vers local
# DATABASE_URL="mongodb://127.0.0.1:27017/diwaan"

# Générer Prisma client (si pas fait)
npx prisma generate

# Lancer le seed
npm run seed
# Ou directement :
npx prisma db seed
```

**Résultat attendu** :
```
✔ Generating Prisma Client
✔ The seed command has been executed

Démarrage du peuplement de la base de données...
Utilisateurs créés (dont Admin).
14 propriétés créées.
Peuplement terminé avec succès.
```

#### Option 2 : Seed MongoDB Atlas (Cloud)

**Précaution** : Cela remplira votre base de production !

```powershell
# Créer un .env.atlas temporaire
# Ou modifier .env.local temporairement

DATABASE_URL="mongodb+srv://admin:Astelwane123@diwaan.wsogaea.mongodb.net/diwaan?retryWrites=true&w=majority&appName=diwaan"

# Lancer le seed
npx prisma db seed
```

**⚠️ ATTENTION** : Vos données de test iront en production.

**Recommandation** : 
- Seed en local d'abord
- Tester en local
- Puis seed en production si satisfait

### Vérifier les Données

**MongoDB Local** :
```powershell
# Ouvrir MongoDB shell
mongosh

# Se connecter à la base
use diwaan

# Lister les collections
show collections

# Voir les propriétés
db.properties.find().pretty()

# Compter
db.properties.countDocuments()  # Devrait afficher 14

# Voir un utilisateur
db.users.findOne()

# Quitter
exit
```

**MongoDB Atlas** :
1. Atlas Dashboard → Database → Browse Collections
2. Base : diwaan
3. Collections : properties, users, etc.

---

## 4. 🖼️ Images dans le Seed

### Images Actuelles (Unsplash)

Le seed utilise **Unsplash** (CDN gratuit) :
```javascript
images: [
  'https://images.unsplash.com/photo-xxxxx'
]
```

**Avantages** :
- ✅ Gratuites
- ✅ Haute qualité
- ✅ CDN rapide
- ✅ Pas besoin d'héberger

**Inconvénient** :
- ⚠️ Génériques (pas vos vraies propriétés)

### Option : Ajouter Vos Propres Images

#### A. Via Cloudinary (Recommandé)

**Créer compte Cloudinary** :
1. https://cloudinary.com (gratuit)
2. Upload vos images
3. Copier les URLs

**Modifier le seed** :
```typescript
// prisma/seed.ts
images: [
  'https://res.cloudinary.com/votre-cloud/image/upload/v123/villa1.jpg',
  'https://res.cloudinary.com/votre-cloud/image/upload/v123/villa2.jpg'
]
```

#### B. Via Upload dans l'App

**Utiliser le composant** `ImageUpload.tsx` déjà présent :
1. Démarrer l'app localement
2. Aller sur `/rent/manager/list`
3. Uploader images via interface
4. Les URLs Cloudinary seront automatiquement utilisées

#### C. Images Locales (Développement uniquement)

**Mettre images dans** `public/properties/` :
```
public/
└── properties/
    ├── villa1.jpg
    ├── villa2.jpg
    └── ...
```

**Dans le seed** :
```typescript
images: [
  '/properties/villa1.jpg',
  '/properties/villa2.jpg'
]
```

**⚠️ Limite** : Ne fonctionne qu'en local, pas sur Vercel.

---

## 5. 🎯 Workflow Complet Recommandé

### Développement Local

```powershell
# 1. Démarrer MongoDB
mongod

# 2. Nouveau terminal - Seed la base
cd c:\gravity\zillow-clone
npx prisma db seed

# 3. Démarrer l'app
npm run dev

# 4. Ouvrir
http://localhost:3001
```

**Vérifier** :
- Properties s'affichent sur /search
- Détails propriétés sur /homes/[id]
- Formulaire contact fonctionne

### Déploiement Production

```powershell
# 1. S'assurer que .env.local est local uniquement
# (ne SERA PAS déployé grâce à .gitignore)

# 2. Commit + Push
git add .
git commit -m "Add seed with properties"
git push

# 3. Vercel auto-déploie

# 4. Seed production (optionnel)
# Temporairement changer DATABASE_URL vers Atlas
npx prisma db seed

# 5. Remettre DATABASE_URL local
```

---

## 6. 📋 Checklist Complète

### Email (RESEND_API_KEY)
- [ ] Ajoutée dans Vercel Environment Variables
- [ ] Marquée "Sensitive"
- [ ] Environments : Production + Preview + Development
- [ ] Redéployé
- [ ] Testé formulaire → Email reçu

### MongoDB Local
- [ ] MongoDB installé et démarré (`mongod`)
- [ ] `.env.local` créé avec URL locale
- [ ] Prisma client généré (`npx prisma generate`)
- [ ] Base locale accessible (`mongosh`)

### Seed
- [ ] Script `prisma/seed.ts` présent ✅
- [ ] Lancé avec `npx prisma db seed`
- [ ] 7 users créés (vérifiable)
- [ ] 14 properties créées (vérifiable)
- [ ] Images Unsplash chargent correctement

### App Locale
- [ ] `npm run dev` démarre sans erreur
- [ ] Page /search affiche les propriétés
- [ ] Détails propriétés accessibles
- [ ] Formulaire contact fonctionne
- [ ] Images s'affichent

### Production Vercel
- [ ] DATABASE_URL pointe vers Atlas (cloud)
- [ ] RESEND_API_KEY configurée
- [ ] Build réussit
- [ ] Site accessible
- [ ] Formulaire envoie emails

---

## 7. 🔧 Commandes Utiles

### MongoDB Local

```powershell
# Démarrer
mongod

# Shell
mongosh

# Dans le shell
use diwaan
show collections
db.properties.find()
db.users.find()
db.properties.countDocuments()

# Vider une collection
db.properties.deleteMany({})
db.users.deleteMany({})

# Quitter
exit
```

### Prisma

```powershell
# Générer client
npx prisma generate

# Seed
npx prisma db seed

# Push schema (sans migration)
npx prisma db push

# Studio (interface visuelle)
npx prisma studio
# Ouvre http://localhost:5555
```

### Next.js

```powershell
# Dev local
npm run dev

# Build production (test)
npm run build

# Start production locale
npm start
```

---

## 8. 🆘 Problèmes Courants

### "Cannot connect to MongoDB"

**Local** :
```powershell
# Vérifier MongoDB tourne
mongosh
# Si erreur → Démarrer mongod

# Ou vérifier service Windows
net start MongoDB
```

### "Seed failed"

**Solutions** :
```powershell
# 1. Vérifier DATABASE_URL
echo $env:DATABASE_URL   # PowerShell
# Doit pointer vers la bonne base

# 2. Générer Prisma client
npx prisma generate

# 3. Vérifier connexion
npx prisma db push

# 4. Relancer seed
npx prisma db seed
```

### "Images ne chargent pas"

**Vérifier** :
- next.config.mjs contient 'images.unsplash.com' ✅
- URLs commencent par https://
- Connexion internet active

---

## 9. 📸 Exemple de Propriété après Seed

```json
{
  "_id": "67...",
  "title": "Villa R+2 de Prestige aux Almadies",
  "description": "Exceptionnelle villa contemporaine...",
  "type": "VILLA",
  "transactionType": "SALE",
  "status": "ACTIVE",
  "price": 425000000,
  "surface": 650,
  "bedrooms": 5,
  "bathrooms": 6,
  "address": "Route des Almadies, Derrière Philip Morris",
  "city": "Dakar",
  "neighborhood": "Almadies",
  "images": [
    "https://images.unsplash.com/photo-1613977257363-707ba9348227",
    "https://images.unsplash.com/photo-1613545325278-f24b0cae1224"
  ],
  "features": ["Piscine", "Groupe Électrogène", "Cuisine Équipée"],
  "featured": true,
  "verified": true,
  "views": 1540,
  "createdAt": "2025-12-14T...",
  "updatedAt": "2025-12-14T..."
}
```

---

## ✅ Résumé Actions Immédiates

### 1. Corriger Email (5 minutes)
```
Vercel → Settings → Environment Variables
→ Add RESEND_API_KEY
→ Redeploy
→ Tester
```

### 2. Seed MongoDB Atlas (10 minutes)
```powershell
# Temporairement dans .env.local
DATABASE_URL="mongodb+srv://admin:Astelwane123@diwaan.wsogaea.mongodb.net/diwaan?..."

npx prisma db seed
```

**Ou** : Seed Local puis migrer plus tard

### 3. Vérifier
- [ ] Email reçu après test formulaire
- [ ] 14 propriétés visibles sur le site
- [ ] Images s'affichent
- [ ] Données dans MongoDB Atlas

---

**Temps total** : 15-30 minutes  
**Difficulté** : ⭐⭐☆☆☆

Dites-moi par quoi vous voulez commencer !
