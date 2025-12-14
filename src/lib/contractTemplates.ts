// MODÈLES DE CONTRATS - LÉGISLATION SÉNÉGALAISE, UEMOA, OHADA
// Conformes au Code Civil, Code de Commerce, et Actes Uniformes OHADA

export const contractTemplates = {

    // 1. CONTRAT DE VENTE IMMOBILIÈRE
    vente: (data: any) => `
═══════════════════════════════════════════════════════════════════════════════
                        CONTRAT DE VENTE IMMOBILIÈRE
                     (Conforme au Code Civil Sénégalais)
═══════════════════════════════════════════════════════════════════════════════

ENTRE LES SOUSSIGNÉS :

I. LE VENDEUR

Nom et Prénom(s) : ${data.sellerName || '[NOM ET PRÉNOM DU VENDEUR]'}
Domicilié(e) à : ${data.sellerAddress || '[ADRESSE COMPLÈTE]'}
Né(e) le : [DATE DE NAISSANCE] à [LIEU]
Nationalité : [NATIONALITÉ]
Profession : [PROFESSION]
CNI N° : [NUMÉRO CNI] délivrée le [DATE] à [LIEU]

Ci-après désigné « LE VENDEUR »

D'UNE PART,

ET

II. L'ACHETEUR

Nom et Prénom(s) : ${data.buyerName || '[NOM ET PRÉNOM DE L\'ACHETEUR]'}
Domicilié(e) à : ${data.buyerAddress || '[ADRESSE COMPLÈTE]'}
Né(e) le : [DATE DE NAISSANCE] à [LIEU]
Nationalité : [NATIONALITÉ]
Profession : [PROFESSION]
CNI N° : [NUMÉRO CNI] délivrée le [DATE] à [LIEU]

Ci-après désigné « L'ACHETEUR »

D'AUTRE PART,

Il a été convenu et arrêté ce qui suit :

═══════════════════════════════════════════════════════════════════════════════
                                 ARTICLE 1 - OBJET
═══════════════════════════════════════════════════════════════════════════════

Le vendeur déclare vendre à l'acheteur qui accepte, la propriété ci-après désignée :

DÉSIGNATION DU BIEN :

Adresse : ${data.propertyAddress || '[ADRESSE DU BIEN]'}
Commune/Département : [COMMUNE/DÉPARTEMENT]
Région : [RÉGION]

Nature du bien : [Maison individuelle / Appartement / Villa / Terrain / Local commercial]
Superficie totale : ${data.sqft || '[SURFACE]'} m²

CONSISTANCE DU BIEN :

Au sol :
- [Description détaillée : nombre d'étages, sous-sol, etc.]

Composition :
- Nombre de pièces principales : ${data.beds || '[NOMBRE]'}
- Nombre de chambres : ${data.beds || '[NOMBRE]'}
- Nombre de salles d'eau : ${data.baths || '[NOMBRE]'}
- [Autres dépendances : garage, jardin, terrasse, etc.]

TITRE DE PROPRIÉTÉ :

Titre Foncier N° : [NUMÉRO TF]
Section : [SECTION]
Parcelle N° : [NUMÉRO PARCELLE]
Lot N° : [NUMÉRO LOT]
Référence cadastrale : [RÉFÉRENCE]

Enregistré à la Conservation Foncière de [VILLE] le [DATE]

═══════════════════════════════════════════════════════════════════════════════
                            ARTICLE 2 - PRIX DE VENTE
═══════════════════════════════════════════════════════════════════════════════

Le prix de vente est fixé à la somme de :

${data.price ? parseInt(data.price).toLocaleString() : '[MONTANT]'} FCFA

Soit : ${data.price ? convertNumberToWords(parseInt(data.price)) : '[MONTANT EN LETTRES]'} francs CFA

Ce prix a été librement débattu entre les parties.

═══════════════════════════════════════════════════════════════════════════════
                       ARTICLE 3 - CONDITIONS DE PAIEMENT
═══════════════════════════════════════════════════════════════════════════════

Le prix sera payé comme suit :

1° ACOMPTE :
- À la signature du présent acte : ${data.price ? (parseInt(data.price) * 0.1).toLocaleString() : '[MONTANT]'} FCFA (10%)
- Mode de paiement : [Chèque / Virement / Autre]
- Date : ${data.date || '[DATE]'}

2° SOLDE :
- À la remise des clés : ${data.price ? (parseInt(data.price) * 0.9).toLocaleString() : '[MONTANT]'} FCFA (90%)
- Au plus tard le : [DATE LIMITE]
- Mode de paiement : [Chèque certifié / Virement bancaire]

L'acheteur reconnaît avoir pris connaissance des modalités de paiement et s'engage à les respecter.

═══════════════════════════════════════════════════════════════════════════════
                         ARTICLE 4 - GARANTIE DU VENDEUR
═══════════════════════════════════════════════════════════════════════════════

Le vendeur déclare et garantit :

a) Qu'il est seul et unique propriétaire du bien vendu ;

b) Que le bien est libre de toute hypothèque, privilège, servitude non déclarée, saisie ou autre charge quelconque ;

c) Qu'aucune action judiciaire n'est en cours concernant le bien ;

d) Que les impôts et taxes afférents au bien ont été régulièrement acquittés jusqu'à ce jour ;

e) Qu'il n'existe aucun litige avec les voisins ou tiers concernant le bien ;

f) Que le bien est conforme aux règles d'urbanisme et de construction en vigueur ;

g) Qu'il garantit l'Acheteur contre tout trouble ou éviction conformément aux articles 1599 et suivants du Code Civil.

═══════════════════════════════════════════════════════════════════════════════
                           ARTICLE 5 - ÉTAT DU BIEN
═══════════════════════════════════════════════════════════════════════════════

Le bien est vendu dans l'état où il se trouve au jour de la visite par l'acheteur, celui-ci déclarant bien le connaître pour l'avoir visité et examiné.

L'acheteur déclare avoir pris connaissance de toutes les caractéristiques essentielles du bien et l'accepte en l'état.

Aucune garantie n'est due par le vendeur pour les vices apparents que l'acheteur a pu constater par lui-même.

═══════════════════════════════════════════════════════════════════════════════
                      ARTICLE 6 - FRAIS ET DROITS D'ENREGISTREMENT
═══════════════════════════════════════════════════════════════════════════════

Les frais et droits ci-après sont à la charge de l'ACHETEUR :

1. Droits d'enregistrement : 10% du prix de vente soit ${data.price ? (parseInt(data.price) * 0.1).toLocaleString() : '[MONTANT]'} FCFA

2. Frais de notaire : Suivant tarif officiel (approximativement 2% à 1%)
   - Tranche 0-10 millions : 2%
   - Tranche 10-50 millions : 1%
   - Au-delà de 50 millions : 0,5%

3. Frais de Conservation Foncière pour l'inscription

4. Honoraires géomètre (si bornage nécessaire)

5. Frais de copie et timbres fiscaux

TOTAL ESTIMATIF DES FRAIS : ${data.price ? (parseInt(data.price) * 0.15).toLocaleString() : '[MONTANT]'} FCFA

═══════════════════════════════════════════════════════════════════════════════
                        ARTICLE 7 - TRANSFERT DE PROPRIÉTÉ
═══════════════════════════════════════════════════════════════════════════════

Le transfert de propriété s'opérera :
- Pour les meubles : à la remise des clés
- Pour les immeubles : après accomplissement des formalités d'enregistrement et d'inscription à la Conservation Foncière

Toutefois, les risques et charges incombant à la propriété seront transférés à l'acheteur à compter de la remise matérielle des clés.

═══════════════════════════════════════════════════════════════════════════════
                           ARTICLE 8 - JOUISSANCE
═══════════════════════════════════════════════════════════════════════════════

L'acheteur aura la jouissance effective du bien à compter du : [DATE]

À cette date, le vendeur s'engage à :
- Remettre les clés du bien
- Libérer complètement les lieux
- Remettre tous documents utiles (plans, garanties équipements, etc.)

═══════════════════════════════════════════════════════════════════════════════
                       ARTICLE 9 - CHARGES ET CONDITIONS
═══════════════════════════════════════════════════════════════════════════════

La vente est consentie et acceptée sous les charges et conditions ordinaires et de droit, notamment :

- Les servitudes actives et passives, apparentes ou occultes, continues ou discontinues
- Le respect du règlement de copropriété le cas échéant
- Le respect des règles d'urbanisme en vigueur

═══════════════════════════════════════════════════════════════════════════════
                     ARTICLE 10 - CLAUSE DE NON-CONCURRENCE
═══════════════════════════════════════════════════════════════════════════════

Le vendeur s'interdit, pendant une durée de [DURÉE], d'exercer une activité similaire dans un rayon de [DISTANCE] km autour du bien vendu (le cas échéant pour local commercial).

═══════════════════════════════════════════════════════════════════════════════
                       ARTICLE 11 - CLAUSE RÉSOLUTOIRE
═══════════════════════════════════════════════════════════════════════════════

À défaut de paiement du solde du prix à l'échéance convenue, la présente vente sera résolue de plein droit si bon semble au vendeur, conformément à l'article 1654 du Code Civil.

En cas de résolution, l'acompte versé restera acquis au vendeur à titre de dommages et intérêts, sans préjudice de tous autres droits.

═══════════════════════════════════════════════════════════════════════════════
                        ARTICLE 12 - DÉCLARATIONS FISCALES
═══════════════════════════════════════════════════════════════════════════════

Les parties déclarent que le présent acte contient l'expression sincère et complète du prix de vente.

Le vendeur s'engage à déclarer cette vente aux services fiscaux conformément à la législation en vigueur.

═══════════════════════════════════════════════════════════════════════════════
                            ARTICLE 13 - ÉLECTION DE DOMICILE
═══════════════════════════════════════════════════════════════════════════════

Pour l'exécution des présentes et de leurs suites, les parties font élection de domicile en leurs demeures respectives ci-dessus indiquées.

═══════════════════════════════════════════════════════════════════════════════
                       ARTICLE 14 - ATTRIBUTION DE COMPÉTENCE
═══════════════════════════════════════════════════════════════════════════════

Tout litige relatif à l'interprétation ou à l'exécution du présent contrat sera de la compétence exclusive des Tribunaux de [VILLE], nonobstant pluralité de défendeurs ou appel en garantie.

═══════════════════════════════════════════════════════════════════════════════
                                 PRISE D'EFFET
═══════════════════════════════════════════════════════════════════════════════

Le présent contrat prend effet à compter de sa signature par les parties, soit le ${data.date || '[DATE]'}.

Fait à Dakar, le ${new Date().toLocaleDateString('fr-FR')}

En QUATRE (4) exemplaires originaux dont :
- Un (1) pour le Vendeur
- Un (1) pour l'Acheteur
- Un (1) pour l'enregistrement
- Un (1) pour la Conservation Foncière


LE VENDEUR                                    L'ACHETEUR
(Lu et approuvé)                              (Lu et approuvé)
(Signature précédée de la mention             (Signature précédée de la mention
"Bon pour accord")                            "Bon pour accord")


_____________________________                 _____________________________



═══════════════════════════════════════════════════════════════════════════════
                            MENTIONS LÉGALES
═══════════════════════════════════════════════════════════════════════════════

✓ Conforme au Code Civil du Sénégal (Loi 61-10 du 7 mars 1961)
✓ Conforme à la Loi sur le Régime Foncier (Loi 2011-07 du 30 mars 2011) 
✓ Droits d'enregistrement : 10% (Article 348 du Code Général des Impôts)
✓ Document devant être OBLIGATOIREMENT authentifié par NOTAIRE

⚠️  IMPORTANT : Ce contrat doit impérativement être authentifié par un notaire pour être opposable aux tiers et pour permettre l'inscription à la Conservation Foncière.

───────────────────────────────────────────────────────────────────────────────
Document généré par Diwaan - Assistance Juridique IA
Date de génération : ${new Date().toLocaleString('fr-FR')}
Référence : ${data.invoiceNumber || 'CONT-' + Date.now()}
───────────────────────────────────────────────────────────────────────────────
`,


    // 2. BAIL DE LOCATION RÉSIDENTIELLE
    location: (data: any) => `
═══════════════════════════════════════════════════════════════════════════════
                          CONTRAT DE BAIL D'HABITATION
                   (Conforme à la Loi n°2011-07 du 30 mars 2011)
═══════════════════════════════════════════════════════════════════════════════

ENTRE LES SOUSSIGNÉS :

I. LE BAILLEUR

Nom et Prénom(s) : ${data.sellerName || '[NOM DU PROPRIÉTAIRE]'}
Domicilié(e) à : ${data.sellerAddress || '[ADRESSE DU PROPRIÉTAIRE]'}
CNI N° : [NUMÉRO CNI]
Téléphone : [TÉLÉPHONE]

Ci-après dénommé « LE BAILLEUR »

D'UNE PART,

ET

II. LE LOCATAIRE

Nom et Prénom(s) : ${data.buyerName || '[NOM DU LOCATAIRE]'}
Domicilié(e) à : ${data.buyerAddress || '[ADRESSE DU LOCATAIRE]'}
Né(e) le : [DATE] à [LIEU]
CNI N° : [NUMÉRO CNI]
Profession : [PROFESSION]
Téléphone : [TÉLÉPHONE]

Ci-après dénommé « LE LOCATAIRE »

D'AUTRE PART,

Il a été convenu et arrêté ce qui suit :

═══════════════════════════════════════════════════════════════════════════════
                       ARTICLE 1 - DÉSIGNATION DU LOCAL
═══════════════════════════════════════════════════════════════════════════════

Le Bailleur loue au Locataire qui accepte, un logement situé à :

Adresse : ${data.propertyAddress || '[ADRESSE COMPLÈTE DU BIEN]'}
Commune : [COMMUNE]
Quartier : [QUARTIER]

DESCRIPTION DU LOGEMENT :

Type : [Appartement / Villa / Studio / Chambre]
Étage : [ÉTAGE]
Superficie : ${data.sqft || '[SURFACE]'} m²

Composition :
- Nombre de pièces principales : ${data.beds || '[NOMBRE]'}
- Chambres : ${data.beds || '[NOMBRE]'}
- Salon(s) : [NOMBRE]
- Cuisine : [Équipée / Non équipée]
- Salles d'eau : ${data.baths || '[NOMBRE]'}
- WC : [NOMBRE]
- Autres dépendances : [Balcons, terrasse, cave, parking, etc.]

Équipements et installations :
☐ Climatisation
☐ Eau courante
☐ Électricité
☐ Gaz
☐ Téléphone
☐ Internet (Fibre/ADSL)
☐ Gardiennage
☐ Parking
☐ [Autres]

═══════════════════════════════════════════════════════════════════════════════
                         ARTICLE 2 - DURÉE DU BAIL
═══════════════════════════════════════════════════════════════════════════════

Le présent bail est consenti et accepté pour une durée de : [1 / 2 / 3] AN(S)

Commençant le : ${data.date || '[DATE DE DÉBUT]'}
Se terminant le : [DATE DE FIN]

À l'expiration de cette période, le bail se renouvellera par tacite reconduction pour une période identique, sauf dénonciation par l'une des parties dans les conditions prévues à l'article 11.

═══════════════════════════════════════════════════════════════════════════════
                             ARTICLE 3 - LOYER
═══════════════════════════════════════════════════════════════════════════════

Le loyer mensuel est fixé à la somme de :

${data.price ? parseInt(data.price).toLocaleString() : '[MONTANT]'} FCFA

Soit : ${data.price ? convertNumberToWords(parseInt(data.price)) : '[MONTANT EN LETTRES]'} francs CFA par mois

MODALITÉS DE PAIEMENT :

- Périodicité : Mensuelle, payable d'avance
- Date d'exigibilité : Le 1er de chaque mois
- Mode de paiement : [Virement / Chèque / Espèces / Mobile Money]

Coordonnées bancaires du Bailleur (si virement) :
Banque : [NOM BANQUE]
IBAN : [IBAN]
Titulaire : ${data.sellerName || '[NOM]'}

RETARD DE PAIEMENT :

Tout retard de paiement donnera lieu à l'application d'une pénalité de 1% par mois de retard, calculée sur la somme due, sans mise en demeure préalable.

═══════════════════════════════════════════════════════════════════════════════
                      ARTICLE 4 - RÉVISION DU LOYER
═══════════════════════════════════════════════════════════════════════════════

Le loyer pourra être révisé une fois par an, à la date anniversaire du bail, selon l'évolution de l'indice du coût de la vie publié par l'ANSD (Agence Nationale de la Statistique et de la Démographie).

L'augmentation annuelle ne pourra excéder 5% du loyer en cours.

Toute révision fera l'objet d'un préavis de trois (3) mois.

═══════════════════════════════════════════════════════════════════════════════
                       ARTICLE 5 - CHARGES LOCATIVES
═══════════════════════════════════════════════════════════════════════════════

En sus du loyer, le Locataire paiera les charges suivantes :

CHARGES RÉCUPÉRABLES :

☑ Eau (consommation personnelle)
☑ Électricité (consommation personnelle)  
☑ Ordures ménagères : [MONTANT] FCFA/mois
☑ Entretien espaces verts (copropriété) : [MONTANT] FCFA/mois
☑ Gardiennage (copropriété) : [MONTANT] FCFA/mois
☐ Autres : [PRÉCISER]

CHARGES NON RÉCUPÉRABLES (à la charge du Bailleur) :

☑ Taxe foncière
☑ Assurance propriétaire
☑ Gros travaux (toiture, façade, etc.)
☑ Entretien ascenseur (parties communes)

═══════════════════════════════════════════════════════════════════════════════
                     ARTICLE 6 - DÉPÔT DE GARANTIE
═══════════════════════════════════════════════════════════════════════════════

À la signature du présent bail, le Locataire verse au Bailleur une garantie d'un montant de :

${data.price ? (parseInt(data.price) * 2).toLocaleString() : '[MONTANT]'} FCFA

Correspondant à DEUX (2) mois de loyer.

Cette garantie ne porte pas intérêts et sera restituée au Locataire dans un délai maximum de DEUX (2) MOIS après la remise des clés et l'état des lieux de sortie, déduction faite, le cas échéant :

- Des loyers et charges impayés
- Des frais de désordres ou dégradations imputables au Locataire
- Des frais de remise en état du logement

La présente garantie ne peut être imputée sur le paiement des derniers loyers.

═══════════════════════════════════════════════════════════════════════════════
                    ARTICLE 7 - OBLIGATIONS DU LOCATAIRE
═══════════════════════════════════════════════════════════════════════════════

Le Locataire s'engage à :

1. USAGE DU LOCAL :
   - User des lieux paisiblement et en bon père de famille
   - N'y exercer aucune activité contraire à la destination du logement (usage d'habitation uniquement)
   - Respecter le règlement de copropriété le cas échéant

2. ENTRETIEN :
   - Maintenir les lieux en bon état d'entretien
   - Effectuer les réparations locatives à sa charge (article 606 Code Civil)
   - Supporter les menues réparations et l'entretien courant

3. ASSURANCE :
   - Souscrire une assurance multirisques habitation
   - Remettre l'attestation au Bailleur avant l'entrée dans les lieux
   - Renouveler annuellement cette assurance

4. TRAVAUX :
   - Ne faire aucune modification ou transformation sans accord écrit du Bailleur
   - Prévenir immédiatement le Bailleur de toute dégradation ou sinistre

5. ACCÈS AU LOGEMENT :
   - Laisser le Bailleur visiter le logement une fois par trimestre sur rendez-vous
   - En cas de vente ou relocation, permettre les visites avec préavis de 48h

6. VOISINAGE :
   - Ne causer aucun trouble de jouissance aux voisins
   - Respecter la tranquillité des lieux notamment entre 22h et 7h

7. SOUS-LOCATION :
   - S'abstenir de sous-louer sans autorisation écrite préalable du Bailleur
   - Toute sous-location non autorisée entraînera la résiliation du bail

═══════════════════════════════════════════════════════════════════════════════
                    ARTICLE 8 - OBLIGATIONS DU BAILLEUR
═══════════════════════════════════════════════════════════════════════════════

Le Bailleur s'engage à :

1. Délivrer au locataire un logement décent et en bon état d'usage et de réparation

2. Assurer la jouissance paisible du logement

3. Effectuer les grosses réparations (article 606 Code Civil) :
   - Murs principaux et voûtes
   - Rétablissement des poutres et toitures entières
   - Gros murs de soutènement et clôtures

4. Maintenir les équipements en état de fonctionnement

5. Ne pas s'opposer aux aménagements réalisés par le Locataire à ses frais (sous réserve d'accord préalable)

═══════════════════════════════════════════════════════════════════════════════
                        ARTICLE 9 - ÉTAT DES LIEUX
═══════════════════════════════════════════════════════════════════════════════

Un état des lieux contradictoire sera établi :

- À L'ENTRÉE : Dans les 8 jours suivant la remise des clés
- À LA SORTIE : Le jour de la restitution des clés

L'état des lieux d'entrée sera annexé au présent contrat.

En cas de désaccord, chaque partie peut demander la désignation d'un expert par le Président du Tribunal.

Les frais d'état des lieux sont partagés par moitié entre le Bailleur et le Locataire.

═══════════════════════════════════════════════════════════════════════════════
                      ARTICLE 10 - TRAVAUX DURANT LE BAIL
═══════════════════════════════════════════════════════════════════════════════

TRAVAUX DU BAILLEUR :

Le Bailleur peut faire exécuter tous travaux nécessaires à la conservation ou à l'entretien des lieux.

Si ces travaux durent plus de 21 jours, le loyer sera réduit proportionnellement à la durée et à l'importance des travaux.

TRAVAUX DU LOCATAIRE :

Le Locataire peut réaliser des aménagements à ses frais après accord écrit du Bailleur. 

En fin de bail, il devra :
- Soit remettre les lieux en état initial
- Soit, si le Bailleur le souhaite, laisser les aménagements sans indemnité

═══════════════════════════════════════════════════════════════════════════════
                       ARTICLE 11 - RÉSILIATION DU BAIL
═══════════════════════════════════════════════════════════════════════════════

RÉSILIATION PAR LE LOCATAIRE :

Le Locataire peut résilier le bail à tout moment en respectant un préavis de TROIS (3) MOIS par lettre recommandée avec accusé de réception.

Ce délai court à compter de la réception de la lettre par le Bailleur.

Toutefois, le préavis est réduit à UN (1) MOIS dans les cas suivants :
- Mutation professionnelle
- Perte d'emploi
- État de santé justifiant un changement de domicile
- Attribution d'un logement social

RÉSILIATION PAR LE BAILLEUR :

Le Bailleur ne peut résilier le bail qu'à son échéance en respectant un préavis de SIX (6) MOIS par lettre recommandée avec accusé de réception, et pour les motifs suivants :

- Reprise pour habiter personnellement le logement ou y loger un proche
- Motif légitime et sérieux (notamment inexécution par le Locataire de ses obligations)
- Vente du logement

═══════════════════════════════════════════════════════════════════════════════
                      ARTICLE 12 - CLAUSE RÉSOLUTOIRE
═══════════════════════════════════════════════════════════════════════════════

Le présent bail sera résilié de plein droit, sans qu'il soit besoin de recourir à une procédure judiciaire, en cas de :

- Non-paiement du loyer ou des charges aux termes convenus
- Non-souscription d'assurance habitation
- Trouble de jouissance causé aux voisins
- Usage du logement contraire à sa destination
- Défaut d'entretien manifeste du logement

Un mois après un commandement de payer ou d'exécuter demeuré infructueux, la clause résolutoire produira effet automatiquement.

═══════════════════════════════════════════════════════════════════════════════
                          ARTICLE 13 - ÉLECTION DE DOMICILE
═══════════════════════════════════════════════════════════════════════════════

Pour l'exécution des présentes, les parties font élection de domicile en leurs adresses respectives indiquées en tête du présent contrat.

═══════════════════════════════════════════════════════════════════════════════
                       ARTICLE 14 - LITIGES - COMPÉTENCE
═══════════════════════════════════════════════════════════════════════════════

Les litiges relatifs au présent bail relèvent de la compétence exclusive du Tribunal de [VILLE].

═══════════════════════════════════════════════════════════════════════════════
                                 PRISE D'EFFET
═══════════════════════════════════════════════════════════════════════════════

Fait à Dakar, le ${new Date().toLocaleDateString('fr-FR')}

En DEUX (2) exemplaires originaux.


LE BAILLEUR                                    LE LOCATAIRE
(Lu et approuvé)                               (Lu et approuvé)
(Bon pour bail de [DURÉE] an(s))              (Bon pour bail de [DURÉE] an(s))


_____________________________                  _____________________________


═══════════════════════════════════════════════════════════════════════════════
                              ANNEXES OBLIGATOIRES
═══════════════════════════════════════════════════════════════════════════════

☐ État des lieux d'entrée (contradictoire)
☐ Copie titre de propriété ou mandat de gestion
☐ Attestation d'assurance habitation du Locataire
☐ Copie CNI du Bailleur
☐ Copie CNI du Locataire
☐ Justificatifs de revenus du Locataire
☐ Règlement de copropriété (le cas échéant)

═══════════════════════════════════════════════════════════════════════════════
                              MENTIONS LÉGALES
═══════════════════════════════════════════════════════════════════════════════

✓ Conforme à la Loi n°2011-07 du 30 mars 2011 portant régime de la propriété foncière
✓ Articles 1708 et suivants du Code Civil sénégalais
✓ Décret n°2012-1315 du 13 décembre 2012 relatif aux baux d'habitation

⚠️  Le bailleur doit obligatoirement délivrer une QUITTANCE DE LOYER au locataire qui en fait la demande (Article 1715 Code Civil)

───────────────────────────────────────────────────────────────────────────────
Document généré par Diwaan - Assistance Juridique IA
Date : ${new Date().toLocaleString('fr-FR')}
Référence : ${data.invoiceNumber || 'BAIL-' + Date.now()}
───────────────────────────────────────────────────────────────────────────────
`,

    // Suite dans le prochain fichier...
};

// Fonction utilitaire pour conversion en lettres
function convertNumberToWords(num: number): string {
    if (num === 0) return "zéro";

    const units = ["", "un", "deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf"];
    const teens = ["dix", "onze", "douze", "treize", "quatorze", "quinze", "seize", "dix-sept", "dix-huit", "dix-neuf"];
    const tens = ["", "dix", "vingt", "trente", "quarante", "cinquante", "soixante", "soixante-dix", "quatre-vingt", "quatre-vingt-dix"];

    if (num < 10) return units[num];
    if (num < 20) return teens[num - 10];
    if (num < 100) {
        const ten = Math.floor(num / 10);
        const unit = num % 10;
        if (ten === 7 || ten === 9) {
            return tens[ten - 1] + "-" + teens[unit];
        }
        return tens[ten] + (unit > 0 ? "-" + units[unit] : "");
    }

    // Simplification pour grands nombres
    const millions = Math.floor(num / 1000000);
    const thousands = Math.floor((num % 1000000) / 1000);
    const rest = num % 1000;

    let result = "";
    if (millions > 0) result += millions + " million" + (millions > 1 ? "s" : "");
    if (thousands > 0) result += (result ? " " : "") + thousands + " mille";
    if (rest > 0) result += (result ? " " : "") + rest;

    return result;
}

export default contractTemplates;
