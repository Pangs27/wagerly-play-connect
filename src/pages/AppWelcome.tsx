import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { WalletPill } from "@/components/features/WalletPill";
import { ComplianceBanner } from "@/components/features/ComplianceBanner";
import { FeatureCard } from "@/components/features/FeatureCard";
import { Swords, Users, TrendingUp } from "lucide-react";

export default function AppWelcome() {
  const [balance, setBalance] = useState(2450);

  useEffect(() => {
    document.title = "BragRights - Features & Coins Economy";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Explore BragRights features: social wagering, player matchmaking, and predictions market - all powered by virtual coins.');
    }

    // Initialize wallet if not exists
    const stored = localStorage.getItem('bragrights_wallet');
    if (!stored) {
      const initialWallet = {
        balance: 2450,
        transactions: [
          { id: 1, type: 'bonus', amount: 500, description: 'Welcome Bonus', timestamp: Date.now() - 86400000 },
          { id: 2, type: 'earn', amount: 200, description: 'Invite Friend', timestamp: Date.now() - 43200000 },
          { id: 3, type: 'win', amount: 1750, description: 'Won Wager vs @player123', timestamp: Date.now() - 7200000 },
        ]
      };
      localStorage.setItem('bragrights_wallet', JSON.stringify(initialWallet));
      setBalance(initialWallet.balance);
    } else {
      setBalance(JSON.parse(stored).balance);
    }
  }, []);

  const features = [
    {
      icon: Swords,
      title: "Social Wagering",
      description: "Challenge friends or the community with coin-backed wagers. Set stakes, rules, and timelines — winner takes Coins and bragging rights.",
      href: "/wagers",
      gradient: "from-[#7C5CFF] to-[#00E0C6]"
    },
    {
      icon: Users,
      title: "Player Matchmaking",
      description: "Smart matching for 1v1 or team showdowns. Filter by game, rank, region, and availability.",
      href: "/matchmaking",
      gradient: "from-[#00E0C6] to-[#7C5CFF]"
    },
    {
      icon: TrendingUp,
      title: "Predictions (Coins Market)",
      description: "Trade on outcomes using Coins. Buy Yes/No shares; price = probability; settle at 100 Coins if correct.",
      href: "/predictions",
      gradient: "from-[#FF3B30] to-[#7C5CFF]"
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Compliance Banner */}
      <ComplianceBanner />

      {/* Header with Wallet */}
      <header className="sticky top-0 z-40 border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <motion.h1 
            className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#7C5CFF] to-[#00E0C6] bg-clip-text text-transparent"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            BragRights
          </motion.h1>
          <WalletPill balance={balance} onBalanceChange={setBalance} />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Choose Your Game
          </h2>
          <p className="text-center text-muted-foreground text-lg mb-12 max-w-2xl mx-auto">
            Compete, predict, and earn virtual coins across our features. No real money, pure bragging rights.
          </p>
        </motion.div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} {...feature} index={index} />
          ))}
        </div>

        {/* Bottom Info */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 border border-border/50">
            <div className="w-2 h-2 rounded-full bg-[#00E0C6] animate-pulse" />
            <span className="text-sm text-muted-foreground">
              Entertainment only. Coins ≠ cash.
            </span>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
