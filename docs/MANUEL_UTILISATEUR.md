# 📖 MANUEL UTILISATEUR - DIWAAN
## Guide Complet pour les Utilisateurs

**Version** : 1.0.0  
**Date** : 10 Décembre 2025  
**Application** : Diwaan - Plateforme Immobilière

---

## 📑 TABLE DES MATIÈRES

1. [Introduction](#introduction)
2. [Démarrage Rapide](#démarrage-rapide)
3. [Création de Compte](#création-de-compte)
4. [Recherche de Propriétés](#recherche-de-propriétés)
5. [Gestion des Favoris](#gestion-des-favoris)
6. [Location](#location)
7. [Vente](#vente)
8. [Prêts Immobiliers](#prêts-immobiliers)
9. [Contacter un Agent](#contacter-un-agent)
10. [Mon Tableau de Bord](#mon-tableau-de-bord)
11. [FAQ](#faq)

---

## 🌟 INTRODUCTION

### Qu'est-ce que Diwaan ?

**Diwaan** est la plateforme immobilière leader au Sénégal qui vous permet de :
- 🏠 **Acheter** votre maison de rêve
- 🔑 **Louer** un appartement ou une villa
- 💰 **Vendre** votre propriété facilement
- 💳 **Obtenir** un prêt immobilier
- 👨‍💼 **Contacter** les meilleurs agents

### Fonctionnalités Principales

✅ Recherche avancée avec carte interactive  
✅ Filtres intelligents (prix, type, localisation)  
✅ Favoris synchronisés  
✅ Estimations de prix IA  
✅ Chat avec agents  
✅ Visites virtuelles 360°  

---

## 🚀 DÉMARRAGE RAPIDE

### Accès à la Plateforme

1. **URL** : https://diwaan.sn (ou http://localhost:3001)
2. Cliquez sur **"Se connecter"** en haut à droite
3. Ou parcourez sans compte pour voir les annonces

### Navigation Rapide

| Menu | Description |
|------|-------------|
| **Acheter** | Rechercher des biens à vendre |
| **Louer** | Trouver une location |
| **Vendre** | Mettre votre bien en vente |
| **Agents** | Trouver un professionnel |
| **Prêts** | Simuler votre capacité d'emprunt |

---

## 👤 CRÉATION DE COMPTE

### Inscription Gratuite

1. Cliquez sur **"Se connecter"** → **"Créer un compte"**
2. Remplissez le formulaire :
   - Nom complet
   - Email
   - Mot de passe (min. 8 caractères)
   - Téléphone
3. Validez votre email
4. **C'est fait !** 🎉

### Types de Comptes

| Type | Fonctionnalités | Prix |
|------|----------------|------|
| **Utilisateur** | Recherche, Favoris, Alertes | Gratuit |
| **Propriétaire** | + Publier des annonces | Gratuit |
| **Agent** | + Dashboard pro, Statistiques | 25.000 FCFA/mois |
| **Agence** | + Multi-agents, Branding | 75.000 FCFA/mois |

---

## 🔍 RECHERCHE DE PROPRIÉTÉS

### Recherche Simple

1. Sur la page d'accueil, entrez :
   - **Localisation** : "Dakar Plateau"
   - Cliquez sur 🔍 **Rechercher**

### Recherche Avancée

**Page** : `/search`

#### Filtres Disponibles

1. **Prix**
   - Minimum : 5M FCFA
   - Maximum : 500M FCFA
   - Ou laisser vide

2. **Type de Bien**
   - ☐ Maison
   - ☐ Appartement
   - ☐ Villa
   - ☐ Terrain
   - ☐ Bureau

3. **Chambres**
   - Studio
   - 1 chambre
   - 2 chambres
   - 3+ chambres

4. **Équipements**
   - Piscine
   - Jardin
   - Parking
   - Climatisation
   - Gardien

#### Carte Interactive

- **Zoom** : Molette ou +/-
- **Déplacer** : Cliquer-glisser
- **Marker** : Cliquez pour voir le bien
- **Cluster** : Nombre de biens dans une zone

#### Tri des Résultats

- Plus récent
- Prix croissant
- Prix décroissant
- Popularité

---

## ❤️ GESTION DES FAVORIS

### Ajouter aux Favoris

1. Sur une annonce, cliquez sur l'icône **❤️**
2. Le cœur devient **rouge** = favori ajouté
3. Accessible depuis votre **Dashboard**

### Voir Mes Favoris

1. Connectez-vous
2. Allez sur **Dashboard** → **Favoris**
3. Vous voyez toutes vos propriétés sauvegardées

### Supprimer un Favori

- Recliquez sur **❤️** (devient gris)
- Ou → Dashboard → Favoris → **🗑️ Supprimer**

### Partage de Favoris

- Cliquez sur **📤 Partager**
- Envoyez le lien à vos amis/famille
- Recevez leurs avis

---

## 🏘️ LOCATION

### Trouver une Location

**Page** : `/rent`

1. Parcourez les annonces
2. Filtrez par :
   - Type (Appartement, Studio, Villa)
   - Prix mensuel
   - Quartier

### Estimer votre Loyer

**Page** : `/rent/price-my-rental`

1. Entrez l'adresse de votre bien
2. Type, surface, équipements
3. **Diwaan IA** calcule le loyer optimal
4. Recevez un rapport détaillé

### Rental Manager (Propriétaires)

**Page** : `/rent/manager`

Gérez vos locations :
- 📋 **Listings** : Vos annonces
- 📥 **Applications** : Demandes de locataires
- 💬 **Inbox** : Messages
- 💰 **Payments** : Suivi des paiements
- 📄 **Leases** : Contrats de bail

---

## 💼 VENTE

### Vendre avec un Agent

**Page** : `/sell`

1. Cliquez sur **"Vendre avec un Agent"**
2. Remplissez le formulaire
3. Un agent vous contacte sous 24h
4. Visite d'évaluation gratuite
5. Mise en ligne de l'annonce
6. Gestion des visites
7. Négociation et signature

### Vendre par vous-même (FSBO)

**Page** : `/sell/fsbo`

**FSBO** = For Sale By Owner

1. Créez votre annonce
2. Uploadez 10+ photos HD
3. Décrivez le bien en détail
4. Fixez votre prix
5. Publiez (gratuit ou Premium)
6. Gérez les contacts directement

### Estimation de Prix

**Page** : `/sell/valuation`

**Diwaan Estimate** utilise l'IA pour :
- Analyser le marché local
- Comparer avec 1000+ ventes récentes
- Estimer le prix optimal
- Suggérer le meilleur moment pour vendre

**Précision** : ±5% du prix de vente final

---

## 💳 PRÊTS IMMOBILIERS

### Hub Prêts

**Page** : `/loans`

#### Services Disponibles

1. **Calculateur de Capacité**
   - Revenus mensuels
   - Dettes actuelles
   - → Montant empruntable

2. **Pré-qualification**
   - Formulaire rapide (3 min)
   - Réponse en 24h
   - Sans impact crédit

3. **Taux en Direct**
   - Comparez 15+ banques
   - Taux actualisés quotidiennement
   - Simulation personnalisée

4. **Assistance Expert**
   - Courtier dédié
   - Montage de dossier
   - Négociation banques

### Calculer votre Capacité

**Page** : `/loans/buy-ability`

1. Salaire net mensuel : **500.000 FCFA**
2. Autres revenus : **100.000 FCFA**
3. Dettes mensuelles : **50.000 FCFA**
4. Apport personnel : **10.000.000 FCFA**

**Résultat** :
- Capacité d'emprunt : **45M FCFA**
- Budget total : **55M FCFA**
- Mensualité : **300.000 FCFA** (sur 20 ans)

---

## 👨‍💼 CONTACTER UN AGENT

### Trouver un Agent

**Page** : `/agents`

1. **Recherchez** par ville ou nom
2. Consultez les **profils** :
   - Note moyenne ⭐
   - Nombre de ventes
   - Avis clients
   - Spécialités

3. Cliquez sur **"Contacter"**
4. Envoyez votre message
5. L'agent vous répond sous 2h

### Agents Vérifiés

Tous les agents Diwaan sont :
- ✅ Vérifiés (ID + Licence)
- ✅ Assurés professionnellement
- ✅ Notés par les clients
- ✅ Formés aux standards Diwaan

---

## 📊 MON TABLEAU DE BORD

### Accès Dashboard

**Page** : `/dashboard`

1. Connectez-vous
2. Cliquez sur votre **avatar** → **Dashboard**

### Sections Disponibles

#### 📌 Favoris
- Toutes vos propriétés sauvegardées
- Alertes de baisse de prix
- Nouveautés similaires

#### 🔔 Alertes
- Nouvelles annonces dans vos critères
- Changements de prix
- Portes ouvertes

#### 💬 Messages
- Conversations avec agents
- Questions sur annonces
- Historique complet

#### 📋 Mes Annonces (Si Propriétaire)
- Annonces actives
- Statistiques de vues
- Demandes de visite
- Modifier/Supprimer

#### 📈 Historique
- Recherches récentes
- Annonces consultées
- Comparaisons sauvegardées

---

## ❓ FAQ

### Questions Fréquentes

#### C'est gratuit ?

**Oui !** Diwaan est gratuit pour :
- Rechercher des biens
- Contacter des agents
- Sauvegarder des favoris
- Obtenir des estimations

**Payant** uniquement pour :
- Annonces Premium (mise en avant)
- Compte Agent Pro
- Services de courtage avancés

#### Comment puis-je publier une annonce ?

1. Créez un compte
2. Dashboard → **"+ Nouvelle Annonce"**
3. Remplissez le formulaire
4. Uploadez photos (min. 5)
5. Publiez (gratuit) ou boostez (payant)

#### Combien de temps reste une annonce en ligne ?

- **Gratuit** : 90 jours
- **Premium** : 365 jours
- Renouvellement automatique possible

#### Je n'ai pas reçu l'email de confirmation

1. Vérifiez vos **spams**
2. Dashboard → Paramètres → **"Renvoyer l'email"**
3. Si problème persiste : support@diwaan.sn

#### Comment modifier mon profil ?

1. Cliquez sur votre **avatar**
2. **"Paramètres"**
3. Modifiez vos informations
4. **"Enregistrer"**

#### Les estimations IA sont-elles fiables ?

Nos estimations ont une **précision de 93%** (±5% du prix réel).

Basées sur :
- 50.000+ ventes historiques
- Données marché temps réel
- Analyse quartier par quartier

**Recommandation** : Consultez aussi un agent pour une expertise humaine.

#### Comment signaler une annonce frauduleuse ?

1. Sur l'annonce → **⚠️ Signaler**
2. Sélectionnez la raison
3. Notre équipe vérifie sous 24h
4. Annonce supprimée si frauduleuse

#### Puis-je négocier le prix ?

**Oui !** 
- Contactez l'agent/propriétaire
- Faites une offre via la messagerie
- La plupart acceptent -5 à -10%

#### Diwaan prend-il une commission ?

**Non** pour les acheteurs/locataires.

**Oui** pour les vendeurs :
- Vente avec agent notre réseau : 3% du prix de vente
- FSBO (vous gérez) : 0% (gratuit)

---

## 📞 SUPPORT & CONTACT

### Besoin d'Aide ?

- 📧 **Email** : support@diwaan.sn
- 📱 **Téléphone** : +221 33 123 45 67
- 💬 **Chat** : Widget en bas à droite
- 🕐 **Horaires** : Lun-Ven 8h-19h, Sam 9h-14h

### Réseaux Sociaux

- 📘 Facebook : /DiwaanSenegal
- 📸 Instagram : @diwaan_sn
- 🐦 Twitter : @Diwaan_SN
- 📹 YouTube : Diwaan Sénégal

---

## 🎓 TUTORIELS VIDÉO

**Chaîne YouTube** : youtube.com/DiwaanSenegal

1. 🎥 Comment rechercher un bien
2. 🎥 Publier votre première annonce
3. 🎥 Utiliser la carte interactive
4. 🎥 Estimer le prix de votre maison
5. 🎥 Trouver le bon agent

---

## 📱 APPLICATION MOBILE

**Téléchargez Diwaan App**

- 📱 **iOS** : App Store → "Diwaan"
- 🤖 **Android** : Play Store → "Diwaan"

**Fonctionnalités** :
- Notifications push pour nouvelles annonces
- Recherche vocale
- Scan de QR code sur panneaux
- Mode hors ligne
- Réalité augmentée pour visualiser

---

## ✨ ASTUCES PRO

### Maximiser vos Chances de Trouver

1. **Activez les alertes** pour vos critères
2. **Sauvegardez** plusieurs recherches
3. **Soyez réactif** - les bonnes affaires partent vite
4. **Utilisez la carte** pour découvrir des quartiers
5. **Contactez plusieurs agents** pour comparer

### Vendre Plus Vite

1. **Photos professionnelles** (louez un photographe)
2. **Visite virtuelle 360°**
3. **Description détaillée et honnête**
4. **Prix compétitif** (utilisez Diwaan Estimate)
5. **Répondez vite** aux demandes
6. **Soyez flexible** pour les visites

---

## 🔒 SÉCURITÉ & CONFIDENTIALITÉ

### Vos Données sont Protégées

- 🔐 Cryptage SSL/TLS
- 🛡️ Conformité RGPD
- 🚫 Pas de vente de données
- ✅ Vérification 2FA disponible

### Conseils de Sécurité

❌ **Ne jamais** :
- Envoyer d'argent avant visite
- Communiquer en dehors de Diwaan
- Donner vos codes bancaires

✅ **Toujours** :
- Visiter le bien en personne
- Vérifier identité du vendeur
- Utiliser un notaire pour la transaction

---

## 📈 MISES À JOUR

**Dernière version** : 1.0.0 (10 Déc 2025)

**Nouveautés** :
- ✨ Nouveau nom : Diwaan
- 🎨 Couleurs vives
- 🚀  100% fonctionnel
- 🤖 IA améliorée

**À venir** :
- Visites virtuelles VR
- Blockchain pour titres fonciers
- Paiement en crypto
- Analyse prédictive quartiers

---

**© 2025 Diwaan Group. Tous droits réservés.**

*Ce manuel est mis à jour régulièrement. Dernière modification : 10/12/2025*
