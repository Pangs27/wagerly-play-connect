import { useState, useMemo } from 'react';
import { Search, Bell, User, Menu } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { FilterDrawer } from './FilterDrawer';
import { QueuePanel } from './QueuePanel';
import { PlayerCard } from './PlayerCard';
import { MatchFoundModal } from './MatchFoundModal';
import { mockPlayers, filterPresets } from '@/data/mockPlayers';
import { Player, Intent, Mode, Stake, FilterPreset } from '@/types/matchmaking';
import { Skeleton } from '@/components/ui/skeleton';

export function MatchmakingPage() {
  const [intent, setIntent] = useState<Intent>('Play now');
  const [mode, setMode] = useState<Mode>('1v1');
  const [stake, setStake] = useState<Stake>('Just for fun');
  const [filters, setFilters] = useState<FilterPreset>(filterPresets[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showMatchModal, setShowMatchModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // User stats (mock)
  const userStats = {
    handle: 'YourHandle',
    mmr: 2400,
    tier: 'Diamond',
    platform: 'PC' as const,
    latency_ms: 40
  };

  // Calculate match score for each player
  const calculateMatchScore = (player: Player): number => {
    const mmrProximity = 1 - Math.abs(player.mmr.value - userStats.mmr) / 1000;
    const latencyScore = Math.max(0, 1 - player.latency_ms / 150);
    const modeMatch = player.modes.includes(mode) ? 1 : 0.3;
    const intentMatch = player.intent === intent ? 1 : 0.5;
    const sportsmanshipScore = player.sportsmanship_score / 100;

    return (
      mmrProximity * 0.5 +
      latencyScore * 0.2 +
      modeMatch * 0.15 +
      intentMatch * 0.05 +
      sportsmanshipScore * 0.1
    );
  };

  // Filter and rank players
  const filteredPlayers = useMemo(() => {
    let players = mockPlayers.filter(player => {
      // Apply filters
      if (Math.abs(player.mmr.value - userStats.mmr) > filters.mmrRange) return false;
      if (player.latency_ms > filters.maxPing) return false;
      if (filters.voiceRequired && !player.voice_chat) return false;
      if (!filters.regions.includes(player.region)) return false;
      if ((100 - player.sportsmanship_score) > filters.toxicityCap) return false;
      if (player.intent !== intent) return false;
      if (!player.modes.includes(mode)) return false;

      // Search query
      if (searchQuery && !player.handle.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }

      return true;
    });

    // Rank by match score
    return players
      .map(player => ({ player, score: calculateMatchScore(player) }))
      .sort((a, b) => b.score - a.score)
      .map(({ player }) => player);
  }, [filters, intent, mode, searchQuery, userStats.mmr]);

  const queueStats = {
    personalETA: Math.max(15, 120 - filteredPlayers.length * 10),
    queueSize: 47 + filteredPlayers.length,
    medianWait: 85
  };

  const handleWidenSearch = () => {
    console.log('Widening search by relaxing strictest constraint');
    // Relax the strictest constraint
    const newFilters = { ...filters };
    if (filters.mmrRange < 300) {
      newFilters.mmrRange = Math.min(filters.mmrRange + 50, 300);
    } else if (filters.maxPing < 100) {
      newFilters.maxPing = Math.min(filters.maxPing + 20, 100);
    }
    setFilters(newFilters);
  };

  const intentCopy = {
    'Play now': 'Jump into instant matches',
    'Schedule': 'Plan your matches ahead',
    'Practice': 'Warm up with casual games',
    'Scrim': 'Competitive team practice'
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-primary" />
              <span className="text-xl font-bold">Wagerly</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:block relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search players..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Intent Bar */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Player Matchmaking</h1>
          <p className="text-muted-foreground mb-4">{intentCopy[intent]}</p>
          
          <ToggleGroup 
            type="single" 
            value={intent} 
            onValueChange={(val) => val && setIntent(val as Intent)}
            className="justify-start"
          >
            <ToggleGroupItem value="Play now" aria-label="Play now">
              Play now
            </ToggleGroupItem>
            <ToggleGroupItem value="Schedule" aria-label="Schedule">
              Schedule
            </ToggleGroupItem>
            <ToggleGroupItem value="Practice" aria-label="Practice">
              Practice
            </ToggleGroupItem>
            <ToggleGroupItem value="Scrim" aria-label="Scrim">
              Scrim
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        {/* Mode & Stake Chips */}
        <div className="flex gap-4 mb-6 flex-wrap">
          <div>
            <label className="text-sm font-medium mb-2 block">Mode</label>
            <ToggleGroup 
              type="single" 
              value={mode} 
              onValueChange={(val) => val && setMode(val as Mode)}
            >
              <ToggleGroupItem value="1v1">1v1</ToggleGroupItem>
              <ToggleGroupItem value="Duos">Duos</ToggleGroupItem>
              <ToggleGroupItem value="Team">Team</ToggleGroupItem>
            </ToggleGroup>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Stakes</label>
            <ToggleGroup 
              type="single" 
              value={stake} 
              onValueChange={(val) => val && setStake(val as Stake)}
            >
              <ToggleGroupItem value="Just for fun">Fun</ToggleGroupItem>
              <ToggleGroupItem value="Tokens">Tokens</ToggleGroupItem>
              <ToggleGroupItem value="High-stakes">High Stakes</ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>

        {/* Filter Drawer */}
        <div className="mb-6">
          <FilterDrawer onFiltersChange={setFilters} />
        </div>

        {/* Queue Panel */}
        <div className="mb-6">
          <QueuePanel stats={queueStats} onWidenSearch={handleWidenSearch} />
        </div>

        {/* Player Grid */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">
              Available Players ({filteredPlayers.length})
            </h2>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => {
                setIsLoading(true);
                setTimeout(() => setIsLoading(false), 1000);
              }}
            >
              Refresh
            </Button>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="p-4 space-y-3">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-8 w-full" />
                </div>
              ))}
            </div>
          ) : filteredPlayers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
              {filteredPlayers.map((player) => (
                <PlayerCard 
                  key={player.player_id} 
                  player={player} 
                  userMMR={userStats.mmr}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-card rounded-lg border border-dashed">
              <p className="text-lg font-medium mb-2">No perfect matches... yet</p>
              <p className="text-muted-foreground mb-4">
                You're #{Math.floor(queueStats.personalETA / 10)} in queue
              </p>
              <Button variant="outline" onClick={handleWidenSearch}>
                Try widening ping from {filters.maxPing}ms → {filters.maxPing + 20}ms
              </Button>
            </div>
          )}
        </div>

        {/* Test Match Modal Button */}
        <div className="fixed bottom-6 right-6">
          <Button
            variant="hero"
            size="lg"
            onClick={() => setShowMatchModal(true)}
            className="shadow-glow"
          >
            Test Match Found
          </Button>
        </div>
      </main>

      {/* Match Found Modal */}
      {filteredPlayers.length > 0 && (
        <MatchFoundModal
          isOpen={showMatchModal}
          onClose={() => setShowMatchModal(false)}
          opponent={filteredPlayers[0]}
          userStats={userStats}
        />
      )}
    </div>
  );
}
