import React from 'react';
import { PATIENT_STEPS } from '../config/clinicData';

export const PatientJourney: React.FC = () => {
  return (
    <section id="patient-guide" className="w-full bg-[#FFFFFF] py-20 lg:py-28 text-slate-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-[#20C7E8] text-xs font-bold uppercase tracking-widest mb-2">
            STRUCTURED CARE PATHWAY
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-[#101B35] tracking-tight">
            Your Path to Optimal Oral Health
          </h2>
        </div>

        {/* Horizontal 3-Step Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connecting rule for tablet/desktop */}
          <div
            className="hidden md:block absolute top-14 left-24 right-24 h-0.5 bg-slate-200 z-0"
            aria-hidden="true"
          />

          {PATIENT_STEPS.map((step, index) => {
            const isCenterStep = index === 1;

            return (
              <div
                key={step.step}
                className="relative z-10 flex flex-col items-center text-center p-6 bg-white rounded-xl border border-slate-100 hover:border-slate-200 transition-colors shadow-sm"
              >
                <div
                  className={`w-16 h-16 rounded-xl flex items-center justify-center text-xl font-mono font-bold mb-6 shadow-md transition-transform hover:scale-105 ${
                    isCenterStep
                      ? 'bg-[#20C7E8] text-[#101B35]'
                      : 'bg-[#101B35] text-[#20C7E8]'
                  }`}
                  aria-hidden="true"
                >
                  {step.step}
                </div>

                <h3 className="text-lg font-bold font-heading text-[#101B35] mb-2">
                  {step.title}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed max-w-xs">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
