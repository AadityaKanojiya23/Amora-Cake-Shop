"use client";

import { DollarSign, ShoppingBag, Users, TrendingUp } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Stat Cards */}
        <div className="bg-card p-6 rounded-2xl border shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-muted-foreground text-sm font-medium mb-1">Total Revenue</p>
              <h3 className="text-2xl font-bold">₹1,24,500</h3>
            </div>
            <div className="p-3 bg-primary/10 rounded-full text-primary">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-center text-sm text-green-600 dark:text-green-500 font-medium">
            <TrendingUp className="w-4 h-4 mr-1" /> +12.5% from last month
          </div>
        </div>

        <div className="bg-card p-6 rounded-2xl border shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-muted-foreground text-sm font-medium mb-1">Total Orders</p>
              <h3 className="text-2xl font-bold">456</h3>
            </div>
            <div className="p-3 bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-500 rounded-full">
              <ShoppingBag className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-center text-sm text-green-600 dark:text-green-500 font-medium">
            <TrendingUp className="w-4 h-4 mr-1" /> +8.2% from last month
          </div>
        </div>

        <div className="bg-card p-6 rounded-2xl border shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-muted-foreground text-sm font-medium mb-1">Total Customers</p>
              <h3 className="text-2xl font-bold">1,204</h3>
            </div>
            <div className="p-3 bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-500 rounded-full">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-center text-sm text-green-600 dark:text-green-500 font-medium">
            <TrendingUp className="w-4 h-4 mr-1" /> +15.3% from last month
          </div>
        </div>
      </div>

      <div className="bg-card border rounded-2xl p-6 shadow-sm">
        <h2 className="text-xl font-bold mb-6">Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b text-muted-foreground text-sm">
                <th className="pb-3 font-medium">Order ID</th>
                <th className="pb-3 font-medium">Customer</th>
                <th className="pb-3 font-medium">Product</th>
                <th className="pb-3 font-medium">Amount</th>
                <th className="pb-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="border-b last:border-0">
                <td className="py-4 font-medium">#ORD-12049</td>
                <td className="py-4">John Doe</td>
                <td className="py-4 text-muted-foreground">Midnight Truffle...</td>
                <td className="py-4 font-bold">₹2,947</td>
                <td className="py-4">
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-md text-xs font-bold">Pending</span>
                </td>
              </tr>
              <tr className="border-b last:border-0">
                <td className="py-4 font-medium">#ORD-12048</td>
                <td className="py-4">Jane Smith</td>
                <td className="py-4 text-muted-foreground">Red Velvet Romance</td>
                <td className="py-4 font-bold">₹999</td>
                <td className="py-4">
                  <span className="px-2 py-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-500 rounded-md text-xs font-bold">Delivered</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
