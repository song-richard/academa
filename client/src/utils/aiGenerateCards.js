import { OpenAI } from 'openai';
const openai = new OpenAI({ apiKey: import.meta.env.REACT_APP_OPENAI_API_KEY });

// This function takes in a topic and an amount of cards to create and returns an array of JSON objects with the term and description of the term
async function aiGenerateCards(amount, topic) {
    const completion = await openai.chat.completions.create({
        messages: [
            { role: "system", content: `You are a helpful assistant who takes a topic and turns it into flash cards with a JSON format like these cards: [{term: "term here", description: "description of term"},{term: "term here", description: "description of term"}]` },
            {role: "user", content: `Create ${amount} cards about ${topic}`}
        ],
        model: "gpt-3.5-turbo",
        response_format: { type: "json_object" },
    });
    const res = await JSON.parse(completion.choices[0].message.content).cards;
    return res;
}

export default aiGenerateCards;