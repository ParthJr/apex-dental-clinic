/**
 * Appointment Enquiry Submission Service & Validation Adapter
 * Handles client-side validation, duplicate prevention, and network communication.
 */

export interface AppointmentEnquiry {
  fullName: string;
  mobileNumber: string;
  serviceInterest: string;
  preferredDate: string;
  preferredWindow: 'morning' | 'afternoon' | 'evening';
  notes?: string;
  consent: boolean;
}

export interface ValidationErrors {
  fullName?: string;
  mobileNumber?: string;
  serviceInterest?: string;
  preferredDate?: string;
  preferredWindow?: string;
  notes?: string;
  consent?: string;
  general?: string;
}

export interface SubmissionResponse {
  success: boolean;
  message: string;
  referenceId?: string;
  isDuplicate?: boolean;
}

// Indian mobile number validation regex:
// Supports optional +91 or 0 prefix followed by 10 digits starting with 6, 7, 8, 9
// Or plain 10 digits starting with 6-9
const INDIAN_PHONE_REGEX = /^(?:(?:\+|0{0,2})91(\s*[-]\s*)?|[0]?)?[6789]\d{9}$/;

export function cleanIndianMobile(phone: string): string {
  return phone.replace(/[\s\-()]/g, '');
}

export function validateEnquiry(data: Partial<AppointmentEnquiry>): ValidationErrors {
  const errors: ValidationErrors = {};

  // Full Name validation
  if (!data.fullName || data.fullName.trim().length < 2) {
    errors.fullName = 'Please enter your full name (at least 2 characters).';
  } else if (data.fullName.trim().length > 70) {
    errors.fullName = 'Name cannot exceed 70 characters.';
  }

  // Mobile validation
  if (!data.mobileNumber || !data.mobileNumber.trim()) {
    errors.mobileNumber = 'Mobile number is required for appointment confirmation.';
  } else {
    const cleaned = cleanIndianMobile(data.mobileNumber.trim());
    if (!INDIAN_PHONE_REGEX.test(cleaned)) {
      errors.mobileNumber = 'Please enter a valid 10-digit Indian mobile number (e.g. 94260 16174 or +91 98765 43210).';
    }
  }

  // Service validation
  if (!data.serviceInterest || data.serviceInterest.trim() === '') {
    errors.serviceInterest = 'Please select a clinical service of interest.';
  }

  // Preferred Date validation
  if (!data.preferredDate) {
    errors.preferredDate = 'Please select a preferred date for your visit.';
  } else {
    const selectedDate = new Date(data.preferredDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (isNaN(selectedDate.getTime())) {
      errors.preferredDate = 'Please enter a valid calendar date.';
    } else if (selectedDate < today) {
      errors.preferredDate = 'Appointment date cannot be in the past. Please select today or a future date.';
    }
  }

  // Preferred Window validation
  if (!data.preferredWindow) {
    errors.preferredWindow = 'Please select your preferred time window.';
  }

  // Consent validation
  if (!data.consent) {
    errors.consent = 'Your consent is required for the clinic reception to contact you regarding this appointment.';
  }

  return errors;
}

/**
 * Tracks recent submissions in session storage to prevent rapid double-clicks
 * or duplicate submissions.
 */
function isDuplicateSubmission(enquiry: AppointmentEnquiry): boolean {
  try {
    const recent = sessionStorage.getItem('apex_recent_enquiries');
    if (!recent) return false;
    
    const parsed: Array<{ phone: string; date: string; service: string; timestamp: number }> = JSON.parse(recent);
    const cleanPhone = cleanIndianMobile(enquiry.mobileNumber);
    const now = Date.now();

    // Prevent duplicate request within 5 minutes for the same phone + date
    return parsed.some(
      (entry) =>
        entry.phone === cleanPhone &&
        entry.date === enquiry.preferredDate &&
        now - entry.timestamp < 5 * 60 * 1000
    );
  } catch {
    return false;
  }
}

function recordSubmission(enquiry: AppointmentEnquiry): void {
  try {
    const recent = sessionStorage.getItem('apex_recent_enquiries');
    const parsed = recent ? JSON.parse(recent) : [];
    const cleanPhone = cleanIndianMobile(enquiry.mobileNumber);
    parsed.push({
      phone: cleanPhone,
      date: enquiry.preferredDate,
      service: enquiry.serviceInterest,
      timestamp: Date.now(),
    });
    sessionStorage.setItem('apex_recent_enquiries', JSON.stringify(parsed));
  } catch {
    // Ignore storage quota or disabled storage
  }
}

/**
 * Submits enquiry to the configured backend API endpoint.
 * Includes network error handling and offline preservation.
 */
export async function submitAppointmentEnquiry(enquiry: AppointmentEnquiry): Promise<SubmissionResponse> {
  // 1. Client-side validation check
  const errors = validateEnquiry(enquiry);
  if (Object.keys(errors).length > 0) {
    throw new Error('Please correct highlighted errors before submitting.');
  }

  // 2. Duplicate check
  if (isDuplicateSubmission(enquiry)) {
    return {
      success: false,
      isDuplicate: true,
      message: 'You have already submitted an appointment request for this date recently. Our clinic reception has your details and will call you.',
    };
  }

  // 3. API Dispatch
  try {
    const response = await fetch('/api/enquiries', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...enquiry,
        submittedAt: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const message = errorData.message || `Server responded with status ${response.status}.`;
      throw new Error(message);
    }

    const data = await response.json();
    recordSubmission(enquiry);

    return {
      success: true,
      referenceId: data.referenceId || `APX-${Date.now().toString().slice(-6)}`,
      message: 'Your appointment request has been received. The clinic team will contact you to confirm availability.',
    };
  } catch (err: any) {
    // Honest handling: If server endpoint is unreachable or in non-server preview
    console.warn('[Enquiry Service] API request error:', err);

    // Save copy in emergency backup storage so no patient detail is lost
    try {
      const queue = JSON.parse(localStorage.getItem('apex_offline_enquiry_queue') || '[]');
      queue.push({ ...enquiry, failedAt: new Date().toISOString(), error: err.message });
      localStorage.setItem('apex_offline_enquiry_queue', JSON.stringify(queue));
    } catch {}

    throw new Error(
      err.message || 'Unable to connect to clinic appointment server. Please call 094260 16174 directly.'
    );
  }
}
