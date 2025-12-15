# 📚 DOCUMENTATION DIWAAN PLATFORM

Bienvenue dans la documentation complète de **Diwaan**, la plateforme immobilière intelligente du Sénégal.

---

## 📖 MANUELS DISPONIBLES

### 1. 👥 [Manuel Utilisateur](./MANUEL_UTILISATEUR.md)
**Pour : Utilisateurs finaux, Acheteurs, Vendeurs, Locataires**

**Contenu :**
- Premiers pas et inscription
- Rechercher une propriété
- Publier une annonce
- Utiliser l'Assistant IA DiwaanBot
- Simulateurs financiers
- FAQ complète

**Pages :** 35  
**Niveau :** Débutant  
**Langue :** Français

---

### 2. 🔧 [Manuel Technique](./MANUEL_TECHNIQUE.md)
**Pour : Développeurs, DevOps, Intégrateurs**

**Contenu :**
- Architecture système (Stack Next.js + MongoDB)
- Installation et configuration
- Documentation API complète
- Schéma base de données Prisma
- Authentification JWT & Sécurité
- Déploiement Vercel
- Tests & Debugging
- Maintenance

**Pages :** 40  
**Niveau :** Avancé  
**Langue :** Français

---

### 3. 👨‍💼 [Manuel Administrateur](./MANUEL_ADMINISTRATEUR.md)
**For : Administrateurs Backoffice, Modérateurs**

**Contenu :**
- Accès et sécurité du backoffice
- Dashboard et statistiques
- Gestion des propriétés
- Gestion des utilisateurs
- Système de partenariat (Promoteurs/Agences)
- Finance & Transactions
- **Sauvegardes & Sécurité**
- Audit Logs
- Configuration système
- Bonnes pratiques
- Dépannage

**Pages :** 45  
**Niveau :** Intermédiaire  
**Langue :** Français

---

## 📄 AUTRES DOCUMENTS

### [Guide d'Accès Production](../ACCES_PRODUCTION.md)
Liens d'accès, identifiants, configuration technique

### [Guide de Déploiement](../GUIDE_DEPLOIEMENT.md)
Procédures de déploiement Vercel

### [Rapport de Test Backoffice](../RAPPORT_TEST_BACKOFFICE.md)
Tests complets des modules admin

---

## 🔄 CONVERSION EN PDF

### Méthode 1 : En Ligne (Recommandée)

**Utiliser [Pandoc Live](https://pandoc.org/try/)**
1. Ouvrez le manuel (.md) dans un éditeur
2. Copiez le contenu complet
3. Allez sur https://pandoc.org/try/
4. Collez dans la zone "Markdown"
5. Format de sortie : **PDF**
6. Cliquez sur **"Convert"**
7. Téléchargez le PDF généré

### Méthode 2 : Ligne de Commande (Pandoc)

**Installation Pandoc :**
```bash
# Windows (Chocolatey)
choco install pandoc

# macOS (Homebrew)
brew install pandoc

# Linux (apt)
sudo apt-get install pandoc
```

**Conversion :**
```bash
# Manuel Utilisateur
pandoc MANUEL_UTILISATEUR.md -o MANUEL_UTILISATEUR.pdf --pdf-engine=xelatex

# Manuel Technique
pandoc MANUEL_TECHNIQUE.md -o MANUEL_TECHNIQUE.pdf --pdf-engine=xelatex

# Manuel Administrateur
pandoc MANUEL_ADMINISTRATEUR.md -o MANUEL_ADMINISTRATEUR.pdf --pdf-engine=xelatex
```

**Avec Options Avancées :**
```bash
pandoc MANUEL_UTILISATEUR.md -o MANUEL_UTILISATEUR.pdf \
  --pdf-engine=xelatex \
  --toc \
  --number-sections \
  -V geometry:margin=2cm \
  -V fontsize=11pt \
  -V documentclass=report \
  --highlight-style=tango
```

Options :
- `--toc` : Table des matières
- `--number-sections` : Numérotation automatique
- `-V geometry:margin=2cm` : Marges
- `--highlight-style` : Coloration syntaxe code

### Méthode 3 : VS Code Extension

**Extension : Markdown PDF**
1. Installer l'extension "Markdown PDF" dans VS Code
2. Ouvrir le fichier `.md`
3. `Ctrl+Shift+P` → "Markdown PDF: Export (pdf)"
4. PDF généré dans le même dossier

### Méthode 4 : Service en Ligne

**Sites recommandés :**
- https://www.markdowntopdf.com/
- https://cloudconvert.com/md-to-pdf
- https://www.convertio.co/md-pdf/

---

## 📊 STRUCTURE DOCUMENTATION

```
docs/
├── README.md                      # Ce fichier
├── MANUEL_UTILISATEUR.md          # ~35 pages
├── MANUEL_TECHNIQUE.md            # ~40 pages
├── MANUEL_ADMINISTRATEUR.md       # ~45 pages
└── pdf/                           # (à créer)
    ├── MANUEL_UTILISATEUR.pdf
    ├── MANUEL_TECHNIQUE.pdf
    └── MANUEL_ADMINISTRATEUR.pdf
```

---

## 🎨 PERSONNALISATION PDF

### Ajouter un Logo/Header

**Créer un fichier `header.tex` :**
```latex
\usepackage{fancyhdr}
\pagestyle{fancy}
\fancyhead[L]{\includegraphics[width=2cm]{logo-diwaan.png}}
\fancyhead[R]{Diwaan Platform}
```

**Utiliser :**
```bash
pandoc MANUEL_UTILISATEUR.md -o output.pdf \
  -H header.tex \
  --pdf-engine=xelatex
```

### Personnaliser les Couleurs

**Créer `custom.yaml` :**
```yaml
---
title: "Manuel Utilisateur Diwaan"
author: "Diwaan Platform"
date: "Décembre 2025"
geometry: margin=2.5cm
colorlinks: true
linkcolor: blue
urlcolor: blue
toccolor: black
---
```

**Utiliser :**
```bash
pandoc MANUEL_UTILISATEUR.md -o output.pdf \
  --metadata-file=custom.yaml \
  --pdf-engine=xelatex
```

---

## 📝 MISE À JOUR DOCUMENTATION

### Processus de Mise à Jour

1. **Modifier le fichier .md** concerné
2. **Incrémenter la version** (en haut du document)
3. **Mettre à jour la date** : "Dernière mise à jour : JJ Mois AAAA"
4. **Régénérer le PDF** avec la même commande
5. **Commit Git** :
   ```bash
   git add docs/
   git commit -m "docs: update MANUEL_UTILISATEUR v1.1.0"
   git push
   ```

### Versioning

**Format :** `v[MAJOR].[MINOR].[PATCH]`

Exemples :
- `v1.0.0` → Version initiale
- `v1.1.0` → Ajout de fonctionnalités
- `v1.0.1` → Corrections mineures

---

## 🌍 TRADUCTIONS

### Langues Prévues

- ✅ **Français** (disponible)
- 🔄 **Wolof** (en cours)
- 🔄 **Anglais** (planifié)

### Structure Traduction

```
docs/
├── fr/
│   ├── MANUEL_UTILISATEUR.md
│   ├── MANUEL_TECHNIQUE.md
│   └── MANUEL_ADMINISTRATEUR.md
├── wo/ (Wolof)
│   └── MANUEL_UTILISATEUR.md
└── en/ (English)
    └── MANUEL_UTILISATEUR.md
```

---

## 📞 SUPPORT DOCUMENTATION

**Questions :** docs@diwaan.sn  
**Suggestions :** support@diwaan.sn  
**Contributions :** Via Pull Request GitHub

---

## 📜 LICENCE

© 2025 Diwaan Platform - Tous droits réservés

Cette documentation est propriétaire et confidentielle.  
Toute reproduction, même partielle, est interdite sans autorisation écrite.

---

## 🔗 LIENS UTILES

- **Site Web :** https://zillow-clone-five.vercel.app
- **Admin :** https://zillow-clone-five.vercel.app/admin
- **Support :** support@diwaan.sn
- **GitHub :** [Repository privé]

---

**Dernière mise à jour :** 15 Décembre 2025  
**Version Documentation :** 1.0.0
