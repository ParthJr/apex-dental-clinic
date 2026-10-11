import React from 'react';
import { Star, ShieldAlert } from 'lucide-react';
import { CLINIC_CONFIG } from '../config/clinicData';

interface FooterProps {
  onOpenPrivacyNotice: () => void;
  onOpenTerms: () => void;
  onOpenPreLaunchChecklist: () => void;
  onSelectTreatmentByName: (name: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenPrivacyNotice,
  onOpenTerms,
  onOpenPreLaunchChecklist,
  onSelectTreatmentByName,
}) => {
  return (
    <footer className="w-full bg-[#101B35] text-slate-300 pt-16 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-xl font-bold tracking-tight text-white font-heading uppercase">
                {CLINIC_CONFIG.name}
              </span>
            </div>

            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Precision-driven digital dentistry providing advanced prosthodontics, painless root canal therapies, laser aesthetics, and dental implant solutions.
            </p>

            <a
              href={CLINIC_CONFIG.reviews.verifiedGoogleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/10 hover:border-[#20C7E8]/40 transition-colors"
            >
              <div className="flex text-[#20C7E8] gap-0.5" aria-hidden="true">
                <Star className="w-3.5 h-3.5 fill-current" />
                <Star className="w-3.5 h-3.5 fill-current" />
                <Star className="w-3.5 h-3.5 fill-current" />
                <Star className="w-3.5 h-3.5 fill-current" />
                <Star className="w-3.5 h-3.5 fill-current" />
              </div>
              <span className="text-xs font-bold text-white">
                {CLINIC_CONFIG.reviews.rating} ★
              </span>
              <span className="text-xs text-slate-400">
                · {CLINIC_CONFIG.reviews.reviewCount} Google Reviews
              </span>
            </a>
          </div>

          {/* Treatments Col */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#20C7E8] mb-4">
              Treatments
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <button
                  type="button"
                  onClick={() => onSelectTreatmentByName('Emergency Dental Care')}
                  className="hover:text-white transition-colors text-left"
                >
                  Emergency Dental Care
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectTreatmentByName('Dental X-rays')}
                  className="hover:text-white transition-colors text-left"
                >
                  Dental X-rays & Imaging
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectTreatmentByName('Dental Check-ups')}
                  className="hover:text-white transition-colors text-left"
                >
                  Dental Check-ups
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectTreatmentByName('Veneers and Crowns')}
                  className="hover:text-white transition-colors text-left"
                >
                  Veneers and Crowns
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectTreatmentByName('Teeth Care')}
                  className="hover:text-white transition-colors text-left"
                >
                  Teeth Care & Hygiene
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Links Col */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#20C7E8] mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <a href="#top" className="hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#why-apex" className="hover:text-white transition-colors">
                  Why Apex Clinic
                </a>
              </li>
              <li>
                <a href="#patient-guide" className="hover:text-white transition-colors">
                  Patient Guide
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  Location & Hours
                </a>
              </li>
              <li>
                <a href="#appointment-booking" className="hover:text-white transition-colors">
                  Appointment Request
                </a>
              </li>
            </ul>
          </div>

          {/* Clinic Location Col */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#20C7E8] mb-4">
              Clinic Location
            </h3>
            <address className="not-italic text-sm text-slate-400 space-y-2 leading-relaxed">
              <p>
                {CLINIC_CONFIG.address.unit},<br />
                {CLINIC_CONFIG.address.locality}, {CLINIC_CONFIG.address.city},<br />
                {CLINIC_CONFIG.address.state} {CLINIC_CONFIG.address.postalCode}
              </p>
              <p className="pt-1">
                <span className="text-white font-medium">Call:</span>{' '}
                <a
                  href={`tel:${CLINIC_CONFIG.telephone.dialable}`}
                  className="hover:text-[#20C7E8] transition-colors font-mono"
                >
                  {CLINIC_CONFIG.telephone.display}
                </a>
              </p>
              <p>
                <span className="text-white font-medium">Web:</span>{' '}
                <span className="font-mono">{CLINIC_CONFIG.website}</span>
              </p>
            </address>
          </div>
        </div>

        {/* Bottom Legal / Pre-launch Bar */}
        <div className="pt-8 mt-4 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© 2026 Apex Dental Clinic. Proposed brand concept. Verify schedule with clinic before visiting.</p>

          <div className="flex flex-wrap items-center gap-6">
            <button
              type="button"
              onClick={onOpenPrivacyNotice}
              className="hover:text-white transition-colors underline-offset-4 hover:underline"
            >
              Privacy Policy
            </button>
            <button
              type="button"
              onClick={onOpenTerms}
              className="hover:text-white transition-colors underline-offset-4 hover:underline"
            >
              Terms of Use
            </button>
            <button
              type="button"
              onClick={onOpenPreLaunchChecklist}
              className="text-[#20C7E8] hover:text-white transition-colors inline-flex items-center gap-1 font-medium"
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Pre-Launch Verification Checklist</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
