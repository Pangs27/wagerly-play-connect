import { motion } from "framer-motion";
import { LogIn, UserPlus } from "lucide-react";

interface AuthButtonProps {
  mode: "login" | "signup";
  onClick?: () => void;
  className?: string;
}

export const AuthButton = ({ mode, onClick, className = "" }: AuthButtonProps) => {
  const Icon = mode === "login" ? LogIn : UserPlus;
  const text = mode === "login" ? "Login" : "Sign Up";

  return (
    <motion.button
      onClick={onClick}
      className={`
        relative overflow-hidden rounded-full
        bg-gradient-to-r from-[#7C5CFF] to-[#00E0C6]
        px-6 py-2 md:px-8 md:py-3
        text-sm md:text-base font-semibold text-white
        shadow-lg shadow-[#7C5CFF]/20
        transition-shadow duration-300
        hover:shadow-xl hover:shadow-[#7C5CFF]/40
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFF] focus-visible:ring-offset-2
        ${className}
      `}
      initial={false}
      whileHover={{
        y: -2,
        transition: { type: "spring", stiffness: 400, damping: 17 }
      }}
      whileTap={{
        scale: 0.97,
        transition: { type: "spring", stiffness: 400, damping: 17 }
      }}
    >
      {/* Shimmer effect on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        initial={{ x: "-100%" }}
        whileHover={{
          x: "100%",
          transition: { duration: 0.6, ease: "easeInOut" }
        }}
      />
      
      {/* Inner glow pulse */}
      <motion.div
        className="absolute inset-0 rounded-full bg-white/0"
        whileHover={{
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          transition: {
            duration: 0.3,
            repeat: Infinity,
            repeatType: "reverse"
          }
        }}
      />
      
      <span className="relative flex items-center gap-2 justify-center">
        <Icon size={18} />
        {text}
      </span>
    </motion.button>
  );
};
