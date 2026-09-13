import React from 'react';
import { Star, CheckCircle, Quote } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  comment: string;
  item: string;
}

// Renders the streetwear customer feedback and testimonial review cards
export const TestimonialsSection: React.FC = () => {
  const reviews: Testimonial[] = [
    {
      id: '1',
      name: 'Rahat Karim',
      location: 'Banani, Dhaka',
      rating: 5,
      comment: 'The 300GSM drop shoulder tee is by far the best streetwear silhouette I have worn in BD. The drape and collar stiffness remain crisp after multiple washes.',
      item: 'Heavyweight Drop Shoulder Tee',
    },
    {
      id: '2',
      name: 'Tahmid Hasan',
      location: 'Uttara, Dhaka',
      rating: 5,
      comment: 'Super fast delivery. Ordered the baggy sweatpants and the French terry quality is elite. Truly high-end streetwear comfort.',
      item: 'Signature Baggy Sweatpants',
    },
    {
      id: '3',
      name: 'Zubair Alom',
      location: 'Chittagong',
      rating: 5,
      comment: 'Engulfic packaging, tags, and fit are on another level. Can proudly say this rivals imported luxury streetwear brands.',
      item: 'Oversized Poplin Shirt',
    },
  ];

  return (
    <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-neutral-800">
      <div className="text-center mb-10 space-y-2">
        <span className="text-xs font-mono uppercase tracking-widest text-orange-500 font-bold">
          COMMUNITY FEEDBACK
        </span>
        <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white font-sans">
          WHAT OUR CLUB MEMBERS SAY
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="p-6 rounded-2xl bg-neutral-900/90 border border-neutral-800 hover:border-orange-500/40 transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-orange-400">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-orange-400" />
                  ))}
                </div>
                <Quote className="w-6 h-6 text-neutral-700" />
              </div>

              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-light">
                "{rev.comment}"
              </p>
            </div>

            <div className="pt-4 border-t border-neutral-800 flex items-center justify-between text-xs">
              <div>
                <p className="font-bold text-white uppercase">{rev.name}</p>
                <p className="text-[10px] text-neutral-500 font-mono">{rev.location}</p>
              </div>

              <div className="flex items-center gap-1 text-[10px] text-emerald-400 font-mono">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Verified</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
