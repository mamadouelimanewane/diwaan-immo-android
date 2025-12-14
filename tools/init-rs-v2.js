const { MongoClient } = require('mongodb');

async function main() {
    // Use direct connection to avoid discovery timeout
    const uri = "mongodb://127.0.0.1:27017/admin?directConnection=true";
    const client = new MongoClient(uri, { serverSelectionTimeoutMS: 5000 });

    try {
        console.log("Tentative de connexion à MongoDB (mode direct)...");
        await client.connect();
        console.log("Connecté.");

        try {
            const stats = await client.db().admin().command({ replSetGetStatus: 1 });
            if (stats.ok) {
                console.log("SUCCESS: Replica Set est déjà actif !");
                console.log("Membres:", stats.members.map(m => `${m.name} (${m.stateStr})`).join(", "));
                return;
            }
        } catch (e) {
            console.log("Replica Set non actif ou erreur:", e.message);
        }

        console.log("Tentative d'initialisation du Replica Set...");
        try {
            // Try simple initiation
            const result = await client.db().admin().command({
                replSetInitiate: {
                    _id: "rs0",
                    members: [{ _id: 0, host: "127.0.0.1:27017" }]
                }
            });
            console.log("SUCCESS: Replica Set initié !", result);
        } catch (e) {
            if (e.codeName === 'AlreadyInitialized') {
                console.log("SUCCESS: Déjà initialisé !");
            } else {
                console.error("ERREUR lors de l'initiation:", e);
            }
        }

    } catch (e) {
        console.error("ECHEC FATAL de connexion:", e);
    } finally {
        await client.close();
    }
}

main();
