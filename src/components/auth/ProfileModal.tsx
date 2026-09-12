import React, { useState } from 'react';
import { X, User, LogOut, CheckCircle, ShieldCheck } from 'lucide-react';
import { useStore } from '../../store/useStore';

export const ProfileModal: React.FC = () => {
  const { isProfileOpen, setIsProfileOpen, user, isLoggedIn, login, logout, showNotification } = useStore();
  const [name, setName] = useState('Demo Client');
  const [email, setEmail] = useState('client@plexivia.com');

  if (!isProfileOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(name, email);
    showNotification('Logged in successfully');
  };

  const handleLogout = () => {
    logout();
    showNotification('Logged out');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div
        className="relative w-full max-w-md bg-[#122225] border border-[#1E373D] rounded-2xl p-6 shadow-2xl"
        role="dialog"
        aria-modal="true"
      >
        <button
          onClick={() => setIsProfileOpen(false)}
          className="absolute top-4 right-4 text-[#94AFB5] hover:text-[#F5F7F7] p-2 rounded-full hover:bg-[#1E373D]/50"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {isLoggedIn && user ? (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-[#58C1C3]/20 border border-[#58C1C3] flex items-center justify-center text-[#58C1C3]">
                <User className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#F5F7F7]">{user.name}</h3>
                <p className="text-xs text-[#94AFB5]">{user.email}</p>
              </div>
            </div>

            <div className="space-y-3 mb-6 bg-[#15272B] p-4 rounded-xl border border-[#1E373D] text-xs">
              <div className="flex items-center justify-between text-[#94AFB5]">
                <span>Account Status:</span>
                <span className="text-[#97CC6F] font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Verified VIP
                </span>
              </div>
              <div className="flex items-center justify-between text-[#94AFB5]">
                <span>Demo Mode:</span>
                <span className="text-[#58C1C3]">Plexivia Client Demo</span>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="w-full py-2.5 px-4 bg-[#1E373D] hover:bg-red-500/20 text-[#F5F7F7] hover:text-red-400 border border-[#284A52] hover:border-red-500/40 rounded-xl font-medium text-sm transition-all flex items-center justify-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              <span>Log Out</span>
            </button>
          </div>
        ) : (
          <form onSubmit={handleLogin}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-[#58C1C3]/20 border border-[#58C1C3] flex items-center justify-center text-[#58C1C3]">
                <User className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#F5F7F7]">Sign In to Plexivia</h3>
                <p className="text-xs text-[#94AFB5]">Demo Customer Account</p>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-xs font-semibold text-[#94AFB5] uppercase mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#15272B] border border-[#1E373D] focus:border-[#58C1C3] focus:outline-none rounded-xl px-3.5 py-2.5 text-sm text-[#F5F7F7]"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#94AFB5] uppercase mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#15272B] border border-[#1E373D] focus:border-[#58C1C3] focus:outline-none rounded-xl px-3.5 py-2.5 text-sm text-[#F5F7F7]"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-[#58C1C3] hover:bg-[#97CC6F] text-[#0C1618] rounded-xl font-bold text-sm transition-all shadow-lg shadow-[#58C1C3]/20 flex items-center justify-center gap-2"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Sign In Demo</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
