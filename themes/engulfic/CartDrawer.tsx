import React from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, Sparkles } from 'lucide-react';
import { useStore } from '@/src/store/useStore';

// Renders the Engulfic slideout cart drawer with free delivery milestone meter and items breakdown
export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    getCartSubtotal,
    getCartItemCount,
    navigateTo,
  } = useStore();

  if (!isCartOpen) return null;

  const subtotal = getCartSubtotal();
  const itemCount = getCartItemCount();
  const freeShippingThreshold = 2000;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    navigateTo('checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in">
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-neutral-950 border-l border-neutral-800 text-white flex flex-col justify-between shadow-2xl">
          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-neutral-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-orange-500" />
              <h2 className="text-base sm:text-lg font-black uppercase tracking-wider font-sans">
                BAG ({itemCount})
              </h2>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-900 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Milestone Meter */}
          <div className="p-4 bg-neutral-900/60 border-b border-neutral-800 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              {remainingForFreeShipping > 0 ? (
                <span className="text-neutral-300">
                  Add <strong className="text-orange-400">৳ {remainingForFreeShipping.toLocaleString()}</strong> for Free Delivery
                </span>
              ) : (
                <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> FREE DELIVERY UNLOCKED
                </span>
              )}
              <span className="text-neutral-500">{progressPercent}%</span>
            </div>
            <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-orange-500 transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-3 py-16 text-neutral-500">
                <ShoppingBag className="w-12 h-12 stroke-1 text-neutral-700" />
                <p className="text-sm font-mono uppercase tracking-wider">Your bag is empty</p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigateTo('shop');
                  }}
                  className="text-xs font-mono text-orange-500 hover:underline uppercase font-bold"
                >
                  Explore Runway Pieces
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-4 p-3 rounded-2xl bg-neutral-900/70 border border-neutral-800/80"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-24 object-cover rounded-xl bg-black shrink-0"
                  />

                  <div className="flex-1 flex flex-col justify-between py-0.5">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs sm:text-sm font-bold text-white uppercase line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-neutral-500 hover:text-red-400 p-1"
                          title="Remove"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-[10px] text-neutral-400 font-mono mt-0.5">
                        {item.product.category}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center bg-neutral-950 border border-neutral-800 rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="px-2 py-0.5 text-xs text-neutral-300 hover:text-white font-mono"
                        >
                          -
                        </button>
                        <span className="px-2 text-xs font-mono font-bold text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="px-2 py-0.5 text-xs text-neutral-300 hover:text-white font-mono"
                        >
                          +
                        </button>
                      </div>

                      <span className="text-xs sm:text-sm font-mono font-black text-white">
                        ৳ {(item.product.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Summary */}
          {cart.length > 0 && (
            <div className="p-5 sm:p-6 bg-neutral-900 border-t border-neutral-800 space-y-4">
              <div className="space-y-2 text-xs font-mono">
                <div className="flex items-center justify-between text-neutral-400">
                  <span>Subtotal</span>
                  <span className="text-white font-bold">৳ {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-neutral-400">
                  <span>Estimated Shipping</span>
                  <span className={remainingForFreeShipping === 0 ? 'text-emerald-400 font-bold' : 'text-white'}>
                    {remainingForFreeShipping === 0 ? 'FREE' : 'Calculated at checkout'}
                  </span>
                </div>
                <div className="pt-2 border-t border-neutral-800 flex items-center justify-between text-sm sm:text-base font-black">
                  <span>TOTAL</span>
                  <span className="text-orange-400">৳ {subtotal.toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={handleProceedToCheckout}
                className="w-full py-4 bg-orange-500 hover:bg-orange-600 text-white font-black uppercase tracking-wider text-xs sm:text-sm rounded-xl transition flex items-center justify-center gap-2 shadow-xl shadow-orange-500/20 cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
