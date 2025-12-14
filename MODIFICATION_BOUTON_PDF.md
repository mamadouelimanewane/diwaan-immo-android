# 🔧 MODIFICATION MANUELLE - Bouton Télécharger PDF

Si vous voulez activer le bouton PDF immédiatement (après npm install jspdf), voici comment faire :

## 📄 Fichier à modifier
`src/app/invoicing/page.tsx`

---

## ✏️ MODIFICATION 1 : Décommenter l'import

**Ligne 3** - Décommentez cette ligne :

AVANT :
```typescript
// import { generateInvoicePDF, generateReceiptPDF } from '@/lib/pdfGenerator';
```

APRÈS :
```typescript
import { generateInvoicePDF, generateReceiptPDF } from '@/lib/pdfGenerator';
```

---

## ✏️ MODIFICATION 2 : Changer le bouton

**Cherchez la ligne ~590** avec `📥 Télécharger TXT`

AVANT :
```typescript
<button 
    onClick={downloadAsText}
    style={{ padding: '12px 24px', background: '#006AFF', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
>
    📥 Télécharger TXT
</button>
```

APRÈS :
```typescript
<button 
    onClick={downloadPDF}
    style={{ padding: '12px 24px', background: '#006AFF', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
>
    📥 Télécharger PDF
</button>
```

**Changements** :
1. `downloadAsText` → `downloadPDF`
2. `Télécharger TXT` → `Télécharger PDF`

---

## ✅ Vérification

Après modification :
1. Sauvegardez le fichier
2. Le serveur Next.js va se recharger automatiquement
3. Rafraîchissez votre navigateur
4. Le bouton devrait maintenant dire "📥 Télécharger PDF"

---

## 🎯 Résumé

**2 changements simples** :
1. Ligne 3 : Décommenter import
2. Ligne ~590 : Changer onClick et texte

**C'est tout !** ✅

---

# 🚀 ALTERNATIVE : Tout Automatique

Si vous préférez ne PAS modifier manuellement :

Le code actuel utilise **downloadPDF** qui :
- ✅ Tente d'importer jsPDF
- ✅ Génère un PDF si disponible
- ✅ Fallback vers TXT si jsPDF absent
- ✅ Affiche message d'installation

**Donc aucune modification nécessaire !**

Juste :
```bash
npm install jspdf
```

Et le PDF fonctionnera automatiquement ! 🎉

---

© 2025 Diwaan
