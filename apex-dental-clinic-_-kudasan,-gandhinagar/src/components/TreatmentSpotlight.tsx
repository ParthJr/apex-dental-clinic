import React, { useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { CLINIC_CONFIG, CONSULTATION_FRAMEWORK } from '../config/clinicData';

interface TreatmentSpotlightProps {
  onScheduleVisit: () => void;
}

export const TreatmentSpotlight: React.FC<TreatmentSpotlightProps> = ({ onScheduleVisit }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <section className="w-full bg-[#F5F9FC] py-20 lg:py-28 text-slate-900" id="consultation-framework">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Operatory Photography Left */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-xl overflow-hidden shadow-xl bg-slate-900 border border-slate-200">
              {!imageError ? (
                <img
                  src={CLINIC_CONFIG.images.operatoryRoom}
                  alt="Apex Dental Clinic Operatory Room equipped for microscopic and restorative dentistry"
                  referrerPolicy="no-referrer"
                  onError={() => setImageError(true)}
                  className="w-full h-auto object-cover aspect-[4/3]"
                />
              ) : (
                <div className="w-full aspect-[4/3] bg-[#101B35] flex flex-col items-center justify-center p-8 text-center text-white">
                  <Sparkles className="w-10 h-10 text-[#20C7E8] mb-3" />
                  <h4 className="font-heading font-bold text-lg text-white">Advanced Operatory Suite</h4>
                  <p className="text-xs text-slate-300 mt-1">Sterilized clinical environment in Kudasan.</p>
                </div>
              )}
              <div
                className="absolute inset-0 bg-gradient-to-tr from-[#101B35]/40 via-transparent to-transparent pointer-events-none"
                aria-hidden="true"
              />
            </div>

            {/* Geometric Tag */}
            <div
              className="absolute -bottom-4 -right-4 bg-white shadow-lg rounded-lg p-3 hidden sm:flex items-center gap-3 border border-slate-100"
              aria-hidden="true"
            >
              <div className="w-3 h-3 rounded-full bg-[#20C7E8]" />
              <span className="text-xs font-mono font-semibold text-[#101B35] tracking-wide">
                STERILE SUITE // OPERATORY A
              </span>
            </div>
          </div>

          {/* Structured Pathway Copy Right */}
          <div className="lg:col-span-6 flex flex-col space-y-6">
            <div className="text-[#20C7E8] text-xs font-bold uppercase tracking-widest flex items-center gap-2">
              <span className="w-3 h-0.5 bg-[#20C7E8]" aria-hidden="true" />
              <span>Consultation Framework</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-[#101B35] tracking-tight">
              Your Dental Concerns Deserve a Clear Plan.
            </h2>

            <p className="text-base text-slate-600 leading-relaxed">
              Every smile is different. Discuss your concerns with the dental team and understand the options that may be appropriate for you.
            </p>

            {/* 3 Structured Procedural Steps */}
            <div className="space-y-4 pt-2">
              {CONSULTATION_FRAMEWORK.map((item) => (
                <div
                  key={item.step}
                  className="flex items-start gap-4 p-4 rounded-lg bg-white shadow-sm border border-slate-200/60"
                >
                  <span className="w-7 h-7 rounded bg-[#101B35] text-[#20C7E8] font-mono text-xs font-bold flex items-center justify-center shrink-0">
                    {item.step}
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-[#101B35] font-heading">{item.title}</h3>
                    <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <button
                type="button"
                onClick={onScheduleVisit}
                className="inline-flex items-center justify-center px-7 py-3 rounded-lg bg-[#101B35] hover:bg-slate-800 text-white font-bold text-sm transition-all shadow-md hover:shadow-lg focus-visible:ring-2 focus-visible:ring-[#20C7E8]"
              >
                <span>Schedule Your Visit</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
