import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Instagram, 
  Twitter, 
  Youtube,
  Send
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "About Us", href: "#about" },
    { name: "Shop All", href: "#products" },
    { name: "Categories", href: "#categories" },
    { name: "Contact", href: "#contact" },
    { name: "FAQs", href: "#faq" },
  ];

  const categories = [
    { name: "Puja Essentials", href: "#" },
    { name: "Havan Samidha", href: "#" },
    { name: "Fragrances", href: "#" },
    { name: "Sacred Books", href: "#" },
    { name: "Deities", href: "#" },
  ];

  const policies = [
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
    { name: "Shipping Policy", href: "#" },
    { name: "Return Policy", href: "#" },
  ];

  return (
    <footer id="contact" className="bg-secondary pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <a href="/" className="flex items-center gap-2 mb-4">
              <span className="text-3xl">🙏</span>
              <div className="flex flex-col">
                <span className="font-heading text-2xl font-bold text-secondary-foreground">
                  Shree Sanatan Puja Path
                </span>
                <span className="text-xs text-secondary-foreground/70">
                  श्री सनातन पूजा पाठ
                </span>
              </div>
            </a>
            <p className="text-secondary-foreground/80 mb-6 max-w-sm">
              Your trusted destination for authentic puja items, sacred textiles, 
              and divine fragrances. Serving devotees since 1985.
            </p>

            {/* Newsletter */}
            <div className="mb-6">
              <h4 className="font-heading font-semibold text-secondary-foreground mb-3">
                Subscribe to Newsletter
              </h4>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-secondary-foreground/10 border-secondary-foreground/20 text-secondary-foreground placeholder:text-secondary-foreground/50"
                />
                <Button variant="saffron" size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-3">
              <Button variant="ghost" size="icon" className="hover:bg-primary/20 text-secondary-foreground">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-primary/20 text-secondary-foreground">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-primary/20 text-secondary-foreground">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-primary/20 text-secondary-foreground">
                <Youtube className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-secondary-foreground mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-secondary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-heading font-semibold text-secondary-foreground mb-4">
              Categories
            </h4>
            <ul className="space-y-2">
              {categories.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-secondary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-heading font-semibold text-secondary-foreground mb-4">
              Contact Us
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-primary-foreground mt-0.5" />
                <div>
                  <p className="text-secondary-foreground">+91 98765 43210</p>
                  <p className="text-secondary-foreground/70 text-sm">Mon-Sat, 9AM-8PM</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-primary-foreground mt-0.5" />
                <p className="text-secondary-foreground">contact@shreesanatanpujapath.com</p>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary-foreground mt-0.5" />
                <p className="text-secondary-foreground/80">
                  Johari Bazaar, Jaipur<br />
                  Rajasthan 302003
                </p>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-secondary-foreground/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-secondary-foreground/70">
              © {currentYear} Shree Sanatan Puja Path. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-4">
              {policies.map((policy) => (
                <a
                  key={policy.name}
                  href={policy.href}
                  className="text-sm text-secondary-foreground/70 hover:text-primary-foreground transition-colors"
                >
                  {policy.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
