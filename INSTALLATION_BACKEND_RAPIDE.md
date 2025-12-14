# 🚀 INSTALLATION RAPIDE BACKEND API

## Commandes à Exécuter dans l'Ordre

### 1. Installer les Packages Nécessaires

```bash
npm install prisma @prisma/client bcryptjs jsonwebtoken zod date-fns
npm install @types/bcryptjs @types/jsonwebtoken --save-dev
```

### 2. Initialiser Prisma

```bash
npx prisma init
```

### 3. Configurer la Base de Données

#### Option A : MongoDB Atlas (Recommandé - Gratuit)

1. Créer un compte sur https://www.mongodb.com/cloud/atlas/register
2. Créer un cluster gratuit (M0)
3. Créer un utilisateur database
4. Obtenir la connection string
5. Ajouter votre IP aux IP autorisées

#### Option B : MongoDB Local

```bash
# Installer MongoDB localement
# Puis utiliser:
DATABASE_URL="mongodb://localhost:27017/diwaan"
```

### 4. Éditer `.env`

Créer/Modifier le fichier `.env` à la racine :

```env
# Database
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/diwaan?retryWrites=true&w=majority"

# JWT Secrets (CHANGEZ CES VALEURS!)
JWT_SECRET="votre_secret_super_securise_aleatoire_min_32_caracteres"
NEXTAUTH_SECRET="autre_secret_different_aleatoire_min_32_caracteres"

# App
NEXTAUTH_URL="http://localhost:3001"
NODE_ENV="development"

# Cloudinary (déjà configuré)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"
```

### 5. Créer le Schéma Prisma

Le fichier `prisma/schema.prisma` devrait contenir:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mongodb"
  url      = env("DATABASE_URL")
}

model User {
  id            String    @id @default(auto()) @map("_id") @db.ObjectId
  email         String    @unique
  password      String
  name          String
  phone         String?
  role          UserRole  @default(USER)
  avatar        String?
  emailVerified DateTime?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  
  properties    Property[]
  favorites     Favorite[]
  messages      Message[]  @relation("UserMessages")
  sentMessages  Message[]  @relation("SentMessages")
  transactions  Transaction[]
  
  @@map("users")
}

enum UserRole {
  USER
  AGENT
  ADMIN
  OWNER
}

model Property {
  id              String   @id @default(auto()) @map("_id") @db.ObjectId
  title           String
  description     String
  type            PropertyType
  status          PropertyStatus @default(DRAFT)
  transactionType TransactionType
  price           Float
  surface         Float
  bedrooms        Int?
  bathrooms       Int?
  floor           Int?
  yearBuilt       Int?
  
  address         String
  city            String
  neighborhood    String
  postalCode      String?
  latitude        Float?
  longitude       Float?
  
  images          String[]
  videoUrl        String?
  virtualTourUrl  String?
  
  features        String[]
  
  ownerId         String   @db.ObjectId
  owner           User     @relation(fields: [ownerId], references: [id])
  
  agentId         String?
  
  views           Int      @default(0)
  featured        Boolean  @default(false)
  verified        Boolean  @default(false)
  
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  publishedAt     DateTime?
  
  favorites       Favorite[]
  transactions    Transaction[]
  
  @@map("properties")
}

enum PropertyType {
  HOUSE
  APARTMENT
  LAND
  COMMERCIAL
  VILLA
  STUDIO
}

enum PropertyStatus {
  DRAFT
  PENDING
  ACTIVE
  SOLD
  RENTED
  ARCHIVED
}

enum TransactionType {
  SALE
  RENT
}

model Favorite {
  id         String   @id @default(auto()) @map("_id") @db.ObjectId
  userId     String   @db.ObjectId
  propertyId String   @db.ObjectId
  createdAt  DateTime @default(now())
  
  user       User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  property   Property @relation(fields: [propertyId], references: [id], onDelete: Cascade)
  
  @@unique([userId, propertyId])
  @@map("favorites")
}

model Transaction {
  id          String           @id @default(auto()) @map("_id") @db.ObjectId
  type        TransactionType
  amount      Float
  commission  Float?
  status      TransactionStatus @default(PENDING)
  
  propertyId  String            @db.ObjectId
  property    Property          @relation(fields: [propertyId], references: [id])
  
  buyerId     String            @db.ObjectId
  buyer       User              @relation(fields: [buyerId], references: [id])
  
  notes       String?
  createdAt   DateTime          @default(now())
  updatedAt   DateTime          @updatedAt
  closedAt    DateTime?
  
  @@map("transactions")
}

enum TransactionStatus {
  PENDING
  PAID
  COMPLETED
  CANCELLED
}

model Message {
  id         String   @id @default(auto()) @map("_id") @db.ObjectId
  content    String
  read       Boolean  @default(false)
  
  senderId   String   @db.ObjectId
  sender     User     @relation("SentMessages", fields: [senderId], references: [id])
  
  receiverId String   @db.ObjectId
  receiver   User     @relation("UserMessages", fields: [receiverId], references: [id])
  
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt
  
  @@map("messages")
}
```

### 6. Générer le Client Prisma

```bash
npx prisma generate
```

### 7. Synchroniser avec la Base de Données

```bash
npx prisma db push
```

Cette commande va :
- Créer les collections dans MongoDB
- Créer les index nécessaires
- Valider le schéma

### 8. (Optionnel) Seed la Database

Créer `prisma/seed.ts` :

```typescript
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Admin user
  const adminPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@diwaan.sn' },
    update: {},
    create: {
      email: 'admin@diwaan.sn',
      password: adminPassword,
      name: 'Admin Diwaan',
      role: 'ADMIN',
    },
  });

  console.log('✅ Admin créé:', admin.email);

  // Test properties
  const property = await prisma.property.create({
    data: {
      title: 'Belle Villa Almadies Vue Mer',
      description: 'Magnifique villa avec vue imprenable sur la mer...',
      type: 'VILLA',
      transactionType: 'SALE',
      status: 'ACTIVE',
      price: 150000000,
      surface: 250,
      bedrooms: 4,
      bathrooms: 3,
      address: 'Route des Almadies',
      city: 'Dakar',
      neighborhood: 'Almadies',
      images: [
        'https://via.placeholder.com/800x600/006AFF/FFFFFF?text=Villa+1',
      ],
      features: ['Piscine', 'Jardin', 'Parking', 'Sécurité 24/7'],
      ownerId: admin.id,
      verified: true,
    },
  });

  console.log('✅ Propriété créée:', property.title);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

Ajouter dans `package.json` :

```json
"prisma": {
  "seed": "ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts"
}
```

Installer ts-node :

```bash
npm install -D ts-node
```

Exécuter le seed :

```bash
npx prisma db seed
```

### 9. Vérifier que Tout Fonctionne

```bash
# Ouvrir Prisma Studio (interface web)
npx prisma studio
```

Cela ouvre http://localhost:5555 pour voir vos données !

### 10. Redémarrer le Serveur de Développement

```bash
npm run dev
```

---

## ✅ VÉRIFICATION

### Tester avec cURL

**1. Register**:
```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@diwaan.sn",
    "password": "password123",
    "name": "Test User"
  }'
```

**2. Login**:
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@diwaan.sn",
    "password": "password123"
  }'
```

Vous devriez recevoir un token JWT !

**3. Get Properties**:
```bash
curl http://localhost:3001/api/properties
```

---

## 🐛 TROUBLESHOOTING

### Erreur: "Cannot find module '@prisma/client'"
```bash
npx prisma generate
```

### Erreur: "Connection refused" MongoDB
- Vérifiez votre DATABASE_URL
- Vérifiez que MongoDB est démarré (si local)
- Vérifiez IP whitelist (si Atlas)

### Erreur: "Module not found: Can't resolve 'bcryptjs'"
```bash
npm install bcryptjs
```

### Voir les logs Prisma
Ajouter dans `src/lib/prisma.ts` :
```typescript
log: ['query', 'info', 'warn', 'error'],
```

---

## 📚 COMMANDES UTILES

```bash
# Voir toutes les commandes Prisma
npx prisma --help

# Format schema
npx prisma format

# Valider schema
npx prisma validate

# Générer des migrations (si PostgreSQL)
npx prisma migrate dev

# Reset database
npx prisma db push --force-reset

# Voir les données
npx prisma studio
```

---

## 🎯 PROCHAINES ÉTAPES

1. ✅ Créer les API routes (déjà documentées dans BACKEND_API_IMPLEMENTATION.md)
2. ✅ Tester avec Postman
3. ✅ Intégrer au frontend (AuthContext)
4. ✅ Déployer sur Vercel
5. ✅ Configurer backups MongoDB

---

**Temps estimé total : 30-45 minutes** ⏱️

**© 2025 Diwaan - Installation Backend**
