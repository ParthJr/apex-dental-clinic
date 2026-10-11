import React, { useEffect } from 'react';
import { X, ShieldCheck } from 'lucide-react';
import { CLINIC_CONFIG } from '../config/clinicData';

interface PrivacyNoticeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyNoticeModal: React.FC<PrivacyNoticeModalProps> = ({ isOpen, onClose }) => {
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
      aria-labelledby="privacy-modal-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-slate-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-[#101B35] text-white p-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#20C7E8]" />
            <h3 id="privacy-modal-title" className="text-lg font-bold font-heading text-white">
              Patient Data Privacy Notice
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
            At <strong>{CLINIC_CONFIG.name}</strong>, we respect your privacy. This notice explains how we collect and use your details when you submit an appointment enquiry through this website.
          </p>

          <h4 className="font-bold text-[#101B35] text-sm pt-2">1. Information Collected</h4>
          <p>
            We collect only your full name, mobile telephone number, selected dental service, preferred date/time window, and any optional notes you submit. We do not collect credit card numbers, payment tokens, or unnecessary medical records via this web form.
          </p>

          <h4 className="font-bold text-[#101B35] text-sm pt-2">2. Purpose of Use</h4>
          <p>
            Your information is used strictly by our clinical reception team at Kudasan, Gandhinagar to verify diary availability, schedule your consultation, and confirm the visit via phone call.
          </p>

          <h4 className="font-bold text-[#101B35] text-sm pt-2">3. Zero Marketing Spam</h4>
          <p>
            We do not sell, rent, or lease your contact information to third-party telemarketers or advertisers. You will only receive communication directly related to your dental care request.
          </p>

          <h4 className="font-bold text-[#101B35] text-sm pt-2">4. Questions & Direct Contact</h4>
          <p>
            If you have questions about your appointment request or wish to modify your information, contact our reception directly at{' '}
            <a href={`tel:${CLINIC_CONFIG.telephone.dialable}`} className="text-[#20C7E8] font-bold underline">
              {CLINIC_CONFIG.telephone.display}
            </a>
            .
          </p>
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-[#101B35] text-white rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-slate-800 transition-colors"
          >
            Close Notice
          </button>
        </div>
      </div>
    </div>
  );
};
