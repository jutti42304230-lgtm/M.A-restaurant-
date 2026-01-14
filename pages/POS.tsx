
import React, { useState, useMemo } from 'react';
import { useRestaurant } from '../store/RestaurantContext';
import { CartItem, Order } from '../types';
import { TAX_RATE } from '../constants';
// Fix: Added missing ShoppingBag import from lucide-react
import { Plus, Minus, Trash2, Receipt, CreditCard, Banknote, CheckCircle2, ShoppingBag } from 'lucide-react';

export const POS: React.FC = () => {
  const { menu, addOrder } = useRestaurant();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [discount, setDiscount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState<'Cash' | 'Digital'>('Cash');
  const [showReceipt, setShowReceipt] = useState(false);
  const [lastOrder, setLastOrder] = useState<Order | null>(null);

  const subtotal = useMemo(() => cart.reduce((acc, item) => acc + (item.price * item.quantity), 0), [cart]);
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax - discount;

  const addToCart = (item: any) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeItem = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;

    const order: Order = {
      id: Math.random().toString(36).substr(2, 9),
      items: [...cart],
      subtotal,
      tax,
      discount,
      total,
      paymentMethod,
      timestamp: Date.now(),
      orderNumber: `ORD-${Math.floor(Math.random() * 9000) + 1000}`,
    };

    addOrder(order);
    setLastOrder(order);
    setShowReceipt(true);
    setCart([]);
    setDiscount(0);
  };

  return (
    <div className="h-[calc(100vh-80px)] bg-stone-100 flex overflow-hidden">
      {/* Items Section */}
      <div className="flex-grow p-6 overflow-y-auto">
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-2xl font-black text-emerald-950 uppercase tracking-tighter">Quick Order Panel</h2>
          <div className="flex space-x-2">
            {['Pakistani', 'Chinese', 'Desserts'].map(cat => (
              <span key={cat} className="px-3 py-1 bg-white text-stone-500 rounded-full text-[10px] font-bold uppercase tracking-widest border border-stone-200">
                {cat}
              </span>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {menu.map(item => (
            <button
              key={item.id}
              onClick={() => addToCart(item)}
              className="bg-white p-4 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all text-left group"
            >
              <div className="h-32 w-full rounded-xl overflow-hidden mb-3">
                <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
              </div>
              <h3 className="font-bold text-sm text-stone-900 group-hover:text-amber-600 transition-colors">{item.name}</h3>
              <p className="text-xs text-stone-400 font-medium mb-2">PKR {item.price}</p>
              <div className="flex justify-between items-center">
                 <span className="text-[9px] uppercase font-bold text-stone-300 tracking-widest">{item.category}</span>
                 <div className="p-1.5 bg-stone-100 rounded-full group-hover:bg-amber-600 group-hover:text-white transition-colors">
                    <Plus size={14} />
                 </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Cart Section */}
      <div className="w-[400px] bg-white shadow-2xl flex flex-col border-l border-stone-200">
        <div className="p-6 bg-emerald-950 text-white">
          <h3 className="text-xl font-bold flex items-center space-x-2">
            <ShoppingBag size={20} className="text-amber-500" />
            <span>Active Plate</span>
          </h3>
          <p className="text-emerald-400 text-xs mt-1">Order # {Math.floor(Math.random() * 999)}</p>
        </div>

        <div className="flex-grow overflow-y-auto p-4 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-stone-300 space-y-4">
              <ShoppingBag size={64} strokeWidth={1} />
              <p className="font-medium">The plate is empty</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="flex items-center space-x-4 bg-stone-50 p-3 rounded-xl">
                <div className="w-12 h-12 rounded-lg overflow-hidden bg-stone-200 flex-shrink-0">
                  <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
                </div>
                <div className="flex-grow">
                  <h4 className="text-sm font-bold text-stone-800">{item.name}</h4>
                  <p className="text-xs text-stone-500">PKR {item.price * item.quantity}</p>
                </div>
                <div className="flex items-center bg-white rounded-lg border border-stone-200 p-1">
                  <button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:text-amber-600"><Minus size={14} /></button>
                  <span className="px-2 text-xs font-bold">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:text-amber-600"><Plus size={14} /></button>
                </div>
                <button onClick={() => removeItem(item.id)} className="p-2 text-stone-400 hover:text-red-500"><Trash2 size={16} /></button>
              </div>
            ))
          )}
        </div>

        <div className="p-6 bg-stone-50 border-t border-stone-200 space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-stone-600">
              <span>Subtotal</span>
              <span>PKR {subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm text-stone-600">
              <span>GST (16%)</span>
              <span>PKR {tax.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-xl font-black text-emerald-950 pt-2 border-t border-stone-200">
              <span>Total</span>
              <span>PKR {total.toLocaleString()}</span>
            </div>
          </div>

          <div className="flex space-x-2">
             <button 
              onClick={() => setPaymentMethod('Cash')}
              className={`flex-1 py-3 rounded-xl flex flex-col items-center space-y-1 transition-all border-2 ${paymentMethod === 'Cash' ? 'bg-emerald-100 border-emerald-600 text-emerald-900' : 'bg-white border-stone-200 text-stone-400'}`}
             >
                <Banknote size={18} />
                <span className="text-[10px] font-bold uppercase">Cash</span>
             </button>
             <button 
              onClick={() => setPaymentMethod('Digital')}
              className={`flex-1 py-3 rounded-xl flex flex-col items-center space-y-1 transition-all border-2 ${paymentMethod === 'Digital' ? 'bg-emerald-100 border-emerald-600 text-emerald-900' : 'bg-white border-stone-200 text-stone-400'}`}
             >
                <CreditCard size={18} />
                <span className="text-[10px] font-bold uppercase">Digital</span>
             </button>
          </div>

          <button 
            disabled={cart.length === 0}
            onClick={handleCheckout}
            className={`w-full py-4 rounded-xl font-black text-white shadow-lg transition-all transform active:scale-95 flex items-center justify-center space-x-2 ${cart.length === 0 ? 'bg-stone-300 cursor-not-allowed' : 'bg-amber-600 hover:bg-amber-700'}`}
          >
            <Receipt size={20} />
            <span>Generate Bill</span>
          </button>
        </div>
      </div>

      {/* Receipt Modal */}
      {showReceipt && lastOrder && (
        <div className="fixed inset-0 z-[100] bg-emerald-950/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-3xl shadow-2xl overflow-hidden animate-slide-up">
            <div className="p-8 text-center bg-stone-50 border-b border-dashed border-stone-300">
              <CheckCircle2 className="mx-auto text-emerald-600 mb-4" size={48} />
              <h2 className="text-2xl font-black text-emerald-950">Payment Successful</h2>
              <p className="text-stone-500 text-sm mt-1">Thank you for choosing M.A Restaurant</p>
            </div>
            
            <div className="p-8 font-mono text-xs space-y-4">
              <div className="flex justify-between border-b border-stone-100 pb-2">
                <span>Order #</span>
                <span className="font-bold">{lastOrder.orderNumber}</span>
              </div>
              <div className="flex justify-between border-b border-stone-100 pb-2">
                <span>Date</span>
                <span>{new Date(lastOrder.timestamp).toLocaleString()}</span>
              </div>
              
              <div className="py-4 space-y-2">
                {lastOrder.items.map(item => (
                  <div key={item.id} className="flex justify-between">
                    <span>{item.name} x{item.quantity}</span>
                    <span>PKR {(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-dashed border-stone-300 pt-4 space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>PKR {lastOrder.subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>GST (16%)</span>
                  <span>PKR {lastOrder.tax.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-lg font-black pt-2">
                  <span>Total</span>
                  <span>PKR {lastOrder.total.toLocaleString()}</span>
                </div>
              </div>

              <div className="pt-4 text-center">
                <p className="uppercase font-bold tracking-widest text-emerald-600">Paid via {lastOrder.paymentMethod}</p>
              </div>
            </div>

            <div className="p-6 bg-stone-100 flex space-x-3">
              <button 
                onClick={() => window.print()} 
                className="flex-1 py-3 bg-emerald-900 text-white rounded-xl font-bold hover:bg-emerald-950 transition-all"
              >
                Print Receipt
              </button>
              <button 
                onClick={() => setShowReceipt(false)}
                className="flex-1 py-3 bg-white text-stone-900 border border-stone-200 rounded-xl font-bold hover:bg-stone-200 transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
