import React, { useState, useEffect } from 'react';
import { Phone, Menu, X, ArrowRight, User } from 'lucide-react';
import { CLINIC_CONFIG } from '../config/clinicData';

interface HeaderProps {
  onOpenConsultation: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenConsultation }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle escape key to close menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const navItems = [
    { label: 'Home', href: '#top' },
    { label: 'Treatments', href: '#treatments' },
    { label: 'Why Apex', href: '#why-apex' },
    { label: 'Patient Guide', href: '#patient-guide' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-200 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.08)] py-3'
            : 'bg-white py-4 shadow-[0_1px_4px_rgba(0,0,0,0.04)]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between gap-6">
          {/* Brand Wordmark & Location */}
          <a
            href="#top"
            className="flex items-center gap-3 group focus-visible:ring-2 focus-visible:ring-[#20C7E8] rounded-lg p-1"
          >
            {/* Tooth / Apex Crest Logo */}
            <div className="w-10 h-10 rounded-lg bg-[#101B35] flex items-center justify-center text-[#20C7E8] shadow-sm shrink-0 group-hover:bg-[#182230] transition-colors">
              <svg
                viewBox="0 0 24 24"
                className="w-6 h-6 fill-current"
                aria-hidden="true"
              >
                <path d="M12 2C7.5 2 4 4.5 4 8c0 3.2 2.3 6.3 3.5 10 .8 2.5 2.1 4 4.5 4s3.7-1.5 4.5-4C17.7 14.3 20 11.2 20 8c0-3.5-3.5-6-8-6zm0 17.5c-1.8 0-2.8-1.4-3.5-3.5C7.3 12.8 5.6 9.8 5.6 8c0-2.6 2.8-4.5 6.4-4.5s6.4 1.9 6.4 4.5c0 1.8-1.7 4.8-2.9 8-0.7 2.1-1.7 3.5-3.5 3.5z" />
                <path d="M12 5.5c-2.2 0-4 1.8-4 4 0 1.2.5 2.3 1.3 3.1l1.4-1.4c-.4-.5-.7-1.1-.7-1.7 0-1.1.9-2 2-2s2 .9 2 2c0 .6-.3 1.2-.7 1.7l1.4 1.4c.8-.8 1.3-1.9 1.3-3.1 0-2.2-1.8-4-4-4z" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-[#101B35] leading-tight font-heading uppercase">
                {CLINIC_CONFIG.name}
              </span>
              <span className="text-[10px] font-semibold tracking-widest text-[#20C7E8] uppercase">
                {CLINIC_CONFIG.subLocation}
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav
            aria-label="Primary navigation"
            className="hidden lg:flex items-center gap-8 text-sm font-medium"
          >
            {navItems.map((item, idx) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className={`transition-colors whitespace-nowrap py-1 ${
                  idx === 0
                    ? 'text-[#101B35] font-semibold border-b-2 border-[#20C7E8]'
                    : 'text-slate-600 hover:text-[#101B35]'
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Action CTAs: Direct Call & Consultation */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            <a
              href={`tel:${CLINIC_CONFIG.telephone.dialable}`}
              className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-[#101B35] hover:text-[#20C7E8] transition-colors py-2 px-3 rounded-lg hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-[#20C7E8]"
              title="Call Apex Dental Clinic"
            >
              <Phone className="w-4 h-4 text-[#20C7E8]" />
              <span className="hidden xl:inline">{CLINIC_CONFIG.telephone.display}</span>
            </a>

            <button
              type="button"
              onClick={onOpenConsultation}
              className="inline-flex items-center justify-center bg-[#101B35] hover:bg-[#182230] text-white font-semibold text-xs sm:text-sm px-4 sm:px-5 py-2.5 rounded-full transition-all shadow-[0_2px_8px_rgba(16,27,53,0.18)] hover:shadow-md focus-visible:ring-2 focus-visible:ring-[#20C7E8]"
            >
              <span>Book a Consultation</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1.5 hidden sm:inline" />
            </button>

            {/* Clinical Avatar Badge */}
            <div
              className="w-8 h-8 rounded-full bg-slate-100 hidden md:flex items-center justify-center text-[#101B35] border border-slate-200"
              title="Kudasan Clinical Practice"
              aria-hidden="true"
            >
              <User className="w-4 h-4 text-slate-600" />
            </div>

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden flex items-center justify-center p-2 rounded-lg text-slate-700 hover:text-[#101B35] hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-[#20C7E8]"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden pt-20"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="bg-white border-b border-slate-200 px-6 py-6 space-y-4 shadow-xl max-h-[calc(100vh-5rem)] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col space-y-3 pb-4 border-b border-slate-100">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className="text-base font-semibold text-[#101B35] hover:text-[#20C7E8] transition-colors py-2 px-1 rounded-md"
                >
                  {item.label}
                </a>
              ))}
            </div>

            <div className="space-y-3 pt-2">
              <a
                href={`tel:${CLINIC_CONFIG.telephone.dialable}`}
                className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-lg bg-slate-100 text-[#101B35] font-semibold text-sm hover:bg-slate-200 transition-colors"
              >
                <Phone className="w-4 h-4 text-[#20C7E8]" />
                <span>Call Clinic: {CLINIC_CONFIG.telephone.display}</span>
              </a>

              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenConsultation();
                }}
                className="w-full py-3 px-4 rounded-lg bg-[#20C7E8] text-[#101B35] font-bold text-sm hover:bg-[#1dbad9] transition-colors shadow"
              >
                Book a Consultation
              </button>
            </div>

            <div className="pt-2 text-center text-xs text-slate-500">
              <p>{CLINIC_CONFIG.address.fullFormatted}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
