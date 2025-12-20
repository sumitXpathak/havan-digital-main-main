import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Truck, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-puja.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 pattern-mandala opacity-50" />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/60" />

      {/* Hero Image */}
      <div className="absolute right-0 top-0 w-full lg:w-2/3 h-full">
        <img
          src={heroImage}
          alt="Sacred Puja Items - Diyas, Kalash, Incense"
          className="w-full h-full object-cover opacity-30 lg:opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl">

          {/* Heading */}
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground mb-6 animate-slide-up">
            Sacred{" "}
            <span className="text-gradient-saffron">Havan Samidha</span>
            <br />& Puja Essentials
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-xl animate-slide-up animation-delay-100">
            Discover our curated collection of authentic puja items, sacred textiles, 
            and divine fragrances. From brass utensils to Narmadeshwar Shivlings — 
            everything for your spiritual journey.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 mb-12 animate-slide-up animation-delay-200">
            <Button variant="hero" size="xl" asChild>
              <a href="#products">
                Shop Now
                <ArrowRight className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="sacred" size="xl" asChild>
              <Link to="/products">
                Explore Categories
              </Link>
            </Button>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap gap-6 animate-slide-up animation-delay-300">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="p-2 bg-primary/10 rounded-full">
                <Truck className="h-4 w-4 text-primary" />
              </div>
              <span>Free Delivery Above ₹399</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="p-2 bg-primary/10 rounded-full">
                <Shield className="h-4 w-4 text-primary" />
              </div>
              <span>100% Authentic Products</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="p-2 bg-accent/20 rounded-full">
                <span className="text-sm">🕉️</span>
              </div>
              <span>Blessed & Purified</span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-float">
        <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-primary/50 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
