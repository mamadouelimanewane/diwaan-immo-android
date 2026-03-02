'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, RotateCcw } from 'lucide-react';
import styles from './LegalAssistantChat.module.css';

// ─── Knowledge Base for rich mock responses ────────────────────────────────────
const LEGAL_KB: Record<string, string> = {
    'titre foncier': `📜 **Le Titre Foncier (TF)** est le document le plus sécurisé au Sénégal.\n\n• Il confère un droit de propriété **définitif et inattaquable** (Loi n° 2011-07 du 30 mars 2011).\n• Délivré par la **Conservation de la Propriété Foncière** (Direction des Impôts et Domaines).\n• Pour vérifier un TF, demandez un **État de droits réels** récent.\n• Moins de **3% des terres** au Sénégal disposent d'un TF.\n\n💡 **Conseil Diwaan :** Avant tout achat, exigez une copie certifiée du TF et vérifiez qu'il n'y a pas d'hypothèque inscrite.`,

    'domaine national': `📜 **Le Domaine National** (Loi n° 64-46 du 17 juin 1964)\n\nCette loi regroupe environ **95% des terres** du Sénégal, classées en 4 zones :\n\n1. **Zones urbaines** – Gérées par les communes\n2. **Zones classées** – Forêts et espaces protégés\n3. **Zones de terroir** – Terres agricoles et pastorales\n4. **Zones pionnières** – Réservées aux projets de développement\n\n⚠️ Les terres du Domaine National ne peuvent pas être vendues. On y obtient un **droit d'usage** par **délibération** du conseil municipal.\n\n💡 **Conseil Diwaan :** Si on vous propose un "terrain avec délibération", vous n'êtes pas propriétaire au sens juridique. Envisagez une procédure de **régularisation** vers un bail ou un TF.`,

    'bail': `📜 **Le Bail Foncier au Sénégal**\n\nIl existe plusieurs types de baux :\n\n• **Bail ordinaire** – Durée limitée (3, 6, 9 ans), renouvelable. Régi par le Code des Obligations Civiles et Commerciales (COCC).\n• **Bail emphytéotique** – Durée de 18 à 99 ans, sur le domaine privé de l'État (Loi n° 76-66).\n• **Bail commercial** – Protection du locataire commerçant (droit au renouvellement).\n\n🔄 **Transformation Bail → TF :**\nDepuis la Loi 2011-07, un bail peut être transformé en Titre Foncier si :\n- Le terrain est viabilisé et mis en valeur\n- Les redevances sont à jour\n- Demande auprès de la DGID\n\n💡 **Conseil Diwaan :** Vérifiez toujours la nature du bail (État ou privé) et le montant des redevances annuelles avant d'acheter une cession de bail.`,

    'nicad': `📜 **Le NICAD (Numéro d'Identification Cadastrale)**\n\nLe NICAD est l'identifiant unique de chaque parcelle dans le système cadastral sénégalais.\n\n• Il permet de localiser précisément un terrain sur le **plan cadastral national**.\n• Obligatoire pour toute transaction foncière formelle.\n• Délivré par la **Direction du Cadastre** (Ministère des Finances).\n\n📋 **Documents liés :**\n- Extrait de plan cadastral\n- Certificat d'urbanisme\n- État de droits réels\n\n💡 **Conseil Diwaan :** Un terrain sans NICAD est suspect. Exigez-le systématiquement pour toute acquisition.`,

    'notaire': `📜 **Frais de Notaire au Sénégal**\n\nLes frais se décomposent ainsi :\n\n| Poste | Terrain Nu | Bien Bâti |\n|-------|-----------|----------|\n| Droits d'enregistrement | 10% | 5% |\n| Émoluments notaire | 3-5% | 3-5% |\n| Conservation foncière | 1-2% | 1-2% |\n| **Total approximatif** | **15-17%** | **10-12%** |\n\n📌 **Barème CGI (Code Général des Impôts) :** Les droits de mutation sont calculés sur les **valeurs vénales** fixées par arrêté ministériel pour chaque zone.\n\n💡 **Conseil Diwaan :** Pour un bien à 50M CFA, prévoyez environ 5 à 8,5M CFA de frais. Demandez un devis détaillé au notaire avant signature.`,

    'mutation': `📜 **La Mutation Foncière**\n\nLa mutation est le transfert officiel d'un Titre Foncier d'un propriétaire à un autre.\n\n📋 **Étapes de la procédure :**\n1. Rédaction de l'acte de vente par le **notaire**\n2. Paiement des **droits d'enregistrement** (Direction des Impôts)\n3. Publication au **Journal Officiel** (30 jours d'opposition)\n4. Inscription à la **Conservation Foncière**\n5. Délivrance du **nouveau Titre Foncier**\n\n⏱️ **Délai moyen :** 3 à 6 mois\n💰 **Coût :** Environ 15% de la valeur du bien\n\n💡 **Conseil Diwaan :** Ne payez jamais la totalité avant l'inscription au livre foncier. Utilisez un séquestre chez le notaire.`,

    'permis de construire': `📜 **Le Permis de Construire au Sénégal** (Code de l'Urbanisme 2023 – Loi n° 2023-20)\n\n📋 **Dossier à fournir :**\n- Copie du Titre Foncier ou du Bail\n- Plans architecturaux signés par un architecte agréé\n- Certificat d'urbanisme (validité 1 an)\n- Attestation de conformité aux normes parasismiques\n\n📋 **Procédure :**\n1. Dépôt à la **mairie** de la commune\n2. Instruction par le **service d'urbanisme** (45 jours)\n3. Avis de la commission d'urbanisme\n4. Délivrance ou refus motivé\n\n⚠️ **Sanctions :** Construire sans permis expose à :\n- Amende de 500 000 à 5 000 000 FCFA\n- Démolition ordonnée par le juge\n- Emprisonnement possible (récidive)\n\n💡 **Conseil Diwaan :** Un architecte agréé CNOA est obligatoire pour toute construction de plus de 20m².`,

    'expropriation': `📜 **L'Expropriation pour Utilité Publique**\n\nRégie par la Loi n° 76-67 du 2 juillet 1976.\n\n📋 **Conditions :**\n- Déclarée par **décret présidentiel**\n- Doit être justifiée par l'**intérêt général**\n- Indemnisation **juste et préalable** obligatoire\n\n📋 **Droits du propriétaire :**\n- Être informé par notification\n- Contester devant le juge de l'expropriation\n- Recevoir une indemnité fixée par commission ou tribunal\n\n💡 **Conseil Diwaan :** Si votre terrain est visé, consultez immédiatement un avocat spécialisé. Vous avez des droits !`,

    'copropriété': `📜 **La Copropriété au Sénégal**\n\nRégie par la Loi n° 88-04 du 16 juin 1988.\n\n• L'immeuble est divisé en **lots privatifs** et **parties communes**.\n• Chaque copropriétaire reçoit un **Titre Foncier individuel** pour son lot.\n• Le règlement de copropriété est obligatoire.\n\n📋 **Organes de gestion :**\n- Assemblée Générale des copropriétaires\n- Syndic de copropriété (professionnel ou bénévole)\n- Conseil syndical\n\n💰 **Charges :** Les charges communes (gardiennage, ascenseur, entretien) sont réparties selon les tantièmes de copropriété.\n\n💡 **Conseil Diwaan :** Avant d'acheter un appartement, vérifiez le règlement de copropriété et l'état des charges impayées.`,

    'viabilisation': `📜 **La Viabilisation d'un Terrain au Sénégal**\n\nUn terrain est "viabilisé" quand il dispose des raccordements aux réseaux :\n\n✅ **Eau** – Raccordement SDE/Sen'Eau\n✅ **Électricité** – Raccordement SENELEC\n✅ **Assainissement** – Réseau ONAS ou fosse septique\n✅ **Voirie** – Accès par route goudronnée ou piste praticable\n✅ **Télécom** – Fibre optique ou réseau mobile\n\n💰 **Coûts moyens de viabilisation :**\n- Eau : 150 000 – 300 000 FCFA\n- Électricité : 200 000 – 500 000 FCFA\n- Fosse septique : 500 000 – 1 500 000 FCFA\n\n💡 **Conseil Diwaan :** Un terrain non viabilisé est 30 à 50% moins cher, mais les coûts de raccordement peuvent être élevés. Calculez le coût total avant d'acheter.`,
};

const PROPERTY_KB: Record<string, string> = {
    'almadies': `🏠 **Les Almadies – Le quartier le plus prisé de Dakar**\n\n📍 Situé à la pointe ouest de la presqu'île du Cap-Vert, face à l'Atlantique.\n\n💰 **Prix indicatifs :**\n• Terrain : 800 000 – 1 500 000 FCFA/m²\n• Villa : 250M – 800M+ FCFA\n• Appartement : 150 000 – 400 000 FCFA/m²\n\n🏗️ Quartier résidentiel haut standing avec restaurants, ambassades et plages.\n\n💡 **Alternative plus accessible :** Si votre budget est serré, regardez **Ngor** ou **Yoff** (même proximité de la mer, prix 30-40% moins élevés).`,

    'ouakam': `🏠 **Ouakam – Quartier résidentiel et traditionnel**\n\n📍 Entre les Almadies et Mermoz, proche de la Mosquée de la Divinité.\n\n💰 **Prix indicatifs :**\n• Terrain : 300 000 – 600 000 FCFA/m²\n• Villa R+1 : 120M – 250M FCFA\n• Appartement 3P : 70 000 – 150 000 FCFA/mois\n\n🏗️ Mélange de quartier traditionnel lébou et résidences modernes.\n\n💡 **Alternative :** Pour un quartier similaire mais plus calme, essayez **Mermoz** ou **Sacré-Cœur**.`,

    'mermoz': `🏠 **Mermoz – Quartier résidentiel calme**\n\n📍 Centre de Dakar, proche de la VDN et de l'aéroport LSS.\n\n💰 **Prix indicatifs :**\n• Terrain : 250 000 – 500 000 FCFA/m²\n• Villa : 100M – 200M FCFA\n• Loyer F4 : 400 000 – 800 000 FCFA/mois\n\n🏗️ Mermoz-Sacré Cœur est un axe en pleine expansion immobilière.\n\n💡 **Atout :** Proximité du Centre Commercial Sea Plaza et de la VDN.`,

    'plateau': `🏠 **Le Plateau – Centre administratif et financier**\n\n📍 Cœur historique de Dakar, siège des institutions et des affaires.\n\n💰 **Prix indicatifs :**\n• Bureau : 15 000 – 30 000 FCFA/m²/mois\n• Appartement : 500 000 – 1 200 000 FCFA/mois\n\n🏗️ Idéal pour les professionnels, banques et ambassades.\n\n💡 **Alternative :** Pour un bureau moins cher, considérez **Point E** ou **Fann Hock**.`,

    'saly': `🏠 **Saly Portudal – Station balnéaire de la Petite Côte**\n\n📍 À 85 km de Dakar, entre Mbour et Ngaparou.\n\n💰 **Prix indicatifs :**\n• Terrain : 30 000 – 100 000 FCFA/m²\n• Villa avec piscine : 60M – 200M FCFA\n• Location vacances : 50 000 – 150 000 FCFA/nuit\n\n🏗️ Zone touristique avec plages, hôtels et résidences de vacances.\n\n💡 **Alternative :** Pour plus d'authenticité, regardez **Ngaparou** ou **Somone** (plus calme, moins touristique).`,

    'diamniadio': `🏠 **Diamniadio – La ville nouvelle du Sénégal**\n\n📍 À 30 km de Dakar, reliée par l'autoroute à péage et le TER.\n\n💰 **Prix indicatifs :**\n• Terrain : 15 000 – 50 000 FCFA/m²\n• Logement social : 10M – 25M FCFA\n• Villa : 40M – 100M FCFA\n\n🏗️ Pôle de développement avec le CICAD, le Stade Abdoulaye Wade et des zones industrielles.\n\n💡 **Atout :** Investissement à fort potentiel de plus-value grâce au TER (35 min du centre de Dakar).`,

    'mbour': `🏠 **Mbour – Capitale de la Petite Côte**\n\n📍 Ville côtière à 80 km de Dakar.\n\n💰 **Prix indicatifs :**\n• Terrain : 15 000 – 60 000 FCFA/m²\n• Villa : 30M – 120M FCFA\n• Appartement : 150 000 – 400 000 FCFA/mois\n\n🏗️ Ville en pleine expansion avec le marché aux poissons, les plages et une population croissante.\n\n💡 **Conseil Diwaan :** Vérifiez le plan d'urbanisme car certaines zones sont en cours de régularisation cadastrale.`,

    'thiès': `🏠 **Thiès – Deuxième ville du Sénégal**\n\n📍 À 70 km de Dakar, reliée par le TER.\n\n💰 **Prix indicatifs :**\n• Terrain : 8 000 – 30 000 FCFA/m²\n• Villa : 20M – 80M FCFA\n\n🏗️ Pôle universitaire et ferroviaire en plein développement.\n\n💡 **Atout :** Les prix sont 3 à 5 fois inférieurs à Dakar pour une qualité de vie comparable.`,
};

// ─── Smart Response Engine ──────────────────────────────────────────────────────
function generateSmartResponse(userText: string, _history: { role: string; content: string }[]): string {
    const lower = userText.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    // ── 1. Greetings ───────────────────────────────────────────
    if (/^(bonjour|salut|bonsoir|hello|hi|hey|coucou)/i.test(lower)) {
        return `Bonjour ! 👋 Je suis l'assistant Diwaan, expert en immobilier et droit foncier au Sénégal.\n\nJe peux vous aider à :\n🏠 Rechercher un bien (villa, appartement, terrain)\n⚖️ Comprendre le droit foncier (Titre Foncier, Bail, Domaine National)\n💰 Estimer les frais (notaire, mutation, viabilisation)\n📋 Expliquer les procédures (permis de construire, cadastre)\n\nQue puis-je faire pour vous ?`;
    }

    // ── 2. Thank you ───────────────────────────────────────────
    if (/^(merci|thanks|excellent|parfait|super|genial)/i.test(lower)) {
        return `Je vous en prie ! 😊 N'hésitez pas si vous avez d'autres questions sur l'immobilier ou le droit foncier au Sénégal. Je suis là pour vous accompagner dans votre projet.`;
    }

    // ── 3. Legal Knowledge Base – Check for specific legal topics ───
    const legalMatches: string[] = [];
    if (lower.includes('titre foncier') || (lower.includes('tf') && !lower.includes('certif'))) legalMatches.push('titre foncier');
    if (lower.includes('domaine national') || lower.includes('loi 64') || lower.includes('deliberation')) legalMatches.push('domaine national');
    if (lower.includes('bail') && !lower.includes('travail')) legalMatches.push('bail');
    if (lower.includes('nicad') || lower.includes('cadastr')) legalMatches.push('nicad');
    if (lower.includes('notaire') || lower.includes('frais') || lower.includes('enregistrement')) legalMatches.push('notaire');
    if (lower.includes('mutation') || lower.includes('transfert')) legalMatches.push('mutation');
    if (lower.includes('permis') || lower.includes('construire') || lower.includes('construction sans')) legalMatches.push('permis de construire');
    if (lower.includes('expropriation') || lower.includes('utilite publique')) legalMatches.push('expropriation');
    if (lower.includes('copropriete') || lower.includes('syndic') || lower.includes('charges communes')) legalMatches.push('copropriété');
    if (lower.includes('viabilis') || lower.includes('raccordement') || lower.includes('eau') || lower.includes('electricite')) legalMatches.push('viabilisation');

    if (legalMatches.length > 0) {
        const responses = legalMatches.map(key => LEGAL_KB[key]).filter(Boolean);
        return responses.join('\n\n---\n\n');
    }

    // ── 4. Property Search – Location detection ─────────────────
    const locationMap: Record<string, string> = {
        'almadies': 'almadies', 'les almadies': 'almadies',
        'ouakam': 'ouakam', 'mermoz': 'mermoz', 'plateau': 'plateau',
        'saly': 'saly', 'saly portudal': 'saly',
        'diamniadio': 'diamniadio', 'mbour': 'mbour', 'thies': 'thiès', 'thiès': 'thiès',
        'ngor': 'almadies', 'yoff': 'almadies',
        'sacre-coeur': 'mermoz', 'sacre coeur': 'mermoz',
        'point e': 'plateau', 'fann': 'plateau',
    };

    let detectedLocation: string | null = null;
    for (const [term, key] of Object.entries(locationMap)) {
        if (lower.includes(term)) {
            detectedLocation = key;
            break;
        }
    }

    // Property type detection
    const typeMap: Record<string, string> = {
        'villa': 'villa', 'maison': 'villa', 'keur': 'villa', 'r+1': 'villa', 'r+2': 'villa',
        'maison de luxe': 'villa', 'propriete': 'villa', 'grande maison': 'villa',
        'appartement': 'appartement', 'appart': 'appartement', 'studio': 'appartement',
        'f3': 'appartement', 'f4': 'appartement', 'standing': 'appartement',
        'terrain': 'terrain', 'parcelle': 'terrain', 'verger': 'terrain',
        'bureau': 'bureau', 'local commercial': 'bureau',
        'immeuble': 'immeuble', 'immeuble de rapport': 'immeuble',
    };

    let detectedType: string | null = null;
    for (const [term, type] of Object.entries(typeMap)) {
        if (lower.includes(term)) {
            detectedType = type;
            break;
        }
    }

    if (detectedLocation && PROPERTY_KB[detectedLocation]) {
        let response = PROPERTY_KB[detectedLocation];
        if (detectedType) {
            response = `Vous recherchez un(e) **${detectedType}** dans ce quartier. Voici ce que je sais :\n\n${response}`;
        }
        response += `\n\nSouhaitez-vous que je vous mette en relation avec un agent spécialisé sur cette zone ?`;
        return response;
    }

    // ── 5. Budget-related questions ──────────────────────────────
    if (lower.includes('budget') || lower.includes('million') || lower.includes('prix') || lower.includes('combien') || lower.includes('cout') || lower.includes('cher')) {
        return `💰 **Estimation des Prix Immobiliers au Sénégal (2024-2025)**\n\n**Dakar Centre (Plateau, Mermoz, Fann) :**\n• Terrain : 200 000 – 600 000 FCFA/m²\n• Appartement F3 : 300 000 – 800 000 FCFA/mois\n\n**Dakar Premium (Almadies, Ngor) :**\n• Terrain : 800 000 – 1 500 000 FCFA/m²\n• Villa : 250M – 800M+ FCFA\n\n**Banlieue (Diamniadio, Rufisque) :**\n• Terrain : 15 000 – 50 000 FCFA/m²\n• Villa : 25M – 80M FCFA\n\n**Petite Côte (Saly, Mbour) :**\n• Terrain : 15 000 – 100 000 FCFA/m²\n• Villa vacances : 60M – 200M FCFA\n\nPour quel budget et quelle zone recherchez-vous ?`;
    }

    // ── 6. Procedural questions ──────────────────────────────────
    if (lower.includes('etape') || lower.includes('procedure') || lower.includes('comment acheter') || lower.includes('demarche') || lower.includes('processus')) {
        return `📋 **Procédure d'Achat Immobilier au Sénégal**\n\nVoici les étapes clés :\n\n**1. Recherche et visite**\n   Identifiez le bien et vérifiez son emplacement.\n\n**2. Vérifications juridiques**\n   • Demandez le Titre Foncier ou le Bail\n   • Vérifiez le NICAD au cadastre\n   • Demandez un état de droits réels à la conservation\n\n**3. Négociation et accord**\n   • Signature d'une promesse de vente\n   • Versement d'un acompte (10-15% en général)\n\n**4. Passage chez le notaire**\n   • Rédaction de l'acte authentique\n   • Paiement des droits d'enregistrement\n\n**5. Mutation du titre**\n   • Inscription au livre foncier\n   • Délivrance du nouveau TF à votre nom\n\n⏱️ Durée totale : 2 à 6 mois\n\nSouhaitez-vous des détails sur une étape en particulier ?`;
    }

    // ── 7. General search intent with type but no location ───────
    if (detectedType && !detectedLocation) {
        return `Vous recherchez un(e) **${detectedType}**. C'est noté !\n\nPour mieux vous aider, j'aurais besoin de quelques précisions :\n\n📍 **Zone géographique ?** Dakar, Petite Côte, Thiès...\n💰 **Budget approximatif ?**\n🏗️ **État souhaité ?** Clé en main, gros œuvre, terrain nu...\n📐 **Surface souhaitée ?**\n\nDites-moi et je vous orienterai vers les meilleures options.`;
    }

    // ── 8. General search intent with location but no type ───────
    if (detectedLocation && !detectedType) {
        if (PROPERTY_KB[detectedLocation]) {
            return `Vous vous intéressez à cette zone. Voici ce que j'en sais :\n\n${PROPERTY_KB[detectedLocation]}\n\nQuel type de bien recherchez-vous ? Villa, appartement, terrain, bureau ?`;
        }
    }

    // ── 9. Alternative / comparison questions ────────────────────
    if (lower.includes('alternative') || lower.includes('moins cher') || lower.includes('comparable') || lower.includes('equivalent') || lower.includes('similaire')) {
        return `💡 **Alternatives Immobilières au Sénégal**\n\nVoici les meilleures alternatives par zone :\n\n| Zone Premium | Alternative | Économie |\n|-------------|-------------|----------|\n| Almadies | Ngor, Yoff | -30 à -40% |\n| Mermoz | Sacré-Cœur, Fann | -20 à -30% |\n| Plateau | Point E, Fann Hock | -25% |\n| Saly | Ngaparou, Somone | -20 à -30% |\n| Dakar | Diamniadio (TER) | -70 à -80% |\n\nQuelle zone vous intéresse en priorité ?`;
    }

    // ── 10. Loi / Regulation questions ────────────────────────────
    if (lower.includes('loi') || lower.includes('regle') || lower.includes('legislation') || lower.includes('decret') || lower.includes('arrete') || lower.includes('code')) {
        return `📜 **Corpus Juridique Foncier du Sénégal**\n\nVoici les textes fondamentaux :\n\n**Lois :**\n• Loi n° 64-46 (17 juin 1964) – Domaine National\n• Loi n° 76-66 (2 juillet 1976) – Code du Domaine de l'État\n• Loi n° 2011-07 (30 mars 2011) – Régime de la Propriété Foncière\n• Loi n° 2023-20 – Code de l'Urbanisme\n• Loi n° 88-04 – Copropriété\n\n**Décrets :**\n• Décret du 26 juillet 1932 – Organisation de la propriété foncière\n• Décret n° 72-1288 – Affectation et désaffectation des terres\n• Décret n° 2009-1450 – Réglementation urbanisme\n\n**Arrêtés :**\n• Arrêtés ministériels fixant les valeurs vénales par zone\n• Arrêtés communaux de permis de construire\n\nSur quel texte souhaitez-vous des explications détaillées ?`;
    }

    // ── 11. Agent / Contact questions ─────────────────────────────
    if (lower.includes('agent') || lower.includes('contact') || lower.includes('visite') || lower.includes('rendez')) {
        return `👤 **Mise en Contact avec un Agent Diwaan**\n\nNous pouvons vous mettre en relation avec un agent spécialisé :\n\n• 📞 Agents Dakar : Spécialisés Almadies, Mermoz, Plateau\n• 📞 Agents Petite Côte : Spécialisés Saly, Mbour, Ngaparou\n• 📞 Agents Thiès / Diamniadio\n\nPour être recontacté, précisez :\n1. La zone qui vous intéresse\n2. Votre budget approximatif\n3. Le type de bien souhaité\n\nUn agent vous rappellera dans les 24h.`;
    }

    // ── 12. Fallback – Generic helpful response ─────────────────
    return `Merci pour votre question ! Je suis spécialisé en immobilier et droit foncier au Sénégal.\n\nVoici ce que je peux vous aider à faire :\n\n🏠 **Recherche immobilière** – Dites-moi le type de bien et la zone (ex: "villa à Ouakam")\n⚖️ **Droit foncier** – Posez-moi une question sur les titres fonciers, les baux, le domaine national\n💰 **Estimation de coûts** – Frais de notaire, prix par zone, coûts de viabilisation\n📋 **Procédures** – Permis de construire, mutation, transformation de bail\n\nN'hésitez pas à reformuler votre question, je ferai de mon mieux pour vous aider !`;
}

// ─── Component ──────────────────────────────────────────────────────────────────
export default function LegalAssistantChat() {
    const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([
        { content: 'Bonjour ! 👋 Je suis votre assistant immobilier et juridique Diwaan. Posez-moi vos questions sur le droit foncier, les prix, les procédures ou recherchez un bien au Sénégal.', role: 'assistant' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(true);
    const [suggestionCategory, setSuggestionCategory] = useState<string>('Dakar');

    const suggestedCategories: Record<string, string[]> = {
        'Dakar': [
            "Villa avec piscine à Ouakam",
            "Prix aux Almadies ?",
            "Studio climatisé à Mermoz",
            "Bureau au Plateau",
            "Alternative moins chère à Ngor"
        ],
        'Petite Côte': [
            "Villa vacances à Saly",
            "Terrain bord de mer Mbour",
            "Investir à Ngaparou ?",
            "Maison Somone proche lagune",
            "Prix terrain Saly Portudal"
        ],
        'Juridique': [
            "C'est quoi un Titre Foncier ?",
            "Frais de notaire pour une villa",
            "Différence Bail et TF ?",
            "Comment obtenir un permis de construire ?",
            "Qu'est-ce que le Domaine National ?",
            "C'est quoi le NICAD ?",
            "Étapes pour acheter un terrain"
        ],
        'Budget': [
            "Prix des terrains à Diamniadio",
            "Villa à moins de 100 millions ?",
            "Combien coûte une mutation ?",
            "Viabilisation d'un terrain coût ?",
            "Quartier le moins cher à Dakar"
        ]
    };

    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const resetChat = () => {
        setMessages([
            { content: 'Bonjour ! 👋 Je suis votre assistant immobilier et juridique Diwaan. Posez-moi vos questions sur le droit foncier, les prix, les procédures ou recherchez un bien au Sénégal.', role: 'assistant' }
        ]);
        setInput('');
        setIsLoading(false);
        setShowSuggestions(true);
    };

    const handleSuggestionClick = (q: string) => {
        setInput(q);
        setShowSuggestions(false);
        // Auto-send
        setTimeout(() => {
            const fakeEvent = { preventDefault: () => { } } as React.FormEvent;
            handleSendDirect(q);
        }, 100);
    };

    const handleSendDirect = async (text: string) => {
        if (!text.trim() || isLoading) return;
        const userMsg = { content: text, role: 'user' as const };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsLoading(true);

        try {
            if (!process.env.NEXT_PUBLIC_OPENAI_API_KEY) {
                setTimeout(() => {
                    const botText = generateSmartResponse(text, [...messages, userMsg]);
                    setMessages(prev => [...prev, { content: botText, role: 'assistant' }]);
                    setIsLoading(false);
                }, 800);
                return;
            }

            const { getChatCompletion } = await import('@/lib/openai');
            const history = [...messages, userMsg].map(m => ({
                role: m.role as 'user' | 'assistant' | 'system',
                content: m.content
            }));
            const response = await getChatCompletion(history);
            if (response === null) throw new Error("API Response was null");
            setMessages(prev => [...prev, { content: response || "Je n'ai pas compris.", role: 'assistant' }]);
        } catch (err) {
            console.error(err);
            const fallback = generateSmartResponse(text, messages);
            setMessages(prev => [...prev, { content: fallback, role: 'assistant' }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;
        handleSendDirect(input);
    };

    // Render markdown-like formatting
    const renderContent = (text: string) => {
        const parts = text.split(/(\*\*[^*]+\*\*)/g);
        return parts.map((part, i) => {
            if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={i}>{part.slice(2, -2)}</strong>;
            }
            return <span key={i}>{part}</span>;
        });
    };

    return (
        <div className={styles.container}>
            <div className={styles.messages}>
                <div style={{ display: 'flex', justifyContent: 'flex-end', paddingBottom: '10px' }}>
                    <button onClick={resetChat} className={styles.resetBtn} title="Réinitialiser la conversation">
                        <RotateCcw size={14} style={{ marginRight: '4px' }} /> Nouveau chat
                    </button>
                </div>
                {messages.map((msg, idx) => (
                    <div key={idx} className={`${styles.message} ${msg.role === 'assistant' ? styles.bot : styles.user}`}>
                        <div className={styles.avatar}>
                            {msg.role === 'assistant' ? <Bot size={18} /> : <User size={18} />}
                        </div>
                        <div className={styles.content}>
                            {renderContent(msg.content)}
                        </div>
                    </div>
                ))}

                {isLoading && (
                    <div className={`${styles.message} ${styles.bot}`}>
                        <div className={styles.avatar}>
                            <Bot size={18} />
                        </div>
                        <div className={styles.content}>
                            <span className={styles.typingIndicator}>
                                <span></span><span></span><span></span>
                            </span>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {showSuggestions && (
                <div className={styles.suggestionsContainer}>
                    <div className={styles.suggestionTabs}>
                        {Object.keys(suggestedCategories).map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSuggestionCategory(cat)}
                                className={`${styles.tabBtn} ${suggestionCategory === cat ? styles.activeTab : ''}`}
                            >
                                {cat === 'Dakar' ? '🏘️ ' : cat === 'Petite Côte' ? '🏖️ ' : cat === 'Juridique' ? '⚖️ ' : '💰 '}{cat}
                            </button>
                        ))}
                    </div>
                    <div className={styles.suggestions}>
                        {suggestedCategories[suggestionCategory].map((q, i) => (
                            <button key={i} onClick={() => handleSuggestionClick(q)} className={styles.suggestionBtn}>
                                {q}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            <form onSubmit={handleSend} className={styles.inputArea}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => { setInput(e.target.value); setShowSuggestions(false); }}
                    placeholder="Ex: C'est quoi un Titre Foncier ? / Villa à Ouakam..."
                    className={styles.input}
                    disabled={isLoading}
                />
                <button type="submit" className={styles.sendBtn} disabled={isLoading || !input.trim()}>
                    <Send size={20} />
                </button>
            </form>
        </div>
    );
}
