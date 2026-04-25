"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ui/product-card";
import { Hero } from "@/components/home/Hero";

// Dummy data for homepage since DB is empty initially
const TRENDING_CAKES = [
  {
    id: "1",
    name: "Midnight Truffle Fantasy",
    price: 1299,
    originalPrice: 1599,
    imageUrl: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&auto=format&fit=crop&q=60",
    type: "eggless",
    isTrending: true,
  },
  {
    id: "2",
    name: "Red Velvet Romance",
    price: 999,
    imageUrl: "https://images.unsplash.com/photo-1616541823729-00fe0aacd32c?w=800&auto=format&fit=crop&q=60",
    type: "egg",
    isTrending: true,
  },
  {
    id: "3",
    name: "Classic Black Forest",
    price: 849,
    originalPrice: 999,
    imageUrl: "https://images.unsplash.com/photo-1557308536-ee471ef2c390?w=800&auto=format&fit=crop&q=60",
    type: "eggless",
    isTrending: false,
  },
  {
    id: "4",
    name: "Premium Mango Delight",
    price: 1499,
    imageUrl: "https://images.unsplash.com/photo-1519869325930-281384150729?w=800&auto=format&fit=crop&q=60",
    type: "egg",
    isTrending: true,
  },
];

const CATEGORIES = [
  { name: "Birthday", image: "https://images.unsplash.com/photo-1535141192574-5d4897c12636?w=800&auto=format&fit=crop&q=60" },
  { name: "Anniversary", image: "/anniversary-cake.png" },
  { name: "Custom", image: "/custom-cake.png" },
  { name: "Wedding", image: "https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=800&auto=format&fit=crop&q=60" },
];

const MENU_CAKES = [
  { name: "Red Velvet Bliss", price: 899, image: "https://images.unsplash.com/photo-1616541823729-00fe0aacd32c?w=800&q=60" },
  { name: "Chocolate Truffle", price: 999, image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=60" },
  { name: "Blueberry Cheesecake", price: 1299, image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=800&q=60" },
  { name: "Vanilla Bean Dream", price: 799, image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800&q=60" },
  { name: "Mango Paradise", price: 1199, image: "https://images.unsplash.com/photo-1519869325930-281384150729?w=800&q=60" },
  { name: "Pistachio Rose", price: 1499, image: "https://images.unsplash.com/photo-1557308536-ee471ef2c390?w=800&q=60" },
];

export default function Home() {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    const newState = !showMenu;
    setShowMenu(newState);
    if (newState) {
      setTimeout(() => {
        menuRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  };

  return (
    <div className="flex flex-col gap-16 lg:gap-24 pb-16 lg:pb-24">
      <Hero />

      {/* Dynamic Menu Section */}
      <AnimatePresence>
        {showMenu && (
          <motion.section
            ref={menuRef}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.6, ease: "circOut" }}
            className="overflow-hidden bg-primary/5 py-16 lg:py-24"
          >
            <div className="container mx-auto px-4 lg:px-8">
              <div className="text-center mb-16">
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4"
                >
                  Our Premium Menu
                </motion.h2>
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: 96 }}
                  className="h-1.5 bg-primary mx-auto rounded-full"
                ></motion.div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
                {MENU_CAKES.map((cake, index) => (
                  <motion.div
                    key={cake.name}
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group bg-background rounded-[2.5rem] p-6 shadow-xl hover:shadow-2xl transition-all duration-500 border border-primary/5 hover:-translate-y-3"
                  >
                    <div className="relative aspect-square rounded-[2rem] overflow-hidden mb-8 shadow-inner">
                      <Image
                        src={cake.image}
                        alt={cake.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                    <div className="flex justify-between items-center px-2">
                      <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">{cake.name}</h3>
                      <div className="bg-primary/10 px-4 py-2 rounded-2xl">
                        <p className="text-xl font-bold text-primary">₹{cake.price}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Categories */}
      <section className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4"
        >
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">Shop by Occasion</h2>
            <p className="text-muted-foreground">Find the perfect cake for your special moments.</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {CATEGORIES.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link href={`/category/${category.name.toLowerCase()}`} className="group block text-center">
                <div className="relative aspect-square rounded-full overflow-hidden mb-4 border-4 border-border/50 group-hover:border-primary transition-colors shadow-lg">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <h3 className="text-lg font-medium group-hover:text-primary transition-colors">{category.name}</h3>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Trending Cakes */}
      <section className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4"
        >
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">Trending Masterpieces</h2>
            <p className="text-muted-foreground">Our most loved and highly rated cakes.</p>
          </div>
          <Button variant="ghost" className="text-primary hover:bg-primary/10 rounded-full">
            View All <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TRENDING_CAKES.map((cake, index) => (
            <motion.div
              key={cake.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="h-full"
            >
              <ProductCard {...cake} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Trust Banner */}
      <section className="container mx-auto px-4 lg:px-8">
        <div className="bg-primary/5 rounded-3xl p-6 sm:p-8 md:p-12 border border-primary/10 text-center">
          <div className="flex justify-center gap-1 mb-6">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className="w-8 h-8 fill-primary text-primary" />
            ))}
          </div>
          <h2 className="text-2xl md:text-4xl font-bold mb-4">"The best cake I've ever had!"</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Join over 50,000+ happy customers who have celebrated their special moments with Amora Cake Shop.
          </p>
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8 md:gap-16 text-center">
            <div>
              <p className="text-3xl font-bold text-foreground">50k+</p>
              <p className="text-sm text-muted-foreground">Happy Customers</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-foreground">100%</p>
              <p className="text-sm text-muted-foreground">Fresh Ingredients</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-foreground">2hr</p>
              <p className="text-sm text-muted-foreground">Express Delivery</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
