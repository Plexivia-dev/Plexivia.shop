import React from 'react';
import { PlexiviaLogo } from '../common/PlexiviaLogo';
import { DemoBookingButton } from '../common/DemoBookingButton';
import { WhatsAppButton } from '../common/WhatsAppButton';
import { useStore } from '../../store/useStore';
import { CATEGORIES } from '../../data/products';
import { PageView, ProductCategory } from '../../types';

export const Footer: React.FC = () => {
  const navigateTo = useStore((state) => state.navigateTo);

  const quickLinks: Array<{ label: string; page: PageView }> = [
    { label: 'Home', page: 'home' },
    { label: 'Shop All Products', page: 'shop' },
    { label: 'Offers & Discounts', page: 'offers' },
    { label: 'About Plexivia', page: 'about' },
    { label: 'Contact Us', page: 'contact' },
    { label: 'Your Wishlist', page: 'wishlist' },
  ];

  return (
    <footer className="w-full bg-[#0C1618] border-t border-[#1E373D] text-[#94AFB5] pt-12 pb-8">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* 4 Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 pb-12 border-b border-[#1E373D]/60 text-left">
          {/* COLUMN 1: Plexivia logo + brand positioning */}
          <div className="space-y-4">
            <PlexiviaLogo size="md" showTagline={true} onClick={() => navigateTo('home')} />
            <p className="text-xs leading-relaxed text-[#94AFB5] pt-2">
              Plexivia is a digital development agency crafting modern web applications, e-commerce storefronts, and bespoke digital experiences for forward-thinking brands.
            </p>
          </div>

          {/* COLUMN 2: Quick Links */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-bold text-[#F5F7F7] mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs">
              {quickLinks.map(({ label, page }) => (
                <li key={page}>
                  <button
                    onClick={() => navigateTo(page)}
                    className="hover:text-[#58C1C3] transition-colors cursor-pointer"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 3: Categories */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-bold text-[#F5F7F7] mb-4">
              Categories
            </h4>
            <ul className="space-y-2 text-xs">
              {CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => navigateTo('shop', undefined, cat.id)}
                    className="hover:text-[#58C1C3] transition-colors cursor-pointer"
                  >
                    {cat.name} ({cat.itemCount} items)
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 4: Direct CTA Block */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-bold text-[#F5F7F7] mb-4">
              Connect With Plexivia
            </h4>
            <p className="text-xs text-[#94AFB5] mb-2">
              Interested in building a high-converting website or e-commerce solution?
            </p>
            <div className="flex flex-col gap-2.5">
              <DemoBookingButton size="sm" variant="primary" />
              <WhatsAppButton size="sm" variant="pill" />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-center sm:text-left gap-3 text-xs text-[#94AFB5]">
          <div>
            © {new Date().getFullYear()} PLEXIVIA. All rights reserved.
          </div>
          <div className="text-[11px] font-medium text-[#58C1C3]">
            PLEXIVIA – Crafting Digital Dreams
          </div>
        </div>
      </div>
    </footer>
  );
};
