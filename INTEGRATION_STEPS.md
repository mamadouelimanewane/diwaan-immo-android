# 🚀 Script d'Intégration du Système de Partenariat

## Résumé

Ce document contient les instructions pour intégrer le système de partenariat au projet Diwaan.

## ✅ Étapes Complétées

1. ✅ Backup du schéma actuel créé (`schema-backup.prisma`)
2. ✅ Documentation complète créée
3. ✅ Schémas Prisma prêts

## 📝 Prochaines Étapes

### Option 1 : Intégration Manuelle (Recommandé)

**Ouvrir les fichiers** :
```
- prisma/schema.prisma (fichier actuel)
- prisma/schema-partnership-flexible.prisma (nouveau système)
```

**Copier-coller** :
1. Ouvrir `schema-partnership-flexible.prisma`
2. Copier TOUT le contenu
3. Ouvrir `schema.prisma`
4. Aller à la fin du fichier (ligne 188)
5. Coller le nouveau contenu
6. Sauvegarder

### Option 2 : Intégration Automatique

**Exécuter dans PowerShell** :
```powershell
cd c:\gravity\zillow-clone

# Ajouter le nouveau schéma à la fin
Get-Content prisma\schema-partnership-flexible.prisma | Add-Content prisma\schema.prisma

# Générer le client Prisma
npx prisma generate

# Push vers MongoDB
npx prisma db push
```

## 🎯 Après l'Intégration

### 1. Générer le Client Prisma

```powershell
npx prisma generate
```

**Résultat attendu** :
```
✔ Generated Prisma Client
```

### 2. Push le Schéma vers MongoDB

```powershell
npx prisma db push
```

**Résultat attendu** :
```
✔ Database schema pushed to MongoDB
17 new collections created
```

### 3. Créer les Données de Test

**Je vais créer un script de seed complet** avec :
- GREEN SYSTEM SA (promoteur)
- MMOK GROUP (agence)
- Projet Sebi Renaissance
- 50 parcelles
- Contrat de partenariat
- Règles de prix
- Configurations marges

## 📊 Collections MongoDB Créées

Après push, vous aurez :

**Collections Existantes** :
- users
- properties
- property_inquiries
- favorites
- transactions
- messages

**Nouvelles Collections** (17) :
- developers
- real_estate_agencies
- commercial_agents
- partnerships
- contract_clauses
- developer_projects
- plot_type_configs
- developer_plots
- pricing_rules
- margin_configs
- commission_structures
- plot_price_revisions
- plot_reservations
- reservation_payments
- developer_sales
- agent_commissions
- price_calculation_history

## ❓ Questions Fréquentes

### Q: Puis-je revenir en arrière ?

**Oui** ! Le backup est dans `schema-backup.prisma`

```powershell
# Restaurer le backup
Copy-Item prisma\schema-backup.prisma prisma\schema.prisma -Force
npx prisma generate
```

### Q: Cela affecte-t-il les données existantes ?

**Non** ! Les nouvelles collections sont indépendantes.
- Vos users, properties, etc. restent intacts
- Les nouvelles collections sont vides au départ

### Q: Combien de temps prend l'intégration ?

- Copier-coller le schéma : **2 minutes**
- `npx prisma generate` : **30 secondes**
- `npx prisma db push` : **10 secondes**
- **Total : ~3 minutes**

## 🔧 Dépannage

### Erreur "Duplicate model name"

**Cause** : Un modèle existe déjà avec le même nom

**Solution** : Vérifier les noms de modèles dans le nouveau schéma

### Erreur lors du push

**Solution** :
```powershell
npx prisma db push --force-reset
```

⚠️ ATTENTION : Cela supprime TOUTES les données !

---

## ✅ Checklist d'Intégration

- [ ] Backup créé
- [ ] Nouveau schéma copié dans schema.prisma
- [ ] `npx prisma generate` réussi
- [ ] `npx prisma db push` réussi
- [ ] Collections visibles dans MongoDB Atlas
- [ ] Prêt pour le seed !

---

**Prêt à continuer ? Dites "ok" et je crée le script de seed complet !** 🚀
