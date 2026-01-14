
import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { MenuItem, InventoryItem, Order, CartItem, DailyReport } from '../types';
import { INITIAL_MENU, INITIAL_INVENTORY } from '../constants';

interface RestaurantContextType {
  menu: MenuItem[];
  inventory: InventoryItem[];
  orders: Order[];
  salesHistory: Order[];
  addOrder: (order: Order) => void;
  updateInventory: (items: CartItem[]) => void;
  updateMenu: (item: MenuItem) => void;
  deleteMenu: (id: string) => void;
  updateInventoryItem: (item: InventoryItem) => void;
}

const RestaurantContext = createContext<RestaurantContextType | undefined>(undefined);

export const RestaurantProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [menu, setMenu] = useState<MenuItem[]>(() => {
    const saved = localStorage.getItem('ma_menu');
    return saved ? JSON.parse(saved) : INITIAL_MENU;
  });

  const [inventory, setInventory] = useState<InventoryItem[]>(() => {
    const saved = localStorage.getItem('ma_inventory');
    return saved ? JSON.parse(saved) : INITIAL_INVENTORY;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('ma_orders');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('ma_menu', JSON.stringify(menu));
    localStorage.setItem('ma_inventory', JSON.stringify(inventory));
    localStorage.setItem('ma_orders', JSON.stringify(orders));
  }, [menu, inventory, orders]);

  const addOrder = useCallback((order: Order) => {
    setOrders(prev => [order, ...prev]);
    updateInventory(order.items);
  }, []);

  const updateInventory = useCallback((cartItems: CartItem[]) => {
    setInventory(prev => prev.map(inv => {
      // Simple simulation: chicken items reduce chicken stock, etc.
      if (inv.name.toLowerCase() === 'chicken' && cartItems.some(c => c.name.toLowerCase().includes('chicken'))) {
          const qty = cartItems.filter(c => c.name.toLowerCase().includes('chicken')).reduce((acc, curr) => acc + curr.quantity, 0);
          return { ...inv, stock: Math.max(0, inv.stock - (qty * 0.5)) }; // 0.5kg per serving
      }
      return inv;
    }));
  }, []);

  const updateMenu = useCallback((item: MenuItem) => {
    setMenu(prev => {
      const exists = prev.find(i => i.id === item.id);
      if (exists) return prev.map(i => i.id === item.id ? item : i);
      return [...prev, item];
    });
  }, []);

  const deleteMenu = useCallback((id: string) => {
    setMenu(prev => prev.filter(i => i.id !== id));
  }, []);

  const updateInventoryItem = useCallback((item: InventoryItem) => {
    setInventory(prev => {
        const exists = prev.find(i => i.id === item.id);
        if (exists) return prev.map(i => i.id === item.id ? item : i);
        return [...prev, item];
    });
  }, []);

  return (
    <RestaurantContext.Provider value={{ 
      menu, inventory, orders, salesHistory: orders, 
      addOrder, updateInventory, updateMenu, deleteMenu, updateInventoryItem 
    }}>
      {children}
    </RestaurantContext.Provider>
  );
};

export const useRestaurant = () => {
  const context = useContext(RestaurantContext);
  if (!context) throw new Error('useRestaurant must be used within a RestaurantProvider');
  return context;
};
