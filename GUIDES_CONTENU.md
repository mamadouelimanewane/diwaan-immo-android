# 📚 CONTENU DES GUIDES DIWAAN

## ✅ Guide créé

1. **Guide de l'Acheteur** → `src/app/guides/acheteur/page.tsx` ✅

---

## 📝 Guides à créer (Contenu prêt)

### 2️⃣ Guide du Vendeur (`src/app/guides/vendeur/page.tsx`)

**Contenu** :
- Estimer le prix de votre bien
- Préparer votre propriété pour la vente
- Choisir entre vente directe et via agence
- Photos et descriptions attractives
- Organiser les visites
- Négocier avec les acheteurs
- Signer le compromis et l'acte de vente
- Fiscalité de la plus-value

**Points clés Sénégal** :
- Commission agence : 3-5%
- Durée moyenne de vente : 3-6 mois
- Documents obligatoires :  Titre foncier, Certificat de propriété
- Diagnostics à fournir

---

### 3️⃣ Financement & Prêts (`src/app/guides/financement/page.tsx`)

**Contenu** :
- Types de prêts disponibles
  - Prêt immobilier classique
  - Prêt accession propriété (SNHLM)
  - Prêt pont
  - Rachat de crédit
- Assurance emprunteur
- Garanties demandées (hypothèque, caution)
- Calculateur de mensualités
- Taux fixes vs taux variables
- Remboursement anticipé
- Renégociation de prêt

**Banques partenaires** :
- CBAO (taux : 6-7%)
- SGBS (taux : 6.5-8%)
- Ecobank (taux : 7-8.5%)
- BHS (taux : 6-7.5%)

**Formules** :
- Capacité d'emprunt
- Taux d'endettement max (33%)
- Coût total du crédit

---

### 4️⃣ Juridique & Notaires (`src/app/guides/juridique/page.tsx`)

**Contenu** :
- Rôle du notaire au Sénégal
- Documents juridiques obligatoires
  - Titre foncier (TF)
  - Certificat de propriété
  - Attestation de non-hypothèque
  - Plan cadastral
- Étapes chez le notaire
  1. Vérification titre foncier
  2. Rédaction acte de vente
  3. Signature devant notaire
  4. Enregistrement Conservation Foncière
  5. Remise nouveau TF
- Frais de notaire détaillés
  - Droits d'enregistrement : 10%
  - Honoraires notaire : 1-2%
  - Frais Conservation Foncière
- Délais (3-6 mois pour TF)
- Recours en cas de litige

**Législation** :
- Code Civil sénégalais
- Loi 2011-07 (Régime foncier)
- Actes Uniformes OHADA

---

### 5️⃣ Construire sa Maison (`src/app/guides/construction/page.tsx`)

**Contenu** :
- Choisir et acheter un terrain
  - Vérifier viabilité (eau,  électricité, route)
  - Zonage et règles d'urbanisme
  - Prix terrain par quartier
- Obtenir permis de construire
  - Dossier à constituer
  - Délais d'instruction (2-3 mois)
  - Coût (variable selon commune)
- Trouver des professionnels
  - Architecte (tarif : 8-12% du budget)
  - Entreprises de construction
  - Bureau d'études
  - Contrôleur technique
- Budget de construction
  - Coût au m² : 150.000-350.000 FCFA
  - Villa R+1 (150m²) : 25-50M FCFA
  - Frais annexes : 15-20%
- Suivi du chantier
  - Planning travaux
  - Réception travaux
  - Garanties (décennale, biennale)
- Normes de construction sénégalaises
- Assurances chantier

**Étapes** :
1. Achat terrain (3-6M FCFA/100m²)
2. Plans architecte (2-3M FCFA)
3. Permis (300K-1M FCFA)
4. Gros œuvre (12-18M)
5. Second œuvre (8-12M)
6. Finitions (5-8M)
7. VRD et aménagements (2-4M)

**Total villa 150m²** : **30-50M FCFA**

---

## 🎯 Template Unifié pour tous les guides

Chaque guide suit cette structure:

```tsx
'use client';

import Link from 'next/link';

export default function GuideXXXPage() {
    return (
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 24px' }}>
            {/* Breadcrumb */}
            <div style={{ marginBottom: '30px', fontSize: '14px', color: '#666' }}>
                <Link href="/guides" style={{ color: '#006AFF' }}>← Retour aux guides</Link>
            </div>

            {/* Header avec icône */}
            <div style={{ marginBottom: '40px', textAlign: 'center' }}>
                <div style={{ fontSize: '64px', marginBottom: '20px' }}>[ICON]</div>
                <h1 style={{ fontSize: '42px', fontWeight: 'bold', color: '#1B254B', marginBottom: '16px' }}>
                    [TITRE DU GUIDE]
                </h1>
                <p style={{ fontSize: '18px', color: '#666', lineHeight: '1.6' }}>
                    [DESCRIPTION]
                </p>
                <div style={{ marginTop: '20px', display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <span style={{ padding: '6px 16px', background: '#E6F2FF', color: '#006AFF', borderRadius: '20px', fontSize: '14px', fontWeight: '500' }}>
                        ⏱️  Temps de lecture : [X] min
                    </span>
                    <span style={{ padding: '6px 16px', background: '#E6F8F1', color: '#05CD99', borderRadius: '20px', fontSize: '14px', fontWeight: '500' }}>
                        ✅ Conforme [LÉGISLATION]
                    </span>
                    <span style={{ padding: '6px 16px', background: '#FFF7E6', color: '#FFB547', borderRadius: '20px', fontSize: '14px', fontWeight: '500' }}>
                        📅 Mis à jour 2025
                    </span>
                </div>
            </div>

            {/* Table des matières */}
            <div style={{ background: '#F9FAFB', padding: '30px', borderRadius: '12px', marginBottom: '40px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px', color: '#1B254B' }}>
                    📋 Table des Matières
                </h2>
                <ol style={{ marginLeft: '20px', lineHeight: '2' }}>
                    {/* SECTIONS ICI */}
                </ol>
            </div>

            {/* Contenu des sections */}
            <div style={{ fontSize: '16px', lineHeight: '1.8', color: '#333' }}>
                {/* SECTIONS DÉTAILLÉES */}
            </div>

            {/* CTA final */}
            <div style={{ marginTop: '60px', padding: '40px', background: 'linear-gradient(135deg, #006AFF 0%, #0052CC 100%)', borderRadius: '16px', color: 'white', textAlign: 'center' }}>
                <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '20px' }}>
                    [CTA TITRE]
                </h2>
                <p style={{ fontSize: '18px', marginBottom: '30px', opacity: 0.9' }}>
                    [CTA DESCRIPTION]
                </p>
                <Link 
                    href="/[LIEN]"
                    style={{ 
                        display: 'inline-block', 
                        padding: '16px 40px', 
                        background: 'white', 
                        color: '#006AFF', 
                        borderRadius: '12px', 
                        fontWeight: 'bold',
                        fontSize: '18px',
                        textDecoration: 'none',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
                    }}
                >
                    [CTA BOUTON] →
                </Link>
            </div>
        </div>
    );
}
```

---

## 📊 Statistiques

- **Guide Acheteur** : ✅ Créé (150+ lignes)
- **Autres guides** : Contenu spécifié
- **Temps estimé** : 30 min/guide
- **Total** : ~800 lignes de contenu

---

## 🚀 Pour créer les autres guides

1. Copier le template ci-dessus
2. Remplacer [ICON], [TITRE], etc.
3. Ajouter les sections du contenu spécifié
4. Sauvegarder dans le bon dossier

**Exemple** :
```bash
src/app/guides/vendeur/page.tsx
src/app/guides/financement/page.tsx
src/app/guides/juridique/page.tsx
src/app/guides/construction/page.tsx
```

---

## ✅ Ce qui est déjà fait

1. **Page d'accueil guides** : ✅ Liens fonctionnels
2. **Guide Acheteur** : ✅ Contenu complet
3. **Structure template** : ✅ Réutilisable
4. **Design cohérent** : ✅ Diwaan branding

---

**Voulez-vous que je crée les 4 autres guides maintenant ?** 🚀

Ou préférez-vous le faire vous-même en utilisant le contenu et le template fournis ?

---

© 2025 Diwaan - Guides Immobiliers
