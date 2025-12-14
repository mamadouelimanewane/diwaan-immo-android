# 🔐 ACCÈS BACKOFFICE DIWAAN - GUIDE COMPLET

## 🌐 URLs DE L'APPLICATION

### Production (Vercel)
```
Homepage:           https://zillow-clone-five.vercel.app/
Admin Dashboard:    https://zillow-clone-five.vercel.app/admin
```

### Local (Développement)
```
Homepage:           http://localhost:3000/
Admin Dashboard:    http://localhost:3000/admin
```

---

## 🏢 ACCÈS BACKOFFICE ADMINISTRATEUR

### Dashboard Principal
```
URL: https://zillow-clone-five.vercel.app/admin
```

### Pages Disponibles

#### 1. Dashboard Admin
```
URL:    /admin
Accès:  Public (à sécuriser)
```

**Sections Visibles** :
- 📊 Statistiques générales
- 🏠 Annonces actives
- 👥 Utilisateurs
- 🤝 **Système de Partenariat** ⭐ (nouveau)

#### 2. Gestion des Propriétés
```
URL:    /admin/properties
Accès:  Admin
```

#### 3. Gestion des Utilisateurs
```
URL:    /admin/users
Accès:  Admin
```

#### 4. Système de Partenariat ⭐ NOUVEAU

**Promoteurs** :
```
URL:    /admin/partnership/developers
Accès:  Admin
```

**Agences** :
```
URL:    /admin/partnership/agencies
Accès:  Admin
```

**Contrats** :
```
URL:    /admin/partnership/partnerships
Accès:  Admin
```

**Projets** :
```
URL:    /admin/partnership/projects
Accès:  Admin
```

**Parcelles** :
```
URL:    /admin/partnership/plots
Accès:  Admin
```

**Réservations** :
```
URL:    /admin/partnership/reservations
Accès:  Admin
```

#### 5. Messages
```
URL:    /admin/messages
Accès:  Admin
```

#### 6. Paramètres
```
URL:    /admin/settings
Accès:  Admin
```

---

## 🏢 ACCÈS AGENCE IMMOBILIÈRE

### Dashboard Agence
```
URL:    https://zillow-clone-five.vercel.app/agency/dashboard
Accès:  Agence
```

### Créer une Réservation
```
URL:    https://zillow-clone-five.vercel.app/agency/reservations/new
Accès:  Agence
```

**Processus** :
1. Sélection parcelle disponible
2. Informations client
3. Calcul automatique prix
4. Validation paiement (50% minimum)
5. Génération contrat PDF

### Mes Réservations
```
URL:    https://zillow-clone-five.vercel.app/agency/reservations
Accès:  Agence
```

### Mes Agents
```
URL:    https://zillow-clone-five.vercel.app/agency/agents
Accès:  Agence
```

### Rapports
```
URL:    https://zillow-clone-five.vercel.app/agency/reports
Accès:  Agence
```

---

## 🏗️ ACCÈS PROMOTEUR

### Dashboard Promoteur
```
URL:    https://zillow-clone-five.vercel.app/admin/developer/dashboard
Accès:  Promoteur
```

**Informations Affichées** :
- Nombre de projets
- Parcelles (disponibles/réservées/vendues)
- Chiffre d'affaires total
- Liste des projets
- Liste des partenariats

---

## 🔑 IDENTIFIANTS DE CONNEXION

### ⚠️ IMPORTANT : Système d'Authentification

**État Actuel** : Le système n'a pas encore d'authentification implémentée.

**Accès Actuel** : Toutes les pages sont accessibles sans login.

### 🔒 À Implémenter (Recommandé)

#### Utilisateur Admin
```
Email:     admin@diwaan.sn
Password:  [À définir]
Rôle:      ADMIN
```

#### Utilisateur Promoteur (Exemple: GREEN SYSTEM)
```
Email:     contact@greensystem.sn
Password:  [À définir]
Rôle:      DEVELOPER
```

#### Utilisateur Agence (Exemple: MMOK GROUP)
```
Email:     contact@mmokgroup.sn
Password:  [À définir]
Rôle:      AGENCY
```

#### Agent Commercial
```
Email:     agent@mmokgroup.sn
Password:  [À définir]
Rôle:      AGENT
```

---

## 🗄️ ACCÈS BASE DE DONNÉES

### MongoDB Atlas

**URL de Connexion** :
```
mongodb+srv://admin:Astelwane123@diwaan.wsogaea.mongodb.net/diwaan
```

**Credentials** :
```
Username:  admin
Password:  Astelwane123
Database:  diwaan
Cluster:   diwaan.wsogaea.mongodb.net
```

**Dashboard MongoDB Atlas** :
```
URL:       https://cloud.mongodb.com/
Login:     [Votre email MongoDB]
Password:  [Votre password MongoDB]
```

**Collections (23)** :
```
- users
- properties
- property_inquiries
- favorites
- transactions
- messages
- developers ⭐
- real_estate_agencies ⭐
- commercial_agents ⭐
- partnerships ⭐
- contract_clauses ⭐
- developer_projects ⭐
- plot_type_configs ⭐
- developer_plots ⭐
- pricing_rules ⭐
- margin_configs ⭐
- commission_structures ⭐
- plot_price_revisions ⭐
- plot_reservations ⭐
- reservation_payments ⭐
- developer_sales ⭐
- agent_commissions ⭐
- price_calculation_history ⭐
```

---

## 📧 ACCÈS SERVICE EMAIL

### Resend API

**API Key** :
```
re_DqXU3uWu_FATJMZMvQ7RWDkJgfaTPBqUy
```

**Dashboard Resend** :
```
URL:       https://resend.com/dashboard
Login:     [Votre email Resend]
Password:  [Votre password Resend]
```

**Email Sender** :
```
From:      noreply@diwaan.sn
Name:      Diwaan
```

**Limites** :
```
Plan:      Free
Limite:    100 emails/jour
Statut:    Actif
```

---

## 🚀 ACCÈS VERCEL

### Dashboard Vercel

**URL** :
```
https://vercel.com/dashboard
```

**Projet** :
```
Nom:       zillow-clone
URL:       zillow-clone-five.vercel.app
Status:    [À déployer]
```

**Environment Variables** :
```
DATABASE_URL     = mongodb+srv://admin:Astelwane123@diwaan.wsogaea.mongodb.net/diwaan
RESEND_API_KEY   = re_DqXU3uWu_FATJMZMvQ7RWDkJgfaTPBqUy
```

---

## 🔗 APIs DISPONIBLES

### APIs Promoteurs
```
GET    https://zillow-clone-five.vercel.app/api/developers
POST   https://zillow-clone-five.vercel.app/api/developers
GET    https://zillow-clone-five.vercel.app/api/developers/[id]
PUT    https://zillow-clone-five.vercel.app/api/developers/[id]
DELETE https://zillow-clone-five.vercel.app/api/developers/[id]
```

### APIs Agences
```
GET    https://zillow-clone-five.vercel.app/api/agencies
POST   https://zillow-clone-five.vercel.app/api/agencies
GET    https://zillow-clone-five.vercel.app/api/agencies/[id]
PUT    https://zillow-clone-five.vercel.app/api/agencies/[id]
DELETE https://zillow-clone-five.vercel.app/api/agencies/[id]
```

### APIs Partenariats
```
GET    https://zillow-clone-five.vercel.app/api/partnerships
POST   https://zillow-clone-five.vercel.app/api/partnerships
GET    https://zillow-clone-five.vercel.app/api/partnerships/[id]
```

### APIs Projets
```
GET    https://zillow-clone-five.vercel.app/api/projects
POST   https://zillow-clone-five.vercel.app/api/projects
```

### APIs Parcelles
```
GET    https://zillow-clone-five.vercel.app/api/plots
POST   https://zillow-clone-five.vercel.app/api/plots
```

### APIs Réservations ⭐
```
GET    https://zillow-clone-five.vercel.app/api/reservations
POST   https://zillow-clone-five.vercel.app/api/reservations
POST   https://zillow-clone-five.vercel.app/api/reservations/calculate-price
GET    https://zillow-clone-five.vercel.app/api/reservations/[id]/contract
```

---

## 💻 ACCÈS LOCAL (Développement)

### Lancer le Serveur Local
```bash
cd c:\gravity\zillow-clone
npm run dev
```

**URLs Locales** :
```
Homepage:                http://localhost:3000/
Admin Dashboard:         http://localhost:3000/admin
Developer Dashboard:     http://localhost:3000/admin/developer/dashboard
Agency Dashboard:        http://localhost:3000/agency/dashboard
New Reservation:         http://localhost:3000/agency/reservations/new
```

---

## 📱 ACCÈS MOBILE

### URLs Optimisées Mobile
```
Homepage:    https://zillow-clone-five.vercel.app/
Admin:       https://zillow-clone-five.vercel.app/admin
Agency:      https://zillow-clone-five.vercel.app/agency/dashboard
```

**Note** : Les dashboards sont responsive et s'adaptent aux écrans mobiles.

---

## 🔐 SÉCURITÉ - RECOMMANDATIONS

### ⚠️ ACTIONS URGENTES

1. **Implémenter l'Authentification** :
   ```
   - Système de login
   - Rôles (ADMIN, DEVELOPER, AGENCY, AGENT)
   - Protection des routes
   - Sessions sécurisées
   ```

2. **Changer les Mots de Passe** :
   ```
   - MongoDB Atlas
   - Resend API
   - Admin accounts
   ```

3. **Protéger les Routes Admin** :
   ```
   - Middleware d'authentification
   - Vérification des rôles
   - Rate limiting
   ```

4. **Variables d'Environnement** :
   ```
   - Ne JAMAIS commit .env.local
   - Utiliser Vercel Secrets
   - Rotation régulière des clés
   ```

---

## 📊 MONITORING & LOGS

### Vercel Logs
```
URL:    https://vercel.com/zillow-clone/logs
Accès:  Functions → Logs
```

**Filtres** :
- Par fonction
- Par erreur
- Par période

### MongoDB Atlas Monitoring
```
URL:    https://cloud.mongodb.com/
Menu:   Metrics
```

**Métriques** :
- Connexions actives
- Opérations/seconde
- Utilisation stockage

---

## 📞 SUPPORT & DOCUMENTATION

### Documentation Projet
```
Localisation:  c:\gravity\zillow-clone\
```

**Fichiers Importants** :
- `DEPLOYMENT_STATUS.md` - Statut déploiement
- `DEPLOY_VERCEL_MONGODB.md` - Guide déploiement
- `PARTNERSHIP_SYSTEM.md` - Architecture système
- `INTEGRATION_BACKOFFICE.md` - Intégration backoffice

### Logs Application
```
Vercel:    Dashboard → Functions → Logs
Local:     Console du navigateur (F12)
```

---

## 🎯 CHECKLIST ACCÈS

### Pour Administrateur
```
☐ Accès /admin
☐ Accès MongoDB Atlas
☐ Accès Vercel Dashboard
☐ Accès Resend Dashboard
☐ Tester les APIs
☐ Créer un promoteur test
```

### Pour Agence
```
☐ Accès /agency/dashboard
☐ Créer une réservation
☐ Voir les parcelles disponibles
☐ Générer un contrat PDF
```

### Pour Promoteur
```
☐ Accès /admin/developer/dashboard
☐ Voir les statistiques
☐ Gérer les projets
☐ Voir les partenariats
```

---

## 🎊 RÉSUMÉ DES ACCÈS

### URLs Principales
```
Production:        https://zillow-clone-five.vercel.app/
Admin:            /admin
Agency:           /agency/dashboard
Developer:        /admin/developer/dashboard
```

### Credentials MongoDB
```
URL:      mongodb+srv://admin:Astelwane123@diwaan.wsogaea.mongodb.net/diwaan
Username: admin
Password: Astelwane123
```

### API Key
```
Resend:   re_DqXU3uWu_FATJMZMvQ7RWDkJgfaTPBqUy
```

---

**⚠️ IMPORTANT : Changez les mots de passe en production !**

**📧 CONTACT : mamadouelimane.dia@gmail.com**

---

**Consultez ce fichier pour tous les accès au système Diwaan !** 🔐✨
