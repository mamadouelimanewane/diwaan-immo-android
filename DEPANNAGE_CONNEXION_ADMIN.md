# 🔧 GUIDE DÉPANNAGE - CONNEXION ADMIN

**Problème :** Impossible d'accéder au backoffice après connexion

---

## ✅ SOLUTION APPLIQUÉE

**Correction déployée :** 15 Décembre 2025

### Changement effectué :
- ✅ Ajout `SameSite=Lax` au cookie
- ✅ Utilisation `window.location.href` au lieu de `router.push()`
- ✅ Force rechargement complet de la page

---

## 🔄 COMMENT TESTER

### 1. Videz votre cache navigateur
```
Chrome/Edge : Ctrl + Shift + Suppr
→ Cochez "Cookies et autres données"
→ Cliquez "Effacer les données"
```

### 2. Fermez tous les onglets
- Fermez tous les onglets Diwaan
- Fermez le navigateur complètement
- Réouvrez

### 3. Testez la connexion

**URL :** https://zillow-clone-five.vercel.app/admin

**Identifiants :**
```
Email:    admin@diwaan.sn
Password: admin123
```

**Processus normal :**
1. Ouvrez l'URL
2. Vous êtes redirigé vers `/admin/login`
3. Saisissez email + mot de passe
4. Cliquez "Se connecter"
5. ✅ **VOUS DEVEZ ARRIVER SUR LE DASHBOARD**

---

## 🐛 SI PROBLÈME PERSISTE

### Test en Navigation Privée

**Chrome :** `Ctrl + Shift + N`  
**Firefox :** `Ctrl + Shift + P`  
**Edge :** `Ctrl + Shift + N`

Ensuite :
1. Allez sur https://zillow-clone-five.vercel.app/admin
2. Connectez-vous
3. **Si ça fonctionne** → Problème de cache/cookies
4. **Si ça ne fonctionne pas** → Problème serveur

### Vérifier les Cookies (Console Développeur)

**Ouvrir Console :** `F12`

**Onglet "Application" (Chrome) ou "Stockage" (Firefox)**

**Vérifier :**
```
Cookies → https://zillow-clone-five.vercel.app
→ Devrait contenir: admin_token = [long token JWT]
```

**Si absent :** Le cookie ne se définit pas

**Si présent :** Le middleware ne le lit pas

### Test Manuel API

**Console navigateur (F12) :**
```javascript
fetch('/api/admin/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'admin@diwaan.sn',
    password: 'admin123'
  })
})
.then(r => r.json())
.then(console.log)
```

**Résultat attendu :**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "admin-demo",
    "email": "admin@diwaan.sn",
    "name": "Admin Diwaan",
    "role": "ADMIN"
  }
}
```

**Si erreur :** API ne répond pas correctement

---

## 🔍 DIAGNOSTICS AVANCÉS

### Problème 1 : "ERR_TOO_MANY_REDIRECTS"

**Cause :** Boucle de redirection

**Solution :**
1. Videz TOUS les cookies de `zillow-clone-five.vercel.app`
2. Rechargez la page

### Problème 2 : Page blanche

**Cause :** Erreur JavaScript

**Solution :**
1. Ouvrez Console (F12)
2. Vérifiez les erreurs rouges
3. Notez l'erreur et contactez support

### Problème 3 : "Service temporairement indisponible"

**Cause :** Connexion MongoDB échouée

**Solution :**
1. Vérifiez status MongoDB Atlas
2. Attendez 2-3 minutes
3. Réessayez

---

## 📞 SUPPORT

**Si rien ne fonctionne :**

Email : tech@diwaan.sn  
Sujet : "Problème connexion admin backoffice"

**Incluez :**
- Navigateur utilisé (Chrome, Firefox, etc.)
- Capture d'écran de l'erreur
- Contenu de la Console (F12)

---

## ✅ CHECKLIST RAPIDE

Avant decontacter le support, vérifiez :

- [ ] Cache navigateur vidé
- [ ] Tous onglets fermés
- [ ] Navigateur redémarré
- [ ] Testé en navigation privée
- [ ] Identifiants exacts : `admin@diwaan.sn` / `admin123`
- [ ] Vérification console (F12) pour erreurs

---

**Dernière mise à jour :** 15 Décembre 2025  
**Version correction :** 1.0.1
