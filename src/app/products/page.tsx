"use client";

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Star, ChevronDown, ShoppingBag, ArrowLeft } from 'lucide-react';
import { PRODUCTS } from '@/lib/data/products';
import { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import Link from 'next/link';

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'default' | 'low' | 'high'>('default');

  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    if (searchQuery) {
      result = result.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (sortBy === 'low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'high') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [searchQuery, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-black/20 pb-20">
      {/* Header Section */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-white/10 pt-28 pb-12 px-4 lg:px-8">
        <div className="container mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-primary font-bold mb-6 hover:gap-3 transition-all">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">
                Our Signature <span className="text-primary">Cakes</span>
              </h1>
              <p className="text-gray-500 dark:text-gray-400 max-w-xl">
                Explore our collection of 50 handcrafted masterpieces, each baked with love and the finest ingredients.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <div className="relative flex-1 sm:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search for your favorite cake..."
                  className="pl-10 h-12 rounded-2xl border-gray-200 dark:bg-black/40 focus:ring-primary"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="relative">
                <select
                  className="appearance-none h-12 px-6 pr-12 rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-black/40 text-sm font-medium focus:ring-2 focus:ring-primary focus:outline-none cursor-pointer"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                >
                  <option value="default">Sort by: Featured</option>
                  <option value="low">Price: Low to High</option>
                  <option value="high">Price: High to Low</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <p className="text-gray-500 font-medium">
            Showing <span className="text-gray-900 dark:text-white font-bold">{filteredProducts.length}</span> cakes
          </p>
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group relative bg-white dark:bg-gray-900 rounded-3xl p-4 border border-gray-100 dark:border-white/10 hover:shadow-2xl hover:shadow-primary/10 dark:hover:shadow-none transition-all duration-500"
              >
                {/* Badges */}
                <div className="absolute top-6 left-6 z-10 flex flex-col gap-2">
                  {product.isBestSeller && (
                    <span className="bg-orange-500 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
                      Best Seller
                    </span>
                  )}
                  {product.isNew && (
                    <span className="bg-primary text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
                      New Arrival
                    </span>
                  )}
                </div>

                {/* Image Container */}
                <div className="relative aspect-square rounded-2xl overflow-hidden mb-6 bg-gray-100 dark:bg-gray-800">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
                </div>

                {/* Info */}
                <div className="space-y-2 px-1">
                  <div className="flex justify-between items-start">
                    <p className="text-xs font-bold text-primary uppercase tracking-wider">Premium Cake</p>
                    <div className="flex items-center gap-1 text-yellow-500">
                      <Star className="w-3 h-3 fill-current" />
                      <span className="text-xs font-bold text-gray-600 dark:text-gray-400">{product.rating.toFixed(1)}</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-1 group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                  
                  <div className="pt-4 flex items-center justify-between">
                    <p className="text-2xl font-black text-gray-900 dark:text-white">
                      ₹{product.price}
                    </p>
                    <Button 
                      size="sm" 
                      className="rounded-xl bg-gray-900 dark:bg-white text-white dark:text-black hover:bg-primary dark:hover:bg-primary dark:hover:text-white transition-all duration-300"
                    >
                      Order Now
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProducts.length === 0 && (
          <div className="py-20 text-center">
            <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-10 h-10 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No cakes found</h2>
            <p className="text-gray-500">Try searching for a different cake flavor.</p>
          </div>
        )}
      </div>
    </div>
  );
}
