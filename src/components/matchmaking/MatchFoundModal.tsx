import { useState, useEffect } from 'react';
import { Player } from '@/types/matchmaking';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trophy, Clock, Zap } from 'lucide-react';

interface MatchFoundModalProps {
  isOpen: boolean;
  onClose: () => void;
  opponent: Player;
  userStats: {
    handle: string;
    mmr: number;
    tier: string;
    platform: string;
    latency_ms: number;
  };
}

export function MatchFoundModal({ isOpen, onClose, opponent, userStats }: MatchFoundModalProps) {
  const [timeLeft, setTimeLeft] = useState(20);
  const [askedExtra, setAskedExtra] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setTimeLeft(20);
      setAskedExtra(false);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleDecline();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen]);

  const handleConfirm = () => {
    console.log('Match confirmed with:', opponent.handle);
    onClose();
  };

  const handleDecline = () => {
    console.log('Match declined, keeping in queue');
    onClose();
  };

  const handleAskExtra = () => {
    if (!askedExtra) {
      setTimeLeft(prev => prev + 5);
      setAskedExtra(true);
      console.log('Asked for 5 more seconds');
    }
  };

  const progress = (timeLeft / (askedExtra ? 25 : 20)) * 100;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Trophy className="h-6 w-6 text-primary animate-pulse" />
            Match Found!
          </DialogTitle>
          <DialogDescription>
            Review your opponent's stats and confirm the match
          </DialogDescription>
        </DialogHeader>

        {/* Timer Progress Ring */}
        <div className="flex justify-center my-4">
          <div className="relative w-24 h-24">
            <svg className="w-24 h-24 transform -rotate-90">
              <circle
                cx="48"
                cy="48"
                r="40"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                className="text-muted"
              />
              <circle
                cx="48"
                cy="48"
                r="40"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 40}`}
                strokeDashoffset={`${2 * Math.PI * 40 * (1 - progress / 100)}`}
                className="text-primary transition-all duration-1000"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-3xl font-bold">{timeLeft}</span>
            </div>
          </div>
        </div>

        {/* Side-by-side Comparison */}
        <div className="grid grid-cols-2 gap-4 my-6">
          {/* You */}
          <div className="p-4 bg-card rounded-lg border border-primary/50">
            <div className="text-center mb-3">
              <Badge variant="default" className="mb-2">You</Badge>
              <h3 className="font-semibold text-lg">{userStats.handle}</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">MMR</span>
                <span className="font-medium">{userStats.mmr}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tier</span>
                <span className="font-medium">{userStats.tier}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Platform</span>
                <span className="font-medium">{userStats.platform}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Ping</span>
                <span className="font-medium">{userStats.latency_ms}ms</span>
              </div>
            </div>
          </div>

          {/* Opponent */}
          <div className="p-4 bg-card rounded-lg border border-accent/50">
            <div className="text-center mb-3">
              <Badge variant="secondary" className="mb-2">Opponent</Badge>
              <h3 className="font-semibold text-lg">{opponent.handle}</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">MMR</span>
                <span className="font-medium">{opponent.mmr.value}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tier</span>
                <span className="font-medium">{opponent.mmr.tier}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Platform</span>
                <span className="font-medium">{opponent.platform}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Ping</span>
                <span className="font-medium">{opponent.latency_ms}ms</span>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button 
            variant="hero" 
            size="lg" 
            className="flex-1"
            onClick={handleConfirm}
          >
            <Trophy className="h-5 w-5 mr-2" />
            Accept Match
          </Button>
          {!askedExtra && timeLeft > 5 && (
            <Button 
              variant="outline" 
              size="lg"
              onClick={handleAskExtra}
            >
              <Clock className="h-5 w-5 mr-2" />
              +5s
            </Button>
          )}
          <Button 
            variant="ghost" 
            size="lg"
            onClick={handleDecline}
          >
            Decline
          </Button>
        </div>

        <p className="text-xs text-center text-muted-foreground mt-2">
          Declining keeps you in queue with no penalty (once per hour)
        </p>
      </DialogContent>
    </Dialog>
  );
}
