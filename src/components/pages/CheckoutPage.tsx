import React, { useState } from 'react';
import { ChevronRight, ArrowLeft, CheckCircle2, ShieldCheck, CreditCard, Smartphone, Truck } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { CONFIG } from '../../config';

export const CheckoutPage: React.FC = () => {
  const { cart, getCartSubtotal, clearCart, navigateTo } = useStore();
  const [isOrdered, setIsOrdered] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'bkash' | 'card'>('cod');

  const [formData, setFormData] = useState({
    firstName: 'Demo',
    lastName: 'Client',
    email: 'client@plexivia.com',
    phone: '01700000000',
    address: 'Road 12, Banani',
    city: 'Dhaka',
    postalCode: '1213',
  });

  const subtotal = getCartSubtotal();
  const shipping = subtotal >= 2000 || subtotal === 0 ? 0 : 120;
  const total = subtotal + shipping;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOrdered(true);
    clearCart();
  };

  if (isOrdered) {
    return (
      <div className="w-full py-16 sm:py-24 bg-[#0C1618]">
        <div className="max-w-lg mx-auto px-4 text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#97CC6F]/20 border border-[#97CC6F] flex items-center justify-center text-[#97CC6F]">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <span className="text-xs uppercase font-bold tracking-widest text-[#58C1C3]">
            Order Confirmed (Demo)
          </span>
          <h1 className="text-3xl font-black text-[#F5F7F7] mt-2 mb-4 font-['Space_Grotesk']">
            Thank You for Your Order!
          </h1>
          <p className="text-sm text-[#94AFB5] leading-relaxed mb-6">
            This is a functional demonstration order for <strong className="text-[#F5F7F7]">{formData.firstName} {formData.lastName}</strong>. In production, this trigger updates your inventory, notifies logistics, and sends automated customer SMS & email confirmations.
          </p>

          <div className="p-5 rounded-2xl bg-[#122225] border border-[#1E373D] text-left text-xs text-[#94AFB5] space-y-2 mb-8">
            <div className="flex justify-between">
              <span>Order Number:</span>
              <span className="text-[#F5F7F7] font-mono">PLX-84920</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Address:</span>
              <span className="text-[#F5F7F7]">{formData.address}, {formData.city}</span>
            </div>
            <div className="flex justify-between">
              <span>Payment:</span>
              <span className="text-[#58C1C3] uppercase font-semibold">{paymentMethod}</span>
            </div>
            <div className="flex justify-between border-t border-[#1E373D] pt-2 text-sm font-bold text-[#F5F7F7]">
              <span>Total Paid:</span>
              <span className="text-[#97CC6F]">{CONFIG.currencySymbol}{total.toLocaleString()}</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => navigateTo('shop')}
              className="px-6 py-3 rounded-xl bg-[#58C1C3] hover:bg-[#97CC6F] text-[#0C1618] font-bold text-sm transition-colors"
            >
              Continue Shopping
            </button>
            <button
              onClick={() => useStore.getState().setIsCalendarModalOpen(true)}
              className="px-6 py-3 rounded-xl bg-[#15272B] border border-[#1E373D] text-[#F5F7F7] hover:text-[#58C1C3] text-sm font-semibold transition-colors"
            >
              Book Development Demo
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full py-8 sm:py-12 bg-[#0C1618]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-[#94AFB5] mb-6" aria-label="Breadcrumb">
          <button onClick={() => navigateTo('home')} className="hover:text-[#58C1C3]">
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5" />
          <button onClick={() => navigateTo('shop')} className="hover:text-[#58C1C3]">
            Shop
          </button>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#F5F7F7] font-semibold">Checkout</span>
        </nav>

        <button
          onClick={() => navigateTo('shop')}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#58C1C3] hover:text-[#97CC6F] mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Shopping</span>
        </button>

        <h1 className="text-2xl sm:text-3xl font-black text-[#F5F7F7] mb-8 font-['Space_Grotesk']">
          Checkout & Shipping Details
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Shipping Details Form */}
          <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-6">
            <div className="bg-[#122225] border border-[#1E373D] rounded-2xl p-6 space-y-4">
              <h2 className="text-sm uppercase font-bold tracking-wider text-[#58C1C3]">
                1. Customer & Shipping Address
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#94AFB5] mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full bg-[#15272B] border border-[#1E373D] focus:border-[#58C1C3] focus:outline-none rounded-xl px-3.5 py-2.5 text-sm text-[#F5F7F7]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#94AFB5] mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full bg-[#15272B] border border-[#1E373D] focus:border-[#58C1C3] focus:outline-none rounded-xl px-3.5 py-2.5 text-sm text-[#F5F7F7]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#94AFB5] mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#15272B] border border-[#1E373D] focus:border-[#58C1C3] focus:outline-none rounded-xl px-3.5 py-2.5 text-sm text-[#F5F7F7]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#94AFB5] mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#15272B] border border-[#1E373D] focus:border-[#58C1C3] focus:outline-none rounded-xl px-3.5 py-2.5 text-sm text-[#F5F7F7]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#94AFB5] mb-1">
                  Street Address
                </label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full bg-[#15272B] border border-[#1E373D] focus:border-[#58C1C3] focus:outline-none rounded-xl px-3.5 py-2.5 text-sm text-[#F5F7F7]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#94AFB5] mb-1">
                    City / Town
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-[#15272B] border border-[#1E373D] focus:border-[#58C1C3] focus:outline-none rounded-xl px-3.5 py-2.5 text-sm text-[#F5F7F7]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#94AFB5] mb-1">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    className="w-full bg-[#15272B] border border-[#1E373D] focus:border-[#58C1C3] focus:outline-none rounded-xl px-3.5 py-2.5 text-sm text-[#F5F7F7]"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="bg-[#122225] border border-[#1E373D] rounded-2xl p-6 space-y-4">
              <h2 className="text-sm uppercase font-bold tracking-wider text-[#58C1C3]">
                2. Select Payment Method
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-4 rounded-xl border text-left flex flex-col justify-between gap-3 transition-all ${
                    paymentMethod === 'cod'
                      ? 'bg-[#58C1C3]/15 border-[#58C1C3] text-[#F5F7F7]'
                      : 'bg-[#15272B] border-[#1E373D] text-[#94AFB5]'
                  }`}
                >
                  <Truck className={`w-5 h-5 ${paymentMethod === 'cod' ? 'text-[#58C1C3]' : ''}`} />
                  <div>
                    <div className="text-xs font-bold">Cash on Delivery</div>
                    <div className="text-[11px] opacity-70">Pay when delivered</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('bkash')}
                  className={`p-4 rounded-xl border text-left flex flex-col justify-between gap-3 transition-all ${
                    paymentMethod === 'bkash'
                      ? 'bg-[#58C1C3]/15 border-[#58C1C3] text-[#F5F7F7]'
                      : 'bg-[#15272B] border-[#1E373D] text-[#94AFB5]'
                  }`}
                >
                  <Smartphone className={`w-5 h-5 ${paymentMethod === 'bkash' ? 'text-[#58C1C3]' : ''}`} />
                  <div>
                    <div className="text-xs font-bold">bKash / Nagad</div>
                    <div className="text-[11px] opacity-70">Mobile banking demo</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-4 rounded-xl border text-left flex flex-col justify-between gap-3 transition-all ${
                    paymentMethod === 'card'
                      ? 'bg-[#58C1C3]/15 border-[#58C1C3] text-[#F5F7F7]'
                      : 'bg-[#15272B] border-[#1E373D] text-[#94AFB5]'
                  }`}
                >
                  <CreditCard className={`w-5 h-5 ${paymentMethod === 'card' ? 'text-[#58C1C3]' : ''}`} />
                  <div>
                    <div className="text-xs font-bold">Credit / Debit Card</div>
                    <div className="text-[11px] opacity-70">Visa & Mastercard</div>
                  </div>
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={cart.length === 0}
              className="w-full py-4 bg-[#58C1C3] hover:bg-[#97CC6F] disabled:opacity-50 text-[#0C1618] font-bold text-base rounded-xl transition-all shadow-xl shadow-[#58C1C3]/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShieldCheck className="w-5 h-5" />
              <span>Place Order (Demo Mode)</span>
            </button>
          </form>

          {/* Order Summary on Right Column */}
          <div className="lg:col-span-5 bg-[#122225] border border-[#1E373D] rounded-2xl p-6 space-y-5">
            <h3 className="text-sm uppercase font-bold tracking-wider text-[#F5F7F7]">
              Order Summary ({cart.length} items)
            </h3>

            <div className="max-h-80 overflow-y-auto space-y-3 divide-y divide-[#1E373D]/50 pr-1">
              {cart.map(({ product, quantity }) => (
                <div key={product.id} className="pt-3 first:pt-0 flex items-center gap-3">
                  <div className="w-14 h-14 rounded-lg overflow-hidden bg-[#0C1618] flex-shrink-0">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-semibold text-[#F5F7F7] truncate">{product.name}</h4>
                    <span className="text-[11px] text-[#94AFB5]">Qty: {quantity} × {product.priceFormatted}</span>
                  </div>
                  <span className="text-xs font-bold text-[#58C1C3]">
                    {CONFIG.currencySymbol}{(product.price * quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-[#1E373D] space-y-2 text-xs text-[#94AFB5]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-[#F5F7F7] font-semibold">{CONFIG.currencySymbol}{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-[#97CC6F] font-semibold">
                  {shipping === 0 ? 'Free' : `${CONFIG.currencySymbol}${shipping}`}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-[#F5F7F7] pt-2 border-t border-[#1E373D]">
                <span>Total Due</span>
                <span className="text-[#58C1C3] text-base">{CONFIG.currencySymbol}{total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
