# 📱 MANUEL D'UTILISATION - BACKOFFICE DIWAAN
**Guide Pratique Pas-à-Pas**

Version 1.0.0 | Décembre 2025

---

## 📋 SOMMAIRE

1. [Se Connecter au Backoffice](#se-connecter)
2. [Découvrir le Dashboard](#dashboard)
3. [Gérer les Propriétés](#gerer-proprietes)
4. [Gérer les Utilisateurs](#gerer-utilisateurs)
5. [Système de Partenariat](#partenariat)
6. [Sécurité & Sauvegardes](#securite)
7. [Tâches Quotidiennes](#taches-quotidiennes)
8. [Résolution de Problèmes](#problemes)

---

## 🔐 1. SE CONNECTER AU BACKOFFICE

### Étape 1 : Accéder à la Page de Connexion

**📍 URL :** https://zillow-clone-five.vercel.app/admin

➡️ Vous serez automatiquement redirigé vers : `/admin/login`

### Étape 2 : Saisir vos Identifiants

```
╔══════════════════════════════════════╗
║   🔐 Admin Diwaan                   ║
║   Accès réservé aux administrateurs ║
╠══════════════════════════════════════╣
║                                      ║
║   Email                              ║
║   ┌────────────────────────────────┐ ║
║   │ admin@diwaan.sn                │ ║
║   └────────────────────────────────┘ ║
║                                      ║
║   Mot de passe                       ║
║   ┌────────────────────────────────┐ ║
║   │ ••••••••                       │ ║
║   └────────────────────────────────┘ ║
║                                      ║
║   ┌─────────────────────────────┐   ║
║   │    Se connecter             │   ║
║   └─────────────────────────────┘   ║
╚══════════════════════════════════════╝
```

**Identifiants par défaut :**
- Email : `admin@diwaan.sn`
- Mot de passe : `admin123`

⚠️ **IMPORTANT :** Changez ces identifiants dès votre première connexion !

### Étape 3 : Première Connexion

Une fois connecté, vous arrivez sur le **Dashboard Principal**.

**💡 Astuce :** Ajoutez la page en favori dans votre navigateur pour un accès rapide.

---

## 📊 2. DÉCOUVRIR LE DASHBOARD

### Vue d'Ensemble

```
┌─────────────────────────────────────────────────────────┐
│  📊 Tableau de bord                                     │
│  Bienvenue sur votre interface d'administration Diwaan │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌─────────┐│
│  │ 💰       │  │ 🏠       │  │ 👥       │  │ ⏳      ││
│  │ Revenu   │  │ Annonces │  │ Utilisa- │  │ En      ││
│  │ Total    │  │ Actives  │  │ teurs    │  │ attente ││
│  │          │  │          │  │          │  │         ││
│  │45.2M CFA │  │    6     │  │    6     │  │    0    ││
│  │ +12%     │  │ +5.2%    │  │ +18%     │  │  -2%    ││
│  └──────────┘  └──────────┘  └──────────┘  └─────────┘│
│                                                         │
│  ┌────────────────────────┐  ┌──────────────────────┐  │
│  │ 📈 Statistiques        │  │ ⏸️ Validations       │  │
│  │    des Annonces        │  │    en attente        │  │
│  │                        │  │                      │  │
│  │  [Graphique annuel]    │  │  • Villa Almadies   │  │
│  │                        │  │  • Appart Plateau   │  │
│  │  Jan Feb Mar ... Dec   │  │                      │  │
│  └────────────────────────┘  └──────────────────────┘  │
│                                                         │
│  🤝 Système de Partenariat                             │
│  ┌───┬───┬───┬───┬───┐                                │
│  │🏗️│🏢│📄│📋│💰│                                    │
│  └───┴───┴───┴───┴───┘                                │
└─────────────────────────────────────────────────────────┘
```

### Les 4 Cartes Statistiques

#### 💰 **Revenu Total**
- Affiche le chiffre d'affaires global
- **+12%** = Évolution par rapport au mois précédent
- Couleur : Violet (#4318FF)

#### 🏠 **Annonces Actives**
- Nombre de propriétés actuellement publiées
- Statut : ACTIVE uniquement
- Couleur : Bleu (#006AFF)

#### 👥 **Utilisateurs**
- Total des utilisateurs inscrits
- Tous rôles confondus (USER + AGENT + ADMIN)
- Couleur : Vert (#05CD99)

#### ⏳ **En Attente**
- Propriétés à valider (statut DRAFT)
- Nécessitent votre action
- Couleur : Orange (#FFB547)

### Section Système de Partenariat

**5 Métriques :**
- 🏗️ Promoteurs
- 🏢 Agences
- 📄 Contrats Actifs
- 📋 Réservations
- 💰 CA Partenariat

**Boutons d'Action :**
- "Accéder au module" → Vue complète
- Liens rapides vers gestion

---

## 🏠 3. GÉRER LES PROPRIÉTÉS

### A. Accéder à la Gestion des Propriétés

**Navigation :** Menu latéral > **"Propriétés"**

### B. Consulter la Liste

```
┌─────────────────────────────────────────────────────────┐
│  🏠 Gestion des Propriétés                    [6]       │
│                                   [Actualiser] [+Ajouter]│
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Propriété  │Type│Prix        │Propriétaire│Date│Statut│
│  ───────────┼────┼────────────┼────────────┼────┼──────│
│  🖼️Villa    │SALE│450M FCFA   │Fatou Sarr  │15/│ACTIVE│
│   Almadies  │    │            │            │12 │      │
│  ───────────┼────┼────────────┼────────────┼────┼──────│
│  🖼️Appart   │SALE│85M FCFA    │Moussa Diop │15/│ACTIVE│
│   Plateau   │    │            │            │12 │      │
│  ───────────┼────┼────────────┼────────────┼────┼──────│
│  🖼️Terrain  │SALE│125M FCFA   │Aminata N.  │15/│ACTIVE│
│   VDN       │    │            │            │12 │      │
│  ───────────┼────┼────────────┼────────────┼────┼──────│
│  🖼️Appart   │RENT│400K/mois   │Cheikh Sy   │15/│ACTIVE│
│   Mermoz    │    │            │            │12 │      │
└─────────────────────────────────────────────────────────┘
```

**Colonnes Affichées :**
- **Propriété** : Miniature + Titre + ID
- **Type** : Badge (HOUSE/APARTMENT) + Transaction (SALE/RENT)
- **Prix** : Formaté en FCFA
- **Propriétaire** : Nom du créateur
- **Date** : Date de création
- **Statut** : Badge coloré (ACTIVE/DRAFT/SOLD/RENTED)

### C. ACTIONS DISPONIBLES

#### 👁️ **Voir les Détails**

**Cliquer sur l'icône œil :**

```
╔════════════════════════════════════╗
║  Détails de la propriété           ║
╠════════════════════════════════════╣
║  ID: prop_123456789                ║
║  Titre: Villa Moderne à Almadies   ║
║  Type: HOUSE                        ║
║  Prix: 450 000 000 FCFA            ║
║  Agent: Fatou Sarr                  ║
║  Statut: ACTIVE                     ║
║                                     ║
║         [Fermer]                    ║
╚════════════════════════════════════╝
```

#### 🗑️ **Supprimer une Propriété**

**PROCÉDURE :**

1. **Cliquez sur** l'icône 🗑️
2. **Confirmation** apparaît :
   ```
   ╔═══════════════════════════════════════╗
   ║  ⚠️ Confirmation                      ║
   ╠═══════════════════════════════════════╣
   ║  Êtes-vous sûr de vouloir supprimer  ║
   ║  cette propriété ?                    ║
   ║                                       ║
   ║  Cette action est IRRÉVERSIBLE.       ║
   ║                                       ║
   ║     [Annuler]       [OK]              ║
   ╚═══════════════════════════════════════╝
   ```
3. **Cliquez "OK"** pour confirmer
4. ✅ La propriété disparaît de la liste

⚠️ **ATTENTION :** Cette action supprime définitivement l'annonce !

#### ➕ **Ajouter une Propriété**

**Bouton en haut à droite : "+ Ajouter"**

**Formulaire :**
```
╔════════════════════════════════════╗
║  Ajouter une propriété             ║
╠════════════════════════════════════╣
║  Titre                             ║
║  ┌──────────────────────────────┐  ║
║  │                              │  ║
║  └──────────────────────────────┘  ║
║                                    ║
║  Type                              ║
║  ┌──────────────────────────────┐  ║
║  │ Vente ▼                      │  ║
║  └──────────────────────────────┘  ║
║                                    ║
║  Prix                              ║
║  ┌──────────────────────────────┐  ║
║  │                              │  ║
║  └──────────────────────────────┘  ║
║                                    ║
║    [Annuler]     [Ajouter]         ║
╚════════════════════════════════════╝
```

**Champs :**
- **Titre** : Ex : "Belle villa F4 Almadies"
- **Type** : Dropdown (Vente / Location)
- **Prix** : Montant en FCFA

**Après ajout :**
- ✅ Message "Propriété ajoutée !"
- ✅ Apparaît instantanément dans la liste

#### 🔄 **Actualiser**

Cliquez sur **"Actualiser"** pour recharger la liste (utile si modifications externes).

---

## 👥 4. GÉRER LES UTILISATEURS

### A. Accéder à la Gestion

**Navigation :** Menu latéral > **"Utilisateurs"**

### B. Liste des Utilisateurs

```
┌──────────────────────────────────────────────────────────┐
│  👥 Utilisateurs (6)                    [+ Nouvel Util.]  │
├──────────────────────────────────────────────────────────┤
│  Nom         │Email           │Rôle  │Connexion │Statut │
│  ────────────┼────────────────┼──────┼──────────┼───────│
│  Amadou Fall │amadou.fall@... │AGENT │07 Déc    │•Actif │
│  Sophie Diop │sophie.diop@... │USER  │06 Déc    │•Actif │
│  Jean Mendy  │j.mendy@...     │ADMIN │07 Déc    │•Actif │
│  Fatou Cissé │fatou.c@...     │USER  │20 Nov    │🔴Susp.│
└──────────────────────────────────────────────────────────┘
```

### C. ACTIONS Utilisateurs

#### 🔑 **God Mode** (Se connecter en tant que)

**Icône :** 🔑

**Utilité :**
- Diagnostiquer un problème utilisateur
- Voir exactement ce que l'utilisateur voit
- Effectuer des actions en son nom

**Procédure :**
1. Cliquez sur 🔑
2. Alerte : "Mode God activé pour [Nom]. Vous êtes maintenant connecté..."
3. Vous voyez l'interface utilisateur
4. **Tracé dans audit logs**

⚠️ **Utilisation éthique uniquement !**

#### ✏️ **Modifier un Utilisateur**

**Formulaire de modification :**
```
╔════════════════════════════════════╗
║  Modifier l'utilisateur            ║
╠════════════════════════════════════╣
║  Nom                               ║
║  ┌──────────────────────────────┐  ║
║  │ Sophie Diop                  │  ║
║  └──────────────────────────────┘  ║
║                                    ║
║  Email                             ║
║  ┌──────────────────────────────┐  ║
║  │ sophie.diop@gmail.com        │  ║
║  └──────────────────────────────┘  ║
║                                    ║
║  Rôle                              ║
║  ┌──────────────────────────────┐  ║
║  │ USER ▼                       │  ║
║  └──────────────────────────────┘  ║
║                                    ║
║  Statut                            ║
║  ┌──────────────────────────────┐  ║
║  │ Actif ▼                      │  ║
║  └──────────────────────────────┘  ║
║                                    ║
║    [Annuler]   [Enregistrer]       ║
╚════════════════════════════════════╝
```

**Changements Possibles :**
- **USER → AGENT** : Donne accès Rental Manager
- **AGENT → ADMIN** : Accès complet backoffice
- **Actif → Suspendu** : Bloque l'accès

#### 🗑️ **Supprimer un Utilisateur**

**Confirmation :**
```
╔═══════════════════════════════════════╗
║  ⚠️ Supprimer l'utilisateur           ║
╠═══════════════════════════════════════╣
║  Êtes-vous sûr de vouloir supprimer  ║
║  cet utilisateur ?                    ║
║                                       ║
║  • Ses propriétés seront orphelines  ║
║  • L'historique sera conservé        ║
║  • Action IRRÉVERSIBLE                ║
║                                       ║
║     [Annuler]       [OK]              ║
╚═══════════════════════════════════════╝
```

#### ➕ **Ajouter un Utilisateur**

```
╔════════════════════════════════════╗
║  Ajouter un utilisateur            ║
╠════════════════════════════════════╣
║  Nom complet                       ║
║  ┌──────────────────────────────┐  ║
║  │ Prénom Nom                   │  ║
║  └──────────────────────────────┘  ║
║                                    ║
║  Email                             ║
║  ┌──────────────────────────────┐  ║
║  │ email@exemple.com            │  ║
║  └──────────────────────────────┘  ║
║                                    ║
║  Rôle                              ║
║  ┌──────────────────────────────┐  ║
║  │ USER ▼                       │  ║
║  └──────────────────────────────┘  ║
║                                    ║
║    [Annuler]     [Ajouter]         ║
╚════════════════════════════════════╝
```

**Après création :**
- ✅ Compte créé
- ✅ Mot de passe généré automatiquement
- 📧 Email envoyé à l'utilisateur (si configuré)

---

## 🤝 5. SYSTÈME DE PARTENARIAT

### A. Vue d'Ensemble

**Section sur le Dashboard :**

```
┌─────────────────────────────────────────────────────┐
│  🤝 Système de Partenariat                         │
│  Gestion des promoteurs, agences et réservations   │
│                                        [Accéder] →  │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐           │
│  │  🏗️     │  │  🏢     │  │  📄     │           │
│  │    2    │  │    2    │  │    2    │           │
│  │Promoteur│  │ Agences │  │Contrats │           │
│  └─────────┘  └─────────┘  └─────────┘           │
│                                                     │
│  [Gérer Promoteurs] [Gérer Agences] [Réservations] │
└─────────────────────────────────────────────────────┘
```

### B. Gérer les Promoteurs/Développeurs

**Accès :** Dashboard > "Gérer les Promoteurs"

**Liste :**
```
╔══════════════════════════════════════════════════╗
║  Nom               │Contact         │Statut     ║
║  ──────────────────┼────────────────┼──────────  ║
║  ABC Promotion     │+221 33 123...  │ ACTIVE    ║
║  Teranga Construct │+221 33 234...  │ ACTIVE    ║
╚══════════════════════════════════════════════════╝
```

**Informations Développeur :**
- Nom entreprise
- Email & Téléphone
- Adresse
- Site web
- NINEA (fiscal)
- Logo
- Statut (ACTIVE/INACTIVE)

### C. Gérer les Agences

**Liste Agences :**
```
╔══════════════════════════════════════════════════╗
║  Nom               │Licence    │Commission      ║
║  ──────────────────┼───────────┼────────────     ║
║  Immobilier        │AGE2024001 │     5%         ║
║  Teranga           │           │                ║
║  Dakar Properties  │AGE2024002 │     7%         ║
╚══════════════════════════════════════════════════╝
```

**Données Agence :**
- Nom commercial
- Numéro de licence
- Taux de commission (%)
- Zone d'intervention
- Statut

### D. Réservations

**Liste :**
```
╔═════════════════════════════════════════════════════╗
║  Client     │Propriété  │Agence    │Montant │Statut║
║  ───────────┼───────────┼──────────┼────────┼───── ║
║  Sophie D.  │Villa      │Teranga   │5M      │✅CONF║
║  Fatou C.   │Villa Saly │Dakar P.  │3M      │⏳PEND║
╚═════════════════════════════════════════════════════╝
```

**Statuts :**
- ⏳ PENDING : En attente
- ✅ CONFIRMED : Confirmée
- ✔️ COMPLETED : Terminée
- ❌ CANCELLED : Annulée

---

## 🛡️ 6. SÉCURITÉ & SAUVEGARDES

### A. Accéder à la Page Sécurité

**Navigation :** Menu latéral > **"Sécurité"**

### B. 3 Onglets Disponibles

```
┌─────────────────────────────────────────────────┐
│  🛡️ Sécurité & Sauvegarde                      │
│  Gérez la sécurité et les sauvegardes          │
├─────────────────────────────────────────────────┤
│  [💾 Sauvegardes] [📋 Audit Logs] [🔐 Permissions]│
└─────────────────────────────────────────────────┘
```

### C. Onglet "💾 Sauvegardes"

#### État des Sauvegardes

```
┌─────────────────────────────────────────┐
│  Dernière sauvegarde: Aujourd'hui 03:00 │
│  Taille totale: 2.4 GB                  │
│  Disponibles: 7 derniers jours          │
└─────────────────────────────────────────┘
```

#### Créer une Sauvegarde Manuelle

**Bouton :** 💾 **"Créer une sauvegarde maintenant"**

**Processus :**
1. Cliquez sur le bouton
2. Statut : ⏳ "Sauvegarde en cours..."
3. Après ~3-5 secondes : ✅ "Sauvegarde réussie !"

#### Liste des Sauvegardes

```
╔════════════════════════════════════════════════════╗
║  Date         │Taille │Type │Statut   │Actions    ║
║  ─────────────┼───────┼─────┼─────────┼────────   ║
║  Auj. 03:00   │2.4 GB │Auto │Complète │[📥Restaurer]║
║  Hier 03:00   │2.3 GB │Auto │Complète │[📥Restaurer]║
║  13 Déc 03:00 │2.3 GB │Auto │Complète │[📥Restaurer]║
╚════════════════════════════════════════════════════╝
```

#### Restaurer une Sauvegarde

**⚠️ ATTENTION : Cette action écrase les données actuelles !**

**Procédure :**
1. Cliquez sur **"📥 Restaurer"**
2. Confirmation :
   ```
   ╔═══════════════════════════════════════╗
   ║  ⚠️ Restaurer la sauvegarde           ║
   ╠═══════════════════════════════════════╣
   ║  Cette action écrasera les données   ║
   ║  actuelles. Continuer ?               ║
   ║                                       ║
   ║  💡 Créez une sauvegarde manuelle    ║
   ║     avant si nécessaire               ║
   ║                                       ║
   ║     [Annuler]       [OK]              ║
   ╚═══════════════════════════════════════╝
   ```
3. Cliquez **"OK"**
4. ⏳ Restauration en cours...
5. ✅ Terminé → Rechargez l'application

### D. Onglet "📋 Audit Logs"

**Recherche :**
```
┌────────────────────────────────────────────┐
│  🔍 [Rechercher dans les logs...]          │
│  Filtre: [Toutes les actions ▼]           │
└────────────────────────────────────────────┘
```

**Journal :**
```
╔═══════════════════════════════════════════════════╗
║  Date/Heure  │Utilisateur  │Action    │Ressource ║
║  ────────────┼─────────────┼──────────┼───────── ║
║  Maintenant  │admin@...    │Consultat.│Sécurité  ║
║  5 min       │admin@...    │Connexion │Admin     ║
║  1h          │agent@...    │Création  │Prop #45  ║
╚═══════════════════════════════════════════════════╝
```

**Filtres :**
- Toutes les actions
- Connexions uniquement
- Modifications
- Suppressions

### E. Onglet "🔐 Permissions"

**Matrice de Permissions :**
```
╔══════════════════════════════════════════════════╗
║  Ressource              │USER│AGENT│ADMIN        ║
║  ───────────────────────┼────┼─────┼──────       ║
║  Propriétés (Lecture)   │ ✅ │ ✅  │ ✅          ║
║  Propriétés (Création)  │ ❌ │ ✅  │ ✅          ║
║  Propriétés (Modif.)    │ ❌ │ ✅* │ ✅          ║
║  Propriétés (Suppr.)    │ ❌ │ ✅* │ ✅          ║
║  Utilisateurs (Gestion) │ ❌ │ ❌  │ ✅          ║
║  Dashboard Admin        │ ❌ │ ❌  │ ✅          ║
║  Rental Manager         │ ❌ │ ✅  │ ✅          ║
║  Partenariats           │ ❌ │ ❌  │ ✅          ║
╚══════════════════════════════════════════════════╝

* = Propres propriétés uniquement
```

---

## ✅ 7. TÂCHES QUOTIDIENNES

### ROUTINE MATINALE (10 minutes)

#### 1. **Connectez-vous** (1 min)
```
→ https://zillow-clone-five.vercel.app/admin/login
→ Saisissez vos identifiants
```

#### 2. **Consultez le Dashboard** (3 min)
```
✓ Vérifiez les 4 métriques principales
✓ Notez les variations (% +/-)
✓ Regardez le compteur "En attente"
```

#### 3. **Vérifiez les Validations** (3 min)
```
→ Section "Validations en attente"
→ Cliquez sur "Voir" pour chaque propriété
→ Approuvez ou contactez le propriétaire
```

#### 4. **Audit Logs** (2 min)
```
→ Sécurité > Audit Logs
→ Vérifiez les connexions récentes
→ Repérez les activités suspectes
```

#### 5. **Backup Status** (1 min)
```
→ Sécurité > Sauvegardes
→ Confirmez "Dernière sauvegarde: Aujourd'hui 03:00"
→ Si erreur, créez une sauvegarde manuelle
```

### ROUTINE HEBDOMADAIRE (Vendredi soir)

#### 1. **Backup Manuel** (2 min)
```
→ Sécurité > Sauvegardes
→ Cliquez "💾 Créer une sauvegarde maintenant"
→ Attendez confirmation
```

#### 2. **Review Utilisateurs** (5 min)
```
→ Utilisateurs
→ Vérifiez les comptes inactifs > 1 mois
→ Suspendez ou supprimez si nécessaire
```

#### 3. **Statistiques Partenariat** (3 min)
```
→ Dashboard > Système de Partenariat
→ Notez les métriques
→ Comparez avec semaine précédente
```

---

## 🆘 8. RÉSOLUTION DE PROBLÈMES

### Problème 1 : "Impossible de se connecter"

**Symptômes :**
- Message "Identifiants invalides"
- Redirection en boucle

**Solutions :**

**A. Vérifiez vos identifiants**
```
✓ Email: admin@diwaan.sn (pas d'espace)
✓ Mot de passe: exactement comme fourni
✓ Respectez majuscules/minuscules
```

**B. Videz le cache du navigateur**
```
Chrome: Ctrl+Shift+Suppr
→ Cochez "Cookies"
→ "Effacer les données"
```

**C. Testez en navigation privée**
```
Chrome: Ctrl+Shift+N
Firefox: Ctrl+Shift+P
```

**Si toujours bloqué :** Contactez support technique

---

### Problème 2 : "Liste vide / 0 résultats"

**Symptômes :**
- Propriétés ou Utilisateurs = liste vide
- Message "Aucun résultat"

**Solutions :**

**A. Actualisez la page**
```
→ Bouton "Actualiser" en haut
→ Ou F5 sur le clavier
```

**B. Vérifiez la connexion Internet**
```
→ Testez un autre site
→ Rechargez la page
```

**C. Vérifiez Status Vercel**
```
→ Vercel Dashboard
→ Consultez les logs
```

---

### Problème 3 : "Erreur lors de la sauvegarde"

**Symptômes :**
- Bouton reste sur "En cours..."
- Message d'erreur

**Solutions :**

**A. Réessayez après 1 minute**

**B. Vérifiez MongoDB Atlas**
```
→ Connectez-vous à MongoDB Atlas
→ Vérifiez que le cluster est actif
```

**C. Contact support**
```
Email: tech@diwaan.sn
Objet: "Erreur sauvegarde backoffice"
```

---

### Problème 4 : "Propriété/Utilisateur ne se supprime pas"

**Symptômes :**
- Message d'erreur après suppression
- L'élément réapparaît

**Solutions :**

**A. Actualisez et réessayez**

**B. Vérifiez les permissions**
```
→ Êtes-vous bien ADMIN ?
→ Token expiré ? Reconnectez-vous
```

**C. Vérifiez les dépendances**
```
→ Propriété liée à des favoris/réservations ?
→ Utilisateur a des propriétés actives ?
```

---

## 📚 ANNEXES

### Raccourcis Clavier

| Touche | Action |
|--------|--------|
| `F5` | Actualiser la page |
| `Ctrl + F` | Rechercher dans la page |
| `Ctrl + Shift + Suppr` | Vider le cache |

### Codes Couleur des Statuts

**Propriétés :**
- 🟢 **ACTIVE** : Vert (#05CD99)
- 🟡 **DRAFT** : Jaune (#FFB547)
- 🔵 **SOLD** : Bleu (#006AFF)
- ⚪ **INACTIVE** : Gris (#888)

**Utilisateurs :**
- 🟢 **Actif** : Vert
- 🔴 **Suspendu** : Rouge (#E31A1A)

### Glossaire

- **God Mode** : Mode d'impersonation (se connecter en tant qu'utilisateur)
- **Backup** : Sauvegarde de la base de données
- **Audit Log** : Journal de toutes les actions effectuées
- **CRUD** : Create, Read, Update, Delete (Créer, Lire, Modifier, Supprimer)
- **RBAC** : Role-Based Access Control (Contrôle d'accès basé sur les rôles)

---

## 📞 SUPPORT

**En cas de problème :**

**Support Technique :** tech@diwaan.sn  
**Support Utilisateurs :** support@diwaan.sn  
**Urgences :** +221 XX XXX XX XX

**Horaires Support :**
- Lundi-Vendredi : 8h-18h
- Samedi : 9h-13h
- Dimanche : Fermé

---

## ✅ CHECKLIST DE FORMATION

### Jour 1 : Découverte
- [ ] Se connecter au backoffice
- [ ] Explorer le dashboard
- [ ] Comprendre les 4 métriques
- [ ] Naviguer dans le menu

### Jour 2 : Propriétés
- [ ] Consulter la liste des propriétés
- [ ] Voir les détails d'une propriété
- [ ] Ajouter une propriété test
- [ ] Supprimer la propriété test

### Jour 3 : Utilisateurs
- [ ] Consulter la liste
- [ ] Modifier un utilisateur
- [ ] Ajouter un utilisateur test
- [ ] Tester le God Mode (avec supervision)

### Jour 4 : Sécurité
- [ ] Créer une sauvegarde manuelle
- [ ] Consulter les audit logs
- [ ] Comprendre la matrice de permissions
- [ ] Restaurer une sauvegarde test (environnement de dev uniquement)

### Jour 5 : Autonomie
- [ ] Routine matinale complète
- [ ] Gérer 3 validations
- [ ] Consulter les stats partenariat
- [ ] Résoudre un problème simple

**À la fin de la formation, vous devez être capable de :**
- ✅ Vous connecter en autonomie
- ✅ Gérer les propriétés et utilisateurs
- ✅ Effectuer les tâches quotidiennes
- ✅ Résoudre les problèmes courants
- ✅ Créer/Restaurer une sauvegarde

---

**© 2025 Diwaan Platform - Manuel d'Utilisation Backoffice**  
Version 1.0.0 | Dernière mise à jour : 15 Décembre 2025

**📖 CE MANUEL EST FAIT POUR VOUS ! Gardez-le à portée de main.**
