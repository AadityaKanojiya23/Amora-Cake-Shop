import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthState, User, Order } from '@/types';

const MOCK_ORDERS: Order[] = [
  {
    id: 'ORD-1001',
    cakeName: 'Premium Chocolate Truffle',
    price: 45.99,
    status: 'Delivered',
    date: '2024-04-15',
    image: 'https://images.unsplash.com/photo-1578985543217-07f5708d61ad?auto=format&fit=crop&q=80&w=200',
  },
  {
    id: 'ORD-1002',
    cakeName: 'Red Velvet Classic',
    price: 38.50,
    status: 'Baking',
    date: '2024-04-24',
    image: 'https://images.unsplash.com/photo-1586788680434-30d324671b1b?auto=format&fit=crop&q=80&w=200',
  },
];

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      orders: MOCK_ORDERS,

      login: async (email, password) => {
        // Mock login delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        // Simple mock validation
        if (email && password) {
          const mockUser: User = {
            id: 'user_1',
            name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
            email,
            joinedAt: new Date().toISOString(),
          };
          set({ user: mockUser, isAuthenticated: true });
        } else {
          throw new Error('Invalid credentials');
        }
      },

      signup: async (name, email, password) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        const mockUser: User = {
          id: `user_${Math.random().toString(36).substr(2, 9)}`,
          name,
          email,
          joinedAt: new Date().toISOString(),
        };
        set({ user: mockUser, isAuthenticated: true });
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },

      updateProfile: (data) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...data } : null,
        }));
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
