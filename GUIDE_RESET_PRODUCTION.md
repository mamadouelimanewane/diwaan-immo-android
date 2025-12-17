# 🎯 GUIDE COMPLET - Réinitialisation Base de Données Production

## ✅ Tout est Prêt !

### 📦 Fichiers Créés

1. **`src/app/api/admin/reset-db/route.ts`** - Route API admin sécurisée
2. **`reset-production-db.ps1`** - Script PowerShell pour exécution simple
3. **`scripts/reset-db-prices.js`** - Script Node.js pour BD locale

---

## 🚀 METHODE RECOMMANDÉE : Script PowerShell

### Étape 1 : Vérifier le Token Admin sur Vercel

1. Allez sur : https://vercel.com/mamadou-dias-projects-979b1f4f/zillow-clone/settings/environment-variables

2. Vérifiez que la variable existe :
   - **Key** : `ADMIN_SECRET_TOKEN`
   - **Value** : `diwaan-admin-2024-secure-token-789xyz`
   - **Environment** : ✅ Production

3. Si elle n'existe pas, ajoutez-la et **redéployez**

### Étape 2 : Exécuter le Script

```powershell
.\reset-production-db.ps1
```

### Étape 3 : Confirmer

```
ATTENTION: Cette action va:
  - SUPPRIMER toutes les proprietes existantes
  - CREER 6 nouvelles proprietes avec prix corrects

Voulez-vous continuer? (O/N): O
```

### Étape 4 : Résultat Attendu

```
=================================
SUCCES !
=================================

Resultats:
  - Proprietes supprimees: XX
  - Proprietes creees: 6  
  - Locations: 4 (200K - 750K FCFA)
  - Ventes: 2

Base de donnees de production mise a jour avec succes!

Testez maintenant sur:
  https://zillow-clone-2hkkjw5tu-mamadou-dias-projects-979b1f4f.vercel.app/rent
```

---

## 🔧 METHODE ALTERNATIVE : CURL/Postman

Si PowerShell ne fonctionne pas :

### Via CURL (CMD/PowerShell)

```bash
curl -X POST https://zillow-clone-2hkkjw5tu-mamadou-dias-projects-979b1f4f.vercel.app/api/admin/reset-db ^
  -H "Authorization: Bearer diwaan-admin-2024-secure-token-789xyz" ^
  -H "Content-Type: application/json"
```

### Via Postman/Insomnia

```
Method: POST
URL: https://zillow-clone-2hkkjw5tu-mamadou-dias-projects-979b1f4f.vercel.app/api/admin/reset-db

Headers:
  Authorization: Bearer diwaan-admin-2024-secure-token-789xyz
  Content-Type: application/json
```

---

## 📊 Nouvelles Données qui Seront Créées

### 🏠 LOCATIONS (4 propriétés)

| Titre | Prix/mois | Chambres | Surface |
|-------|-----------|----------|---------|
| Appartement F3 Mermoz | 400 000 FCFA | 3 | 95 m² |
| Studio Yoff | 200 000 FCFA | 1 | 35 m² |
| Villa Piscine Mamelles | 750 000 FCFA | 4 | 280 m² |
| Appartement F4 Sacré-Cœur | 550 000 FCFA | 3 | 140 m² |

✅ **Tous sous 800 000 FCFA !**

### 🏘️ VENTES (2 propriétés)

| Titre | Prix | Surface |
|-------|------|---------|
| Villa Moderne Almadies | 425 000 000 FCFA | 650 m² |
| Terrain Diamniadio | 9 000 000 FCFA | 300 m² |

---

## ⏱️ Temps Estimé

- **Exécution du script** : 5-10 secondes
- **Propagation CDN** : 1-2 minutes
- **Total** : ~3 minutes maximum

---

## ✅ Vérification

### Desktop
1. Allez sur : https://zillow-clone-2hkkjw5tu-mamadou-dias-projects-979b1f4f.vercel.app/rent
2. Vous devriez voir uniquement 4 locations avec prix entre 200K et 750K FCFA

### Mobile
1. Ouvrez l'app ou le site
2. Allez sur "Location"
3. Même résultat : 4 propriétés, prix corrects

---

## 🔄 Pour Recommencer (Si Besoin)

Le script peut être exécuté autant de fois que nécessaire. Il va :
1. Supprimer TOUT
2. Re-créer les 6 propriétés

---

## ⚠️ Problèmes Courants

### "Token incorrect"

**Solution** :
1. Vérifiez que `ADMIN_SECRET_TOKEN` existe dans Vercel
2. Redéployez après l'avoir ajouté
3. Attendez 1-2 minutes
4. Réessayez

### "Erreur 500"

**Solution** :
1. Vérifiez que MongoDB est accessible (Vercel dashboard)
2. Vérifiez les logs Vercel
3. Contactez-moi avec le message d'erreur

### "Timeout"

**Solution** :
1. Attendez 30 secondes
2. Réessayez
3. La BD peut être lente à répondre

---

## 🎯 PROCHAINE ÉTAPE

### EXÉCUTEZ MAINTENANT :

```powershell
.\reset-production-db.ps1
```

**Confirmez avec "O"**

**Attendez le résultat**

**Testez le site !**

---

## 📞 Après Exécution

**Dites-moi** :
- ✅ "Le script a fonctionné !"
- ✅ "Les prix sont corrects sur le site"
- ❌ "J'ai une erreur : [message]"

---

**Déployé** : 16 Décembre 2025  
**Route API** : `/api/admin/reset-db`  
**Token** : diwaan-admin-2024-secure-token-789xyz
