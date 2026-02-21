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
        urlToImage: "https://images.unsplash.com/photo-1677442135703-1767ca454554?auto=format&fit=crop&w=1000&q=80",
        url: "#",
        description: "The new model promises a paradigm shift in AI capabilities..."
    },
    {
        title: "SpaceX Starship Successfully Reaches Orbit",
        source: { name: "SpaceNews" },
        publishedAt: new Date().toISOString(),
        urlToImage: "https://images.unsplash.com/photo-1541872703-74c5963631df?auto=format&fit=crop&w=1000&q=80",
        url: "#",
        description: "After several attempts, the massive rocket has achieved orbit..."
    },
    {
        title: "Global Markets Rally as Inflation Cools Down",
        source: { name: "Bloomberg" },
        publishedAt: new Date().toISOString(),
        urlToImage: "https://images.unsplash.com/photo-1611974765270-ca12588265b6?auto=format&fit=crop&w=1000&q=80",
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
