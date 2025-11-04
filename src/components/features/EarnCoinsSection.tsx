import { motion } from "framer-motion";
import { Calendar, UserPlus, Trophy } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface EarnCoinsSectionProps {
  onBalanceChange: (newBalance: number) => void;
}

export const EarnCoinsSection = ({ onBalanceChange }: EarnCoinsSectionProps) => {
  const handleEarn = (amount: number, description: string) => {
    const stored = localStorage.getItem('bragrights_wallet');
    if (stored) {
      const wallet = JSON.parse(stored);
      const newBalance = wallet.balance + amount;
      const newTransaction = {
        id: Date.now(),
        type: 'earn',
        amount,
        description,
        timestamp: Date.now()
      };
      
      wallet.balance = newBalance;
      wallet.transactions.unshift(newTransaction);
      
      localStorage.setItem('bragrights_wallet', JSON.stringify(wallet));
      onBalanceChange(newBalance);
      
      toast({
        title: "Coins Earned! 🎉",
        description: `+${amount} Coins from ${description}`,
      });
    }
  };

  const earnOptions = [
    {
      icon: Calendar,
      title: "Daily Check-in",
      reward: 20,
      description: "Come back tomorrow",
      action: () => handleEarn(20, "Daily Check-in")
    },
    {
      icon: UserPlus,
      title: "Invite a Friend",
      reward: 200,
      description: "Share your referral code",
      action: () => handleEarn(200, "Invite Friend")
    },
    {
      icon: Trophy,
      title: "Win Wagers",
      reward: 0,
      description: "Variable rewards",
      action: () => {}
    }
  ];

  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground mb-4">
        Complete activities to earn more coins
      </p>
      {earnOptions.map((option, index) => (
        <motion.button
          key={option.title}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.05 }}
          onClick={option.action}
          disabled={option.reward === 0}
          className="w-full flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-left group"
          whileHover={option.reward > 0 ? { scale: 1.02 } : {}}
          whileTap={option.reward > 0 ? { scale: 0.98 } : {}}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-gradient-to-br from-[#7C5CFF] to-[#00E0C6]">
              <option.icon className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium">{option.title}</p>
              <p className="text-xs text-muted-foreground">{option.description}</p>
            </div>
          </div>
          {option.reward > 0 && (
            <div className="text-[#00E0C6] font-semibold tabular-nums">
              +{option.reward}
            </div>
          )}
        </motion.button>
      ))}
    </div>
  );
};
