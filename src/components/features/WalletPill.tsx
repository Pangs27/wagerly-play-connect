import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { Wallet, TrendingUp, ShoppingBag, History } from "lucide-react";
import { Ledger } from "./Ledger";
import { EarnCoinsSection } from "./EarnCoinsSection";
import { SpendCoinsSection } from "./SpendCoinsSection";

interface WalletPillProps {
  balance: number;
  onBalanceChange: (newBalance: number) => void;
}

export const WalletPill = ({ balance, onBalanceChange }: WalletPillProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'ledger' | 'earn' | 'spend'>('ledger');
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const displayBalance = useMotionValue(balance);
  const springBalance = useSpring(displayBalance, { stiffness: 100, damping: 20 });
  const [animatedBalance, setAnimatedBalance] = useState(balance);

  useEffect(() => {
    displayBalance.set(balance);
    const unsubscribe = springBalance.on('change', (latest) => {
      setAnimatedBalance(Math.round(latest));
    });
    return unsubscribe;
  }, [balance, displayBalance, springBalance]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 rounded-full bg-gradient-to-r from-[#7C5CFF] to-[#00E0C6] text-white font-semibold shadow-lg hover:shadow-xl transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3B30] focus-visible:ring-offset-2"
        whileHover={{ y: -2, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Wallet className="w-5 h-5" />
        <span className="text-sm md:text-base tabular-nums">
          {animatedBalance.toLocaleString()} Coins
        </span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-[360px] md:w-[420px] rounded-2xl bg-card border border-border shadow-2xl overflow-hidden z-50"
          >
            {/* Tabs */}
            <div className="flex border-b border-border bg-muted/30">
              <button
                onClick={() => setActiveTab('ledger')}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === 'ledger'
                    ? 'bg-background text-foreground border-b-2 border-[#7C5CFF]'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <History className="w-4 h-4" />
                Ledger
              </button>
              <button
                onClick={() => setActiveTab('earn')}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === 'earn'
                    ? 'bg-background text-foreground border-b-2 border-[#00E0C6]'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <TrendingUp className="w-4 h-4" />
                Earn
              </button>
              <button
                onClick={() => setActiveTab('spend')}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === 'spend'
                    ? 'bg-background text-foreground border-b-2 border-[#FF3B30]'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                Spend
              </button>
            </div>

            {/* Content */}
            <div className="p-4 max-h-[400px] overflow-y-auto">
              {activeTab === 'ledger' && <Ledger />}
              {activeTab === 'earn' && <EarnCoinsSection onBalanceChange={onBalanceChange} />}
              {activeTab === 'spend' && <SpendCoinsSection balance={balance} onBalanceChange={onBalanceChange} />}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
