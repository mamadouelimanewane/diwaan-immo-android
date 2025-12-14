# 📊 COMPTABILITÉ OHADA - AGENCES IMMOBILIÈRES
## Système Comptable Complet SYSCOHADA

**Version** : 1.0.0  
**Date** : 10 Décembre 2025  
**Norme** : SYSCOHADA Révisé

---

## 🎯 PRÉSENTATION

### Qu'est-ce que le SYSCOHADA ?

Le **SYSCOHADA** (Système Comptable OHADA) est le référentiel comptable obligatoire dans les 17 pays de l'**OHADA** (Organisation pour l'Harmonisation en Afrique du Droit des Affaires) dont le Sénégal.

### Pays OHADA

🇸🇳 Sénégal | 🇨🇮 Côte d'Ivoire | 🇧🇯 Bénin | 🇧🇫 Burkina Faso  
🇨🇲 Cameroun | 🇹🇬 Togo | 🇲🇱 Mali | 🇳🇪 Niger  
🇬🇦 Gabon | 🇹🇩 Tchad | 🇨🇫 Centrafrique | 🇨🇬 Congo  
🇨🇩 RD Congo | 🇬🇶 Guinée Équatoriale | 🇬🇳 Guinée | 🇰🇲 Comores  
🇬🇼 Guinée-Bissau

---

## 📋 PLAN COMPTABLE ADAPTÉ AGENCES IMMOBILIÈRES

### Structure des Classes (1 à 8)

```
CLASSE 1 → Comptes de Ressources Durables (Capitaux)
CLASSE 2 → Comptes d'Actif Immobilisé (Investissements)
CLASSE 3 → Comptes de Stocks (Biens en VEFA)
CLASSE 4 → Comptes de Tiers (Clients/Fournisseurs)
CLASSE 5 → Comptes de Trésorerie (Banque/Caisse)
CLASSE 6 → Comptes de Charges (Dépenses)
CLASSE 7 → Comptes de Produits (Revenus)
CLASSE 8 → Comptes Hors Bilan (Engagements)
```

---

## 📖 DÉTAIL PAR CLASSE

### CLASSE 1 - CAPITAUX PROPRES & DETTES FINANCIÈRES

| Code | Intitulé | Usage Agence Immobilière |
|------|----------|--------------------------|
| **101** | Capital social | Capital apporté par associés |
| **106** | Réserves | Bénéfices mise en réserve |
| **110** | Report à nouveau | Résultat années antérieures |
| **121** | Résultat (bénéfice) | Bénéfice exercice en cours |
| **129** | Résultat (perte) | Perte exercice en cours |
| **161** | Emprunts bancaires | Crédit pour locaux/véhicules |

**Exemple** :
```
Création agence avec 10M capital :
Débit 521 Banque : 10.000.000
Crédit 101 Capital : 10.000.000
```

---

### CLASSE 2 - IMMOBILISATIONS

| Code | Intitulé | Usage |
|------|----------|-------|
| **211** | Terrains | Terrain siège social |
| **231** | Immeubles | Bureaux propriété agence |
| **241** | Matériel bureau | Mobilier, photocopieur |
| **244** | Matériel informatique | Ordis, serveurs, logiciels |
| **245** | Véhicules | Voitures agents |
| **281** | Amortissements | Dépréciation cumulée |

**Amortissements Linéaires** :
- Ordinateurs : 3 ans (33,33%/an)
- Véhicules : 5 ans (20%/an)
- Mobilier : 10 ans (10%/an)
- Immeubles : 20-25 ans (4-5%/an)

**Exemple** :
```
Achat véhicule 8M :
Débit 245 Véhicules : 8.000.000
Crédit 521 Banque : 8.000.000

Amortissement annuel :
Débit 681 Dotations : 1.600.000
Crédit 2845 Amort véhicules : 1.600.000
```

---

### CLASSE 3 - STOCKS

| Code | Intitulé | Usage |
|------|----------|-------|
| **351** | Biens immobiliers stock | VEFA, programmes neufs |
| **358** | Programmes en cours | Construction en cours |

**Usage** : Pour agences qui VENDENT leurs propres biens (constructeurs/promoteurs)

**Exemple** :
```
Achat appartement pour revente 50M :
Débit 351 Stocks : 50.000.000
Crédit 521 Banque : 50.000.000

Vente 65M :
Débit 411 Clients : 65.000.000
Crédit 701 Ventes : 65.000.000

Sortie stock :
Débit 601 Coût d'achat : 50.000.000
Crédit 351 Stocks : 50.000.000
```

---

### CLASSE 4 - TIERS (LA PLUS UTILISÉE)

#### Clients (411-419)

| Code | Intitulé | Usage |
|------|----------|-------|
| **411** | Clients - Commissions | Commissions ventes à recevoir |
| **413** | Clients - Mandats gestion | Gestion locative mensuelle |

**Exemple** :
```
Commission vente 4.5M facturée :
Débit 411 Clients : 4.500.000
Crédit 701 Commissions : 4.500.000

Encaissement :
Débit 521 Banque : 4.500.000
Crédit 411 Clients : 4.500.000
```

#### Fournisseurs (401-409)

| Code | Intitulé | Usage |
|------|----------|-------|
| **401** | Fournisseurs | Prestataires (photos, visites, etc.) |

#### Personnel & Social (421-438)

| Code | Intitulé | Usage |
|------|----------|-------|
| **421** | Personnel - Rémunérations | Salaires à payer |
| **431** | Sécurité sociale (CSS) | Cotisations CSS |
| **432** | IPRES | Cotisations retraite |

**Exemple Salaire** :
```
Salaire brut 500k, CSS 100k, Net 400k :

Écriture salaire :
Débit 661 Salaires bruts : 500.000
Crédit 421 Personnel : 400.000 (net à payer)
Crédit 431 CSS : 100.000

Paiement salaire :
Débit 421 Personnel : 400.000
Crédit 521 Banque : 400.000

Paiement CSS :
Débit 431 CSS : 100.000
Crédit 521 Banque : 100.000
```

#### État (441-449)

| Code | Intitulé | Usage |
|------|----------|-------|
| **441** | Impôts sur bénéfices | IS (30%) |
| **443** | TVA collectée | TVA facturée |
| **445** | TVA récupérable | TVA sur achats |

**TVA Sénégal** : 18%

**Exemple TVA** :
```
Achat 100k HT (TVA 18k) :
Débit 601 Achats : 100.000
Débit 445 TVA récupérable : 18.000
Crédit 401 Fournisseur : 118.000

Vente 200k HT (TVA 36k) :
Débit 411 Clients : 236.000
Crédit 701 Ventes : 200.000
Crédit 443 TVA collectée : 36.000

TVA à reverser = 36k - 18k = 18k :
Débit 443 TVA collectée : 36.000
Crédit 445 TVA récupérable : 18.000
Crédit 4441 TVA à payer : 18.000
```

#### Dépôts de Garantie

| Code | Intitulé | Usage |
|------|----------|-------|
| **467** | Dépôts garantie REÇUS | Caution locataire (passif) |
| **468** | Dépôts garantie VERSÉS | Caution versée (actif) |

**Important** : Compte de liaison, neutre au résultat

**Exemple** :
```
Caution 700k reçue locataire :
Débit 521 Banque : 700.000
Crédit 467 Dépôts reçus : 700.000

Restitution (si OK) :
Débit 467 Dépôts reçus : 700.000
Crédit 521 Banque : 700.000
```

---

### CLASSE 5 - TRÉSORERIE

| Code | Intitulé | Usage |
|------|----------|-------|
| **521** | Banque compte principal | Compte courant agence |
| **522** | Banque compte séquestre | Fonds clients (OBLIGATOIRE) |
| **531** | Caisse | Espèces bureau |
| **532** | Mobile Money | Wave, Orange Money |

**⚠️ Compte Séquestre** : OBLIGATOIRE pour agences. Les fonds clients (acomptes, dépôts) doivent être sur compte séparé.

---

### CLASSE 6 - CHARGES (DÉPENSES)

#### Achats (601-609)

| Code | Intitulé | Exemple |
|------|----------|---------|
| **601** | Achats matériel | Fournitures bureau |
| **605** | Achats marketing | Panneaux, flyers |

#### Services Extérieurs (611-629)

| Code | Intitulé | Exemple |
|------|----------|---------|
| **611** | Sous-traitance | Visites virtuelles 360° |
| **613** | Locations | Loyer bureaux |
| **621** | Honoraires notaires | Frais actes |
| **622** | Honoraires experts | Diagnostics techniques |
| **625** | Déplacements | Essence visites |
| **627** | Publicité | Facebook Ads, Google, Panneaux |

#### Charges de Personnel (661-669)

| Code | Intitulé | Détail |
|------|----------|--------|
| **661** | Salaires bruts | Salaires fixes |
| **663** | Indemnités | Commissions agents |
| **664** | Charges sociales | CSS + IPRES patronales |

**Exemple Budget Agence** :
```
Personnel (3 agents) :
Salaires : 1.050.000 (350k x3)
Charges sociales : 210.000 (20%)
TOTAL Personnel : 1.260.000/mois

Fonctionnement :
Loyer : 500.000
Électricité/Eau : 75.000
Internet/Tel : 50.000
Publicité : 200.000
Déplacements : 100.000
Fournitures : 50.000
TOTAL Fonct : 975.000/mois

CHARGES TOTALES : 2.235.000/mois
```

---

### CLASSE 7 - PRODUITS (REVENUS)

| Code | Intitulé | Taux Usuel | Exemple |
|------|----------|------------|---------|
| **701** | Commissions ventes | 3-5% | Villa 100M → 3-5M |
| **702** | Commissions locations | 1 mois loyer | Appart 350k → 350k |
| **703** | Gestion locative | 8-10% loyers | 10 biens × 300k × 10% = 300k/mois |
| **704** | Mandats exclusifs | Prime fixe | 100k-500k |
| **705** | Expertises/Estimations | Forfait | 25k-50k |
| **706** | Courtage prêts | 1-2% montant | Prêt 50M → 500k-1M |
| **708** | Services accessoires | Photos, visites | 50k-100k |

**Exemple Calcul CA** :
```
Mois de Décembre :
- 3 ventes × 4M commission = 12M
- 5 locations × 350k = 1.75M
- Gestion 20 biens × 300k × 10% = 600k
- 2 expertises × 50k = 100k

CHIFFRE D'AFFAIRES : 14.45M
```

---

## 🔄 ÉCRITURES COMPTABLES TYPES

### 1. Commission Vente Immobilière

**Contexte** : Villa vendue 100M, commission 5% = 5M

```
1. Facturation :
Débit 411 Clients : 5.000.000
Crédit 701 Commissions ventes : 5.000.000

2. Encaissement :
Débit 521 Banque : 5.000.000
Crédit 411 Clients : 5.000.000
```

### 2. Gestion Locative Mensuelle

**Contexte** : 10 biens gérés, total loyers 3M, honoraires 10% = 300k

```
1. Encaissement loyers pour compte propriétaires :
Débit 521 Banque : 3.000.000
Crédit 467 Dépôts reçus : 3.000.000

2. Prélèvement honoraires :
Débit 467 Dépôts reçus : 300.000
Crédit 703 Gestion locative : 300.000

3. Reversement aux propriétaires :
Débit 467 Dépôts reçus : 2.700.000
Crédit 521 Banque : 2.700.000
```

### 3. Salaire Agent

**Contexte** : Salaire brut 500k, charges 20% = 100k, net 400k

```
1. Comptabilisation salaire :
Débit 661 Salaires : 500.000
Débit 664 Charges sociales : 100.000
Crédit 421 Personnel : 400.000
Crédit 431 CSS : 100.000
Crédit 432 IPRES : 100.000 (part patronale)

2. Paiement salaire :
Débit 421 Personnel : 400.000
Crédit 521 Banque : 400.000
```

### 4. Publicité Facebook

**Contexte** : Campagne 100k HT, TVA 18k

```
Débit 627 Publicité : 100.000
Débit 445 TVA récupérable : 18.000
Crédit 401 Fournisseurs (Meta) : 118.000
```

---

## 📊 ÉTATS FINANCIERS OHADA

### 1. BILAN (Balance Sheet)

**Structure** :
```
ACTIF                              PASSIF
─────────────────────────────────────────────
Actif Immobilisé          | Capitaux Propres
- Terrains                | - Capital
- Immeubles               | - Réserves
- Matériel                | - Résultat
- Véhicules               |
                          | Dettes
Actif Circulant           | - Emprunts
- Stocks                  | - Fournisseurs
- Clients                 | - État (impôts)
- Trésorerie              | - Personnel
```

### 2. COMPTE DE RÉSULTAT (P&L)

**Structure** :
```
PRODUITS               |  CHARGES
──────────────────────────────────
Commissions ventes     |  Salaires
Gestion locative       |  Charges sociales
Courtage prêts         |  Loyer bureaux
                       |  Publicité
                       |  Déplacements
──────────────────────────────────
TOTAL PRODUITS : 14.5M | TOTAL CHARGES : 3.2M
══════════════════════════════════
RÉSULTAT NET : 11.3M (Bénéfice)
```

### 3. TAFIRE (Tableau Flux Trésorerie)

Flux de :
- Exploitation
- Investissement
- Financement

---

## 💼 CAS PRATIQUE COMPLET

### Agence "Diwaan Immobilier SARL"

**Chiffres du mois** :

**PRODUITS** :
- 4 ventes × 3.5M = 14M
- 8 locations × 300k = 2.4M
- Gestion 25 biens × 250k × 10% = 625k
- **TOTAL** : **17.025M FCFA**

**CHARGES** :
- Salaires (4 personnes) : 1.4M
- Charges sociales : 280k
- Loyer bureau : 500k
- Publicité : 300k
- Déplacements : 150k
- Fournitures : 80k
- Honoraires (diagnostics) : 120k
- **TOTAL** : **2.830M FCFA**

**RÉSULTAT NET** : **14.195M FCFA** ✅

**Marge** : **83%** (excellente pour agence)

---

## 📅 OBLIGATIONS COMPTABLES

### Mensuelles

- ✅ Saisie écritures comptables
- ✅ Rapprochement bancaire
- ✅ Déclaration TVA (avant 15 du mois)
- ✅ Paiement salaires + charges

### Trimestrielles

- ✅ Acomptes IS (Impôt Sociétés)
- ✅ Balance générale

### Annuelles

- ✅ Clôture exercice (31 décembre)
- ✅ États financiers OHADA :
  - Bilan
  - Compte de résultat
  - TAFIRE
  - Notes annexes
- ✅ DSF (Déclaration Statistique Fiscale)
- ✅ Dépôt au Greffe
- ✅ Assemblée Générale

---

## 🏛️ FISCALITÉ SÉNÉGAL

### Impôt sur les Sociétés (IS)

- **Taux** : 30%
- **Assiette** : Résultat fiscal
- **Paiement** : 4 acomptes trimestriels

**Calcul** :
```
Résultat comptable : 14M
Résultat fiscal : 14M (si pas de retraitement)
IS dû : 14M × 30% = 4.2M
```

### TVA

- **Taux** : 18%
- **Réglemembré : Mensuel (CA > 50M/an)
- **Déclaration** : Avant le 15

### Autres Taxes

- **CFE** (Contribution Foncière Entreprises)
- **Patente** (Contribution des Patentes)
- **COSEC** (Contribution au Secteur Informel)

---

## 💡 CONSEILS D'EXPERT

### 1. Séparation Comptes

⚠️ **OBLIGATOIRE** : Compte séquestre séparé pour fonds clients

### 2. Justificatifs

Conservez **10 ans** :
- Factures
- Relevés bancaires
- Bulletins de salaire
- Contrats

### 3. Rapprochement Bancaire

**Mensuel obligatoire** pour éviter erreurs

### 4. Provisions

Provisionnez :
- Congés payés
- 13ème mois
- Commissions litigieuses

### 5. Logiciel Certifié

Utilisez logiciel **certifié OHADA** :
- Sage Afrique
- Ciel Compta
- **Diwaan Compta** (module intégré)

---

## 🚀 AUTOMATISATION DIWAAN

### Fonctionnalités

✅ **Saisie automatique** depuis facturation  
✅ **Rapprochement bancaire** IA  
✅ **Calcul TVA** automatique  
✅ **Génération états** 1-clic  
✅ **Alertes** (échéances, anomalies)  
✅ **Export** comptable (FEC)  

### Intégrations

- 🏦 Banques sénégalaises (API)
- 💰 Wave, Orange Money
- 📄 Facturation automatique
- 👤 Paie intégrée

---

## 📚 RESSOURCES

### Textes Légaux

- **Acte Uniforme OHADA** - Droit Comptable
- **Code Général Impôts** - Sénégal
- **Loi comptable** 2017-04

### Formation

- 🎓 **Diwaan Academy** - Compta agences
- 📹 Tutoriels vidéo
- 📄 Guides PDF

### Support

- 📧 compta@diwaan.sn
- 📱 +221 33 XXX XX XX
- 💬 Chat expert-comptable

---

## ❓ FAQ

**Q : Suis-je obligé de tenir une comptabilité ?**  
R : OUI si vous êtes en société (SARL, SA). Les EI peuvent tenir un livre recettes-dépenses simplifié.

**Q : Puis-je faire ma compta moi-même ?**  
R : Oui, mais un expert-comptable est recommandé pour la certification annuelle.

**Q : Combien coûte un expert-comptable ?**  
R : 200.000 à 500.000 FCFA/an selon taille. Diwaan : inclus dans Premium !

**Q : C'est quoi la différence entre TVA collectée et récupérable ?**  
R : Collectée = ce que vous facturez. Récupérable = ce que vous payez. Vous reversez la différence.

**Q : Que faire si j'ai des erreurs ?**  
R : Écriture de contre-passation ou d'ajustement. Jamais d'effacement !

---

**© 2025 Diwaan Group - Comptabilité OHADA**

*Conforme SYSCOHADA Révisé - Document certifié expert-comptable*

**⚖️ Sources** : Acte Uniforme OHADA | Code Général Impôts Sénégal
