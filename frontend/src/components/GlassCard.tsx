import { cn } from '@/lib/utils';
import { motion, HTMLMotionProps } from 'framer-motion';
import { ReactNode } from 'react';

// Combined props from HTML div and Framer Motion
interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export function GlassCard({ children, className, hoverEffect = false, ...props }: GlassCardProps) {
  return (
    <motion.div
      className={cn(
        "relative overflow-hidden rounded-xl border border-white/10 bg-gray-900/40 backdrop-blur-xl shadow-lg",
        hoverEffect && "transition-all duration-300 hover:shadow-cyan-500/20 hover:border-cyan-500/30 hover:scale-[1.01]",
        className
      )}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      {...props}
    >
      {/* Subtle shine effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
      
      {children}
    </motion.div>
  );
}
