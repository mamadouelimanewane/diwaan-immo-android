# 🔧 GUIDE IMPLÉMENTATION BACKEND API - DIWAAN

## Configuration Backend Complète

---

## 📋 TABLE DES MATIÈRES

1. [Architecture](#architecture)
2. [Installation](#installation)
3. [Configuration Database](#database)
4. [Modèles Prisma](#prisma)
5. [API Routes](#api-routes)
6. [Authentification JWT](#auth)
7. [Middleware](#middleware)
8. [Tests](#tests)

---

## 🏗️ ARCHITECTURE

### Stack Technique

```
Backend:
- Next.js 14 App Router (API Routes)
- Prisma ORM
- MongoDB Atlas (ou PostgreSQL)
- JWT Authentication
- bcrypt (hash passwords)
- Zod (validation)
```

### Structure Fichiers

```
src/
├── app/
│   └── api/
│       ├── auth/
│       │   ├── login/route.ts
│       │   ├── register/route.ts
│       │   ├── logout/route.ts
│       │   └── me/route.ts
│       ├── properties/
│       │   ├── route.ts (GET, POST)
│       │   └── [id]/route.ts (GET, PUT, DELETE)
│       ├── users/
│       │   ├── route.ts
│       │   └── [id]/route.ts
│       ├── transactions/
│       │   └── route.ts
│       ├── messages/
│       │   └── route.ts
│       └── upload/
│           └── route.ts
├── lib/
│   ├── prisma.ts
│   ├── auth.ts
│   ├── jwt.ts
│   └── validators.ts
├── middleware.ts
└── prisma/
    └── schema.prisma
```

---

## 📦 INSTALLATION

### Étape 1: Packages Nécessaires

```bash
# Core packages
npm install prisma @prisma/client

# Auth & Security
npm install bcryptjs jsonwebtoken
npm install @types/bcryptjs @types/jsonwebtoken --save-dev

# Validation
npm install zod

# Utilities
npm install date-fns
```

### Étape 2: Initialize Prisma

```bash
npx prisma init
```

Cela crée:
- `prisma/schema.prisma`
- `.env` (avec DATABASE_URL)

---

## 🗄️ DATABASE CONFIGURATION

### Option A: MongoDB Atlas (Recommandé)

**1. Créer compte MongoDB Atlas**
- https://www.mongodb.com/cloud/atlas/register
- Free tier : 512MB gratuit

**2. Créer cluster**
- Choisir région proche (EU-West ou similaire)
- Tier gratuit M0

**3. Obtenir connection string**
```
mongodb+srv://username:password@cluster.mongodb.net/diwaan?retryWrites=true&w=majority
```

**4. Ajouter à `.env`**
```env
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/diwaan?retryWrites=true&w=majority"
JWT_SECRET="votre_secret_super_securise_changez_moi"
NEXTAUTH_SECRET="autre_secret_different"
NEXTAUTH_URL="http://localhost:3001"
```

### Option B: PostgreSQL Local

```env
DATABASE_URL="postgresql://user:password@localhost:5432/diwaan"
```

---

## 🎨 SCHÉMA PRISMA COMPLET

Créez `prisma/schema.prisma`:

```prisma
// This is your Prisma schema file

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
  id          String            @id @default(auto()) @map("_id") @db.ObjectId
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

### Générer le client Prisma

```bash
npx prisma generate
npx prisma db push
```

---

## 🔐 CONFIGURATION AUTHENTIFICATION

### 1. Créer `src/lib/prisma.ts`

```typescript
import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query', 'error', 'warn'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
```

### 2. Créer `src/lib/jwt.ts`

```typescript
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export interface JWTPayload {
  userId: string;
  email: string;
  role: string;
}

export function signToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch (error) {
    return null;
  }
}
```

### 3. Créer `src/lib/auth.ts`

```typescript
import bcrypt from 'bcryptjs';
import { prisma } from './prisma';
import { signToken } from './jwt';

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export async function createUser(data: {
  email: string;
  password: string;
  name: string;
  phone?: string;
  role?: string;
}) {
  const hashedPassword = await hashPassword(data.password);
  
  const user = await prisma.user.create({
    data: {
      ...data,
      password: hashedPassword,
      role: (data.role as any) || 'USER',
    },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      avatar: true,
      createdAt: true,
    },
  });
  
  const token = signToken({
    userId: user.id,
    email: user.email,
    role: user.role,
  });
  
  return { user, token };
}

export async function authenticateUser(email: string, password: string) {
  const user = await prisma.user.findUnique({
    where: { email },
  });
  
  if (!user) {
    throw new Error('Invalid credentials');
  }
  
  const isValid = await verifyPassword(password, user.password);
  
  if (!isValid) {
    throw new Error('Invalid credentials');
  }
  
  const token = signToken({
    userId: user.id,
    email: user.email,
    role: user.role,
  });
  
  const { password: _, ...userWithoutPassword } = user;
  
  return { user: userWithoutPassword, token };
}
```

### 4. Créer `src/lib/validators.ts`

```typescript
import { z } from 'zod';

export const registerSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(8, 'Minimum 8 caractères'),
  name: z.string().min(2, 'Nom requis'),
  phone: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(1, 'Mot de passe requis'),
});

export const propertySchema = z.object({
  title: z.string().min(10, 'Titre trop court'),
  description: z.string().min(50, 'Description trop courte'),
  type: z.enum(['HOUSE', 'APARTMENT', 'LAND', 'COMMERCIAL', 'VILLA', 'STUDIO']),
  transactionType: z.enum(['SALE', 'RENT']),
  price: z.number().positive('Prix invalide'),
  surface: z.number().positive('Surface invalide'),
  bedrooms: z.number().int().min(0).optional(),
  bathrooms: z.number().int().min(0).optional(),
  address: z.string().min(5, 'Adresse requise'),
  city: z.string().min(2, 'Ville requise'),
  neighborhood: z.string().min(2, 'Quartier requis'),
  images: z.array(z.string()).min(1, 'Au moins 1 image requise'),
});
```

---

## 🛣️ API ROUTES COMPLÈTES

### AUTH ROUTES

#### `src/app/api/auth/register/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { createUser } from '@/lib/auth';
import { registerSchema } from '@/lib/validators';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validation
    const validation = registerSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.errors },
        { status: 400 }
      );
    }
    
    // Vérifier si email existe
    const existing = await prisma.user.findUnique({
      where: { email: body.email },
    });
    
    if (existing) {
      return NextResponse.json(
        { error: 'Email déjà utilisé' },
        { status: 400 }
      );
    }
    
    // Créer utilisateur
    const { user, token } = await createUser(validation.data);
    
    return NextResponse.json({ user, token }, { status: 201 });
  } catch (error: any) {
    console.error('Register error:', error);
    return NextResponse.json(
      { error: error.message || 'Erreur serveur' },
      { status: 500 }
    );
  }
}
```

#### `src/app/api/auth/login/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { authenticatUser } from '@/lib/auth';
import { loginSchema } from '@/lib/validators';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validation
    const validation = loginSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.errors },
        { status: 400 }
      );
    }
    
    // Authentifier
    const { user, token } = await authenticateUser(
      validation.data.email,
      validation.data.password
    );
    
    return NextResponse.json({ user, token });
  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: error.message || 'Identifiants invalides' },
      { status: 401 }
    );
  }
}
```

#### `src/app/api/auth/me/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/jwt';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.split(' ')[1];
    
    if (!token) {
      return NextResponse.json(
        { error: 'Non authentifié' },
        { status: 401 }
      );
    }
    
    const payload = verifyToken(token);
    
    if (!payload) {
      return NextResponse.json(
        { error: 'Token invalide' },
        { status: 401 }
      );
    }
    
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        role: true,
        avatar: true,
        createdAt: true,
      },
    });
    
    if (!user) {
      return NextResponse.json(
        { error: 'Utilisateur non trouvé' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
```

---

### PROPERTIES ROUTES

#### `src/app/api/properties/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/jwt';
import { propertySchema } from '@/lib/validators';

// GET /api/properties - Liste des propriétés
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const type = searchParams.get('type');
    const city = searchParams.get('city');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const transactionType = searchParams.get('transactionType');
    
    const where: any = {
      status: 'ACTIVE',
    };
    
    if (type) where.type = type;
    if (city) where.city = city;
    if (transactionType) where.transactionType = transactionType;
    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price.gte = parseFloat(minPrice);
      if (maxPrice) where.price.lte = parseFloat(maxPrice);
    }
    
    const [properties, total] = await Promise.all([
      prisma.property.findMany({
        where,
        take: limit,
        skip: (page - 1) * limit,
        orderBy: { createdAt: 'desc' },
        include: {
          owner: {
            select: {
              id: true,
              name: true,
              email: true,
              phone: true,
              avatar: true,
            },
          },
        },
      }),
      prisma.property.count({ where }),
    ]);
    
    return NextResponse.json({
      properties,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('GET properties error:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

// POST /api/properties - Créer propriété
export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.split(' ')[1];
    
    if (!token) {
      return NextResponse.json(
        { error: 'Non authentifié' },
        { status: 401 }
      );
    }
    
    const payload = verifyToken(token);
    
    if (!payload) {
      return NextResponse.json(
        { error: 'Token invalide' },
        { status: 401 }
      );
    }
    
    const body = await request.json();
    
    // Validation
    const validation = propertySchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.errors },
        { status: 400 }
      );
    }
    
    // Créer propriété
    const property = await prisma.property.create({
      data: {
        ...validation.data,
        ownerId: payload.userId,
        status: 'PENDING', // Doit être vérifié par admin
      },
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
    
    return NextResponse.json({ property }, { status: 201 });
  } catch (error) {
    console.error('POST property error:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
```

#### `src/app/api/properties/[id]/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/jwt';

// GET /api/properties/[id]
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const property = await prisma.property.findUnique({
      where: { id: params.id },
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            avatar: true,
          },
        },
      },
    });
    
    if (!property) {
      return NextResponse.json(
        { error: 'Propriété non trouvée' },
        { status: 404 }
      );
    }
    
    // Incrémenter vues
    await prisma.property.update({
      where: { id: params.id },
      data: { views: { increment: 1 } },
    });
    
    return NextResponse.json({ property });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

// PUT /api/properties/[id]
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const token = request.headers.get('authorization')?.split(' ')[1];
    
    if (!token) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }
    
    const payload = verifyToken(token);
    
    if (!payload) {
      return NextResponse.json({ error: 'Token invalide' }, { status: 401 });
    }
    
    const existing = await prisma.property.findUnique({
      where: { id: params.id },
    });
    
    if (!existing) {
      return NextResponse.json(
        { error: 'Propriété non trouvée' },
        { status: 404 }
      );
    }
    
    // Vérifier propriétaire ou admin
    if (existing.ownerId !== payload.userId && payload.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 403 });
    }
    
    const body = await request.json();
    
    const property = await prisma.property.update({
      where: { id: params.id },
      data: body,
    });
    
    return NextResponse.json({ property });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

// DELETE /api/properties/[id]
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const token = request.headers.get('authorization')?.split(' ')[1];
    
    if (!token) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }
    
    const payload = verifyToken(token);
    
    if (!payload) {
      return NextResponse.json({ error: 'Token invalide' }, { status: 401 });
    }
    
    const existing = await prisma.property.findUnique({
      where: { id: params.id },
    });
    
    if (!existing) {
      return NextResponse.json(
        { error: 'Propriété non trouvée' },
        { status: 404 }
      );
    }
    
    // Vérifier propriétaire ou admin
    if (existing.ownerId !== payload.userId && payload.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 403 });
    }
    
    await prisma.property.delete({
      where: { id: params.id },
    });
    
    return NextResponse.json({ message: 'Propriété supprimée' });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
```

---

## 🔒 MIDDLEWARE PROTECTION

Créer `src/middleware.ts`:

```typescript
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './lib/jwt';

export function middleware(request: NextRequest) {
  // Routes protégées
  const protectedRoutes = ['/admin', '/dashboard', '/profile'];
  const isProtectedRoute = protectedRoutes.some(route =>
    request.nextUrl.pathname.startsWith(route)
  );
  
  if (isProtectedRoute) {
    const token = request.cookies.get('token')?.value;
    
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    
    const payload = verifyToken(token);
    
    if (!payload) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    
    // Vérifier rôle admin pour /admin
    if (request.nextUrl.pathname.startsWith('/admin') && payload.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
```

---

## ✅ COMMANDES FINALES

```bash
# 1. Installer packages
npm install prisma @prisma/client bcryptjs jsonwebtoken zod
npm install @types/bcryptjs @types/jsonwebtoken --save-dev

# 2. Initialize Prisma
npx prisma init

# 3. Configurer .env avec DATABASE_URL

# 4. Generate Prisma Client
npx prisma generate

# 5. Push schema to database
npx prisma db push

# 6. (Optionnel) Seed data
npx prisma db seed

# 7. Start dev server
npm run dev
```

---

## 🧪 TESTER L'API

### Avec cURL ou Postman

**Register**:
```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@diwaan.sn","password":"password123","name":"Test User"}'
```

**Login**:
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@diwaan.sn","password":"password123"}'
```

**Get Properties**:
```bash
curl http://localhost:3001/api/properties
```

**Create Property** (avec token):
```bash
curl -X POST http://localhost:3001/api/properties \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{...property data...}'
```

---

## 📚 PROCHAINES ÉTAPES

1. ✅ Installer packages
2. ✅ Configurer database
3. ✅ Créer schéma Prisma
4. ✅ Implémenter auth routes
5. ✅ Implémenter CRUD properties
6. ✅ Ajouter middleware protection
7. [ ] Tester avec Postman
8. [ ] Intégrer au frontend
9. [ ] Déployer sur Vercel + MongoDB Atlas

---

**© 2025 Diwaan - Backend API Guide**
```

Maintenant, voulez-vous que je:
1. Crée les fichiers API routes directement dans votre projet ?
2. Crée un script seed pour populate la database ?
3. Crée des tests automatisés ?
