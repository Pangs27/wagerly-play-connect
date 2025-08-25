import HeroSection from "@/components/HeroSection";
import FeatureSection from "@/components/FeatureSection";
import DashboardSection from "@/components/DashboardSection";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    // Update page title and meta description for SEO
    document.title = "Wagerly - India's First Social Challenge Network | Gaming & Wagering Platform";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Join Wagerly, India\'s first social challenge network. Compete with friends, challenge creators, and win real rewards through gaming and social wagering.');
    }
  }, []);

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />
      
      {/* Dashboard Demo Section */}
      <DashboardSection />
      
      {/* Features Section */}
      <FeatureSection />
    </main>
  );
};

export default Index;
