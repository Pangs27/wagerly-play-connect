import { motion } from "framer-motion";
import { Swords } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Wagers() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-2xl"
      >
        <div className="inline-flex p-6 rounded-3xl bg-gradient-to-br from-[#7C5CFF] to-[#00E0C6] mb-6">
          <Swords className="w-16 h-16 text-white" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#7C5CFF] to-[#00E0C6] bg-clip-text text-transparent">
          Social Wagering
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          Challenge friends or the community with coin-backed wagers. Coming soon!
        </p>
        <motion.button
          onClick={() => navigate('/app/welcome')}
          className="px-6 py-3 rounded-full bg-gradient-to-r from-[#7C5CFF] to-[#00E0C6] text-white font-semibold hover:shadow-lg transition-shadow"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Back to Features
        </motion.button>
      </motion.div>
    </div>
  );
}
