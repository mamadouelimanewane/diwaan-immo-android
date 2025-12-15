# 🎨 Ressources pour l'Application Android

## 📱 Icônes Requises

Pour personnaliser l'icône de votre application, vous devez créer des icônes dans différentes résolutions :

### Tailles d'icônes Android

| Densité | Taille | Emplacement |
|---------|--------|-------------|
| mdpi    | 48x48  | `android/app/src/main/res/mipmap-mdpi/` |
| hdpi    | 72x72  | `android/app/src/main/res/mipmap-hdpi/` |
| xhdpi   | 96x96  | `android/app/src/main/res/mipmap-xhdpi/` |
| xxhdpi  | 144x144 | `android/app/src/main/res/mipmap-xxhdpi/` |
| xxxhdpi | 192x192 | `android/app/src/main/res/mipmap-xxxhdpi/` |

## 🎨 Design de l'Icône Recommandée

Pour **Diwaan Immo**, voici les spécifications recommandées :

- **Couleur principale** : #006AFF (Bleu Diwaan)
- **Couleur secondaire** : #002B49 (Bleu foncé)
- **Symbole** : Maison stylisée ou logo Diwaan
- **Format** : PNG avec transparence ou fond uni
- **Forme** : Respecter les guidelines Android (icônes adaptatives)

## 🖼️ Splash Screen (Écran de démarrage)

Créez un splash screen dans : `android/app/src/main/res/drawable/splash.png`

**Dimensions recommandées** : 1080x1920 px

## 🛠️ Outils de Génération

### Option 1 : Icon Generator en ligne
- https://icon.kitchen/ (Recommandé)
- Uploadez une image 1024x1024
- Téléchargez le pack Android

### Option 2 : Android Asset Studio
- https://romannurik.github.io/AndroidAssetStudio/
- Génère toutes les densités automatiquement

### Option 3 : Capacitor Assets
```bash
npm install @capacitor/assets --save-dev
npx capacitor-assets generate
```

## 📋 Checklist Avant Génération APK

- [ ] Icône principale créée (toutes les densités)
- [ ] Splash screen créé
- [ ] Nom de l'app vérifié dans `strings.xml`
- [ ] URL Vercel correcte dans `capacitor.config.ts`
- [ ] Permissions correctes dans `AndroidManifest.xml`
- [ ] Testé en mode debug

## 🎯 Image de Marque Diwaan

Pour maintenir la cohérence de la marque :
- Logo Diwaan au centre
- Fond dégradé bleu (#002B49 → #006AFF)
- Texte "Diwaan Immo" en blanc
- Icône maison minimaliste

## 📱 Exemple de Structure de Fichiers

```
android/app/src/main/res/
├── mipmap-mdpi/
│   ├── ic_launcher.png (48x48)
│   └── ic_launcher_round.png (48x48)
├── mipmap-hdpi/
│   ├── ic_launcher.png (72x72)
│   └── ic_launcher_round.png (72x72)
├── mipmap-xhdpi/
│   ├── ic_launcher.png (96x96)
│   └── ic_launcher_round.png (96x96)
├── mipmap-xxhdpi/
│   ├── ic_launcher.png (144x144)
│   └── ic_launcher_round.png (144x144)
├── mipmap-xxxhdpi/
│   ├── ic_launcher.png (192x192)
│   └── ic_launcher_round.png (192x192)
└── drawable/
    └── splash.png (1080x1920)
```

## 🎨 Palette de Couleurs Diwaan

```css
--primary: #006AFF
--secondary: #002B49
--accent: #05CD99
--background: #F4F7FE
--text: #1B254B
```
