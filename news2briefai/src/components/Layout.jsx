import React from 'react';
import Navbar from './Navbar';
import { motion } from 'framer-motion';

/**
 * Layout Component
 * Provides the structural shell for the application.
 * Ensures strict max-width constraints for readability (Product-Led Growth style).
 */
const Layout = ({ children }) => {
    return (
        <div className="min-h-screen w-full bg-white text-slate-900 selection:bg-brand-100 selection:text-brand-900">
            <Navbar />

            <motion.main
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="pt-16 pb-20 w-full"
            >
                {children}
            </motion.main>

            <footer className="border-t border-slate-200 py-12 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <p className="text-sm text-slate-500 font-medium">
                        © 2026 News2Brief AI. Engineered for clarity.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
