import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Zap, ShieldCheck } from 'lucide-react';

const About = () => {
    const features = [
        {
            icon: <Brain className="w-8 h-8 text-brand-600" />,
            title: "AI-Powered Synthesis",
            description: "We don't just crop text. Our advanced AI reads multiple sources, understands the context, and writes a human-quality briefing that hits the core facts instantly."
        },
        {
            icon: <ShieldCheck className="w-8 h-8 text-brand-600" />,
            title: "Zero Clickbait",
            description: "Modern media relies on sensationalism to sell ads. We filter out the noise, the fluff, and the outrage bait, delivering only the signal you actually care about."
        },
        {
            icon: <Zap className="w-8 h-8 text-brand-600" />,
            title: "Instant Clarity",
            description: "Your time is your most valuable asset. Get caught up on global events in minutes, not hours. No paywalls, no popups, just pure information."
        }
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

            {/* Hero Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-20"
            >
                <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">
                    News2Brief<span className="text-brand-600">.ai</span>
                </h1>
                <h2 className="text-2xl md:text-3xl font-medium text-slate-600">
                    What Makes us different
                </h2>
            </motion.div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {features.map((feature, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 + 0.2 }}
                        className="bg-white p-8 rounded-2xl border border-slate-200 transition-colors text-center group"
                    >
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-50 mb-6 group-hover:bg-brand-100 transition-colors">
                            {feature.icon}
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-4">
                            {feature.title}
                        </h3>
                        <p className="text-slate-600 leading-relaxed">
                            {feature.description}
                        </p>
                    </motion.div>
                ))}
            </div>

        </div>
    );
};

export default About;
