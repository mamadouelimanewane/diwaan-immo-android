const { MongoClient } = require('mongodb');

async function main() {
    const uri = "mongodb://127.0.0.1:27017/admin";
    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log("Connecté à MongoDB.");

        // Check status first
        try {
            const status = await client.db().admin().command({ replSetGetStatus: 1 });
            if (status.ok) {
                console.log("Replica Set déjà actif.");
                return;
            }
        } catch (e) {
            // Expected if not initiated
        }

        try {
            const result = await client.db().admin().command({
                replSetInitiate: {
                    _id: "rs0",
                    members: [{ _id: 0, host: "localhost:27017" }]
                }
            });
            console.log("Replica Set initié avec succès:", result);
        } catch (e) {
            if (e.codeName === 'AlreadyInitialized') {
                console.log("Replica Set déjà initié (erreur standard).");
            } else {
                throw e;
            }
        }
    } catch (e) {
        console.error("Erreur lors de l'initiation:", e);
        process.exit(1);
    } finally {
        await client.close();
    }
}

main();
