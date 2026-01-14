
import React, { useState } from 'react';
import { useRestaurant } from '../store/RestaurantContext';
import { Category } from '../types';
import { Filter, Search } from 'lucide-react';

export const Menu: React.FC = () => {
  const { menu } = useRestaurant();
  const [activeCategory, setActiveCategory] = useState<Category | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories: (Category | 'All')[] = ['All', 'Pakistani', 'Chinese', 'Desserts'];

  const filteredMenu = menu.filter(item => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-stone-50 min-h-screen">
      <div className="bg-emerald-950 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-black text-white mb-4">Our Culinary Map</h1>
          <p className="text-stone-300 max-w-2xl mx-auto font-light">
            Each dish is a chapter in our story. Discover the flavors of the East.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 pb-20">
        {/* Filters Bar */}
        <div className="bg-white p-4 rounded-2xl shadow-lg mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap ${
                  activeCategory === cat 
                  ? 'bg-amber-600 text-white shadow-md' 
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
            <input 
              type="text" 
              placeholder="Search dishes..."
              className="w-full pl-12 pr-4 py-3 bg-stone-100 border-none rounded-xl focus:ring-2 focus:ring-amber-500 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMenu.map(item => (
            <div key={item.id} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 group">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full font-bold text-emerald-900 shadow-lg">
                  PKR {item.price.toLocaleString()}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                  <p className="text-white text-sm italic font-light">"{item.description}"</p>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-stone-900">{item.name}</h3>
                  <span className="text-[10px] uppercase tracking-widest font-bold px-2 py-1 bg-stone-100 rounded text-stone-500">
                    {item.category}
                  </span>
                </div>
                <p className="text-stone-500 text-sm line-clamp-2 mb-4 font-light leading-relaxed">
                  {item.description}
                </p>
                <div className="flex items-center justify-between border-t border-stone-100 pt-4">
                    <div className="flex space-x-1">
                        {[1,2,3,4,5].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>)}
                    </div>
                    <button className="text-amber-600 font-bold text-xs uppercase tracking-widest hover:text-amber-700 transition-colors">
                        Add to Plate
                    </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredMenu.length === 0 && (
          <div className="text-center py-20">
            <h3 className="text-2xl font-bold text-stone-400">No dishes found matching your criteria.</h3>
          </div>
        )}
      </div>
    </div>
  );
};
