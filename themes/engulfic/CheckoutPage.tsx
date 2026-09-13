import React, { useState } from 'react';
import {
  ShieldCheck,
  Truck,
  Lock,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import { useStore, CheckoutFormData } from '@/src/store/useStore';

// Renders the Engulfic checkout page with district delivery logic, payment selection, and order placement
export const CheckoutPage: React.FC = () => {
  const { cart, getCartSubtotal, submitOrder, isPlacingOrder, navigateTo } = useStore();

  const [formData, setFormData] = useState<CheckoutFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: 'Dhaka',
    postalCode: '1200',
    paymentMethod: 'cod',
    notes: '',
  });

  const [deliveryZone, setDeliveryZone] = useState<'inside' | 'suburbs' | 'outside'>('inside');
  const [orderCompleted, setOrderCompleted] = useState<{ orderId: string } | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const subtotal = getCartSubtotal();
  const freeShipping = subtotal >= 2000;

  const shippingCost = freeShipping
    ? 0
    : deliveryZone === 'inside'
    ? 70
    : deliveryZone === 'suburbs'
    ? 100
    : 120;

  const total = subtotal + shippingCost;

  const districts = [
    'Dhaka', 'Chattogram', 'Gazipur', 'Narayanganj', 'Sylhet', 'Rajshahi',
    'Khulna', 'Barishal', 'Cumilla', 'Bogra', 'Mymensingh', "Cox's Bazar"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.phone || !formData.address) {
      setErrorMessage('Please fill in your name, phone number, and delivery address.');
      return;
    }

    setErrorMessage('');
    try {
      const result = await submitOrder(formData);
      if (result.success) {
        setOrderCompleted({ orderId: result.orderId || 'ENG-99214' });
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to place order. Please try again.');
    }
  };

  if (orderCompleted) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center py-16 px-4">
        <div className="max-w-md w-full bg-neutral-900 border border-neutral-800 rounded-3xl p-8 text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-black uppercase tracking-tight font-sans">
              ORDER CONFIRMED
            </h2>
            <p className="text-xs text-neutral-400 font-mono">
              Order #{orderCompleted.orderId}
            </p>
          </div>

          <p className="text-xs text-neutral-300 leading-relaxed font-light">
            Thank you for shopping with Engulfic. Our team will verify your phone number and dispatch your garments shortly.
          </p>

          <button
            onClick={() => navigateTo('home')}
            className="w-full py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-black uppercase tracking-wider text-xs rounded-xl transition cursor-pointer"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center py-20 px-4 space-y-4">
        <h2 className="text-xl font-black uppercase font-sans">Your Cart is Empty</h2>
        <p className="text-xs text-neutral-400 font-mono">Select garments before heading to checkout.</p>
        <button
          onClick={() => navigateTo('shop')}
          className="px-6 py-3 bg-orange-500 text-white text-xs font-black uppercase tracking-wider rounded-xl cursor-pointer"
        >
          Browse Catalog
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="border-b border-neutral-800 pb-4">
          <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight font-sans">
            EXPRESS CHECKOUT
          </h1>
          <p className="text-xs font-mono text-neutral-400 mt-1">
            Complete your shipping details to confirm your streetwear delivery.
          </p>
        </div>

        {errorMessage && (
          <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-2xl text-red-400 text-xs font-mono flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Delivery & Shipping Fields */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-6 sm:p-8 bg-neutral-900/90 border border-neutral-800 rounded-3xl space-y-5">
              <h3 className="text-sm font-black uppercase tracking-wider font-mono text-orange-400">
                1. Delivery Contact & Address
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-neutral-300">First Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="E.g. Tanvir"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-neutral-300">Last Name</label>
                  <input
                    type="text"
                    placeholder="E.g. Rahman"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-neutral-300">Mobile Phone *</label>
                  <input
                    type="tel"
                    required
                    placeholder="01XXXXXXXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-neutral-300">Email Address</label>
                  <input
                    type="email"
                    placeholder="you@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-neutral-300">District / City *</label>
                <select
                  value={formData.city}
                  onChange={(e) => {
                    const c = e.target.value;
                    setFormData({ ...formData, city: c });
                    if (c === 'Dhaka') setDeliveryZone('inside');
                    else if (c === 'Gazipur' || c === 'Narayanganj') setDeliveryZone('suburbs');
                    else setDeliveryZone('outside');
                  }}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-orange-500 cursor-pointer font-mono"
                >
                  {districts.map((d) => (
                    <option key={d} value={d} className="bg-neutral-900 text-white">
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-neutral-300">Street Delivery Address *</label>
                <textarea
                  required
                  rows={2}
                  placeholder="House, Road, Area / Thana"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500 resize-none"
                />
              </div>
            </div>

            {/* Delivery Zone Options */}
            <div className="p-6 sm:p-8 bg-neutral-900/90 border border-neutral-800 rounded-3xl space-y-4">
              <h3 className="text-sm font-black uppercase tracking-wider font-mono text-orange-400">
                2. Shipping Zone & Fee
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div
                  onClick={() => setDeliveryZone('inside')}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition flex flex-col justify-between ${
                    deliveryZone === 'inside'
                      ? 'border-orange-500 bg-orange-500/10 text-white'
                      : 'border-neutral-800 bg-neutral-950 text-neutral-400'
                  }`}
                >
                  <span className="text-xs font-bold uppercase">Inside Dhaka</span>
                  <span className="text-sm font-mono font-black mt-2 text-orange-400">
                    {freeShipping ? 'FREE' : '৳ 70'}
                  </span>
                </div>

                <div
                  onClick={() => setDeliveryZone('suburbs')}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition flex flex-col justify-between ${
                    deliveryZone === 'suburbs'
                      ? 'border-orange-500 bg-orange-500/10 text-white'
                      : 'border-neutral-800 bg-neutral-950 text-neutral-400'
                  }`}
                >
                  <span className="text-xs font-bold uppercase">Dhaka Suburbs</span>
                  <span className="text-sm font-mono font-black mt-2 text-orange-400">
                    {freeShipping ? 'FREE' : '৳ 100'}
                  </span>
                </div>

                <div
                  onClick={() => setDeliveryZone('outside')}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition flex flex-col justify-between ${
                    deliveryZone === 'outside'
                      ? 'border-orange-500 bg-orange-500/10 text-white'
                      : 'border-neutral-800 bg-neutral-950 text-neutral-400'
                  }`}
                >
                  <span className="text-xs font-bold uppercase">Outside Dhaka</span>
                  <span className="text-sm font-mono font-black mt-2 text-orange-400">
                    {freeShipping ? 'FREE' : '৳ 120'}
                  </span>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="p-6 sm:p-8 bg-neutral-900/90 border border-neutral-800 rounded-3xl space-y-4">
              <h3 className="text-sm font-black uppercase tracking-wider font-mono text-orange-400">
                3. Payment Method
              </h3>

              <div className="space-y-2.5">
                {[
                  { id: 'cod', title: 'Cash on Delivery (COD)', desc: 'Pay with cash upon receiving your garments.' },
                  { id: 'bkash', title: 'bKash / Nagad Instant Mobile Pay', desc: 'Secure mobile banking transfer.' },
                ].map((pm) => (
                  <label
                    key={pm.id}
                    className={`flex items-start gap-3.5 p-4 rounded-2xl border cursor-pointer transition ${
                      formData.paymentMethod === pm.id
                        ? 'border-orange-500 bg-orange-500/10'
                        : 'border-neutral-800 bg-neutral-950 hover:bg-neutral-900'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={pm.id}
                      checked={formData.paymentMethod === pm.id}
                      onChange={() => setFormData({ ...formData, paymentMethod: pm.id })}
                      className="mt-0.5 text-orange-500"
                    />
                    <div>
                      <p className="text-xs font-bold text-white uppercase">{pm.title}</p>
                      <p className="text-[10px] text-neutral-400 font-mono mt-0.5">{pm.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary & Place Order */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 bg-neutral-900/90 border border-neutral-800 rounded-3xl space-y-5 sticky top-24">
              <h3 className="text-sm font-black uppercase tracking-wider font-mono text-white">
                Garments Summary ({cart.length})
              </h3>

              <div className="max-h-64 overflow-y-auto space-y-3 pr-1">
                {cart.map((item) => (
                  <div key={item.product.id} className="flex items-center gap-3">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-12 h-14 object-cover rounded-lg bg-black shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-white uppercase truncate">
                        {item.product.name}
                      </p>
                      <p className="text-[10px] text-neutral-400 font-mono">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <span className="text-xs font-mono font-bold text-white">
                      ৳ {(item.product.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-neutral-800 space-y-2 text-xs font-mono">
                <div className="flex items-center justify-between text-neutral-400">
                  <span>Subtotal</span>
                  <span className="text-white">৳ {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-neutral-400">
                  <span>Delivery Charge</span>
                  <span className={freeShipping ? 'text-emerald-400 font-bold' : 'text-white'}>
                    {freeShipping ? 'FREE' : `৳ ${shippingCost}`}
                  </span>
                </div>
                <div className="pt-3 border-t border-neutral-800 flex items-center justify-between text-base font-black">
                  <span>FINAL TOTAL</span>
                  <span className="text-orange-400">৳ {total.toLocaleString()}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isPlacingOrder}
                className="w-full py-4 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-black uppercase tracking-wider text-xs sm:text-sm rounded-xl transition flex items-center justify-center gap-2 shadow-xl shadow-orange-500/20 cursor-pointer"
              >
                {isPlacingOrder ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>CONFIRM & PLACE ORDER</span>
                  </>
                )}
              </button>

              <div className="pt-3 flex items-center justify-center gap-2 text-[10px] text-neutral-500 font-mono">
                <ShieldCheck className="w-3.5 h-3.5 text-orange-500" />
                <span>SSL Encrypted Checkout • Authentic Guarantee</span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
