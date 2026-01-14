
import React, { useState } from 'react';
import { useRestaurant } from '../../store/RestaurantContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Package, DollarSign, List, PlusCircle, AlertCircle } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { menu, inventory, orders, salesHistory } = useRestaurant();
  const [activeTab, setActiveTab] = useState<'overview' | 'inventory' | 'menu' | 'sales'>('overview');

  // Calc Stats
  const totalRevenue = salesHistory.reduce((acc, o) => acc + o.total, 0);
  const totalOrders = salesHistory.length;
  const lowStockItems = inventory.filter(i => i.stock <= i.minStock);

  // Chart Data Simulation
  const chartData = [
    { name: 'Mon', sales: 4000, profit: 2400 },
    { name: 'Tue', sales: 3000, profit: 1398 },
    { name: 'Wed', sales: 2000, profit: 9800 },
    { name: 'Thu', sales: 2780, profit: 3908 },
    { name: 'Fri', sales: 1890, profit: 4800 },
    { name: 'Sat', sales: 2390, profit: 3800 },
    { name: 'Sun', sales: 3490, profit: 4300 },
  ];

  const pieData = [
    { name: 'Pakistani', value: 400 },
    { name: 'Chinese', value: 300 },
    { name: 'Desserts', value: 150 },
  ];

  const COLORS = ['#065f46', '#b45309', '#7f1d1d'];

  return (
    <div className="min-h-screen bg-stone-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-emerald-950 text-white flex flex-shrink-0 flex-col">
        <div className="p-8 text-center border-b border-emerald-900">
           <h1 className="text-xl font-black text-amber-500 tracking-tighter">M.A ADMIN</h1>
           <p className="text-[10px] text-stone-400 mt-1 uppercase tracking-widest">Management Suite</p>
        </div>
        <nav className="flex-grow p-4 space-y-2">
          {[
            { id: 'overview', icon: <TrendingUp size={18} />, label: 'Sales Overview' },
            { id: 'menu', icon: <List size={18} />, label: 'Menu Management' },
            { id: 'inventory', icon: <Package size={18} />, label: 'Inventory Control' },
            { id: 'sales', icon: <DollarSign size={18} />, label: 'Order History' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${activeTab === tab.id ? 'bg-amber-600 text-white shadow-lg' : 'text-emerald-300 hover:bg-emerald-900'}`}
            >
              {tab.icon}
              <span className="text-sm font-medium">{tab.label}</span>
            </button>
          ))}
        </nav>
        <div className="p-6 bg-emerald-900/50">
            <div className="flex items-center space-x-2 text-stone-400 text-xs mb-3">
                <AlertCircle size={14} />
                <span>Quick Alerts</span>
            </div>
            {lowStockItems.length > 0 && (
                <div className="p-3 bg-red-900/40 border border-red-500/50 rounded-lg text-[10px] text-red-200">
                    {lowStockItems.length} items are low on stock!
                </div>
            )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-grow p-8 overflow-y-auto">
        <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-black text-emerald-950 uppercase tracking-tighter">
                {activeTab === 'overview' && 'Executive Summary'}
                {activeTab === 'menu' && 'Digital Menu Vault'}
                {activeTab === 'inventory' && 'Warehouse & Stock'}
                {activeTab === 'sales' && 'Sales Audit Trail'}
            </h2>
            <div className="flex items-center space-x-4">
                <span className="text-xs font-bold text-stone-400">Terminal: Gulberg Main</span>
                <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold">AZ</div>
            </div>
        </div>

        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
               <div className="bg-white p-6 rounded-3xl shadow-sm border border-stone-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-emerald-100 text-emerald-900 rounded-2xl flex items-center justify-center"><DollarSign size={24}/></div>
                    <span className="text-emerald-500 text-xs font-bold">+12.5%</span>
                  </div>
                  <p className="text-stone-400 text-xs uppercase font-bold tracking-widest mb-1">Total Revenue</p>
                  <h4 className="text-2xl font-black text-stone-900">PKR {totalRevenue.toLocaleString()}</h4>
               </div>
               <div className="bg-white p-6 rounded-3xl shadow-sm border border-stone-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-amber-100 text-amber-900 rounded-2xl flex items-center justify-center"><List size={24}/></div>
                    <span className="text-amber-500 text-xs font-bold">+4.1%</span>
                  </div>
                  <p className="text-stone-400 text-xs uppercase font-bold tracking-widest mb-1">Total Orders</p>
                  <h4 className="text-2xl font-black text-stone-900">{totalOrders}</h4>
               </div>
               <div className="bg-white p-6 rounded-3xl shadow-sm border border-stone-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-red-100 text-red-900 rounded-2xl flex items-center justify-center"><Package size={24}/></div>
                    <span className="text-red-500 text-xs font-bold">{lowStockItems.length} Critical</span>
                  </div>
                  <p className="text-stone-400 text-xs uppercase font-bold tracking-widest mb-1">Inventory Status</p>
                  <h4 className="text-2xl font-black text-stone-900">92% Healthy</h4>
               </div>
               <div className="bg-white p-6 rounded-3xl shadow-sm border border-stone-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-blue-100 text-blue-900 rounded-2xl flex items-center justify-center"><TrendingUp size={24}/></div>
                    <span className="text-blue-500 text-xs font-bold">Excellent</span>
                  </div>
                  <p className="text-stone-400 text-xs uppercase font-bold tracking-widest mb-1">Net Margin</p>
                  <h4 className="text-2xl font-black text-stone-900">38.4%</h4>
               </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-sm border border-stone-200">
                    <h3 className="text-xl font-bold mb-6 flex items-center space-x-2">
                        <span>Revenue Trends</span>
                        <div className="w-2 h-2 rounded-full bg-amber-500 animate-ping"></div>
                    </h3>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData}>
                                <defs>
                                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#b45309" stopOpacity={0.1}/>
                                    <stop offset="95%" stopColor="#b45309" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f1f1" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#888'}} />
                                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#888'}} />
                                <Tooltip contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}} />
                                <Area type="monotone" dataKey="sales" stroke="#b45309" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-stone-200">
                    <h3 className="text-xl font-bold mb-6">Sales by Category</h3>
                    <div className="h-[250px] flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="space-y-2 mt-4">
                        {pieData.map((d, i) => (
                            <div key={d.name} className="flex items-center justify-between text-xs">
                                <div className="flex items-center space-x-2">
                                    <div className="w-3 h-3 rounded-full" style={{backgroundColor: COLORS[i]}}></div>
                                    <span className="text-stone-500 font-medium">{d.name}</span>
                                </div>
                                <span className="font-bold text-stone-900">{d.value} Units</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
          </div>
        )}

        {activeTab === 'menu' && (
          <div className="bg-white rounded-3xl shadow-sm border border-stone-200 overflow-hidden">
            <div className="p-6 border-b border-stone-100 flex justify-between items-center bg-stone-50">
               <h3 className="font-bold text-emerald-900">Current Catalog</h3>
               <button className="flex items-center space-x-2 px-4 py-2 bg-emerald-900 text-white rounded-xl text-sm font-bold hover:bg-emerald-950 transition-all">
                  <PlusCircle size={16} />
                  <span>Add New Item</span>
               </button>
            </div>
            <table className="w-full">
               <thead className="bg-stone-50 text-[10px] uppercase font-bold text-stone-400 tracking-widest text-left">
                  <tr>
                    <th className="px-6 py-4">Dish</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Price</th>
                    <th className="px-6 py-4">Status</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-stone-100">
                  {menu.map(item => (
                    <tr key={item.id} className="hover:bg-stone-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <img src={item.image} className="w-10 h-10 rounded-lg object-cover" />
                          <span className="text-sm font-bold text-stone-800">{item.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                         <span className="px-2 py-1 bg-stone-100 text-stone-500 rounded text-[10px] font-bold uppercase tracking-widest">{item.category}</span>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium">PKR {item.price}</td>
                      <td className="px-6 py-4">
                         <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block mr-2"></span>
                         <span className="text-xs text-stone-500">Live</span>
                      </td>
                    </tr>
                  ))}
               </tbody>
            </table>
          </div>
        )}

        {activeTab === 'inventory' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {inventory.map(item => (
              <div key={item.id} className="bg-white p-6 rounded-3xl shadow-sm border border-stone-200 relative overflow-hidden">
                 {item.stock <= item.minStock && (
                   <div className="absolute top-0 right-0 p-2 bg-red-500 text-white text-[8px] font-bold uppercase transform translate-x-1 translate-y-1 rotate-45 w-24 text-center">
                     Critical
                   </div>
                 )}
                 <h4 className="text-lg font-black text-stone-900 mb-1">{item.name}</h4>
                 <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest mb-6">Supplier: {item.supplier}</p>
                 
                 <div className="flex items-end justify-between mb-4">
                    <div>
                        <span className="text-4xl font-black text-emerald-950">{item.stock}</span>
                        <span className="text-stone-400 font-bold ml-1">{item.unit}</span>
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] font-bold text-stone-400 uppercase">Min Alert</p>
                        <p className="text-sm font-bold text-amber-600">{item.minStock} {item.unit}</p>
                    </div>
                 </div>

                 <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                    <div 
                        className={`h-full transition-all duration-1000 ${item.stock <= item.minStock ? 'bg-red-500' : 'bg-emerald-500'}`}
                        style={{width: `${Math.min(100, (item.stock / (item.minStock * 4)) * 100)}%`}}
                    ></div>
                 </div>
                 
                 <div className="mt-6 flex space-x-2">
                    <button className="flex-1 py-2 bg-stone-900 text-white text-xs font-bold rounded-lg hover:bg-stone-800 transition-all">Refill Stock</button>
                    <button className="p-2 bg-stone-100 text-stone-600 rounded-lg hover:bg-stone-200 transition-all"><List size={14}/></button>
                 </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'sales' && (
           <div className="bg-white rounded-3xl shadow-sm border border-stone-200 overflow-hidden">
             <table className="w-full">
               <thead className="bg-stone-50 text-[10px] uppercase font-bold text-stone-400 tracking-widest text-left">
                  <tr>
                    <th className="px-6 py-4">Order ID</th>
                    <th className="px-6 py-4">Items</th>
                    <th className="px-6 py-4">Total Bill</th>
                    <th className="px-6 py-4">Method</th>
                    <th className="px-6 py-4">Date/Time</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-stone-100">
                  {salesHistory.length > 0 ? salesHistory.map(order => (
                    <tr key={order.id} className="hover:bg-stone-50 transition-colors">
                      <td className="px-6 py-4 text-sm font-bold text-emerald-900">#{order.orderNumber}</td>
                      <td className="px-6 py-4 text-xs text-stone-500">
                        {order.items.map(i => `${i.name} (${i.quantity})`).join(', ')}
                      </td>
                      <td className="px-6 py-4 text-sm font-black">PKR {order.total.toLocaleString()}</td>
                      <td className="px-6 py-4">
                         <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest ${order.paymentMethod === 'Cash' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
                            {order.paymentMethod}
                         </span>
                      </td>
                      <td className="px-6 py-4 text-xs text-stone-400">{new Date(order.timestamp).toLocaleString()}</td>
                    </tr>
                  )) : (
                    <tr>
                        <td colSpan={5} className="p-20 text-center text-stone-400 font-bold uppercase tracking-widest">No transactions recorded yet</td>
                    </tr>
                  )}
               </tbody>
             </table>
           </div>
        )}
      </div>
    </div>
  );
};
