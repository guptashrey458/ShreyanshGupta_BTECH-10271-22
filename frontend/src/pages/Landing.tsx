import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import LandingScrollAnimation from '@/components/LandingScrollAnimation';
import { ArrowRight } from 'lucide-react';

export default function Landing() {
  // Anti-gravity floating animation for text
  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut" as const
    }
  };

  return (
    <div className="relative bg-cinematic-bg text-white overflow-hidden font-sans selection:bg-cyan-glow selection:text-cinematic-bg">
      {/* Background Scroll Animation */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <LandingScrollAnimation frameCount={25} />
      </div>

      {/* Content Overlay Container - Matches height of scroll animation */}
      <div className="relative z-10 w-full">
        {/* Section 1: Intro (0-25% scroll) - Centered */}
        <div className="h-screen flex items-center justify-center p-6 text-center">
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="max-w-5xl"
            >
                <motion.h1 
                    animate={floatingAnimation}
                    className="text-5xl md:text-8xl font-bold tracking-tighter mb-8 text-white/90"
                >
                    Kanban Flow
                </motion.h1>
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="text-xl md:text-3xl text-white/60 tracking-tight font-light"
                >
                    Manage Your Tasks.
                </motion.p>
            </motion.div>
        </div>

        {/* Section 2: Personal & Intuitive (25-50% scroll) - Left Aligned */}
        <div className="h-screen flex items-center justify-start p-6 md:pl-32">
             <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ margin: "-20% 0px -20% 0px" }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="max-w-lg"
            >
                <motion.div animate={floatingAnimation}>
                    <h2 className="text-4xl md:text-7xl font-bold mb-6 tracking-tight text-white/90">
                        Personal &<br/>Intuitive
                    </h2>
                    <p className="text-xl text-white/60 leading-relaxed font-light">
                        Designed for focus. Organizing your life shouldn't feel like work.
                    </p>
                </motion.div>
            </motion.div>
        </div>

        {/* Section 3: Drag, Drop, Complete (50-75% scroll) - Right Aligned */}
        <div className="h-screen flex items-center justify-end p-6 md:pr-32">
             <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ margin: "-20% 0px -20% 0px" }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="max-w-lg text-right"
            >
                <motion.div animate={floatingAnimation}>
                    <h2 className="text-4xl md:text-7xl font-bold mb-6 tracking-tight text-white/90">
                        Drag. Drop.<br/>Complete.
                    </h2>
                    <p className="text-xl text-white/60 leading-relaxed font-light">
                        Visual progress tracking. Move tasks effortlessly through your workflow.
                    </p>
                </motion.div>
            </motion.div>
        </div>

        {/* Section 4: Call to Action (75-100% scroll) - Centered */}
        <div className="h-[80vh] flex items-center justify-center p-6 text-center">
             <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ margin: "-10% 0px" }}
                transition={{ duration: 1 }}
                className="relative group"
            >
                {/* Floating Glow Effect */}
                <div className="absolute -inset-4 bg-cyan-glow/20 blur-[60px] rounded-full opacity-60 animate-pulse" />
                
                <h2 className="text-5xl md:text-8xl font-bold mb-12 tracking-tighter relative z-10 text-white/90">
                    Ready to Start?
                </h2>
                
                <Link to="/login">
                    <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="relative z-10 bg-white/10 backdrop-blur-md border border-white/20 text-white px-10 py-5 rounded-full text-xl font-medium flex items-center gap-4 hover:bg-white/20 hover:border-cyan-glow/50 transition-all duration-300 shadow-[0_0_30px_rgba(0,0,0,0.3)]"
                    >
                        Get Started
                        <ArrowRight className="w-6 h-6" />
                    </motion.button>
                </Link>
            </motion.div>
        </div>
        
        {/* Footer */}
        <div className="h-24 flex items-center justify-center border-t border-white/5 bg-black/60 backdrop-blur-md relative z-10">
        </div>
      </div>
    </div>
  );
}
