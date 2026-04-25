"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const INITIAL_CART = [
  {
    id: "1",
    productId: "1",
    name: "Midnight Truffle Fantasy",
    price: 1299,
    quantity: 1,
    size: "1 Kg",
    imageUrl: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=60",
    message: "Happy Birthday",
  },
  {
    id: "2",
    productId: "4",
    name: "Premium Mango Delight",
    price: 1499,
    quantity: 2,
    size: "0.5 Kg",
    imageUrl: "https://images.unsplash.com/photo-1519869325930-281384150729?w=800&q=60",
  }
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState(INITIAL_CART);

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(items => items.map(item => item.id === id ? { ...item, quantity: newQuantity } : item));
  };

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const deliveryCharge = subtotal > 0 ? 149 : 0;
  const total = subtotal + deliveryCharge;

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24 text-center max-w-lg">
        <div className="bg-muted w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
          <Trash2 className="w-10 h-10 text-muted-foreground" />
        </div>
        <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
        <p className="text-muted-foreground mb-8">
          Looks like you haven't added any delicious cakes to your cart yet.
        </p>
        <Link href="/">
          <Button size="lg" className="rounded-full px-8">
            Start Shopping
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart ({cartItems.length})</h1>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Cart Items */}
        <div className="flex-1 space-y-6">
          {cartItems.map((item) => (
            <div key={item.id} className="flex flex-col sm:flex-row gap-6 p-6 bg-card border rounded-2xl relative">
              <Link href={`/product/${item.productId}`} className="shrink-0 relative w-full sm:w-32 aspect-square rounded-xl overflow-hidden bg-muted">
                <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
              </Link>

              <div className="flex flex-col flex-1">
                <div className="flex justify-between items-start gap-4 mb-2">
                  <Link href={`/product/${item.productId}`}>
                    <h3 className="text-lg font-bold hover:text-primary transition-colors">{item.name}</h3>
                  </Link>
                  <span className="font-bold whitespace-nowrap">₹{item.price * item.quantity}</span>
                </div>
                
                <p className="text-sm text-muted-foreground mb-1">Size: {item.size}</p>
                {item.message && (
                  <p className="text-sm text-muted-foreground mb-4">Message: "{item.message}"</p>
                )}

                <div className="mt-auto flex items-center justify-between">
                  <div className="flex items-center gap-4 bg-muted/50 rounded-full border p-1">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-background transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="font-medium text-sm w-4 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-background transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeItem(item.id)}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10 gap-2"
                  >
                    <Trash2 className="w-4 h-4" /> Remove
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-[400px]">
          <div className="bg-card border rounded-3xl p-8 sticky top-28">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">₹{subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Delivery Charge</span>
                <span className="font-medium">₹{deliveryCharge}</span>
              </div>
              <div className="flex justify-between text-success">
                <span className="text-muted-foreground">Discount</span>
                <span className="font-medium">- ₹0</span>
              </div>
              
              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-lg">Total</span>
                  <span className="font-bold text-2xl text-primary">₹{total}</span>
                </div>
              </div>
            </div>

            <Link href="/checkout" className="block">
              <Button size="lg" className="w-full rounded-full h-14 text-lg mb-4">
                Proceed to Checkout <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>

            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="w-4 h-4" /> Secure Payment
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
