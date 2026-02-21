import axios from 'axios';

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const BASE_URL = 'https://newsapi.org/v2';

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
export const fetchTopHeadlines = async (category = 'general') => {
    if (!API_KEY) {
        console.warn("Missing API Key. Using mock data.");
        return MOCK_ARTICLES;
    }

    try {
        const response = await axios.get(`${BASE_URL}/top-headlines`, {
            params: {
                country: 'us',
                category,
                apiKey: API_KEY,
            },
        });
        return response.data.articles;
    } catch (error) {
        console.error("Fetch failed:", error);
        // Return mock data if API fails
        return MOCK_ARTICLES;
    }
};
