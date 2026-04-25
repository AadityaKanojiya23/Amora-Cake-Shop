import { Product } from '@/types';

// Using a mix of high-quality base IDs and unique seeds to ensure 50 distinct images
const BASE_CAKE_IDS = [
  "1578985543217-07f5708d61ad", "1535141192574-5d4897c12636", "1563729784474-d77dbb933a9e",
  "1488477181946-6428a0291777", "1588195538326-c5b1e9f80a1b", "1464349095431-e9a21285b5f3",
  "1551024506-0bccd828d307", "1516738901171-8eb4fc13bd20", "1542826438-bd32f433e10f",
  "1606890737304-57a1ca8a5b62", "1571115172743-e4dac2f32f94", "1621303837174-89787a7d4729",
  "1557308536-ee471ef2c390", "1519869325930-281384150729", "1602351447952-31346aa30bc3",
  "1559339352-11d035aa65de", "1550617931-e178c2593d2b", "1558301211-7d8c65f0a814",
  "1533134242443-d4fd215305ad", "1576618148400-f5a0c9b97d33"
];

const CAKE_NAMES = [
  "Belgian Chocolate Truffle", "Royal Red Velvet", "Classic Black Forest", "Mango Paradise",
  "Pineapple Sunshine", "Wild Blueberry Burst", "Madagascar Vanilla Bean", "Persian Pistachio Rose",
  "Salted Caramel Crunch", "Roasted Hazelnut Heaven", "Fresh Strawberry Swirl", "Sicilian Lemon Zest",
  "Italian Coffee Mocha", "French Opera Cake", "Classic Tiramisu", "Rainbow Celebration",
  "Nutella Rocher Fusion", "Honey Walnut Fudge", "Crunchy KitKat Overload", "Amore Ferrero Dream",
  "White Chocolate Raspberry", "Dark Forest Gateau", "Mocha Almond Fudge", "Pink Velvet Bliss",
  "Tropical Coconut Lime", "Banoffee Special", "Peanut Butter Joy", "Cookies & Cream Amore",
  "Matcha Green Tea", "Spiced Apple Crumble"
];

export const PRODUCTS: Product[] = Array.from({ length: 50 }, (_, i) => {
  const baseId = BASE_CAKE_IDS[i % BASE_CAKE_IDS.length];
  const nameBase = CAKE_NAMES[i % CAKE_NAMES.length];
  
  return {
    id: `cake-${i + 1}`,
    name: i >= 30 ? `${nameBase} Edition ${i - 29}` : nameBase,
    price: 599 + ((i * 137) % 25) * 100, // Deterministic
    category: "Cake" as const,
    image: `https://images.unsplash.com/photo-${baseId}?auto=format&fit=crop&q=80&w=600&sig=${i}`,
    description: "Handcrafted with the finest ingredients for an unforgettable taste experience.",
    rating: 4.2 + ((i * 7) % 8) / 10, // Deterministic
    isBestSeller: i % 8 === 0,
    isNew: i % 12 === 0,
  };
});
