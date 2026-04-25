"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Filter, SlidersHorizontal } from "lucide-react";
import { use } from "react";
import { ProductCard } from "@/components/ui/product-card";
import { Button } from "@/components/ui/button";

import { PRODUCTS } from '@/lib/data/products';

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug.toLowerCase();
  const title = slug.charAt(0).toUpperCase() + slug.slice(1);
  const [filterEggless, setFilterEggless] = useState(false);
  const [priceRange, setPriceRange] = useState<string>('all');

  const displayedProducts = PRODUCTS.filter((p) => {
    // Basic slug filtering (Category/Occasion)
    const matchesCategory = 
      slug === "eggless" ? p.isEggless :
      p.occasion?.toLowerCase() === slug || 
      p.name.toLowerCase().includes(slug);
    
    if (!matchesCategory && slug !== "all") return false;
    
    if (filterEggless && !p.isEggless) return false;
    
    if (priceRange === 'under-500' && p.price >= 500) return false;
    if (priceRange === '500-1000' && (p.price < 500 || p.price > 1000)) return false;
    if (priceRange === 'over-1000' && p.price <= 1000) return false;
    
    return true;
  });

  return (
    <div className="container mx-auto px-4 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{title} Cakes</h1>
        <p className="text-muted-foreground">
          Browse our exquisite collection of {title.toLowerCase()} cakes.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="bg-card border rounded-2xl p-6 sticky top-28">
            <div className="flex items-center gap-2 font-semibold text-lg mb-6">
              <Filter className="w-5 h-5" /> Filters
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-3">Dietary</h3>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    className="w-5 h-5 rounded border-border text-primary focus:ring-primary/50 cursor-pointer"
                    checked={filterEggless}
                    onChange={(e) => setFilterEggless(e.target.checked)}
                  />
                  <span className="text-sm group-hover:text-primary transition-colors">100% Eggless</span>
                </label>
              </div>

              <div>
                <h3 className="font-medium mb-3">Price Range</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="radio" 
                      name="price" 
                      className="cursor-pointer" 
                      checked={priceRange === 'all'}
                      onChange={() => setPriceRange('all')}
                    />
                    <span className="text-sm group-hover:text-primary transition-colors">All Prices</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="radio" 
                      name="price" 
                      className="cursor-pointer" 
                      checked={priceRange === 'under-500'}
                      onChange={() => setPriceRange('under-500')}
                    />
                    <span className="text-sm group-hover:text-primary transition-colors">Under ₹500</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="radio" 
                      name="price" 
                      className="cursor-pointer" 
                      checked={priceRange === '500-1000'}
                      onChange={() => setPriceRange('500-1000')}
                    />
                    <span className="text-sm group-hover:text-primary transition-colors">₹500 - ₹1000</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="radio" 
                      name="price" 
                      className="cursor-pointer" 
                      checked={priceRange === 'over-1000'}
                      onChange={() => setPriceRange('over-1000')}
                    />
                    <span className="text-sm group-hover:text-primary transition-colors">Over ₹1000</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <span className="text-muted-foreground">
              Showing {displayedProducts.length} results
            </span>
            <Button variant="outline" className="gap-2 rounded-full">
              <SlidersHorizontal className="w-4 h-4" /> Sort By: Popular
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ProductCard 
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  image={product.image}
                  category={product.category}
                  isEggless={product.isEggless}
                  rating={product.rating}
                />
              </motion.div>
            ))}
          </div>

          {displayedProducts.length === 0 && (
            <div className="text-center py-20 bg-muted/30 rounded-2xl border border-dashed">
              <h3 className="text-xl font-medium mb-2">No cakes found</h3>
              <p className="text-muted-foreground">Try adjusting your filters.</p>
              <Button
                variant="outline"
                className="mt-4 rounded-full"
                onClick={() => {
                  setFilterEggless(false);
                  setPriceRange('all');
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
