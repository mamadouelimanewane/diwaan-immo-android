# 🔐 IDENTIFIANTS DE CONNEXION DIWAAN

## 🌐 URL DE CONNEXION

```
Production:  https://zillow-clone-five.vercel.app/admin
             (redirige vers /login)

Login Page:  https://zillow-clone-five.vercel.app/login
```

---

## ✅ IDENTIFIANTS FONCTIONNELS (MOCK)

### 🎯 TOUT IDENTIFIANT FONCTIONNE !

Le système utilise actuellement un **mock d'authentification**.

**N'importe quel email/mot de passe fonctionnera !**

### Exemples d'Identifiants

#### Option 1 : Admin Principal
```
Email:     admin@diwaan.sn
Password:  admin123
```

#### Option 2 : Test Simple
```
Email:     test@diwaan.sn
Password:  123456
```

#### Option 3 : Votre Email
```
Email:     n'importe_quel_email@exemple.com
Password:  n'importe_quel_mot_de_passe
```

---

## 🚀 COMMENT SE CONNECTER

### Étapes

1. **Aller sur** :
   ```
   https://zillow-clone-five.vercel.app/admin
   ```

2. **Entrer n'importe quel email** :
   ```
   admin@diwaan.sn
   ```

3. **Entrer n'importe quel mot de passe** :
   ```
   admin123
   ```

4. **Cliquer "Se connecter"** ✅

5. **Redirection automatique** vers :
   ```
   /dashboard (puis vers /admin)
   ```

---

## 💡 POURQUOI ÇA FONCTIONNE AVEC N'IMPORTE QUELLE CREDENTIAL ?

### Code Actuel (Mock)

Le fichier `/api/auth/login/route.ts` contient :

```typescript
export async function POST(request: NextRequest) {
    // TEMPORARY MOCK FOR DEPLOYMENT
    return NextResponse.json({
        success: true,
        user: { 
            id: 'mock-user', 
            name: 'Mamadou', 
            email: 'test@diwaan.sn', 
            role: 'AGENT' 
        },
        token: 'mock-jwt-token',
        message: 'Connexion réussie (Mock)',
    });
}
```

**Résultat** : Toute tentative de connexion réussit !

---

## 🔐 IDENTIFIANTS RECOMMANDÉS POUR UTILISATION

### Pour Faciliter les Tests

Utilisez ces identifiants "standards" :

#### Super Administrateur
```
Email:     admin@diwaan.sn
Password:  Admin@2025!
Rôle:      ADMIN
```

#### Promoteur (GREEN SYSTEM)
```
Email:     contact@greensystem.sn
Password:  GreenSystem@2025!
Rôle:      DEVELOPER
```

#### Agence (MMOK GROUP)
```
Email:     contact@mmokgroup.sn
Password:  MmokGroup@2025!
Rôle:      AGENCY
```

#### Agent Commercial
```
Email:     agent@mmokgroup.sn
Password:  Agent@2025!
Rôle:      AGENT
```

**Note** : Ces identifiants ne sont pas encore vérifiés car le système est en mock.

---

## 🛠️ POUR ACTIVER LA VRAIE AUTHENTIFICATION

### Étape 1 : Décommenter le Code Réel

Dans `/api/auth/login/route.ts`, **remplacer** le mock par le code commenté :

```typescript
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Validation
        const validation = loginSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json(
                { error: 'Validation failed' },
                { status: 400 }
            );
        }

        // Authentifier
        const { user, token } = await authenticateUser(
            validation.data.email,
            validation.data.password
        );

        return NextResponse.json({
            success: true,
            user,
            token,
        });
    } catch (error: any) {
        return NextResponse.json(
            { error: 'Identifiants invalides' },
            { status: 401 }
        );
    }
}
```

### Étape 2 : Créer des Utilisateurs

Dans la base MongoDB, créer des documents dans la collection `users` :

```javascript
{
  "email": "admin@diwaan.sn",
  "password": "$2a$10$...", // Hash bcrypt
  "name": "Administrateur",
  "role": "ADMIN",
  "createdAt": ISODate("2025-01-01T00:00:00Z")
}
```

---

## 📱 ACCÈS DEPUIS MOBILE

### Même URL
```
https://zillow-clone-five.vercel.app/login
```

### Même Identifiants
```
Email:     admin@diwaan.sn
Password:  admin123
```

---

## 🗄️ ACCÈS SERVICES EXTERNES

### MongoDB Atlas
```
URL:       https://cloud.mongodb.com/
Database:  diwaan
User:      admin
Password:  Astelwane123
```

### Vercel Dashboard
```
URL:       https://vercel.com/dashboard
Projet:    zillow-clone
```

### Resend Email
```
URL:       https://resend.com/dashboard
API Key:   re_DqXU3uWu_FATJMZMvQ7RWDkJgfaTPBqUy
```

---

## ✅ TEST RAPIDE

### Pour Tester MAINTENANT

1. **Ouvrir navigateur**
2. **Aller sur** : https://zillow-clone-five.vercel.app/admin
3. **Entrer** :
   ```
   Email:    admin@diwaan.sn
   Password: admin123
   ```
4. **Cliquer "Se connecter"**
5. **✅ Vous êtes connecté !**

---

## 🚨 SÉCURITÉ

### ⚠️ AVANT PRODUCTION

1. **Décommenter le vrai code d'authentification**
2. **Créer de vrais utilisateurs dans MongoDB**
3. **Hasher les mots de passe avec bcrypt**
4. **Changer tous les credentials**
5. **Activer le rate limiting**

### État Actuel
```
✅ Mock actif (accepte tout)
❌ Authentification réelle (désactivée)
⚠️  À sécuriser avant production
```

---

## 📊 APRÈS CONNEXION

### Redirection
```
Login → /dashboard → /admin
```

### Accès Disponibles
```
✅ Dashboard Admin
✅ Système de Partenariat
✅ Gestion Promoteurs
✅ Gestion Agences
✅ Réservations
✅ Toutes les fonctionnalités
```

---

## 🎯 RÉSUMÉ SIMPLE

### Pour Se Connecter Maintenant

```
URL:       https://zillow-clone-five.vercel.app/login
Email:     admin@diwaan.sn
Password:  admin123
ou
N'IMPORTE QUEL email/password
```

### Pourquoi ?
```
Le système est en mode MOCK
Toute connexion réussit
Redirection automatique vers /admin
```

---

## 📞 SUPPORT

### Contact
```
Email:   mamadouelimane.dia@gmail.com
Projet:  Diwaan - Système de Partenariat
```

### Documentation
```
IDENTIFIANTS_ACCES.md (ce fichier)
DEPLOYMENT_STATUS.md
ACCES_BACKOFFICE.md
```

---

## 🎊 IDENTIFIANTS FINAUX

### À Utiliser Maintenant (Mock)
```
Email:     admin@diwaan.sn
Password:  admin123
OU n'importe quels identifiants
```

### À Créer (Production)
```
Email:     admin@diwaan.sn
Password:  [Mot de passe sécurisé hashé]
Stocké:    MongoDB collection 'users'
```

---

**✅ POUR SE CONNECTER : Utilisez admin@diwaan.sn / admin123**

**OU N'IMPORTE QUEL EMAIL/PASSWORD (mode mock actif)**

**📧 Contact : mamadouelimane.dia@gmail.com**

---

**CONNEXION IMMÉDIATE POSSIBLE !** 🚀✨
