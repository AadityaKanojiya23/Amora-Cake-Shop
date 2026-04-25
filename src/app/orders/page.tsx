"use client";

import { motion } from "framer-motion";
import { Package, ChevronRight, Clock, MapPin, Search } from "lucide-react";
import { useAuthStore } from "@/lib/store/authStore";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Link from "next/link";
import { Input } from "@/components/ui/input";

export default function OrdersPage() {
  const { orders } = useAuthStore();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'Baking': return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400';
      case 'Out for Delivery': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      case 'Ordered': return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">My Orders</h1>
            <p className="text-gray-500 dark:text-gray-400">Track and manage your current and past orders</p>
          </div>

          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input 
              placeholder="Search orders..." 
              className="pl-10 h-11 rounded-xl border-gray-200 dark:bg-black/40 dark:border-white/10 focus:ring-primary"
            />
          </div>
        </div>

        <div className="space-y-6">
          {orders.map((order, index) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-white/10 overflow-hidden hover:shadow-xl hover:shadow-primary/5 dark:hover:shadow-none transition-all duration-300"
            >
              <div className="p-6 md:p-8 flex flex-col md:flex-row gap-8 items-center">
                {/* Product Image */}
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden shadow-md flex-shrink-0">
                  <img 
                    src={order.image || "https://images.unsplash.com/photo-1578985543217-07f5708d61ad?auto=format&fit=crop&q=80&w=200"} 
                    alt={order.cakeName}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Order Info */}
                <div className="flex-1 text-center md:text-left space-y-2">
                  <div className="flex flex-wrap justify-center md:justify-start items-center gap-3 mb-2">
                    <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                    <span className="text-sm text-gray-500 font-medium">{order.id}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors">
                    {order.cakeName}
                  </h3>
                  
                  <div className="flex flex-wrap justify-center md:justify-start items-center gap-6 text-sm text-gray-500">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      <span>{new Date(order.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center gap-1.5 font-semibold text-gray-900 dark:text-gray-200">
                      <span>Total: ${order.price.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-3 w-full md:w-auto">
                  <Link href="/track" className="w-full md:w-auto">
                    <button className="w-full px-8 py-3 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-black font-semibold text-sm hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Track Order
                    </button>
                  </Link>
                  <button className="w-full px-8 py-3 rounded-xl border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 font-semibold text-sm hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                    Order Details
                  </button>
                </div>
              </div>
              
              <div className="px-8 py-4 bg-gray-50 dark:bg-black/20 border-t border-gray-100 dark:border-white/10 flex justify-between items-center text-xs text-gray-500">
                <p>Standard Delivery: Arriving between 2 PM - 4 PM</p>
                <div className="flex items-center gap-1 cursor-pointer hover:text-primary transition-colors font-medium">
                  Rate Cake <ChevronRight className="w-3 h-3" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
}
