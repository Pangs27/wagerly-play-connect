import { Button } from "@/components/ui/button";
import { ArrowRight, Gamepad2, Trophy } from "lucide-react";
import mobileMockup from "@/assets/mobile-mockup.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-gradient-hero overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-xl animate-float" />
        <div className="absolute bottom-32 right-16 w-24 h-24 bg-accent/10 rounded-full blur-lg animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-secondary/20 rounded-full blur-md animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative container mx-auto px-6 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Column - Text Content */}
          <div className="space-y-8 animate-slide-up">
            {/* Logo/Brand */}
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-primary p-3 rounded-xl shadow-glow">
                <Gamepad2 className="h-8 w-8 text-primary-foreground" />
              </div>
              <h2 className="text-2xl font-bold text-gradient">Wagerly</h2>
            </div>

            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                <span className="text-foreground">India's First</span>
                <br />
                <span className="text-gradient">Social Challenge</span>
                <br />
                <span className="text-foreground">Network</span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-lg">
                Challenge friends, compete with creators, and win real rewards. 
                The ultimate gaming and social wagering platform.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="beta" 
                size="xl" 
                className="animate-glow-pulse group"
              >
                Join the Beta
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button variant="gaming" size="xl">
                <Trophy className="mr-2 h-5 w-5" />
                Learn More
              </Button>
            </div>

            {/* Stats */}
            <div className="flex space-x-8 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-gradient">10K+</div>
                <div className="text-sm text-muted-foreground">Beta Users</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gradient">50K+</div>
                <div className="text-sm text-muted-foreground">Challenges</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gradient">₹1M+</div>
                <div className="text-sm text-muted-foreground">Rewards</div>
              </div>
            </div>
          </div>

          {/* Right Column - Mobile Mockup */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-primary rounded-3xl blur-2xl opacity-20 scale-110 animate-glow-pulse" />
              
              {/* Phone Mockup */}
              <div className="relative bg-gradient-card p-6 rounded-3xl border border-primary/20 shadow-elegant">
                <img 
                  src={mobileMockup}
                  alt="Wagerly Mobile App Challenge Screen"
                  className="w-80 h-auto rounded-2xl shadow-glow"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;