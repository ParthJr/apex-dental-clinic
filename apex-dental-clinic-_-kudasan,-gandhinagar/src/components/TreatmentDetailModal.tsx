import React, { useEffect } from 'react';
import { X, Check, Clock, AlertTriangle, Calendar, ArrowRight } from 'lucide-react';
import { TreatmentInfo } from '../config/clinicData';

interface TreatmentDetailModalProps {
  treatment: TreatmentInfo | null;
  onClose: () => void;
  onBookService: (serviceName: string) => void;
}

export const TreatmentDetailModal: React.FC<TreatmentDetailModalProps> = ({
  treatment,
  onClose,
  onBookService,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (treatment) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [treatment, onClose]);

  if (!treatment) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-treatment-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="bg-[#101B35] text-white p-6 sm:p-8 relative">
          <div className="flex items-center justify-between mb-3">
            <span className="font-mono text-xs font-bold text-[#20C7E8]">
              PROTOCOLS // [{treatment.number}]
            </span>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close modal"
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors focus-visible:ring-2 focus-visible:ring-[#20C7E8]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <h3 id="modal-treatment-title" className="text-2xl font-bold font-heading text-white">
            {treatment.title}
          </h3>

          <p className="text-xs text-[#20C7E8] font-mono uppercase tracking-wider mt-1">
            Category: {treatment.category}
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto text-slate-800 text-sm">
          {/* Overview */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Clinical Overview
            </h4>
            <p className="text-slate-700 leading-relaxed">{treatment.overview}</p>
          </div>

          {/* Clinical Protocols */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Standard Procedural Protocol
            </h4>
            <ul className="space-y-2">
              {treatment.clinicalProtocol.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-[#F5F9FC] border border-slate-200 flex items-center justify-center shrink-0 mt-0.5 text-[#20C7E8]">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-slate-700 leading-normal">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Recommended Indications */}
          <div className="bg-[#F5F9FC] p-4 rounded-xl border border-slate-100">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>Recommended When Experiencing:</span>
            </h4>
            <ul className="list-disc list-inside space-y-1 text-slate-600 text-xs sm:text-sm">
              {treatment.recommendedWhen.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Metrics: Duration & Patient Prep */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-3.5 rounded-lg border border-slate-200 flex items-start gap-3">
              <Clock className="w-4 h-4 text-[#20C7E8] shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-[#101B35]">Expected Timeframe</p>
                <p className="text-xs text-slate-600 mt-0.5">{treatment.typicalDuration}</p>
              </div>
            </div>

            <div className="p-3.5 rounded-lg border border-slate-200 flex items-start gap-3">
              <Calendar className="w-4 h-4 text-[#20C7E8] shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-[#101B35]">Preparation Guidance</p>
                <p className="text-xs text-slate-600 mt-0.5">{treatment.patientPreparation}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer CTAs */}
        <div className="p-6 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-slate-500 text-center sm:text-left">
            Final treatment plan requires direct chairside diagnosis.
          </p>

          <button
            type="button"
            onClick={() => {
              onBookService(treatment.title);
              onClose();
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-2.5 rounded-lg bg-[#20C7E8] hover:bg-[#1bb4d2] text-[#101B35] font-bold text-xs tracking-wider uppercase transition-colors shadow-sm focus-visible:ring-2 focus-visible:ring-[#101B35]"
          >
            <span>Request Consultation</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
