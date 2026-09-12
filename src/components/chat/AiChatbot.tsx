import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Sparkles, User, Calendar, MessageCircle, Minimize2 } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { ChatMessage } from '../../types';

export const AiChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const { navigateTo, setIsCalendarModalOpen } = useStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'model',
      content:
        'Hi! I am the Plexivia AI Shopping Assistant. Ask me about our bags, wallets, keychains, and t-shirts, or let me know if you would like to book a demo of this e-commerce platform!',
    },
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim() || loading) return;

    const userMessage: ChatMessage = { role: 'user', content: text };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: messages.slice(-6),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      setMessages((prev) => [...prev, { role: 'model', content: data.reply }]);
    } catch (err) {
      // Graceful client fallback grounded in the 15 products
      let fallback =
        "I'm here to help you browse our 15 products across Bags, Wallets, Keychains, and T-shirts! You can also book a live demo with Plexivia to see how this AI assistant was built.";
      const q = text.toLowerCase();
      if (q.includes('bag')) {
        fallback =
          'We have 5 premium bags: Tote Bag (৳ 1,250), Nature Designed Tote Bag (৳ 1,250), Ladies Purse (৳ 1,650), Laptop Bag (৳ 2,250), and Cute Schoolbag (৳ 1,850). Which style suits your day?';
      } else if (q.includes('wallet')) {
        fallback =
          'Our wallets include: Kawaii Mini Purse (৳ 950), Coin Purse (৳ 750), Men Wallet (৳ 1,250), and Leather Long Wallet (৳ 1,750). All feature refined materials and compact organization.';
      } else if (q.includes('keychain')) {
        fallback =
          'Check out our keychains: Cute Bunny Keychain (৳ 680), Kuromi Premium Plush (৳ 1,200), and Black Cat Keychain Pendant (৳ 620).';
      } else if (q.includes('shirt') || q.includes('tee')) {
        fallback =
          'Our apparel includes: Hello Kitty Designed (৳ 1,450), Couple Tshirt Pair (৳ 2,450), and Jojo Soso Drop Shoulder (৳ 1,650).';
      } else if (q.includes('demo') || q.includes('book') || q.includes('meeting')) {
        fallback =
          'You can book a 1-on-1 demo with Plexivia using our Google Calendar scheduler! Tap "Book Demo" right here to select a time.';
      }
      setMessages((prev) => [...prev, { role: 'model', content: fallback }]);
    } finally {
      setLoading(false);
    }
  };

  const quickPrompts = [
    'Recommend a durable tote bag',
    'Best gift under ৳ 1,000?',
    'How do I book a website demo?',
  ];

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          id="ai-chatbot-toggle-btn"
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#122225] border border-[#58C1C3]/60 hover:border-[#58C1C3] text-[#F5F7F7] shadow-2xl shadow-[#58C1C3]/20 hover:shadow-[#58C1C3]/30 transition-all transform hover:-translate-y-0.5 cursor-pointer"
          aria-label="Open AI Shopping Assistant"
        >
          <div className="w-7 h-7 rounded-full bg-[#58C1C3]/20 border border-[#58C1C3] flex items-center justify-center text-[#58C1C3]">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="text-left hidden min-[360px]:block">
            <div className="text-xs font-bold leading-tight">AI Assistant</div>
            <div className="text-[10px] text-[#97CC6F] leading-none">Online Demo</div>
          </div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          className="w-[calc(100vw-2rem)] sm:w-96 max-w-sm h-[500px] max-h-[85vh] bg-[#0C1618] border border-[#1E373D] rounded-2xl flex flex-col shadow-2xl shadow-black/80 overflow-hidden animate-fade-in"
          role="dialog"
          aria-label="AI Shopping Assistant Dialog"
        >
          {/* Header */}
          <div className="p-3.5 bg-[#122225] border-b border-[#1E373D] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#58C1C3]/20 border border-[#58C1C3] flex items-center justify-center text-[#58C1C3]">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-[#F5F7F7]">Plexivia Shopping AI</div>
                <div className="text-[10px] text-[#97CC6F]">Grounded in 15 Curated Products</div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-[#94AFB5] hover:text-[#F5F7F7] rounded-lg hover:bg-[#15272B] transition-colors"
                aria-label="Minimize Chat"
              >
                <Minimize2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-[#94AFB5] hover:text-[#F5F7F7] rounded-lg hover:bg-[#15272B] transition-colors"
                aria-label="Close Chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Action Bar for Calendar Demo */}
          <div className="bg-[#15272B] px-3 py-1.5 border-b border-[#1E373D] flex items-center justify-between text-[11px]">
            <span className="text-[#94AFB5]">Interested in custom AI ecommerce?</span>
            <button
              onClick={() => setIsCalendarModalOpen(true)}
              className="text-[#58C1C3] font-bold hover:underline flex items-center gap-1"
            >
              <Calendar className="w-3 h-3" />
              <span>Book Demo</span>
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-3.5 overflow-y-auto space-y-3">
            {messages.map((msg, index) => {
              const isUser = msg.role === 'user';
              return (
                <div
                  key={index}
                  className={`flex items-start gap-2 ${isUser ? 'justify-end' : 'justify-start'}`}
                >
                  {!isUser && (
                    <div className="w-6 h-6 rounded-full bg-[#58C1C3]/20 flex items-center justify-center text-[#58C1C3] flex-shrink-0 mt-0.5">
                      <Sparkles className="w-3 h-3" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
                      isUser
                        ? 'bg-[#58C1C3] text-[#0C1618] font-medium rounded-tr-none'
                        : 'bg-[#122225] text-[#F5F7F7] border border-[#1E373D] rounded-tl-none'
                    }`}
                  >
                    {msg.content}
                  </div>
                  {isUser && (
                    <div className="w-6 h-6 rounded-full bg-[#1E373D] flex items-center justify-center text-[#94AFB5] flex-shrink-0 mt-0.5">
                      <User className="w-3 h-3" />
                    </div>
                  )}
                </div>
              );
            })}
            {loading && (
              <div className="flex items-center gap-2 text-xs text-[#58C1C3] bg-[#122225] p-2.5 rounded-xl border border-[#1E373D] w-fit">
                <div className="w-2 h-2 rounded-full bg-[#58C1C3] animate-ping" />
                <span>Thinking...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestion Chips */}
          <div className="px-3 py-2 bg-[#122225]/60 border-t border-[#1E373D]/60 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {quickPrompts.map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSend(prompt)}
                className="text-[10px] text-[#94AFB5] hover:text-[#58C1C3] bg-[#15272B] hover:bg-[#1E373D] px-2.5 py-1 rounded-full whitespace-nowrap transition-colors border border-[#1E373D]"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-[#122225] border-t border-[#1E373D] flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask about bags, wallets, tees, or demo..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-[#15272B] border border-[#1E373D] focus:border-[#58C1C3] focus:outline-none rounded-xl px-3 py-2 text-xs text-[#F5F7F7] placeholder-[#94AFB5]/60"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="p-2 rounded-xl bg-[#58C1C3] text-[#0C1618] hover:bg-[#97CC6F] disabled:opacity-40 transition-colors"
              aria-label="Send message"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
