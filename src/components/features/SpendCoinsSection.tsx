import { motion } from "framer-motion";
import { Sparkles, Shield, Zap } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface SpendCoinsSectionProps {
  balance: number;
  onBalanceChange: (newBalance: number) => void;
}

export const SpendCoinsSection = ({ balance, onBalanceChange }: SpendCoinsSectionProps) => {
  const handlePurchase = (cost: number, item: string) => {
    if (balance < cost) {
      toast({
        title: "Insufficient Coins",
        description: `You need ${cost - balance} more coins for ${item}`,
        variant: "destructive"
      });
      return;
    }

    const stored = localStorage.getItem('bragrights_wallet');
    if (stored) {
      const wallet = JSON.parse(stored);
      const newBalance = wallet.balance - cost;
      const newTransaction = {
        id: Date.now(),
        type: 'spend',
        amount: cost,
        description: `Purchased ${item}`,
        timestamp: Date.now()
      };
      
      wallet.balance = newBalance;
      wallet.transactions.unshift(newTransaction);
      
      localStorage.setItem('bragrights_wallet', JSON.stringify(wallet));
      onBalanceChange(newBalance);
      
      toast({
        title: "Purchase Complete! 🎁",
        description: `You bought ${item} for ${cost} Coins`,
      });
    }
  };

  const items = [
    {
      icon: Sparkles,
      title: "Legendary Badge",
      cost: 500,
      description: "Show off your status"
    },
    {
      icon: Shield,
      title: "Profile Frame",
      cost: 300,
      description: "Customize your profile"
    },
    {
      icon: Zap,
      title: "2x Booster",
      cost: 150,
      description: "Double coins for 24h"
    }
  ];

  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground mb-4">
        Spend coins on cosmetics and boosters
      </p>
      {items.map((item, index) => {
        const canAfford = balance >= item.cost;
        
        return (
          <motion.button
            key={item.title}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => handlePurchase(item.cost, item.title)}
            disabled={!canAfford}
            className="w-full flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-left group"
            whileHover={canAfford ? { scale: 1.02 } : {}}
            whileTap={canAfford ? { scale: 0.98 } : {}}
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-gradient-to-br from-[#FF3B30] to-[#7C5CFF]">
                <item.icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium">{item.title}</p>
                <p className="text-xs text-muted-foreground">{item.description}</p>
              </div>
            </div>
            <div className={`font-semibold tabular-nums ${canAfford ? 'text-foreground' : 'text-muted-foreground'}`}>
              {item.cost.toLocaleString()}
            </div>
          </motion.button>
        );
      })}
    </div>
  );
};
