# 🚨 Troubleshooting : MongoDB ne se connecte pas depuis Vercel

## Symptômes
- Site Vercel charge ✅
- Formulaire de contact affiche une erreur ❌
- MongoDB Atlas : 0 connexions
- Vercel logs : Erreur MongoDB

---

## Solutions par Ordre de Priorité

### Solution 1 : Vérifier DATABASE_URL dans Vercel

**Étapes** :
1. Vercel Dashboard → Projet "zillow-clone"
2. Settings → Environment Variables
3. **Vérifier DATABASE_URL** :

**DOIT contenir** :
```
mongodb+srv://admin:Astelwane123@diwaan.wsogaea.mongodb.net/diwaan?retryWrites=true&w=majority&appName=diwaan
```

**Points à vérifier** :
- [ ] Le nom est exactement `DATABASE_URL` (sensible à la casse)
- [ ] Commence par `mongodb+srv://` (avec le "s")
- [ ] Contient `/diwaan` avant le `?`
- [ ] Mot de passe correct : `Astelwane123`
- [ ] Environnements cochés : Production + Preview + Development
- [ ] Case "Sensitive" cochée

**Si la variable manque ou est incorrecte** :
1. Supprimer l'ancienne variable
2. Créer une nouvelle avec l'URL correcte
3. Redéployer (Deployments → ... → Redeploy)

---

### Solution 2 : Vérifier Network Access (Atlas)

**MongoDB Atlas** → Network Access

**DOIT avoir** :
```
IP Address: 0.0.0.0/0
Comment: Allow from anywhere
Status: ACTIVE (vert)
```

**Si Non** :
1. Cliquer "Add IP Address"
2. Choisir "ALLOW ACCESS FROM ANYWHERE"
3. Confirmer
4. Attendre 2-3 minutes
5. Retester

---

### Solution 3 : Vérifier Database Access (Atlas)

**MongoDB Atlas** → Database Access

**DOIT avoir un utilisateur** :
```
Username: admin
Auth Method: SCRAM (Password)
Database User Privileges: Read and write to any database
```

**Si le mot de passe a été changé** :
1. Mettre à jour `DATABASE_URL` dans Vercel
2. Redéployer

---

### Solution 4 : Tester l'URL Localement

**Créer un fichier de test** : `test-mongodb-atlas.js`

```javascript
const { MongoClient } = require('mongodb');

const url = "mongodb+srv://admin:Astelwane123@diwaan.wsogaea.mongodb.net/diwaan?retryWrites=true&w=majority&appName=diwaan";

async function test() {
  console.log('🔄 Test de connexion MongoDB Atlas...\n');
  
  try {
    console.log('URL:', url.replace(/:[^:@]+@/, ':****@')); // Masquer mot de passe
    
    const client = await MongoClient.connect(url, {
      serverSelectionTimeoutMS: 5000
    });
    
    console.log('✅ CONNEXION RÉUSSIE !');
    
    const db = client.db('diwaan');
    console.log('✅ Base "diwaan" accessible');
    
    // Test d'écriture
    const testCollection = db.collection('connection_test');
    await testCollection.insertOne({
      test: true,
      timestamp: new Date(),
      source: 'local_test'
    });
    console.log('✅ Test d\'écriture réussi');
    
    await client.close();
    console.log('\n✅ TOUS LES TESTS RÉUSSIS !');
    console.log('→ L\'URL MongoDB fonctionne correctement.');
    console.log('→ Le problème est probablement dans Vercel.');
    
  } catch (error) {
    console.error('❌ ERREUR:', error.message);
    console.error('\n🔍 Diagnostics:');
    
    if (error.message.includes('authentication failed')) {
      console.error('→ Mot de passe incorrect ou utilisateur inexistant');
      console.error('→ Vérifier Database Access dans Atlas');
    } else if (error.message.includes('ENOTFOUND')) {
      console.error('→ Cluster introuvable');
      console.error('→ Vérifier l\'URL du cluster');
    } else if (error.message.includes('timeout')) {
      console.error('→ Network Access bloque la connexion');
      console.error('→ Ajouter 0.0.0.0/0 dans Network Access');
    } else {
      console.error('→ Erreur inconnue, voir le message ci-dessus');
    }
  }
}

test();
```

**Exécuter** :
```bash
# Si mongodb pas installé
npm install mongodb

# Lancer le test
node test-mongodb-atlas.js
```

**Résultats** :
- ✅ Si succès → L'URL est bonne, problème dans Vercel
- ❌ Si échec → Suivre les diagnostics affichés

---

### Solution 5 : Vérifier les Logs Vercel Runtime

**Vercel Dashboard** → Projet → Logs (ou Functions)

**Aller à** : Runtime Logs (pas Build Logs)

**Filtrer** : POST /api/inquiries

**Chercher** :
```
✅ "Inquiry created" → Fonctionne
❌ "Cannot connect" → Problème connexion
❌ "Authentication failed" → Mauvais mot de passe
❌ "ENOTFOUND" → Cluster introuvable
❌ "timeout" → Network Access
```

**Prendre une capture d'écran** des logs d'erreur si besoin.

---

### Solution 6 : Encoder le Mot de Passe

**Si le mot de passe contient des caractères spéciaux**, il faut les encoder.

Votre mot de passe : `Astelwane123`
- Pas de caractères spéciaux → OK

**Mais si vous changez le mot de passe** avec @ # ! etc., encoder :
- @ → %40
- # → %23
- ! → %21

Exemple :
```
Mot de passe : MyP@ss#123
URL : mongodb+srv://admin:MyP%40ss%23123@diwaan.wsogaea.mongodb.net/...
```

---

### Solution 7 : Recréer la Variable

Parfois, Vercel cache les variables incorrectement.

**Procédure** :
1. Vercel → Settings → Environment Variables
2. **Supprimer** DATABASE_URL
3. **Attendre 30 secondes**
4. **Recréer** DATABASE_URL avec l'URL correcte
5. Cocher Sensitive
6. Cocher Production + Preview + Development
7. **Sauvegarder**
8. **Redéployer** (Deployments → ... → Redeploy)
9. **Attendre** fin du déploiement (1-2 min)
10. **Retester** le formulaire

---

## 🔍 Diagnostic Rapide

Répondez à ces questions :

1. **Le site Vercel charge-t-il ?**
   - Oui → Continuer
   - Non → Problème de build (voir erreur build)

2. **La variable DATABASE_URL existe-t-elle dans Vercel ?**
   - Oui → Vérifier qu'elle est correcte
   - Non → L'ajouter

3. **Network Access Atlas : 0.0.0.0/0 autorisé ?**
   - Oui → Continuer
   - Non → L'ajouter

4. **Formulaire de contact : Quel message d'erreur ?**
   - "Une erreur est survenue" → Voir logs Vercel
   - Autre → Partager le message exact

5. **Logs Vercel Runtime : Quelle erreur ?**
   - Cannot connect → Network Access
   - Authentication failed → Mot de passe
   - DATABASE_URL not found → Variable manquante

---

## ✅ Checklist Complète

Avant de m'écrire à nouveau, vérifier :

- [ ] Site Vercel accessible (https://zillow-clone-five.vercel.app)
- [ ] Variable DATABASE_URL existe dans Vercel Settings
- [ ] URL commence par `mongodb+srv://`
- [ ] URL contient `/diwaan` avant le `?`
- [ ] Mot de passe correct dans l'URL
- [ ] Environnements : Production + Preview + Development cochés
- [ ] Variable marquée "Sensitive"
- [ ] MongoDB Atlas → Network Access : 0.0.0.0/0 présent
- [ ] MongoDB Atlas → Database Access : Utilisateur "admin" existe
- [ ] Redéploiement effectué après modification variables
- [ ] Formulaire de contact testé

---

## 🆘 Si Toujours Bloqué

**Partager** :
1. Screenshot de DATABASE_URL dans Vercel (masquer le mot de passe)
2. Screenshot Network Access dans Atlas
3. Screenshot Database Access dans Atlas
4. Message d'erreur exact du formulaire
5. Screenshot Runtime Logs Vercel (dernières 10 lignes)

Je pourrai alors diagnostiquer précisément !

---

## 🎯 URL Correcte (Copier-Coller)

```
mongodb+srv://admin:Astelwane123@diwaan.wsogaea.mongodb.net/diwaan?retryWrites=true&w=majority&appName=diwaan
```

**Points clés** :
- `mongodb+srv://` (avec le "s")
- `/diwaan` avant le `?`
- `retryWrites=true&w=majority`
