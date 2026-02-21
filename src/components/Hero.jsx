import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';

const categories = [
    { id: 'general', label: 'Top Stories' },
    { id: 'technology', label: 'Technology' },
    { id: 'business', label: 'Business' },
    { id: 'science', label: 'Science' },
    { id: 'health', label: 'Health' },
    { id: 'entertainment', label: 'Entertainment' },
    { id: 'sports', label: 'Sports' },
];

/**
 * Hero Component (Refactored)
 * A compact, boxed layout combining the tagline and category navigation.
 */
const Hero = ({ activeCategory, onCategoryChange }) => {
    const scrollRef = useRef(null);

    const handleScroll = (scrollOffset) => {
        if (scrollRef.current) {
            scrollRef.current.scrollLeft += scrollOffset;
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
            {/* 1. Square Box Layout for Hero Content */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white border border-slate-200 rounded-2xl p-8 md:p-12 text-center shadow-sm max-w-4xl mx-auto"
            >
                <div className="flex justify-center mb-6">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-semibold uppercase tracking-wide">
                        <Sparkles className="w-3.5 h-3.5" />
                        AI-Powered Briefings
                    </span>
                </div>

                <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
                    Read less. <span className="text-brand-600">Know more.</span>
                </h1>

                <p className="text-lg text-slate-500 max-w-xl mx-auto mb-8 leading-relaxed">
                    Detailed stories distilled into concise, actionable insights. No clutter, just clarity.
                </p>


            </motion.div>

            {/* 2. Horizontal Filter Buttons (Below Hero) */}
            <div className="mt-8 mb-12 relative max-w-5xl mx-auto">
                {/* Scroll Fade Indicators */}
                <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none md:hidden" />
                <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none md:hidden" />

                <div
                    ref={scrollRef}
                    className="flex gap-3 overflow-x-auto pb-4 px-1 scrollbar-hide justify-start md:justify-center"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {categories.map((cat) => {
                        const isActive = activeCategory === cat.id;
                        return (
                            <motion.button
                                key={cat.id}
                                whileHover={{ y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => onCategoryChange(cat.id)}
                                className={`
                     whitespace-nowrap px-5 py-2.5 rounded-lg text-sm font-semibold transition-all border
                     ${isActive
                                        ? 'bg-brand-600 border-brand-600 text-white shadow-md shadow-brand-500/20'
                                        : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'}
                   `}
                            >
                                {cat.label}
                            </motion.button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Hero;
