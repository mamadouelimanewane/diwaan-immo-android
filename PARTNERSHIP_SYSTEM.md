# 🏢 Système de Gestion de Partenariat Promoteur-Agence

## 📋 Vue d'Ensemble

Système complet de gestion des relations commerciales entre :
- **Promoteurs** (ex: GREEN SYSTEM)
- **Agences Immobilières** (ex: MMOK GROUP)

Basé sur le protocole d'accord commercial du 02 Décembre 2025.

---

## 🎯 Fonctionnalités Principales

### 1. Gestion des Entités

#### Promoteurs
- Informations légales complètes (RCCM, NINEA)
- Coordonnées et contacts
- Gestion des projets immobiliers
- Suivi des parcelles disponibles

#### Agences Immobilières
- Profil commercial complet
- Statut juridique
- Équipe commerciale
- Performance commerciale

### 2. Contrats de Partenariat

#### Types de Contrats
- Mandat non exclusif
- Mandat exclusif
- Contrat à durée déterminée/indéterminée
- Reconduction tacite

#### Clauses Paramétrables
- Prix de cession par type de terrain
- Marges commerciales libres
- Rabais commerciaux (ex: 5% vente comptant)
- Révision des prix (périodique)
- Conditions de retrait de parcelles

### 3. Gestion des Parcelles

#### Caractéristiques
- Type A : Terrain simple
- Type B : Terrain avec voirie pavée
- Statut : Disponible, Réservé, Vendu, Retiré
- Prix de cession évolutif
- Historique des prix

#### Suivi Commercial
- Parcelles attribuées par agence
- Réservations en cours
- Ventes conclues
- Annulations et désistements

### 4. Processus de Vente

#### Réservation
- Acompte minimum : 50% (paramétrable)
- Notification automatique au promoteur (24h)
- Validation après paiement
- Fichier journal partagé

#### Échéancier de Paiement
- Paiement comptant (rabais automatique)
- Paiement échelonné
- Suivi des versements
- Alertes retards (3 mois)

#### Documents
- Contrat de réservation (modèle agence)
- Copie CIN client (après solde)
- Bordereaux de versement
- Actes de mutation

### 5. Relations Financières

#### Prix et Marges
```
Prix Final Client = Prix Cession Promoteur + Marge Agence

Exemple:
- Prix cession : 50,000 FCFA/m² (Type A)
- Marge agence : Libre (ex: 10,000 FCFA/m²)
- Prix final : 60,000 FCFA/m²
```

#### Rabais et Remises
- Vente comptant : -5% sur prix cession
- Révision prix tous les 3 mois
- Conditions spéciales (volume)

#### Reversement au Promoteur
- Délai : Selon contrat
- Montant : Prix de cession uniquement
- Marge agence : Conservée par agence

### 6. Gestion des Annulations

#### Désistement Client
- Remboursement par promoteur : Prix cession reçu
- Remboursement marge : Responsabilité agence
- Délai : 3 mois

#### Défaut de Paiement
- Seuil : 3 échéances non payées
- Mise en demeure automatique
- Annulation du contrat
- Récupération de la parcelle

#### Faute du Promoteur
- Remboursement intégral (principal + marge)
- Responsabilité contractuelle
- Pénalités éventuelles

---

## 📊 Modèles de Données

### Developer (Promoteur)

```typescript
{
  id: string
  legalName: string          // "GREEN SYSTEM SA"
  tradeName: string          // Nom commercial
  rccm: string              // "SN DKR 2010 B10309"
  ninea: string             // "00424505"
  address: string           // Siège social
  phone: string
  email: string
  representativeName: string // "Mr Abdoul Aziz Sylla"
  representativeTitle: string // "Gérant"
  status: ACTIVE | SUSPENDED
  createdAt: DateTime
  
  // Relations
  partnerships: Partnership[]
  projects: Project[]
  plots: Plot[]
}
```

### Agency (Agence Immobilière)

```typescript
{
  id: string
  legalName: string          // "MMOK GROUP"
  rccm: string              // "SN DKR 2022 A 25935"
  ninea: string             // "009587546 1Y1"
  address: string
  phone: string
  email: string
  directorName: string      // "Madame Ghislaine D Nicole SAMB"
  directorTitle: string     // "Directrice Générale"
  status: ACTIVE | SUSPENDED
  createdAt: DateTime
  
  // Relations
  partnerships: Partnership[]
  reservations: Reservation[]
  sales: Sale[]
}
```

### Partnership (Contrat de Partenariat)

```typescript
{
  id: string
  developerId: string
  agencyId: string
  
  // Durée
  startDate: DateTime
  endDate: DateTime
  duration: number          // Mois
  autoRenewal: boolean      // Tacite reconduction
  renewalPeriod: number     // Périodes d'un an
  
  // Type de mandat
  exclusive: boolean        // Non exclusif par défaut
  
  // Conditions financières
  commissionRate: number    // % si applicable
  cashDiscountRate: number  // 5% par défaut
  priceRevisionPeriod: number // 3 mois
  
  // Obligations
  minDownPayment: number    // 50% par défaut
  notificationDelay: number // 24 heures
  documentDelay: number     // 72 heures
  
  // Statut
  status: ACTIVE | SUSPENDED | TERMINATED
  terminationReason: string?
  
  // Relations
  developer: Developer
  agency: Agency
  contractClauses: Clause[]
  plots: Plot[]
}
```

### Project (Projet/Lotissement)

```typescript
{
  id: string
  developerId: string
  name: string              // "Sebi Renaissance"
  location: string          // "Diamniadio"
  commune: string
  totalPlots: number
  availablePlots: number
  description: string
  status: PLANNING | ACTIVE | COMPLETED
  
  // Relations
  developer: Developer
  plots: Plot[]
}
```

### Plot (Parcelle)

```typescript
{
  id: string
  projectId: string
  partnershipId: string?
  agencyId: string?         // Si attribuée
  
  // Identification
  plotNumber: string        // Numéro de parcelle
  block: string?            // Îlot/bloc
  
  // Caractéristiques
  type: PlotType            // TYPE_A, TYPE_B
  surfaceArea: number       // m²
  
  // Prix
  basePricePerSqm: number   // Prix cession actuel
  priceHistory: PriceRevision[]
  
  // Statut
  status: AVAILABLE | RESERVED | SOLD | WITHDRAWN | CANCELLED
  
  // Dates
  availableFrom: DateTime
  withdrawnAt: DateTime?
  withdrawalReason: string?
  
  // Relations
  project: Project
  partnership: Partnership?
  agency: Agency?
  reservation: Reservation?
  sale: Sale?
}
```

### PlotType

```typescript
enum PlotType {
  TYPE_A  // Terrain simple
  TYPE_B  // Terrain avec voirie pavée
  CUSTOM  // Type personnalisé
}
```

### PriceRevision (Historique Prix)

```typescript
{
  id: string
  plotId: string
  oldPrice: number
  newPrice: number
  effectiveDate: DateTime
  reason: string
  createdBy: string
}
```

### Reservation

```typescript
{
  id: string
  plotId: string
  agencyId: string
  
  // Client
  clientName: string
  clientEmail: string
  clientPhone: string
  clientCIN: string?        // Après solde
  
  // Prix
  cessionPrice: number      // Prix promoteur
  agencyMargin: number      // Marge agence
  finalPrice: number        // Prix final client
  discount: number          // Rabais appliqué
  
  // Paiement
  downPayment: number       // Acompte versé
  downPaymentDate: DateTime
  balance: number           // Solde restant
  paymentType: CASH | INSTALLMENT
  
  // Statut
  status: PENDING | VALIDATED | COMPLETED | CANCELLED
  validatedAt: DateTime?
  completedAt: DateTime?
  cancelledAt: DateTime?
  cancellationReason: string?
  
  // Documents
  contractModel: string     // URL modèle contrat
  proofOfPayment: string[]  // URLs bordereaux
  
  // Notifications
  notifiedAt: DateTime?
  addedToJournal: boolean
  
  // Relations
  plot: Plot
  agency: Agency
  payments: Payment[]
  sale: Sale?
}
```

### Payment (Paiement)

```typescript
{
  id: string
  reservationId: string
  
  amount: number
  paymentDate: DateTime
  dueDate: DateTime?        // Si échéancier
  method: CASH | TRANSFER | CHECK | MOBILE_MONEY
  reference: string         // Référence transaction
  proofUrl: string?         // Bordereau
  
  status: PENDING | COMPLETED | LATE | CANCELLED
  lateDays: number?
  
  // Relations
  reservation: Reservation
}
```

### Sale (Vente Finalisée)

```typescript
{
  id: string
  reservationId: string
  plotId: string
  agencyId: string
  developerId: string
  
  // Montants
  totalPaid: number
  cessionAmount: number     // Part promoteur
  agencyAmount: number      // Part agence
  
  // Documents
  clientCINUrl: string
  mutationDocuments: string[]
  
  // Dates
  saleDate: DateTime
  mutationDate: DateTime?
  
  status: COMPLETED | PENDING_MUTATION
  
  // Relations
  reservation: Reservation
  plot: Plot
  agency: Agency
  developer: Developer
}
```

### Clause (Clause Contractuelle)

```typescript
{
  id: string
  partnershipId: string
  
  title: string             // "Article 3 - Mandat"
  content: string           // Texte de la clause
  order: number             // Ordre d'affichage
  mandatory: boolean        // Obligatoire ou optionnelle
  
  // Relations
  partnership: Partnership
}
```

---

## 🔄 Flux de Processus

### 1. Création du Partenariat

```
1. Promoteur crée compte
2. Agence crée compte
3. Négociation termes du contrat
4. Création Partnership avec clauses
5. Attribution parcelles à l'agence
6. Activation du contrat
```

### 2. Réservation Client

```
1. Agence sélectionne parcelle disponible
2. Client exprime intérêt
3. Agence crée réservation (statut: PENDING)
4. Client verse acompte ≥50%
5. Agence notifie promoteur (<24h)
6. Agence met à jour journal partagé
7. Validation réservation (statut: VALIDATED)
8. Parcelle = RESERVED
```

### 3. Finalisation Vente

```
1. Client solde le paiement
2. Agence fournit modèle contrat (<72h)
3. Client signe contrat réservation
4. Agence transmet CIN client au promoteur
5. Création Sale (statut: COMPLETED)
6. Parcelle = SOLD
7. Mutations futures par promoteur
```

### 4. Annulation

#### Par Client
```
1. Client demande annulation
2. Promoteur rembourse prix cession (3 mois)
3. Agence rembourse sa marge au client
4. Parcelle retourne AVAILABLE
5. Statut réservation: CANCELLED
```

#### Défaut Paiement
```
1. 3 échéances non payées
2. Mise en demeure automatique
3. Après délai, annulation contrat
4. Parcelle récupérée
5. Remboursement selon termes
```

---

## 💰 Calculs Financiers

### Prix Final Client

```typescript
// Exemple Type A - Phase Lancement
const basePricePerSqm = 50_000;      // FCFA
const surfaceArea = 200;             // m²
const agencyMarginPerSqm = 10_000;   // FCFA (libre)

const cessionPrice = basePricePerSqm * surfaceArea;
// = 10,000,000 FCFA

const agencyMargin = agencyMarginPerSqm * surfaceArea;
// = 2,000,000 FCFA

const finalPrice = cessionPrice + agencyMargin;
// = 12,000,000 FCFA
```

### Rabais Vente Comptant (5%)

```typescript
const cashDiscount = cessionPrice * 0.05;
// = 500,000 FCFA

const reducedCessionPrice = cessionPrice - cashDiscount;
// = 9,500,000 FCFA

const finalPriceWithDiscount = reducedCessionPrice + agencyMargin;
// = 11,500,000 FCFA

// Montant à verser au promoteur
const amountToDeveloper = reducedCessionPrice;
// = 9,500,000 FCFA
```

### Acompte Minimum (50%)

```typescript
const minDownPayment = finalPrice * 0.50;
// = 6,000,000 FCFA (comptant)
// = 5,750,000 FCFA (avec rabais)
```

---

## 📄 Documents Générés

### 1. Contrat de Partenariat
- Protocole d'accord complet
- Clauses personnalisées
- Annexes (liste parcelles)
- Signatures électroniques

### 2. Contrat de Réservation (Agence)
- Modèle fourni par agence
- Informations client
- Détails parcelle
- Échéancier paiement

### 3. Bordereaux de Paiement
- Preuves de versement
- Références transactions
- Historique complet

### 4. Documents de Mutation
- CIN client
- Actes administratifs
- Transfert de propriété

---

## 🔔 Notifications Automatiques

### Email Promoteur
- Nouvelle réservation (<24h)
- Paiement reçu
- Solde effectué
- Documents reçus
- Retard de paiement (alerte)

### Email Agence
- Validation réservation
- Retrait de parcelle
- Révision de prix
- Annulation
- Rappels documents

### Email Client
- Confirmation réservation
- Rappel échéance
- Solde restant
- Finalisation vente

---

## 📊 Tableaux de Bord

### Dashboard Promoteur
- Parcelles disponibles/vendues
- CA par agence
- Taux de conversion
- Délais moyens de vente
- Recouvrement en cours

### Dashboard Agence
- Parcelles attribuées
- Réservations en cours
- CA réalisé
- Marge moyenne
- Performance commerciale

---

## 🔐 Permissions et Rôles

### DEVELOPER (Promoteur)
- Gérer projets et parcelles
- Créer partenariats
- Valider réservations
- Retirer parcelles
- Réviser prix
- Gérer mutations

### AGENCY (Agence)
- Voir parcelles attribuées
- Créer réservations
- Suivre paiements
- Uploader documents
- Gérer clients

### AGENCY_AGENT (Commercial Agence)
- Créer réservations
- Suivre clients
- Uploader preuves paiement

### ADMIN (Super Admin)
- Gestion complète système
- Arbitrage litiges
- Support technique

---

## 🛠️ Implémentation Technique

### Stack
- **Frontend**: Next.js 14 + React
- **Backend**: API Routes Next.js
- **Database**: MongoDB + Prisma
- **Auth**: NextAuth.js
- **Files**: Cloudinary
- **Email**: Resend
- **PDF**: jsPDF

### Modules Clés
1. `partnerships` - Gestion contrats
2. `plots` - Gestion parcelles
3. `reservations` - Gestion ventes
4. `payments` - Gestion paiements
5. `documents` - Génération docs
6. `notifications` - Alertes auto

---

## 📅 Roadmap d'Implémentation

### Phase 1 : Base (Semaine 1)
- [ ] Schéma Prisma complet
- [ ] Modèles Developer & Agency
- [ ] CRUD basique

### Phase 2 : Partenariats (Semaine 2)
- [ ] Modèle Partnership
- [ ] Création contrats
- [ ] Gestion clauses
- [ ] Attribution parcelles

### Phase 3 : Réservations (Semaine 3)
- [ ] Flux réservation complet
- [ ] Validation acompte
- [ ] Notifications
- [ ] Journal partagé (Google Sheet API)

### Phase 4 : Paiements (Semaine 4)
- [ ] Échéanciers
- [ ] Suivi versements
- [ ] Alertes retards
- [ ] Remboursements

### Phase 5 : Documents (Semaine 5)
- [ ] Génération PDF contrats
- [ ] Upload documents
- [ ] Templates personnalisables
- [ ] Signatures électroniques

### Phase 6 : Dashboards (Semaine 6)
- [ ] Analytics promoteur
- [ ] Analytics agence
- [ ] Rapports automatiques
- [ ] Exports Excel/PDF

---

Cette architecture permet une gestion complète et automatisée des relations commerciales entre promoteurs et agences immobilières, conforme au protocole d'accord fourni.
