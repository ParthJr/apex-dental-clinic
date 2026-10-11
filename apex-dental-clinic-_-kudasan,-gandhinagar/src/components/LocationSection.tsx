import React, { useState } from 'react';
import { MapPin, Phone, Clock, Navigation, ExternalLink } from 'lucide-react';
import { CLINIC_CONFIG } from '../config/clinicData';

export const LocationSection: React.FC = () => {
  const [mapImageError, setMapImageError] = useState(false);

  return (
    <section id="contact" className="w-full bg-[#FFFFFF] py-20 lg:py-28 text-slate-900 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Clinic Details Left */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="text-[#20C7E8] text-xs font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
                <span className="w-3 h-0.5 bg-[#20C7E8]" aria-hidden="true" />
                <span>PRACTICE LOCATION</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold font-heading text-[#101B35] tracking-tight">
                Visit Apex Dental Clinic
              </h2>
              <p className="mt-2 text-slate-600 text-sm">
                Conveniently positioned in Kudasan, Gandhinagar to serve patients seeking precision care.
              </p>
            </div>

            <div className="space-y-4">
              {/* Address Card */}
              <div className="flex items-start gap-4 p-4 rounded-xl bg-[#F5F9FC] border border-slate-100">
                <div className="w-10 h-10 rounded-lg bg-[#101B35] text-[#20C7E8] flex items-center justify-center shrink-0 shadow-sm">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="text-sm">
                  <p className="font-bold text-[#101B35] font-heading">Address</p>
                  <p className="text-slate-600 mt-0.5 leading-relaxed">
                    {CLINIC_CONFIG.address.unit},<br />
                    {CLINIC_CONFIG.address.locality}, {CLINIC_CONFIG.address.city},<br />
                    {CLINIC_CONFIG.address.state} {CLINIC_CONFIG.address.postalCode}
                  </p>
                </div>
              </div>

              {/* Phone Card */}
              <div className="flex items-start gap-4 p-4 rounded-xl bg-[#F5F9FC] border border-slate-100">
                <div className="w-10 h-10 rounded-lg bg-[#101B35] text-[#20C7E8] flex items-center justify-center shrink-0 shadow-sm">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="text-sm">
                  <p className="font-bold text-[#101B35] font-heading">Direct Telephone</p>
                  <a
                    href={`tel:${CLINIC_CONFIG.telephone.dialable}`}
                    className="text-slate-700 hover:text-[#20C7E8] transition-colors mt-0.5 block font-mono font-semibold"
                  >
                    {CLINIC_CONFIG.telephone.display}
                  </a>
                  <p className="text-[11px] text-slate-400 mt-0.5">Direct clinical reception desk</p>
                </div>
              </div>

              {/* Hours Notice Card */}
              <div className="flex items-start gap-4 p-4 rounded-xl bg-[#F5F9FC] border border-slate-100">
                <div className="w-10 h-10 rounded-lg bg-[#101B35] text-[#20C7E8] flex items-center justify-center shrink-0 shadow-sm">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="text-sm">
                  <p className="font-bold text-[#101B35] font-heading">Hours Notice</p>
                  <p className="text-slate-600 mt-0.5 leading-relaxed">
                    {CLINIC_CONFIG.schedule.note}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href={CLINIC_CONFIG.geo.googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-[#101B35] hover:bg-slate-800 text-white font-bold text-sm transition-all shadow focus-visible:ring-2 focus-visible:ring-[#20C7E8]"
              >
                <Navigation className="w-4 h-4 mr-2" />
                <span>Get Directions</span>
              </a>

              <a
                href={`tel:${CLINIC_CONFIG.telephone.dialable}`}
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-[#20C7E8] hover:bg-[#1bb4d2] text-[#101B35] font-bold text-sm transition-all shadow focus-visible:ring-2 focus-visible:ring-[#101B35]"
              >
                <Phone className="w-4 h-4 mr-2 text-[#101B35]" />
                <span>Call Clinic</span>
              </a>
            </div>
          </div>

          {/* Google Maps / Aerial View Right */}
          <div className="lg:col-span-7 h-full w-full">
            <div className="rounded-2xl overflow-hidden shadow-xl bg-slate-100 relative min-h-[380px] lg:min-h-[460px] flex flex-col justify-end p-6 border border-slate-200 group">
              {!mapImageError ? (
                <div
                  className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{
                    backgroundImage: `url('${CLINIC_CONFIG.images.mapAerial}')`,
                  }}
                  role="img"
                  aria-label="Map location showing Kudasan and Shreedhar Aurum Gandhinagar"
                />
              ) : (
                /* Fallback stylized map canvas */
                <div className="absolute inset-0 w-full h-full bg-[#101B35] flex items-center justify-center p-8">
                  <div className="text-center text-white space-y-3">
                    <MapPin className="w-12 h-12 text-[#20C7E8] mx-auto animate-bounce" />
                    <p className="font-heading font-bold text-lg">Shreedhar Aurum, Kudasan</p>
                    <p className="text-xs text-slate-300">Gandhinagar, Gujarat 382419</p>
                  </div>
                </div>
              )}

              {/* Subtle map gradient scrim */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-[#101B35]/70 via-black/10 to-transparent pointer-events-none"
                aria-hidden="true"
              />

              {/* Overlay Info Chip */}
              <div className="relative z-10 bg-[#101B35]/95 backdrop-blur-md text-white p-4 rounded-xl max-w-sm border border-white/10 shadow-lg">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2 text-[#20C7E8] text-xs font-mono font-bold uppercase">
                    <span className="w-2 h-2 rounded-full bg-[#20C7E8]" />
                    <span>Apex Dental Clinic</span>
                  </div>
                  <a
                    href={CLINIC_CONFIG.geo.googleMapsDirectionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-slate-300 hover:text-white inline-flex items-center gap-1"
                    title="Open in Google Maps"
                  >
                    <span>View Map</span>
                    <ExternalLink className="w-3 h-3 text-[#20C7E8]" />
                  </a>
                </div>
                <p className="text-xs text-slate-300">
                  {CLINIC_CONFIG.address.unit}, Kudasan, Gandhinagar
                </p>
                <p className="text-[10px] text-slate-400 mt-1 font-mono">
                  Coordinates: 23.1834° N, 72.6322° E
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
