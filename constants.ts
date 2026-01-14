
import { MenuItem, InventoryItem } from './types';

export const INITIAL_MENU: MenuItem[] = [
  // Pakistani
  { id: 'p1', name: 'Chicken Karahi', description: 'Traditional spicy chicken cooked in a wok with tomatoes and ginger.', price: 1200, cost: 700, category: 'Pakistani', image: 'https://images.unsplash.com/photo-1603496987351-f84a3bc5ec15?q=80&w=800' },
  { id: 'p2', name: 'Mutton Karahi', description: 'Premium goat meat slow-cooked with aromatic spices.', price: 2400, cost: 1500, category: 'Pakistani', image: 'https://images.unsplash.com/photo-1545231027-63b6f0a6d07e?q=80&w=800' },
  { id: 'p3', name: 'Chicken Biryani', description: 'Fragrant basmati rice with spiced chicken and potatoes.', price: 350, cost: 200, category: 'Pakistani', image: 'https://images.unsplash.com/photo-1563379091339-03b21bc4a4f8?q=80&w=800' },
  { id: 'p4', name: 'Nihari', description: 'Rich, slow-cooked beef stew, a royal breakfast delicacy.', price: 600, cost: 350, category: 'Pakistani', image: 'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?q=80&w=800' },
  { id: 'p5', name: 'Seekh Kabab', description: 'Flame-grilled minced meat skewers with fresh herbs.', price: 300, cost: 150, category: 'Pakistani', image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=800' },
  
  // Chinese
  { id: 'c1', name: 'Chicken Manchurian', description: 'Classic Indo-Chinese diced chicken in spicy red gravy.', price: 850, cost: 450, category: 'Chinese', image: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?q=80&w=800' },
  { id: 'c2', name: 'Chicken Chow Mein', description: 'Stir-fried noodles with crisp vegetables and chicken.', price: 700, cost: 380, category: 'Chinese', image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=800' },
  { id: 'c3', name: 'Hot & Sour Soup', description: 'Tangy and spicy broth with chicken and bamboo shoots.', price: 450, cost: 200, category: 'Chinese', image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=800' },

  // Desserts
  { id: 'd1', name: 'Gulab Jamun', description: 'Soft milk-solid balls dipped in rose-scented syrup.', price: 250, cost: 100, category: 'Desserts', image: 'https://images.unsplash.com/photo-1589119908995-c6837fa14848?q=80&w=800' },
  { id: 'd2', name: 'Ras Malai', description: 'Creamy cheese patties soaked in saffron-infused milk.', price: 350, cost: 180, category: 'Desserts', image: 'https://images.unsplash.com/photo-1621508654686-809f23efdaba?q=80&w=800' },
];

export const INITIAL_INVENTORY: InventoryItem[] = [
  { id: 'i1', name: 'Basmati Rice', stock: 50, unit: 'kg', minStock: 10, supplier: 'Punjab Mills' },
  { id: 'i2', name: 'Cooking Oil', stock: 100, unit: 'Litre', minStock: 20, supplier: 'Dalda Corp' },
  { id: 'i3', name: 'Chicken', stock: 30, unit: 'kg', minStock: 5, supplier: 'Local Poultry' },
  { id: 'i4', name: 'Mutton', stock: 15, unit: 'kg', minStock: 5, supplier: 'Fresh Meat Co' },
  { id: 'i5', name: 'Spices Mix', stock: 10, unit: 'kg', minStock: 2, supplier: 'National Foods' },
];

export const TAX_RATE = 0.16; // 16% GST
