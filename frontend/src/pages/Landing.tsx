import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import LandingScrollAnimation from '@/components/LandingScrollAnimation';
import { ArrowRight } from 'lucide-react';

export default function Landing() {
  return (
    <div className="relative bg-cinematic-bg text-white overflow-hidden font-sans selection:bg-cyan-glow selection:text-cinematic-bg">
      {/* Background Scroll Animation */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <LandingScrollAnimation frameCount={25} />
      </div>

      {/* Content Overlay Container - Matches height of scroll animation */}
      <div className="relative z-10 w-full">
        {/* Section 1: Intro (0-25% scroll) */}
        <div className="h-screen flex items-center justify-center p-6 text-center">
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="max-w-4xl"
            >
                <motion.h1 
                    className="text-5xl md:text-8xl font-bold tracking-tighter mb-6 bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent"
                >
                    Kanban Flow
                </motion.h1>
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="text-xl md:text-2xl text-white/60 tracking-tight"
                >
                    Manage your tasks. Master your workflow.
                </motion.p>
            </motion.div>
        </div>

        {/* Section 2: Personal & Intuitive (25-50% scroll) */}
        <div className="h-screen flex items-center justify-start p-6 md:pl-24">
             <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ margin: "-20% 0px -20% 0px" }}
                transition={{ duration: 0.8 }}
                className="max-w-md"
            >
                <div className="w-12 h-1 bg-cyan-glow mb-6 rounded-full shadow-[0_0_15px_rgba(0,242,254,0.5)]" />
                <h2 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">Personal &<br/>Intuitive</h2>
                <p className="text-lg text-white/50 leading-relaxed">
                    Designed for focus. Organizing your life shouldn't feel like work.
                    Experience a fluid interface that adapts to your thinking.
                </p>
            </motion.div>
        </div>

        {/* Section 3: Drag, Drop, Complete (50-75% scroll) */}
        <div className="h-screen flex items-center justify-end p-6 md:pr-24">
             <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ margin: "-20% 0px -20% 0px" }}
                transition={{ duration: 0.8 }}
                className="max-w-md text-right"
            >
                <div className="w-12 h-1 bg-cyan-glow mb-6 ml-auto rounded-full shadow-[0_0_15px_rgba(0,242,254,0.5)]" />
                <h2 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">Drag, Drop,<br/>Complete</h2>
                <p className="text-lg text-white/50 leading-relaxed">
                    Visual progress tracking. Move tasks effortlessly through your workflow
                    and celebrate every completion.
                </p>
            </motion.div>
        </div>

        {/* Section 4: Call to Action (75-100% scroll) */}
        <div className="h-[80vh] flex items-center justify-center p-6 text-center">
             <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ margin: "-10% 0px" }}
                transition={{ duration: 0.8 }}
                className="relative group"
            >
                <div className="absolute inset-0 bg-cyan-glow/20 blur-[50px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                <h2 className="text-4xl md:text-7xl font-bold mb-10 tracking-tighter relative z-10">
                    Ready to Start?
                </h2>
                
                <Link to="/login">
                    <button className="relative z-10 group bg-white text-black px-8 py-4 rounded-full text-lg font-bold flex items-center gap-3 hover:scale-105 transition-transform duration-300">
                        Login to Begin
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                </Link>
                
                <p className="mt-8 text-white/40 text-sm relative z-10">
                    Join thousands of productive users today.
                </p>
            </motion.div>
        </div>
        
        {/* Footer */}
        <div className="h-20 flex items-center justify-center border-t border-white/5 bg-black/40 backdrop-blur-sm relative z-10">
            <p className="text-white/30 text-sm">© 2024 Kanban Flow. Designed with focus.</p>
        </div>
      </div>
    </div>
  );
}
