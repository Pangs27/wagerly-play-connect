import { Button } from "@/components/ui/button";
import { Users, Gift, Sword } from "lucide-react";

const FeatureSection = () => {
  const features = [
    {
      icon: Users,
      title: "Social Wagering",
      description: "Create fun challenges with friends and compete with your favorite creators. Make every game more exciting with friendly wagers.",
      highlights: ["Friend Challenges", "Creator Competitions", "Real-time Betting", "Social Leaderboards"]
    },
    {
      icon: Gift,
      title: "Rewards Marketplace",
      description: "Redeem your hard-earned coins for exclusive vouchers, discounts, and premium gaming gear from top brands.",
      highlights: ["Brand Vouchers", "Gaming Gear", "Exclusive Discounts", "Premium Rewards"]
    },
    {
      icon: Sword,
      title: "Gamer Matchmaking",
      description: "Find the perfect teammates and worthy rivals. Connect with players who match your skill level and gaming style.",
      highlights: ["Skill Matching", "Team Formation", "Rival Discovery", "Cross-platform Play"]
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-foreground">Why Choose </span>
            <span className="text-gradient">Wagerly?</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience the next generation of social gaming with features designed for the modern gamer.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div 
                key={feature.title}
                className="group bg-gradient-card p-8 rounded-xl border border-primary/10 hover:border-primary/30 transition-smooth hover:shadow-glow animate-slide-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Icon */}
                <div className="bg-gradient-primary p-4 rounded-xl mb-6 w-fit shadow-glow group-hover:scale-110 transition-smooth">
                  <IconComponent className="h-8 w-8 text-primary-foreground" />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold mb-4 text-foreground group-hover:text-gradient transition-smooth">
                  {feature.title}
                </h3>
                
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {feature.description}
                </p>

                {/* Highlights */}
                <ul className="space-y-2 mb-6">
                  {feature.highlights.map((highlight, i) => (
                    <li key={i} className="flex items-center text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-gradient-primary rounded-full mr-3" />
                      {highlight}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Button variant="gaming" className="w-full group-hover:shadow-neon">
                  Explore Feature
                </Button>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 animate-slide-up">
          <div className="bg-gradient-card p-8 rounded-2xl border border-primary/20 max-w-2xl mx-auto">
            <h3 className="text-3xl font-bold mb-4 text-gradient">
              Ready to Level Up?
            </h3>
            <p className="text-muted-foreground mb-6">
              Join thousands of gamers already competing and winning on Wagerly.
            </p>
            <Button variant="beta" size="xl" className="animate-glow-pulse">
              Get Early Access
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;