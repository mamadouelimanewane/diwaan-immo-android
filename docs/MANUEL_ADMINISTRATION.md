# 👨‍💼 MANUEL ADMINISTRATION - DIWAAN
## Guide Complet pour les Administrateurs

**Version** : 1.0.0  
**Date** : 10 Décembre 2025  
**Rôle** : Administrateur Plateforme

---

## 📑 TABLE DES MATIÈRES

1. [Accès Admin](#accès-admin)
2. [Dashboard](#dashboard)
3. [Gestion des Propriétés](#gestion-des-propriétés)
4. [Gestion des Utilisateurs](#gestion-des-utilisateurs)
5. [Gestion des Agents](#gestion-des-agents)
6. [Contenu & Marketing](#contenu--marketing)
7. [Messagerie](#messagerie)
8. [Vérification](#vérification)
9. [Finance](#finance)
10. [Workflows](#workflows)
11. [Publicités](#publicités)
12. [Intelligence IA](#intelligence-ia)
13. [Sécurité](#sécurité)
14. [Système](#système)
15. [Rapports & Analytics](#rapports--analytics)

---

## 🔐 ACCÈS ADMIN

### Connexion

**URL** : `https://diwaan.sn/login`

**Identifiants de test** :
- Email : `admin@diwaan.sn`
- Mot de passe : `admin123`

### Permissions

| Niveau | Accès |
|--------|-------|
| **Super Admin** | Tout |
| **Admin** | Pas de suppression système |
| **Modérateur** | Contenu + Vérification |
| **Support** | Lecture seule |

### Première Connexion

1. Changez votre mot de passe
2. Activez 2FA (recommandé)
3. Configurez votre profil
4. Parcourez le dashboard

---

## 📊 DASHBOARD

**URL** : `/admin`

### Vue d'Ensemble

Le dashboard principal affiche :

#### KPIs Principaux

| Métrique | Description | Objectif |
|----------|-------------|----------|
| **Utilisateurs Actifs** | Connexions 30 derniers jours | > 1000 |
| **Propriétés Publiées** | Annonces actives | > 500 |
| **Transactions** | Ventes + Locations ce mois | > 50 |
| **Revenus** | CA mensuel | > 5M FCFA |

#### Graphiques

- 📈 **Croissance Utilisateurs** (30 jours)
- 💰 **Revenus Mensuels** (12 mois)
- 🏠 **Propriétés par Type** (Pie chart)
- 📍 **Propriétés par Ville** (Bar chart)

#### Alertes

⚠️ Notifications importantes :
- Nouvelles inscriptions agents (à valider)
- Documents en attente de vérification
- Signalements d'annonces
- Pannes système

---

## 🏠 GESTION DES PROPRIÉTÉS

**URL** : `/admin/properties`

### Vue Liste

Toutes les propriétés avec :
- ID
- Titre
- Type (Maison, Appart, etc.)
- Prix
- Agent/Propriétaire
- Date de publication
- Statut (Actif, En attente, Vendu)

### Actions Disponibles

#### ✏️ Modifier une Propriété

1. Cliquez sur l'icône **✏️**
2. Modal s'ouvre avec formulaire
3. Modifiez :
   - Titre
   - Description
   - Prix
   - Statut
   - Photos (ajouter/supprimer)
4. **Enregistrer**

#### 👁️ Voir Détails

- Toutes les infos
- Historique des modifications
- Statistiques (vues, favoris, contacts)
- Commentaires/avis

#### 🗑️ Supprimer

⚠️ **Attention** : Suppression définitive !

1. Confirmez l'action
2. Raison de suppression :
   - Doublon
   - Frauduleuse
   - Vendue (archivage recommandé)
3. Notification au propriétaire

#### ➕ Ajouter une Propriété

**Cas d'usage** : Pour le compte d'un client

1. Cliquez **"+ Ajouter"**
2. Formulaire complet :
   - Infos de base (titre, type, prix)
   - Localisation (adresse, ville, quartier, GPS)
   - Caractéristiques (chambres, salles de bain, surface)
   - Équipements (piscine, jardin, etc.)
   - Photos (min. 5, max. 30)
   - Agent responsable
3. **Publier** ou **Brouillon**

### Filtres

- Par type
- Par prix
- Par ville
- Par statut
- Par agent
- Par date

### Actions en Masse

☐ Sélectionnez plusieurs propriétés :
- Changer le statut
- Assigner à un agent
- Exporter en CSV
- Supprimer

---

## 👥 GESTION DES UTILISATEURS

**URL** : `/admin/users`

### Liste Utilisateurs

Affiche :
- Nom
- Email
- Rôle (Utilisateur, Agent, Admin)
- Dernière connexion
- Statut (Actif, Suspendu, Banni)

### Actions

#### ✏️ Modifier

- Changer le rôle
- Modifier les infos
- Réinitialiser mot de passe
- Activer/Désactiver 2FA

#### 🔑 Mode God (Impersonate)

**Fonctionnalité avancée** :

1. Cliquez sur 🔑
2. Vous êtes connecté en tant que cet utilisateur
3. Voyez exactement ce qu'il voit
4. **Usage** : Debug, support client
5. ⚠️ **Logged** pour audit

#### 🗑️ Supprimer/Bannir

- **Suspendre** : Temporaire (peut réactiver)
- **Bannir** : Définitif (IP + email blacklisted)

**Raisons** :
- Spam
- Fraude
- Violation CGU
- Inactivité (RGPD - 3 ans)

#### ➕ Créer un Utilisateur

Créez manuellement un compte :
- Nom, Email
- Rôle
- Envoyer email de bienvenue ?
- Générer mot de passe temporaire

### Statistiques Utilisateurs

- Total utilisateurs : **5.427**
- Nouveaux (30j) : **+342**
- Actifs (7j) : **1.234**
- Taux de rétention : **68%**

---

## 👨‍💼 GESTION DES AGENTS

**URL** : `/admin/agents`

### Validation des Agents

Nouveaux agents en attente :

#### Processus de Validation

1. **Vérification Documents**
   - ✅ CNI/Passeport
   - ✅ Carte professionnelle
   - ✅ Registre de commerce (agences)
   
2. **Background Check**
   - Recherche Google
   - Vérif références
   - Appel téléphonique

3. **Décision**
   - ✅ **Valider** : Compte activé
   - ⚠️ **Demander complément** : Email automatique
   - ❌ **Rejeter** : Avec raison

### Gestion des Agents Actifs

- Voir profil complet
- Propriétés gérées
- Note moyenne / Avis
- CA généré
- **Suspendre** temporairement
- **Rétrograder** en utilisateur

### Statistiques Agents

- Total agents : **127**
- Agents premium : **45**
- En attente validation : **8**
- Properties moyennes/agent : **12**

---

## 📝 CONTENU & MARKETING

**URL** : `/admin/content`

### Gestion des Articles

#### Créer un Article

1. **+ Nouvel Article**
2. Formulaire :
   - Titre SEO-friendly
   - Auteur (vous ou autre)
   - Catégorie
   - Contenu (éditeur riche)
   - Image à la une
   - Meta description
   - Tags
3. **Publier** ou **Brouillon**

#### Modifier un Article

- Titre, contenu
- Changer statut (Publié ↔ Brouillon)
- Programmer publication future

#### Supprimer

- Suppression définitive
- Redirection 301 recommandée

### Catégories

Catégories existantes :
- Immobilier
- Juridique
- Tendances
- Lifestyle
- Conseils
- Déco

**Ajouter une catégorie** :
- Nom
- Slug (URL)
- Description
- Image

### SEO Booster

Outils SEO intégrés :
- Analyse mots-clés
- Score SEO par article
- Suggestions d'amélioration
- Sitemap automatique
- robots.txt editor

---

## 💬 MESSAGERIE

**URL** : `/admin/messages`

### Boîte de Réception

Messages des utilisateurs :
- Questions sur annonces
- Support technique
- Signalements
- Demandes de partenariat

### Répondre à un Message

1. Cliquez sur le message
2. Lisez le contexte
3. Zone de réponse en bas
4. **Envoyer**
5. Marquer comme **Résolu**

### Templates de Réponse

Gagne du temps :
- "Merci pour votre message..."
- "Votre demande est traitée..."
- "Pour plus d'infos, consultez..."

**Créer un template** :
- Nom du template
- Sujet
- Contenu avec variables {{nom}}, {{email}}

### Archivage

- Archiver les anciens messages
- Recherche dans les archives
- Export mensuel en CSV

---

## ✅ VÉRIFICATION

**URL** : `/admin/verification`

### Documents en Attente

Liste des documents à valider :
- CNI/Passeports
- Titres fonciers
- Registres commerce
- Preuves de propriété

### Analyse IA

Diwaan IA analyse chaque document :
- **Score de confiance** : 0-100%
  - > 90% : Probablement authentique
  - 50-90% : Vérification manuelle
  - < 50% : Suspect

- **Détection**
  - Falsification (photoshop)
  - Documents expirés
  - Incohérences

### Actions

#### ✅ Valider

- Document authentique
- Utilisateur/agent activé
- Notification envoyée

#### ⚠️ Demander Complément

- Document flou
- Info manquante
- Email automatique avec détails

#### ❌ Rejeter

- Faux document détecté
- Compte suspendu
- Rapport généré

### Historique

- Tous les documents traités
- Qui a validé/rejeté
- Date + raison

---

## 💰 FINANCE

**URL** : `/admin/finance`

### Vue d'Ensemble

#### Statistiques Financières

| Métrique | Valeur | Évolution |
|----------|--------|-----------|
| **Revenus Totaux** | 4.5M FCFA | +12% |
| **En Attente** | 1.2M FCFA | 8 transactions |
| **Dépenses** | 850K FCFA | -5% |

**Sources de revenus** :
- Abonnements agents : 60%
- Annonces Premium : 25%
- Publicités : 10%
- Services (courtage) : 5%

### Transactions

Liste détaillée :
- ID transaction
- Description
- Type (Commission, Abonnement, etc.)
- Montant
- Date
- Statut (Complété, En attente)

### Export Comptable

**📥 Exporter CSV** :
- Format compatible Excel
- Toutes les transactions
- Filtre par période
- Import Sage/QuickBooks

### Rapports Financiers

- Mensuel
- Trimestriel
- Annuel
- Custom (choisir dates)

**Contient** :
- Revenus détaillés
- Dépenses par catégorie
- Marge bénéficiaire
- Taxes (TVA, etc.)

---

## ⚙️ WORKFLOWS

**URL** : `/admin/workflows`

### Qu'est-ce qu'un Workflow ?

Automatisation **SI → ALORS** :

**Exemple** :
```
SI nouvel agent s'inscrit
ALORS envoyer email "Kit de démarrage"
ET notifier admin Support
```

### Workflows Actifs

Liste des automatisations :
- Bienvenue nouvel agent
- Relance paiement
- Alerte propriété vendue
- Notification annonce expirée

### Créer un Workflow

**1. Déclencheur (SI...)**
- Nouvel utilisateur créé
- Propriété publiée
- Paiement reçu
- Document uploadé
- X jours après...

**2. Conditions (ET SI...) (optionnel)**
- Rôle = Agent
- Prix > 50M
- Ville = Dakar

**3. Actions (ALORS...)**
- Envoyer email (template)
- Envoyer SMS
- Créer tâche
- Notifier admin
- Webhook externe

**4. Délai (optionnel)**
- Immédiatement
- Après X heures/jours
- À date précise

### Activer/Désactiver

- Toggle ON/OFF
- Tester avant activation
- Statistiques d'exécution

### Logs

- Historique des exécutions
- Succès / Échecs
- Debug si erreur

---

## 📢 PUBLICITÉS

**URL** : `/admin/ads`

### Campagnes Publicitaires

Gérez les pubs sur Diwaan :

#### Statistiques

- Revenus pubs : **1.2M FCFA/mois**
- Campagnes actives : **8**
- CTR moyen : **2.4%**
- Impressions : **450k/mois**

### Créer une Campagne

**1. Informations**
- Nom campagne
- Client/Annonceur
- Durée (dates début/fin)

**2. Créatif**
- Upload bannière (1200x300, 300x600)
- Lien de destination
- Texte alternatif

**3. Placement**
- Homepage banner
- Sidebar recherche
- Footer
- Modal popup
- Email newsletter

**4. Budget**
- Coût total
- Coût par clic (CPC)
- Coût par mille (CPM)

### Suivi Performance

Tableau de bord par campagne :
- Impressions journalières
- Clics
- CTR
- Conversions (si tracking)
- ROI

### Facturation

- Facture automatique
- Envoi mensuel
- Suivi paiements

---

## 🤖 INTELLIGENCE IA

**URL** : `/admin/intelligence`

### 3 Onglets

#### 📊 Insights

Analyse IA du marché :
- **Tendance des prix** : +8.5% Dakar
- **Quartier en croissance** : Mermoz
- **Profil acheteur** : 30-45 ans
- **Temps moyen vente** : 45 jours

#### 🔮 Prédictions

Prévisions Q1 2026 :
- Prix médian Dakar : **+12%** (confiance 85%)
- Volume transactions : **+5%** (confiance 72%)
- Demande meublé : **+18%** (confiance 91%)

#### 💡 Recommandations

Actions suggérées par l'IA :
- **Haute priorité** : Optimiser référencement Almadies
- **Moyenne** : Cibler segment luxe Saly
- **Basse** : Ajuster 3 prix surévalués

### Configuration IA

- Modèle utilisé : GPT-4
- Fréquence analyse : Quotidienne
- Sources de données :
  - Transactions Diwaan
  - Registre officiel (DGID)
  - Annonces concurrents
  - Données économiques INS

---

## 🔒 SÉCURITÉ

**URL** : `/admin/security`

### Journal d'Activité

Tous les événements :
- Connexions admin
- Modifications système
- Suppressions
- Exports de données

**Colonnes** :
- Événement
- Utilisateur
- IP
- Date/Heure
- Statut (Succès/Échec)

### Paramètres de Sécurité

#### Toggles Disponibles

- **2FA Obligatoire** : Pour tous les admins
- **Mots de passe forts** : 12+ caractères
- **Déconnexion auto** : Après 30min inactivité
- **Limitation tentatives** : Bloquer après 5 échecs
- **Notifications sécurité** : Email sur événement anormal

### Statistiques Sécurité

- Sessions actives : **12**
- Tentatives échouées (24h) : **3**
- Utilisateurs 2FA : **85%**
- Sauvegardes : **Quotidiennes**

### Gestion des Accès

- Liste des admins
- Ajouter/Retirer privilèges
- Audit trail complet

### Export des Logs

**📥 Exporter** pour audit :
- CSV
- JSON
- PDF (rapport formaté)

---

## ⚙️ SYSTÈME

**URL** : `/admin/system`

### Configuration Générale

#### Informations Plateforme

- **Nom** : Diwaan Immobilier
- **Slogan** : La référence immobilière au Sénégal
- **Email contact** : contact@diwaan.sn
- **Téléphone** : +221 33 123 45 67

#### URLs & Domaines

- **URL principale** : https://diwaan.sn
- **URL admin** : https://admin.diwaan.sn
- **API endpoint** : https://api.diwaan.sn

#### Paramètres Fonctionnels

- **Inscription ouverte** : ✅ Oui
- **Modération annonces** : ✅ Pré-modération
- **Frais de service** : 3% commissions
- **Délai publication** : 24h (après validation)

### Thème & Apparence

- **Couleur primaire** : #FF6B35 (orange vif)
- **Couleur secondaire** : #E63946 (rouge corail)
- **Couleur Accent** : #06FFA5 (cyan)
- **Logo** : Upload logo (PNG, SVG)
- **Favicon** : Upload favicon (32x32)

### Emails Templates

Personnalisez les emails :
- Bienvenue
- Réinitialisation mot de passe
- Nouvelle annonce
- Transaction réussie

**Variables disponibles** :
- {{nom}}
- {{email}}
- {{lien}}
- {{date}}

### Intégrations

- **Google Analytics** : UA-XXXXXXX
- **Facebook Pixel** : 123456789
- **Google Maps API** : AIza...
- **Stripe** : pk_test...

### Maintenance

**Mode Maintenance** :
- ⚪ **OFF** : Site accessible
- 🟠 **ON** : Affiche page maintenance

**Message personnalisé** :
"Nous revenons bientôt. Maintenance en cours..."

### Sauvegardes

- **Fréquence** : Quotidienne automatique (3h du matin)
- **Rétention** : 30 jours
- **Stockage** : AWS S3
- **Restauration** : Sélectionner date → Restaurer

### Logs Système

- Erreurs serveur
- Performances (temps réponse)
- Utilisation ressources
- Requêtes lentes

---

## 📈 RAPPORTS & ANALYTICS

### Rapports Disponibles

#### Rapport Utilisateurs

- Nouveaux inscrits (par jour/mois)
- Taux de croissance
- Source d'acquisition (SEO, Direct, Social)
- Rétention par cohorte

#### Rapport Propriétés

- Nouvelles annonces
- Par type, par ville
- Temps moyen avant vente/location
- Prix moyens par quartier

#### Rapport Financier

- Revenus détaillés
- Dépenses
- Bénéfices nets
- Prévisions 3 mois

#### Rapport Agents

- Top agents (par CA)
- Satisfaction client
- Taux de conversion

### Tableau de Bord Custom

**Créez vos propres dashboards** :
1. Choisir métriques (KPIs)
2. Type graphique (ligne, bar, pie)
3. Période
4. Sauvegarder
5. Export PDF/PNG

### Export Données

Formats :
- **CSV** : Pour Excel
- **JSON** : Pour développeurs
- **PDF** : Rapports formatés

---

## 🆘 SUPPORT & FORMATION

### Centre d'Aide Admin

- **Wiki** : wiki.admin.diwaan.sn
- **Vidéos** : youtube.com/DiwaanAdmin
- **FAQ** : 100+ questions

### Formation Admin

**Programme de formation** :
- Jour 1 : Dashboard + Propriétés
- Jour 2 : Utilisateurs + Agents
- Jour 3 : Finance + Sécurité
- Jour 4 : Workflows + IA

**Certification Diwaan Admin** disponible !

### Contact Support Tech

- 📧 **Tech** : tech@diwaan.sn
- 🔥 **Urgence** : +221 77 999 99 99 (24/7)
- 👨‍💻 **Slack** : diwaan-admin.slack.com

---

## 📋 CHECKLIST QUOTIDIENNE

### Matin (10min)

- [ ] Vérifier dashboard (KPIs)
- [ ] Lire alertes
- [ ] Nouveaux agents (validation)
- [ ] Documents en attente

### Midi (5min)

- [ ] Messages urgents
- [ ] Signalements propriétés

### Soir (10min)

- [ ] Statistiques du jour
- [ ] Préparer rapport hebdo (vendredi)
- [ ] Backup vérification

---

## 🎯 BONNES PRATIQUES

### DO ✅

- Valider les agents rapidement (< 24h)
- Répondre aux messages support (< 2h)
- Vérifier finances quotidiennement
- Analyser rapports hebdo
- Tester workflows avant activation

### DON'T ❌

- Supprimer sans backup
- Partager identifiants admin
- Ignorer alertes sécurité
- Modifier système sans test
- Désactiver 2FA

---

## 🚨 PROCÉDURES D'URGENCE

### Annonce Frauduleuse Détectée

1. **Suspendre** immédiatement l'annonce
2. **Contacter** le propriétaire (vérifier identité)
3. **Signaler** aux autorités si fraude confirmée
4. **Bannir** l'utilisateur
5. **Communication** : Email aux intéressés

### Fuite de Données Suspectée

1. **Isoler** : Déconnecter serveurs affectés
2. **Audit** : Vérifier logs d'accès
3. **Notification** : Informer utilisateurs concernés (RGPD)
4. **Patch** : Corriger la faille
5. **Rapport** : Document complet pour direction

### Panne Système

1. **Activer Mode Maintenance**
2. Contacter équipe tech
3. Communication : Twitter + Email
4. **Restaurer** depuis backup si nécessaire
5. **Post-mortem** : Analyser cause

---

**© 2025 Diwaan Group - Manuel Administrateur**

*Version 1.0.0 - Dernière mise à jour : 10/12/2025*

**Accès** : Ce manuel est confidentiel et réservé aux administrateurs Diwaan.
