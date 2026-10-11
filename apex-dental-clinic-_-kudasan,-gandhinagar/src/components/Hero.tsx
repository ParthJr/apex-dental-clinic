import React, { useState } from 'react';
import { ArrowRight, Star, ShieldCheck, Crosshair, HeartHandshake } from 'lucide-react';
import { CLINIC_CONFIG } from '../config/clinicData';

interface HeroProps {
  onBookConsultation: () => void;
  onExploreTreatments: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onBookConsultation, onExploreTreatments }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <section
      id="top"
      className="relative w-full bg-[#101B35] text-white overflow-hidden pt-28 pb-16 lg:pt-36 lg:pb-24"
    >
      {/* Precision Architectural Coordinate Grid Background */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#20C7E8 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
        aria-hidden="true"
      />

      {/* Engineering Coordinate Tag */}
      <div
        className="absolute top-24 right-12 text-[#20C7E8]/30 font-mono text-xs tracking-widest hidden md:block select-none"
        aria-hidden="true"
      >
        {CLINIC_CONFIG.geo.coordinateLabel}
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            {/* Eyebrow Pill */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#20C7E8]/10 text-[#20C7E8] text-xs font-semibold tracking-wider uppercase border border-[#20C7E8]/20">
              <span className="w-2 h-2 rounded-full bg-[#20C7E8] animate-pulse" aria-hidden="true" />
              <span>Modern Dentistry · Kudasan</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white font-heading leading-[1.08]">
              Precision in{' '}
              <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-[#20C7E8]">
                Every Smile.
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-slate-300 max-w-xl font-normal leading-relaxed">
              Thoughtful dental care, modern clinical techniques, and a patient-first approach to help you make informed decisions about your oral health.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={onBookConsultation}
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-lg bg-[#20C7E8] text-[#101B35] font-bold text-sm tracking-wide transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(32,199,232,0.35)] shadow-md focus-visible:ring-2 focus-visible:ring-white"
              >
                <span>Book a Consultation</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>

              <button
                type="button"
                onClick={onExploreTreatments}
                className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 rounded-lg bg-white/5 hover:bg-white/10 text-white font-medium text-sm transition-colors border border-white/10 focus-visible:ring-2 focus-visible:ring-[#20C7E8]"
              >
                Explore Treatments
              </button>
            </div>

            {/* Trust Indicator */}
            <div className="pt-6 flex flex-wrap items-center gap-4">
              <a
                href={CLINIC_CONFIG.reviews.verifiedGoogleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center bg-white/5 px-4 py-2 rounded-lg border border-white/10 hover:border-[#20C7E8]/40 transition-colors"
                title="View authentic Google reviews"
              >
                <div className="flex text-[#20C7E8] mr-2" aria-hidden="true">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                </div>
                <span className="font-bold text-white text-sm">
                  {CLINIC_CONFIG.reviews.rating} ★
                </span>
                <span className="text-slate-400 text-xs ml-2">
                  · {CLINIC_CONFIG.reviews.reviewCount} Google reviews
                </span>
              </a>

              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <ShieldCheck className="w-4 h-4 text-[#20C7E8]" />
                <span>Verified Public Profile</span>
              </div>
            </div>
          </div>

          {/* Right Column: Framed Image with Precision Architectural Accents */}
          <div className="lg:col-span-5 relative">
            {/* Geometric Corner Accents */}
            <div
              className="absolute -top-3 -left-3 w-8 h-8 border-t-2 border-l-2 border-[#20C7E8] z-20 pointer-events-none"
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-3 -right-3 w-8 h-8 border-b-2 border-r-2 border-[#20C7E8] z-20 pointer-events-none"
              aria-hidden="true"
            />

            <div className="relative rounded-lg overflow-hidden bg-slate-900 shadow-2xl border border-white/10">
              {!imageError ? (
                <img
                  src={CLINIC_CONFIG.images.heroConsultation}
                  alt="Doctor reviewing digital scan with patient at Apex Dental Clinic"
                  referrerPolicy="no-referrer"
                  onError={() => setImageError(true)}
                  className="w-full h-auto object-cover transform hover:scale-[1.02] transition-transform duration-700 aspect-[4/3]"
                />
              ) : (
                /* Styled CSS fallback container adhering to Zero-Broken-Image Policy */
                <div className="w-full aspect-[4/3] bg-gradient-to-br from-[#101B35] to-[#1e3a6a] flex flex-col items-center justify-center p-8 text-center">
                  <Crosshair className="w-12 h-12 text-[#20C7E8] mb-3 opacity-80" />
                  <h3 className="text-lg font-bold text-white font-heading">
                    Diagnostic Imaging & Consultation
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 max-w-xs">
                    State-of-the-art operatory & diagnostic clarity at Kudasan, Gandhinagar.
                  </p>
                </div>
              )}

              {/* Scrim overlay for legibility */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-[#101B35]/80 via-transparent to-transparent pointer-events-none"
                aria-hidden="true"
              />

              {/* Crosshair indicator */}
              <div
                className="absolute top-4 right-4 bg-[#101B35]/85 backdrop-blur-md px-2.5 py-1 rounded text-[10px] font-mono text-[#20C7E8] flex items-center gap-1.5 border border-[#20C7E8]/20 select-none"
                aria-hidden="true"
              >
                <Crosshair className="w-3 h-3 text-[#20C7E8]" />
                <span>DIAGNOSTIC SCAN 3D</span>
              </div>

              {/* Floating Glass Card */}
              <div className="absolute bottom-4 left-4 right-4 bg-[#101B35]/85 backdrop-blur-md rounded-lg p-3.5 flex items-center justify-between text-white border border-white/10 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#20C7E8]/20 flex items-center justify-center text-[#20C7E8] shrink-0">
                    <HeartHandshake className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#20C7E8]">
                      Diagnostic Integrity
                    </p>
                    <p className="text-sm font-bold text-white">Your Smile. Your Care.</p>
                  </div>
                </div>
                <span className="text-[11px] font-mono text-slate-400 select-none">SEC: 01</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
