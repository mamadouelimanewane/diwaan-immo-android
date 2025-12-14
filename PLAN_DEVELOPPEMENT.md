# Plan de Développement - Zillow Clone

## Phase 1 : Fondation et Navigation (Terminé)
- [x] Structure du projet Next.js
- [x] Design System de base (CSS Modules, Variables)
- [x] Page d'accueil (Hero, Features)
- [x] Navigation principale (Header)
- [x] Pages statiques clés : Acheter, Louer, Vendre, Prêts, Agents

## Phase 2 : Recherche et Cartographie (En cours)
- [x] Intégration de Leaflet pour la carte interactive
- [x] Affichage des listings sur la carte et en liste
- [x] Page de détail d'un bien
- [ ] Filtres de recherche avancés (Prix, Type, Surface) fonctionnels
- [ ] Géolocalisation utilisateur

## Phase 3 : Gestion Utilisateur et Dashboard (À venir)
- [ ] Authentification (Auth.js ou Supabase)
- [ ] Dashboard utilisateur (Biens favoris, Recherches sauvegardées)
- [ ] Dashboard Agent (Gestion des listings, Messages)
- [ ] Formulaires de contact fonctionnels (Envoi d'email)

## Phase 4 : Fonctionnalités Avancées
- [ ] Upload d'images pour les nouveaux listings
- [ ] Estimation de prix (Algorithme simple "Zestimate")
- [ ] Visites virtuelles (Intégration vidéo/3D)
- [ ] Comparateur de prêts immobiliers

## Phase 5 : Optimisation et SEO
- [ ] Optimisation des images (Next/Image)
- [ ] SEO technique (Meta tags dynamiques, Sitemap)
- [ ] Performance (Lazy loading des composants lourds)
- [ ] Accessibilité (ARIA, Navigation clavier)

## Instructions pour les développeurs
1. Toujours utiliser des modules CSS pour le style.
2. Privilégier les composants React Server Components par défaut.
3. Utiliser `lucide-react` pour les icônes.
4. Tester la responsivité sur chaque nouvelle feature.
