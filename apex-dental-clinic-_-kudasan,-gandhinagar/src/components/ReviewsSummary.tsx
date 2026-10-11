import React from 'react';
import { Star, ExternalLink, CheckCircle } from 'lucide-react';
import { CLINIC_CONFIG } from '../config/clinicData';

export const ReviewsSummary: React.FC = () => {
  return (
    <section className="w-full bg-[#101B35] py-16 text-white border-y border-white/10" id="reviews">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="rounded-2xl bg-white/5 p-8 lg:p-12 relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8 border border-white/10 backdrop-blur-sm">
          {/* Metric Data Left */}
          <div className="flex flex-col sm:flex-row items-center gap-8 text-center sm:text-left">
            <div className="text-6xl sm:text-7xl font-mono font-bold text-white tracking-tighter tabular-nums select-none">
              {CLINIC_CONFIG.reviews.rating.toFixed(1)}
            </div>

            <div className="space-y-1">
              <div className="flex text-[#20C7E8] justify-center sm:justify-start gap-1" aria-hidden="true">
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
              </div>

              <p className="text-base font-bold text-white font-heading">
                Based on {CLINIC_CONFIG.reviews.reviewCount} verified Google reviews
              </p>

              <p className="text-xs text-slate-400">
                {CLINIC_CONFIG.reviews.profileLocation}
              </p>
            </div>
          </div>

          {/* Action & Disclosure Right */}
          <div className="flex flex-col items-center lg:items-end gap-3 text-center lg:text-right">
            <a
              href={CLINIC_CONFIG.reviews.verifiedGoogleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#20C7E8] hover:bg-[#1bb4d2] text-[#101B35] font-bold text-sm transition-all shadow-md hover:shadow-lg focus-visible:ring-2 focus-visible:ring-white"
            >
              <span>Read Google Reviews</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            <div className="flex items-center gap-1.5 text-[11px] text-slate-400 max-w-xs">
              <CheckCircle className="w-3.5 h-3.5 text-[#20C7E8] shrink-0" />
              <span>{CLINIC_CONFIG.reviews.disclaimer}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
