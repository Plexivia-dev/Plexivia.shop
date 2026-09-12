import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { CONFIG } from '../../config';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartSubtotal,
    getCartItemCount,
    navigateTo,
  } = useStore();

  if (!isCartOpen) return null;

  const subtotal = getCartSubtotal();
  const itemCount = getCartItemCount();

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigateTo('checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 max-w-md w-full flex pl-10">
        <div
          className="w-full bg-[#0C1618] border-l border-[#1E373D] p-6 flex flex-col justify-between shadow-2xl animate-slide-in-right"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cart-drawer-title"
        >
          {/* Drawer Header */}
          <div className="flex items-center justify-between pb-5 border-b border-[#1E373D]">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-[#58C1C3]" />
              <h2 id="cart-drawer-title" className="text-lg font-bold text-[#F5F7F7]">
                Your Cart
              </h2>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#15272B] text-[#58C1C3] border border-[#1E373D]">
                {itemCount} {itemCount === 1 ? 'item' : 'items'}
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-[#94AFB5] hover:text-[#F5F7F7] rounded-lg hover:bg-[#15272B] transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto py-5 space-y-4 divide-y divide-[#1E373D]/40">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-[#122225] border border-[#1E373D] flex items-center justify-center text-[#94AFB5] mb-4">
                  <ShoppingBag className="w-7 h-7" />
                </div>
                <h3 className="text-base font-bold text-[#F5F7F7] mb-1">Your cart is empty</h3>
                <p className="text-xs text-[#94AFB5] max-w-xs mb-6">
                  Explore our curated bags, wallets, keychains, and apparel to add items.
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigateTo('shop');
                  }}
                  className="px-6 py-2.5 rounded-full bg-[#58C1C3] text-[#0C1618] font-bold text-xs hover:bg-[#97CC6F] transition-colors"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cart.map(({ product, quantity }) => (
                <div key={product.id} className="pt-4 first:pt-0 flex items-start gap-4">
                  {/* Thumbnail */}
                  <div
                    onClick={() => {
                      setIsCartOpen(false);
                      navigateTo('product-details', product.id);
                    }}
                    className="w-20 h-20 rounded-xl overflow-hidden bg-[#122225] border border-[#1E373D] flex-shrink-0 cursor-pointer"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info & Quantity */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4
                        onClick={() => {
                          setIsCartOpen(false);
                          navigateTo('product-details', product.id);
                        }}
                        className="text-sm font-semibold text-[#F5F7F7] truncate cursor-pointer hover:text-[#58C1C3]"
                      >
                        {product.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(product.id)}
                        className="text-[#94AFB5] hover:text-red-400 p-1 transition-colors"
                        aria-label={`Remove ${product.name}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="text-xs font-bold text-[#58C1C3] mt-1">
                      {product.priceFormatted}
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div className="inline-flex items-center rounded-lg bg-[#122225] border border-[#1E373D] p-0.5">
                        <button
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center text-[#94AFB5] hover:text-[#F5F7F7] transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-xs font-bold text-[#F5F7F7]">
                          {quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center text-[#94AFB5] hover:text-[#F5F7F7] transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-xs font-semibold text-[#94AFB5]">
                        {CONFIG.currencySymbol}{(product.price * quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Cart Footer */}
          {cart.length > 0 && (
            <div className="pt-5 border-t border-[#1E373D] space-y-4">
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between text-[#94AFB5]">
                  <span>Subtotal</span>
                  <span className="text-base font-extrabold text-[#F5F7F7]">
                    {CONFIG.currencySymbol}{subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[#94AFB5]">
                  <span>Shipping</span>
                  <span className="text-[#97CC6F] font-semibold">
                    {subtotal >= 2000 ? 'Free Shipping' : '৳ 120'}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-2.5">
                <button
                  onClick={handleCheckout}
                  className="w-full py-3.5 px-4 bg-[#58C1C3] hover:bg-[#97CC6F] text-[#0C1618] font-bold text-sm rounded-xl transition-all shadow-lg shadow-[#58C1C3]/20 flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center justify-between">
                  <button
                    onClick={clearCart}
                    className="text-xs text-[#94AFB5] hover:text-red-400 transition-colors py-1 cursor-pointer"
                  >
                    Clear Cart
                  </button>
                  <span className="text-[11px] text-[#94AFB5]">
                    Plexivia Demo Commerce
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
