// Use native Web Fetch API which is available in Node 18+
export const handler = async (event) => {
    // 1. Get the category from the query string (defaults to 'general')
    const category = event.queryStringParameters.category || 'general';
    const API_KEY = process.env.VITE_NEWS_API_KEY;

    // 2. Security Check: Ensure API key exists in Netlify environment variables
    if (!API_KEY) {
        console.error("Missing VITE_NEWS_API_KEY in Netlify Environment.");
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Server Configuration Error: Missing API Key" })
        };
    }

    try {
        // 3. Make the request securely from the backend to NewsAPI
        const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`);

        if (!response.ok) {
            console.error(`NewsAPI returned status ${response.status}`);
            const errorText = await response.text();
            throw new Error(`NewsAPI Error: ${response.status} - ${errorText}`);
        }

        const data = await response.json();

        // 4. Return the successful data to the frontend
        return {
            statusCode: 200,
            headers: {
                // Enable CORS if needed, though usually Netlify handles this for same-domain requests
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };
    } catch (error) {
        console.error("Backend Fetch Failed:", error.message);

        return {
            statusCode: 502,
            body: JSON.stringify({ error: "Failed to fetch from NewsAPI", details: error.message })
        };
    }
};
