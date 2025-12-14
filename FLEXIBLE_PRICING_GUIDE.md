# 🎛️ Système de Paramétrage Flexible - Guide Complet

## 📋 Vue d'Ensemble

Système ultra-flexible permettant de personnaliser :
- ✅ **Types de parcelles** par projet
- ✅ **Prix de cession** par agence/partenariat/type
- ✅ **Marges commerciales** par agent/terrain
- ✅ **Commissions** agents avec paliers

---

## 🏗️ Architecture

### 1. Types de Parcelles Personnalisés

Chaque projet peut définir ses propres types de parcelles.

#### Exemples de Types

**Projet Sebi Renaissance** :
- `TYPE_A` - Terrain Simple (50,000 FCFA/m²)
- `TYPE_B` - Terrain Viabilisé (66,000 FCFA/m²)
- `TYPE_C` - Terrain Premium avec Clôture (85,000 FCFA/m²)

**Projet Lac Rose Résidence** :
- `VILLA_250` - Lot villa 250m² (75,000 FCFA/m²)
- `VILLA_350` - Lot villa 350m² (70,000 FCFA/m²)
- `DUPLEX` - Lot duplex 180m² (90,000 FCFA/m²)
- `COMMERCIAL` - Local commercial (120,000 FCFA/m²)

---

## 💰 Système de Prix Multi-Niveaux

### Niveau 1 : Prix de Base (PlotTypeConfig)

Chaque type de parcelle a un prix de référence.

```typescript
// Configuration Type A
{
  code: "TYPE_A",
  name: "Terrain Simple",
  basePrice: 50000, // FCFA/m²
  features: ["Eau", "Électricité"],
  defaultSurfaceMin: 150,
  defaultSurfaceMax: 500
}
```

### Niveau 2 : Règles de Prix (PricingRule)

Prix spécifiques par:
- Agence
- Partenariat
- Type de terrain
- Période
- Surface

**Exemple 1 : Prix différent pour MMOK GROUP**

```typescript
// MMOK GROUP obtient des prix préférentiels
{
  name: "Prix Préférentiel MMOK - Type A",
  agencyId: "mmok-id",
  plotTypeConfigId: "type-a-id",
  cessionPricePerSqm: 48000, // Au lieu de 50,000
  cashDiscountRate: 5,       // Rabais comptant
  validFrom: "2025-01-01",
  priority: 10
}
```

**Exemple 2 : Prix dégressif selon surface**

```typescript
// Grandes parcelles = prix réduit
{
  name: "Dégressif Grandes Surfaces",
  plotTypeConfigId: "type-a-id",
  minSurface: 400,           // Si >= 400m²
  cessionPricePerSqm: 47000, // Prix réduit
  priority: 5
}
```

**Exemple 3 : Prix de lancement temporaire**

```typescript
// Phase de lancement 2 mois
{
  name: "Prix de Lancement Type B",
  plotTypeConfigId: "type-b-id",
  cessionPricePerSqm: 63000, // Au lieu de 66,000
  validFrom: "2025-12-02",
  validUntil: "2026-02-02",  // 2 mois
  priority: 15
}
```

**Exemple 4 : Remise sur volume**

```typescript
// Remise si agence vend > 5 parcelles
{
  name: "Remise Volume 5+ parcelles",
  agencyId: "agence-id",
  volumeDiscountRate: 3,     // -3% supplémentaire
  volumeThreshold: 5,        // Sur 5ème vente et +
  priority: 8
}
```

---

## 📈 Configuration des Marges

### Par Agence (Défaut)

```typescript
// Marge standard MMOK GROUP
{
  name: "Marge Standard MMOK",
  agencyId: "mmok-id",
  marginType: "PER_SQM",
  marginPerSqm: 10000,  // 10,000 FCFA/m² sur tout
  validFrom: "2025-12-02"
}
```

### Par Agent

```typescript
// Agent senior = marge plus élevée autorisée
{
  name: "Marge Agent Senior - Fatou Diop",
  agentId: "fatou-diop-id",
  marginType: "PER_SQM",
  marginPerSqm: 12000,  // Peut prendre 12k au lieu de 10k
  validFrom: "2025-12-02"
}

// Agent junior = marge fixe
{
  name: "Marge Agent Junior",
  agentId: "junior-id",
  marginType: "PER_SQM",
  marginPerSqm: 8000,   // Maxium 8k
  validFrom: "2025-12-02"
}
```

### Par Type de Terrain

```typescript
// Marges différentes selon le type
{
  name: "Marge Type A",
  agencyId: "mmok-id",
  plotTypeConfigId: "type-a-id",
  marginPerSqm: 8000
}

{
  name: "Marge Type B Premium",
  agencyId: "mmok-id",
  plotTypeConfigId: "type-b-id",
  marginPerSqm: 12000  // Plus de marge sur type B
}
```

### Marges à Paliers (Tiered)

```typescript
// Marge augmente avec la surface
{
  name: "Marge Progressive Surface",
  agencyId: "mmok-id",
  marginType: "TIERED",
  tieredMargin: [
    { min: 0,   max: 200, marginPerSqm: 8000 },
    { min: 200, max: 350, marginPerSqm: 10000 },
    { min: 350, max: 999, marginPerSqm: 12000 }
  ]
}
```

### Avec Bonus Performance

```typescript
// Bonus si > 10 ventes/mois
{
  name: "Marge avec Bonus Performance",
  agentId: "top-agent-id",
  marginPerSqm: 10000,
  performanceBonus: 2000,      // +2000 par m² si objectif atteint
  performanceThreshold: 10,    // 10 ventes/mois minimum
}
```

---

## 🎯 Commissions Agents

### Commission Fixe

```typescript
// 100,000 FCFA par vente
{
  name: "Commission Fixe Standard",
  agencyId: "mmok-id",
  commissionType: "FIXED",
  fixedAmount: 100000,
  baseCalculation: "TOTAL_SALE"
}
```

### Commission Pourcentage

```typescript
// 2% de la marge agence
{
  name: "Commission 2% Marge",
  agencyId: "mmok-id",
  commissionType: "PERCENTAGE",
  rate: 2,
  baseCalculation: "AGENCY_MARGIN"
}
```

### Commission Par m²

```typescript
// 500 FCFA par m² vendu
{
  name: "Commission au m²",
  agencyId: "mmok-id",
  commissionType: "PER_SQM",
  amountPerSqm: 500
}
```

### Commission à Paliers

```typescript
// Commission croissante selon montant vendu
{
  name: "Commission Progressive",
  agencyId: "mmok-id",
  commissionType: "TIERED",
  baseCalculation: "TOTAL_SALE",
  tiers: [
    { min: 0,        max: 10000000,  rate: 1.5 },
    { min: 10000000, max: 20000000,  rate: 2.0 },
    { min: 20000000, max: 999999999, rate: 2.5 }
  ]
}
```

---

## 🧮 Algorithme de Calcul Automatique

### Étapes du Calcul

```typescript
function calculateReservationPrice(plot, agency, agent, paymentType) {
  // 1. Trouver la règle de prix applicable
  const pricingRule = findBestPricingRule({
    plotTypeConfigId: plot.plotTypeConfigId,
    agencyId: agency.id,
    partnershipId: agency.activePartnershipId,
    surfaceArea: plot.surfaceArea,
    currentDate: new Date()
  });
  
  // 2. Calculer prix de cession
  let cessionPricePerSqm = pricingRule.cessionPricePerSqm;
  let cessionPrice = cessionPricePerSqm * plot.surfaceArea;
  
  // 3. Appliquer rabais comptant si applicable
  let discount = 0;
  if (paymentType === 'CASH' && pricingRule.cashDiscountRate) {
    discount = cessionPrice * (pricingRule.cashDiscountRate / 100);
    cessionPrice -= discount;
  }
  
  // 4. Trouver configuration marge agent/agence
  const marginConfig = findBestMarginConfig({
    agentId: agent.id,
    agencyId: agency.id,
    plotTypeConfigId: plot.plotTypeConfigId,
    surfaceArea: plot.surfaceArea
  });
  
  // 5. Calculer marge agence
  let agencyMarginPerSqm = calculateMargin(marginConfig, {
    surfaceArea: plot.surfaceArea,
    cessionPrice: cessionPrice,
    agentSalesThisMonth: agent.currentMonthSales
  });
  
  let agencyMargin = agencyMarginPerSqm * plot.surfaceArea;
  
  // 6. Calculer prix final client
  const finalPrice = cessionPrice + agencyMargin;
  
  // 7. Calculer commission agent
  const commissionStructure = findAgentCommission(agent.id);
  const commission = calculateCommission(commissionStructure, {
    totalSale: finalPrice,
    agencyMargin: agencyMargin,
    cessionPrice: cessionPrice,
    surfaceArea: plot.surfaceArea
  });
  
  return {
    // Prix
    cessionPricePerSqm,
    cessionPrice,
    agencyMarginPerSqm,
    agencyMargin,
    finalPrice,
    
    // Rabais
    discount,
    cashDiscountRate: pricingRule.cashDiscountRate,
    
    // Commission
    agentCommission: commission,
    
    // Références règles appliquées
    appliedPricingRuleId: pricingRule.id,
    appliedMarginConfigId: marginConfig.id,
    
    // Détails complets
    calculationDetails: {
      pricingRule,
      marginConfig,
      commissionStructure,
      calculatedAt: new Date()
    }
  };
}
```

---

## 📊 Exemples de Calculs Complets

### Exemple 1 : Agent Standard, Parcelle 250m² Type A

**Données** :
- Surface : 250m²
- Type : A (Terre simple)
- Agent : Junior (8,000 FCFA/m² marge max)
- Paiement : Échelonné

**Règles applicables** :
```typescript
PricingRule: {
  cessionPricePerSqm: 50,000,
  cashDiscountRate: 5
}

MarginConfig: {
  marginPerSqm: 8,000
}

CommissionStructure: {
  type: "PERCENTAGE",
  rate: 2,
  base: "AGENCY_MARGIN"
}
```

**Calcul** :
```
Cession = 50,000 × 250 = 12,500,000 FCFA
Marge   = 8,000 × 250  = 2,000,000 FCFA
Final   = 14,500,000 FCFA

Commission agent = 2% × 2,000,000 = 40,000 FCFA
```

---

### Exemple 2 : Agent Senior, Parcelle 400m² Type B, Comptant

**Données** :
- Surface : 400m²
- Type : B (Viabilisé)
- Agent : Senior (12,000 FCFA/m² marge)
- Paiement : Comptant

**Règles** :
```typescript
PricingRule: {
  cessionPricePerSqm: 66,000,
  cashDiscountRate: 5,
  minSurface: 400,
  discount: -1000 // Prix réduit grandes surfaces
}

MarginConfig: {
  marginPerSqm: 12,000,
  performanceBonus: 2,000, // Agent a > 10 ventes ce mois
  performanceThreshold: 10
}

CommissionStructure: {
  type: "TIERED",
  tiers: [
    { min: 0, max: 20000000, rate: 2 },
    { min: 20000000, max: 999999999, rate: 2.5 }
  ]
}
```

**Calcul** :
```
Cession de base = 66,000 × 400 = 26,400,000
Réduction grandes surfaces = -1,000 × 400 = -400,000
Cession ajustée = 26,000,000

Rabais comptant 5% = -1,300,000
Cession finale = 24,700,000 FCFA

Marge de base = 12,000 × 400 = 4,800,000
Bonus performance = 2,000 × 400 = 800,000
Marge totale = 5,600,000 FCFA

Prix final client = 24,700,000 + 5,600,000 = 30,300,000 FCFA

Commission = 2.5% × 5,600,000 = 140,000 FCFA
```

---

## 🎛️ Interface d'Administration

### Page : Gestion Types de Parcelles

**URL** : `/admin/projects/[id]/plot-types`

**Fonctionnalités** :
- ✅ Créer nouveau type
- ✅ Modifier type existant
- ✅ Définir prix de référence
- ✅ Activer/Désactiver type
- ✅ Ordre d'affichage

**Formulaire Création Type** :
```
Code*:              [TYPE_C        ]
Nom*:               [Terrain Premium Clôturé]
Description:        [Terrain avec clôture 2m, portail, ...]

Surface min (m²):   [200]
Surface max (m²):   [400]

Prix de réf/m²:     [85,000] FCFA

Équipements:
☑ Voirie pavée
☑ Éclairage public
☑ Eau potable
☑ Électricité
☑ Clôture périmétrique
☐ Assainissement

Couleur UI:         [#2196F3]
Icône:              [Uploader]

[Annuler]  [Créer Type]
```

---

### Page : Règles de Prix

**URL** : `/admin/pricing-rules`

**Liste des règles** avec priorité, validité, scope :

```
┌─────────────────────────────────────────────────────────────────┐
│ Règles de Prix                                    [+ Nouvelle]   │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│ 🔥 ACTIVE │ Prix Lancement Type A                   │ Prio: 15 │
│   Scope: Type A • Toutes agences                                 │
│   Prix: 50,000 → 47,000 FCFA/m²                                 │
│   Valide: 02/12/2025 - 02/02/2026                               │
│   [Modifier] [Suspendre]                                         │
│                                                                   │
│ 🔥 ACTIVE │ Prix Préférentiel MMOK - Type B        │ Prio: 10 │
│   Scope: Type B • MMOK GROUP                                     │
│   Prix: 66,000 → 64,000 FCFA/m² + Rabais Comptant 5%           │
│   Valide: Depuis 02/12/2025                                      │
│   [Modifier] [Suspendre]                                         │
│                                                                   │
│ ⏸️ SUSPENDUE │ Dégressif Grandes Surfaces          │ Prio: 5  │
│   Scope: Type A • Si surface ≥ 400m²                            │
│   Prix: 50,000 → 48,000 FCFA/m²                                 │
│   [Réactiver] [Modifier]                                         │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

---

### Page : Configuration Marges

**URL** : `/admin/agencies/[id]/margins` ou `/admin/agents/[id]/margins`

**Configuration par Agent** :

```
Agent: Fatou Diop
Agence: MMOK GROUP

┌─────────────────────────────────────────────────────────────────┐
│ Configuration Marges                              [+ Nouvelle]   │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│ Type: Au m²                                                       │
│ Marge: 12,000 FCFA/m²                                           │
│ Terrain: Tous types                                              │
│ 🏆 Bonus Performance: +2,000 FCFA/m² si ≥ 10 ventes/mois        │
│ Statut: 🔥 Active                                                │
│ [Modifier] [Historique]                                          │
│                                                                   │
│ ───────────────────────────────────────────────────────────────  │
│                                                                   │
│ Type: Paliers selon surface                                      │
│ Terrain: Type A uniquement                                       │
│   • 0-200m²:    8,000 FCFA/m²                                   │
│   • 200-350m²:  10,000 FCFA/m²                                  │
│   • 350m²+:     12,000 FCFA/m²                                  │
│ Statut: 🔥 Active                                                │
│ [Modifier]                                                        │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔧 API Routes

### Créer Type de Parcelle

```typescript
POST /api/projects/[id]/plot-types

Body:
{
  code: "TYPE_C",
  name: "Terrain Premium",
  description: "...",
  defaultSurfaceMin: 200,
  defaultSurfaceMax: 400,
  basePrice: 85000,
  features: ["Voirie", "Clôture"],
  color: "#2196F3"
}
```

### Créer Règle de Prix

```typescript
POST /api/pricing-rules

Body:
{
  name: "Prix Spécial Agence X",
  agencyId: "...",
  plotTypeConfigId: "...",
  cessionPricePerSqm: 48000,
  cashDiscountRate: 5,
  validFrom: "2025-12-01",
  priority: 10
}
```

### Créer Configuration Marge

```typescript
POST /api/margin-configs

Body:
{
  name: "Marge Agent Senior",
  agentId: "...",
  marginType: "PER_SQM",
  marginPerSqm: 12000,
  performanceBonus: 2000,
  performanceThreshold: 10
}
```

### Calculer Prix (Preview)

```typescript
POST /api/reservations/calculate-price

Body:
{
  plotId: "...",
  agentId: "...",
  paymentType: "CASH"
}

Response:
{
  cessionPrice: 12350000,
  agencyMargin: 3000000,
  finalPrice: 15350000,
  discount: 625000,
  agentCommission: 60000,
  breakdown: {...}
}
```

---

## 📝 Résumé des Avantages

### ✅ Flexibilité Totale
- Types de parcelles illimités par projet
- Prix différents par agence
- Marges personnalisées par agent

### ✅ Automatisation
- Calcul automatique du meilleur prix
- Application des rabais
- Calcul des commissions

### ✅ Motivation Commerciale
- Marges progressives
- Bonus performance
- Commissions à paliers

### ✅ Traçabilité
- Historique de tous les calculs
- Règles appliquées documentées
- Audit complet

---

**Le système est maintenant ultra-flexible et prêt pour tous les scénarios commerciaux !** 🚀
