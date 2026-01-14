
export type Category = 'Pakistani' | 'Chinese' | 'Desserts' | 'Beverages';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  image: string;
  cost: number; // For profit calculation
}

export interface InventoryItem {
  id: string;
  name: string;
  stock: number;
  unit: string;
  minStock: number;
  supplier: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  paymentMethod: 'Cash' | 'Digital';
  timestamp: number;
  orderNumber: string;
}

export interface DailyReport {
  date: string;
  totalSales: number;
  totalProfit: number;
  orderCount: number;
}
