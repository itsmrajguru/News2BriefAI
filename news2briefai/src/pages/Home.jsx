import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

// Components
import Hero from '../components/Hero';
import NewsCard from '../components/NewsCard';
import SummaryModal from '../components/SummaryModal';

// Services
import { fetchTopHeadlines } from '../services/newsApi';

const Home = () => {
    const { category } = useParams();
    const navigate = useNavigate();
    const activeCategory = category || 'general';

    // State
    const [articles, setArticles] = useState([]);
    const [visibleCount, setVisibleCount] = useState(7);
    const [loading, setLoading] = useState(true);
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Load data
    useEffect(() => {
        const loadNews = async () => {
            setLoading(true);
            setVisibleCount(7);
            const data = await fetchTopHeadlines(activeCategory);
            setArticles(data || []);
            setLoading(false);
        };

        loadNews();
    }, [activeCategory]);

    // Handlers
    const handleCategoryChange = (newCategory) => {
        navigate(newCategory === 'general' ? '/' : `/${newCategory}`);
    };

    const handleLoadMore = () => {
        setVisibleCount((prev) => prev + 7);
    };

    const handleSummarize = (article) => {
        setSelectedArticle(article);
        setIsModalOpen(true);
    };

    return (
        <>
            <Hero
                activeCategory={activeCategory}
                onCategoryChange={handleCategoryChange}
            />

            {/* Main Content Area */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">

                {/* Section Header */}
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                        {activeCategory === 'general' ? 'Latest Stories' : `${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)} News`}
                    </h2>
                    <span className="text-sm font-medium text-slate-500">
                        Showing {Math.min(visibleCount, articles.length)} of {articles.length} Results
                    </span>
                </div>

                {/* Content Grid */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center h-64 text-brand-600">
                        <Loader2 className="w-10 h-10 animate-spin mb-4" />
                        <p className="text-sm font-medium text-slate-500">Curating your briefing...</p>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {articles.slice(0, visibleCount).map((article, index) => (
                                <NewsCard
                                    key={`${article.url}-${index}`}
                                    article={article}
                                    onSummarize={() => handleSummarize(article)}
                                />
                            ))}
                        </div>

                        {/* Load More Button */}
                        {!loading && visibleCount < articles.length && (
                            <div className="flex justify-center mt-12">
                                <button
                                    onClick={handleLoadMore}
                                    className="px-8 py-3 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 font-semibold rounded-xl transition-all shadow-none active:scale-95"
                                >
                                    Load More
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* AI Summary Modal */}
            <SummaryModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                article={selectedArticle}
            />
        </>
    );
};

export default Home;
