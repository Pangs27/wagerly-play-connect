import { motion } from "framer-motion";
import { TrendingUp, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { PredictionTicket } from "@/components/features/PredictionTicket";

export default function Predictions() {
  const navigate = useNavigate();
  const [selectedMarket, setSelectedMarket] = useState<string | null>(null);

  const markets = [
    {
      id: 1,
      question: "Will Team A win the championship?",
      yesPrice: 67,
      change24h: +5,
      volume: 12500,
      closing: "2 days"
    },
    {
      id: 2,
      question: "Will new game reach 1M players?",
      yesPrice: 42,
      change24h: -3,
      volume: 8900,
      closing: "5 days"
    },
    {
      id: 3,
      question: "Will streamer hit 100K subs?",
      yesPrice: 78,
      change24h: +12,
      volume: 15200,
      closing: "1 day"
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/40 bg-background/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <button
            onClick={() => navigate('/app/welcome')}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Features</span>
          </button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-[#FF3B30] to-[#7C5CFF]">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold">Predictions Market</h1>
              <p className="text-muted-foreground mt-2">Trade on outcomes using virtual Coins</p>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF3B30]/10 border border-[#FF3B30]/20 mb-8">
            <div className="w-2 h-2 rounded-full bg-[#FF3B30] animate-pulse" />
            <span className="text-sm">Entertainment only. Coins ≠ cash.</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Markets List */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold mb-4">Active Markets</h2>
              {markets.map((market, index) => (
                <motion.div
                  key={market.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setSelectedMarket(market.question)}
                  className="p-6 rounded-xl bg-card border border-border hover:border-border/60 cursor-pointer transition-all hover:shadow-[0_0_20px_rgba(124,92,255,0.3)]"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <h3 className="font-semibold mb-4">{market.question}</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Yes Price</p>
                      <p className="text-2xl font-bold text-[#00E0C6]">{market.yesPrice}¢</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">24h Change</p>
                      <p className={`text-2xl font-bold ${market.change24h > 0 ? 'text-[#00E0C6]' : 'text-[#FF3B30]'}`}>
                        {market.change24h > 0 ? '+' : ''}{market.change24h}%
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Volume</p>
                      <p className="font-semibold">{market.volume.toLocaleString()} Coins</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Closes in</p>
                      <p className="font-semibold">{market.closing}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Order Ticket */}
            <div className="lg:sticky lg:top-24 h-fit">
              <PredictionTicket selectedMarket={selectedMarket} />
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
