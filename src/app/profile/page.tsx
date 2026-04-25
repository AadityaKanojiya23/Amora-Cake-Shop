"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Calendar, Edit2, Check, X, Camera } from "lucide-react";
import { useAuthStore } from "@/lib/store/authStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function ProfilePage() {
  const { user, updateProfile } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");

  const handleSave = () => {
    updateProfile({ name, email });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setName(user?.name || "");
    setEmail(user?.email || "");
    setIsEditing(false);
  };

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl border border-gray-100 dark:border-white/10 overflow-hidden"
        >
          {/* Profile Header */}
          <div className="relative h-48 bg-primary">
            <div className="absolute -bottom-16 left-8 md:left-12">
              <div className="relative">
                <div className="w-32 h-32 rounded-3xl bg-white dark:bg-gray-800 p-2 shadow-xl">
                  <div className="w-full h-full rounded-2xl bg-primary/10 flex items-center justify-center text-4xl font-bold text-primary border-2 border-primary/5">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                </div>
                <button className="absolute bottom-2 right-2 p-2 bg-white dark:bg-gray-700 rounded-xl shadow-lg border border-gray-100 dark:border-white/10 text-gray-600 dark:text-gray-300 hover:text-primary transition-colors">
                  <Camera className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="pt-20 pb-12 px-8 md:px-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">My Profile</h1>
                <p className="text-gray-500 dark:text-gray-400">Manage your personal information and security</p>
              </div>
              
              {!isEditing ? (
                <Button 
                  onClick={() => setIsEditing(true)}
                  className="rounded-xl border-primary/20 text-primary hover:bg-primary/5 dark:hover:bg-primary/10"
                  variant="outline"
                >
                  <Edit2 className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              ) : (
                <div className="flex gap-3">
                  <Button 
                    onClick={handleCancel}
                    variant="ghost"
                    className="rounded-xl"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleSave}
                    className="rounded-xl bg-primary hover:bg-primary/90 text-white"
                  >
                    <Check className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="p-6 rounded-2xl bg-gray-50 dark:bg-black/20 border border-gray-100 dark:border-white/10">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/10 flex items-center justify-center text-blue-500">
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Full Name</p>
                      {isEditing ? (
                        <Input 
                          value={name} 
                          onChange={(e) => setName(e.target.value)}
                          className="mt-1 h-10 rounded-lg dark:bg-black/40"
                        />
                      ) : (
                        <p className="font-semibold text-gray-900 dark:text-white">{user?.name}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-gray-50 dark:bg-black/20 border border-gray-100 dark:border-white/10">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-900/10 flex items-center justify-center text-purple-500">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email Address</p>
                      {isEditing ? (
                        <Input 
                          value={email} 
                          onChange={(e) => setEmail(e.target.value)}
                          className="mt-1 h-10 rounded-lg dark:bg-black/40"
                        />
                      ) : (
                        <p className="font-semibold text-gray-900 dark:text-white">{user?.email}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="p-6 rounded-2xl bg-gray-50 dark:bg-black/20 border border-gray-100 dark:border-white/10">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-green-50 dark:bg-green-900/10 flex items-center justify-center text-green-500">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Member Since</p>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {user?.joinedAt ? new Date(user.joinedAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'April 2024'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10">
                  <h3 className="font-bold text-primary mb-2">Premium Member</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    You're a member of our Amore Cake Club. Enjoy free delivery and priority booking for custom cakes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </ProtectedRoute>
  );
}
