import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { 
  Coins,
  Trophy,
  Users,
  Clock,
  Flame,
  Star,
  Gift,
  Zap,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  Sparkles
} from "lucide-react";
import { useState, useEffect } from "react";

const ChallengeRewardsScreen = () => {
  const [currentStoreIndex, setCurrentStoreIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 42, seconds: 15 });
  const [animatedCoins, setAnimatedCoins] = useState(0);
  
  const userCoins = 2450;
  
  useEffect(() => {
    // Animate coin counter on load
    const target = userCoins;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setAnimatedCoins(target);
        clearInterval(timer);
      } else {
        setAnimatedCoins(Math.floor(current));
      }
    }, duration / steps);
    
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Countdown timer
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        }
        return { hours, minutes, seconds };
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  const challengeDetails = {
    title: "BGMI Squad Championship",
    description: "Team up and dominate the battleground",
    entryCoins: 100,
    potentialReward: 2500,
    participants: 1247,
    maxParticipants: 2000,
    category: "Esports",
    difficulty: "Elite",
    winStreak: 5
  };

  const storeItems = [
    {
      brand: "Amazon",
      value: "₹500",
      coins: 2000,
      discount: "20% off",
      logo: "🛒",
      gradient: "from-orange-500 to-yellow-500"
    },
    {
      brand: "Flipkart",
      value: "₹300",
      coins: 1200,
      discount: "15% off",
      logo: "📱",
      gradient: "from-blue-500 to-indigo-500"
    },
    {
      brand: "Swiggy",
      value: "₹200",
      coins: 800,
      discount: "25% off",
      logo: "🍕",
      gradient: "from-red-500 to-pink-500"
    },
    {
      brand: "Zomato",
      value: "₹250",
      coins: 1000,
      discount: "30% off",
      logo: "🍔",
      gradient: "from-red-600 to-orange-500"
    }
  ];

  const nextStoreItem = () => {
    setCurrentStoreIndex((prev) => (prev + 1) % storeItems.length);
  };

  const prevStoreItem = () => {
    setCurrentStoreIndex((prev) => (prev - 1 + storeItems.length) % storeItems.length);
  };

  return (
    <section className="py-20 bg-gradient-hero min-h-screen">
      <div className="container mx-auto px-6">
        {/* Mobile Frame */}
        <div className="max-w-sm mx-auto bg-gradient-card/90 backdrop-blur-xl rounded-3xl border border-primary/30 shadow-neon overflow-hidden">
          
          {/* Header with Coin Balance */}
          <div className="bg-gradient-primary/90 backdrop-blur-md p-4 border-b border-primary/20">
            <div className="text-center mb-2">
              <h2 className="text-sm font-semibold text-primary-foreground/90">
                India's First Social Challenge Network
              </h2>
              <h1 className="text-lg font-bold text-primary-foreground">
                Wagerly
              </h1>
            </div>
            
            {/* Animated Coin Balance */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/20">
              <div className="flex items-center justify-center space-x-2">
                <div className="relative">
                  <Coins className="h-6 w-6 text-yellow-400 animate-pulse" />
                  <Sparkles className="absolute -top-1 -right-1 h-3 w-3 text-yellow-300 animate-ping" />
                </div>
                <span className="text-2xl font-bold text-white">
                  {animatedCoins.toLocaleString()}
                </span>
                <span className="text-sm text-white/70">Coins</span>
              </div>
            </div>
          </div>

          {/* Challenge Detail Section */}
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-foreground flex items-center">
                <Trophy className="mr-2 h-5 w-5 text-secondary" />
                Featured Challenge
              </h3>
              <Badge className="bg-secondary/20 text-secondary border-secondary/30 animate-pulse">
                <Flame className="mr-1 h-3 w-3" />
                Hot
              </Badge>
            </div>

            {/* Challenge Card with Glassmorphism */}
            <Card className="bg-gradient-secondary/10 backdrop-blur-xl border border-primary/20 p-6 shadow-glow hover:shadow-neon transition-smooth">
              <div className="space-y-4">
                {/* Challenge Header */}
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <Badge className="bg-accent/20 text-accent border-accent/30">
                      {challengeDetails.category}
                    </Badge>
                    <Badge className="bg-primary/20 text-primary border-primary/30">
                      {challengeDetails.difficulty}
                    </Badge>
                  </div>
                  <h4 className="text-xl font-bold text-gradient mb-2">
                    {challengeDetails.title}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {challengeDetails.description}
                  </p>
                </div>

                {/* Entry & Reward Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-gradient-card/50 rounded-lg border border-primary/10">
                    <Coins className="h-5 w-5 text-primary mx-auto mb-1" />
                    <div className="text-lg font-bold text-primary">{challengeDetails.entryCoins}</div>
                    <div className="text-xs text-muted-foreground">Entry Cost</div>
                  </div>
                  <div className="text-center p-3 bg-gradient-card/50 rounded-lg border border-secondary/10">
                    <Trophy className="h-5 w-5 text-secondary mx-auto mb-1" />
                    <div className="text-lg font-bold text-secondary">{challengeDetails.potentialReward}</div>
                    <div className="text-xs text-muted-foreground">Potential Win</div>
                  </div>
                </div>

                {/* Participants & Timer */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground flex items-center">
                      <Users className="mr-1 h-4 w-4" />
                      Participants
                    </span>
                    <span className="font-semibold text-foreground">
                      {challengeDetails.participants.toLocaleString()}/{challengeDetails.maxParticipants.toLocaleString()}
                    </span>
                  </div>
                  <Progress 
                    value={(challengeDetails.participants / challengeDetails.maxParticipants) * 100} 
                    className="h-2 bg-muted glow-primary"
                  />
                  
                  {/* Countdown Timer */}
                  <div className="bg-gradient-primary/10 backdrop-blur-md rounded-lg p-3 border border-primary/20">
                    <div className="flex items-center justify-center space-x-1 mb-2">
                      <Clock className="h-4 w-4 text-primary animate-pulse" />
                      <span className="text-sm text-muted-foreground">Time Left</span>
                    </div>
                    <div className="flex justify-center space-x-2">
                      <div className="text-center">
                        <div className="text-xl font-bold text-primary">{String(timeLeft.hours).padStart(2, '0')}</div>
                        <div className="text-xs text-muted-foreground">Hours</div>
                      </div>
                      <div className="text-primary text-xl">:</div>
                      <div className="text-center">
                        <div className="text-xl font-bold text-primary">{String(timeLeft.minutes).padStart(2, '0')}</div>
                        <div className="text-xs text-muted-foreground">Min</div>
                      </div>
                      <div className="text-primary text-xl">:</div>
                      <div className="text-center">
                        <div className="text-xl font-bold text-primary animate-pulse">{String(timeLeft.seconds).padStart(2, '0')}</div>
                        <div className="text-xs text-muted-foreground">Sec</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Join Button */}
                <Button 
                  className="w-full bg-gradient-primary hover:bg-gradient-secondary text-primary-foreground shadow-glow hover:shadow-neon transition-smooth"
                  size="lg"
                >
                  <Zap className="mr-2 h-5 w-5" />
                  Join Challenge Now
                </Button>
              </div>
            </Card>
          </div>

          {/* Wagerly Store Section */}
          <div className="border-t border-primary/20 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-foreground flex items-center">
                <Gift className="mr-2 h-5 w-5 text-accent" />
                Wagerly Store
              </h3>
              <Badge className="bg-accent/20 text-accent border-accent/30">
                <Star className="mr-1 h-3 w-3" />
                Exclusive
              </Badge>
            </div>

            {/* Store Carousel */}
            <div className="relative">
              <div className="overflow-hidden rounded-2xl">
                <div 
                  className="flex transition-transform duration-300 ease-smooth"
                  style={{ transform: `translateX(-${currentStoreIndex * 100}%)` }}
                >
                  {storeItems.map((item, index) => (
                    <div key={index} className="w-full flex-shrink-0">
                      <Card className="bg-gradient-card/80 backdrop-blur-xl border border-primary/20 p-6 shadow-glow">
                        <div className="text-center space-y-4">
                          {/* Brand Logo */}
                          <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${item.gradient} flex items-center justify-center text-3xl shadow-glow`}>
                            {item.logo}
                          </div>
                          
                          {/* Brand Info */}
                          <div>
                            <h4 className="text-xl font-bold text-gradient mb-1">{item.brand}</h4>
                            <Badge className="bg-secondary/20 text-secondary border-secondary/30">
                              {item.discount}
                            </Badge>
                          </div>

                          {/* Value & Coins */}
                          <div className="grid grid-cols-2 gap-3">
                            <div className="bg-gradient-primary/10 p-3 rounded-lg border border-primary/20">
                              <div className="text-lg font-bold text-primary">{item.value}</div>
                              <div className="text-xs text-muted-foreground">Gift Value</div>
                            </div>
                            <div className="bg-gradient-secondary/10 p-3 rounded-lg border border-secondary/20">
                              <div className="text-lg font-bold text-secondary flex items-center justify-center">
                                <Coins className="h-4 w-4 mr-1" />
                                {item.coins}
                              </div>
                              <div className="text-xs text-muted-foreground">Required</div>
                            </div>
                          </div>

                          {/* Redeem Button */}
                          <Button 
                            variant="beta" 
                            className="w-full"
                            disabled={animatedCoins < item.coins}
                          >
                            <TrendingUp className="mr-2 h-4 w-4" />
                            {animatedCoins >= item.coins ? 'Redeem Now' : 'Insufficient Coins'}
                          </Button>
                        </div>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>

              {/* Carousel Controls */}
              <Button
                variant="ghost"
                size="sm"
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-md border border-primary/20 hover:bg-primary/10"
                onClick={prevStoreItem}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-md border border-primary/20 hover:bg-primary/10"
                onClick={nextStoreItem}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>

              {/* Carousel Indicators */}
              <div className="flex justify-center space-x-2 mt-4">
                {storeItems.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-smooth ${
                      index === currentStoreIndex 
                        ? 'bg-primary shadow-glow' 
                        : 'bg-muted hover:bg-primary/50'
                    }`}
                    onClick={() => setCurrentStoreIndex(index)}
                  />
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-2 pt-4">
              <div className="text-center p-2 bg-gradient-card/50 rounded-lg border border-primary/10">
                <Gift className="h-4 w-4 text-primary mx-auto mb-1" />
                <div className="text-sm font-bold text-primary">50+</div>
                <div className="text-xs text-muted-foreground">Brands</div>
              </div>
              <div className="text-center p-2 bg-gradient-card/50 rounded-lg border border-secondary/10">
                <Star className="h-4 w-4 text-secondary mx-auto mb-1" />
                <div className="text-sm font-bold text-secondary">24/7</div>
                <div className="text-xs text-muted-foreground">Available</div>
              </div>
              <div className="text-center p-2 bg-gradient-card/50 rounded-lg border border-accent/10">
                <Sparkles className="h-4 w-4 text-accent mx-auto mb-1" />
                <div className="text-sm font-bold text-accent">Instant</div>
                <div className="text-xs text-muted-foreground">Delivery</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChallengeRewardsScreen;