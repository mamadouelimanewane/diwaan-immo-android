import OpenAI from 'openai';

const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

const openai = apiKey ? new OpenAI({
    apiKey: apiKey,
    dangerouslyAllowBrowser: true // Note: For frontend demo only. In production, move to API Route.
}) : null;

export const getChatCompletion = async (message: string) => {
    if (!openai) {
        console.warn("OpenAI API Key is missing.");
        return null;
    }
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: "You are a helpful real estate assistant for Diwaan, a Senegalese property platform. You help users find homes in Dakar, Saly, Mbour, etc. Be polite, concise, and helpful. Answer in French."
                },
                { role: "user", content: message }
            ],
        });
        return response.choices[0].message.content;
    } catch (error) {
        console.error("OpenAI Error:", error);
        return "Désolé, je rencontre des difficultés techniques pour le moment. Veuillez réessayer plus tard.";
    }
};
