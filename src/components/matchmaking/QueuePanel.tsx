import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, TrendingUp, Zap } from 'lucide-react';
import { QueueStats } from '@/types/matchmaking';

interface QueuePanelProps {
  stats: QueueStats;
  onWidenSearch: () => void;
}

export function QueuePanel({ stats, onWidenSearch }: QueuePanelProps) {
  const formatTime = (seconds: number) => {
    if (seconds < 60) return `${seconds}s`;
    return `${Math.floor(seconds / 60)}m ${seconds % 60}s`;
  };

  return (
    <Card className="p-4 bg-gradient-card border-primary/30 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary animate-pulse" />
          Queue Status
        </h2>
        <Badge 
          variant="outline" 
          className="cursor-pointer hover:bg-primary/20 transition-colors border-primary/50"
          onClick={onWidenSearch}
        >
          <Zap className="h-3 w-3 mr-1" />
          Widen Search
        </Badge>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="text-center p-3 rounded-lg bg-background/50">
          <div className="text-2xl font-bold text-primary mb-1">
            {formatTime(stats.personalETA)}
          </div>
          <div className="text-xs text-muted-foreground">Your ETA</div>
        </div>

        <div className="text-center p-3 rounded-lg bg-background/50">
          <div className="text-2xl font-bold flex items-center justify-center gap-1 mb-1">
            <Users className="h-5 w-5" />
            {stats.queueSize}
          </div>
          <div className="text-xs text-muted-foreground">In Queue</div>
        </div>

        <div className="text-center p-3 rounded-lg bg-background/50">
          <div className="text-2xl font-bold flex items-center justify-center gap-1 mb-1">
            <TrendingUp className="h-5 w-5" />
            {formatTime(stats.medianWait)}
          </div>
          <div className="text-xs text-muted-foreground">Median Wait</div>
        </div>
      </div>
    </Card>
  );
}
