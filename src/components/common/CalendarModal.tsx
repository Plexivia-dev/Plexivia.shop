import React, { useState } from 'react';
import { X, Calendar, Clock, CheckCircle2, ArrowRight, ExternalLink } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { CONFIG } from '../../config';

export const CalendarModal: React.FC = () => {
  const { isCalendarModalOpen, setIsCalendarModalOpen, showNotification } = useStore();
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [isBooked, setIsBooked] = useState(false);

  if (!isCalendarModalOpen) return null;

  const demoSlots = [
    'Today at 4:00 PM',
    'Tomorrow at 11:00 AM',
    'Tomorrow at 2:30 PM',
    'Next Monday at 10:00 AM',
  ];

  const handleSimulateBooking = () => {
    if (!selectedSlot) return;
    setIsBooked(true);
    showNotification(`Demo scheduled for ${selectedSlot}!`);
    setTimeout(() => {
      setIsBooked(false);
      setSelectedSlot(null);
      setIsCalendarModalOpen(false);
    }, 2200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div
        className="relative w-full max-w-lg bg-[#122225] border border-[#1E373D] rounded-2xl p-6 sm:p-8 shadow-2xl shadow-[#58C1C3]/10"
        role="dialog"
        aria-modal="true"
        aria-labelledby="calendar-modal-title"
      >
        {/* Close Button */}
        <button
          onClick={() => setIsCalendarModalOpen(false)}
          className="absolute top-5 right-5 text-[#94AFB5] hover:text-[#F5F7F7] p-2 rounded-full hover:bg-[#1E373D]/50 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!isBooked ? (
          <div>
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#58C1C3]/20 border border-[#58C1C3]/40 flex items-center justify-center text-[#58C1C3]">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs uppercase tracking-wider text-[#58C1C3] font-semibold">
                  Google Calendar Scheduling
                </span>
                <h3 id="calendar-modal-title" className="text-xl font-bold text-[#F5F7F7]">
                  Book a Live Demo with Plexivia
                </h3>
              </div>
            </div>

            <p className="text-sm text-[#94AFB5] leading-relaxed mb-6">
              Schedule a 1-on-1 strategy session to explore bespoke e-commerce platforms, custom web architecture, and digital solutions crafted for your business.
            </p>

            {/* Quick Slots */}
            <div className="mb-6">
              <label className="block text-xs font-semibold text-[#F5F7F7] uppercase tracking-wider mb-2.5">
                Quick Select Available Demo Slots:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {demoSlots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setSelectedSlot(slot)}
                    className={`flex items-center gap-2 p-3 text-xs font-medium rounded-xl border text-left transition-all ${
                      selectedSlot === slot
                        ? 'bg-[#58C1C3]/20 border-[#58C1C3] text-[#58C1C3]'
                        : 'bg-[#15272B] border-[#1E373D] text-[#94AFB5] hover:border-[#58C1C3]/50 hover:text-[#F5F7F7]'
                    }`}
                  >
                    <Clock className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{slot}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3">
              {selectedSlot && (
                <button
                  type="button"
                  onClick={handleSimulateBooking}
                  className="w-full py-3 px-4 bg-[#58C1C3] text-[#0C1618] rounded-xl font-bold text-sm hover:bg-[#97CC6F] transition-colors flex items-center justify-center gap-2 shadow-lg shadow-[#58C1C3]/20"
                >
                  <span>Confirm Slot ({selectedSlot})</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}

              {/* Direct Link to Google Calendar Appointment Schedule */}
              <a
                href={CONFIG.googleCalendarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 bg-[#15272B] border border-[#58C1C3]/50 text-[#58C1C3] hover:bg-[#58C1C3]/10 hover:border-[#58C1C3] rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 text-center"
              >
                <span>Open Google Calendar Scheduler</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            <div className="mt-4 pt-4 border-t border-[#1E373D] text-center">
              <span className="text-[11px] text-[#94AFB5]">
                Integrated with Google Calendar Appointment Scheduling
              </span>
            </div>
          </div>
        ) : (
          <div className="py-8 text-center animate-fade-in">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#97CC6F]/20 border border-[#97CC6F] flex items-center justify-center text-[#97CC6F]">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold text-[#F5F7F7] mb-2">Demo Booked Successfully!</h4>
            <p className="text-sm text-[#94AFB5] mb-2">
              We have reserved your slot for <span className="text-[#58C1C3] font-semibold">{selectedSlot}</span>.
            </p>
            <p className="text-xs text-[#94AFB5]">
              A calendar invite and Google Meet link will be delivered shortly.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
