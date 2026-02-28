const fetch = require('node-fetch');

async function testChatbot() {
    try {
        console.log("Envoi du message au chatbot : 'Trouve un logement de 250000 f à Dakar'");

        const response = await fetch('http://localhost:3001/api/ai/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                messages: [
                    { role: 'user', content: 'Trouve un logement de 250000 f à Dakar' }
                ]
            })
        });

        if (!response.ok) {
            console.error("Erreur HTTP:", response.status, response.statusText);
            return;
        }

        const data = await response.json();

        console.log("\n====== RÉPONSE DU CHATBOT ======\n");
        console.log(data.message);

        if (data.data && data.data.length > 0) {
            console.log("\n====== DONNÉES DE PROPRIÉTÉS RETOURNÉES ======\n");
            data.data.forEach(prop => {
                console.log(`- ${prop.title} | Prix: ${prop.price} | Ville: ${prop.city}`);
            });
        } else {
            console.log("\n[Aucune carte de propriété retournée]");
        }

    } catch (error) {
        console.error("Erreur de connexion:", error.message);
    }
}

testChatbot();
