"use client";

import { Package, User, MapPin, Heart, LogOut, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const MOCK_ORDERS = [
  {
    id: "ORD-12049",
    date: "Oct 24, 2026",
    status: "Delivered",
    total: 2947,
    items: "Midnight Truffle Fantasy, Premium Mango Delight",
  },
  {
    id: "ORD-11890",
    date: "Sep 15, 2026",
    status: "Delivered",
    total: 849,
    items: "Classic Black Forest",
  }
];

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">My Account</h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-64 space-y-2">
          <button className="w-full flex items-center justify-between p-4 rounded-xl bg-primary text-primary-foreground font-medium">
            <div className="flex items-center gap-3"><Package className="w-5 h-5"/> Orders</div>
            <ChevronRight className="w-4 h-4" />
          </button>
          <button className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-muted text-foreground transition-colors">
            <div className="flex items-center gap-3"><User className="w-5 h-5"/> Profile</div>
          </button>
          <button className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-muted text-foreground transition-colors">
            <div className="flex items-center gap-3"><MapPin className="w-5 h-5"/> Addresses</div>
          </button>
          <button className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-muted text-foreground transition-colors">
            <div className="flex items-center gap-3"><Heart className="w-5 h-5"/> Wishlist</div>
          </button>
          <button className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-destructive/10 text-destructive transition-colors mt-8">
            <div className="flex items-center gap-3"><LogOut className="w-5 h-5"/> Logout</div>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="bg-card border rounded-2xl p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-6">Order History</h2>

            <div className="space-y-6">
              {MOCK_ORDERS.map((order) => (
                <div key={order.id} className="border rounded-xl p-5 hover:border-primary/50 transition-colors">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-4">
                    <div>
                      <div className="font-bold text-lg">{order.id}</div>
                      <div className="text-sm text-muted-foreground">{order.date}</div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        order.status === 'Delivered' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-500' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {order.status}
                      </span>
                      <span className="font-bold">₹{order.total}</span>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground mb-4">
                    Items: {order.items}
                  </div>
                  <div className="flex gap-3">
                    <Button variant="outline" size="sm" className="rounded-full">Track Order</Button>
                    <Button variant="outline" size="sm" className="rounded-full">Reorder</Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
