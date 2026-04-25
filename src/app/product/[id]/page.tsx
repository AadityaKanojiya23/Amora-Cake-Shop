"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { use } from "react";
import { Star, Minus, Plus, ShoppingBag, Truck, Info, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

// Dummy product for now
const PRODUCT = {
  id: "1",
  name: "Midnight Truffle Fantasy",
  price: 1299,
  originalPrice: 1599,
  description: "A decadent, dark chocolate truffle cake made with premium Belgian chocolate and layered with rich ganache. Perfect for midnight celebrations.",
  imageUrls: [
    "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=60",
    "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=800&q=60",
    "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&q=60"
  ],
  type: "eggless",
  flavor: "Chocolate",
  rating: 4.8,
  reviewsCount: 124,
};

const SIZES = [
  { label: "0.5 Kg", multiplier: 1 },
  { label: "1 Kg", multiplier: 1.8 },
  { label: "1.5 Kg", multiplier: 2.5 },
  { label: "2 Kg", multiplier: 3.2 },
];

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params); // Next.js 15+ convention for dynamic routes params
  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(SIZES[0]);
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");

  const currentPrice = Math.round(PRODUCT.price * selectedSize.multiplier);
  const originalPrice = PRODUCT.originalPrice ? Math.round(PRODUCT.originalPrice * selectedSize.multiplier) : null;

  return (
    <div className="container mx-auto px-4 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
        
        {/* Left: Image Gallery */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative aspect-square rounded-3xl overflow-hidden bg-muted border"
          >
            <Image
              src={PRODUCT.imageUrls[activeImage]}
              alt={PRODUCT.name}
              fill
              className="object-cover"
              priority
            />
            {/* Wishlist */}
            <button className="absolute top-4 right-4 z-10 p-3 bg-white/80 hover:bg-white backdrop-blur-md rounded-full text-muted-foreground hover:text-primary transition-all shadow-md">
              <Heart className="w-5 h-5" />
            </button>
          </motion.div>

          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {PRODUCT.imageUrls.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(idx)}
                className={`relative w-24 h-24 rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all ${
                  activeImage === idx ? "border-primary ring-2 ring-primary/20" : "border-transparent opacity-70 hover:opacity-100"
                }`}
              >
                <Image src={img} alt="" fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Product Details */}
        <div className="flex flex-col">
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-3">
              <span className="bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {PRODUCT.flavor}
              </span>
              <span className="bg-white/50 dark:bg-black/50 border text-xs font-medium px-3 py-1 rounded-full">
                {PRODUCT.type === "eggless" ? "🌱 100% Eggless" : "🥚 Contains Egg"}
              </span>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">{PRODUCT.name}</h1>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center bg-primary text-primary-foreground px-2 py-1 rounded-md text-sm font-bold">
                {PRODUCT.rating} <Star className="w-3 h-3 ml-1 fill-current" />
              </div>
              <span className="text-muted-foreground text-sm underline cursor-pointer">
                {PRODUCT.reviewsCount} Reviews
              </span>
            </div>

            <div className="flex items-end gap-3">
              <span className="text-4xl font-bold text-foreground">₹{currentPrice}</span>
              {originalPrice && (
                <span className="text-xl text-muted-foreground line-through mb-1">
                  ₹{originalPrice}
                </span>
              )}
            </div>
          </div>

          <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
            {PRODUCT.description}
          </p>

          <div className="space-y-8 mb-8 border-t border-b py-8">
            {/* Size Selector */}
            <div>
              <h3 className="font-semibold mb-4 text-foreground flex items-center gap-2">
                Select Size <Info className="w-4 h-4 text-muted-foreground" />
              </h3>
              <div className="flex flex-wrap gap-3">
                {SIZES.map((size) => (
                  <button
                    key={size.label}
                    onClick={() => setSelectedSize(size)}
                    className={`px-5 py-3 rounded-xl border-2 font-medium transition-all ${
                      selectedSize.label === size.label
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-border hover:border-primary/30 text-muted-foreground hover:bg-muted/50"
                    }`}
                  >
                    {size.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Message */}
            <div>
              <h3 className="font-semibold mb-4 text-foreground">Message on Cake (Optional)</h3>
              <input
                type="text"
                maxLength={25}
                placeholder="e.g. Happy Birthday John"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full border-b-2 border-border focus:border-primary bg-transparent py-2 outline-none transition-colors"
              />
              <p className="text-xs text-muted-foreground mt-2 text-right">
                {message.length}/25 characters
              </p>
            </div>

            {/* Quantity */}
            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-2xl border">
              <span className="font-semibold">Quantity</span>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 rounded-full bg-background border hover:bg-muted transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="font-bold w-6 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 rounded-full bg-background border hover:bg-muted transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Button size="lg" className="flex-1 h-14 text-lg rounded-full shadow-lg hover:shadow-xl transition-all">
              <ShoppingBag className="w-5 h-5 mr-2" /> Add to Cart
            </Button>
          </div>

          {/* Delivery Info */}
          <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-full text-primary">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-semibold mb-1">Check Delivery Options</h4>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Enter Pincode"
                    className="flex-1 bg-background border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  <Button variant="outline" className="rounded-lg">Check</Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Same day delivery available for orders placed before 8 PM.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
