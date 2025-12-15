# 👨‍💼 MANUEL ADMINISTRATEUR - DIWAAN PLATFORM
**Guide Backoffice Administration**

Version 1.0.0 | Décembre 2025

---

## 📋 TABLE DES MATIÈRES

1. [Accès au Backoffice](#acces-au-backoffice)
2. [Dashboard Principal](#dashboard-principal)
3. [Gestion des Propriétés](#gestion-des-proprietes)
4. [Gestion des Utilisateurs](#gestion-des-utilisateurs)
5. [Système de Partenariat](#systeme-de-partenariat)
6. [Finance & Transactions](#finance--transactions)
7. [Sécurité & Sauvegardes](#securite--sauvegardes)
8. [Configuration Système](#configuration-systeme)
9. [Audit & Logs](#audit--logs)
10. [Bonnes Pratiques](#bonnes-pratiques)

---

## 🔐 ACCÈS AU BACKOFFICE

### 1.1 Connexion Administrateur

**URL d'accès :** https://zillow-clone-five.vercel.app/admin

**Identifiants de Démonstration :**
```
Email:    admin@diwaan.sn
Password: admin123
```

⚠️ **IMPORTANT :** Changez immédiatement les identifiants par défaut lors de la première connexion.

### 1.2 Sécurité de Connexion

**Bonnes pratiques :**
- Utilisez un mot de passe fort (min. 12 caractères)
- Activez l'authentification à deux facteurs (si disponible)
- Ne partagez jamais vos identifiants
- Déconnectez-vous après chaque session
- Utilisez une connexion sécurisée (HTTPS uniquement)

**En cas de perte de mot de passe :**
1. Contactez le super-administrateur
2. Ou utilisez la fonction "Mot de passe oublié" (si activée)

### 1.3 Rôles et Permissions

| Rôle | Accès Backoffice | Permissions |
|------|------------------|-------------|
| **USER** | ❌ Non | Frontend uniquement |
| **AGENT** | ⚠️ Limité | Rental Manager uniquement |
| **ADMIN** | ✅ Complet | Toutes fonctionnalités |

---

## 📊 DASHBOARD PRINCIPAL

### 2.1 Vue d'Ensemble

Le dashboard affiche les **métriques clés** en temps réel :

**Cartes Statistiques (en haut) :**
- 💰 **Revenu Total** : Chiffre d'affaires cumulé
- 🏠 **Annonces Actives** : Propriétés publiées et visibles
- 👥 **Utilisateurs** : Total inscrits (USER + AGENT + ADMIN)
- ⏳ **En Attente** : Propriétés en validation (statut DRAFT)

**Graphique Annuel :**
- Évolution mensuelle des annonces
- Cliquez sur "Cette année" / "Ce mois" pour changer la période

### 2.2 Système de Partenariat

**Section dédiée (violet) :**
- 🏗️ **Promoteurs** : Nombre de développeurs enregistrés
- 🏢 **Agences** : Agences partenaires
- 📄 **Contrats Actifs** : Partenariats en cours
- 📋 **Réservations** : Réservations clients via agences
- 💰 **CA Partenariat** : Revenus générés

**Actions rapides :**
- "Accéder au module" → Dashboard partenariat détaillé
- Liens vers : Gérer Promoteurs, Agences, Réservations

### 2.3 Validations en Attente

**Liste des propriétés à valider :**
1. Miniature de la propriété
2. Titre et ID
3. Propriétaire et date de création
4. Bouton **"Voir"** pour accéder aux détails

**Action :**
- Cliquez sur "Voir tout" pour accéder à la page complète

### 2.4 Transactions Récentes

**Tableau récapitulatif :**
- Propriété concernée
- Type (Vente/Location)
- Date de la transaction
- Montant (FCFA)
- Statut : Payé ✅, En cours ⏳, Annulé ❌

---

## 🏠 GESTION DES PROPRIÉTÉS

### 3.1 Liste des Propriétés

**Accès :** Menu latéral > **"Propriétés"**

**Colonnes du tableau :**
- **Propriété** : Miniature + Titre + ID
- **Type** : HOUSE/APARTMENT/LAND + SALE/RENT
- **Prix** : Formaté en FCFA
- **Propriétaire/Agent** : Nom du créateur
- **Date** : Date de création
- **Statut** : Badge coloré (ACTIVE/DRAFT/SOLD/RENTED/INACTIVE)
- **Actions** : 👁️ Voir, 🗑️ Supprimer

### 3.2 Consulter une Propriété

**Cliquer sur 👁️ "Voir" :**

**Modal Détails Affichés :**
```
ID : prop_123456789
Titre : Villa Moderne à Almadies
Type : HOUSE
Prix : 450 000 000 FCFA
Agent : Fatou Sarr
Statut : ACTIVE
```

**Fermer** : Cliquez sur "Fermer" ou en dehors du modal

### 3.3 Ajouter une Propriété

**Bouton : + Ajouter**

**Formulaire Modal :**
```
Titre : [Titre de l'annonce]
Type : [ Vente | Location ]
Prix : [Montant en FCFA]

[Annuler]  [Ajouter]
```

**Validation :**
- Remplissez tous les champs obligatoires
- Cliquez sur **"Ajouter"**
- La propriété apparaît instantanément dans la liste

### 3.4 Modifier une Propriété

⚠️ **Fonctionnalité à venir** (actuellement via API uniquement)

**Alternative temporaire :**
1. Supprimez la propriété existante
2. Recréez-la avec les nouvelles informations

### 3.5 Supprimer une Propriété

**Procédure :**
1. Cliquez sur 🗑️ "Supprimer"
2. **Confirmation** : "Êtes-vous sûr de vouloir supprimer cette propriété ?"
3. Cliquez sur **"OK"**
4. La propriété est supprimée définitivement

⚠️ **Attention :** La suppression est **irréversible**. Assurez-vous avant de valider.

### 3.6 Actualiser la Liste

**Bouton : Actualiser**

Rafraîchit la liste des propriétés pour afficher les dernières modifications.

### 3.7 Modération & Validation

**Annonces en attente (statut DRAFT) :**
1. Consultez les détails
2. Vérifiez :
   - Contenu approprié
   - Prix cohérent
   - Photos de qualité
   - Informations complètes
3. **Approuver** : Changez le statut en ACTIVE (via API)
4. **Rejeter** : Contactez le propriétaire ou supprimez

**Signalements :**
- Si une annonce est signalée, vérifiez le motif
- Prenez action : avertissement, suspension, suppression

---

## 👥 GESTION DES UTILISATEURS

### 4.1 Liste des Utilisateurs

**Accès :** Menu latéral > **"Utilisateurs"**

**Colonnes :**
- **Nom** : Nom complet
- **Email** : Adresse email de contact
- **Rôle** : Badge (USER/AGENT/ADMIN)
- **Dernière Connexion** : Date et heure
- **Statut** : Actif ✅ / Suspendu 🔴
- **Actions** : 🔑 God Mode, ✏️ Modifier, 🗑️ Supprimer

### 4.2 Ajouter un Utilisateur

**Bouton : + Nouvel Utilisateur**

**Formulaire :**
```
Nom complet : [Prénom Nom]
Email : [email@exemple.com]
Rôle : [ USER | AGENT | ADMIN ]

[Annuler]  [Ajouter]
```

**Mot de passe :**
- Généré automatiquement
- Envoyé par email à l'utilisateur (si mail configuré)

### 4.3 Modifier un Utilisateur

**Cliquer sur ✏️ "Modifier" :**

**Modal Modification :**
```
Nom : [Modifier le nom]
Email : [Modifier l'email]
Rôle : [ USER | AGENT | ADMIN ]
Statut : [ Actif | Suspendu ]

[Annuler]  [Enregistrer]
```

**Changement de rôle :**
- **USER → AGENT** : Donne accès au Rental Manager
- **AGENT → ADMIN** : Donne accès complet backoffice
- **ADMIN → USER** : Retire l'accès admin (avec confirmation)

### 4.4 Suspendre un Utilisateur

**Procédure :**
1. Modifier l'utilisateur
2. Statut : **"Suspendu"**
3. Enregistrer

**Conséquences :**
- L'utilisateur ne peut plus se connecter
- Ses annonces restent visibles (option à configurer)
- Peut être réactivé à tout moment

### 4.5 Supprimer un Utilisateur

**Cliquer sur 🗑️ "Supprimer" :**

**Confirmation :**
```
Êtes-vous sûr de vouloir supprimer cet utilisateur ?

[Annuler]  [OK]
```

⚠️ **Important :**
- Les propriétés de l'utilisateur seront orphelines
- Historique conservé (transactions, messages)
- **Opération irréversible**

### 4.6 God Mode (Impersonation)

**Icône : 🔑 "Se connecter en tant que"**

**Fonctionnalité :**
- Vous connecte en tant que l'utilisateur sélectionné
- Utile pour :
  - Diagnostiquer un problème
  - Vérifier l'expérience utilisateur
  - Effectuer des actions au nom de l'utilisateur (avec permission)

⚠️ **Utilisation éthique :**
- À utiliser uniquement pour le support
- Informez l'utilisateur si possible
- Tracé dans les audit logs

---

## 🤝 SYSTÈME DE PARTENARIAT

### 5.1 Gestion des Promoteurs/Développeurs

**Accès :** Dashboard > Partenariat > **"Gérer les Promoteurs"**

**Informations Développeur :**
- Nom de l'entreprise
- Email et téléphone
- Adresse
- Logo
- Site web
- NINEA (numéro identification fiscale)
- Statut : ACTIVE / INACTIVE

**Actions :**
- Ajouter un développeur
- Modifier les informations
- Désactiver temporairement
- Voir les projets associés

### 5.2 Gestion des Agences

**Accès :** Dashboard > Partenariat > **"Gérer les Agences"**

**Informations Agence :**
- Nom commercial
- Numéro de licence
- Taux de commission (%)
- Contact
- Zone d'intervention
- Statut

**Actions :**
- Créer une agence partenaire
- Définir les taux de commission
- Assigner des projets
- Consulter le CA généré

### 5.3 Contrats de Partenariat

**Accès :** Dashboard > Partenariat > **"Voir les Réservations"** (ou API)

**Créer un contrat :**
```
Promoteur : [Sélectionner]
Agence : [Sélectionner]
Projet : [Nom du projet]
Date début : [JJ/MM/AAAA]
Date fin : [JJ/MM/AAAA]
Commission : [%]
Exclusivité : [ Oui | Non ]
```

**Suivi :**
- Statut : ACTIVE, TERMINATED, EXPIRED
- Nombre de réservations générées
- Revenus totaux

### 5.4 Réservations Clients

**Liste des réservations :**
- Client
- Propriété concernée
- Agence intermédiaire
- Montant
- Marge agence
- Date de visite
- Statut : PENDING, CONFIRMED, COMPLETED, CANCELLED

**Actions admin :**
- Valider une réservation
- Annuler si fraude détectée
- Calculer les commissions

---

## 💰 FINANCE & TRANSACTIONS

### 6.1 Tableau de Bord Financier

**Accès :** Menu latéral > **"Finance"**

**Métriques :**
- Revenus totaux
- Commissions agents
- Commissions agences
- Frais de plateforme
- Graphique de revenus mensuels

### 6.2 Transactions

**Liste des paiements :**
- Date
- Utilisateur/Agent
- Type (abonnement, commission, etc.)
- Montant
- Statut : Payé, En attente, Échoué
- Méthode (CB, Mobile Money, Virement)

**Actions :**
- Rechercher une transaction
- Exporter en CSV/PDF
- Créer une facture manuelle

### 6.3 Commissions

**Configuration :**
```
Commission standard : 5%
Commission premium : 7%
Commission agence : Variable (2-10%)
Seuil gratuit : Première annonce
```

**Calcul automatique :**
- Lors de la vente/location
- Déduction automatique
- Envoi facture par email

---

## 🛡️ SÉCURITÉ & SAUVEGARDES

### 7.1 Page Sécurité

**Accès :** Menu latéral > **"Sécurité"**

**3 Onglets :**

#### **A. Sauvegardes (Backups)**

**État des Sauvegardes :**
- **Dernière sauvegarde** : Aujourd'hui 03:00
- **Taille totale** : 2.4 GB
- **Disponibles** : 7 derniers jours

**Actions :**
- **💾 Créer une sauvegarde maintenant** : Sauvegarde manuelle immédiate
- Statut affiché : ⏳ En cours... → ✅ Sauvegarde réussie !

**Configuration :**
- Sauvegarde automatique quotidienne : **Activé**
- Heure : **03:00 GMT**
- Rétention : **7 jours**
- Stockage : **MongoDB Atlas** (Connecté)

**Liste des Sauvegardes Récentes :**

| Date | Taille | Type | Statut | Actions |
|------|--------|------|--------|---------|
| Aujourd'hui 03:00 | 2.4 GB | Auto | Complète | 📥 Restaurer |
| Hier 03:00 | 2.3 GB | Auto | Complète | 📥 Restaurer |
| 13 Déc 03:00 | 2.3 GB | Auto | Complète | 📥 Restaurer |

**Restaurer une Sauvegarde :**
1. Cliquez sur **📥 Restaurer**
2. Confirmation : "Cette action écrasera les données actuelles. Continuer ?"
3. **OK** → Restauration en cours
4. Rechargez l'application après restauration

⚠️ **Attention :** La restauration écrase les données actuelles. Créez une sauvegarde manuelle avant si besoin.

#### **B. Audit Logs (Journal d'Audit)**

**Recherche et Filtres :**
- Barre de recherche : "Rechercher dans les logs..."
- Filtre : Toutes les actions | Connexions | Modifications | Suppressions

**Tableau des Logs :**

| Date/Heure | Utilisateur | Action | Ressource | IP |
|------------|-------------|--------|-----------|-----|
| Maintenant | admin@diwaan.sn | Consultation | Page Sécurité | 192.168.1.1 |
| Il y a 5 min | admin@diwaan.sn | Connexion | Admin Panel | 192.168.1.1 |
| Il y a 1h | agent@diwaan.sn | Création | Propriété #45 | 197.149.1.50 |

**Actions tracées :**
- Connexions/Déconnexions
- Créations (propriétés, utilisateurs)
- Modifications (toutes ressources)
- Suppressions
- Changements de permissions
- Accès God Mode

**Rétention :** 30 jours par défaut

#### **C. Permissions (Matrice)**

**Tableau des Permissions par Rôle :**

| Ressource | USER | AGENT | ADMIN |
|-----------|------|-------|-------|
| Propriétés (Lecture) | ✅ | ✅ | ✅ |
| Propriétés (Création) | ❌ | ✅ | ✅ |
| Propriétés (Modification) | ❌ | ✅ (propres) | ✅ (toutes) |
| Propriétés (Suppression) | ❌ | ✅ (propres) | ✅ (toutes) |
| Utilisateurs (Gestion) | ❌ | ❌ | ✅ |
| Dashboard Admin | ❌ | ❌ | ✅ |
| Rental Manager | ❌ | ✅ | ✅ |
| Partenariats | ❌ | ❌ | ✅ |

**Modification des Permissions :**
⚠️ Les permissions sont définies au niveau du code (`/src/lib/permissions.ts`). Pour les modifier, contactez le développeur.

### 7.2 Bonnes Pratiques Sécurité

**Quotidiennes :**
- ✅ Vérifiez les audit logs chaque matin
- ✅ Surveillez les connexions suspectes

**Hebdomadaires :**
- ✅ Testez une restauration de backup
- ✅ Revoyez les permissions des agents

**Mensuelles :**
- ✅ Changez votre mot de passe admin
- ✅ Audit complet des utilisateurs actifs
- ✅ Nettoyez les comptes inactifs

---

## ⚙️ CONFIGURATION SYSTÈME

### 8.1 Paramètres Généraux

**Accès :** Menu latéral > **"Système & Configuration"**

**Paramètres Modifiables :**

**Plateforme :**
- Nom du site : **Diwaan**
- Description : [Texte SEO]
- Logo : [Upload]
- Favicon : [Upload]

**Contact :**
- Email support : support@diwaan.sn
- Téléphone : +221 XX XXX XX XX
- Adresse physique bureaux

**Régions & Localisation :**
- Pays : Sénégal
- Monnaie : FCFA (XOF)
- Fuseau horaire : GMT+0
- Langue par défaut : Français

**Limites :**
- Max photos par annonce : 12
- Taille max fichier : 5 MB
- Annonces gratuites par user : 3

### 8.2 Variables d'Environnement

⚠️ **Accès Développeur Uniquement**

**Via Vercel Dashboard :**
1. Allez sur vercel.com
2. Sélectionnez le projet **zillow-clone**
3. Settings > Environment Variables

**Variables Critiques :**
```
DATABASE_URL         = [MongoDB connection string]
JWT_SECRET           = [Clé secrète min 32 chars]
CLOUDINARY_API_SECRET = [API secret Cloudinary]
```

**Modifications :**
- Redéployez après chaque changement
- Ne partagez jamais ces valeurs

---

## 📋 AUDIT & LOGS

### 9.1 Consulter les Logs

**Page Sécurité > Onglet "Audit Logs"**

### 9.2 Types d'Événements Tracés

**Authentification :**
- LOGIN_SUCCESS
- LOGIN_FAILED
- LOGOUT
- PASSWORD_RESET

**Propriétés :**
- PROPERTY_CREATED
- PROPERTY_UPDATED
- PROPERTY_DELETED
- PROPERTY_PUBLISHED

**Utilisateurs :**
- USER_CREATED
- USER_UPDATED
- USER_DELETED
- USER_SUSPENDED
- ROLE_CHANGED
- GOD_MODE_ACTIVATED

**Système :**
- BACKUP_CREATED
- BACKUP_RESTORED
- SETTINGS_UPDATED

### 9.3 Export des Logs

**Bouton : Exporter (CSV/JSON)**

Format CSV :
```csv
timestamp,user,action,resource,ip,details
2025-12-15T13:00:00Z,admin@diwaan.sn,LOGIN_SUCCESS,admin_panel,192.168.1.1,"User agent: Chrome/120"
```

Utilisez pour :
- Analyse de sécurité
- Rapports compliance
- Investigation incidents

---

## ✅ BONNES PRATIQUES

### 10.1 Gestion Quotidienne

**Le Matin (10 minutes) :**
1. Consultez le dashboard
2. Vérifiez les validations en attente
3. Revoyez les audit logs récents
4. Répondez aux signalements urgents

**Le Soir (5 minutes) :**
1. Approuvez les annonces validées
2. Vérifiez le statut des sauvegardes
3. Note pour le lendemain

### 10.2 Modération de Contenu

**Vérifications Annonces :**
- ✅ Photos de qualité (pas de flou, bien éclairées)
- ✅ Prix cohérents (pas de 1 FCFA)
- ✅ Descriptions complètes (min 100 caractères)
- ✅ Adresse précise
- ✅ Contact valide

**Signaux d'Alerte :**
- ❌ Prix anormalement bas
- ❌ Photos d'internet (stock photos)
- ❌ Descriptions copy-paste
- ❌ Informations incohérentes
- ❌ Contact non vérifiable

### 10.3 Communication Utilisateurs

**Réponses Types :**

**Annonce Rejetée :**
```
Bonjour [Nom],

Votre annonce "[Titre]" a été rejetée pour la raison suivante :
[Motif précis]

Pour la republier, veuillez :
- [Action 1]
- [Action 2]

Cordialement,
L'équipe Diwaan
```

**Compte Suspendu :**
```
Bonjour [Nom],

Votre compte a été temporairement suspendu suite à :
[Motif]

Pour réactiver votre compte, contactez-nous :
support@diwaan.sn

Cordialement,
L'équipe Diwaan
```

### 10.4 Sécurité

**Règles d'Or :**
1. ❌ Ne partagez JAMAIS vos identifiants admin
2. ✅ Déconnectez-vous après chaque session
3. ✅ Utilisez un gestionnaire de mots de passe
4. ✅ Activez 2FA (quand disponible)
5. ❌ N'accédez pas à l'admin depuis un réseau public non sécurisé
6. ✅ Vérifiez l'URL (https://zillow-clone-five.vercel.app/admin)
7. ✅ Créez une sauvegarde avant toute opération majeure

### 10.5 Performance

**Optimisations :**
- Supprimez les comptes inactifs > 1 an
- Archivez les annonces vendues/louées
- Nettoyez les images orphelines (sans propriété)
- Videz le cache si nécessaire (redéploiement)

---

## 🆘 DÉPANNAGE

### Problème : "0 résultats" sur la recherche

**Cause :** API Properties non accessible

**Solution :**
1. Vérifiez Status Vercel
2. Consultez logs Vercel
3. Testez `/api/properties` manuellement
4. Si erreur MongoDB, vérifiez `DATABASE_URL`

### Problème : Impossible de se connecter

**Cause :** Token expiré ou cookie supprimé

**Solution :**
1. Videz les cookies du navigateur
2. Reconnectez-vous
3. Si échec, vérifiez `JWT_SECRET` dans Vercel

### Problème : Images ne s'affichent pas

**Cause :** Cloudinary non configuré

**Solution :**
1. Vérifiez les variables Cloudinary
2. Testez l'upload manuel
3. Contactez support Cloudinary si besoin

---

## 📞 SUPPORT TECHNIQUE

**Email Développeur :** tech@diwaan.sn  
**Support Utilisateurs :** support@diwaan.sn  
**Urgences :** +221 XX XXX XX XX

**Documentation :**
- Manuel Utilisateur : `docs/MANUEL_UTILISATEUR.md`
- Manuel Technique : `docs/MANUEL_TECHNIQUE.md`
- Guide Déploiement : `GUIDE_DEPLOIEMENT.md`

---

**© 2025 Diwaan Platform - Manuel Administrateur**  
Version 1.0.0 | Dernière mise à jour : 15 Décembre 2025
