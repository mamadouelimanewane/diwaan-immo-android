# 🚀 Guide d'Implémentation - Système de Partenariat

## 📋 Fichiers Créés

1. **`PARTNERSHIP_SYSTEM.md`** - Documentation complète du système
2. **`prisma/schema-partnership.prisma`** - Schéma Prisma avec tous les modèles
3. **`prisma/seed-partnership.ts`** - Script pour créer GREEN SYSTEM & MMOK GROUP

---

## ⚡ Installation Rapide

### Étape 1 : Intégrer le Schéma

**Copier le contenu de `schema-partnership.prisma` à la fin de `prisma/schema.prisma`** :

```bash
# Ouvrir les deux fichiers
code prisma/schema.prisma
code prisma/schema-partnership.prisma

# Copier tout le contenu de schema-partnership.prisma
# Le coller à la fin de schema.prisma
```

### Étape 2 : Générer le Client Prisma

```powershell
npx prisma generate
```

### Étape 3 : Push le Schéma vers MongoDB

```powershell
npx prisma db push
```

**Résultat attendu** :
```
✔ Generated Prisma Client
✔ Database schema pushed to MongoDB
```

### Étape 4 : Seed les Données

```powershell
node prisma/seed-partnership.ts
```

**Résultat** :
```
✅ 1 Promoteur (GREEN SYSTEM)
✅ 1 Agence (MMOK GROUP)
✅ 3 Agents commerciaux
✅ 1 Projet (Sebi Renaissance)
✅ 1 Contrat de partenariat
✅ 6 Clauses contractuelles
✅ 50 Parcelles (30 Type A + 20 Type B)
```

---

## 📊 Données Créées

### GREEN SYSTEM SA (Promoteur)
- **RCCM** : SN DKR 2010 B10309
- **NINEA** : 00424505
- **Gérant** : Abdoul Aziz Sylla
- **Adresse** : MBAO Extension Lot 1604

### MMOK GROUP (Agence)
- **RCCM** : SN DKR 2022 A 25935
- **NINEA** : 009587546 1Y1
- **Directrice** : Ghislaine D Nicole SAMB
- **Adresse** : Ouest Foire Lot N°28, 6ème Etage

### Projet Sebi Renaissance
- **Localisation** : Diamniadio, Pôle Urbain
- **Total parcelles** : 50
  - 30 Type A (50,000 FCFA/m²)
  - 20 Type B (66,000 FCFA/m²)
- **Surfaces** : 150-400 m²

### Contrat de Partenariat
- **Durée** : 30 mois (12/02/2025 - 06/02/2028)
- **Type** : Mandat non exclusif
- **Rabais comptant** : 5%
- **Acompte minimum** : 50%
- **Révision prix** : Tous les 3 mois

---

## 🎯 Fonctionnalités à Implémenter

### Phase 1 : Interface Promoteur

#### Dashboard
- [ ] Vue d'ensemble projets
- [ ] Statistiques parcelles (disponibles/réservées/vendues)
- [ ] CA total et par agence
- [ ] Graphiques performance

#### Gestion Parcelles
- [ ] Liste toutes parcelles
- [ ] Filtres (type, statut, agence)
- [ ] Attribution à agence
- [ ] Retrait de parcelle
- [ ] Historique prix

#### Gestion Partenariats
- [ ] Liste partenariats
- [ ] Créer nouveau partenariat
- [ ] Modifier termes
- [ ] Suspendre/Réactiver
- [ ] Générer PDF contrat

#### Suivi Ventes
- [ ] Liste réservations
- [ ] Validation acomptes
- [ ] Suivi paiements
- [ ] Alertes retards
- [ ] Annulations

### Phase 2 : Interface Agence

#### Dashboard
- [ ] Parcelles disponibles
- [ ] Réservations en cours
- [ ] CA du mois
- [ ] Performance agents

#### Gestion Clients
- [ ] CRM clients
- [ ] Historique interactions
- [ ] Documents clients
- [ ] Suivi relances

#### Réservation
- [ ] Sélection parcelle
- [ ] Saisie infos client
- [ ] Calcul automatique prix
- [ ] Application marge
- [ ] Upload bordereaux
- [ ] Génération contrat

#### Suivi Commercial
- [ ] Pipeline ventes
- [ ] Objectifs vs Réalisé
- [ ] Commissions agents
- [ ] Reporting mensuel

### Phase 3 : Fonctionnalités Avancées

#### Notifications Automatiques
- [ ] Email promoteur (nouvelle réservation)
- [ ] Email agence (validation, retrait parcelle)
- [ ] Email client (confirmation, rappels)
- [ ] SMS alertes paiement

#### Documents
- [ ] Génération PDF contrat
- [ ] Modèles personnalisables
- [ ] Signatures électroniques
- [ ] Archivage automatique

#### Journal Partagé
- [ ] Intégration Google Sheets
- [ ] Mise à jour temps réel
- [ ] Synchronisation bi-directionnelle
- [ ] Historique modifications

#### Échéanciers
- [ ] Création automatique
- [ ] Calcul échéances
- [ ] Rappels automatiques
- [ ] Gestion retards

---

## 🛠️ API Routes à Créer

### Promoteurs
```
GET    /api/developers              # Liste promoteurs
POST   /api/developers              # Créer promoteur
GET    /api/developers/[id]         # Détails promoteur
PUT    /api/developers/[id]         # Modifier promoteur
DELETE /api/developers/[id]         # Supprimer promoteur
```

### Agences
```
GET    /api/agencies                # Liste agences
POST   /api/agencies                # Créer agence
GET    /api/agencies/[id]           # Détails agence
PUT    /api/agencies/[id]           # Modifier agence
GET    /api/agencies/[id]/stats     # Statistiques agence
```

### Partenariats
```
GET    /api/partnerships            # Liste partenariats
POST   /api/partnerships            # Créer partenariat
GET    /api/partnerships/[id]       # Détails partenariat
PUT    /api/partnerships/[id]       # Modifier partenariat
POST   /api/partnerships/[id]/suspend # Suspendre
POST   /api/partnerships/[id]/terminate # Résilier
GET    /api/partnerships/[id]/pdf   # Générer PDF contrat
```

### Projets
```
GET    /api/projects                # Liste projets
POST   /api/projects                # Créer projet
GET    /api/projects/[id]           # Détails projet
PUT    /api/projects/[id]           # Modifier projet
GET    /api/projects/[id]/plots     # Parcelles du projet
```

### Parcelles
```
GET    /api/plots                   # Liste parcelles
POST   /api/plots                   # Créer parcelle
GET    /api/plots/[id]              # Détails parcelle
PUT    /api/plots/[id]              # Modifier parcelle
POST   /api/plots/[id]/assign       # Attribuer à agence
POST   /api/plots/[id]/withdraw     # Retirer parcelle
POST   /api/plots/[id]/price-revision # Réviser prix
GET    /api/plots/[id]/history      # Historique parcelle
```

### Réservations
```
GET    /api/reservations            # Liste réservations
POST   /api/reservations            # Créer réservation
GET    /api/reservations/[id]       # Détails réservation
PUT    /api/reservations/[id]       # Modifier réservation
POST   /api/reservations/[id]/validate # Valider (acompte 50%)
POST   /api/reservations/[id]/complete # Finaliser (solde)
POST   /api/reservations/[id]/cancel # Annuler
POST   /api/reservations/[id]/notify # Notifier promoteur
```

### Paiements
```
GET    /api/payments                # Liste paiements
POST   /api/payments                # Enregistrer paiement
GET    /api/payments/[id]           # Détails paiement
PUT    /api/payments/[id]           # Modifier paiement
GET    /api/reservations/[id]/payments # Paiements d'une réservation
```

### Ventes
```
GET    /api/sales                   # Liste ventes
POST   /api/sales                   # Créer vente (depuis réservation)
GET    /api/sales/[id]              # Détails vente
GET    /api/sales/stats             # Statistiques ventes
```

---

## 💡 Exemples d'Usage

### Créer une Réservation

```typescript
// POST /api/reservations
const reservation = await fetch('/api/reservations', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    plotId: '...',
    agencyId: '...',
    agentId: '...',
    
    // Client
    clientFirstName: 'Mamadou',
    clientLastName: 'Kane',
    clientEmail: 'mamadou.kane@email.com',
    clientPhone: '+221 77 123 45 67',
    clientAddress: 'Dakar, Plateau',
    
    // Prix (calculés automatiquement)
    cessionPricePerSqm: 50000,
    agencyMarginPerSqm: 10000,
    surfaceArea: 250,
    
    // Paiement
    paymentType: 'CASH', // ou 'INSTALLMENT'
    downPayment: 7500000, // 50% de 15M (250m² × 60k)
  })
});
```

### Calculer Prix Final

```typescript
// Fonction utilitaire
function calculatePrices(plot, agencyMarginPerSqm, paymentType) {
  const cessionPrice = plot.currentPricePerSqm * plot.surfaceArea;
  const agencyMargin = agencyMarginPerSqm * plot.surfaceArea;
  let finalPrice = cessionPrice + agencyMargin;
  
  let discount = 0;
  if (paymentType === 'CASH') {
    // Rabais 5% sur prix cession
    discount = cessionPrice * 0.05;
    finalPrice = (cessionPrice - discount) + agencyMargin;
  }
  
  return {
    cessionPrice,
    agencyMargin,
    finalPrice,
    discount,
    cashDiscountRate: paymentType === 'CASH' ? 5 : 0,
  };
}

// Exemple: Parcelle 250m² Type A
const plot = { currentPricePerSqm: 50000, surfaceArea: 250 };
const agencyMarginPerSqm = 10000;

// Paiement échelonné
const installment = calculatePrices(plot, agencyMarginPerSqm, 'INSTALLMENT');
// cessionPrice: 12,500,000
// agencyMargin: 2,500,000
// finalPrice: 15,000,000

// Paiement comptant (rabais 5%)
const cash = calculatePrices(plot, agencyMarginPerSqm, 'CASH');
// cessionPrice: 12,500,000
// discount: 625,000 (5%)
// agencyMargin: 2,500,000
// finalPrice: 14,375,000 (économie de 625,000)
```

---

## 📝 Templates de Contrats

### Contrat de Réservation (Exemple)

```
CONTRAT DE RÉSERVATION
──────────────────────

Entre :
MMOK GROUP, Agence Immobilière
RCCM: SN DKR 2022 A 25935

Et :
M./Mme [Nom Client]
CIN: [Numéro]
Tél: [Téléphone]

Objet: Réservation Parcelle [Numéro]
────────────────────────────────────

Projet: Sebi Renaissance
Type: [Type A/B]
Surface: [XXX] m²
Bloc: [Îlot X]

Prix:
- Prix au m²: [XXX,XXX] FCFA
- Surface: [XXX] m²
- Prix total: [XX,XXX,XXX] FCFA
- Rabais comptant: [XXX,XXX] FCFA
- PRIX FINAL: [XX,XXX,XXX] FCFA

Modalités de paiement:
- Acompte (50%): [XX,XXX,XXX] FCFA
- Solde: [XX,XXX,XXX] FCFA
- Échéancier: [Si applicable]

Fait à Dakar, le [Date]

Signatures:
Client: ___________
Agence: ___________
```

---

## 🎯 Prochaines Étapes

1. **Intégrer le schéma Prisma**
   ```powershell
   # Copier schema-partnership.prisma vers schema.prisma
   npx prisma generate
   npx prisma db push
   ```

2. **Lancer le seed**
   ```powershell
   node prisma/seed-partnership.ts
   ```

3. **Créer les pages** :
   - `/admin/developers` - Gestion promoteurs
   - `/admin/agencies` - Gestion agences
   - `/admin/partnerships` - Gestion partenariats
   - `/admin/projects` - Gestion projets
   - `/admin/plots` - Gestion parcelles
   - `/agency/dashboard` - Dashboard agence
   - `/agency/reservations` - Réservations

4. **Créer les API routes** (voir liste ci-dessus)

5. **Implémenter les notifications** (Email + SMS)

6. **Générer les PDF** (Contrats, Documents)

---

**Le système est prêt à être implémenté !** 🚀

Voulez-vous que je crée :
- Les API routes ?
- Les pages d'interface ?
- Les composants React ?
- Les utilitaires de calcul ?
