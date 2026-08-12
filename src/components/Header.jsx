import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { getAlerts } from "../data/mock-data";
import { LanguageContext } from "../context/LanguageContext";
import { useTranslationNew } from "../utils/i18n";

export default function Header({ toggleMobileMenu }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [alertsCount, setAlertsCount] = useState(0);
  const { language, toggleLanguage } = useContext(LanguageContext);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const t = useTranslationNew(language);

  // Keep alert badge sync'd
  useEffect(() => {
    const alerts = getAlerts();
    const activeCount = alerts.filter(a => a.actionable || a.type === "heart_broken" || a.type === "warning").length;
    setAlertsCount(activeCount);
  }, [location]);

  // Close language menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (showLanguageMenu && !e.target.closest('[data-language-menu]')) {
        setShowLanguageMenu(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showLanguageMenu]);

  // Determine current page title based on route
  const getPageTitle = () => {
    switch (location.pathname) {
      case "/":
        return t("header.nurse.dashboard");
      case "/doctor-dashboard":
        return t("header.doctor.dashboard");
      case "/patient-registration":
        return t("header.patient.registration");
      case "/patient-risk-summary":
        return t("header.patient.risk.summary");
      case "/patient-profile-overview":
        return t("header.patient.profile.overview");
      case "/patient-profile-lab-results":
        return t("header.patient.profile.labs");
      case "/patient-profile-vitals-trends":
        return t("header.patient.profile.vitals");
      case "/vitals-entry":
        return t("header.vitals.entry");
      case "/lab-results-entry":
        return t("header.lab.entry");
      case "/medication-log":
        return t("header.medication.log");
      case "/prescribe-medication":
        return t("header.prescribe.medication");
      case "/supply-log":
        return t("header.supply.log");
      case "/incident-report":
        return t("header.incident.report");
      case "/trend-insights":
        return t("header.trend.insights");
      case "/messaging":
        return t("header.messaging");
      case "/nurse-messaging":
        return t("header.nurse.messaging");
      case "/notifications":
        return t("header.notifications");
      default:
        return t("header.default.title");
    }
  };

  return (
    <header className="sticky top-0 w-full z-30 bg-white dark:bg-on-background shadow-sm border-b border-border-subtle dark:border-outline-variant flex justify-between items-center px-4 md:px-margin-desktop h-16">
      <div className="flex items-center gap-md flex-1">
        {/* Mobile Hamburger menu */}
        <button
          className="md:hidden text-on-surface-variant hover:bg-surface-container-low p-sm rounded-full transition-colors active:scale-95 cursor-pointer"
          onClick={toggleMobileMenu}
        >
          <span className="material-symbols-outlined">menu</span>
        </button>

        {/* Dynamic Title */}
        <div className="hidden md:block">
          <span className="font-headline-md text-headline-md font-bold text-primary dark:text-primary-fixed-dim">
            {getPageTitle()}
          </span>
        </div>
        <div className="md:hidden block">
          <span className="font-bold text-primary font-headline-lg-mobile text-headline-lg-mobile">
            Mercy Dialysis
          </span>
        </div>
      </div>

      {/* Global Search */}
      <div className="flex-1 max-w-md px-md hidden lg:block">
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
          <input
            className="w-full pl-10 pr-4 py-2 bg-surface-container-low border border-border-subtle rounded-full focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-body-md"
            placeholder={t("common.search.placeholder")}
            type="text"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                navigate("/patient-risk-summary");
              }
            }}
          />
        </div>
      </div>

      {/* Profile & Notifications Widget */}
      <div className="flex items-center gap-sm md:gap-md flex-1 justify-end">
        {/* Language Selector Button */}
        <div className="relative" data-language-menu>
          <button
            onClick={() => setShowLanguageMenu(!showLanguageMenu)}
            className="p-2 text-on-surface-variant hover:bg-surface-container-low transition-colors rounded-full cursor-pointer active:opacity-80 flex items-center gap-sm"
            title={t("common.language")}
          >
            <span className="material-symbols-outlined">language</span>
            <span className="hidden sm:inline text-xs font-semibold uppercase tracking-wider">{language === "en" ? "EN" : "AR"}</span>
          </button>
          
          {/* Language Dropdown Menu */}
          {showLanguageMenu && (
            <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-on-background border border-border-subtle dark:border-outline-variant rounded-lg shadow-lg z-50 overflow-hidden" data-language-menu>
              <button
                onClick={() => {
                  if (language !== "en") {
                    toggleLanguage();
                  }
                  setShowLanguageMenu(false);
                }}
                className={`w-full px-4 py-2 text-sm text-left hover:bg-surface-container-low dark:hover:bg-surface-container-highest transition-colors ${
                  language === "en" ? "bg-primary-container text-white dark:text-white font-bold" : "text-on-surface dark:text-white"
                }`}
              >
                {t("common.english")}
              </button>
              <button
                onClick={() => {
                  if (language !== "ar") {
                    toggleLanguage();
                  }
                  setShowLanguageMenu(false);
                }}
                className={`w-full px-4 py-2 text-sm text-left hover:bg-surface-container-low dark:hover:bg-surface-container-highest transition-colors border-t border-border-subtle dark:border-outline-variant ${
                  language === "ar" ? "bg-primary-container text-white dark:text-white font-bold" : "text-on-surface dark:text-white"
                }`}
              >
                {t("common.arabic")}
              </button>
            </div>
          )}
        </div>
        
        <button
          onClick={() => navigate("/notifications")}
          className="p-2 text-on-surface-variant hover:bg-surface-container-low transition-colors rounded-full cursor-pointer active:opacity-80 relative"
        >
          <span className="material-symbols-outlined">notifications</span>
          {alertsCount > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 bg-critical-alert text-white text-[9px] font-bold rounded-full flex items-center justify-center animate-pulse">
              {alertsCount}
            </span>
          )}
        </button>
        <button className="p-sm text-on-surface-variant hover:bg-surface-container-low transition-colors rounded-full cursor-pointer active:opacity-80 hidden md:block" onClick={() => navigate("/trend-insights")}>
          <span className="material-symbols-outlined">help</span>
        </button>
        <button className="p-sm text-on-surface-variant hover:bg-surface-container-low transition-colors rounded-full cursor-pointer active:opacity-80 hidden md:block" onClick={() => navigate("/supply-log")}>
          <span className="material-symbols-outlined">settings</span>
        </button>

        <div className="ml-sm pl-sm border-l border-border-subtle flex items-center gap-sm">
          <img
            alt="Clinician Profile"
            className="w-8 h-8 rounded-full object-cover cursor-pointer hover:opacity-80 transition-opacity border border-border-subtle"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC34eQedf9VG7ubligxRM2hrEQ-SW5kBh6UTHGGsDAlmrfDytAlb2CNVOX53sp9al-Mx6ZhU2CaXtfvImJf69rvKgiojpVtrvV_4GBb0ycK0JCqmrbz9oeN5sDATf-ZoFgNX0yoknxkctXZQ3u-h5jB9HgMimk6Ok-aj1tmYf23WgcVAjxYY4zKftVzhUjXUcYhjsgN7GOha93PyRrFnqMrifqRSCaXAjDzRsPYHi3t4CHRQDF2bsCM"
            onClick={() => navigate("/doctor-dashboard")}
          />
        </div>
      </div>
    </header>
  );
}
