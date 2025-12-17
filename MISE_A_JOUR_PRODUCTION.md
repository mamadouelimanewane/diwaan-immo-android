# 🔧 GUIDE : Mettre à Jour les Prix en Production

## ✅ Étape 1 : Ajouter le Token Admin sur Vercel

### 1. Allez sur Vercel
👉 **https://vercel.com/mamadou-dias-projects-979b1f4f/zillow-clone/settings/environment-variables**

### 2. Ajoutez la variable d'environnement

- **Key (Nom)** : `ADMIN_SECRET_TOKEN`
- **Value (Valeur)** : `diwaan-admin-2024-secure-token-789xyz`
- **Environments** : ✅ Production

### 3. Cliquez sur **"Save"**

### 4. Redéployez l'application

Allez sur : https://vercel.com/mamadou-dias-projects-979b1f4f/zillow-clone

Cliquez sur **"Redeploy"** pour le dernier déploiement.

---

## ✅ Étape 2 : Exécuter le Script de Mise à Jour

Une fois que le redéploiement est terminé (1-2 minutes) :

```powershell
.\update-production-prices.ps1
```

Le script va :
1. Se connecter à la base de données de production
2. Mettre à jour le prix de l'appartement Vue Mer Plateau
3. Confirmer la mise à jour

---

## 📊 Résultat Attendu

```
Mise a jour des prix en production...
URL Production: https://zillow-clone-2hkkjw5tu-mamadou-dias-projects-979b1f4f.vercel.app
Appel de l'API de mise a jour...
SUCCES!
Message: Prix des loyers mis à jour en production
Proprietes mises a jour: 1
Les loyers sont maintenant a jour en production!
Termine.
```

---

## ⚠️ Si vous avez une erreur "Token incorrect"

C'est que le token n'est pas encore configuré sur Vercel ou que le redéploiement n'est pas terminé.

**Vérifiez** :
1. La variable est bien ajoutée sur Vercel
2. Le redéploiement est terminé (voyez le ✅ vert)
3. Réessayez le script

---

## 🎯 Alternative : Mise à Jour Manuelle via Browser

Si le script ne fonctionne pas, utilisez un outil comme Postman ou Insomnia :

**Requête** :
```
POST https://zillow-clone-2hkkjw5tu-mamadou-dias-projects-979b1f4f.vercel.app/api/admin/update-prices

Headers:
Authorization: Bearer diwaan-admin-2024-secure-token-789xyz
Content-Type: application/json
```

---

## 📋 Vérification

Après la mise à jour :

1. Allez sur : https://zillow-clone-2hkkjw5tu-mamadou-dias-projects-979b1f4f.vercel.app/search?type=RENT
2. Cherchez "Appartement Vue Mer Plateau"
3. Vérifiez que le loyer est : **650 000 FCFA/mois** (au lieu de 1 250 000)

---

## ✅ Checklist

- [ ] Variable ADMIN_SECRET_TOKEN ajoutée sur Vercel
- [ ] Application redéployée
- [ ] Script exécuté avec succès
- [ ] Prix vérifié sur le site

---

**Créé le** : 15 Décembre 2025  
**Token Admin** : diwaan-admin-2024-secure-token-789xyz
