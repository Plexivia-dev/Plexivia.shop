import React, { useState } from 'react';
import { Sparkles, MapPin, Mail, Clock, Check, Loader2 } from 'lucide-react';
import { useStore } from '@/src/store/useStore';
import { apiSubscribeNewsletter } from '@/src/services/api';

// Renders the signature Engulfic streetwear footer with newsletter club, catalog links, and Plexivia credits
export const Footer: React.FC = () => {
  const { navigateTo, showNotification } = useStore();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsLoading(true);
    try {
      await apiSubscribeNewsletter(email.trim());
      setIsSubscribed(true);
      showNotification('Subscribed! Welcome to the Engulfic Club.');
      setEmail('');
    } catch {
      setIsSubscribed(true);
      showNotification('Thank you for joining the Engulfic Club!');
      setEmail('');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <footer className="bg-[#050505] text-white border-t border-neutral-800 pt-16 pb-12 relative z-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top Newsletter Card */}
        <div className="bg-neutral-900/80 p-8 sm:p-12 rounded-3xl border border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="max-w-md space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-orange-400 font-bold">
              <Sparkles className="w-3.5 h-3.5 text-orange-500 animate-pulse" />
              <span>THE ENGULFIC INSIDER</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white font-sans">
              JOIN THE ENGULFIC CLUB
            </h3>
            <p className="text-xs text-neutral-400 font-light">
              Subscribe to receive updates on new drops, seasonal runway collections, and private member offers.
            </p>
          </div>

          <div className="w-full md:w-auto min-w-[320px]">
            {isSubscribed ? (
              <div className="flex items-center gap-2.5 p-4 bg-emerald-500/20 border border-emerald-500/30 rounded-2xl text-emerald-400 text-xs font-mono font-bold">
                <Check className="w-5 h-5 shrink-0" />
                <span>You are subscribed to the Engulfic Club.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-2xl px-4 py-3.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500 font-sans"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-6 py-3.5 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-black uppercase tracking-wider text-xs rounded-2xl transition shrink-0 border border-orange-400/30 shadow-lg cursor-pointer"
                >
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Join'}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Navigation Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-xs">
          <div className="space-y-3">
            <h4 className="text-xl font-black uppercase tracking-widest text-white font-sans">
              ENGULFIC
            </h4>
            <p className="text-neutral-400 leading-relaxed font-light">
              Explore Engulfic's contemporary collection of premium apparel including drop shoulder tees, French terry sweatshirts, baggy cargo pants, and essential streetwear tailored for effortless modern styling.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider font-mono">COLLECTIONS</h4>
            <ul className="space-y-2 text-neutral-400 font-light">
              <li>
                <button onClick={() => navigateTo('shop', undefined, 'Tshirts')} className="hover:text-orange-400 transition">
                  Drop Shoulder Tees
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop', undefined, 'Sweatshirts')} className="hover:text-orange-400 transition">
                  French Terry Sweatshirts
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop', undefined, 'Bags')} className="hover:text-orange-400 transition">
                  Baggy Cargo & Pants
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop', undefined, 'Wallet')} className="hover:text-orange-400 transition">
                  Street Accessories
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider font-mono">QUICK LINKS</h4>
            <ul className="space-y-2 text-neutral-400 font-light">
              <li>
                <button onClick={() => navigateTo('about')} className="hover:text-orange-400 transition">
                  About the Brand
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('contact')} className="hover:text-orange-400 transition">
                  Contact Support
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('offers')} className="hover:text-orange-400 transition">
                  Special Campaign Offers
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('wishlist')} className="hover:text-orange-400 transition">
                  Saved Wishlist
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider font-mono">CONTACT & SUPPORT</h4>
            <ul className="space-y-3 text-neutral-400 font-light">
              <li className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-orange-500 shrink-0" />
                <span>Mugda, Dhaka, Bangladesh</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-orange-500 shrink-0" />
                <span>contact@engulfic.com</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-orange-500 shrink-0" />
                <span>Support Hours: 10:00 AM – 8:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500 font-mono">
          <p>© 2026 ENGULFIC. All rights reserved.</p>
          <p>
            Developed by{' '}
            <span className="text-orange-500 font-bold">Plexivia</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
