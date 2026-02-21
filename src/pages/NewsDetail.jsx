import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Calendar, User } from 'lucide-react';
import { format } from 'date-fns';

// News Detail Page to show full article info
const NewsDetail = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const article = location.state?.article;

    // Redirect to home if accessed directly without state
    useEffect(() => {
        if (!article) {
            navigate('/');
        }
    }, [article, navigate]);

    if (!article) return null;

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">

            {/* Back Navigation */}
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-slate-500 hover:text-brand-600 mb-8 transition-colors group"
            >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Back to News
            </button>

            {/* Article Header */}
            <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                {article.title}
            </h1>

            {/* Metadata Bar */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500 mb-8 pb-8 border-b border-slate-200">
                <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-brand-500" />
                    <span className="font-medium text-slate-700">{article.source.name}</span>
                </div>
                {article.publishedAt && (
                    <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{format(new Date(article.publishedAt), 'MMMM d, yyyy')}</span>
                    </div>
                )}
            </div>

            {/* Featured Image */}
            {article.urlToImage && (
                <div className="rounded-xl overflow-hidden mb-10 border border-slate-200">
                    <img
                        src={article.urlToImage}
                        alt={article.title}
                        className="w-full h-auto object-cover max-h-[500px]"
                    />
                </div>
            )}

            {/* Content Area */}
            <div className="prose prose-lg prose-slate max-w-none mb-12">
                <p className="text-xl text-slate-700 leading-relaxed font-medium mb-6">
                    {article.description}
                </p>
                <p className="text-slate-600 leading-relaxed">
                    {/* NewsAPI often truncates content. We show what we have. */}
                    {article.content?.split('[')[0]}
                </p>
            </div>

            {/* Call to Action Footer */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-8 text-center">
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    Want the full story?
                </h3>
                <p className="text-slate-500 mb-6">
                    Read the complete article at the original source.
                </p>
                <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 btn-primary"
                >
                    Visit {article.source.name} <ExternalLink className="w-4 h-4" />
                </a>
            </div>

        </div>
    );
};

export default NewsDetail;
