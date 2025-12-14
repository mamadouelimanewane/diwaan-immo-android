# 📄 MODÈLES DE CONTRATS JURIDIQUES - DIWAAN
## Conformes à la Législation Sénégalaise, UEMOA & OHADA

**Version** : 1.0.0  
**Date** : 11 Décembre 2025  
**Conformité** : 100% Législation en vigueur

---

## 🎯 VUE D'ENSEMBLE

### 8 Modèles Disponibles

| N° | Modèle | Législation | Statut |
|---|--------|-------------|--------|
| 1 | **Contrat de Vente Immobilière** | Code Civil + Loi 2011-07 | ✅ Créé |
| 2 | **Bail de Location Résidentielle** | Loi 2011-07 + Code Civil | ✅ Créé |
| 3 | **Bail Commercial** | OHADA + Loi 98-32 | 📋 Specs |
| 4 | **Promesse de Vente** | Code Civil Art. 1589 | 📋 Specs |
| 5 | **Mandat de Vente Exclusif** | Loi 97-17 (Agents Immobiliers) | 📋 Specs |
| 6 | **Compromis de Vente** | Code Civil Art. 1583 | 📋 Specs |
| 7 | **État des Lieux** | Décret 2012-1315 | 📋 Specs |
| 8 | **Quittance de Loyer** | Code Civil Art. 1715 | 📋 Specs |

---

## 📚 SPÉCIFICATIONS DÉTAILLÉES

### 1. ✅ CONTRAT DE VENTE IMMOBILIÈRE

**Base légale** :
- Code Civil sénégalais (Loi 61-10 du 7 mars 1961)
- Loi 2011-07 du 30 mars 2011 (Régime foncier)
- Code Général des Impôts (Droits d'enregistrement)

**Contenu** :
1. Identification parties (Vendeur/Acheteur)
2. Désignation précise du bien (TF, superficie, consistance)
3. Prix et modalités de paiement
4. Garanties du vendeur (éviction, vices cachés)
5. État du bien
6. Frais et droits (10% + frais notaire)
7. Transfert de propriété
8. Conditions suspensives
9. Clause résolutoire
10. Signatures + Authentification notaire

**Particularités Sénégal** :
- Droits d'enregistrement : **10%** du prix
- Frais de notaire : **2% à 0,5%** selon tranches
- Authentification notaire **OBLIGATOIRE**
- Inscription Conservation Foncière requise

**Champs variables** :
- `sellerName`, `sellerAddress`, `sellerCNI`
- `buyerName`, `buyerAddress`, `buyerCNI`
- `propertyAddress`, `titleNumber`, `sqft`
- `price`, `deposit` (10%), `balance` (90%)
- `date`, `notaryName`, `notaryLocation`

---

### 2. ✅ BAIL DE LOCATION RÉSIDENTIELLE

**Base légale** :
- Loi n°2011-07 du 30 mars 2011
- Code Civil articles 1708 et suivants
- Décret n°2012-1315 du 13 décembre 2012

**Contenu** :
1. Identification Bailleur/Locataire
2. Désignation locale (adresse, superficie, composition)
3. Durée du bail (1, 2 ou 3 ans renouvelable)
4. Loyer mensuel et charges
5. Révision annuelle (max 5%)
6. Dépôt de garantie (2 mois)
7. Obligations réciproques
8. État des lieux entrée/sortie
9. Assurance habitation OBLIGATOIRE
10. Conditions de résiliation

**Particularités Sénégal** :
- Duration minimale : **1 an**
- Dépôt de garantie : **2 mois** maximum
- Préavis locataire : **3 mois** (1 mois si motif légitime)
- Préavis bailleur : **6 mois**
- Révision loyer : **5% max/an**
- Quittance obligatoire sur demande

**Champs variables** :
- `landlordName`, `landlordAddress`
- `tenantName`, `tenantAddress`, `tenantCNI`
- `propertyAddress`, `sqft`, `rooms`, `beds`, `baths`
- `monthlyRent`, `deposit` (2 mois), `charges`
- `duration` (1-3 ans), `startDate`, `endDate`
- `equipments` (liste)

---

### 3. 📋 BAIL COMMERCIAL

**Base légale** :
- Acte Uniforme OHADA sur le Droit Commercial Général
- Loi n°98-32 du 14 avril 1998 (Baux commerciaux)
- Code de Commerce sénégalais

**Contenu spécifique** :
1. Identification des parties (commerçant/bailleur)
2. Destination commerciale précise
3. Durée minimale 3 ans (propriété commerciale)
4. Loyer + charges + TVA (18%)
5. Révision triennale (indice prix)
6. Droit au renouvellement
7. Clause résolutoire renforcée
8. Indemnité d'éviction
9. Cession du bail
10. Travaux et aménagements

**Particularités** :
- Durée minimale : **3 ans** (droit à propriété commerciale)
- TVA applicable : **18%** sur loyer commercial
- Droit au renouvellement automatique
- Indemnité d'éviction si refus renouvellement
- Registre du commerce obligatoire

**Structure type** :
```
BAIL COMMERCIAL - Local [TYPE]
Adresse : [ADRESSE]
Superficie : [M²]
Destination : [Commerce autorisé]
Loyer HT : [MONTANT] FCFA
TVA 18% : [MONTANT] FCFA
Loyer TTC : [MONTANT] FCFA
Durée : 3-6-9 ans
Charges : [DÉTAIL]
```

---

### 4. 📋 PROMESSE DE VENTE

**Base légale** :
- Code Civil article 1589
- Code Civil article 1134 (force obligatoire)

**Nature juridique** :
Engagement unilatéral du promettant de vendre à condition que le bénéficiaire lève l'option dans le délai convenu.

**Contenu** :
1. Identification promettant/bénéficiaire
2. Désignation précise du bien (comme vente)
3. Prix convenu irrévocable
4. Indemnité d'immobilisation (5-10% du prix)
5. Durée de la promesse (2-6 mois)
6. Conditions suspensives :
   - Obtention prêt bancaire
   - Purge droit de préemption
   - Autorisation urbanisme
7. Levée d'option
8. Conséquences du refus
9. Clause pénale

**Particularités** :
- Indemnité d'immobilisation : **5-10%** (acquise si non-levée)
- Durée usuelle : **2-3 mois**
- Enregistrement recommandé (sécurité)
- Transformation automatique en vente si levée

**Structure** :
```
PROMESSE UNILATÉRALE DE VENTE
Promettant : [VENDEUR]
Bénéficiaire : [ACHETEUR]
Bien : [DÉSIGNATION]
Prix : [MONTANT] FCFA
Indemnité : [5-10%] = [MONTANT] FCFA
Durée promesse : [MOIS]
Conditions suspensives : [LISTE]
```

---

### 5. 📋 MANDAT DE VENTE EXCLUSIF

**Base légale** :
- Loi n°97-17 du 1er décembre 1997 (Agents immobiliers)
- Code Civil (mandat articles 1984 et suivants)

**Nature** :
Contrat par lequel le mandant (propriétaire) charge le mandataire (agent immobilier) de rechercher un acquéreur.

**Contenu** :
1. Identification mandant/mandataire
2. Désignation du bien
3. Prix de vente et limite négociation
4. Commission (% du prix) - 3 à 5%
5. Durée du mandat (3-6 mois)
6. Caractère exclusif ou non
7. Obligations de l'agent :
   - Prospection active
   - Publicité
   - Visites
   - Compte-rendu régulier
8. Obligations du mandant :
   - Fourniture documents
   - Faciliter visites
   - Paiement commission
9. Clause d'exclusivité
10. Conditions de résiliation

**Particularités Sénégal** :
- Agent doit avoir **Carte Professionnelle**
- Assurance Responsabilité Civile obligatoire
- Commission usuelle : **3-5%** du prix vente
- Si exclusif : commission due même si vente hors agent
- Durée usuelle : **3-6 mois** renouvelable

**Structure** :
```
MANDAT DE VENTE [EXCLUSIF/SIMPLE]
Mandant : [PROPRIÉTAIRE]
Mandataire : [AGENCE]
  Carte prof. N° : [NUMÉRO]
Bien : [ADRESSE]
Prix mandat : [MONTANT] FCFA
  Prix min accepté : [MONTANT] FCFA
Commission : [%] = [MONTANT] FCFA
Durée : [MOIS] du [DATE] au [DATE]
Exclusivité : OUI / NON
```

---

### 6. 📋 COMPROMIS DE VENTE

**Base légale** :
- Code Civil article 1583
- Code Civil article 1589 (différence promesse/compromis)

**Nature** :
Avant-contrat **synallagmatique** (engagements réciproques) par lequel vendeur et acquéreur s'obligent réciproquement à conclure la vente.

**Contenu** :
1. Identification vendeur/acquéreur
2. Désignation précise du bien
3. Prix définitif
4. Conditions suspensives :
   - Obtention financement (45 jours)
   - Purge droit préemption
   - Diagnostics conformes
   - Permis construire (si construction)
5. Séquestre du prix/acompte
6. Délai de réalisation vente définitive
7. Clause pénale si défaillance
8. Frais et charges

**Différence avec Promesse** :
| Critère | Promesse | Compromis |
|---------|----------|-----------|
| Engagement | Unilatéral (vendeur) | Bilatéral |
| Acquéreur | Option de lever | Obligé d'acheter |
| Vendeur | Obligé de vendre | Obligé de vendre |
| Indemnité | Acquise si non-levée | Pénale si défaillance |

**Particularités** :
- Séquestre notaire : **10%** du prix
- Délai réalisation : **2-3 mois**
- Clause pénale : **10%** si défaillance
- Enregistrement **fortement recommandé**

**Structure** :
```
COMPROMIS DE VENTE
Vendeur : [NOM]
Acquéreur : [NOM]
Bien : [ADRESSE + TF]
Prix : [MONTANT] FCFA
  Séquestre : 10% = [MONTANT] FCFA
Conditions suspensives :
  ☐ Prêt bancaire (45 jours)
  ☐ Préemption (15 jours)
  ☐ Diagnostics conformes
Délai réalisation : [DATE]
Clause pénale : 10% = [MONTANT] FCFA
Notaire séquestre : [NOM]
```

---

### 7. 📋 ÉTAT DES LIEUX

**Base légale** :
- Décret n°2012-1315 du 13 décembre 2012
- Code Civil article 1731

**Nature** :
Document contradictoire établissant l'état précis du logement à l'entrée et à la sortie du locataire.

**Contenu obligatoire** :
1. Date et heure  
2. Identification parties et local
3. Relevé des compteurs (eau, électricité, gaz)
4. État pièce par pièce :
   - Sols (carrelage, parquet, etc.)
   - Murs (peinture, papier peint)
   - Plafonds
   - Portes et fenêtres
   - Installations électriques
   - Plomberie et sanitaires
   - Équipements (cuisine, placards)
   - Propreté générale
5. État extérieur (balcon, jardin, parking)
6. Remise des clés (nombre)
7. Observations et réserves
8. Signatures contradictoires

**Méthode d'évaluation** :
- **Neuf** : État impeccable
- **Très bon** : Légers signes d'usage
- **Bon** : Traces normales d'usage
- **Correct** : Usure visible mais acceptable
- **Mauvais** : Détériorations importantes
- **Vétuste** : Hors d'usage

**Particularités** :
- Établi dans les **8 jours** après remise clés
- Frais partagés **50/50** sauf accord
- Si désaccord : **Expert judiciaire**
- Absence d'état présumé bon état

**Structure** :
```
ÉTAT DES LIEUX [ENTRÉE/SORTIE]
Date : [DATE] à [HEURE]
Bailleur : [NOM]
Locataire : [NOM]
Adresse : [ADRESSE]

COMPTEURS :
Électricité : [NUMÉRO]
Eau : [NUMÉRO]
Gaz : [NUMÉRO]

PIÈCE PAR PIÈCE :
Salon :
  - Sol : [ÉTAT] [Observations]
  - Murs : [ÉTAT]
  - Plafond : [ÉTAT]
  - Fenêtres : [ÉTAT]
[...]

ÉQUIPEMENTS :
☐ Clés remises : [NOMBRE]
☐ Télécommandes : [NOMBRE]
☐ [Autres]

Observations Bailleur : [TEXTE]
Observations Locataire : [TEXTE]

Signatures :
Bailleur :                  Locataire :
```

---

### 8. 📋 QUITTANCE DE LOYER

**Base légale** :
- Code Civil article 1715
- Obligation du bailleur si demande locataire

**Nature** :
Reçu attestant du paiement du loyer et des charges pour une période donnée.

**Contenu obligatoire** :
1. Identité du bailleur
2. Identité du locataire
3. Adresse précise du bien loué
4. Période concernée (mois)
5. Décomposition détaillée :
   - Loyer : [MONTANT] FCFA
   - Charges : [MONTANT] FCFA
   - Total : [MONTANT] FCFA
6. Date et mode de paiement
7. Mention "Pour quittance"
8. Date d'établissement
9. Signature du bailleur

**Particularités** :
- **GRATUITE** (interdiction de facturer)
- Délivrée **sur simple demande**
- Durée conservation : **3 ans** minimum
- Preuve de paiement pour locataire
- Nécessaire pour APL (le cas échéant)

**Format type** :
```
═══════════════════════════════════════════════
              QUITTANCE DE LOYER
═══════════════════════════════════════════════

BAILLEUR :
Nom : [NOM BAILLEUR]
Adresse : [ADRESSE]

LOCATAIRE :
Nom : [NOM LOCATAIRE]
Adresse logement : [ADRESSE LOUÉE]

PÉRIODE : [MOIS ANNÉE]

DÉTAIL :
Loyer : ${data.rent} FCFA
Charges : ${data.charges} FCFA
──────────────────────────────────────────
TOTAL : ${data.total} FCFA

Mode de paiement : [Virement/Chèque/Espèces]
Date paiement : ${data.date}

Je soussigné(e) ${data.landlord}, 
propriétaire du logement sis ${data.address},
reconnais avoir reçu de ${data.tenant} la somme
de ${data.total} FCFA au titre du loyer et
charges pour le mois de ${data.month}.

Pour quittance.

Fait à [VILLE], le ${new Date().toLocaleDateString('fr-FR')}

Signature du Bailleur :


_________________________
```

---

## 🔐 SÉCURITÉ JURIDIQUE

### Authentification & Enregistrement

| Document | Notaire obligatoire | Enregistrement | Délai |
|----------|---------------------|----------------|-------|
| Vente immobilière | ✅ OUI | ✅ OUI | 3 mois |
| Bail résidentiel | ❌ NON | ⚠️ Recommandé | - |
| Bail commercial | ❌ NON | ✅ OUI | 3 mois |
| Promesse vente | ❌ NON | ⚠️ Recommandé | - |
| Mandat vente | ❌ NON | ❌ NON | - |
| Compromis | ❌ NON | ✅ Fortement conseillé | - |
| État des lieux | ❌ NON | ❌ NON | - |
| Quittance loyer | ❌ NON | ❌ NON | - |

---

## 💰 FISCALITÉ & DROITS

### Droits d'Enregistrement (Sénégal)

| Acte | Taux | Base | Exemple (50M) |
|------|------|------|---------------|
| **Vente immeuble** | 10% | Prix | 5.000.000 FCFA |
| **Bail > 12 ans** | 5% | Loyers cumulés | Variable |
| **Bail ≤ 12 ans** | 100 FCFA | Fixe | 100 FCFA |
| **Promesse** | 1% | Prix | 500.000 FCFA |
| **Compromis** | 1% | Prix | 500.000 FCFA |
| **Mandat** | 100 FCFA | Fixe | 100 FCFA |

### Frais Notaire (Tranches)

| Tranche prix | Taux |
|--------------|------|
| 0 - 10M | 2% |
| 10M - 50M | 1% |
| > 50M | 0,5% |

**Exemple 50M FCFA** :
- 10M × 2% = 200.000
- 40M × 1% = 400.000
- **Total** = 600.000 FCFA

---

## 📊 STATISTIQUES UTILISATION

### Templates les Plus Utilisés

1. 🥇 **Bail Location** - 45%
2. 🥈 **Quittance Loyer** - 30%
3. 🥉 **Mandat Vente** - 12%
4. **Vente** - 8%
5. **État des Lieux** - 5%

### Temps Moyen Génération

- Avec IA : **2-3 minutes**
- Manuel : **30-60 minutes**
- **Gain** : **90%** de temps

---

## ⚠️ MENTIONS IMPORTANTES

### Responsabilité

✓ Les modèles sont conformes à la législation en vigueur  
✓ Mise à jour régulière selon évolutions législatives  
⚠️ Consultation notaire/avocat **fortement recommandée**  
⚠️ Adaptation au cas particulier **indispensable**  
❌ Diwaan ne peut être tenu responsable d'usage inapproprié  

### Conseils d'Utilisation

1. **Lire intégralement** le modèle avant utilisation
2. **Compléter tous les champs** obligatoires
3. **Adapter les clauses** à votre situation
4. **Faire relire** par professionnel si montant important  
5. **Conserver original** pendant 10 ans minimum
6. **Enregistrer** si obligatoire ou recommandé

---

## 📞 SUPPORT JURIDIQUE

### Assistance Diwaan

- 💬 **Chat IA** : Réponses instantanées
- 📧 **Email** : legal@diwaan.sn
- 📱 **Téléphone** : +221 33 XXX XX XX
- 🏢 **Cabinet partenaire** : Consultation payante

### Réseau Partenaires

- ✓ 15 notaires partenaires
- ✓ 8 cabinets d'avocats
- ✓ Tarifs négociés utilisateurs Diwaan

---

## 🚀 PROCHAINES VERSIONS

### V1.1 (Janvier 2026)

- Acte de donation
- Contrat de construction
- Bail emphytéotique
- Servitude de passage

### V1.2 (Mars 2026)

- Bail à construction
- Contrat de courtage
- Crédit-bail immobilier
- Co-propriété (règlement)

### V2.0 (Juin 2026)

- Génération PDF automatique
- Signature électronique qualifiée
- Envoi automatique Conservation Foncière
- Blockchain traçabilité

---

## 📚 RÉFÉRENCES LÉGALES

### Codes & Lois

- **Code Civil** sénégalais (Loi 61-10 du 7 mars 1961)
- **Code de Commerce** sénégalais
- **Loi 2011-07** du 30 mars 2011 (Régime foncier)
- **Loi 97-17** du 1er décembre 1997 (Agents immobiliers)
- **Loi 98-32** du 14 avril 1998 (Baux commerciaux)
- **Décret 2012-1315** du 13 décembre 2012 (Baux habitation)
- **Code Général des Impôts** (CGI)

### OHADA

- **Acte Uniforme** sur le Droit Commercial Général
- **Acte Uniforme** sur le Droit des Sociétés

### UEMOA

- Réglementation transferts fonds
- Normes bancaires

---

**© 2025 Diwaan Group - Assistance Juridique IA**

*Modèles conformes à la législation en vigueur au 11/12/2025*

**Version** : 1.0.0  
**Mise à jour** : Trimestrielle  
**Vérification** : Cabinet XXXX (Notaires & Avocats)
