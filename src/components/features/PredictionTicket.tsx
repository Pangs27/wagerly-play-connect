import { useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface PredictionTicketProps {
  selectedMarket: string | null;
}

export const PredictionTicket = ({ selectedMarket }: PredictionTicketProps) => {
  const [position, setPosition] = useState<'yes' | 'no'>('yes');
  const [shares, setShares] = useState(10);
  const price = position === 'yes' ? 67 : 33;
  const cost = (shares * price) / 100;
  const maxPayout = shares;
  const profit = maxPayout - cost;

  const handleTrade = () => {
    if (!selectedMarket) {
      toast({
        title: "No Market Selected",
        description: "Please select a market first",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Order Placed! 📈",
      description: `${shares} shares of ${position.toUpperCase()} for ${cost.toFixed(0)} Coins`,
    });
  };

  return (
    <div className="p-6 rounded-xl bg-card border border-border">
      <h2 className="text-2xl font-bold mb-6">Order Ticket</h2>

      {!selectedMarket && (
        <div className="text-center py-12 text-muted-foreground">
          <p>Select a market to start trading</p>
        </div>
      )}

      {selectedMarket && (
        <div className="space-y-6">
          {/* Position Toggle */}
          <div className="grid grid-cols-2 gap-3">
            <motion.button
              onClick={() => setPosition('yes')}
              className={`p-4 rounded-lg border-2 transition-all ${
                position === 'yes'
                  ? 'border-[#00E0C6] bg-[#00E0C6]/10'
                  : 'border-border hover:border-border/60'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <TrendingUp className="w-5 h-5 text-[#00E0C6] mx-auto mb-2" />
              <p className="font-semibold">Yes</p>
              <p className="text-2xl font-bold text-[#00E0C6]">67¢</p>
            </motion.button>
            <motion.button
              onClick={() => setPosition('no')}
              className={`p-4 rounded-lg border-2 transition-all ${
                position === 'no'
                  ? 'border-[#FF3B30] bg-[#FF3B30]/10'
                  : 'border-border hover:border-border/60'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <TrendingDown className="w-5 h-5 text-[#FF3B30] mx-auto mb-2" />
              <p className="font-semibold">No</p>
              <p className="text-2xl font-bold text-[#FF3B30]">33¢</p>
            </motion.button>
          </div>

          {/* Shares Input */}
          <div>
            <label className="block text-sm font-medium mb-2">Shares</label>
            <input
              type="number"
              value={shares}
              onChange={(e) => setShares(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-[#7C5CFF] focus:ring-2 focus:ring-[#7C5CFF]/20 outline-none transition-all"
              min="1"
            />
          </div>

          {/* Calculation */}
          <div className="space-y-3 p-4 rounded-lg bg-muted/30">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Cost</span>
              <span className="font-semibold tabular-nums">{cost.toFixed(0)} Coins</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Max Payout</span>
              <span className="font-semibold tabular-nums">{maxPayout} Coins</span>
            </div>
            <div className="h-px bg-border" />
            <div className="flex justify-between">
              <span className="font-medium">Potential Profit</span>
              <span className="font-bold text-[#00E0C6] tabular-nums">+{profit.toFixed(0)} Coins</span>
            </div>
          </div>

          {/* Submit */}
          <motion.button
            onClick={handleTrade}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-[#7C5CFF] to-[#00E0C6] text-white font-semibold hover:shadow-lg transition-shadow"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            Place Order
          </motion.button>

          <p className="text-xs text-center text-muted-foreground">
            Settles at 100 Coins if correct, 0 if wrong
          </p>
        </div>
      )}
    </div>
  );
};
