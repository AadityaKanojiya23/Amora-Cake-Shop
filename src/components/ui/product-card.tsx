"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingBag, Heart } from "lucide-react";
import { Button } from "./button";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  type: string;
  isTrending?: boolean;
}

export function ProductCard({
  id,
  name,
  price,
  originalPrice,
  imageUrl,
  type,
  isTrending,
}: ProductCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group relative bg-card rounded-2xl border shadow-sm overflow-hidden flex flex-col h-full"
    >
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
        {isTrending && (
          <span className="bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded-full shadow-md">
            Trending
          </span>
        )}
        <span className="bg-white/90 text-black text-xs font-medium px-2 py-1 rounded-full shadow-md backdrop-blur-sm">
          {type === 'eggless' ? '🌱 Eggless' : '🥚 Contains Egg'}
        </span>
      </div>

      {/* Wishlist Button */}
      <button className="absolute top-3 right-3 z-10 p-2 bg-white/50 hover:bg-white/90 backdrop-blur-md rounded-full text-muted-foreground hover:text-primary transition-all shadow-sm">
        <Heart className="w-4 h-4" />
      </button>

      {/* Image Wrapper */}
      <Link href={`/product/${id}`} className="relative aspect-square overflow-hidden bg-muted block">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-secondary/50 flex items-center justify-center text-muted-foreground">
            No Image
          </div>
        )}
        
        {/* Quick Add Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex justify-center">
          <Button variant="glass" className="w-full gap-2">
            <ShoppingBag className="w-4 h-4" />
            Quick Add
          </Button>
        </div>
      </Link>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <Link href={`/product/${id}`} className="block mb-2">
          <h3 className="font-semibold text-lg text-foreground line-clamp-2 group-hover:text-primary transition-colors">
            {name}
          </h3>
        </Link>
        <div className="mt-auto flex items-center gap-2">
          <span className="text-xl font-bold text-foreground">₹{price}</span>
          {originalPrice && originalPrice > price && (
            <span className="text-sm text-muted-foreground line-through">
              ₹{originalPrice}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
