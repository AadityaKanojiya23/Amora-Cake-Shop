"use client";

import { motion } from "framer-motion";
import { Check, Package, ChefHat, Truck, Home, ChevronLeft } from "lucide-react";
import Link from "next/link";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

const TRACKING_STEPS = [
  { id: 'Ordered', label: 'Order Placed', icon: Package, description: 'We have received your order' },
  { id: 'Baking', label: 'Baking', icon: ChefHat, description: 'Our chef is preparing your cake' },
  { id: 'Out for Delivery', label: 'Out for Delivery', icon: Truck, description: 'Your cake is on the way' },
  { id: 'Delivered', label: 'Delivered', icon: Home, description: 'Cake has been delivered' }
];

export default function TrackOrderPage() {
  const currentStatus = 'Baking'; // This would come from real data
  const currentStepIndex = TRACKING_STEPS.findIndex(step => step.id === currentStatus);

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Link href="/orders" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-pink-500 transition-colors mb-8">
          <ChevronLeft className="w-4 h-4" />
          Back to My Orders
        </Link>

        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl shadow-pink-100 dark:shadow-none border border-gray-100 dark:border-white/10 overflow-hidden">
          {/* Header */}
          <div className="p-8 md:p-12 border-b border-gray-100 dark:border-white/10 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-900/50">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div>
                <p className="text-pink-500 font-bold text-sm uppercase tracking-wider mb-2">Order Tracking</p>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">ORD-1002</h1>
              </div>
              <div className="text-left md:text-right">
                <p className="text-sm text-gray-500 mb-1">Expected Delivery</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">Today, 4:30 PM</p>
              </div>
            </div>
          </div>

          {/* Tracking Progress Bar */}
          <div className="p-8 md:p-16">
            <div className="relative">
              {/* Desktop Progress Line */}
              <div className="hidden md:block absolute top-1/2 left-0 w-full h-1.5 bg-gray-100 dark:bg-white/5 -translate-y-1/2 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${(currentStepIndex / (TRACKING_STEPS.length - 1)) * 100}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-pink-500 to-rose-400"
                />
              </div>

              <div className="relative flex flex-col md:flex-row justify-between gap-12 md:gap-0">
                {TRACKING_STEPS.map((step, index) => {
                  const Icon = step.icon;
                  const isCompleted = index < currentStepIndex;
                  const isActive = index === currentStepIndex;

                  return (
                    <div key={step.id} className="flex flex-row md:flex-col items-center md:items-center gap-6 md:gap-4 flex-1">
                      {/* Step Circle */}
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className={`relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg transition-colors duration-300 ${
                          isCompleted ? 'bg-pink-500 text-white' : 
                          isActive ? 'bg-white dark:bg-gray-800 text-pink-500 border-2 border-pink-500 ring-4 ring-pink-50 dark:ring-pink-900/20' : 
                          'bg-gray-50 dark:bg-white/5 text-gray-300'
                        }`}
                      >
                        {isCompleted ? <Check className="w-8 h-8" /> : <Icon className="w-8 h-8" />}
                        
                        {/* Mobile Line Connecting Down */}
                        {index < TRACKING_STEPS.length - 1 && (
                          <div className="md:hidden absolute top-full left-1/2 -translate-x-1/2 w-0.5 h-12 bg-gray-100 dark:bg-white/5" />
                        )}
                      </motion.div>

                      {/* Step Info */}
                      <div className="text-left md:text-center space-y-1">
                        <p className={`font-bold text-sm md:text-base ${isActive ? 'text-pink-600' : 'text-gray-900 dark:text-gray-200'}`}>
                          {step.label}
                        </p>
                        <p className="text-xs text-gray-500 max-w-[150px] leading-relaxed">
                          {step.description}
                        </p>
                        {isActive && (
                          <motion.div 
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="text-[10px] font-bold text-pink-500 uppercase tracking-tighter"
                          >
                            In Progress
                          </motion.div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Footer Info */}
          <div className="p-8 md:p-12 bg-gray-50 dark:bg-black/20 border-t border-gray-100 dark:border-white/10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="font-bold text-gray-900 dark:text-white">Delivery Address</h3>
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-white/10 flex items-center justify-center flex-shrink-0 shadow-sm text-pink-500">
                    <Home className="w-5 h-5" />
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    123 Pastry Lane, Sweet Neighborhood,<br />
                    Confectionery City, CA 90210
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="font-bold text-gray-900 dark:text-white">Order Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Red Velvet Classic</span>
                    <span className="text-gray-900 dark:text-gray-200 font-medium">$38.50</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Delivery Fee</span>
                    <span className="text-green-600 font-medium">FREE</span>
                  </div>
                  <div className="pt-2 border-t border-gray-200 dark:border-white/10 flex justify-between font-bold text-gray-900 dark:text-white">
                    <span>Total</span>
                    <span>$38.50</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
