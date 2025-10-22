import { Player } from '@/types/matchmaking';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, XCircle, Clock } from 'lucide-react';

interface DeepPeekProps {
  player: Player;
  isOpen: boolean;
  onClose: () => void;
}

export function DeepPeek({ player, isOpen, onClose }: DeepPeekProps) {
  const winRate = (player.recent_form.filter(f => f.result === 'W').length / player.recent_form.length) * 100;
  
  // Mock play-time heatmap data (hours per day of week)
  const playTimeData = [
    { day: 'Mon', hours: 3.5 },
    { day: 'Tue', hours: 2.0 },
    { day: 'Wed', hours: 4.5 },
    { day: 'Thu', hours: 3.0 },
    { day: 'Fri', hours: 5.5 },
    { day: 'Sat', hours: 6.0 },
    { day: 'Sun', hours: 5.0 }
  ];

  const maxHours = Math.max(...playTimeData.map(d => d.hours));

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-3">
            <img 
              src={player.avatar_url} 
              alt={player.handle}
              className="w-12 h-12 rounded-full border-2 border-primary"
            />
            <div>
              <div>{player.handle}</div>
              <div className="text-sm font-normal text-muted-foreground">
                {player.mmr.tier} • {player.mmr.value} MMR
              </div>
            </div>
          </SheetTitle>
          <SheetDescription>
            Detailed player statistics and verification status
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Last 10 Games Performance */}
          <div>
            <h3 className="text-sm font-semibold mb-3">Recent Performance</h3>
            <div className="flex items-end justify-between h-32 gap-1 p-3 bg-card rounded-lg border">
              {player.recent_form.map((form, i) => {
                const height = form.result === 'W' ? 100 : form.result === 'L' ? 40 : 70;
                return (
                  <div
                    key={i}
                    className={`flex-1 rounded-t transition-all hover:opacity-80 ${
                      form.result === 'W' ? 'bg-green-500' : 
                      form.result === 'L' ? 'bg-red-500' : 'bg-gray-500'
                    }`}
                    style={{ height: `${height}%` }}
                    title={`Game ${i + 1}: ${form.result}`}
                  />
                );
              })}
            </div>
            <div className="flex justify-between mt-2 text-xs text-muted-foreground">
              <span>10 games ago</span>
              <span className="font-medium">{winRate.toFixed(0)}% Win Rate</span>
              <span>Most recent</span>
            </div>
          </div>

          {/* Play-time Heatmap */}
          <div>
            <h3 className="text-sm font-semibold mb-3">Weekly Activity</h3>
            <div className="space-y-2">
              {playTimeData.map((data) => (
                <div key={data.day} className="flex items-center gap-3">
                  <span className="text-xs font-medium w-8">{data.day}</span>
                  <div className="flex-1 h-6 bg-card rounded-full overflow-hidden border">
                    <div 
                      className="h-full bg-gradient-primary transition-all"
                      style={{ width: `${(data.hours / maxHours) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground w-12 text-right">
                    {data.hours}h
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Verification Rings */}
          <div>
            <h3 className="text-sm font-semibold mb-3">Verification Status</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-card rounded-lg border">
                <div className="flex items-center gap-2">
                  {player.verification.device ? (
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )}
                  <span className="text-sm">Device Verified</span>
                </div>
                <Badge variant={player.verification.device ? 'default' : 'destructive'}>
                  {player.verification.device ? 'Verified' : 'Pending'}
                </Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-card rounded-lg border">
                <div className="flex items-center gap-2">
                  {player.verification.telemetry ? (
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )}
                  <span className="text-sm">Telemetry Enabled</span>
                </div>
                <Badge variant={player.verification.telemetry ? 'default' : 'destructive'}>
                  {player.verification.telemetry ? 'Active' : 'Inactive'}
                </Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-card rounded-lg border">
                <div className="flex items-center gap-2">
                  {player.verification.low_reports ? (
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  ) : (
                    <Clock className="h-5 w-5 text-yellow-500" />
                  )}
                  <span className="text-sm">Low Report History</span>
                </div>
                <Badge variant={player.verification.low_reports ? 'default' : 'secondary'}>
                  {player.reports_30d} reports (30d)
                </Badge>
              </div>
            </div>
          </div>

          {/* Sportsmanship Score */}
          <div>
            <h3 className="text-sm font-semibold mb-3">Sportsmanship</h3>
            <div className="p-4 bg-card rounded-lg border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl font-bold">{player.sportsmanship_score}/100</span>
                <Badge variant={player.sportsmanship_score >= 80 ? 'default' : 'secondary'}>
                  {player.sportsmanship_score >= 90 ? 'Excellent' : 
                   player.sportsmanship_score >= 80 ? 'Good' : 
                   player.sportsmanship_score >= 60 ? 'Fair' : 'Poor'}
                </Badge>
              </div>
              <div className="h-2 bg-background rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-primary transition-all"
                  style={{ width: `${player.sportsmanship_score}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
