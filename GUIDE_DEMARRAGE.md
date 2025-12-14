# 🚀 GUIDE DE DÉMARRAGE RAPIDE - DIWAAN
## Lancez votre plateforme en 5 minutes

**Version** : 1.0.0  
**Date** : 10 Décembre 2025  

---

## ⚡ DÉMARRAGE EXPRESS

### Étape 1 : Vérification (30 secondes)

```bash
# Vérifiez que Node.js est installé
node --version
# Doit afficher : v20.x.x ou supérieur

# Vérifiez npm
npm --version
# Doit afficher : 10.x.x ou supérieur
```

### Étape 2 : Installation (2 minutes)

```bash
# Ouvrir le terminal dans le dossier du projet
cd c:\gravity\zillow-clone

# Installer les dépendances (si pas déjà fait)
npm install

# Cela peut prendre 1-2 minutes
```

### Étape 3 : Lancement (10 secondes)

```bash
# Lancer le serveur de développement
npm run dev

# Attendez le message :
# ✓ Ready on http://localhost:3001
```

### Étape 4 : Tester (2 minutes)

Ouvrez votre navigateur : **http://localhost:3001**

**Testez** :
1. ✅ Page d'accueil s'affiche
2. ✅ Cliquez sur "Rechercher"
3. ✅ Cliquez sur "Se connecter"
4. ✅ Connectez-vous : `admin@diwaan.sn` / `admin123`
5. ✅ Vous êtes redirigé vers `/admin`

**🎉 FÉLICITATIONS ! Diwaan fonctionne !**

---

## 🎯 NAVIGATION RAPIDE

### Pages Principales à Tester

| Page | URL | Description |
|------|-----|-------------|
| **Accueil** | `/` | Homepage avec hero |
| **Recherche** | `/search` | Carte + Filtres |
| **Contrats IA** | `/legal-documents` | Générateur contrats |
| **Facturation** | `/invoicing` | Factures & Reçus |
| **Comptabilité** | `/accounting` | Compta OHADA |
| **Admin** | `/admin` | Dashboard admin |

### Identifiants de Connexion

**Admin** :
```
Email: admin@diwaan.sn
Password: admin123
```

**Agent** :
```
Email: agent@diwaan.sn
Password: agent123
```

---

## 🛠️ PERSONNALISATION

### 1. Changer les Couleurs

**Fichier** : `src/app/globals.css`

```css
:root {
  --primary: #FF6B35;        /* Votre orange */
  --primary-hover: #E63946;  /* Votre rouge */
  --secondary: #06FFA5;      /* Votre cyan */
}
```

### 2. Modifier le Nom/Logo

**Fichier** : `src/components/layout/Header.tsx`

Ligne 130 :
```tsx
<Link href="/" className={styles.logo}>
    Diwaan  {/* ← Changez ici */}
</Link>
```

**Fichier** : `src/components/layout/Footer.tsx`

Ligne 13 :
```tsx
<span>Diwaan</span>  {/* ← Changez ici */}
```

### 3. Ajouter vos Propriétés

**Fichier** : `src/lib/data.ts`

Ajoutez vos biens dans le tableau `properties` :

```typescript
{
  id: '999',
  title: 'Votre Villa',
  price: 75000000,
  beds: 4,
  baths: 3,
  sqft: 250,
  address: 'Votre Adresse',
  city: 'Dakar',
  imageUrl: 'https://votre-image.jpg',
  // ...
}
```

---

## 📸 AJOUTER DES IMAGES

### Option 1 : Images Locales

1. Créez le dossier : `public/images/properties/`
2. Ajoutez vos images : `villa1.jpg`, `appart1.jpg`, etc.
3. Utilisez : `imageUrl: '/images/properties/villa1.jpg'`

### Option 2 : Images en Ligne

Utilisez des URLs directes :
```typescript
imageUrl: 'https://images.unsplash.com/votre-image'
```

---

## 🔧 CONFIGURATION AVANCÉE

### Variables d'Environnement

Créez `.env.local` à la racine :

```env
# Application
NEXT_PUBLIC_APP_NAME=Diwaan
NEXT_PUBLIC_APP_URL=http://localhost:3001

# OpenAI (pour chatbot)
OPENAI_API_KEY=sk-votre-clé-ici

# Base de données (future)
DATABASE_URL=postgresql://user:password@localhost:5432/diwaan

# Paiements (future)
STRIPE_PUBLIC_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
```

---

## 🚀 DÉPLOIEMENT EN PRODUCTION

### Option 1 : Vercel (Recommandé)

```bash
# 1. Installer Vercel CLI
npm i -g vercel

# 2. Se connecter
vercel login

# 3. Déployer
vercel

# 4. Production
vercel --prod
```

**URL** : `https://diwaan.vercel.app`

### Option 2 : Build Manuel

```bash
# Build pour production
npm run build

# Lancer le build
npm run start
```

---

## 📱 TESTER SUR MOBILE

### Même Réseau WiFi

1. Trouvez votre IP locale :
   ```bash
   # Windows
   ipconfig
   # Cherchez "IPv4" : ex. 192.168.1.10
   ```

2. Sur mobile, ouvrez : `http://192.168.1.10:3001`

---

## 🐛 RÉSOLUTION PROBLÈMES

### Erreur : Port 3001 déjà utilisé

```bash
# Windows : Tuer le processus
netstat -ano | findstr :3001
taskkill /PID <numéro> /F

# Ou changez le port
npm run dev -- -p 3002
```

### Erreur : Module not found

```bash
# Réinstaller les dépendances
rm -rf node_modules package-lock.json
npm install
```

### Erreur : Build échoue

```bash
# Nettoyer le cache
rm -rf .next
npm run build
```

---

## 📚 DOCUMENTATION COMPLÈTE

Consultez les manuels dans `/docs` :

1. **MANUEL_UTILISATEUR.md** - Pour vos clients
2. **MANUEL_TECHNIQUE.md** - Pour développeurs
3. **MANUEL_ADMINISTRATION.md** - Pour admins
4. **FONCTIONNALITES_AVANT_GARDE.md** - Roadmap
5. **CONTRATS_ET_IA_JURIDIQUE.md** - Système juridique
6. **COMPTABILITE_OHADA.md** - Système comptable

---

## 🎓 PROCHAINES ÉTAPES

### Semaine 1
1. ✅ Personnaliser couleurs et logo
2. ✅ Ajouter vos propriétés
3. ✅ Tester toutes les pages
4. ✅ Configurer emails

### Semaine 2-4
5. ✅ Connecter base de données (Prisma)
6. ✅ Intégrer paiements (Stripe/Wave)
7. ✅ Uploader vraies images
8. ✅ Recruter premiers agents

### Mois 2
9. ✅ Beta testing (50 utilisateurs)
10. ✅ Ajustements feedback
11. ✅ Marketing pré-lancement

### Mois 3
12. 🎉 **LANCEMENT OFFICIEL !**

---

## 💡 ASTUCES PRO

### 1. Mode Développement

Gardez le terminal ouvert pendant que vous codez. Next.js recharge automatiquement à chaque sauvegarde (Hot Reload).

### 2. Inspecteur React

Installez **React Developer Tools** (extension Chrome/Firefox) pour debugger facilement.

### 3. Prettier

Formatez votre code automatiquement :
```bash
npm install --save-dev prettier
```

### 4. Git

Versionnez votre code :
```bash
git init
git add .
git commit -m "Initial commit - Diwaan v1.0"
```

---

## 🔗 RESSOURCES UTILES

### Documentation

- **Next.js** : https://nextjs.org/docs
- **React** : https://react.dev
- **TypeScript** : https://typescriptlang.org/docs
- **Leaflet** : https://leafletjs.com

### Communauté

- **Discord** : discord.gg/diwaan (à créer)
- **Forum** : forum.diwaan.sn (à créer)
- **YouTube** : Tutoriels Diwaan (à créer)

---

## 📞 SUPPORT

### Besoin d'Aide ?

- 📧 **Email** : support@diwaan.sn
- 💬 **Chat** : Dans l'app (widget)
- 📱 **Téléphone** : +221 33 XXX XX XX

---

## ✅ CHECKLIST FINALE

Avant le lancement :

- [ ] Application fonctionne localement
- [ ] Toutes les pages testées
- [ ] Couleurs/Logo personnalisés
- [ ] Vraies propriétés ajoutées
- [ ] Images uploadées
- [ ] Base de données connectée
- [ ] Paiements configurés
- [ ] Variables environnement prod
- [ ] Test sur mobile
- [ ] Build production réussi
- [ ] Déployé sur Vercel
- [ ] Domaine personnalisé (diwaan.sn)
- [ ] Analytics configuré (Google)
- [ ] SEO optimisé
- [ ] Certificat SSL actif

---

## 🎊 VOUS ÊTES PRÊT !

**Diwaan** est maintenant entre vos mains.

Lancez, testez, personnalisez, et **conquérez le marché immobilier sénégalais** ! 🚀

**Bonne chance !** 💪

---

**© 2025 Diwaan Group**

*"L'avenir de l'immobilier commence maintenant."* 🌍✨
