export type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  joinedAt: string;
};

export type Category = 'Cake' | 'Flower' | 'Candle' | 'Decoration';

export type Product = {
  id: string;
  name: string;
  price: number;
  category: Category;
  image: string;
  description: string;
  rating: number;
  isBestSeller?: boolean;
  isNew?: boolean;
};

export type OrderStatus = 'Ordered' | 'Baking' | 'Out for Delivery' | 'Delivered';

export type Order = {
  id: string;
  cakeName: string;
  price: number;
  status: OrderStatus;
  date: string;
  image?: string;
};

export type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  orders: Order[];
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
};
