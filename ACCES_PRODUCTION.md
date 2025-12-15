# 🌐 GUIDE D'ACCÈS - DIWAAN PLATFORM

**Date de déploiement:** 15 Décembre 2025  
**Environnement:** Production Vercel

---

## 🔗 **LIENS D'ACCÈS**

### **👥 VERSION UTILISATEUR (Public)**

**URL principale:** https://zillow-clone-five.vercel.app

**Pages Publiques:**
- 🏠 Page d'accueil : https://zillow-clone-five.vercel.app
- 🔍 Recherche propriétés : https://zillow-clone-five.vercel.app/search
- 🏘️ Détails propriété : https://zillow-clone-five.vercel.app/homes/[id]
- 🏢 Location : https://zillow-clone-five.vercel.app/rent
- 💼 Vendre : https://zillow-clone-five.vercel.app/sell
- 🤖 Assistant IA : https://zillow-clone-five.vercel.app/legal-assistant
- 💰 Prêts immobiliers : https://zillow-clone-five.vercel.app/loans
- 👨‍💼 Trouver un agent : https://zillow-clone-five.vercel.app/agents
- 📚 Guides : https://zillow-clone-five.vercel.app/guides

---

### **🔐 VERSION ADMIN (Backoffice)**

**URL Admin:** https://zillow-clone-five.vercel.app/admin

**⚠️ Accès Protégé - Redirection automatique vers login**

---

## 🔑 **IDENTIFIANTS ADMINISTRATEUR**

### **Compte Démo Admin**
```
URL de connexion: https://zillow-clone-five.vercel.app/admin/login

Email:    admin@diwaan.sn
Password: admin123
```

**Privilèges:** Super Admin - Accès complet

---

### **Inscription Utilisateur**

**URL inscription:** https://zillow-clone-five.vercel.app/register

**Rôles disponibles:**
- 👤 **USER** - Utilisateur standard
- 🏢 **AGENT** - Agent immobilier
- ⚙️ **ADMIN** - Administrateur (sur invitation)

---

## 📊 **MODULES ADMIN DISPONIBLES**

### **Dashboard Principal**
- URL: `/admin`
- Statistiques en temps réel
- Graphiques
- Métriques partenariat

### **Gestion des Propriétés**
- URL: `/admin/properties`
- CRUD complet
- Validation/Rejet

### **Gestion des Utilisateurs**
- URL: `/admin/users`
- Liste complète
- Modification rôles
- God Mode (impersonation)

### **Système de Partenariat**
- **Développeurs:** `/admin/partnership/developers`
- **Agences:** `/admin/partnership/agencies`
- **Contrats:** `/admin/partnership/contracts`
- **Réservations:** `/admin/partnership/reservations`

### **Finance**
- URL: `/admin/finance`
- Transactions
- Revenus

### **Sécurité**
- URL: `/admin/security`
- Audit logs
- Permissions
- Backups

### **Système & Configuration**
- URL: `/admin/system`
- Paramètres généraux
- Variables d'environnement

---

## 🛡️ **SÉCURITÉ**

### **Authentification**
- ✅ JWT Tokens (24h expiration)
- ✅ Cookies sécurisés
- ✅ Bcrypt password hashing
- ✅ Middleware protection

### **Rôles & Permissions**
```
USER       : Consultation + Favoris
AGENT      : USER + Publier annonces + Gérer clients
ADMIN      : Accès complet backoffice
```

### **Protections**
- ✅ Routes `/admin/*` protégées
- ✅ Pages API protégées par rôle
- ✅ Validation données entrantes
- ✅ Rate limiting (à configurer)

---

## 🔄 **BACKUP & RESTAURATION**

### **Base de Données**
- **Provider:** MongoDB Atlas
- **URL:** mongodb+srv://admin:***@diwaan.wsogaea.mongodb.net/diwaan
- **Backup auto:** Activé (MongoDB Atlas)
- **Fréquence:** Quotidien

### **Code Source**
- **Repository:** Git
- **Déploiement:** Vercel (auto-deploy sur push)

### **Données Mockées**
- Fallback automatique si MongoDB indisponible
- 6 propriétés de démo
- 5 utilisateurs de démo

---

## 📱 **CONTACT & SUPPORT**

**Email technique:** tech@diwaan.sn  
**Support utilisateurs:** support@diwaan.sn  
**Urgences:** +221 XX XXX XX XX

---

## 🚀 **QUICK START**

### **Je suis un utilisateur:**
1. Allez sur https://zillow-clone-five.vercel.app
2. Créez un compte ou explorez sans compte
3. Recherchez des propriétés
4. Contactez des agents

### **Je suis un agent:**
1. Inscrivez-vous avec rôle AGENT
2. Accédez à `/rent/manager` pour gérer vos annonces
3. Publiez vos propriétés
4. Gérez vos clients

### **Je suis un admin:**
1. Connectez-vous sur https://zillow-clone-five.vercel.app/admin/login
2. Email: `admin@diwaan.sn` / Password: `admin123`
3. Accédez au dashboard
4. Gérez la plateforme

---

## ⚙️ **CONFIGURATION TECHNIQUE**

### **Variables d'Environnement (Vercel)**
```
DATABASE_URL=mongodb+srv://admin:***@diwaan.wsogaea.mongodb.net/diwaan
RESEND_API_KEY=re_***
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=df4ukakpy
CLOUDINARY_API_KEY=336283114183559
CLOUDINARY_API_SECRET=***
```

### **Versions**
- Next.js: 14.1.0
- React: 18.x
- Node: 18.x
- Prisma: Latest

---

**Dernière mise à jour:** 15 Décembre 2025  
**Build Status:** ✅ Deployed & Running
