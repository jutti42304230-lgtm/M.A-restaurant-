
import React from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export const Contact: React.FC = () => {
  return (
    <div className="bg-stone-50 min-h-screen">
      <div className="bg-emerald-950 py-24 text-center">
        <h1 className="text-5xl font-black text-white mb-4">Visit Our Courts</h1>
        <p className="text-stone-300 font-light">Elegance in every location. Tradition in every corner.</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Info Side */}
          <div className="space-y-12">
            <div>
                <h2 className="text-3xl font-black text-emerald-950 mb-8 uppercase tracking-tighter">Reach Out To Us</h2>
                <p className="text-stone-600 leading-relaxed font-light mb-10">
                    Whether you're looking for a private dining experience, catering for a royal wedding, 
                    or simply wish to share your feedback, our team is at your service.
                </p>
                <div className="space-y-6">
                    <div className="flex items-start space-x-6 p-6 bg-white rounded-3xl shadow-sm border border-stone-200 hover:shadow-lg transition-all">
                        <div className="w-12 h-12 bg-amber-100 text-amber-900 rounded-2xl flex items-center justify-center shrink-0"><MapPin /></div>
                        <div>
                            <h4 className="font-bold text-stone-900">Flagship Location</h4>
                            <p className="text-sm text-stone-500">M.M. Alam Road, Gulberg III, Lahore</p>
                        </div>
                    </div>
                    <div className="flex items-start space-x-6 p-6 bg-white rounded-3xl shadow-sm border border-stone-200 hover:shadow-lg transition-all">
                        <div className="w-12 h-12 bg-emerald-100 text-emerald-900 rounded-2xl flex items-center justify-center shrink-0"><Phone /></div>
                        <div>
                            <h4 className="font-bold text-stone-900">Reservations</h4>
                            <p className="text-sm text-stone-500">+92 42 111-ZAUQ-11</p>
                        </div>
                    </div>
                    <div className="flex items-start space-x-6 p-6 bg-white rounded-3xl shadow-sm border border-stone-200 hover:shadow-lg transition-all">
                        <div className="w-12 h-12 bg-red-100 text-red-900 rounded-2xl flex items-center justify-center shrink-0"><Clock /></div>
                        <div>
                            <h4 className="font-bold text-stone-900">Opening Hours</h4>
                            <p className="text-sm text-stone-500">Mon - Sun: 12:00 PM to 01:00 AM</p>
                        </div>
                    </div>
                </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="bg-white p-10 rounded-[3rem] shadow-2xl border border-stone-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <h3 className="text-2xl font-black text-emerald-950 mb-8 uppercase tracking-tighter">Event Inquiry</h3>
            <form className="space-y-6">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                     <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Your Name</label>
                     <input type="text" className="w-full px-4 py-3 bg-stone-100 rounded-xl border-none focus:ring-2 focus:ring-amber-500" placeholder="Ali Ahmed" />
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Phone Number</label>
                     <input type="tel" className="w-full px-4 py-3 bg-stone-100 rounded-xl border-none focus:ring-2 focus:ring-amber-500" placeholder="+92 300 1234567" />
                  </div>
               </div>
               <div className="space-y-2">
                  <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Email Address</label>
                  <input type="email" className="w-full px-4 py-3 bg-stone-100 rounded-xl border-none focus:ring-2 focus:ring-amber-500" placeholder="ali@example.com" />
               </div>
               <div className="space-y-2">
                  <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Message</label>
                  <textarea rows={4} className="w-full px-4 py-3 bg-stone-100 rounded-xl border-none focus:ring-2 focus:ring-amber-500" placeholder="Tell us about your requirements..."></textarea>
               </div>
               <button type="submit" className="w-full py-4 bg-amber-600 text-white font-black rounded-xl hover:bg-amber-700 transition-all shadow-lg transform active:scale-95 uppercase tracking-widest">
                  Send Message
               </button>
            </form>
          </div>
        </div>
      </div>

      {/* Map Placeholder */}
      <section className="h-96 w-full bg-stone-200 relative">
        <div className="absolute inset-0 grayscale opacity-50">
            <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2000" className="w-full h-full object-cover" alt="Map View" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white p-4 rounded-2xl shadow-2xl flex items-center space-x-3 border-2 border-amber-600 animate-bounce">
                <MapPin className="text-amber-600" />
                <span className="font-bold text-stone-900">Find M.A Restaurant Here</span>
            </div>
        </div>
      </section>
    </div>
  );
};
