import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, ArrowUpRight, MessageSquare } from 'lucide-react';
import { format } from 'date-fns';

// News Card Component
const NewsCard = ({ article, onSummarize }) => {
    // Placeholder data handling
    const title = article?.title || "No Title Available";
    const source = article?.source?.name || "Unknown Source";
    const date = article?.publishedAt ? format(new Date(article.publishedAt), 'MMM dd, yyyy') : "Today";
    let image = article?.urlToImage || "https://picsum.photos/seed/news/800/600";
    if (image.startsWith('http://')) {
        image = image.replace('http://', 'https://');
    }
    const url = article?.url || "#";

    const navigate = useNavigate();

    const handleReadFull = () => {
        navigate('/news/detail', { state: { article } });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className="clean-card group flex flex-col h-full overflow-hidden"
        >
            {/* Image Section */}
            <div className="relative h-48 overflow-hidden bg-slate-100">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => { e.target.src = "https://placehold.co/800x600/f8fafc/0f172a?text=No+Image+Available" }}
                />
                <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 bg-white/90 backdrop-blur-sm shadow-sm rounded-md text-xs font-semibold text-slate-700 tracking-wide">
                        {source}
                    </span>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-3">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{date}</span>
                </div>

                <h3 className="text-lg font-bold leading-snug text-slate-900 group-hover:text-brand-600 transition-colors mb-4 line-clamp-3">
                    {title}
                </h3>

                {/* Actions Footer */}
                <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                    <button
                        onClick={onSummarize}
                        className="flex items-center gap-2 text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors bg-brand-50 hover:bg-brand-100 px-3 py-1.5 rounded-lg"
                    >
                        <MessageSquare className="w-4 h-4" />
                        Summarize
                    </button>

                    <button
                        onClick={handleReadFull}
                        className="flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
                    >
                        Read Full
                        <ArrowUpRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default NewsCard;
