import React from 'react';
import { ArrowRight, Flame, Scan, ShieldCheck, Sparkles, HeartPulse, Calendar, Info } from 'lucide-react';
import { TREATMENTS, TreatmentInfo } from '../config/clinicData';

interface TreatmentGridProps {
  onSelectTreatment: (treatment: TreatmentInfo) => void;
  onBookService: (serviceName: string) => void;
}

export const TreatmentGrid: React.FC<TreatmentGridProps> = ({ onSelectTreatment, onBookService }) => {
  const getTreatmentIcon = (iconName: string) => {
    switch (iconName) {
      case 'Flame':
        return <Flame className="w-6 h-6 text-[#101B35] group-hover:text-[#101B35] transition-colors" />;
      case 'Scan':
        return <Scan className="w-6 h-6 text-[#101B35] group-hover:text-[#101B35] transition-colors" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-[#101B35] group-hover:text-[#101B35] transition-colors" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-[#101B35] group-hover:text-[#101B35] transition-colors" />;
      case 'HeartPulse':
        return <HeartPulse className="w-6 h-6 text-[#101B35] group-hover:text-[#101B35] transition-colors" />;
      case 'Calendar':
        return <Calendar className="w-6 h-6 text-[#101B35] group-hover:text-[#101B35] transition-colors" />;
      default:
        return <ShieldCheck className="w-6 h-6 text-[#101B35]" />;
    }
  };

  return (
    <section id="treatments" className="w-full bg-[#FFFFFF] py-20 lg:py-28 text-slate-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <div className="text-[#20C7E8] text-xs font-bold uppercase tracking-widest mb-3 flex items-center gap-2">
            <span className="w-3 h-0.5 bg-[#20C7E8]" aria-hidden="true" />
            <span>Clinical Services</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-[#101B35] tracking-tight">
            Explore Your Dental Care Options
          </h2>
          <p className="mt-3 text-slate-600 text-base leading-relaxed">
            Find the information you need to take the next step toward better oral health, guided by clear diagnostic procedures.
          </p>
        </div>

        {/* Asymmetric Treatment Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TREATMENTS.map((treatment) => (
            <div
              key={treatment.id}
              className="group relative rounded-xl bg-[#F5F9FC] p-8 border border-slate-100 hover:border-[#20C7E8]/40 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Header Row: Index Number and Tag */}
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-xs font-bold text-slate-400">
                    [{treatment.number}]
                  </span>
                  {treatment.badge ? (
                    <span className="inline-flex items-center px-2.5 py-1 rounded bg-[#20C7E8] text-[#101B35] text-[10px] font-extrabold uppercase tracking-wider shadow-sm">
                      {treatment.badge}
                    </span>
                  ) : (
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                      {treatment.category}
                    </span>
                  )}
                </div>

                {/* Icon Container */}
                <div className="w-12 h-12 rounded-lg bg-white shadow-sm flex items-center justify-center mb-5 group-hover:bg-[#20C7E8] transition-colors border border-slate-100">
                  {getTreatmentIcon(treatment.iconName)}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold font-heading text-[#101B35] mb-2 group-hover:text-[#101B35]">
                  {treatment.title}
                </h3>

                {/* Short Description */}
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  {treatment.shortDescription}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-200/60 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => onSelectTreatment(treatment)}
                  className="inline-flex items-center text-xs font-bold text-[#101B35] hover:text-[#20C7E8] transition-colors focus-visible:ring-2 focus-visible:ring-[#20C7E8] rounded py-1"
                >
                  <span>{treatment.id === 'appointment-scheduling' ? 'Request consultation slot' : 'Learn details & protocols'}</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover:translate-x-1" />
                </button>

                <button
                  type="button"
                  onClick={() => onBookService(treatment.title)}
                  className="text-[11px] font-semibold text-slate-500 hover:text-[#101B35] px-2 py-1 rounded hover:bg-slate-200/50 transition-colors"
                  title={`Request booking for ${treatment.title}`}
                >
                  Book
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Legal / Protocol Disclaimer Note */}
        <div className="mt-12 p-4 rounded-lg bg-[#F5F9FC] border border-slate-200/70 flex items-start sm:items-center gap-3 text-xs text-slate-500">
          <Info className="w-4 h-4 text-[#20C7E8] shrink-0 mt-0.5 sm:mt-0" />
          <span>
            Service categories reflect clinic listing. Clinical consultation determines exact required protocol. Individual anatomical suitability varies.
          </span>
        </div>
      </div>
    </section>
  );
};
