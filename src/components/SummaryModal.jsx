import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Pause, Loader2, Volume2 } from 'lucide-react';
import { summarizeArticle } from '../services/openaiApi';

/**
 * SummaryModal Component
 * Displays the AI-generated summary in a focused, distraction-free modal.
 * Uses a white card layout with strong borders instead of previous glassmorphism.
 */
const SummaryModal = ({ isOpen, onClose, article }) => {
    const [summary, setSummary] = useState('');
    const [loading, setLoading] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

    // Reset state when modal opens/closes
    useEffect(() => {
        if (isOpen && article) {
            generateSummary();
        } else {
            setSummary('');
            stopSpeaking();
        }
    }, [isOpen, article]);

    // Interaction with OpenAI Service
    const generateSummary = async () => {
        setLoading(true);
        // Fallback logic: Use description if content is missing/truncated
        const textToSummarize = article.description || article.content || article.title;

        try {
            const result = await summarizeArticle(textToSummarize, article.title);
            setSummary(result);
        } catch (error) {
            setSummary("Unable to generate summary at this time. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    // Text-to-Speech Logic (Native Browser API)
    const handleSpeak = () => {
        if (isPlaying) {
            stopSpeaking();
        } else {
            startSpeaking();
        }
    };

    const startSpeaking = () => {
        if (!summary) return;

        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(summary);
            utterance.onend = () => setIsPlaying(false);
            utterance.rate = 1.0;
            utterance.pitch = 1.0;

            // Try to select a higher quality voice if available
            const voices = window.speechSynthesis.getVoices();
            const preferredVoice = voices.find(v => v.lang === 'en-US' && v.name.includes('Google')) || voices[0];
            if (preferredVoice) utterance.voice = preferredVoice;

            window.speechSynthesis.speak(utterance);
            setIsPlaying(true);
        } else {
            alert("Text-to-Speech is not supported in this browser.");
        }
    };

    const stopSpeaking = () => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            setIsPlaying(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="bg-white w-full max-w-lg rounded-xl relative overflow-hidden border border-slate-200"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/50">
                            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                                <Volume2 className="w-5 h-5 text-brand-600" />
                                AI Briefing
                            </h2>
                            <button
                                onClick={onClose}
                                className="p-2 rounded-lg hover:bg-slate-200 transition-colors text-slate-400 hover:text-slate-700"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Content Body */}
                        <div className="p-8">
                            <h3 className="text-lg font-bold mb-4 text-slate-900 leading-snug">
                                {article?.title}
                            </h3>

                            {loading ? (
                                <div className="flex flex-col items-center justify-center py-8 gap-3 text-brand-600">
                                    <Loader2 className="w-8 h-8 animate-spin" />
                                    <p className="text-sm font-medium text-slate-500">Synthesizing insights...</p>
                                </div>
                            ) : (
                                <div className="space-y-8">
                                    <p className="text-slate-600 leading-relaxed text-base">
                                        {summary}
                                    </p>

                                    <div className="flex justify-center">
                                        <button
                                            onClick={handleSpeak}
                                            className={`
                        flex items-center gap-2 px-8 py-3 rounded-lg font-semibold transition-all border
                        ${isPlaying
                                                    ? 'bg-red-50 text-red-600 border-red-200 hover:bg-red-100'
                                                    : 'bg-brand-600 text-white border-brand-700 hover:bg-brand-700 shadow-none'}
                      `}
                                        >
                                            {isPlaying ? (
                                                <>
                                                    <Pause className="w-5 h-5 fill-current" />
                                                    Pause Playback
                                                </>
                                            ) : (
                                                <>
                                                    <Play className="w-5 h-5 fill-current" />
                                                    Listen to Brief
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Brand Accent Footer */}
                        <div className="h-1.5 w-full bg-brand-600" />
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default SummaryModal;
