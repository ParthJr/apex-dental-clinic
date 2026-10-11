import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TreatmentGrid } from './components/TreatmentGrid';
import { WhyApex } from './components/WhyApex';
import { TreatmentSpotlight } from './components/TreatmentSpotlight';
import { PatientJourney } from './components/PatientJourney';
import { ReviewsSummary } from './components/ReviewsSummary';
import { AppointmentForm } from './components/AppointmentForm';
import { LocationSection } from './components/LocationSection';
import { Footer } from './components/Footer';
import { TreatmentDetailModal } from './components/TreatmentDetailModal';
import { PrivacyNoticeModal } from './components/PrivacyNoticeModal';
import { TermsModal } from './components/TermsModal';
import { PreLaunchChecklistModal } from './components/PreLaunchChecklistModal';
import { TreatmentInfo, TREATMENTS } from './config/clinicData';

export default function App() {
  const [selectedTreatment, setSelectedTreatment] = useState<TreatmentInfo | null>(null);
  const [prefilledService, setPrefilledService] = useState<string>('');
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [isChecklistModalOpen, setIsChecklistModalOpen] = useState(false);

  const scrollToAppointmentForm = (serviceName?: string) => {
    if (serviceName) {
      setPrefilledService(serviceName);
    }
    const element = document.getElementById('appointment-booking');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTreatments = () => {
    const element = document.getElementById('treatments');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectTreatmentByName = (treatmentName: string) => {
    const found = TREATMENTS.find(
      (t) => t.title.toLowerCase() === treatmentName.toLowerCase()
    );
    if (found) {
      setSelectedTreatment(found);
    } else {
      scrollToAppointmentForm(treatmentName);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F9FC] text-[#182230]">
      {/* 1. HEADER */}
      <Header onOpenConsultation={() => scrollToAppointmentForm()} />

      {/* MAIN CONTENT RUN */}
      <main className="flex-1 w-full flex flex-col">
        {/* 2. HERO: "Precision in Every Smile." */}
        <Hero
          onBookConsultation={() => scrollToAppointmentForm()}
          onExploreTreatments={scrollToTreatments}
        />

        {/* 3. TREATMENT DISCOVERY GRID */}
        <TreatmentGrid
          onSelectTreatment={(treatment) => setSelectedTreatment(treatment)}
          onBookService={(service) => scrollToAppointmentForm(service)}
        />

        {/* 4. WHY CHOOSE APEX */}
        <WhyApex />

        {/* 5. TREATMENT SPOTLIGHT */}
        <TreatmentSpotlight
          onScheduleVisit={() => scrollToAppointmentForm()}
        />

        {/* 6. THREE-STEP PATIENT JOURNEY */}
        <PatientJourney />

        {/* 7. GOOGLE REVIEW SUMMARY */}
        <ReviewsSummary />

        {/* 8. APPOINTMENT FORM */}
        <AppointmentForm
          initialService={prefilledService}
          onOpenPrivacyNotice={() => setIsPrivacyModalOpen(true)}
        />

        {/* 9. LOCATION AND CONTACT */}
        <LocationSection />
      </main>

      {/* 10. FOOTER */}
      <Footer
        onOpenPrivacyNotice={() => setIsPrivacyModalOpen(true)}
        onOpenTerms={() => setIsTermsModalOpen(true)}
        onOpenPreLaunchChecklist={() => setIsChecklistModalOpen(true)}
        onSelectTreatmentByName={handleSelectTreatmentByName}
      />

      {/* INTERACTIVE MODALS */}
      <TreatmentDetailModal
        treatment={selectedTreatment}
        onClose={() => setSelectedTreatment(null)}
        onBookService={(service) => scrollToAppointmentForm(service)}
      />

      <PrivacyNoticeModal
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
      />

      <TermsModal
        isOpen={isTermsModalOpen}
        onClose={() => setIsTermsModalOpen(false)}
      />

      <PreLaunchChecklistModal
        isOpen={isChecklistModalOpen}
        onClose={() => setIsChecklistModalOpen(false)}
      />
    </div>
  );
}
