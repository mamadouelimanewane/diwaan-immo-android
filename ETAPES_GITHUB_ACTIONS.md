# 🚀 ÉTAPES POUR GÉNÉRER L'APK VIA GITHUB ACTIONS

## ✅ ÉTAPE 1/4 : CRÉER UN REPOSITORY GITHUB (2 minutes)

### Option A : Via le navigateur web (Plus simple)

1. **Allez sur GitHub** : https://github.com/new
   
2. **Remplissez le formulaire** :
   - **Repository name** : `diwaan-immo-android` (ou autre nom)
   - **Description** : `Application mobile Android pour Diwaan Immobilier`
   - **Visibilité** : 
     - ✅ **Private** (recommandé - gratuit et privé)
     - ⚪ Public (si vous voulez le partager)
   - ❌ **NE cochez PAS** "Add a README file"
   - ❌ **NE cochez PAS** "Add .gitignore"
   - ❌ **NE cochez PAS** "Choose a license"

3. **Cliquez sur** `Create repository`

4. **Copiez l'URL du repository** qui apparaît, exemple :
   ```
   https://github.com/VOTRE_USERNAME/diwaan-immo-android.git
   ```

### Option B : Via GitHub CLI (Si installé)

```bash
gh repo create diwaan-immo-android --private --source=. --remote=origin --push
```

---

## ✅ ÉTAPE 2/4 : CONNECTER VOTRE PROJET AU REPOSITORY (30 secondes)

**Ouvrez PowerShell dans le dossier du projet et exécutez :**

```powershell
# Remplacez VOTRE_USERNAME par votre nom d'utilisateur GitHub
git remote add origin https://github.com/VOTRE_USERNAME/diwaan-immo-android.git
```

**Exemple** :
```powershell
git remote add origin https://github.com/mamadoudia/diwaan-immo-android.git
```

---

## ✅ ÉTAPE 3/4 : POUSSER LE CODE VERS GITHUB (1 minute)

```powershell
git push -u origin master
```

**Si on vous demande de vous connecter :**
- Username : Votre nom d'utilisateur GitHub
- Password : Votre **Personal Access Token** (PAS votre mot de passe)

### ⚠️ Comment créer un Personal Access Token ?

1. Allez sur : https://github.com/settings/tokens
2. Cliquez sur `Generate new token (classic)`
3. Cochez `repo` (accès complet)
4. Cliquez sur `Generate token`
5. **COPIEZ LE TOKEN** (vous ne le reverrez plus !)
6. Utilisez-le comme mot de passe

---

## ✅ ÉTAPE 4/4 : GITHUB ACTIONS GÉNÈRE L'APK AUTOMATIQUEMENT (5-10 min)

### 1. Vérifiez que le push a réussi

Sur GitHub : https://github.com/VOTRE_USERNAME/diwaan-immo-android

Vous devriez voir tous vos fichiers.

### 2. Allez sur l'onglet "Actions"

https://github.com/VOTRE_USERNAME/diwaan-immo-android/actions

### 3. Observez le workflow en cours

- Un workflow nommé **"Build Android APK"** devrait être en cours d'exécution (🟡 jaune)
- Cliquez dessus pour voir les détails
- Durée : environ **5-10 minutes**

### 4. Attendez que le workflow soit terminé

- ✅ **Vert** = Succès ! L'APK est généré
- ❌ **Rouge** = Erreur (rare, je peux vous aider à corriger)

### 5. Téléchargez l'APK

Une fois le workflow terminé (✅ vert) :

1. Cliquez sur le workflow terminé
2. Scrollez en bas de la page
3. Section **"Artifacts"** → Cliquez sur `diwaan-immo-debug`
4. Un fichier ZIP sera téléchargé
5. Extrayez le ZIP → Vous aurez `app-debug.apk` ! 🎉

---

## 📱 INSTALLER L'APK SUR VOTRE TÉLÉPHONE

### Méthode 1 : Via câble USB

1. Connectez votre téléphone à l'ordinateur
2. Copiez `app-debug.apk` sur le téléphone
3. Sur le téléphone, ouvrez le fichier avec le gestionnaire de fichiers
4. Activez "Sources inconnues" si demandé
5. Installez !

### Méthode 2 : Via email/Drive

1. Envoyez-vous `app-debug.apk` par email ou Google Drive
2. Sur le téléphone, téléchargez le fichier
3. Ouvrez-le et installez

### Méthode 3 : Via QR Code (rapide !)

Uploadez l'APK sur un service comme :
- https://www.diawi.com/ (gratuit)
- https://appetize.io/ (gratuit)

Vous obtenez un QR code → Scannez avec votre téléphone → Installez !

---

## 🔄 MISES À JOUR FUTURES

**La magie de GitHub Actions** : À chaque fois que vous modifiez votre code et faites un `git push`, un nouvel APK sera généré automatiquement !

```powershell
# Après des modifications :
git add .
git commit -m "Mise à jour de l'application"
git push

# GitHub Actions générera automatiquement un nouvel APK !
```

---

## 📊 RÉSUMÉ DES COMMANDES

```powershell
# 1. Créer le repo sur https://github.com/new

# 2. Connecter le projet
git remote add origin https://github.com/VOTRE_USERNAME/diwaan-immo-android.git

# 3. Pousser le code
git push -u origin master

# 4. Attendre 5-10 minutes

# 5. Télécharger l'APK depuis :
# https://github.com/VOTRE_USERNAME/diwaan-immo-android/actions
```

---

## ⚠️ PROBLÈMES COURANTS

### "fatal: remote origin already exists"

```powershell
git remote remove origin
git remote add origin https://github.com/VOTRE_USERNAME/diwaan-immo-android.git
```

### "Permission denied"

Utilisez un Personal Access Token à la place du mot de passe :
https://github.com/settings/tokens

### Le workflow échoue

1. Vérifiez les logs dans Actions
2. Contactez-moi avec le message d'erreur
3. Je peux corriger rapidement

---

## 🎯 PROCHAINE ÉTAPE

**CRÉEZ VOTRE REPOSITORY MAINTENANT** :

👉 https://github.com/new

Ensuite, revenez ici et exécutez les commandes de l'Étape 2 !

---

**Besoin d'aide ?** Demandez-moi à n'importe quelle étape ! 🚀
