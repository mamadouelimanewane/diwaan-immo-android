# Inventaire Exhaustif des Fonctionnalités du Système (Plateforme DIWAAN)

Ce document dresse la liste granulaire de la totalité des fonctionnalités de l'application, segmentée par typologie d'acteurs et de modules. L'application fusionne le modèle marketplace "B2C" pour grand public et l'ERP de gestion "B2B" pour promoteurs et collectivités.

---

## 🌎 1. PORTAIL GRAND PUBLIC (Acquéreurs, Vendeurs, Locataires)
*Espace Front-Office de la plateforme.*

### 🔍 Moteur de Recherche et Découverte
1. **Moteur de recherche intelligent** : Recherche par mots-clés, adresses, filtres croisés (prix, surface, chambres, salles de bain).
2. **Carte Interactive (SIG)** : Vue Leaflet intégrée pour géolocaliser les parcelles, villas et appartements et naviguer intuitivement.
3. **Tendances de Marché (Market Trends)** : Tableaux de bord grand public affichant l'évolution des prix moyens au mètre carré selon les zones géographiques (Ex: Dakar, Saly).
4. **Hub de Saisies Immobilières (Foreclosure)** : Espace cataloguant les biens judiciairement saisis.
5. **Simulateur de Budget (Rent/Price my Rental)** : Outils pour l'utilisateur permettant d'estimer son pouvoir d'achat ou le revenu locatif de son bien.

### 🏡 Expérience Fiche Propriété
6. **Galerie Immersive** : Affichage HD des photos des biens via un slider d'image fluide.
7. **Jumeau Numérique / Réalité Virtuelle** : Intégration de vues 3D web-based (WebGL/LOD 4) pour voler virtuellement au-dessus des lotissements non encore construits.
8. **Statistiques en Temps Réel** : Visualisation du nombre de vues, des alertes de prix et du statut (Ex: Sous offre, Vendu).
9. **Bouton d'Action Immédiat (Demande / Inquiry)** : Formulaires permettant de contacter l'agent instantanément et déclenchement d'un CRM.
10. **Système de Favoris (Wishlist)** : Ajouter/Retirer des propriétés en un clic (sauvegarde persistante rattachée au compte).

---

## 🏢 2. ÉCOSYSTÈME B2B (Promoteurs & Agences & Courtiers)
*Le cœur opérationnel du système, permettant aux professionnels de collaborer.*

### 🏗️ Gestion de la Promotion Immobilière (Developer Hub)
11. **Onboarding Promoteur & Authentification Fiscale** : Renseignements NINEA et RCCM pour valider le statut juridique.
12. **Création de Projets/Lotissements** : Injection de Plans de Masse ou d'un NICAD (coordonnées cadastrales) créant virtuellement les terrains.
13. **Découpage Foncier (Lots)** : Création de multiples parcelles (lots nus) et typologies de config (Ex: *Lot Villa Type 4, Lot F4 Appartements*).
14. **Plateforme WBS d'Exécution (Roadmap interactive)** : Tableau de bord structurant les 6 phases de vie d’un projet immobilier (Initialisation, Ingénierie, Financement, Vente, Construction BTP/VRD, Livraison) avec des coches validables et taux de pourcentage global d'avancement.

### 🤝 Gestion des Partenariats & Agences
15. **Signature Numérique de Partenariat PPP** : Digitalisation des conventions liant le Promoteur à des Agences Vendeuses.
16. **Paramétrage des Commissions (Rules & Margins)** : Moteur de pricing permettant au promoteur de définir un "Prix de Cession", sur lequel l'agence applique sa "Marge Flexible" pour proposer le prix final à l'acquéreur.
17. **Gestion des Réseaux d'Agents** : Création de profils de courtiers (Agents Commerciaux), hiérarchisés sous l'égide de leur Agence Immobilière "Mère".

---

## 💳 3. CYCLE DE VENTES FINANCIER ET VEFA
*Sécurisation des paiements et structuration des transactions.*

18. **Pipeline des Réservations Client** : Collecte des documents (KYC - Carte d'identité client) pour réserver numériquement un lot.
19. **Générateur Modulaire de Contrat de Réservation** : L'outil assemble dynamiquement PDF de contrat, injectant le nom du client, le NICAD et les arrhes perçues (Acompte).
20. **Gestion des Appels de Fonds (Installments)** : Suivi calendaire des paiements échelonnés. Tableau signalant les paiements "À l'heure", "En retard/Impayés".
21. **Gestion des Moyens d’Encaissement** : Confirmation manuelle/numérique pour Chèque, Espèce, Mobile Money ou Virement dans les Compte Séquestre.
22. **Calculateur Automatisé des Commissions** : Rémunération automatique attribuée au solde agent dès que le premier versement arrive (Split de trésorerie).
23. **Module de Courtage (Loans Dashboard)** : Interface pour piloter le montage de crédit bancaire liant la BHS (ou CBAO) à l'acquéreur final.

---

## 🤖 4. INNOVATION TECHNOLOGIQUE (IA & BLOCKCHAIN)
*Les fonctionnalités ultra-premium qui épatent l'industrie (Les Wows).*

24. **LexAI Pricing Predictor (Suggéreur Machine Learning)** : Assistant IA pour les promoteurs. Suggère en temps réel des variations du plan de lotissement (Ex: Remplacer 4 villas par un immeuble R+4) pour décupler le ROI (Retour sur Investissement) et le Net Present Value (NPV).
25. **Registre Distribué "Blockchain Trust"** : Traçabilité immuable avec hash pour contrer drastiquement les "Doubles Ventes" (Litiges fonciers). Une fois un lot réservé et mis en VEFA, le registre logiciel verrouille la parcelle sur l'ensemble du marché national.
26. **Hub Juridique et Archives (Vault Légal)** : Centre numérique contenant les textes socles du Sénégal (Loi Domaine National, Code de l'Urbanisme, CGI) et GED (Gestion Électronique de Documents) sécurisée des contrats, arrêtés préfectoraux, EIES, et D.O.E.

---

## 🏛️ 5. EXTRANET ET TRANSPARENCE POUR LES COMMUNES
*La politique publique digitalisée.*

27. **Espace de Lecture Édile (Transparence Mairie Live)** : Un accès exclusif pour les maires de la localité concernée.
28. **Tracker Social "Emploi Local"** : KPI signalant combien de jeunes de la commune ont été déployés sur le chantier des travaux BTP / VRD.
29. **Tracker d'Actifs de Rétrocession** : Compteur affichant le nombre de mètres carrés attribués à l'État/Mairie pour y construire écoles ou centres de santé (Quotas civiques).
30. **Indicateur des Recettes Fiscales Immobilières** : Calcul en temps réel de ce que les droits de mutation et divers impôts rapportent aux caisses locales.

---

## ⚙️ 6. PORTAIL SUPER ADMINISTRATEUR
*La tour de contrôle absolue pour le détenteur de la plateforme.*

31. **Vérification KYC Centralisée** : Approbation ou rejet des comptes pour les agents et les promoteurs avant d'entrer sur le marché (Process de Trust and Safety).
32. **Système de Workflows et Automatisations (SI... ALORS...)** : Moteur de règles paramétrables. (Ex: *Si Tâche 'ContratVEFA' Validée -> Alors Envoyer Email Notaire + Débloquer versement partiel*).
33. **Module Publicitaire (Ads Management)** : Vente et gestion d'inventaire de bannières numériques et position de "Highlight" pour les promoteurs voulant sortir du lot.
34. **Invoicing & Comptabilité (Syscohada)** : Console de facturation SaaS interne, intégrant potentiellement les normes des plans comptables OHADA.
35. **Tableaux de bord d'Analyse Globale (Reporting Finance)** : Agrégateur macro-économique traçant les flux (Cash-flow entrant, Impayés, Budgets). Génération d'éditions instantanées en format PDF pour comités de direction.
36. **Administration Système et Logs de Sécurité** : Audit Trail complet pistant chaque mouvement de variable (Qu'a fait l'admin ? Quelle heure ? Quel IP ?). Fonction de sécurité globale.
