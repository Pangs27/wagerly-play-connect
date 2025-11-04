import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
  gradient: string;
  index: number;
}

export const FeatureCard = ({ icon: Icon, title, description, href, gradient, index }: FeatureCardProps) => {
  const navigate = useNavigate();
  const cardRef = useRef<HTMLDivElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), { stiffness: 400, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), { stiffness: 400, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const x = (e.clientX - centerX) / (rect.width / 2);
    const y = (e.clientY - centerY) / (rect.height / 2);
    
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleClick = () => {
    navigate(href);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      onClick={handleClick}
      className="relative group cursor-pointer perspective-1000"
    >
      <div className="relative rounded-2xl bg-card border border-border p-6 md:p-8 overflow-hidden transition-all duration-300 hover:border-border/60 hover:shadow-[0_0_30px_rgba(255,59,48,0.3)]">
        {/* Background gradient overlay on hover */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
        />
        
        {/* Shimmer effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          initial={{ x: "-100%" }}
          whileHover={{
            x: "100%",
            transition: { duration: 0.8, ease: "easeInOut" }
          }}
        />

        {/* Icon */}
        <motion.div
          className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${gradient} mb-4 group-hover:shadow-[0_0_20px_rgba(255,59,48,0.3)] transition-shadow`}
          whileHover={{ rotate: [0, -5, 5, -5, 0] }}
          transition={{ duration: 0.5 }}
        >
          <Icon className="w-8 h-8 text-white" />
        </motion.div>

        {/* Content */}
        <h3 className="text-2xl font-bold mb-3 group-hover:bg-gradient-to-r group-hover:from-[#7C5CFF] group-hover:to-[#00E0C6] group-hover:bg-clip-text group-hover:text-transparent transition-all">
          {title}
        </h3>
        <p className="text-muted-foreground leading-relaxed mb-6">
          {description}
        </p>

        {/* CTA */}
        <div className="flex items-center gap-2 text-sm font-semibold bg-gradient-to-r from-[#7C5CFF] to-[#00E0C6] bg-clip-text text-transparent">
          <span>Explore Feature</span>
          <motion.svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="text-[#7C5CFF]"
            initial={{ x: 0 }}
            whileHover={{ x: 4 }}
            transition={{ duration: 0.2 }}
          >
            <path
              d="M6 3L11 8L6 13"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>
        </div>

        {/* Focus ring */}
        <div className="absolute inset-0 rounded-2xl ring-2 ring-transparent group-focus-visible:ring-[#FF3B30] pointer-events-none" />
      </div>
    </motion.div>
  );
};
