# 🎯 Configuration MongoDB Atlas → Vercel

## ✅ Votre URL MongoDB Atlas

**URL complète à utiliser dans Vercel** :
```
mongodb+srv://admin:Astelwane123@diwaan.wsogaea.mongodb.net/diwaan?retryWrites=true&w=majority&appName=diwaan
```

---

## 📋 Étapes de Configuration Vercel

### 1. Aller sur Vercel Dashboard

**URL** : https://vercel.com/dashboard

### 2. Sélectionner votre projet

Cliquer sur **"zillow-clone"**

### 3. Aller dans Settings → Environment Variables

Navigation : `Settings` (onglet) → `Environment Variables` (menu gauche)

### 4. Ajouter la variable DATABASE_URL

Cliquer sur **"Add Variable"** ou **"Add New"**

**Remplir comme suit** :

```
┌─────────────────────────────────────────────────────────────────┐
│ Name:                                                           │
│ DATABASE_URL                                                    │
├─────────────────────────────────────────────────────────────────┤
│ Value:                                                          │
│ mongodb+srv://admin:Astelwane123@diwaan.wsogaea.mongodb.net/    │
│ diwaan?retryWrites=true&w=majority&appName=diwaan              │
├─────────────────────────────────────────────────────────────────┤
│ Environment:                                                    │
│ ✅ Production                                                   │
│ ✅ Preview                                                      │
│ ✅ Development                                                  │
├─────────────────────────────────────────────────────────────────┤
│ ✅ Sensitive (IMPORTANT: Cocher cette case!)                   │
└─────────────────────────────────────────────────────────────────┘

[Save] ← Cliquer
```

### 5. Redéployer l'Application

**Méthode 1 - Via l'interface Vercel** :
1. Onglet **"Deployments"**
2. Trouver le dernier déploiement (en haut)
3. Cliquer sur les **3 points** `...` à droite
4. Cliquer **"Redeploy"**
5. Confirmer "Redeploy"
6. ⏱️ Attendre 1-2 minutes

**Méthode 2 - Via CLI** (si vous avez Vercel CLI installé) :
```bash
vercel --prod
```

### 6. Tester l'Application

**Une fois le redéploiement terminé** :

1. **Aller sur** : https://zillow-clone-five.vercel.app/homes/4

2. **Remplir le formulaire de contact** :
   ```
   Nom       : Test MongoDB Atlas
   Email     : test@example.com
   Téléphone : 777123456
   Message   : Test de connexion à la base de données MongoDB Atlas depuis Vercel
   ```

3. **Cliquer "Contacter l'Agent"**

**Résultat attendu** :
- ✅ Message : "Message envoyé à [Nom Agent] avec succès !"
- ✅ Email reçu sur : mamadouelimane.dia@gmail.com
- ✅ Pas d'erreur dans la console

---

## 🔍 Vérification dans MongoDB Atlas

### Vérifier que les données sont enregistrées :

1. **Retour sur MongoDB Atlas Dashboard**
2. **Menu gauche → "Database"**
3. **Cliquer sur "Browse Collections"** (bouton du cluster)
4. **Sélectionner la base "diwaan"**
5. **Chercher la collection "property_inquiries"**
6. **Vous devriez voir votre message de test !**

**Si la collection n'existe pas encore** :
- C'est normal, elle sera créée automatiquement au premier envoi

**Structure attendue** :
```json
{
  "_id": "...",
  "name": "Test MongoDB Atlas",
  "email": "test@example.com",
  "phone": "777123456",
  "message": "Test de connexion...",
  "propertyId": "4",
  "createdAt": "2025-12-14T..."
}
```

---

## 🐛 Si Ça Ne Fonctionne Pas

### Vérifier les Logs Vercel

**Via l'interface** :
1. Dashboard Vercel → Votre projet
2. Onglet "Functions" ou "Logs"
3. Filtrer par "POST /api/inquiries"

**Chercher** :
- ✅ `"Inquiry created successfully"` → Succès
- ❌ `"Cannot connect"` → Problème de connexion
- ❌ `"MongoServerError"` → Erreur MongoDB
- ❌ `"DATABASE_URL not found"` → Variable mal configurée

### Erreurs Communes

**1. "Connection timeout" ou "ECONNREFUSED"**
→ **Solution** : Vérifier Network Access dans Atlas
   - Database → Network Access
   - Doit avoir `0.0.0.0/0` (Allow from anywhere)

**2. "Authentication failed"**
→ **Solution** : Mot de passe incorrect
   - Vérifier que le mot de passe dans l'URL est exact
   - Pas de caractères spéciaux non encodés

**3. "Database not found"**
→ **Solution** : Nom de base incorrect
   - Vérifier que `/diwaan` est bien dans l'URL
   - Avant le `?`

**4. "Variable not found"**
→ **Solution** : Variable mal nommée dans Vercel
   - Doit être exactement `DATABASE_URL` (sensible à la casse)
   - Pas d'espace avant/après

---

## ✅ Checklist Finale

Avant de tester :
- [ ] URL complète copiée (avec `/diwaan`)
- [ ] Variable `DATABASE_URL` créée dans Vercel
- [ ] Environnements cochés : Production + Preview + Development
- [ ] Case "Sensitive" cochée
- [ ] Variable sauvegardée
- [ ] Application redéployée
- [ ] Redéploiement terminé (statut "Ready")

---

## 🔐 Sécurité Post-Configuration

### Actions Recommandées :

1. **Changer le mot de passe MongoDB** (si cette conversation est publique) :
   - Atlas → Database Access
   - Utilisateur "admin" → Edit User
   - Update Password → Générer nouveau mot de passe
   - Mettre à jour dans Vercel Environment Variables

2. **Restreindre Network Access** (optionnel, pour production) :
   - Actuellement : 0.0.0.0/0 (tout le monde)
   - Production : Whitelist uniquement les IPs Vercel
   - Liste IPs Vercel : https://vercel.com/docs/concepts/edge-network/regions

3. **Utiliser des secrets différents** :
   - Mot de passe différent pour dev vs prod
   - User différent pour dev vs prod (optionnel)

---

## 📊 Test Complet

### Scénario de Test 1 : Formulaire de Contact

1. https://zillow-clone-five.vercel.app/homes/1
2. Remplir formulaire
3. Envoyer
4. Vérifier email mamadouelimane.dia@gmail.com
5. Vérifier MongoDB Atlas collections

### Scénario de Test 2 : API Directe

**Tester l'API avec curl** :
```bash
curl -X POST https://zillow-clone-five.vercel.app/api/inquiries \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test API",
    "email": "api@test.com",
    "phone": "123456789",
    "message": "Test direct API",
    "propertyId": "1"
  }'
```

**Réponse attendue** :
```json
{
  "success": true,
  "inquiry": {
    "name": "Test API",
    "email": "api@test.com",
    ...
  }
}
```

---

## 🎉 Succès !

Si tout fonctionne :
- ✅ MongoDB Atlas connecté à Vercel
- ✅ Formulaires de contact fonctionnels
- ✅ Emails envoyés automatiquement
- ✅ Données sauvegardées dans le cloud

**Prochaines étapes** :
- Configurer d'autres variables (RESEND_API_KEY, JWT_SECRET, etc.)
- Tester toutes les fonctionnalités
- Optimiser les performances
- Configurer un domaine personnalisé

---

## 🆘 Besoin d'Aide ?

Si après avoir suivi ces étapes ça ne fonctionne toujours pas :

**Partager** :
1. Screenshot de la variable dans Vercel (masquer le mot de passe)
2. Screenshot du dernier déploiement (statut)
3. Message d'erreur exact (si visible)
4. Logs Vercel (dernières lignes)

Je pourrai alors diagnostiquer précisément le problème !

---

**Temps estimé total** : 5-10 minutes
**Difficulté** : ⭐⭐☆☆☆

Bonne chance ! 🚀
