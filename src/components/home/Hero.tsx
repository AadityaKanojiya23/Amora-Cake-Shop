"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const SLIDES = [
  {
    id: 1,
    title: "Baking",
    highlight: "Dreams",
    suffix: "Into Reality",
    description: "Experience the luxury of handcrafted cakes. Delivered fresh to your door, midnight or same-day.",
    bgImage: "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&q=80&w=2000",
    cakeImage: "/hero-cake-1.png", // Use locally saved generated image
  },
  {
    id: 2,
    title: "Celebrate",
    highlight: "Every",
    suffix: "Moment",
    description: "Make your special occasions unforgettable with our signature custom designs and premium flavors.",
    bgImage: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=2000",
    cakeImage: "https://images.unsplash.com/photo-1535141192574-5d4897c12636?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 3,
    title: "Delight",
    highlight: "In Every",
    suffix: "Bite",
    description: "Rich textures, balanced sweetness, and the finest ingredients sourced from around the world.",
    bgImage: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&q=80&w=2000",
    cakeImage: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 4,
    title: "Crafted",
    highlight: "With",
    suffix: "Love",
    description: "Traditional techniques meet modern artistry in every cake we bake. From our kitchen to your heart.",
    bgImage: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80&w=2000",
    cakeImage: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&q=80&w=800",
  },
];

export function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const slide = SLIDES[currentIndex];

  return (
    <section className="relative w-full min-h-[calc(100dvh-80px)] lg:h-[calc(100dvh-80px)] overflow-hidden bg-black">
      {/* Background Slides */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={`bg-${currentIndex}`}
          custom={direction}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0 z-0"
        >
          <div 
            className="absolute inset-0 bg-cover bg-center scale-110 blur-[2px]"
            style={{ backgroundImage: `url(${slide.bgImage})` }}
          />
          <div className="absolute inset-0 bg-black/60 bg-gradient-to-r from-black via-black/40 to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="container mx-auto px-4 lg:px-8 h-full relative z-10">
        <div className="grid lg:grid-cols-2 h-full items-center gap-12">
          {/* Left Content */}
          <div className="flex flex-col justify-center max-w-2xl py-12 lg:py-0 lg:pt-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={`content-${currentIndex}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black text-white leading-[1.1] tracking-tight mb-4 sm:mb-6">
                  {slide.title} <br />
                  <span className="text-pink-500 italic drop-shadow-[0_0_15px_rgba(236,72,153,0.3)]">
                    {slide.highlight}
                  </span> <br />
                  {slide.suffix}
                </h1>
                <p className="text-lg sm:text-xl text-gray-300 mb-8 sm:mb-10 max-w-lg leading-relaxed font-light">
                  {slide.description}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Fixed Buttons (Static) */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-5 w-full sm:w-auto">
              <Button 
                size="lg" 
                className="w-full sm:w-auto h-14 sm:h-16 px-8 sm:px-10 rounded-full bg-gradient-to-r from-pink-500 to-rose-400 hover:from-pink-600 hover:to-rose-500 text-white font-bold text-lg shadow-[0_10px_30px_rgba(236,72,153,0.3)] border-none group transition-all duration-300 hover:scale-105"
              >
                Order Now
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <a 
                href="https://www.instagram.com/amore_cakes_shop?igsh=MW5tMjJndTNycmU3OA==" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <Button 
                  variant="outline" 
                  size="lg"
                  className="w-full sm:w-auto h-14 sm:h-16 px-8 sm:px-10 rounded-full bg-transparent border-2 border-white/20 text-white hover:bg-white hover:text-black font-bold text-lg backdrop-blur-md transition-all duration-300 hover:scale-105"
                >
                  About us
                </Button>
              </a>
            </div>
          </div>

          {/* Right Side - Image Card */}
          <div className="hidden lg:flex items-center justify-center relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={`image-${currentIndex}`}
                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.8, rotate: 5 }}
                transition={{ duration: 1, ease: "anticipate" }}
                className="relative"
              >
                {/* Glow behind image */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-pink-500/20 blur-[100px] rounded-full" />
                
                <motion.div
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="relative z-10 bg-white/10 backdrop-blur-md p-8 rounded-[40px] border border-white/20 shadow-2xl"
                >
                  <div className="relative w-[400px] h-[400px] rounded-full overflow-hidden border-8 border-white shadow-2xl bg-gray-100 dark:bg-gray-800">
                    <Image 
                      src={slide.cakeImage} 
                      alt="Premium Cake" 
                      fill
                      priority
                      className="object-cover"
                    />
                  </div>
                  
                  {/* Floating badges */}
                  <motion.div 
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute -top-4 -right-4 bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-xl flex items-center gap-3 border border-pink-100 dark:border-pink-900/30"
                  >
                    <div className="w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center text-white">
                      <Play className="w-5 h-5 fill-current" />
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Premium Quality</p>
                      <p className="text-sm font-black text-gray-900 dark:text-white">Award Winning</p>
                    </div>
                  </motion.div>

                  <motion.div 
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 px-6 py-4 rounded-2xl shadow-xl border border-pink-100 dark:border-pink-900/30"
                  >
                    <p className="text-xs text-pink-500 font-bold mb-1 italic">100% Fresh</p>
                    <p className="text-base font-black text-gray-900 dark:text-white">Baked Today</p>
                  </motion.div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Indicators */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {SLIDES.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-1.5 transition-all duration-500 rounded-full ${
                currentIndex === index ? "w-12 bg-pink-500" : "w-3 bg-white/30 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
