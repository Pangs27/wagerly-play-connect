import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Heart,
  X,
  Zap,
  Trophy,
  Coins,
  Star,
  Flame,
  Target,
  Gamepad2,
  Users,
  TrendingUp,
  Award,
  Crown,
  Swords,
  Shield,
  Rocket
} from "lucide-react";
import { useState } from "react";

const MobileAppScreen = () => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  
  const gamers = [
    {
      id: 1,
      handle: "ShadowNinja_47",
      avatar: "🥷",
      skillLevel: "Diamond",
      rank: "#247",
      favoriteGames: ["BGMI", "Free Fire", "COD Mobile"],
      winRate: 78,
      challenges: 156,
      status: "Online"
    },
    {
      id: 2,
      handle: "QuantumGamer",
      avatar: "⚡",
      skillLevel: "Platinum",
      rank: "#89",
      favoriteGames: ["Valorant", "BGMI", "Apex Legends"],
      winRate: 85,
      challenges: 234,
      status: "In Game"
    },
    {
      id: 3,
      handle: "FireStorm_X",
      avatar: "🔥",
      skillLevel: "Gold",
      rank: "#412",
      favoriteGames: ["Free Fire", "COD Mobile"],
      winRate: 72,
      challenges: 98,
      status: "Online"
    }
  ];

  const userProfile = {
    handle: "GamerPro_YT",
    avatar: "👑",
    rank: "#42",
    level: 28,
    xp: 8750,
    xpToNext: 1250,
    coins: 2450,
    challengesWon: 89,
    winStreak: 12,
    totalChallenges: 156
  };

  const badges = [
    { name: "First Win", icon: "🏆", rarity: "common" },
    { name: "Speed Demon", icon: "⚡", rarity: "rare" },
    { name: "Legendary", icon: "👑", rarity: "legendary" },
    { name: "Streak Master", icon: "🔥", rarity: "epic" }
  ];

  const ongoingChallenges = [
    { name: "BGMI Squad Rush", progress: 75, reward: 500 },
    { name: "Daily Streak", progress: 60, reward: 100 },
    { name: "Weekly Winner", progress: 40, reward: 1000 }
  ];

  const handleSwipe = (direction: 'left' | 'right') => {
    setCurrentCardIndex((prev) => (prev + 1) % gamers.length);
  };

  const getSkillColor = (skill: string) => {
    switch (skill.toLowerCase()) {
      case 'diamond': return 'text-cyan-400 border-cyan-400/30 bg-cyan-400/10';
      case 'platinum': return 'text-purple-400 border-purple-400/30 bg-purple-400/10';
      case 'gold': return 'text-yellow-400 border-yellow-400/30 bg-yellow-400/10';
      default: return 'text-muted-foreground border-muted/30 bg-muted/10';
    }
  };

  const getBadgeRarity = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'border-yellow-400/50 bg-yellow-400/20 shadow-glow';
      case 'epic': return 'border-purple-400/50 bg-purple-400/20';
      case 'rare': return 'border-blue-400/50 bg-blue-400/20';
      default: return 'border-muted/30 bg-muted/10';
    }
  };

  return (
    <section className="py-20 bg-gradient-hero">
      <div className="container mx-auto px-6">
        {/* Mobile Frame */}
        <div className="max-w-sm mx-auto bg-gradient-card rounded-3xl border border-primary/20 shadow-elegant overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-primary p-4 text-center">
            <h2 className="text-sm font-semibold text-primary-foreground opacity-90">
              India's First Social Challenge Network
            </h2>
            <h1 className="text-lg font-bold text-primary-foreground mt-1">
              Wagerly
            </h1>
          </div>

          {/* Matchmaking Section */}
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-foreground flex items-center">
                <Swords className="mr-2 h-5 w-5 text-primary" />
                Find Gamers
              </h3>
              <Badge className="bg-secondary/20 text-secondary border-secondary/30">
                <Users className="mr-1 h-3 w-3" />
                {gamers.length} Online
              </Badge>
            </div>

            {/* Swipe Card */}
            <div className="relative h-80 mb-6">
              <div className="absolute inset-0 bg-gradient-secondary/10 rounded-2xl blur-xl" />
              <div className="relative bg-gradient-card border border-primary/20 rounded-2xl p-6 h-full shadow-glow hover:shadow-neon transition-smooth">
                <div className="flex flex-col h-full">
                  {/* Gamer Info */}
                  <div className="text-center mb-4">
                    <div className="text-6xl mb-2">{gamers[currentCardIndex].avatar}</div>
                    <h4 className="text-xl font-bold text-gradient mb-1">
                      {gamers[currentCardIndex].handle}
                    </h4>
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <Badge className={getSkillColor(gamers[currentCardIndex].skillLevel)}>
                        <Crown className="mr-1 h-3 w-3" />
                        {gamers[currentCardIndex].skillLevel}
                      </Badge>
                      <Badge className="bg-primary/20 text-primary border-primary/30">
                        {gamers[currentCardIndex].rank}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-center text-sm text-muted-foreground">
                      <div className={`w-2 h-2 rounded-full mr-2 ${
                        gamers[currentCardIndex].status === 'Online' ? 'bg-green-400' : 'bg-yellow-400'
                      }`} />
                      {gamers[currentCardIndex].status}
                    </div>
                  </div>

                  {/* Favorite Games */}
                  <div className="mb-4">
                    <p className="text-xs text-muted-foreground mb-2">Favorite Games</p>
                    <div className="flex flex-wrap gap-1">
                      {gamers[currentCardIndex].favoriteGames.map((game, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {game}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-lg font-bold text-secondary">{gamers[currentCardIndex].winRate}%</div>
                      <div className="text-xs text-muted-foreground">Win Rate</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-primary">{gamers[currentCardIndex].challenges}</div>
                      <div className="text-xs text-muted-foreground">Challenges</div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3 mt-auto">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 border-red-500/30 hover:bg-red-500/10"
                      onClick={() => handleSwipe('left')}
                    >
                      <X className="h-4 w-4 text-red-500" />
                    </Button>
                    <Button 
                      variant="beta" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handleSwipe('right')}
                    >
                      <Zap className="mr-2 h-4 w-4" />
                      Challenge
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 border-green-500/30 hover:bg-green-500/10"
                    >
                      <Heart className="h-4 w-4 text-green-500" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* User Profile Section */}
          <div className="border-t border-primary/20 p-6 space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-foreground flex items-center">
                <Shield className="mr-2 h-5 w-5 text-secondary" />
                Your Profile
              </h3>
              <Button variant="ghost" size="sm">
                <TrendingUp className="h-4 w-4" />
              </Button>
            </div>

            {/* Profile Header */}
            <div className="text-center mb-6">
              <div className="text-4xl mb-2">{userProfile.avatar}</div>
              <h4 className="text-lg font-bold text-gradient">{userProfile.handle}</h4>
              <Badge className="bg-primary/20 text-primary border-primary/30 mt-1">
                Rank {userProfile.rank}
              </Badge>
            </div>

            {/* Level Progress */}
            <div className="bg-gradient-card p-4 rounded-xl border border-primary/10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-foreground">Level {userProfile.level}</span>
                <span className="text-sm text-muted-foreground">{userProfile.xp}/{userProfile.xp + userProfile.xpToNext} XP</span>
              </div>
              <Progress 
                value={(userProfile.xp / (userProfile.xp + userProfile.xpToNext)) * 100} 
                className="h-2 bg-muted"
              />
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-gradient-card p-3 rounded-lg text-center border border-primary/10">
                <Coins className="h-5 w-5 text-primary mx-auto mb-1" />
                <div className="text-lg font-bold text-primary">{userProfile.coins}</div>
                <div className="text-xs text-muted-foreground">Coins</div>
              </div>
              <div className="bg-gradient-card p-3 rounded-lg text-center border border-secondary/10">
                <Trophy className="h-5 w-5 text-secondary mx-auto mb-1" />
                <div className="text-lg font-bold text-secondary">{userProfile.challengesWon}</div>
                <div className="text-xs text-muted-foreground">Won</div>
              </div>
              <div className="bg-gradient-card p-3 rounded-lg text-center border border-accent/10">
                <Flame className="h-5 w-5 text-accent mx-auto mb-1" />
                <div className="text-lg font-bold text-accent">{userProfile.winStreak}</div>
                <div className="text-xs text-muted-foreground">Streak</div>
              </div>
            </div>

            {/* Badges */}
            <div>
              <p className="text-sm font-semibold text-foreground mb-3 flex items-center">
                <Award className="mr-2 h-4 w-4 text-primary" />
                Badges
              </p>
              <div className="grid grid-cols-4 gap-2">
                {badges.map((badge, i) => (
                  <div 
                    key={i} 
                    className={`p-2 rounded-lg text-center border transition-smooth hover:scale-110 ${getBadgeRarity(badge.rarity)}`}
                  >
                    <div className="text-xl">{badge.icon}</div>
                    <div className="text-xs text-muted-foreground mt-1">{badge.name}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Ongoing Challenges */}
            <div>
              <p className="text-sm font-semibold text-foreground mb-3 flex items-center">
                <Target className="mr-2 h-4 w-4 text-secondary" />
                Active Challenges
              </p>
              <div className="space-y-2">
                {ongoingChallenges.map((challenge, i) => (
                  <div key={i} className="bg-gradient-card p-3 rounded-lg border border-primary/10">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-foreground">{challenge.name}</span>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Coins className="h-3 w-3 text-primary mr-1" />
                        {challenge.reward}
                      </div>
                    </div>
                    <Progress value={challenge.progress} className="h-1.5" />
                    <div className="text-xs text-muted-foreground mt-1">{challenge.progress}% complete</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-3 pt-4">
              <Button variant="gaming" className="flex-1">
                <Rocket className="mr-2 h-4 w-4" />
                Leaderboard
              </Button>
              <Button variant="beta" className="flex-1">
                <Star className="mr-2 h-4 w-4" />
                Challenges
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MobileAppScreen;