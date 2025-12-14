# 🎯 LANCEMENT BACKEND EN 5 MINUTES !

## ✅ CE QUI EST DÉJÀ FAIT

- ✅ Schéma Prisma créé (`prisma/schema.prisma`)
- ✅ Librairies auth créées (`src/lib/`)
- ✅ API Routes auth créées (`src/app/api/auth/`)
- ✅ API Routes properties créées (`src/app/api/properties/`)
- ✅ Script de seed créé (`prisma/seed.ts`)
- ✅ `.env.example` créé

---

## 🚀 INSTALLATION (Copier-Coller ces commandes)

### Étape 1: Installer les Packages (2 min)

```bash
npm install prisma @prisma/client bcryptjs jsonwebtoken zod date-fns
npm install @types/bcrypt js @types/jsonwebtoken ts-node --save-dev
```

### Étape 2: Initialiser Prisma (30 sec)

```bash
npx prisma init
```

### Étape 3: Configurer MongoDB (1 min)

**Option A: MongoDB Atlas (Gratuit - Recommandé)**

1. Créer compte: https://www.mongodb.com/cloud/atlas/register
2. Créer cluster gratuit (M0)
3. Créer utilisateur database
4. Whitelist your IP (0.0.0.0/0 pour tester)
5. Copier connection string

**Option B: MongoDB Local**
```bash
# Si MongoDB installé localement
DATABASE_URL="mongodb://localhost:27017/diwaan"
```

### Étape 4: Créer fichier `.env` (30 sec)

Copier `.env.example` vers `.env` et éditer:

```bash
copy .env.example .env
```

Puis éditer `.env`:
```env
DATABASE_URL="mongodb+srv://user:pass@cluster.mongodb.net/diwaan?retryWrites=true&w=majority"
JWT_SECRET="changez-moi-avec-32-caracteres-aleatoires"
NEXTAUTH_SECRET="autre-secret-different-32-caracteres"
NEXTAUTH_URL="http://localhost:3001"
```

### Étape 5: Générer Database (30 sec)

```bash
npx prisma generate
npx prisma db push
```

### Étape 6: Seed Database (30 sec)

Ajouter dans `package.json`:
```json
"prisma": {
  "seed": "ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts"
}
```

Puis exécuter:
```bash
npx prisma db seed
```

### Étape 7: Lancer l'Application (10 sec)

```bash
npm run dev
```

---

## ✅ VÉRIFICATION

### 1. Ouvrir Prisma Studio

```bash
npx prisma studio
```

Ouvre http://localhost:5555 pour voir vos données !

### 2. Tester l'API avec cURL

**Register**:
```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"test@diwaan.sn\",\"password\":\"password123\",\"name\":\"Test User\"}"
```

**Login**:
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"test@diwaan.sn\",\"password\":\"password123\"}"
```

**Get Properties**:
```bash
curl http://localhost:3001/api/properties
```

**Get Property by ID**:
```bash
curl http://localhost:3001/api/properties/[ID_HERE]
```

---

## 🎉 RÉSULTAT ATTENDU

Après le seed, vous aurez :

- ✅ **1 Admin** : `admin@diwaan.sn` / `admin123`
- ✅ **2 Agents** : `moussa.fall@diwaan.sn` / `agent123`
- ✅ **2 Propriétaires** : `amadou.kane@example.com` / `owner123`
- ✅ **1 Utilisateur** : `user@example.com` / `user123`
- ✅ **5 Propriétés** :
  - Villa Almadies (250M FCFA vente)
  - Appartement Mermoz (450K FCFA/mois location)
  - Terrain Saly (25M FCFA vente)
  - Local commercial Plateau (800K FCFA/mois)
  - Maison Ouakam (650K FCFA/mois - pending)
- ✅ **2 Favoris**

---

## 📊 ENDPOINTS API DISPONIBLES

### Authentication
- `POST /api/auth/register` - Créer compte
- `POST /api/auth/login` - Se connecter
- `GET /api/auth/me` - Utilisateur courant (auth requis)

### Properties
- `GET /api/properties` - Liste (avec filtres)
- `POST /api/properties` - Créer (auth requis)
- `GET /api/properties/[id]` - Détails
- `PUT /api/properties/[id]` - Modifier (auth requis)
- `DELETE /api/properties/[id]` - Supprimer (auth requis)

### Filtres disponibles sur GET /api/properties
- `?page=1&limit=20` - Pagination
- `?type=VILLA` - Type (HOUSE, APARTMENT, LAND, COMMERCIAL, VILLA, STUDIO)
- `?city=Dakar` - Ville
- `?neighborhood=Almadies` - Quartier
- `?minPrice=10000000&maxPrice=100000000` - Prix
- `?minSurface=100&maxSurface=500` - Surface
- `?bedrooms=3` - Chambres minimum
- `?transactionType=SALE` - SALE ou RENT
- `?featured=true` - Propriétés en vedette
- `?search=villa` - Recherche textuelle

---

## 🔐 UTILISATION AVEC TOKEN

Pour les endpoints nécessitant authentification:

1. **Login** pour obtenir le token:
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"admin@diwaan.sn\",\"password\":\"admin123\"}"
```

Réponse:
```json
{
  "success": true,
  "user": {...},
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

2. **Utiliser le token**:
```bash
curl -X POST http://localhost:3001/api/properties \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d "{...property data...}"
```

---

## 🐛 TROUBLESHOOTING

### Erreur: "Cannot find module '@prisma/client'"
```bash
npx prisma generate
```

### Erreur: "Connection refused" MongoDB
- Vérifiez DATABASE_URL dans `.env`
- MongoDB Atlas: vérifiez IP whitelist
- MongoDB local: vérifiez que le service tourne

### Erreur: "Module not found: Can't resolve 'bcryptjs'"
```bash
npm install bcryptjs
```

### Voir logs Prisma détaillés
Éditer `src/lib/prisma.ts`:
```typescript
log: ['query', 'info', 'warn', 'error'],
```

### Reset database complète
```bash
npx prisma db push --force-reset
npx prisma db seed
```

---

## 📚 DOCUMENTATION COMPLÈTE

- `BACKEND_API_IMPLEMENTATION.md` - Guide détaillé
- `INSTALLATION_BACKEND_RAPIDE.md` - Installation pas-à-pas
- `AUDIT_BACKOFFICE_COMPLET.md` - Audit backoffice
- `RAPPORT_AUDIT_COMPLET.md` - Audit site web

---

## 🎯 PROCHAINES ÉTAPES

1. ✅ Intégrer API au frontend (AuthContext)
2. ✅ Remplacer données mockées par API calls
3. ✅ Ajouter formulaires de création propriétés
4. ✅ Tester avec Postman
5. ✅ Déployer sur Vercel + MongoDB Atlas

---

## ⏱️ TEMPS TOTAL : ~5 MINUTES

- Installation packages: 2 min
- Configuration MongoDB: 1 min
- Setup Prisma: 1 min
- Seed: 30 sec
- Tests: 30 sec

---

## 🎉 FÉLICITATIONS !

Votre backend API est maintenant **100% opérationnel** !

**© 2025 Diwaan - Backend Ready**
