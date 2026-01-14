
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag, User, LayoutDashboard, Utensils, Home, MapPin } from 'lucide-react';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/', icon: <Home size={18} /> },
    { name: 'Menu', path: '/menu', icon: <Utensils size={18} /> },
    { name: 'Order/POS', path: '/pos', icon: <ShoppingBag size={18} /> },
    { name: 'Dashboard', path: '/admin', icon: <LayoutDashboard size={18} /> },
    { name: 'Contact', path: '/contact', icon: <MapPin size={18} /> },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="bg-emerald-950 text-white sticky top-0 z-50 shadow-xl border-b border-amber-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex items-center">
              <Link to="/" className="flex flex-col items-center">
                <span className="text-2xl font-black text-amber-500 tracking-tighter leading-none">M.A RESTAURANT</span>
                <span className="text-[10px] tracking-[0.2em] font-medium text-stone-300 uppercase">Premium Pakistani Cuisine</span>
              </Link>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center space-x-2 text-sm font-medium transition-colors hover:text-amber-500 ${
                    location.pathname === link.path ? 'text-amber-500' : 'text-stone-300'
                  }`}
                >
                  {link.icon}
                  <span>{link.name}</span>
                </Link>
              ))}
              <Link to="/admin" className="p-2 bg-amber-600 rounded-full hover:bg-amber-700 transition-all transform hover:scale-110">
                <User size={18} />
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-stone-300 hover:text-white"
              >
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <div className="md:hidden bg-emerald-900 border-t border-emerald-800">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-4 rounded-md text-base font-medium text-stone-300 hover:text-white hover:bg-emerald-800"
                >
                  <div className="flex items-center space-x-3">
                    {link.icon}
                    <span>{link.name}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-300 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold text-white mb-6">M.A RESTAURANT</h3>
            <p className="max-w-md text-stone-400 leading-relaxed">
              Experience the pinnacle of Pakistani culinary excellence. Our chefs use centuries-old recipes 
              combined with the finest local ingredients to bring you a taste of royalty in every bite.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-6 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-4">
              <li><Link to="/menu" className="hover:text-amber-500 transition-colors">The Menu</Link></li>
              <li><Link to="/contact" className="hover:text-amber-500 transition-colors">Locations</Link></li>
              <li><Link to="/pos" className="hover:text-amber-500 transition-colors">Reservation</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-6 uppercase tracking-wider">Contact Us</h4>
            <ul className="space-y-4 text-stone-400">
              <li>Gulberg III, Lahore, Pakistan</li>
              <li>+92 42 111-ZAUQ-11</li>
              <li>info@marestaurant.pk</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-stone-800 mt-16 pt-8 text-center text-sm text-stone-500">
          © {new Date().getFullYear()} M.A Restaurant Group. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
};
