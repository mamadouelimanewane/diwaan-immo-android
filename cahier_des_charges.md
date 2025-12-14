# Cahier des Charges : Clone de Zillow

## 1. Introduction
Ce document définit les spécifications pour le développement d'un clone du site Zillow.com. L'objectif est de créer une application web immobilière performante, esthétique et fonctionnelle, permettant aux utilisateurs de rechercher, visualiser et obtenir des détails sur des biens immobiliers.

## 2. Objectifs du Projet
- **Répliquer l'expérience utilisateur de Zillow** : Navigation fluide, recherche intuitive, et visualisation cartographique.
- **Design Premium** : Interface moderne, épurée et responsive.
- **Performance** : Chargement rapide des pages et des cartes.

## 3. Fonctionnalités Clés

### 3.1. Page d'Accueil (Home)
- **Hero Section** : Grande image de fond ou vidéo inspirante avec une barre de recherche centrale.
- **Barre de Recherche** : Saisie intuitive (Ville, Code postal, Adresse) avec autocomplétion (simulée).
- **Navigation** : Menu principal (Acheter, Louer, Vendre, Prêts, Agent).
- **Sections Promotionnelles** : "Recommandés pour vous", "Nouveaux listings".
- **Pied de page (Footer)** : Liens utiles, mentions légales.

### 3.2. Page de Recherche (Search Results)
- **Layout Split** :
    - **Gauche (ou Droite)** : Carte interactive (Map) affichant les épingles des biens.
    - **Droite (ou Gauche)** : Liste défilante des biens correspondants (Cards).
- **Filtres Avancés** :
    - Prix (Min/Max).
    - Type de bien (Maison, Appartement, Condo).
    - Chambres / Salles de bain.
    - Autres (Surface, Année de construction).
- **Carte Interactive** :
    - Zoom/Dezoom.
    - Clic sur épingle pour voir un aperçu (Popup).
    - Mise à jour de la liste au déplacement de la carte.

### 3.3. Page de Détail du Bien (Listing Detail)
- **Galerie Photos** : Carrousel ou grille d'images haute résolution.
- **Informations Principales** : Prix, Adresse, Nombre de lits/bains, Surface.
- **Description** : Texte détaillé du bien.
- **Caractéristiques (Facts & Features)** : Type de chauffage, climatisation, parking, etc.
- **Historique de Prix** : Graphique ou liste (simulé).
- **Calculatrice de Prêt** : Estimation des mensualités.
- **Contact Agent** : Formulaire de contact flottant ou fixe.

### 3.4. Authentification (Optionnel pour V1)
- Connexion / Inscription.
- Sauvegarde des favoris.

## 4. Design & UX
- **Esthétique** : "Wow effect". Couleurs vibrantes mais professionnelles (Bleu Zillow `#006AFF`, Blanc, Gris clair).
- **Typographie** : Moderne et lisible (ex: Inter, Roboto).
- **Micro-animations** : Hover sur les cartes, transitions fluides entre les pages.
- **Responsive** : Adaptation parfaite sur Mobile, Tablette et Desktop.

## 5. Stack Technique
- **Frontend** : Next.js (React) pour le rendu serveur et la performance.
- **Langage** : TypeScript.
- **Styling** : CSS Modules (Vanilla CSS) pour un contrôle total et une performance optimale.
- **Cartographie** : Leaflet (via `react-leaflet`) avec tuiles OpenStreetMap (alternative gratuite à Google Maps).
- **Données** : Mock Data (JSON) pour simuler les listings immobiliers.
- **Icônes** : Lucide React ou Heroicons.

## 6. Structure du Projet (Proposition)
```
/src
  /app
    /page.tsx        (Homepage)
    /search
      /page.tsx      (Search Results with Map)
    /homes
      /[id]
        /page.tsx    (Listing Detail)
  /components
    /ui              (Boutons, Inputs, Cards)
    /map             (Composants Carte)
    /layout          (Header, Footer)
  /lib
    data.ts          (Mock Data)
  /styles
    globals.css      (Variables CSS, Reset)
```

## 7. Livrables
- Code source complet sur le répertoire local.
- Instructions d'installation et de lancement.
