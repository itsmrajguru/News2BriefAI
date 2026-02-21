# News2Brief AI

> **Intelligent News Aggregation & Summarization Platform**

News2Brief AI is a modern SaaS application that transforms how users consume global news. By leveraging **OpenAI's GPT models**, it condenses complex articles into actionable, high-level summaries. The platform features a **product-led, high-contrast UI** designed for clarity, speed, and professional use.

## 🚀 Key Features

*   **Smart Summarization Engine**: Instantly generates 3-sentence executive briefs from any article using `gpt-3.5-turbo`.
*   **Native Text-to-Speech (TTS)**: Built-in audio player for listening to summaries on the go.
*   **Categories & Filtering**: Real-time topic filtering (Tech, Business, Science) via a sticky navigation bar.
*   **Clean Professional UI**: A high-conversion interface featuring:
    *   **Typography**: Inter (Sans-serif) for maximum readability.
    *   **Palette**: High-contrast Slate & Electric Blue (#2563EB).
    *   **Micro-interactions**: Subtle Framer Motion transitions for a distinct "app-like" feel.

## 🛠️ Technical Architecture

### Tech Stack
*   **Frontend**: React 18 + Vite (Fast HMR)
*   **Styling**: Tailwind CSS (Utility-first, configured for a custom "Clean" theme)
*   **State / Animations**: React Hooks + Framer Motion
*   **Data Layer**: Axios (Interceptor-based HTTP client)

### Component Structure
The application follows a **Atomic/Molecule** structure for maintainability:

*   **`Hero.jsx`**: The landing page hook. Displays the primary value prop with a layout-transition entry.
*   **`CategoryBar.jsx`**: A reusable, sticky horizontal scroll component for navigation.
*   **`NewsCard.jsx`**: The core display unit. Uses a "clean border" aesthetic with subtle hover lifts.
*   **`SummaryModal.jsx`**: Encapsulates the AI logic and TTS player in a focused overlay.

### Data Flow
1.  **NewsAPI**: Fetches raw JSON data based on the active category.
2.  **Transformation**: Data is normalized in `newsApi.js`.
3.  **Synthesis**: On user request, the article content is sent to `openaiApi.js` for synthesis.
4.  **Presentation**: Results are delivered via text and native audio synthesis.

## 📦 Getting Started

### Prerequisites
*   Node.js v18+
*   NewsAPI Key
*   OpenAI API Key

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/news2brief-ai.git
    cd news2brief-ai
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Environment Setup**
    Create a `.env` file:
    ```env
    VITE_NEWS_API_KEY=your_key_here
    VITE_OPENAI_API_KEY=your_key_here
    ```

4.  **Launch**
    ```bash
    npm run dev
    ```

---
**Engineered by [Your Name]**
