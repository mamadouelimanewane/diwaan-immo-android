# 📱 Guide de Création de l'APK Android - Diwaan Immo

## ✅ Configuration Terminée

Votre application est maintenant configurée pour Android avec Capacitor !

## 📋 Prérequis

Pour générer l'APK, vous devez installer :

### 1. Android Studio
- Téléchargez depuis : https://developer.android.com/studio
- Installez avec les composants SDK Android

### 2. Java JDK
- Version requise : JDK 11 ou supérieur
- Téléchargez depuis : https://adoptium.net/

## 🚀 Étapes de Génération de l'APK

### Méthode 1 : Via Android Studio (Recommandée)

1. **Ouvrir le projet Android**
   ```bash
   npx cap open android
   ```

2. **Dans Android Studio :**
   - Attendez que Gradle finisse de synchroniser
   - Cliquez sur `Build` → `Build Bundle(s) / APK(s)` → `Build APK(s)`
   - Une fois terminé, un lien apparaît pour localiser l'APK

3. **Localisation de l'APK**
   ```
   android/app/build/outputs/apk/debug/app-debug.apk
   ```

### Méthode 2 : En ligne de commande

1. **Naviguez vers le dossier android**
   ```bash
   cd android
   ```

2. **Générez l'APK debug**
   ```bash
   ./gradlew assembleDebug
   ```

3. **Pour un APK de production (signé)**
   ```bash
   ./gradlew assembleRelease
   ```

## 🔑 Signature de l'APK (Production)

Pour publier sur Google Play Store, vous devez signer l'APK :

1. **Créer un keystore**
   ```bash
   keytool -genkey -v -keystore diwaan-release.keystore -alias diwaan -keyalg RSA -keysize 2048 -validity 10000
   ```

2. **Configurer dans `android/app/build.gradle`**
   ```gradle
   android {
       signingConfigs {
           release {
               storeFile file("../../diwaan-release.keystore")
               storePassword "votre_mot_de_passe"
               keyAlias "diwaan"
               keyPassword "votre_mot_de_passe"
           }
       }
       buildTypes {
           release {
               signingConfig signingConfigs.release
           }
       }
   }
   ```

3. **Générer l'APK signé**
   ```bash
   cd android
   ./gradlew assembleRelease
   ```

   L'APK signé sera dans : `android/app/build/outputs/apk/release/app-release.apk`

## 📱 Configuration de l'Application

### Personnalisation de l'icône

Remplacez les icônes dans :
```
android/app/src/main/res/mipmap-*/ic_launcher.png
```

### Modification du nom de l'app

Éditez `android/app/src/main/res/values/strings.xml` :
```xml
<resources>
    <string name="app_name">Diwaan Immo</string>
</resources>
```

### Permissions

Les permissions sont dans `android/app/src/main/AndroidManifest.xml`

Actuellement configuré avec :
- Internet
- Localisation
- Caméra (pour photos de propriétés)
- Stockage

## 🌐 Mode de Fonctionnement

L'application est configurée en **mode WebView** :
- Elle charge votre site web Vercel : https://zillow-clone-lebv2gec5-mamadou-dias-projects-979b1f4f.vercel.app
- Avantages :
  - ✅ Mises à jour instantanées (pas besoin de republier l'APK)
  - ✅ Toutes les fonctionnalités backend fonctionnent
  - ✅ Base de données MongoDB connectée
- Inconvénient :
  - ⚠️ Nécessite une connexion internet

## 📦 Distribution

### Option 1 : Installation directe
- Transférez `app-debug.apk` sur le téléphone
- Activez "Sources inconnues" dans les paramètres
- Installez l'APK

### Option 2 : Google Play Store
1. Créez un compte développeur Google Play (25$ unique)
2. Générez un APK signé (voir section Signature)
3. Créez une fiche sur Google Play Console
4. Uploadez l'APK signé

### Option 3 : Distribution interne
- Utilisez Firebase App Distribution
- Ou TestFlight pour tests internes

## 🔧 Commandes Utiles

```bash
# Ouvrir Android Studio
npx cap open android

# Synchroniser les changements web
npx cap sync android

# Copier les fichiers web
npx cap copy android

# Nettoyer le build
cd android && ./gradlew clean

# Désinstaller puis réinstaller l'app
adb uninstall sn.diwaan.app
adb install android/app/build/outputs/apk/debug/app-debug.apk
```

## 📊 Taille de l'APK

- **APK Debug** : ~50-70 MB
- **APK Release** (avec ProGuard) : ~20-40 MB

## ⚠️ Problèmes Courants

### "SDK not found"
```bash
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools
```

### "Gradle build failed"
- Vérifiez que Java JDK est installé
- Vérifiez `android/gradle.properties`

### L'app crash au démarrage
- Vérifiez les logs : `adb logcat`
- Assurez-vous que l'URL Vercel est correcte dans `capacitor.config.ts`

## 🎯 Prochaines Étapes Suggérées

1. ✅ **Générer l'APK debug** pour tester
2. 🎨 **Personnaliser l'icône** de l'application  
3. 📝 **Tester sur plusieurs appareils**
4. 🔐 **Créer un keystore** pour la production
5. 📱 **Publier sur Google Play Store**

## 📞 Support

Pour toute question :
- Documentation Capacitor : https://capacitorjs.com/docs
- Stack Overflow : Tagguez avec `capacitor` et `android`

---

**Créé le :** 15 Décembre 2025  
**Version :** 1.0.0  
**Package :** sn.diwaan.app
