import { Card } from "@/components/ui/card";
import { categories } from "@/data/products";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const CategoriesSection = () => {
  return (
    <section id="categories" className="py-20 bg-gradient-sacred">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block text-primary font-medium text-sm uppercase tracking-wider mb-2">
            Browse Categories
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Sacred Collections
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From havan samidha to divine pratimas — explore our carefully curated 
            categories of authentic puja essentials
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <Card
              key={category.id}
              variant="category"
              className="p-4 md:p-6 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Link to={`/products?category=${category.id}`} className="block">
                {/* Icon */}
                <div className="text-4xl md:text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {category.icon}
                </div>

                {/* Name */}
                <h3 className="font-heading text-lg md:text-xl font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                  {category.name}
                </h3>

                {/* Hindi Name */}
                <p className="text-xs text-primary/70 mb-2">{category.nameHindi}</p>

                {/* Description */}
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {category.description}
                </p>

                {/* Items Preview */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {category.items.slice(0, 3).map((item) => (
                    <span
                      key={item}
                      className="text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground"
                    >
                      {item}
                    </span>
                  ))}
                  {category.items.length > 3 && (
                    <span className="text-xs bg-primary/10 px-2 py-1 rounded-full text-primary">
                      +{category.items.length - 3} more
                    </span>
                  )}
                </div>

                {/* CTA */}
                <div className="flex items-center text-sm font-medium text-primary group-hover:gap-2 transition-all">
                  <span>Explore</span>
                  <ArrowRight className="h-4 w-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-1 transition-all" />
                </div>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
