import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Mic, MicOff, MoreVertical, Trophy, Shield, 
  Circle, Monitor, Gamepad2, Smartphone
} from 'lucide-react';
import { Player, LatencyStatus } from '@/types/matchmaking';
import { DeepPeek } from './DeepPeek';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface PlayerCardProps {
  player: Player;
  userMMR: number;
}

export function PlayerCard({ player, userMMR }: PlayerCardProps) {
  const [showDeepPeek, setShowDeepPeek] = useState(false);

  const getLatencyStatus = (ms: number): LatencyStatus => {
    if (ms <= 50) return 'Good';
    if (ms <= 80) return 'Okay';
    return 'Poor';
  };

  const latencyStatus = getLatencyStatus(player.latency_ms);
  const latencyColors = {
    Good: 'bg-green-500',
    Okay: 'bg-yellow-500',
    Poor: 'bg-red-500'
  };

  const platformIcons = {
    PC: Monitor,
    PS5: Gamepad2,
    Xbox: Gamepad2,
    Mobile: Smartphone
  };

  const PlatformIcon = platformIcons[player.platform];

  const winRate = (player.recent_form.filter(f => f.result === 'W').length / player.recent_form.length) * 100;

  return (
    <>
      <Card 
        className="p-4 bg-card/80 backdrop-blur-sm border-primary/20 hover:border-primary/50 hover:shadow-glow transition-all duration-200 hover:scale-[1.02] cursor-pointer"
        onClick={() => setShowDeepPeek(true)}
      >
        {/* Top Row */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <img 
              src={player.avatar_url} 
              alt={player.handle}
              className="w-12 h-12 rounded-full border-2 border-primary/50"
            />
            <div>
              <h3 className="font-semibold text-base">{player.handle}</h3>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs">
                  {player.mmr.tier}
                </Badge>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <span className="text-sm text-muted-foreground">
                        {player.mmr.value}
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>MMR: {player.mmr.value} ±{player.mmr.ci}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <PlatformIcon className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">{player.region}</span>
          </div>
        </div>

        {/* Mid Row */}
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div className="flex items-center gap-1">
                  <Circle className={`h-2 w-2 fill-current ${latencyColors[latencyStatus]}`} />
                  <span className="text-xs">{player.latency_ms}ms</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{latencyStatus} latency</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {player.modes.map((mode) => (
            <Badge key={mode} variant="outline" className="text-xs">
              {mode}
            </Badge>
          ))}

          {player.voice_chat ? (
            <Mic className="h-4 w-4 text-green-500" />
          ) : (
            <MicOff className="h-4 w-4 text-muted-foreground" />
          )}

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Shield className="h-4 w-4 text-primary" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Sportsmanship: {player.sportsmanship_score}/100</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* Bottom Row */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1">
            {player.recent_form.slice(0, 10).map((form, i) => (
              <div
                key={i}
                className={`h-5 w-1 rounded ${
                  form.result === 'W' ? 'bg-green-500' : 
                  form.result === 'L' ? 'bg-red-500' : 'bg-gray-500'
                }`}
              />
            ))}
            <span className="text-xs text-muted-foreground ml-2">
              {winRate.toFixed(0)}% WR
            </span>
          </div>

          <Badge variant="outline" className="text-xs">
            {player.availability.status}
          </Badge>
        </div>

        {/* CTA Buttons */}
        <div className="flex gap-2">
          <Button 
            size="sm" 
            className="flex-1"
            onClick={(e) => {
              e.stopPropagation();
              console.log('Invited:', player.handle);
            }}
          >
            <Trophy className="h-4 w-4 mr-1" />
            Invite
          </Button>
          <Button 
            size="sm" 
            variant="outline"
            onClick={(e) => {
              e.stopPropagation();
              console.log('Preview matchup:', player.handle);
            }}
          >
            Preview
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
              <Button size="sm" variant="ghost">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => console.log('Hide:', player.handle)}>
                Hide Player
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => console.log('Report:', player.handle)}>
                Report Player
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </Card>

      {showDeepPeek && (
        <DeepPeek 
          player={player} 
          isOpen={showDeepPeek}
          onClose={() => setShowDeepPeek(false)}
        />
      )}
    </>
  );
}
