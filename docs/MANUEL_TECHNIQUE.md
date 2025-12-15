# 🔧 MANUEL TECHNIQUE - DIWAAN PLATFORM
**Documentation Développeur**

Version 1.0.0 | Décembre 2025

---

## 📋 TABLE DES MATIÈRES

1. [Architecture](#architecture)
2. [Installation & Configuration](#installation--configuration)
3. [Structure du Projet](#structure-du-projet)
4. [APIs](#apis)
5. [Base de Données](#base-de-donnees)
6. [Authentification & Sécurité](#authentification--securite)
7. [Déploiement](#deploiement)
8. [Tests](#tests)
9. [Maintenance](#maintenance)

---

## 🏗️ ARCHITECTURE

### Stack Technique

```
Frontend:
- Next.js 14.1.0 (React 18)
- TypeScript
- CSS Modules + Vanilla CSS
- Leaflet (cartes interactives)

Backend:
- Next.js API Routes
- Prisma ORM
- MongoDB Atlas

Authentification:
- JWT Tokens
- bcrypt (hashing)
- Cookies sécurisés

Infrastructure:
- Vercel (hosting & CI/CD)
- Cloudinary (images)
- MongoDB Atlas (database)
```

### Architecture Applicative

```
┌─────────────────────────────────────────────┐
│           CLIENT (Browser)                  │
│   Next.js Server-Side Rendering (SSR)      │
└─────────────────┬───────────────────────────┘
                  │
┌─────────────────▼───────────────────────────┐
│         API ROUTES (/app/api/*)             │
│  - Properties  - Users  - Auth              │
│  - Developers  - Agencies  - Partnerships   │
│  - Reservations  - Admin  - Backup          │
└─────────────────┬───────────────────────────┘
                  │
┌─────────────────▼───────────────────────────┐
│            PRISMA ORM                       │
│   - Type-safe queries                       │
│   - Schema migrations                       │
└─────────────────┬───────────────────────────┘
                  │
┌─────────────────▼───────────────────────────┐
│         MongoDB Atlas (Cloud)               │
│   - Properties  - Users  - Developers       │
│   - Agencies  - Partnerships  - Favorites   │
└─────────────────────────────────────────────┘
```

---

## 🚀 INSTALLATION & CONFIGURATION

### Prérequis

```bash
- Node.js >= 18.x
- npm ou yarn
- Git
- Compte MongoDB Atlas
- Compte Vercel (pour déploiement)
```

### Installation Locale

**1. Cloner le repository**
```bash
git clone https://github.com/your-org/zillow-clone.git
cd zillow-clone
```

**2. Installer les dépendances**
```bash
npm install
```

**3. Configuration des variables d'environnement**

Créer `.env.local` :
```env
# Database
DATABASE_URL="mongodb+srv://user:password@cluster.mongodb.net/diwaan"

# Authentication
JWT_SECRET="your-super-secret-jwt-key-min-32-chars"

# Email (Resend)
RESEND_API_KEY="re_xxxxxxxxxxxxx"

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="123456789012345"
CLOUDINARY_API_SECRET="your-api-secret"

# App
NEXT_PUBLIC_API_URL="http://localhost:3000"
```

**4. Générer Prisma Client**
```bash
npx prisma generate
```

**5. Synchroniser la base de données**
```bash
npx prisma db push
```

**6. Lancer en développement**
```bash
npm run dev
```

Application accessible sur : `http://localhost:3000`

---

## 📁 STRUCTURE DU PROJET

```
zillow-clone/
├── prisma/
│   └── schema.prisma          # Schéma base de données
├── public/
│   ├── placeholder.svg        # Images statiques
│   └── property-placeholder.svg
├── src/
│   ├── app/                   # Pages Next.js 14 (App Router)
│   │   ├── admin/             # Backoffice admin
│   │   │   ├── login/
│   │   │   ├── properties/
│   │   │   ├── users/
│   │   │   ├── security/
│   │   │   └── page.tsx       # Dashboard
│   │   ├── api/               # API Routes
│   │   │   ├── admin/
│   │   │   ├── auth/
│   │   │   ├── properties/
│   │   │   ├── users/
│   │   │   ├── developers/
│   │   │   ├── agencies/
│   │   │   ├── partnerships/
│   │   │   └── reservations/
│   │   ├── homes/[id]/        # Page détail propriété
│   │   ├── search/            # Page recherche
│   │   ├── login/
│   │   ├── register/
│   │   └── page.tsx           # Page d'accueil
│   ├── components/            # Composants React
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   └── Footer.tsx
│   │   ├── PropertyCard.tsx
│   │   ├── SearchFilters.tsx
│   │   └── Gallery.tsx
│   ├── context/               # React Context
│   │   ├── AuthContext.tsx
│   │   ├── FavoritesContext.tsx
│   │   └── ThemeContext.tsx
│   ├── lib/                   # Utilitaires
│   │   ├── api-client.ts      # Client API
│   │   ├── prisma.ts          # Instance Prisma
│   │   ├── jwt.ts             # JWT helpers
│   │   ├── cloudinary.ts      # Cloudinary helpers
│   │   ├── permissions.ts     # Système permissions
│   │   └── validators.ts      # Schémas Zod
│   ├── middleware.ts          # Middleware Next.js
│   └── globals.css            # Styles globaux
├── docs/                      # Documentation
│   ├── MANUEL_UTILISATEUR.md
│   ├── MANUEL_TECHNIQUE.md
│   └── MANUEL_ADMINISTRATEUR.md
├── .env.local                 # Variables environnement (local)
├── next.config.mjs            # Config Next.js
├── package.json
└── tsconfig.json              # Config TypeScript
```

---

## 🔌 APIs

### Routes Principales

#### **Authentication** (`/api/auth`)

**POST /api/auth/register**
```typescript
Request:
{
  email: string;
  password: string;
  name: string;
  role?: 'USER' | 'AGENT' | 'ADMIN';
}

Response:
{
  success: boolean;
  user: User;
  token: string;
}
```

**POST /api/auth/login**
```typescript
Request:
{
  email: string;
  password: string;
}

Response:
{
  success: boolean;
  user: User;
  token: string;
}
```

**GET /api/auth/me**
```typescript
Headers: { Authorization: "Bearer <token>" }

Response:
{
  success: boolean;
  user: User;
}
```

#### **Properties** (`/api/properties`)

**GET /api/properties**
```typescript
Query Params:
{
  transactionType?: 'SALE' | 'RENT';
  city?: string;
  minPrice?: number;
  maxPrice?: number;
  type?: 'HOUSE' | 'APARTMENT' | 'LAND';
  bedrooms?: number;
  bathrooms?: number;
}

Response:
{
  success: boolean;
  properties: Property[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}
```

**POST /api/properties**
```typescript
Request:
{
  title: string;
  description: string;
  price: number;
  transactionType: 'SALE' | 'RENT';
  type: 'HOUSE' | 'APARTMENT' | 'LAND';
  address: string;
  city: string;
  bedrooms: number;
  bathrooms: number;
  surface: number;
  images: string[];
  // ... autres champs
}

Response:
{
  success: boolean;
  property: Property;
}
```

**GET /api/properties/[id]**
```typescript
Response:
{
  success: boolean;
  property: Property;
}
```

**PUT /api/properties/[id]**
```typescript
Request: Partial<Property>

Response:
{
  success: boolean;
  property: Property;
}
```

**DELETE /api/properties/[id]**
```typescript
Response:
{
  success: boolean;
  message: string;
}
```

#### **Users** (`/api/users`)

**GET /api/users**
```typescript
Query: { role?: 'USER' | 'AGENT' | 'ADMIN' }

Response:
{
  success: boolean;
  users: User[];
  count: number;
}
```

**POST /api/users**
```typescript
Request:
{
  email: string;
  name: string;
  password: string;
  role: 'USER' | 'AGENT' | 'ADMIN';
  phone?: string;
}

Response:
{
  success: boolean;
  user: User;
}
```

#### **Admin** (`/api/admin`)

**GET /api/admin/stats**
```typescript
Response:
{
  success: boolean;
  stats: {
    totalProperties: number;
    totalUsers: number;
    activeListings: number;
    pendingListings: number;
    revenue: string;
  };
}
```

**POST /api/admin/backup**
```typescript
Response:
{
  success: boolean;
  backup: {
    id: string;
    timestamp: string;
    size: string;
    type: 'MANUAL' | 'AUTO';
    status: 'COMPLETE';
  };
}
```

### Gestion des Erreurs

```typescript
// Format standard d'erreur
{
  success: false,
  error: "Message d'erreur explicite"
}

// Codes HTTP utilisés
200 - OK
201 - Created
400 - Bad Request
401 - Unauthorized
403 - Forbidden
404 - Not Found
500 - Internal Server Error
503 - Service Unavailable
```

---

## 🗄️ BASE DE DONNÉES

### Schéma Prisma

**Modèles Principaux :**

```prisma
model User {
  id            String    @id @default(auto()) @map("_id") @db.ObjectId
  email         String    @unique
  password      String
  name          String
  phone         String?
  role          Role      @default(USER)
  avatar        String?
  emailVerified Boolean   @default(false)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  
  properties    Property[]
  favorites     Favorite[]
  inquiries     Inquiry[]
}

model Property {
  id              String            @id @default(auto()) @map("_id") @db.ObjectId
  title           String
  description     String
  price           Float
  transactionType TransactionType
  type            PropertyType
  status          PropertyStatus    @default(ACTIVE)
  address         String
  city            String
  neighborhood    String?
  bedrooms        Int
  bathrooms       Int
  surface         Float
  images          String[]
  latitude        Float?
  longitude       Float?
  featured        Boolean           @default(false)
  createdAt       DateTime          @default(now())
  updatedAt       DateTime          @updatedAt
  
  ownerId         String            @db.ObjectId
  owner           User              @relation(fields: [ownerId], references: [id])
  
  favorites       Favorite[]
  inquiries       Inquiry[]
}

enum Role {
  USER
  AGENT
  ADMIN
}

enum TransactionType {
  SALE
  RENT
}

enum PropertyType {
  HOUSE
  APARTMENT
  LAND
  OFFICE
  COMMERCIAL
}

enum PropertyStatus {
  DRAFT
  ACTIVE
  SOLD
  RENTED
  INACTIVE
}
```

### Migrations

**Créer une migration :**
```bash
npx prisma migrate dev --name add_new_field
```

**Appliquer en production :**
```bash
npx prisma migrate deploy
```

**Reset (développement uniquement) :**
```bash
npx prisma migrate reset
```

---

## 🔐 AUTHENTIFICATION & SÉCURITÉ

### JWT Tokens

**Génération :**
```typescript
// src/lib/jwt.ts
import jwt from 'jsonwebtoken';

export function signToken(payload: {
  userId: string;
  email: string;
  role: string;
}) {
  return jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: '24h'
  });
}

export function verifyToken(token: string) {
  return jwt.verify(token, process.env.JWT_SECRET!);
}
```

**Utilisation API :**
```typescript
// Dans une API route
import { verifyToken } from '@/lib/jwt';

export async function GET(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  try {
    const payload = verifyToken(token);
    // Continue...
  } catch (error) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
}
```

### Middleware Protection

```typescript
// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Protect /admin routes
  if (path.startsWith('/admin') && path !== '/admin/login') {
    const adminToken = request.cookies.get('admin_token')?.value;
    
    if (!adminToken) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};
```

### Permissions (RBAC)

```typescript
// src/lib/permissions.ts
export function hasPermission(
  userRole: Role,
  resource: string,
  action: 'create' | 'read' | 'update' | 'delete'
): boolean {
  const permissions = ROLE_PERMISSIONS[userRole];
  
  if (userRole === Role.ADMIN) {
    return true; // Admin has all permissions
  }
  
  const resourcePermission = permissions.find(p => p.resource === resource);
  return resourcePermission?.actions.includes(action) || false;
}
```

---

## 🚀 DÉPLOIEMENT

### Vercel (Production)

**1. Connexion Vercel CLI**
```bash
npm i -g vercel
vercel login
```

**2. Lier le projet**
```bash
vercel link
```

**3. Configurer les variables d'environnement**
```bash
vercel env add DATABASE_URL
vercel env add JWT_SECRET
vercel env add CLOUDINARY_API_SECRET
# ... autres variables
```

**4. Déployer**
```bash
# Preview
vercel

# Production
vercel --prod
```

### Configuration Next.js

```javascript
// next.config.mjs
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ['images.unsplash.com', 'res.cloudinary.com'],
  },
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
```

### Build Optimization

**Force Dynamic Rendering (éviter errors build) :**
```typescript
// Dans les pages qui utilisent SSR
export const dynamic = 'force-dynamic';
export const revalidate = 0;
```

---

## 🧪 TESTS

### Tests Unitaires (Jest)

```typescript
// __tests__/permissions.test.ts
import { hasPermission, Role } from '@/lib/permissions';

describe('Permissions', () => {
  test('USER can read properties', () => {
    expect(hasPermission(Role.USER, 'properties', 'read')).toBe(true);
  });

  test('USER cannot create properties', () => {
    expect(hasPermission(Role.USER, 'properties', 'create')).toBe(false);
  });

  test('ADMIN has all permissions', () => {
    expect(hasPermission(Role.ADMIN, 'properties', 'delete')).toBe(true);
  });
});
```

**Lancer les tests :**
```bash
npm test
```

### Tests E2E (Playwright)

```typescript
// tests/search.spec.ts
import { test, expect } from '@playwright/test';

test('Search properties', async ({ page }) => {
  await page.goto('http://localhost:3000/search');
  
  await page.fill('input[placeholder*="localisation"]', 'Dakar');
  await page.click('button:has-text("Rechercher")');
  
  await expect(page.locator('.property-card')).toHaveCount(6);
});
```

---

## 🔧 MAINTENANCE

### Logs & Monitoring

**Console logs (développement) :**
```typescript
console.log('[API] Properties fetched:', properties.length);
console.error('[ERROR] Database connection failed:', error);
```

**Production (Vercel) :**
- Logs accessibles dans Vercel Dashboard
- Monitoring des erreurs runtime
- Analytics de performance

### Backup Base de Données

**MongoDB Atlas (Automatique) :**
- Backups quotidiens activés
- Rétention 7 jours
- Point-in-time recovery disponible

**Manuel via API :**
```bash
curl -X POST https://zillow-clone-five.vercel.app/api/admin/backup \
  -H "Cookie: admin_token=YOUR_TOKEN"
```

### Mise à Jour Dependencies

```bash
# Vérifier les mises à jour
npm outdated

# Mettre à jour (patch & minor)
npm update

# Mise à jour majeure (avec précaution)
npm install next@latest react@latest react-dom@latest
```

---

## 📊 PERFORMANCE

### Optimisations Appliquées

1. **Image Optimization** : Next.js Image component
2. **Code Splitting** : Automatic avec Next.js
3. **Lazy Loading** : dynamic() pour composants lourds
4. **Caching** : Prisma query caching
5. **CDN** : Vercel Edge Network

### Métriques Cibles

- **LCP** (Largest Contentful Paint) : < 2.5s
- **FID** (First Input Delay) : < 100ms
- **CLS** (Cumulative Layout Shift) : < 0.1

---

## 🐛 DEBUGGING

### Outils

**1. Next.js DevTools**
```bash
npm run dev
# Ouvrir http://localhost:3000
# React DevTools dans Chrome
```

**2. Prisma Studio**
```bash
npx prisma studio
# Interface graphique pour la BDD
```

**3. Logs API**
```typescript
// Ajoutez dans les API routes
console.log('[DEBUG] Request body:', await request.json());
```

---

## 📚 RESSOURCES

- **Next.js Docs** : https://nextjs.org/docs
- **Prisma Docs** : https://www.prisma.io/docs
- **MongoDB Atlas** : https://www.mongodb.com/docs/atlas
- **Vercel Docs** : https://vercel.com/docs

---

**© 2025 Diwaan Platform - Documentation Technique**  
Version 1.0.0 | Dernière mise à jour : 15 Décembre 2025
