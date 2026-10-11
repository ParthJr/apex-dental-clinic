import React, { useEffect } from 'react';
import { X, FileText } from 'lucide-react';
import { CLINIC_CONFIG } from '../config/clinicData';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TermsModal: React.FC<TermsModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="terms-modal-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-slate-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-[#101B35] text-white p-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#20C7E8]" />
            <h3 id="terms-modal-title" className="text-lg font-bold font-heading text-white">
              Terms of Use & Clinical Disclaimer
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="text-slate-400 hover:text-white p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto text-slate-700 text-sm leading-relaxed">
          <p>
            Welcome to the official website of <strong>{CLINIC_CONFIG.name}</strong>. By accessing this site or requesting a consultation, you agree to these standard terms.
          </p>

          <h4 className="font-bold text-[#101B35] text-sm pt-2">1. Informational Purpose Only</h4>
          <p>
            Information on this website is provided for educational and clinical guidance purposes. It does not constitute medical advice or a conclusive diagnosis. Definitive treatment decisions must always be made during a direct clinical consultation with a licensed dentist.
          </p>

          <h4 className="font-bold text-[#101B35] text-sm pt-2">2. Consultation Enquiries</h4>
          <p>
            Submitting an online appointment enquiry via this website constitutes a booking request only. An appointment is legally and clinically confirmed only when our reception desk contacts you to confirm the exact chairside time.
          </p>

          <h4 className="font-bold text-[#101B35] text-sm pt-2">3. Acute Dental Emergencies</h4>
          <p>
            If you are experiencing acute unremitting pain, uncontrolled bleeding, or trauma, do not wait for form responses. Please call the clinic directly at{' '}
            <a href={`tel:${CLINIC_CONFIG.telephone.dialable}`} className="text-[#20C7E8] font-bold underline">
              {CLINIC_CONFIG.telephone.display}
            </a>{' '}
            or visit the nearest emergency healthcare facility.
          </p>

          <h4 className="font-bold text-[#101B35] text-sm pt-2">4. Hours and Schedules</h4>
          <p>
            While clinic opening begins at 9:30 AM Monday, clinic operatory hours and doctor schedules vary. Always confirm timing before visiting.
          </p>
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-[#101B35] text-white rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-slate-800 transition-colors"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};
