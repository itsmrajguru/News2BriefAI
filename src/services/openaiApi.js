import axios from 'axios';

const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

// Summarize Article via OpenAI
export const summarizeArticle = async (text, title) => {
    // Check if API key exists
    if (!API_KEY) {
        console.warn("Missing OpenAI API Key.");
        return new Promise((resolve) => {
            // Fake delay for testing
            setTimeout(() => {
                resolve(`(Mock Summary) This is a summary for "${title}". Add your API key to see real results.`);
            }, 1500);
        });
    }

    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: "system",
                        content: "You are a news editor. Summarize the content into 3 short sentences."
                    },
                    {
                        role: "user",
                        content: `Headline: ${title}\n\nContent: ${text}`
                    }
                ],
                max_tokens: 150,
                temperature: 0.3,
            },
            {
                headers: {
                    'Authorization': `Bearer ${API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        return response.data.choices[0].message.content;
    } catch (error) {
        console.error("Summarization failed:", error);
        throw new Error("Failed to get summary.");
    }
};
