const fetch = require('node-fetch');

const questions = [
    // 1. Budget approximatif avec déduction de type (location mensuelle)
    "Je cherche un appart autour de 500 milles au Plateau.",

    // 2. Recherche par mot-clé et type approximatif ("Maison" -> HOUSE / VILLA)
    "As-tu une maison ou villa avec vue sur la mer vers Almadies ?",

    // 3. Critères multiples mais tolérance sur la recherche si rien n'est trouvé (piscine, Ngor)
    "Trouve moi une villa de luxe avec piscine à Ngor, budget autour de 2 millions par mois.",

    // 4. Recherche par quartier approximatif ou ville large
    "Je cherche un hébergement propre près de Mermoz pour ma famille avec au moins 3 chambres.",

    // 5. Questions d'investissement complexes et floues
    "Que me conseilles-tu d'acheter à Saly pour un budget de 50 à 70 millions ? Je veux un truc rentable.",

    // 6. Demande simple avec mots clés
    "Je veux louer un studio meublé pas très cher à Dakar",

    // 7. Demande en Wolof
    "Salaam aleekum, damay wut kër gu neex fële ca Diamniadio, lo ma mënë wax ?",

    // 8. Services de proximité
    "Y'a t-il des écoles internationales et des hôpitaux près de Mermoz ?",

    // 9. Procédures administratives
    "Quels sont les frais de notaire pour l'achat d'un terrain au Sénégal ?",

    // 10. Gestion des compteurs
    "Comment faire pour changer le nom du compteur Woyofal après mon aménagement ?",

    // 11. Comparaison de prix zones différentes
    "Vaut-il mieux investir à Diamniadio ou à Saly actuellement ?",

    // 12. Demande très floue "bord de l'eau"
    "Je rêve d'une villa au bord de l'eau, peu importe où, budget illimité.",

    // 13. Vérification juridique
    "Comment savoir si un terrain a un vrai Titre Foncier ?",

    // 14. Loyers et caution
    "Le proprio me demande 4 mois de caution, est-ce normal ?",

    // 15. Zone émergente
    "Pourquoi tout le monde parle de Diamniadio ?",
];

async function simulateQuestions() {
    console.log("=== Lancement des simulations multicritères approximatives ===");

    for (let i = 0; i < questions.length; i++) {
        const q = questions[i];
        console.log(`\n\n[Q${i + 1}] Utilisateur: "${q}"`);
        console.log("Patientez...");

        try {
            const response = await fetch('http://localhost:3001/api/ai/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: [{ role: 'user', content: q }] })
            });

            if (!response.ok) {
                console.error(`Erreur ${response.status}: ${response.statusText}`);
                continue;
            }

            const data = await response.json();
            console.log(`[Réponse Diwaan AI]:\n${data.message}`);

            if (data.data && data.data.length > 0) {
                console.log(`\n=> [${data.data.length} Propriété(s) proposée(s)]:`);
                data.data.forEach((p, idx) => {
                    console.log(`   ${idx + 1}. ${p.title} (${p.type}, ${p.transactionType}) - ${p.price} FCFA à ${p.city}`);
                });
            } else {
                console.log("\n=> [Aucune propriété spécifique n'a été retournée sour forme de carte]");
            }
        } catch (error) {
            console.error("Erreur de connexion:", error.message);
        }

        // Petite pause entre les requêtes pour ne pas surcharger le serveur de deepseek
        await new Promise(resolve => setTimeout(resolve, 2000));
    }
}

simulateQuestions();
