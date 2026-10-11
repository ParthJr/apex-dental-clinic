import React, { useState, useEffect } from 'react';
import { Phone, CheckCircle2, AlertCircle, Loader2, CalendarClock } from 'lucide-react';
import { CLINIC_CONFIG, TREATMENTS } from '../config/clinicData';
import {
  AppointmentEnquiry,
  ValidationErrors,
  validateEnquiry,
  submitAppointmentEnquiry,
} from '../services/enquiryService';

interface AppointmentFormProps {
  initialService?: string;
  onOpenPrivacyNotice: () => void;
}

export const AppointmentForm: React.FC<AppointmentFormProps> = ({
  initialService = '',
  onOpenPrivacyNotice,
}) => {
  const [formData, setFormData] = useState<AppointmentEnquiry>({
    fullName: '',
    mobileNumber: '',
    serviceInterest: initialService,
    preferredDate: '',
    preferredWindow: 'morning',
    notes: '',
    consent: false,
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [referenceId, setReferenceId] = useState<string | null>(null);

  // Update selected service if parent triggers change
  useEffect(() => {
    if (initialService) {
      setFormData((prev) => ({ ...prev, serviceInterest: initialService }));
    }
  }, [initialService]);

  // Compute today's date string YYYY-MM-DD for min date constraint
  const todayString = new Date().toISOString().split('T')[0];

  const handleBlur = (field: keyof AppointmentEnquiry) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const currentErrors = validateEnquiry(formData);
    setErrors((prev) => ({ ...prev, [field]: currentErrors[field] }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Clear error once user types
    if (errors[name as keyof ValidationErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    if (submitError) {
      setSubmitError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all touched
    const allTouched = {
      fullName: true,
      mobileNumber: true,
      serviceInterest: true,
      preferredDate: true,
      preferredWindow: true,
      consent: true,
    };
    setTouched(allTouched);

    const validationErrors = validateEnquiry(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      // Focus on first erroneous input for accessibility
      const firstErrorField = Object.keys(validationErrors)[0];
      const element = document.getElementById(firstErrorField);
      if (element) {
        element.focus();
      }
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await submitAppointmentEnquiry(formData);
      if (response.success) {
        setSubmitSuccess(true);
        setReferenceId(response.referenceId || null);
      } else if (response.isDuplicate) {
        setSubmitError(response.message);
      }
    } catch (err: any) {
      setSubmitError(
        err.message || 'Unable to submit enquiry at this time. Please call 094260 16174 directly.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      mobileNumber: '',
      serviceInterest: '',
      preferredDate: '',
      preferredWindow: 'morning',
      notes: '',
      consent: false,
    });
    setErrors({});
    setTouched({});
    setSubmitSuccess(false);
    setSubmitError(null);
    setReferenceId(null);
  };

  return (
    <section
      id="appointment-booking"
      className="w-full bg-[#F5F9FC] py-20 lg:py-28 text-slate-900 scroll-mt-12"
    >
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="text-[#20C7E8] text-xs font-bold uppercase tracking-widest mb-2 flex items-center justify-center gap-2">
            <span className="w-3 h-0.5 bg-[#20C7E8]" aria-hidden="true" />
            <span>CLINICAL CONSULTATION</span>
            <span className="w-3 h-0.5 bg-[#20C7E8]" aria-hidden="true" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-[#101B35] tracking-tight">
            Your Next Visit Starts Here.
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base max-w-xl mx-auto">
            Complete the form below to request an appointment slot. Our reception team will review availability and confirm your booking via phone call.
          </p>
        </div>

        {/* Elevated Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12 border border-slate-100">
          {/* Confirmed Successful Submission State */}
          {submitSuccess ? (
            <div
              tabIndex={-1}
              role="alert"
              className="p-8 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 flex flex-col items-center text-center space-y-4"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-inner">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div className="space-y-2 max-w-lg">
                <h3 className="text-xl font-bold font-heading text-emerald-950">
                  Request Received
                </h3>
                {referenceId && (
                  <p className="text-xs font-mono text-emerald-700 font-semibold bg-emerald-100/70 inline-block px-3 py-1 rounded">
                    Reference ID: {referenceId}
                  </p>
                )}
                <p className="text-sm text-emerald-900 leading-relaxed font-medium pt-2">
                  "Your appointment request has been received. The clinic team will contact you to confirm availability."
                </p>
                <p className="text-xs text-emerald-800 leading-relaxed pt-1">
                  Please keep your phone accessible at <span className="font-semibold">{formData.mobileNumber}</span>. Please note that an appointment is only confirmed once reception speaks with you.
                </p>
              </div>

              <div className="pt-4 flex flex-wrap gap-4 justify-center">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-6 py-2.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs tracking-wider uppercase transition-colors"
                >
                  Submit Another Enquiry
                </button>
                <a
                  href={`tel:${CLINIC_CONFIG.telephone.dialable}`}
                  className="px-6 py-2.5 rounded-lg bg-white border border-emerald-300 text-emerald-900 hover:bg-emerald-50 font-semibold text-xs transition-colors inline-flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Call Reception Now</span>
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              {/* Submission Error Banner */}
              {submitError && (
                <div
                  role="alert"
                  className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-3"
                >
                  <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div className="text-xs sm:text-sm">
                    <p className="font-semibold text-amber-950">Appointment Notice</p>
                    <p className="text-amber-800 mt-0.5">{submitError}</p>
                    <p className="mt-2 text-xs">
                      If urgent, call the clinic directly at{' '}
                      <a
                        href={`tel:${CLINIC_CONFIG.telephone.dialable}`}
                        className="underline font-bold text-amber-950"
                      >
                        {CLINIC_CONFIG.telephone.display}
                      </a>
                      .
                    </p>
                  </div>
                </div>
              )}

              {/* Row 1: Full Name & Mobile Number */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="fullName"
                    className="block text-xs font-bold uppercase tracking-wider text-slate-700"
                  >
                    Full Name <span className="text-rose-600" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    onBlur={() => handleBlur('fullName')}
                    aria-invalid={!!errors.fullName}
                    aria-describedby={errors.fullName ? 'fullName-error' : undefined}
                    placeholder="e.g. Dr. Aryan Patel"
                    className={`w-full px-4 py-3 rounded-lg bg-[#F5F9FC] text-slate-900 text-sm border transition-all ${
                      errors.fullName && touched.fullName
                        ? 'border-rose-500 focus:ring-2 focus:ring-rose-400 bg-rose-50/20'
                        : 'border-slate-200 focus:border-[#20C7E8] focus:ring-2 focus:ring-[#20C7E8]/30'
                    } focus:outline-none`}
                  />
                  {errors.fullName && touched.fullName && (
                    <p id="fullName-error" className="text-xs text-rose-600 flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.fullName}</span>
                    </p>
                  )}
                </div>

                {/* Mobile Number */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="mobileNumber"
                    className="block text-xs font-bold uppercase tracking-wider text-slate-700"
                  >
                    Mobile Number <span className="text-rose-600" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="mobileNumber"
                    name="mobileNumber"
                    type="tel"
                    required
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    onBlur={() => handleBlur('mobileNumber')}
                    aria-invalid={!!errors.mobileNumber}
                    aria-describedby={errors.mobileNumber ? 'mobileNumber-error' : undefined}
                    placeholder="+91 98765 43210 or 94260 16174"
                    className={`w-full px-4 py-3 rounded-lg bg-[#F5F9FC] text-slate-900 text-sm border transition-all ${
                      errors.mobileNumber && touched.mobileNumber
                        ? 'border-rose-500 focus:ring-2 focus:ring-rose-400 bg-rose-50/20'
                        : 'border-slate-200 focus:border-[#20C7E8] focus:ring-2 focus:ring-[#20C7E8]/30'
                    } focus:outline-none font-mono text-sm`}
                  />
                  {errors.mobileNumber && touched.mobileNumber && (
                    <p id="mobileNumber-error" className="text-xs text-rose-600 flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.mobileNumber}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Row 2: Service Required, Preferred Date, Preferred Window */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {/* Service of Interest */}
                <div className="space-y-1.5 sm:col-span-1">
                  <label
                    htmlFor="serviceInterest"
                    className="block text-xs font-bold uppercase tracking-wider text-slate-700"
                  >
                    Service Required <span className="text-rose-600" aria-hidden="true">*</span>
                  </label>
                  <select
                    id="serviceInterest"
                    name="serviceInterest"
                    required
                    value={formData.serviceInterest}
                    onChange={handleChange}
                    onBlur={() => handleBlur('serviceInterest')}
                    aria-invalid={!!errors.serviceInterest}
                    aria-describedby={errors.serviceInterest ? 'serviceInterest-error' : undefined}
                    className={`w-full px-4 py-3 rounded-lg bg-[#F5F9FC] text-slate-900 text-sm border transition-all ${
                      errors.serviceInterest && touched.serviceInterest
                        ? 'border-rose-500 focus:ring-2 focus:ring-rose-400 bg-rose-50/20'
                        : 'border-slate-200 focus:border-[#20C7E8] focus:ring-2 focus:ring-[#20C7E8]/30'
                    } focus:outline-none`}
                  >
                    <option value="">Select Service...</option>
                    {TREATMENTS.map((t) => (
                      <option key={t.id} value={t.title}>
                        {t.title}
                      </option>
                    ))}
                    <option value="General Consultation">General Consultation / Not Sure</option>
                  </select>
                  {errors.serviceInterest && touched.serviceInterest && (
                    <p id="serviceInterest-error" className="text-xs text-rose-600 flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.serviceInterest}</span>
                    </p>
                  )}
                </div>

                {/* Preferred Date */}
                <div className="space-y-1.5 sm:col-span-1">
                  <label
                    htmlFor="preferredDate"
                    className="block text-xs font-bold uppercase tracking-wider text-slate-700"
                  >
                    Preferred Date <span className="text-rose-600" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="preferredDate"
                    name="preferredDate"
                    type="date"
                    min={todayString}
                    required
                    value={formData.preferredDate}
                    onChange={handleChange}
                    onBlur={() => handleBlur('preferredDate')}
                    aria-invalid={!!errors.preferredDate}
                    aria-describedby={errors.preferredDate ? 'preferredDate-error' : undefined}
                    className={`w-full px-4 py-3 rounded-lg bg-[#F5F9FC] text-slate-900 text-sm border transition-all ${
                      errors.preferredDate && touched.preferredDate
                        ? 'border-rose-500 focus:ring-2 focus:ring-rose-400 bg-rose-50/20'
                        : 'border-slate-200 focus:border-[#20C7E8] focus:ring-2 focus:ring-[#20C7E8]/30'
                    } focus:outline-none`}
                  />
                  {errors.preferredDate && touched.preferredDate && (
                    <p id="preferredDate-error" className="text-xs text-rose-600 flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.preferredDate}</span>
                    </p>
                  )}
                </div>

                {/* Preferred Window */}
                <div className="space-y-1.5 sm:col-span-1">
                  <label
                    htmlFor="preferredWindow"
                    className="block text-xs font-bold uppercase tracking-wider text-slate-700"
                  >
                    Preferred Window <span className="text-rose-600" aria-hidden="true">*</span>
                  </label>
                  <select
                    id="preferredWindow"
                    name="preferredWindow"
                    required
                    value={formData.preferredWindow}
                    onChange={handleChange}
                    onBlur={() => handleBlur('preferredWindow')}
                    className="w-full px-4 py-3 rounded-lg bg-[#F5F9FC] text-slate-900 text-sm border border-slate-200 focus:border-[#20C7E8] focus:ring-2 focus:ring-[#20C7E8]/30 focus:outline-none transition-all"
                  >
                    <option value="morning">Morning (9:30 AM - 1:00 PM)</option>
                    <option value="afternoon">Afternoon (2:00 PM - 5:00 PM)</option>
                    <option value="evening">Evening (5:00 PM - 8:30 PM)</option>
                  </select>
                </div>
              </div>

              {/* Row 3: Optional Notes / Symptoms */}
              <div className="space-y-1.5">
                <label
                  htmlFor="notes"
                  className="block text-xs font-bold uppercase tracking-wider text-slate-700"
                >
                  Symptoms or Notes <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  rows={3}
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Briefly describe what you would like addressed during this visit (e.g. sensitivity, routine cleanup, broken tooth)..."
                  className="w-full px-4 py-3 rounded-lg bg-[#F5F9FC] text-slate-900 text-sm border border-slate-200 focus:border-[#20C7E8] focus:ring-2 focus:ring-[#20C7E8]/30 focus:outline-none transition-all"
                />
              </div>

              {/* Row 4: Privacy & Contact Consent */}
              <div className="space-y-1.5 pt-1">
                <div className="flex items-start gap-3">
                  <input
                    id="consent"
                    name="consent"
                    type="checkbox"
                    required
                    checked={formData.consent}
                    onChange={handleChange}
                    onBlur={() => handleBlur('consent')}
                    aria-invalid={!!errors.consent}
                    aria-describedby={errors.consent ? 'consent-error' : undefined}
                    className="mt-1 w-4 h-4 rounded text-[#20C7E8] focus:ring-[#20C7E8] border-slate-300 cursor-pointer"
                  />
                  <label htmlFor="consent" className="text-xs text-slate-600 leading-normal cursor-pointer select-none">
                    I agree to be contacted by Apex Dental Clinic regarding this consultation request. No marketing spam. Read our{' '}
                    <button
                      type="button"
                      onClick={onOpenPrivacyNotice}
                      className="text-[#101B35] font-semibold underline hover:text-[#20C7E8]"
                    >
                      Privacy Notice
                    </button>
                    .
                  </label>
                </div>
                {errors.consent && touched.consent && (
                  <p id="consent-error" className="text-xs text-rose-600 flex items-center gap-1 pl-7">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.consent}</span>
                  </p>
                )}
              </div>

              {/* Form Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-[#20C7E8] hover:bg-[#1bb4d2] disabled:opacity-70 text-[#101B35] font-bold text-sm tracking-wide transition-all shadow-md hover:shadow-lg focus-visible:ring-2 focus-visible:ring-[#101B35] inline-flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-[#101B35]" />
                      <span>Sending Request...</span>
                    </>
                  ) : (
                    <>
                      <CalendarClock className="w-4 h-4 text-[#101B35]" />
                      <span>Request an Appointment</span>
                    </>
                  )}
                </button>

                <a
                  href={`tel:${CLINIC_CONFIG.telephone.dialable}`}
                  className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-sm font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-[#101B35]"
                >
                  <Phone className="w-4 h-4 mr-2 text-[#20C7E8]" />
                  <span>Call Directly: {CLINIC_CONFIG.telephone.display}</span>
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
