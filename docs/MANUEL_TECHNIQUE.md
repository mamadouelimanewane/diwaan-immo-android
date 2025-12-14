# 🔧 MANUEL TECHNIQUE - DIWAAN
## Documentation Technique Complète

**Version** : 1.0.0  
**Date** : 10 Décembre 2025  
**Stack** : Next.js 15 + TypeScript + React 19

---

## 📑 TABLE DES MATIÈRES

1. [Architecture](#architecture)
2. [Stack Technique](#stack-technique)
3. [Structure du Projet](#structure-du-projet)
4. [Installation](#installation)
5. [Configuration](#configuration)
6. [Composants](#composants)
7. [Routes & Pages](#routes--pages)
8. [Context API](#context-api)
9. [Styling](#styling)
10. [API & Intégrations](#api--intégrations)
11. [Base de Données](#base-de-données)
12. [Déploiement](#déploiement)
13. [Tests](#tests)
14. [Performance](#performance)
15. [Sécurité](#sécurité)

---

## 🏗️ ARCHITECTURE

### Vue d'Ensemble

```
┌─────────────────────────────────────────────┐
│           FRONTEND (Next.js App)            │
├─────────────────────────────────────────────┤
│  React Components + TypeScript + CSS Modules│
├─────────────────────────────────────────────┤
│      Context API (State Management)         │
├─────────────────────────────────────────────┤
│         Next.js App Router                  │
├─────────────────────────────────────────────┤
│    Server Components + Client Components    │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│          API Routes (optionnel)             │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│        Base de Données (Future)             │
│      PostgreSQL + Prisma ORM                │
└─────────────────────────────────────────────┘
```

### Patterns Utilisés

- **Component Composition** : Composants réutilisables
- **Context API** : State management global
- **Server/Client Components** : Optimisation Next.js 15
- **CSS Modules** : Scoped styling
- **Dynamic Imports** : Code splitting

---

## 💻 STACK TECHNIQUE

### Core

| Technologie | Version | Usage |
|-------------|---------|-------|
| **Next.js** | 15.0.3 | Framework React |
| **React** | 19.0.0 | UI Library |
| **TypeScript** | 5.x | Type safety |
| **Node.js** | 20+ | Runtime |

### Styling

- **CSS Modules** : Styling scopé
- **CSS Variables** : Theming
- **Lucide React** : Icônes

### Maps & Geo

- **Leaflet** : Carte interactive
- **React-Leaflet** : Binding React

### State Management

- **Context API** : Global state
- **React Hooks** : Local state

### Future Stack

- **Prisma** : ORM base de données
- **PostgreSQL** : Base de données
- **NextAuth** : Authentification
- **Cloudinary** : Upload images
- **Stripe** : Paiements

---

## 📁 STRUCTURE DU PROJET

```
zillow-clone/
├── public/                 # Assets statiques
│   ├── images/
│   └── icons/
│
├── src/
│   ├── app/               # Next.js App Router
│   │   ├── layout.tsx     # Root layout ('use client')
│   │   ├── page.tsx       # Homepage
│   │   ├── globals.css    # Styles globaux
│   │   │
│   │   ├── admin/         # Section Admin
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── properties/
│   │   │   ├── users/
│   │   │   ├── agents/
│   │   │   ├── content/
│   │   │   ├── messages/
│   │   │   ├── verification/
│   │   │   ├── finance/
│   │   │   ├── workflows/
│   │   │   ├── ads/
│   │   │   ├── intelligence/
│   │   │   └── security/
│   │   │
│   │   ├── login/         # Authentification
│   │   ├── dashboard/     # User dashboard
│   │   ├── search/        # Recherche + Map
│   │   ├── rent/          # Location
│   │   ├── sell/          # Vente
│   │   ├── agents/        # Liste agents
│   │   ├── loans/         # Prêts
│   │   └── ...
│   │
│   ├── components/        # Composants réutilisables
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── LayoutWrapper.tsx
│   │   │
│   │   ├── admin/
│   │   │   ├── AdminSidebar.tsx
│   │   │   └── AdminChart.tsx
│   │   │
│   │   ├── map/
│   │   │   └── Map.tsx    # Leaflet (no SSR)
│   │   │
│   │   ├── PropertyCard.tsx
│   │   ├── Gallery.tsx
│   │   └── SenrewBot.tsx  # → DiwaanBot
│   │
│   ├── context/           # Context API
│   │   ├── AuthContext.tsx
│   │   ├── FavoritesContext.tsx
│   │   ├── ThemeContext.tsx
│   │   └── LanguageContext.tsx
│   │
│   └── lib/               # Utilities
│       ├── data.ts        # Mock data
│       ├── openai.ts      # OpenAI config
│       └── utils.ts       # Helper functions
│
├── docs/                  # Documentation
│   ├── MANUEL_UTILISATEUR.md
│   ├── MANUEL_TECHNIQUE.md
│   └── MANUEL_ADMINISTRATION.md
│
├── .env.local             # Variables d'environnement
├── next.config.mjs        # Config Next.js
├── tsconfig.json          # Config TypeScript
├── package.json           # Dependencies
└── README.md
```

---

## ⚙️ INSTALLATION

### Prérequis

- **Node.js** : >= 20.0.0
- **npm** ou **yarn** ou **pnpm**
- **Git**

### Installation Locale

```bash
# 1. Cloner le repo
git clone https://github.com/your-org/diwaan.git
cd diwaan

# 2. Installer les dépendances
npm install
# ou
yarn install
# ou
pnpm install

# 3. Créer .env.local
cp .env.example .env.local

# 4. Lancer en dev
npm run dev

# 5. Ouvrir
http://localhost:3001
```

### Commandes Disponibles

```bash
# Développement
npm run dev          # Lance le serveur dev
npm run build        # Build production
npm run start        # Lance le build
npm run lint         # Linter ESLint

# Utilitaires
npm run clean        # Nettoie .next et node_modules
npm run type-check   # Vérification TypeScript
```

---

## 🔧 CONFIGURATION

### Variables d'Environnement

Créez `.env.local` :

```env
# App
NEXT_PUBLIC_APP_NAME=Diwaan
NEXT_PUBLIC_APP_URL=http://localhost:3001

# API Keys (Future)
OPENAI_API_KEY=sk-...
MAPBOX_TOKEN=pk.eyJ1...

# Database (Future)
DATABASE_URL=postgresql://user:pass@localhost:5432/diwaan

# Auth (Future)
NEXTAUTH_URL=http://localhost:3001
NEXTAUTH_SECRET=your-secret-key

# Upload (Future)
CLOUDINARY_CLOUD_NAME=diwaan
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...

# Payment (Future)
STRIPE_PUBLIC_KEY=pk_test...
STRIPE_SECRET_KEY=sk_test...
```

### next.config.mjs

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com'],
    formats: ['image/avif', 'image/webp'],
  },
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
};

export default nextConfig;
```

### tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{"name": "next"}],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

---

## 🧩 COMPOSANTS

### Composants Clés

#### PropertyCard

**Fichier** : `src/components/PropertyCard.tsx`

```typescript
'use client';

import { Property } from '@/lib/data';
import { Heart } from 'lucide-react';
import Link from 'next/link';
import { useFavorites } from '@/context/FavoritesContext';

export default function PropertyCard({ property }: { property: Property }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  
  return (
    <div className={styles.card}>
      {/* Image + Favori */}
      <div className={styles.imageContainer}>
        <img src={property.imageUrl} alt={property.address} />
        <button onClick={() => toggleFavorite(property.id)}>
          <Heart fill={isFavorite(property.id) ? 'red' : 'none'} />
        </button>
      </div>
      
      {/* Infos */}
      <Link href={`/homes/${property.id}`}>
        <div className={styles.content}>
          <div className={styles.price}>{property.price} FCFA</div>
          <div>{property.beds} ch | {property.baths} sdb</div>
          <div>{property.address}, {property.city}</div>
        </div>
      </Link>
    </div>
  );
}
```

#### Map (Leaflet)

**Fichier** : `src/components/map/Map.tsx`

```typescript
'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix Leaflet icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/marker-icon-2x.png',
  iconUrl: '/marker-icon.png',
  shadowUrl: '/marker-shadow.png',
});

export default function Map({ properties }: { properties: Property[] }) {
  return (
    <MapContainer center={[14.6937, -17.4441]} zoom={12} style={{ height: '100%', width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      
      {properties.map(prop => (
        <Marker key={prop.id} position={[prop.lat, prop.lng]}>
          <Popup>
            <strong>{prop.price} FCFA</strong><br />
            {prop.address}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
```

**Import Dynamique** (pas de SSR) :

```typescript
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('@/components/map/Map'), {
  ssr: false,
  loading: () => <div>Chargement carte...</div>
});
```

---

## 🛣️ ROUTES & PAGES

### Route Structure

| Route | Type | Description |
|-------|------|-------------|
| `/` | Server | Homepage |
| `/search` | Client | Recherche + Map |
| `/rent` | Server | Liste locations |
| `/sell` | Server | Options vente |
| `/agents` | Client | Liste agents |
| `/login` | Client | Authentification |
| `/dashboard` | Client | Dashboard user |
| `/admin/*` | Client | Administration |

### Server vs Client Components

**Server Component** (par défaut) :
```typescript
// Pas de 'use client'
export default function HomePage() {
  return <div>Static content</div>;
}
```

**Client Component** (interactivité) :
```typescript
'use client';

import { useState } from 'react';

export default function SearchPage() {
  const [filters, setFilters] = useState({});
  // ...
}
```

---

## 🌐 CONTEXT API

### AuthContext

**Fichier** : `src/context/AuthContext.tsx`

```typescript
'use client';

import { createContext, useContext, useState } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'agent' | 'user';
}

const AuthContext = createContext<{
  user: User | null;
  login: (email: string, role: string) => void;
  logout: () => void;
} | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  
  const login = (email: string, role: 'admin' | 'agent' | 'user') => {
    const newUser = { id: '1', name: email.split('@')[0], email, role };
    setUser(newUser);
    localStorage.setItem('diwaan_user', JSON.stringify(newUser));
  };
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem('diwaan_user');
  };
  
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be within AuthProvider');
  return context;
};
```

### Utilisation

```typescript
'use client';

import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const { login } = useAuth();
  
  const handleLogin = () => {
    login('admin@diwaan.sn', 'admin');
  };
}
```

---

## 🎨 STYLING

### CSS Variables (globals.css)

```css
:root {
  --primary: #FF6B35;        /* Orange vif */
  --primary-hover: #E63946;  /* Rouge corail */
  --secondary: #06FFA5;      /* Cyan vif */
  --background: #ffffff;
  --foreground: #2a2a33;
}

[data-theme='dark'] {
  --background: #0f111a;
  --foreground: #ffffff;
}
```

### CSS Modules

**Button.module.css** :
```css
.button {
  background: var(--primary);
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  transition: all 0.2s;
}

.button:hover {
  background: var(--primary-hover);
  transform: translateY(-2px);
}
```

**Usage** :
```typescript
import styles from './Button.module.css';

<button className={styles.button}>Click me</button>
```

---

## 🔌 API & INTÉGRATIONS

### OpenAI (DiwaanBot)

**Fichier** : `src/lib/openai.ts`

```typescript
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true, // Dev only
});

export async function chatWithBot(message: string): Promise<string> {
  const completion = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      {
        role: 'system',
        content: 'You are Diwaan AI assistant for real estate in Senegal...'
      },
      { role: 'user', content: message }
    ],
  });
  
  return completion.choices[0].message.content || 'Désolé, erreur.';
}
```

### Leaflet Maps

**Installation** :
```bash
npm install leaflet react-leaflet
npm install -D @types/leaflet
```

**Configuration** : Dynamic import (no SSR)

---

## 🗄️ BASE DE DONNÉES (FUTURE)

### Prisma Schema

**prisma/schema.prisma** :

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String
  role      Role     @default(USER)
  createdAt DateTime @default(now())
  
  properties Property[]
  favorites  Favorite[]
}

model Property {
  id          String   @id @default(cuid())
  title       String
  description String
  price       Int
  beds        Int
  baths       Int
  sqft        Int
  address     String
  city        String
  lat         Float
  lng         Float
  imageUrl    String
  type        PropertyType
  status      PropertyStatus @default(ACTIVE)
  createdAt   DateTime @default(now())
  
  userId String
  user   User   @relation(fields: [userId], references: [id])
  
  favorites Favorite[]
}

model Favorite {
  id         String   @id @default(cuid())
  userId     String
  propertyId String
  createdAt  DateTime @default(now())
  
  user     User     @relation(fields: [userId], references: [id])
  property Property @relation(fields: [propertyId], references: [id])
  
  @@unique([userId, propertyId])
}

enum Role {
  USER
  AGENT
  ADMIN
}

enum PropertyType {
  HOUSE
  APARTMENT
  VILLA
  LAND
}

enum PropertyStatus {
  ACTIVE
  PENDING
  SOLD
}
```

### Migrations

```bash
# Créer migration
npx prisma migrate dev --name init

# Générer client
npx prisma generate

# Ouvrir Prisma Studio
npx prisma studio
```

---

## 🚀 DÉPLOIEMENT

### Vercel (Recommandé)

```bash
# 1. Installer Vercel CLI
npm i -g vercel

# 2. Login
vercel login

# 3. Deploy
vercel

# 4. Production
vercel --prod
```

**Configuration** :
- Build Command : `npm run build`
- Output Directory : `.next`
- Install Command : `npm install`

### Variables d'Environnement Vercel

Dashboard → Settings → Environment Variables

```
OPENAI_API_KEY=sk-...
DATABASE_URL=postgres://...
NEXTAUTH_SECRET=...
```

### Autres Plateformes

- **Netlify** : Supporte Next.js
- **Railway** : Deploy facile
- **AWS Amplify** : Infrastructure AWS
- **DigitalOcean App Platform**

---

## 🧪 TESTS

### Jest + Testing Library

**Installation** :
```bash
npm install -D jest @testing-library/react @testing-library/jest-dom
npm install -D @types/jest
```

**jest.config.js** :
```javascript
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};
```

**Exemple Test** :
```typescript
// PropertyCard.test.tsx
import { render, screen } from '@testing-library/react';
import PropertyCard from '@/components/PropertyCard';

test('renders property card', () => {
  const property = { id: '1', price: 50000000, address: 'Dakar' };
  render(<PropertyCard property={property} />);
  
  expect(screen.getByText('50000000 FCFA')).toBeInTheDocument();
});
```

### E2E avec Playwright

```bash
npm install -D @playwright/test
npx playwright install
```

**Exemple E2E** :
```typescript
// e2e/search.spec.ts
import { test, expect } from '@playwright/test';

test('search for properties', async ({ page }) => {
  await page.goto('http://localhost:3001/search');
  await page.fill('input[placeholder*="Adresse"]', 'Dakar');
  await page.click('button:has-text("Rechercher")');
  
  await expect(page.locator('.property-card')).toHaveCount(greaterThan(0));
});
```

---

## ⚡ PERFORMANCE

### Optimisations

1. **Dynamic Imports**
   ```typescript
   const Map = dynamic(() => import('@/components/map/Map'), { ssr: false });
   ```

2. **Image Optimization**
   ```typescript
   import Image from 'next/image';
   
   <Image src={property.imageUrl} width={400} height={300} alt="..." />
   ```

3. **Lazy Loading**
   - Suspense boundaries
   - Loading states

4. **Code Splitting**
   - Automatic avec Next.js
   - Route-based splitting

### Lighthouse Score Target

- Performance : **90+**
- Accessibility : **95+**
- Best Practices : **95+**
- SEO : **100**

---

## 🔒 SÉCURITÉ

### Bonnes Pratiques

1. **Environment Variables** : Jamais commit `.env`
2. **HTTPS Only** en production
3. **CORS** : Configurer les origins autorisées
4. **Rate Limiting** : Sur les API routes
5. **Input Sanitization** : Toujours valider
6. **SQL Injection** : Utiliser Prisma (parameterized queries)
7. **XSS Protection** : React échappe automatiquement

### Headers de Sécurité

**next.config.mjs** :
```javascript
async headers() {
  return [
    {
      source: '/:path*',
      headers: [
        { key: 'X-DNS-Prefetch-Control', value: 'on' },
        { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
      ],
    },
  ];
},
```

---

## 📚 RESSOURCES

### Documentation Officielle

- Next.js : https://nextjs.org/docs
- React : https://react.dev
- TypeScript : https://typescriptlang.org/docs
- Leaflet : https://leafletjs.com
- Prisma : https://prisma.io/docs

### Communauté

- GitHub : https://github.com/diwaan-platform
- Discord : discord.gg/diwaan
- Forum : forum.diwaan.sn

---

**© 2025 Diwaan Group - Documentation Technique**

*Dernière mise à jour : 10/12/2025*
