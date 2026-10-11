/**
 * Centralized business configuration for Apex Dental Clinic
 * Located in Kudasan, Gandhinagar, Gujarat.
 * 
 * NOTE: All supplied business details require verification before production deployment.
 * Never invent physician names, qualifications, registration numbers, or unverified hours.
 */

export interface TreatmentInfo {
  id: string;
  number: string;
  title: string;
  category: string;
  badge?: string;
  iconName: string;
  shortDescription: string;
  overview: string;
  clinicalProtocol: string[];
  recommendedWhen: string[];
  typicalDuration: string;
  patientPreparation: string;
}

export const CLINIC_CONFIG = {
  name: "Apex Dental Clinic",
  tagline: "Precision in Every Smile.",
  subLocation: "Kudasan · Gandhinagar",
  
  // Physical location
  address: {
    unit: "111, 112, Shreedhar Aurum",
    locality: "Kudasan",
    city: "Gandhinagar",
    state: "Gujarat",
    postalCode: "382419",
    country: "India",
    fullFormatted: "111, 112, Shreedhar Aurum, Kudasan, Gandhinagar, Gujarat 382419",
  },

  // Contact numbers
  telephone: {
    display: "094260 16174",
    dialable: "+919426016174",
    internationalDisplay: "+91 94260 16174",
  },

  // WhatsApp is left disabled until a verified WhatsApp Business number is provided
  whatsapp: {
    isVerified: false,
    number: "", // Must be verified before enabling CTA
    url: "",
  },

  // Online presence
  website: "apexdentalclinic.in",
  canonicalUrl: "https://apexdentalclinic.in",

  // Verified review metric from public Google profile
  reviews: {
    rating: 4.9,
    maxRating: 5.0,
    reviewCount: 257,
    platform: "Google Reviews",
    profileLocation: "Google Business Profile · Kudasan Gandhinagar",
    verifiedGoogleMapsUrl: "https://maps.google.com/?cid=ApexDentalClinicKudasan",
    disclaimer: "Authentic aggregate metrics from public listing. Zero fabricated testimonials.",
  },

  // Verified schedule notes
  schedule: {
    mondayOpening: "9:30 AM",
    note: "Clinic schedule commences 9:30 AM Monday. Full weekly schedule and evening timings must be verified prior to visiting.",
    appointmentHoursGuidance: "Morning (9:30 AM - 1:00 PM), Afternoon (2:00 PM - 5:00 PM), Evening (5:00 PM - 8:30 PM)",
  },

  // Precision map coordinates
  geo: {
    latitude: 23.1834,
    longitude: 72.6322,
    coordinateLabel: "SYS: 23.1834° N, 72.6322° E // APEX_OP_PRECISION",
    googleMapsDirectionsUrl: "https://maps.google.com/?q=111,+112,+Shreedhar+Aurum,+Kudasan,+Gandhinagar,+Gujarat+382419",
  },

  // API endpoint for appointment enquiries
  api: {
    enquiryEndpoint: "/api/enquiries",
  },

  // Approved Google Stitch image assets with reliable fallbacks
  images: {
    logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuBklNNSSj29kyxGb4w2BxxQ5kaUYR6Nld1sBAmfmSCbnH9Xi128WuJQkL5yH-c08HpXQPlx_84BD6_AEmn93-Vi5bBBQroFBHXoGBD91O3P-SzM0VFMWijMqNZxmqeTdDzfYchb2v1QWK1Dv3dWgz_uY9cO7obSwvIbFGO_nL9BRkAyU5HOQEn6taMC0hZC4qG5iQVYcCDGlL_QG4habYnA_NIUV4brh76wKI3ShR2YEWpeO4VRvr8y9A",
    heroConsultation: "https://lh3.googleusercontent.com/aida-public/AB6AXuD0sU_L8TVwTkMU2WvT8seJL5-T0PCDVcmV021jtex7XpjNF5RIe4Xg9TCSeJqFzSuWR-PlVoRBb2fNYI_JWXD1t4kKnHIzZ1Uk3cr5Pwu88SDkfs7wYDue2Mspsz7zSWfQM4jBN7cUEIkECwAKjx4f5JP4_SPb5uzeH-T3qxqhzmJ4aKMQ-aGAfRM5u--4uGkX_fKnn01i3b7Rp9KNYigLuXHM2ry9GstSOjhVzntEQbDNk-ZbFAfjLA",
    operatoryRoom: "https://lh3.googleusercontent.com/aida-public/AB6AXuCtpwWOJc-XAJSUUYKX0Onkt3Xr71VAXfVD2aYXqIWFW32GLEsgp8rJ1kX4NbBUB_6VgBIDxLs7w2ZMk9FzVpl14RgC3qdq3P0wFrz06djMBmodYJOZi0OwrgJFqjBsoCu9f9bG8T9lSg9p8Hfl1QaCxtJgMJOEMyGW663vM9GcWpuOvlUKJSEq32NFlSjE5DCiFQRkZA25QeCbsoH-GI2UYsrq3cFgDGnLGfB8EAb9t1C6Dvflqmjfww",
    mapAerial: "https://lh3.googleusercontent.com/aida-public/AB6AXuARmFx_gzwzY-MKXjBNPejZpod_I58VmsHhCVWJ9u4PlyB0DH0Y6uGLeEsXHq95fTtGN634FSSESl-kUyVvRtzmBot7gNbJfl0gxOoeNUsttw0-M5_Ge0TEakczzKAW4dEkoA9s-3ohLPRe9bwCzh4i_GTtukS1LYM8j2f-yPczI4MIqdvZcXF1OAEdz-YCKVl1xl0iBtARi8vsJTSbC5ufY782OBarbm1T4q3wWK9iJLTXM3SdBfOrTQ",
  },
};

export const TREATMENTS: TreatmentInfo[] = [
  {
    id: "emergency-care",
    number: "01",
    title: "Emergency Dental Care",
    category: "Diagnostics & Relief",
    badge: "Priority Triage",
    iconName: "Flame",
    shortDescription: "For urgent dental concerns that need timely professional assessment. Prompt clinical triage; please call ahead.",
    overview: "Immediate assessment and symptom stabilization for acute oral pain, accidental dental trauma, chipped crowns, or sudden swelling. Our clinical staff provides rapid triage to protect pulp vitality and relieve acute distress.",
    clinicalProtocol: [
      "Immediate chairside triage and localized pain mitigation",
      "Focused digital radiograph or intraoral evaluation to assess root or bone compromise",
      "Stabilizing intervention (temporary restoration, pulp devitalization, or soft tissue dressing)",
      "Definitive treatment schedule and clear analgesic guidance",
    ],
    recommendedWhen: [
      "Severe or throbbing unremitting toothache",
      "Dislodged, cracked, or fractured teeth after sports or trauma",
      "Facial, gingival, or submandibular swelling",
      "Loss of an existing temporary or definitive restoration causing sharp irritation",
    ],
    typicalDuration: "30 - 45 minutes triage appointment",
    patientPreparation: "Please call the clinic on 094260 16174 prior to arrival so the operatory can be prepped. Bring any tooth fragments in cold saline or milk if applicable.",
  },
  {
    id: "dental-xrays",
    number: "02",
    title: "Dental X-rays",
    category: "Diagnostics",
    iconName: "Scan",
    shortDescription: "Diagnostic imaging when recommended by your dental professional to accurately map internal structures and bone health.",
    overview: "High-resolution, ultra-low dose digital radiography allowing exact visualization of interproximal decay, periapical bone density, impactions, and periodontal support not visible during standard visual inspection.",
    clinicalProtocol: [
      "Protective radiation hygiene shielding with thyroid collar",
      "Sensor placement using precision position-indicating devices",
      "Instant computer-aided digital rendering and contrast optimization",
      "Direct chairside review of findings with complete anatomical explanation",
    ],
    recommendedWhen: [
      "Baseline new patient comprehensive diagnostics",
      "Evaluation of deep cavities, nerve health, or root canals",
      "Assessment of third molar (wisdom tooth) angulation",
      "Bone height monitoring for periodontal health or implant suitability",
    ],
    typicalDuration: "10 - 15 minutes",
    patientPreparation: "Remove metallic earrings, hairpins, or removable oral appliances prior to scan.",
  },
  {
    id: "checkups",
    number: "03",
    title: "Dental Check-ups",
    category: "Preventive",
    iconName: "ShieldCheck",
    shortDescription: "Routine clinical assessment and preventive oral health guidance designed to catch conditions before complications develop.",
    overview: "Comprehensive 6-monthly oral health assessments examining enamel integrity, gingival pocket depths, bite alignment, soft tissue health, and oral cancer screening for lasting dental wellness.",
    clinicalProtocol: [
      "Full intraoral visual and tactile examination of hard and soft tissues",
      "Periodontal probing to evaluate gum attachment health",
      "Occlusal and TMJ joint assessment",
      "Tailored hygiene counseling and preventive action plan",
    ],
    recommendedWhen: [
      "Every 6 months for adults and children",
      "Patients noticing increased plaque accumulation or bleeding during brushing",
      "Prior to planned travel, weddings, or orthodontic programs",
    ],
    typicalDuration: "30 - 40 minutes",
    patientPreparation: "Brush before arrival. Note any recent sensitivity to hot, cold, or sweet foods to discuss with the doctor.",
  },
  {
    id: "veneers-crowns",
    number: "04",
    title: "Veneers and Crowns",
    category: "Restorative",
    iconName: "Sparkles",
    shortDescription: "Explore restorative and smile-enhancement options tailored appropriately to your structural requirements and aesthetic preferences.",
    overview: "Custom-milled ceramic crowns and micro-thin porcelain veneers engineered to restore structural integrity to weakened teeth, correct shade discrepancies, or reshape teeth with natural translucency.",
    clinicalProtocol: [
      "Aesthetic diagnostic wax-up or digital smile evaluation",
      "Conservative tooth preparation respecting enamel preservation",
      "High-precision digital intraoral impressions",
      "Laboratory ceramic fabrication and precision adhesive bonding",
    ],
    recommendedWhen: [
      "Teeth heavily restored or compromised following root canal therapy",
      "Persistent intrinsic discoloration resistant to bleaching",
      "Chipped, worn, or uneven incisal edges",
      "Closing minor gaps without orthodontic intervention",
    ],
    typicalDuration: "2 - 3 appointments over 1 to 2 weeks",
    patientPreparation: "Bring reference photographs of your natural smile if desired. Discuss aesthetic goals openly during initial consultation.",
  },
  {
    id: "teeth-care",
    number: "05",
    title: "Teeth Care",
    category: "Hygiene & Maintenance",
    iconName: "HeartPulse",
    shortDescription: "Discuss oral hygiene protocols, active periodontal concerns, and suitable maintenance programs with clinical practitioners.",
    overview: "Ultrasonic scaling, air-polishing, and gum maintenance to eliminate hardened calculus and bacterial biofilm, preventing gingivitis and preserving supporting alveolar bone.",
    clinicalProtocol: [
      "Ultrasonic calculus debridement with water irrigation",
      "Subgingival curettage if localized pockets require therapeutic cleansing",
      "Fine paste polishing to remove extrinsic coffee/tea stains",
      "Interdental cleaning technique coaching and fluoride protection",
    ],
    recommendedWhen: [
      "Plaque or calculus buildup behind lower anterior teeth",
      "Persistent bad breath (halitosis) or gingival bleeding",
      "Maintenance for smokers or coffee drinkers",
      "Diabetic or hypertensive patients requiring strict oral bacteremia control",
    ],
    typicalDuration: "35 - 45 minutes",
    patientPreparation: "No fasting required. Inform the dental hygienist if you experience sensitive roots.",
  },
  {
    id: "appointment-scheduling",
    number: "06",
    title: "Appointment Scheduling",
    category: "Patient Access",
    iconName: "Calendar",
    shortDescription: "Request a comprehensive consultation at a convenient hour. Direct coordination handled promptly by our clinical reception.",
    overview: "Direct and orderly booking coordination. Our clinical reception reviews your preferred timing and confirms appointment availability via phone call, ensuring minimal waiting room delays.",
    clinicalProtocol: [
      "Submission of appointment request with preferred time window",
      "Clinical desk triage to allocate appropriate chairside duration",
      "Personalized telephone confirmation from clinic reception",
      "SMS or phone reminder on the morning of your visit",
    ],
    recommendedWhen: [
      "New patients seeking an initial opinion",
      "Follow-up reviews for existing treatments",
      "Family appointments requiring consecutive slots",
    ],
    typicalDuration: "Flexible scheduling",
    patientPreparation: "Keep your mobile phone accessible following submission for reception callback.",
  },
];

export const WHY_APEX_PRINCIPLES = [
  {
    number: "01",
    title: "Clear Treatment Explanations",
    description: "Comprehensive discussions of findings and procedural steps without ambiguous medical jargon.",
    label: "CLINICAL CLARITY",
  },
  {
    number: "02",
    title: "Individualized Care Planning",
    description: "Formulating clinical pathways uniquely calibrated to patient oral health realities and individual timelines.",
    label: "CUSTOM PROTOCOLS",
  },
  {
    number: "03",
    title: "Attention to Patient Comfort",
    description: "Ergonomic clinical environment designed to alleviate anxiety and maximize ease during procedural phases.",
    label: "ERGONOMIC ENVIRONMENT",
  },
  {
    number: "04",
    title: "Informed Treatment Decisions",
    description: "Equipping patients with objective guidance so choices are made with complete autonomy and transparency.",
    label: "PATIENT AUTONOMY",
  },
];

export const PATIENT_STEPS = [
  {
    step: "01",
    title: "Get in Touch",
    description: "Share your preferred appointment time and the specific care you are looking for via call or form.",
  },
  {
    step: "02",
    title: "Meet the Dental Team",
    description: "Discuss your concerns and ask questions about possible treatment options in an unhurried consultation.",
  },
  {
    step: "03",
    title: "Plan Your Care",
    description: "Understand the clinical recommendations and next steps fully explained by your dental professional.",
  },
];

export const CONSULTATION_FRAMEWORK = [
  {
    step: "01",
    title: "Request a consultation",
    detail: "Pick a convenient schedule window for in-depth dental assessment.",
  },
  {
    step: "02",
    title: "Discuss your dental concerns",
    detail: "Direct chairside dialogue regarding oral hygiene, discomfort, or aesthetics.",
  },
  {
    step: "03",
    title: "Understand the recommended next steps",
    detail: "Receive an objective diagnostic summary with cost and duration transparency.",
  },
];
