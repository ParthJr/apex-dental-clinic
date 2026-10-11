import React from 'react';
import { WHY_APEX_PRINCIPLES } from '../config/clinicData';

export const WhyApex: React.FC = () => {
  return (
    <section id="why-apex" className="w-full bg-[#101B35] py-20 lg:py-28 text-white relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <div className="text-[#20C7E8] text-xs font-bold uppercase tracking-widest mb-3 flex items-center gap-2">
            <span className="w-3 h-0.5 bg-[#20C7E8]" aria-hidden="true" />
            <span>The Clinical Standard</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-white tracking-tight">
            Care Guided by Precision.
          </h2>
          <p className="mt-3 text-slate-300 text-base leading-relaxed">
            A disciplined approach to diagnostic clarity, transparent communication, and patient autonomy.
          </p>
        </div>

        {/* 4 Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_APEX_PRINCIPLES.map((principle) => (
            <div
              key={principle.number}
              className="p-8 rounded-xl bg-white/5 backdrop-blur-sm relative overflow-hidden flex flex-col justify-between border border-white/10 hover:border-[#20C7E8]/40 transition-colors"
            >
              {/* Cyan Top Accent Bar */}
              <div className="w-full h-1 bg-[#20C7E8] absolute top-0 left-0" aria-hidden="true" />

              <div>
                <span className="text-2xl font-mono font-bold text-[#20C7E8] block mb-4">
                  {principle.number}
                </span>
                <h3 className="text-lg font-bold font-heading text-white mb-3">
                  {principle.title}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {principle.description}
                </p>
              </div>

              <div className="mt-8 flex items-center text-[#20C7E8] text-xs font-mono font-semibold tracking-wider">
                <span>{principle.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
