import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Coins, 
  Trophy, 
  Users, 
  Clock, 
  Gamepad2, 
  Dumbbell, 
  Coffee,
  Gift,
  ShoppingCart,
  Star,
  Zap
} from "lucide-react";

const DashboardSection = () => {
  const challenges = [
    {
      id: 1,
      type: "esports",
      title: "BGMI Squad Rush",
      description: "Win 3 consecutive matches",
      icon: Gamepad2,
      entryCoins: 100,
      participants: 247,
      timeLeft: "2h 34m",
      reward: 500,
      category: "Esports"
    },
    {
      id: 2,
      type: "fitness",
      title: "10K Steps Daily",
      description: "Complete 10,000 steps for 7 days",
      icon: Dumbbell,
      entryCoins: 50,
      participants: 1234,
      timeLeft: "5d 12h",
      reward: 300,
      category: "Fitness"
    },
    {
      id: 3,
      type: "lifestyle",
      title: "No Junk Food Week",
      description: "Avoid junk food for 7 consecutive days",
      icon: Coffee,
      entryCoins: 75,
      participants: 892,
      timeLeft: "1d 8h",
      reward: 200,
      category: "Lifestyle"
    },
    {
      id: 4,
      type: "esports",
      title: "Free Fire Booyah",
      description: "Get 5 Booyah wins this week",
      icon: Gamepad2,
      entryCoins: 150,
      participants: 456,
      timeLeft: "3d 22h",
      reward: 750,
      category: "Esports"
    }
  ];

  const rewards = [
    {
      id: 1,
      title: "20% off Zomato",
      description: "Valid on orders above ₹300",
      coins: 150,
      brand: "Zomato",
      discount: "20% OFF",
      icon: "🍕"
    },
    {
      id: 2,
      title: "₹500 Amazon Voucher",
      description: "Redeemable on any purchase",
      coins: 800,
      brand: "Amazon",
      discount: "₹500",
      icon: "📦"
    },
    {
      id: 3,
      title: "Spotify Premium",
      description: "3 months subscription",
      coins: 600,
      brand: "Spotify",
      discount: "3 MONTHS",
      icon: "🎵"
    },
    {
      id: 4,
      title: "Gaming Headset",
      description: "Premium RGB gaming headset",
      coins: 1200,
      brand: "TechGear",
      discount: "FREE",
      icon: "🎧"
    },
    {
      id: 5,
      title: "Netflix Premium",
      description: "2 months subscription",
      coins: 500,
      brand: "Netflix",
      discount: "2 MONTHS",
      icon: "📺"
    },
    {
      id: 6,
      title: "₹1000 Flipkart",
      description: "Shopping voucher",
      coins: 1500,
      brand: "Flipkart",
      discount: "₹1000",
      icon: "🛒"
    }
  ];

  const getCategoryColor = (type: string) => {
    switch (type) {
      case 'esports':
        return 'bg-primary/20 text-primary border-primary/30';
      case 'fitness':
        return 'bg-secondary/20 text-secondary border-secondary/30';
      case 'lifestyle':
        return 'bg-accent/20 text-accent border-accent/30';
      default:
        return 'bg-muted/20 text-muted-foreground border-muted/30';
    }
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12 animate-slide-up">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-gradient-primary p-3 rounded-xl shadow-glow mr-4">
              <Coins className="h-8 w-8 text-primary-foreground" />
            </div>
            <div className="text-left">
              <h2 className="text-2xl font-bold text-gradient">Your Wagerly Coins</h2>
              <div className="flex items-center space-x-2">
                <span className="text-4xl font-bold text-foreground">2,450</span>
                <Coins className="h-6 w-6 text-primary" />
              </div>
            </div>
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-gradient">India's First Social Challenge Network</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Challenge. Compete. Win. Redeem.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Side - Active Challenges */}
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-foreground flex items-center">
                <Trophy className="mr-3 h-6 w-6 text-primary" />
                Active Challenges
              </h3>
              <Badge variant="secondary" className="px-3 py-1">
                {challenges.length} Active
              </Badge>
            </div>

            <div className="space-y-4">
              {challenges.map((challenge, index) => {
                const IconComponent = challenge.icon;
                return (
                  <div
                    key={challenge.id}
                    className="bg-gradient-card p-6 rounded-xl border border-primary/10 hover:border-primary/30 transition-smooth hover:shadow-glow group animate-slide-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start space-x-4">
                        <div className="bg-gradient-primary p-3 rounded-lg shadow-glow group-hover:scale-110 transition-smooth">
                          <IconComponent className="h-5 w-5 text-primary-foreground" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h4 className="font-bold text-foreground group-hover:text-gradient transition-smooth">
                              {challenge.title}
                            </h4>
                            <Badge className={getCategoryColor(challenge.type)}>
                              {challenge.category}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {challenge.description}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-1">
                          <Coins className="h-4 w-4 text-primary mr-1" />
                          <span className="text-sm font-semibold text-primary">{challenge.entryCoins}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">Entry</p>
                      </div>
                      
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-1">
                          <Users className="h-4 w-4 text-secondary mr-1" />
                          <span className="text-sm font-semibold text-secondary">{challenge.participants}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">Players</p>
                      </div>
                      
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-1">
                          <Clock className="h-4 w-4 text-accent mr-1" />
                          <span className="text-sm font-semibold text-accent">{challenge.timeLeft}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">Left</p>
                      </div>
                      
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-1">
                          <Trophy className="h-4 w-4 text-primary mr-1" />
                          <span className="text-sm font-semibold text-primary">{challenge.reward}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">Reward</p>
                      </div>
                    </div>

                    <Button variant="gaming" className="w-full group-hover:shadow-neon">
                      <Zap className="mr-2 h-4 w-4" />
                      Join Challenge
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Side - Rewards Marketplace */}
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-foreground flex items-center">
                <Gift className="mr-3 h-6 w-6 text-secondary" />
                Rewards Marketplace
              </h3>
              <Badge variant="secondary" className="px-3 py-1">
                <ShoppingCart className="mr-1 h-3 w-3" />
                Redeem
              </Badge>
            </div>

            <div className="grid gap-4">
              {rewards.map((reward, index) => (
                <div
                  key={reward.id}
                  className="bg-gradient-card p-4 rounded-xl border border-secondary/10 hover:border-secondary/30 transition-smooth hover:shadow-neon group animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="text-3xl group-hover:scale-110 transition-smooth">
                        {reward.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-bold text-foreground group-hover:text-gradient transition-smooth">
                            {reward.title}
                          </h4>
                          <Badge className="bg-secondary/20 text-secondary border-secondary/30">
                            {reward.discount}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {reward.description}
                        </p>
                        <div className="flex items-center mt-2">
                          <Coins className="h-4 w-4 text-primary mr-1" />
                          <span className="text-sm font-semibold text-primary">
                            {reward.coins} coins
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <Button 
                      variant="beta" 
                      size="sm" 
                      className="group-hover:shadow-glow"
                    >
                      <Star className="mr-1 h-3 w-3" />
                      Redeem
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Marketplace Stats */}
            <div className="bg-gradient-card p-6 rounded-xl border border-primary/20 animate-slide-up">
              <h4 className="text-lg font-bold text-gradient mb-4">Your Redemption Stats</h4>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">12</div>
                  <div className="text-xs text-muted-foreground">Redeemed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-secondary">₹2,400</div>
                  <div className="text-xs text-muted-foreground">Value Saved</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">Gold</div>
                  <div className="text-xs text-muted-foreground">Status</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 animate-slide-up">
          <div className="bg-gradient-hero p-8 rounded-2xl border border-primary/20">
            <h3 className="text-3xl font-bold mb-4 text-gradient">
              Start Your Wagerly Journey Today
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Join the ultimate social challenge network where every game matters and every win counts towards real rewards.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="beta" size="xl" className="animate-glow-pulse">
                <Zap className="mr-2 h-5 w-5" />
                Join Beta Now
              </Button>
              <Button variant="gaming" size="xl">
                <Trophy className="mr-2 h-5 w-5" />
                View Leaderboard
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardSection;