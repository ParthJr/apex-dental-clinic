import React, { useEffect } from 'react';
import { X, CheckSquare, AlertCircle, FileCheck, ExternalLink } from 'lucide-react';
import { CLINIC_CONFIG } from '../config/clinicData';

interface PreLaunchChecklistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PreLaunchChecklistModal: React.FC<PreLaunchChecklistModalProps> = ({ isOpen, onClose }) => {
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

  const checklistItems = [
    {
      item: "Doctor Credentials & State Dental Council Registration",
      status: "Verification Required",
      detail: "Doctor's name, BDS/MDS degree qualifications, and Gujarat Dental Council (GDC) registration numbers were intentionally omitted from public copy to avoid unverified fabrication.",
      actionNeeded: "Provide certified credentials to add doctor profile cards.",
    },
    {
      item: "Complete Weekly Opening Hours & Operatory Schedule",
      status: "Partially Verified",
      detail: "Monday 9:30 AM opening time verified from public listing. Full weekly hours (Tuesday through Sunday and lunch/evening intervals) require direct clinic verification.",
      actionNeeded: "Confirm exact consultation hours for Tuesday–Sunday in clinicData.ts.",
    },
    {
      item: "Official Reception Email Address",
      status: "Pending Verification",
      detail: "No official email address was provided in the listing. The appointment form currently routes requests to the verified telephone reception desk and local serverless API.",
      actionNeeded: "Supply clinic email (e.g. info@apexdentalclinic.in or contact@apexdentalclinic.in) for automated email forwards.",
    },
    {
      item: "Dedicated WhatsApp Business Number",
      status: "Intentionally Inactive",
      detail: "WhatsApp CTAs have been kept disabled because telephone numbers do not automatically guarantee an active WhatsApp Business account.",
      actionNeeded: "Verify WhatsApp number to enable direct chat buttons.",
    },
    {
      item: "Google Maps Place ID & Review Link",
      status: "Operational Fallback",
      detail: "Uses verified address '111, 112, Shreedhar Aurum, Kudasan, Gandhinagar, Gujarat 382419'.",
      actionNeeded: "Optionally plug in exact Google Maps Place ID once claimed in Google Business Profile.",
    },
    {
      item: "Production Enquiry Backend / CRM Integration",
      status: "Configured & Ready",
      detail: "Vercel Serverless Function `/api/enquiries` and Vite dev API middleware implemented with server-side validation, Indian phone validation, and local offline queue preservation.",
      actionNeeded: "Connect webhook to clinic reception email/SMS gateway (Twilio/SendGrid) if desired.",
    },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="checklist-modal-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-[#101B35] text-white p-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-[#20C7E8]" />
            <h3 id="checklist-modal-title" className="text-lg font-bold font-heading text-white">
              Pre-Launch Verification Checklist
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

        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto text-slate-700 text-sm">
          <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-xl text-blue-900 text-xs flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              In accordance with medical compliance and responsible engineering standards, all business details must be confirmed by the clinic prior to production marketing.
            </p>
          </div>

          <div className="space-y-4 pt-2">
            {checklistItems.map((item, index) => (
              <div
                key={index}
                className="p-4 rounded-xl border border-slate-200 bg-[#F5F9FC] space-y-2"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <CheckSquare className="w-4 h-4 text-[#20C7E8]" />
                    <h4 className="font-bold text-[#101B35] text-sm">{item.item}</h4>
                  </div>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase tracking-wider ${
                      item.status.includes('Ready') || item.status.includes('Operational')
                        ? 'bg-emerald-100 text-emerald-800'
                        : item.status.includes('Partially')
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-slate-200 text-slate-800'
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{item.detail}</p>
                <p className="text-xs text-slate-800 font-medium pt-1">
                  <span className="text-[#101B35] font-semibold">Action:</span> {item.actionNeeded}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <p className="text-xs text-slate-500">
            Source file: <code className="font-mono text-slate-700">src/config/clinicData.ts</code>
          </p>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-[#101B35] text-white rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-slate-800 transition-colors"
          >
            Close Checklist
          </button>
        </div>
      </div>
    </div>
  );
};
