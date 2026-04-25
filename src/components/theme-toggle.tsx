"use client";

import * as React from "react";
import { Palette, Check } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  const themes = [
    { id: "vanilla", name: "Vanilla", color: "#fdfbf7" },
    { id: "chocolate", name: "Chocolate", color: "#291d17" },
    { id: "rose", name: "Rose Cake", color: "#f9eef2" },
    { id: "matcha", name: "Matcha", color: "#f1f8ee" },
    { id: "red-velvet", name: "Red Velvet", color: "#660011" },
  ];

  // Close dropdown on outside click
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-full relative h-11 w-11"
      >
        <Palette className="h-5 w-5 text-foreground transition-all hover:scale-110" />
        <span className="sr-only">Toggle theme</span>
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-3 w-48 bg-background rounded-2xl shadow-xl border border-border py-2 z-[100] overflow-hidden"
          >
            <div className="px-4 py-2 border-b border-border mb-2">
              <p className="text-sm font-semibold text-foreground">Select Flavor</p>
            </div>
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  setTheme(t.id);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-2 text-sm transition-colors hover:bg-primary/10 hover:text-primary ${
                  theme === t.id ? "text-primary font-medium bg-primary/5" : "text-foreground"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="w-4 h-4 rounded-full border border-border shadow-sm"
                    style={{ backgroundColor: t.color }}
                  />
                  {t.name}
                </div>
                {theme === t.id && <Check className="w-4 h-4" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
