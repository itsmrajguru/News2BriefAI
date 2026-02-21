import axios from 'axios';

// Points to the secure serverless backend proxy, avoiding CORS entirely
const PROXY_URL = '/.netlify/functions/fetchNews';

/**
 * MOCK DATA
 * Used when API keys are missing or for testing.
 */
const MOCK_ARTICLES = [
    {
        title: "OpenAI Announces GPT-5 with Human-Level Reasoning",
        source: { name: "TechCrunch" },
        publishedAt: new Date().toISOString(),
        urlToImage: "https://picsum.photos/seed/ai/800/600",
        url: "#",
        description: "The new model promises a paradigm shift in AI capabilities..."
    },
    {
        title: "SpaceX Starship Successfully Reaches Orbit",
        source: { name: "SpaceNews" },
        publishedAt: new Date().toISOString(),
        urlToImage: "https://picsum.photos/seed/space/800/600",
        url: "#",
        description: "After several attempts, the massive rocket has achieved orbit..."
    },
    {
        title: "Global Markets Rally as Inflation Cools Down",
        source: { name: "Bloomberg" },
        publishedAt: new Date().toISOString(),
        urlToImage: "https://picsum.photos/seed/market/800/600",
        url: "#",
        description: "Stocks hit record highs as economic data shows promising signs..."
    }
];

// Fetch Top Headlines based on category
// Fetch Top Headlines based on category
export const fetchTopHeadlines = async (category = 'general') => {
    try {
        const response = await axios.get(PROXY_URL, {
            params: {
                category,
            },
        });

        if (!response.data || !response.data.articles) {
            console.warn("Proxy returned invalid data structure. Falling back to mock.");
            return MOCK_ARTICLES;
        }

        return response.data.articles;
    } catch (error) {
        console.error("Secure fetch through proxy failed:", error);
        // Safely return mock data if the API fails, ensuring the site never crashes
        return MOCK_ARTICLES;
    }
};
