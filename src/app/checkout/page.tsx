"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, CreditCard, MapPin, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function CheckoutPage() {
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = () => {
    setIsProcessing(true);
    // Simulate Razorpay payment
    setTimeout(() => {
      setIsProcessing(false);
      setStep(3); // Success step
    }, 2000);
  };

  if (step === 3) {
    return (
      <div className="container mx-auto px-4 py-24 text-center max-w-lg">
        <div className="w-24 h-24 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-12 h-12 text-green-600 dark:text-green-500" />
        </div>
        <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
        <p className="text-muted-foreground mb-8 text-lg">
          Your order #ORD-12049 has been placed successfully. We will send you an email confirmation shortly.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/dashboard">
            <Button variant="outline" className="rounded-full px-8">Track Order</Button>
          </Link>
          <Link href="/">
            <Button className="rounded-full px-8">Continue Shopping</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 lg:px-8 py-12">
      <Link href="/cart" className="inline-flex items-center text-muted-foreground hover:text-primary mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Cart
      </Link>
      
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Left: Forms */}
        <div className="flex-1 space-y-8">
          
          {/* Step 1: Address */}
          <div className={`p-6 border rounded-2xl transition-all ${step === 1 ? 'border-primary ring-1 ring-primary/20 bg-card shadow-sm' : 'bg-muted/30 border-dashed'}`}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${step >= 1 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>1</div>
                Delivery Address
              </h2>
              {step > 1 && (
                <Button variant="ghost" size="sm" onClick={() => setStep(1)}>Edit</Button>
              )}
            </div>
            
            {step === 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input placeholder="Full Name" />
                <Input placeholder="Mobile Number" />
                <Input placeholder="Pincode" />
                <Input placeholder="City" />
                <div className="md:col-span-2">
                  <Input placeholder="Flat, House no., Building, Company, Apartment" />
                </div>
                <div className="md:col-span-2">
                  <Input placeholder="Area, Street, Sector, Village" />
                </div>
                <div className="md:col-span-2 mt-4">
                  <Button className="w-full sm:w-auto px-8" onClick={() => setStep(2)}>
                    Deliver to this address
                  </Button>
                </div>
              </div>
            )}
            {step > 1 && (
              <div className="pl-10 text-muted-foreground">
                <p>John Doe, +91 9876543210</p>
                <p>123 Baker Street, Mumbai, Maharashtra 400001</p>
              </div>
            )}
          </div>

          {/* Step 2: Delivery Slot & Payment */}
          <div className={`p-6 border rounded-2xl transition-all ${step === 2 ? 'border-primary ring-1 ring-primary/20 bg-card shadow-sm' : 'bg-muted/30 border-dashed'}`}>
            <h2 className="text-xl font-bold flex items-center gap-2 mb-6 text-foreground">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${step >= 2 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>2</div>
              Delivery Slot & Payment
            </h2>
            
            {step === 2 && (
              <div className="space-y-8">
                <div>
                  <h3 className="font-semibold mb-4 flex items-center gap-2"><Truck className="w-4 h-4"/> Choose Delivery Time</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <button className="p-3 border-2 border-primary bg-primary/5 rounded-xl text-center">
                      <div className="font-bold text-primary">Standard</div>
                      <div className="text-xs text-muted-foreground mt-1">Free</div>
                    </button>
                    <button className="p-3 border-2 border-border hover:border-primary/30 rounded-xl text-center transition-colors">
                      <div className="font-bold">Midnight</div>
                      <div className="text-xs text-muted-foreground mt-1">+₹250</div>
                    </button>
                    <button className="p-3 border-2 border-border hover:border-primary/30 rounded-xl text-center transition-colors">
                      <div className="font-bold">Fixed Time</div>
                      <div className="text-xs text-muted-foreground mt-1">+₹150</div>
                    </button>
                  </div>
                </div>

                <div className="pt-6 border-t">
                  <h3 className="font-semibold mb-4 flex items-center gap-2"><CreditCard className="w-4 h-4"/> Payment Method</h3>
                  <div className="p-4 border rounded-xl bg-muted/30 flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold text-xs">
                        Razorpay
                      </div>
                      <div>
                        <div className="font-medium">Pay via Razorpay</div>
                        <div className="text-xs text-muted-foreground">UPI, Cards, Wallets, NetBanking</div>
                      </div>
                    </div>
                    <div className="w-4 h-4 rounded-full border-4 border-primary"></div>
                  </div>

                  <Button 
                    className="w-full h-14 text-lg rounded-xl" 
                    onClick={handlePayment}
                    disabled={isProcessing}
                  >
                    {isProcessing ? "Processing..." : "Pay ₹2947 & Place Order"}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Order Summary */}
        <div className="w-full lg:w-[350px]">
          <div className="bg-card border rounded-2xl p-6 sticky top-28">
            <h2 className="text-lg font-bold mb-4">Order Summary</h2>
            
            <div className="space-y-4 mb-4">
              <div className="flex gap-4">
                <div className="w-16 h-16 bg-muted rounded-md shrink-0 border relative overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=100&q=60" alt="" className="object-cover w-full h-full" />
                </div>
                <div>
                  <div className="font-medium text-sm line-clamp-1">Midnight Truffle Fantasy</div>
                  <div className="text-xs text-muted-foreground">Qty: 1</div>
                  <div className="font-bold mt-1">₹1299</div>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-16 h-16 bg-muted rounded-md shrink-0 border relative overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1519869325930-281384150729?w=100&q=60" alt="" className="object-cover w-full h-full" />
                </div>
                <div>
                  <div className="font-medium text-sm line-clamp-1">Premium Mango Delight</div>
                  <div className="text-xs text-muted-foreground">Qty: 2</div>
                  <div className="font-bold mt-1">₹1499</div>
                </div>
              </div>
            </div>

            <div className="border-t pt-4 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>₹2798</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Delivery Charge</span>
                <span>₹149</span>
              </div>
              <div className="border-t pt-3 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-primary">₹2947</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
