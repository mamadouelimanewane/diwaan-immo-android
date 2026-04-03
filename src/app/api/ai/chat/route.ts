import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { prisma } from '@/lib/prisma';

// Initialize OpenAI SDK configured for DeepSeek
const openai = process.env.DEEPSEEK_API_KEY
    ? new OpenAI({
        apiKey: process.env.DEEPSEEK_API_KEY,
        baseURL: 'https://api.deepseek.com'
    })
    : null;

const AI_MODEL = "deepseek-chat";

// System prompt to give identity and knowledge to the AI
const SYSTEM_PROMPT = `
Vous êtes "Diwaan AI Expert", l'assistant d'intelligence immobilière de la plateforme Diwaan au Sénégal.
Votre mission est d'accompagner l'utilisateur sur TOUT le cycle de vie immobilier (Achat, Vente, Location, Investissement).

1. EXPERTISE ADMINISTRATIVE & JURIDIQUE (SÉNÉGAL) :
- ACHAT : Vérification obligatoire du Titre Foncier (TF) ou de l'État Réel au Cadastre. Passage obligatoire devant Notaire. Frais : ~15% (Droits d'enregistrement, Conservation foncière, Honoraires).
- VENTE : Nécessité du Certificat d'Urbanisme. Plus-value immobilière soumise à l'impôt.
- LOCATION : Loi 2014-03. Caution max 2 mois. Frais d'agence max 1 mois. Enregistrement du bail aux Impôts et Domaines (DGID).

2. RECHERCHES APPROXIMATIVES ET MULTICRITÈRES :
- Si l'utilisateur donne un budget "autour de X", calculez une fourchette large (-20% à +20%). Par exemple, "autour de 1 million" -> minPrice: 800000, maxPrice: 1200000.
- Si la demande est très spécifique (ex: "vue mer et piscine"), utilisez le paramètre "keyword" (ex: "piscine" ou "mer").
- Déduisez le "transactionType" (SALE/RENT) selon le contexte ("acheter", "louer", ou prix très bas mensuel = RENT).
- Déduisez le "type" (VILLA, APARTMENT) si possible. "Maison" = VILLA ou HOUSE.
- Si une première recherche ne donne rien, proposez spontanément des alternatives proches (autres quartiers voisins, ou sans le critère restrictif).
- Ne faites pas plus de 2 ou 3 recherches consécutives. Si vous ne trouvez toujours aucun bien après avoir élargi vos critères, arrêtez d'utiliser les outils et résumez la situation à l'utilisateur en lui donnant des conseils sur le marché (ex: budget trop bas, zone très demandée).

3. ANALYSE COMPARATIVE ET PRIX :
- Aidez l'utilisateur à comparer les prix.
  * Almadies/Plateau : Haut standing (1.5M - 3M FCFA/m²).
  * Mermoz/Fann : 800k - 1.5M FCFA/m².
  * Diamniadio : Zone émergente (25k - 75k FCFA/m² pour le terrain).
- Utilisez l'outil "get_market_trends" pour des données précises.

4. SERVICES SOCIAUX ET PROXIMITÉ :
- Renseignez sur les hôpitaux, les commissariats, et les commerces.
- Utilisez "get_nearby_services" pour enrichir vos réponses.

5. DÉMARCHES UTILES :
- Parlez des démarches pour le compteur Woyofal (Senelec), l'eau (SEN'EAU), ou Sonatel.

6. LANGUES :
- Vous parlez parfaitement Français et Wolof. Répondez en Wolof si on vous parle en Wolof.

### IMPORTANT REGARDING FUNCTION CALLS:
If you need to call a tool, you MUST reply ONLY with a valid JSON format for the tool call arguments according to OpenAI standards. ABSOLUTELY DO NOT use XML, DSML or any other tag-based language like <DSML>.
`;

export async function POST(req: NextRequest) {
    try {
        const { messages } = await req.json();

        if (!openai) {
            // Simulated AI logic if no API key is present
            return simulatedResponse(messages);
        }

        // Generic tag matching patterns for cleaning DSML
        const genericBlockStrip = /<[^>]*?(?:DSML|function_calls|invoke|parameter)[^>]*?>[\s\S]*?<\/[^>]*?DSML[^>]*?function_calls[^>]*?>/gi;
        const singleTagStrip = /<[^>]*?(?:DSML|function_calls|invoke|parameter)[^>]*?>/gi;

        let currentMessages: any[] = [
            { role: "system", content: SYSTEM_PROMPT },
            ...messages
        ];

        let uiData = null;
        let iteration = 0;
        const MAX_ITERATIONS = 5;

        while (iteration < MAX_ITERATIONS) {
            iteration++;

            const response = await openai.chat.completions.create({
                model: AI_MODEL,
                temperature: 0.1,
                messages: currentMessages,
                tools: [
                    {
                        type: "function",
                        function: {
                            name: "search_properties",
                            description: "Rechercher des biens immobiliers sur la plateforme Diwaan",
                            parameters: {
                                type: "object",
                                properties: {
                                    type: { type: "string", enum: ["APARTMENT", "HOUSE", "VILLA", "STUDIO", "LAND", "COMMERCIAL"] },
                                    city: { type: "string", description: "Ville (ex: Dakar, Saly)" },
                                    neighborhood: { type: "string", description: "Quartier (ex: Almadies, Ngor)" },
                                    minPrice: { type: "number" },
                                    maxPrice: { type: "number" },
                                    minSurface: { type: "number" },
                                    bedrooms: { type: "number" },
                                    transactionType: { type: "string", enum: ["SALE", "RENT"] },
                                    keyword: { type: "string", description: "Mot clé général (piscine, meublé, vue mer)" }
                                }
                            }
                        }
                    },
                    {
                        type: "function",
                        function: {
                            name: "get_market_trends",
                            description: "Obtenir l'étude de prix et les tendances immobilières par zone au Sénégal",
                            parameters: {
                                type: "object",
                                properties: {
                                    zone: { type: "string", description: "Le quartier ou la ville (ex: Almadies, Saly, Diamniadio)" }
                                },
                                required: ["zone"]
                            }
                        }
                    },
                    {
                        type: "function",
                        function: {
                            name: "get_nearby_services",
                            description: "Lister les services sociaux (hôpitaux, police, commerces) à proximité d'un lieu",
                            parameters: {
                                type: "object",
                                properties: {
                                    location: { type: "string" },
                                    category: { type: "string", enum: ["health", "security", "education", "commerce", "all"] }
                                },
                                required: ["location"]
                            }
                        }
                    }
                ],
                tool_choice: "auto"
            });

            const responseMessage = response.choices[0].message;

            // Detect and handle DSML fallback
            const dsmlMatch = responseMessage.content?.match(/<[^>]*?DSML[^>]*?function_calls[^>]*?>([\s\S]*?)<\/[^>]*?DSML[^>]*?function_calls[^>]*?>/i)
                || responseMessage.content?.match(/<[^>]*?DSML[^>]*?>([\s\S]*?)<\/[^>]*?DSML[^>]*?>/i);

            let toolCalls = responseMessage.tool_calls || [];

            if (!responseMessage.tool_calls && dsmlMatch) {
                const dsmlContent = dsmlMatch[1];
                const invokeMatch = dsmlContent.match(/<[^>]*?invoke[^>]*?name="([^"]+)"[^>]*?>([\s\S]*?)<\/[^>]*?invoke[^>]*?>/i);

                if (invokeMatch) {
                    const functionName = invokeMatch[1];
                    const parametersString = invokeMatch[2];
                    toolCalls = [
                        {
                            id: 'call_' + Math.random().toString(36).substring(7),
                            type: 'function',
                            function: {
                                name: functionName,
                                arguments: parametersString
                            }
                        }
                    ] as any;
                }
            }

            if (toolCalls.length > 0) {
                // Prepare assistant message with tool calls
                let content = (responseMessage.content || "").trim();
                for (let i = 0; i < 3; i++) {
                    content = content.replace(genericBlockStrip, '').replace(singleTagStrip, '');
                }

                currentMessages.push({
                    role: "assistant",
                    content: content.trim() || "",
                    tool_calls: toolCalls
                });

                console.log(`[Turn ${iteration}] AI called tools:`, toolCalls.map((t: any) => t.function?.name));

                // Execute tools
                for (const toolCall of toolCalls as any[]) {
                    let args;
                    try {
                        args = JSON.parse(toolCall.function.arguments);
                    } catch (e) {
                        args = parseDSMLArguments(toolCall.function.arguments);
                    }

                    let result = "";
                    if (toolCall.function.name === "search_properties") {
                        const properties = await searchProperties(args);
                        result = JSON.stringify(properties);
                        uiData = properties.slice(0, 3);
                    } else if (toolCall.function.name === "get_market_trends") {
                        result = JSON.stringify(await getMarketTrends(args.zone));
                    } else if (toolCall.function.name === "get_nearby_services") {
                        result = JSON.stringify(await getNearbyServices(args.location, args.category));
                    }

                    currentMessages.push({
                        role: "tool",
                        tool_call_id: toolCall.id,
                        content: result || "{}"
                    });
                }
                // Continue loop for next turn
                continue;
            } else {
                // No more tool calls, return final message
                let cleanMessage = (responseMessage.content || "").trim();
                for (let i = 0; i < 3; i++) {
                    cleanMessage = cleanMessage.replace(genericBlockStrip, '').replace(singleTagStrip, '');
                }

                return NextResponse.json({
                    message: cleanMessage,
                    data: uiData
                });
            }
        }

        return NextResponse.json({ error: "Limite d'itérations IA atteinte" }, { status: 500 });


    } catch (error: any) {
        console.error('AI Chat Error:', error);
        return NextResponse.json({ error: "Erreur lors de la génération de la réponse" }, { status: 500 });
    }
}

// Fallback to parse DSML if OpenAI fails
function parseDSMLArguments(dsmlString: string) {
    const args: any = {};
    const regex = /<[^>]*?parameter\s+name="([^"]+)"[^>]*?>([\s\S]*?)<\/[^>]*?parameter>/gi;
    let match;
    while ((match = regex.exec(dsmlString)) !== null) {
        const key = match[1];
        let value: any = match[2];
        if (!isNaN(value)) value = Number(value);
        args[key] = value;
    }
    return args;
}

async function getMarketTrends(zone: string) {
    const defaultData = { info: "Données en cours de collecte", avgRent: "n/a", avgSale: "n/a" };
    if (!zone) return defaultData;

    const zones: Record<string, any> = {
        "almadies": { avgRent: "1.5M - 4M FCFA/mois", avgSale: "1.5M - 2.5M FCFA/m²", trend: "Stable, très forte demande locative premium.", roi: "6-8%" },
        "dakar plateau": { avgRent: "1M - 3M FCFA/mois", avgSale: "1.2M - 2M FCFA/m²", trend: "Hausse continue (bureaux et résidentiel)", roi: "7-9%" },
        "mermoz": { avgRent: "800k - 1.5M FCFA/mois", avgSale: "900k - 1.5M FCFA/m²", trend: "Forte demande, parfait pour investissement familial.", roi: "7%" },
        "ngor": { avgRent: "600k - 1.2M FCFA/mois", avgSale: "800k - 1.2M FCFA/m²", trend: "Quartier prisé par les expatriés.", roi: "7%" },
        "diamniadio": { avgRent: "150k - 400k FCFA/mois", avgSale: "25k - 75k FCFA/m² (terrain)", trend: "Hyper croissance urbaine. Zone d'avenir.", roi: "10%+ (plus-value attendue)" },
        "saly": { avgRent: "300k - 800k FCFA/mois", avgSale: "50k - 150k FCFA/m²", trend: "Touristique. Très rentable en location courte durée (Airbnb).", roi: "8-12%" },
        "mbour": { avgRent: "100k - 300k FCFA/mois", avgSale: "15k - 40k FCFA/m²", trend: "Hausse modérée, bon pour résidence secondaire ou investissement long terme.", roi: "5%" }
    };

    const key = Object.keys(zones).find(k => zone.toLowerCase().includes(k)) || "default";
    return key !== "default" ? zones[key] : { suggestion: "Demander pour Almadies, Diamniadio, Saly, Mermoz..." };
}

async function getNearbyServices(location: string, category: string = "all") {
    // Simulated database of local services in prominent Senegalese areas
    const allServices = [
        // Health
        { name: "Hôpital Principal de Dakar", type: "health", category: "Public", location: "Dakar Plateau" },
        { name: "Hôpital Le Dantec", type: "health", category: "Public", location: "Dakar Plateau" },
        { name: "Clinique de la Madeleine", type: "health", category: "Privé", location: "Dakar Plateau" },
        { name: "Hôpital Militaire de Ouakam (HMO)", type: "health", category: "Militaire/Public", location: "Ouakam / Mamelles" },
        { name: "SAMU National", type: "health", category: "Urgence", location: "Dakar" },
        // Security
        { name: "Commissariat Central de Dakar", type: "security", category: "Police", location: "Dakar Plateau" },
        { name: "Commissariat des Parcelles Assainies", type: "security", category: "Police", location: "Parcelles Assainies" },
        { name: "Gendarmerie de Ouakam", type: "security", category: "Gendarmerie", location: "Ouakam" },
        // Commerce
        { name: "Auchan Almadies", type: "commerce", category: "Supermarché", location: "Almadies" },
        { name: "Sea Plaza", type: "commerce", category: "Centre Commercial", location: "Fann Corniche" },
        { name: "Dakar City", type: "commerce", category: "Centre Commercial", location: "Plateau" },
        { name: "Marché Kermel", type: "commerce", category: "Marché Traditionnel", location: "Dakar Plateau" },
        { name: "Marché Sandaga", type: "commerce", category: "Marché Traditionnel", location: "Dakar Plateau" },
        { name: "Exclusive", type: "commerce", category: "Supermarché", location: "Mermoz" },
        // Education
        { name: "Lycée Jean Mermoz", type: "education", category: "International", location: "Mermoz" },
        { name: "Université Cheikh Anta Diop (UCAD)", type: "education", category: "Université", location: "Fann" },
        { name: "Institution Sainte Jeanne d'Arc", type: "education", category: "Privé", location: "Plateau" },
        { name: "École Actuelle Bilingue", type: "education", category: "International", location: "Ngor / Almadies" }
    ];

    let filtered = allServices;

    // Filter by location (simple inclusion match)
    if (location) {
        filtered = filtered.filter(s =>
            s.location.toLowerCase().includes(location.toLowerCase()) ||
            location.toLowerCase().includes(s.location.toLowerCase())
        );
    }

    // Filter by category
    if (category && category !== "all") {
        filtered = filtered.filter(s => s.type === category);
    }

    if (filtered.length === 0) {
        return { message: `Je n'ai pas d'informations précises dans ma base actuelle pour ${location}. Les grands centres urbains ont généralement des dispensaires ou postes de police locaux.` };
    }

    return filtered;
}

async function searchProperties(filters: any) {
    const where: any = { status: 'ACTIVE' };
    if (filters.type) where.type = filters.type;
    if (filters.city) where.city = { contains: filters.city, mode: 'insensitive' };
    if (filters.neighborhood) where.neighborhood = { contains: filters.neighborhood, mode: 'insensitive' };
    if (filters.transactionType) where.transactionType = filters.transactionType;
    if (filters.bedrooms) where.bedrooms = { gte: filters.bedrooms };
    if (filters.minSurface) where.surface = { gte: filters.minSurface };

    if (filters.minPrice || filters.maxPrice) {
        where.price = {};
        if (filters.minPrice) where.price.gte = filters.minPrice;
        if (filters.maxPrice) where.price.lte = filters.maxPrice;
    }

    if (filters.keyword) {
        where.OR = [
            { title: { contains: filters.keyword, mode: 'insensitive' } },
            { description: { contains: filters.keyword, mode: 'insensitive' } },
            { address: { contains: filters.keyword, mode: 'insensitive' } },
            { city: { contains: filters.keyword, mode: 'insensitive' } },
            { neighborhood: { contains: filters.keyword, mode: 'insensitive' } }
        ];
    }

    try {
        const properties = await prisma.property.findMany({
            where,
            orderBy: { createdAt: 'desc' },
            take: 5,
            select: {
                id: true,
                title: true,
                price: true,
                city: true,
                type: true,
                images: true,
                transactionType: true
            }
        });
        return properties;
    } catch (err) {
        return [];
    }
}

function simulatedResponse(messages: any[]) {
    const lastMsg = messages[messages.length - 1].content.toLowerCase();
    let text = "Je suis Diwaan AI. Je peux vous aider à trouver un bien ou vous conseiller sur l'immobilier au Sénégal. (Note: Clé API manquante, mode simulation actif)";

    if (lastMsg.includes('caution') || lastMsg.includes('loyer')) {
        text = "Au Sénégal, la loi de 2014 limite la caution à 2 mois de loyer maximum. Évitez de payer plus, c'est illégal. Souhaitez-vous voir nos locations disponibles ?";
    } else if (lastMsg.includes('notaire') || lastMsg.includes('frais')) {
        text = "Les frais de notaire sont essentiels. Pour un terrain, comptez environ 15% de frais totaux (enregistrement, conservation, honoraires). Voulez-vous que je vous trouve un notaire partenaire ?";
    } else if (lastMsg.includes('dakar') || lastMsg.includes('appartement')) {
        text = "Dakar est très demandé. Nous avons plusieurs appartements aux Almadies, à Mermoz et au Plateau. Quel est votre budget ?";
    } else if (lastMsg.includes('wolof') || lastMsg.includes('naka')) {
        text = "Salaam aleekum ! Maa ngi tontu ci Wolof tamit. Lu la neex rek !";
    }

    return NextResponse.json({ message: text });
}
