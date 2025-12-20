import { Truck, Shield, Clock, Award, Headphones, CreditCard } from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "Free Delivery",
    description: "Free shipping on orders above ₹399 across India",
  },
  {
    icon: Shield,
    title: "100% Authentic",
    description: "Genuine products sourced directly from artisans",
  },
  {
    icon: Clock,
    title: "Fast Dispatch",
    description: "Orders dispatched within 24 hours",
  },
  {
    icon: Award,
    title: "Quality Assured",
    description: "Premium quality puja items with warranty",
  },
  {
    icon: Headphones,
    title: "Customer Support",
    description: "Available 8AM-8PM (Mon-Sat)",
  },
  {
    icon: CreditCard,
    title: "Secure Payment",
    description: "Multiple payment options with secure checkout",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-16 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="text-center animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-4">
                <feature.icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="font-heading text-sm font-semibold text-secondary-foreground mb-1">
                {feature.title}
              </h3>
              <p className="text-xs text-secondary-foreground/70">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
