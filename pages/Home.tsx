
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Star, Clock, Award } from 'lucide-react';

export const Home: React.FC = () => {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2000" 
            className="w-full h-full object-cover brightness-50"
            alt="Hero Background"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/80 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="inline-block px-4 py-1 bg-amber-600 text-white text-xs font-bold uppercase tracking-widest rounded-full mb-6 animate-fade-in">
              Award Winning Dining
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
              A Symphony of <span className="text-amber-500">Spices</span> & Heritage
            </h1>
            <p className="text-lg text-stone-200 mb-10 leading-relaxed font-light">
              Lahore's most celebrated culinary destination. We invite you to experience the authentic taste of 
              Pakistani heritage, reimagined for the modern palate.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link 
                to="/menu" 
                className="px-8 py-4 bg-amber-600 text-white font-bold rounded-lg hover:bg-amber-700 transition-all flex items-center justify-center space-x-2"
              >
                <span>View Menu</span>
                <ChevronRight size={20} />
              </Link>
              <Link 
                to="/pos" 
                className="px-8 py-4 bg-white/10 backdrop-blur-md text-white border border-white/30 font-bold rounded-lg hover:bg-white/20 transition-all"
              >
                Order Online
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="p-8 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-shadow group">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-900 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Star size={32} />
              </div>
              <h3 className="text-xl font-bold mb-4">Finest Ingredients</h3>
              <p className="text-stone-500 font-light">We source our spices directly from traditional organic farms across the region.</p>
            </div>
            <div className="p-8 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-shadow group">
              <div className="w-16 h-16 bg-amber-100 text-amber-900 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Clock size={32} />
              </div>
              <h3 className="text-xl font-bold mb-4">Master Chefs</h3>
              <p className="text-stone-500 font-light">Our kitchen is led by award-winning chefs with decades of experience in Mughlai cuisine.</p>
            </div>
            <div className="p-8 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-shadow group">
              <div className="w-16 h-16 bg-red-100 text-red-900 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Award size={32} />
              </div>
              <h3 className="text-xl font-bold mb-4">Royal Ambience</h3>
              <p className="text-stone-500 font-light">Dine in a setting that reflects the opulence of the Mughal courts.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Signature Dish Highlight */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="w-full md:w-1/2 relative">
               <div className="absolute -top-6 -left-6 w-32 h-32 bg-amber-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
               <img 
                src="https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=800" 
                className="rounded-3xl shadow-2xl relative z-10"
                alt="Signature Biryani"
               />
            </div>
            <div className="w-full md:w-1/2">
              <span className="text-amber-600 font-bold uppercase tracking-widest text-sm">Chef's Special</span>
              <h2 className="text-4xl md:text-5xl font-black mt-4 mb-8">The Royal Chicken Karahi</h2>
              <p className="text-lg text-stone-600 mb-8 leading-relaxed">
                Hand-picked spices, farm-fresh tomatoes, and tender chicken cooked to perfection in a cast-iron wok. 
                A dish that has defined our legacy for over two decades.
              </p>
              <ul className="space-y-4 mb-10">
                <li className="flex items-center space-x-3 text-emerald-900 font-medium">
                  <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                  <span>Authentic Desi Ghee preparation</span>
                </li>
                <li className="flex items-center space-x-3 text-emerald-900 font-medium">
                  <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                  <span>Fresh Ginger and Coriander Garnish</span>
                </li>
                <li className="flex items-center space-x-3 text-emerald-900 font-medium">
                  <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                  <span>Slow-cooked for maximum flavor</span>
                </li>
              </ul>
              <Link to="/menu" className="inline-block px-10 py-4 bg-emerald-900 text-white rounded-lg font-bold hover:bg-emerald-950 transition-colors">
                Explore More Dishes
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
