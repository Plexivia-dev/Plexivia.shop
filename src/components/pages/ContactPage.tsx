import React, { useState } from 'react';
import { ChevronRight, Mail, Send, CheckCircle2, MessageCircle, Calendar, Loader2 } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { DemoBookingButton } from '../common/DemoBookingButton';
import { WhatsAppButton } from '../common/WhatsAppButton';

// Renders the contact inquiry page with direct contact options and submission form
export const ContactPage: React.FC = () => {
  const { navigateTo, showNotification, submitContactMessage, isSubmittingContact } = useStore();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  // Handles contact form submission to the central backend API
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    try {
      await submitContactMessage({
        name: formData.name,
        email: formData.email,
        message: formData.message,
      });
      setIsSubmitted(true);
      showNotification('Thank you! Your message has been received.');
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to submit message. Please try again.');
    }
  };

  return (
    <div className="w-full py-8 sm:py-12 bg-[#0C1618]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-[#94AFB5] mb-6" aria-label="Breadcrumb">
          <button onClick={() => navigateTo('home')} className="hover:text-[#58C1C3]">
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#F5F7F7] font-semibold">Contact</span>
        </nav>

        <div className="mb-10 text-left">
          <span className="text-xs uppercase tracking-widest text-[#58C1C3] font-bold">
            Get in Touch
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-[#F5F7F7] tracking-tight mt-1 font-['Space_Grotesk']">
            Let's Talk About Your Next Project
          </h1>
          <p className="text-xs sm:text-sm text-[#94AFB5] mt-1">
            Reach out directly through WhatsApp, book a live demo, or drop us a message.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Direct Channels on Left */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#122225] border border-[#1E373D] rounded-2xl p-6 space-y-5">
              <h3 className="text-sm uppercase font-bold tracking-wider text-[#F5F7F7]">
                Instant Communication
              </h3>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-[#15272B] border border-[#1E373D] space-y-2">
                  <div className="flex items-center gap-2 text-[#25D366] text-xs font-bold uppercase">
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp Direct Support</span>
                  </div>
                  <p className="text-xs text-[#94AFB5]">
                    Chat in real-time with our development leads for quick project estimates and technical advice.
                  </p>
                  <div className="pt-2">
                    <WhatsAppButton size="sm" variant="primary" />
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#15272B] border border-[#1E373D] space-y-2">
                  <div className="flex items-center gap-2 text-[#58C1C3] text-xs font-bold uppercase">
                    <Calendar className="w-4 h-4" />
                    <span>Google Calendar Walkthrough</span>
                  </div>
                  <p className="text-xs text-[#94AFB5]">
                    Book a convenient 30-minute demonstration to evaluate web platforms and custom architecture.
                  </p>
                  <div className="pt-2">
                    <DemoBookingButton size="sm" variant="outline" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form on Right */}
          <div className="lg:col-span-7 bg-[#122225] border border-[#1E373D] rounded-2xl p-6 sm:p-8">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="text-sm uppercase font-bold tracking-wider text-[#58C1C3]">
                  Send Us a Direct Message
                </h3>

                <div>
                  <label className="block text-xs font-semibold text-[#94AFB5] mb-1.5 uppercase">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#15272B] border border-[#1E373D] focus:border-[#58C1C3] focus:outline-none rounded-xl px-4 py-3 text-sm text-[#F5F7F7] placeholder-[#94AFB5]/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#94AFB5] mb-1.5 uppercase">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#15272B] border border-[#1E373D] focus:border-[#58C1C3] focus:outline-none rounded-xl px-4 py-3 text-sm text-[#F5F7F7] placeholder-[#94AFB5]/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#94AFB5] mb-1.5 uppercase">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us about your project or inquiry..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-[#15272B] border border-[#1E373D] focus:border-[#58C1C3] focus:outline-none rounded-xl p-4 text-sm text-[#F5F7F7] placeholder-[#94AFB5]/50 resize-none"
                  />
                </div>

                {errorMessage && (
                  <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-xs">
                    {errorMessage}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmittingContact}
                  className="w-full py-3.5 bg-[#58C1C3] hover:bg-[#97CC6F] text-[#0C1618] font-bold text-sm rounded-xl transition-all shadow-lg shadow-[#58C1C3]/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmittingContact ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div className="py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-[#97CC6F]/20 border border-[#97CC6F] flex items-center justify-center text-[#97CC6F] mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-[#F5F7F7] mb-2">Message Sent!</h4>
                <p className="text-xs text-[#94AFB5] max-w-sm mx-auto mb-6">
                  Thank you for reaching out, <strong className="text-[#F5F7F7]">{formData.name}</strong>. The Plexivia team will reply to <strong className="text-[#58C1C3]">{formData.email}</strong> shortly.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-5 py-2 bg-[#15272B] border border-[#1E373D] text-[#F5F7F7] text-xs font-semibold rounded-lg hover:border-[#58C1C3]"
                >
                  Send Another Message
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
