import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Gift } from "lucide-react";

interface Transaction {
  id: number;
  type: 'bonus' | 'earn' | 'win' | 'spend' | 'lose';
  amount: number;
  description: string;
  timestamp: number;
}

export const Ledger = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('bragrights_wallet');
    if (stored) {
      const wallet = JSON.parse(stored);
      setTransactions(wallet.transactions || []);
    }
  }, []);

  const getIcon = (type: string) => {
    switch (type) {
      case 'bonus':
      case 'earn':
      case 'win':
        return <TrendingUp className="w-4 h-4 text-[#00E0C6]" />;
      case 'spend':
      case 'lose':
        return <TrendingDown className="w-4 h-4 text-[#FF3B30]" />;
      default:
        return <Gift className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (hours < 24) {
      return `${hours}h ago`;
    } else {
      return `${days}d ago`;
    }
  };

  return (
    <div className="space-y-3">
      {transactions.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          <p>No transactions yet</p>
        </div>
      ) : (
        transactions.map((transaction, index) => (
          <motion.div
            key={transaction.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-background">
                {getIcon(transaction.type)}
              </div>
              <div>
                <p className="text-sm font-medium">{transaction.description}</p>
                <p className="text-xs text-muted-foreground">{formatTime(transaction.timestamp)}</p>
              </div>
            </div>
            <div className={`font-semibold tabular-nums ${
              ['bonus', 'earn', 'win'].includes(transaction.type)
                ? 'text-[#00E0C6]'
                : 'text-[#FF3B30]'
            }`}>
              {['bonus', 'earn', 'win'].includes(transaction.type) ? '+' : '-'}
              {transaction.amount.toLocaleString()}
            </div>
          </motion.div>
        ))
      )}
    </div>
  );
};
