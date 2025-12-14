# 🔐 ACCÈS BACKOFFICE DIWAAN - IDENTIFIANTS

## ⚠️ STATUT ACTUEL - IMPORTANT !

### ❌ PAS D'AUTHENTIFICATION IMPLÉMENTÉE

**Le système actuel n'a PAS de système de login.**

**Accès aux pages admin** :
```
https://zillow-clone-five.vercel.app/admin
http://localhost:3000/admin
```

**Status** : ✅ **ACCÈS LIBRE (non sécurisé)**

---

## 🌐 URLS ACCESSIBLES DIRECTEMENT

### Production (Vercel)
```
Homepage:              https://zillow-clone-five.vercel.app/
Admin Dashboard:       https://zillow-clone-five.vercel.app/admin
Developer Dashboard:   https://zillow-clone-five.vercel.app/admin/developer/dashboard
Agency Dashboard:      https://zillow-clone-five.vercel.app/agency/dashboard
New Reservation:       https://zillow-clone-five.vercel.app/agency/reservations/new
```

### Local (Développement)
```
Homepage:              http://localhost:3000/
Admin Dashboard:       http://localhost:3000/admin
Developer Dashboard:   http://localhost:3000/admin/developer/dashboard
Agency Dashboard:      http://localhost:3000/agency/dashboard
New Reservation:       http://localhost:3000/agency/reservations/new
```

---

## 💡 COMMENT ACCÉDER MAINTENANT

### Étape 1 : Ouvrir le Navigateur
```
Chrome, Firefox, Safari, Edge...
```

### Étape 2 : Taper l'URL
```
Production:  https://zillow-clone-five.vercel.app/admin
ou
Local:       http://localhost:3000/admin
```

### Étape 3 : Accès Direct
```
✅ Pas de login requis
✅ Accès immédiat au dashboard
✅ Toutes les fonctionnalités visibles
```

---

## 🗄️ ACCÈS SERVICES EXTERNES

### MongoDB Atlas
```
URL Dashboard:  https://cloud.mongodb.com/
Login:          [Votre email MongoDB Atlas]
Password:       [Votre password MongoDB Atlas]

Base de données:
Connection String: mongodb+srv://admin:Astelwane123@diwaan.wsogaea.mongodb.net/diwaan
Username: admin
Password: Astelwane123
```

### Vercel Dashboard
```
URL:      https://vercel.com/dashboard
Login:    [Votre email Vercel]
Password: [Votre password Vercel]
```

### Resend Email Service
```
URL:      https://resend.com/dashboard
Login:    [Votre email Resend]
Password: [Votre password Resend]
API Key:  re_DqXU3uWu_FATJMZMvQ7RWDkJgfaTPBqUy
```

---

## 🔒 IDENTIFIANTS PROPOSÉS (À IMPLÉMENTER)

### Pour Quand l'Authentification Sera Implémentée

#### Super Administrateur
```
Email:     admin@diwaan.sn
Password:  Diwaan@Admin2025!
Rôle:      SUPER_ADMIN
Accès:     Toutes les fonctionnalités
```

#### Administrateur
```
Email:     contact@diwaan.sn
Password:  Diwaan@2025!
Rôle:      ADMIN
Accès:     Dashboard admin, Gestion utilisateurs
```

#### Promoteur (GREEN SYSTEM)
```
Email:     contact@greensystem.sn
Password:  GreenSystem@2025!
Rôle:      DEVELOPER
Accès:     Dashboard promoteur, Projets, Statistiques
```

#### Agence (MMOK GROUP)
```
Email:     contact@mmokgroup.sn
Password:  MmokGroup@2025!
Rôle:      AGENCY
Accès:     Dashboard agence, Réservations, Agents
```

#### Agent Commercial
```
Email:     agent@mmokgroup.sn
Password:  Agent@2025!
Rôle:      AGENT
Accès:     Créer réservations, Voir commissions
```

---

## 🚨 SÉCURITÉ - ACTIONS URGENTES

### ⚠️ AVANT LA MISE EN PRODUCTION

1. **Implémenter l'Authentification** (URGENT)
2. **Créer les Comptes Utilisateurs**
3. **Protéger les Routes Admin**
4. **Activer le Rate Limiting**
5. **Changer les Mots de Passe**

---

## 💻 ACCÈS LOCAL (Développement)

### Démarrer le Serveur
```bash
# Terminal
cd c:\gravity\zillow-clone
npm run dev
```

### Accéder au Backoffice
```
1. Ouvrir navigateur
2. Aller sur http://localhost:3000/admin
3. ✅ Accès immédiat (pas de login)
```

---

## 📱 TESTER LE SYSTÈME

### Test 1 : Dashboard Admin
```
URL: https://zillow-clone-five.vercel.app/admin

Vérifier:
✅ Section "Système de Partenariat" visible
✅ Statistiques affichées (0 au début)
✅ Graphiques visibles
✅ Liens fonctionnels
```

### Test 2 : Créer un Promoteur
```
Via API:
POST https://zillow-clone-five.vercel.app/api/developers

Body:
{
  "legalName": "GREEN SYSTEM SA",
  "rccm": "SN DKR 2010 B10309",
  "ninea": "00424505",
  "email": "contact@greensystem.sn",
  "address": "MBAO Extension",
  "city": "Dakar",
  "phone": "+221771234567",
  "representativeName": "Abdoul Aziz Sylla",
  "representativeTitle": "Gérant"
}
```

### Test 3 : Voir les Statistiques
```
1. Aller sur /admin
2. Section "Système de Partenariat"
3. Voir le compteur "Promoteurs" passer à 1
```

---

## 🔧 CONFIGURATION ACTUELLE

### Environment Variables (Vercel)
```
DATABASE_URL     = mongodb+srv://admin:Astelwane123@diwaan.wsogaea.mongodb.net/diwaan
RESEND_API_KEY   = re_DqXU3uWu_FATJMZMvQ7RWDkJgfaTPBqUy
```

### Database
```
Type:      MongoDB Atlas
Host:      diwaan.wsogaea.mongodb.net
Database:  diwaan
Username:  admin
Password:  Astelwane123
```

---

## 📋 CHECKLIST D'ACCÈS

### Pour Tester Maintenant
```
☐ Ouvrir https://zillow-clone-five.vercel.app/admin
☐ Vérifier que le dashboard s'affiche
☐ Voir la section "Système de Partenariat"
☐ Cliquer sur "Accéder au module"
☐ Tester les APIs via Postman/curl
```

### Pour Sécuriser (Avant Production)
```
☐ Implémenter NextAuth ou système de login
☐ Créer les comptes utilisateurs
☐ Protéger les routes /admin
☐ Protéger les routes /agency
☐ Protéger les APIs sensibles
☐ Activer CORS
☐ Configurer rate limiting
☐ Changer tous les mots de passe
```

---

## 🎯 SOLUTION RAPIDE - AUTHENTIFICATION SIMPLE

### Option 1 : Middleware Simple (Quick Fix)

Créer `src/middleware.ts` :
```typescript
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Vérifier si l'utilisateur est authentifié
  const token = request.cookies.get('auth-token');
  
  if (!token && request.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/agency/:path*'],
};
```

### Option 2 : NextAuth.js (Recommandé)
```bash
npm install next-auth
```

Configuration dans `src/app/api/auth/[...nextauth]/route.ts`

---

## 📞 SUPPORT

### Pour Toute Question
```
Email:   mamadouelimane.dia@gmail.com
Projet:  Diwaan - Système de Partenariat
```

### Documentation
```
Localisation: c:\gravity\zillow-clone\
Fichiers:
- ACCES_BACKOFFICE.md (ce fichier)
- DEPLOYMENT_STATUS.md
- DEPLOY_VERCEL_MONGODB.md
- PARTNERSHIP_SYSTEM.md
```

---

## 🎊 RÉSUMÉ SIMPLIFIÉ

### Accès Immédiat (Sans Login)
```
Production:  https://zillow-clone-five.vercel.app/admin
Local:       http://localhost:3000/admin

Status:      ✅ ACCÈS LIBRE
Login:       ❌ NON REQUIS (à implémenter)
```

### Credentials Services
```
MongoDB:     admin:Astelwane123@diwaan.wsogaea.mongodb.net
Resend:      re_DqXU3uWu_FATJMZMvQ7RWDkJgfaTPBqUy
```

---

## ⚡ ACTION IMMÉDIATE

### Pour Tester Maintenant
```
1. Ouvrir Chrome/Firefox
2. Taper: https://zillow-clone-five.vercel.app/admin
3. ✅ Vous êtes sur le dashboard !
```

### Pas de Login à Faire
```
❌ Pas de formulaire de connexion
❌ Pas de mot de passe à entrer
✅ Accès direct au backoffice
```

---

**⚠️ IMPORTANT : Implémentez l'authentification avant la production !**

**L'accès est actuellement LIBRE pour faciliter le développement.**

**📧 Contact : mamadouelimane.dia@gmail.com**

---

**POUR ACCÉDER : Ouvrez simplement l'URL dans votre navigateur !** 🚀✨
