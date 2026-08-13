import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { LanguageContext } from "../context/LanguageContext";
import { useTranslationNew } from "../utils/i18n";

export default function Sidebar({ isOpen, toggleMobileMenu }) {
  const { language } = useContext(LanguageContext);
  const t = useTranslationNew(language);
  const isRtl = language === "ar";

  const categories = [
    {
      title: t("sidebar.dashboards"),
      items: [
        { path: "/doctor-dashboard", label: t("sidebar.doctor.dash"), icon: "dashboard" },
        { path: "/", label: t("sidebar.nurse.session.queue"), icon: "queue_play_next" }
      ]
    },
    {
      title: t("sidebar.patient.management"),
      items: [
        { path: "/patient-registration", label: t("sidebar.register.patient"), icon: "person_add" },
        { path: "/patient-risk-summary", label: t("sidebar.risk.summary"), icon: "warning" },
        { path: "/patient-profile-overview", label: t("sidebar.profile.overview"), icon: "account_circle" },
        { path: "/patient-profile-lab-results", label: t("sidebar.patient.lab.results"), icon: "biotech" },
        { path: "/patient-profile-vitals-trends", label: t("sidebar.patient.vitals.trends"), icon: "monitoring" }
      ]
    },
    {
      title: t("sidebar.clinical.logging"),
      items: [
        { path: "/vitals-entry", label: t("sidebar.vitals.entry.label"), icon: "monitor_heart" },
        { path: "/lab-results-entry", label: t("sidebar.lab.results.entry"), icon: "science" },
        { path: "/medication-log", label: t("sidebar.med.log"), icon: "medical_services" },
        { path: "/prescribe-medication", label: t("sidebar.prescribe.med"), icon: "note_add" }
      ]
    },
    {
      title: t("sidebar.operations.reports"),
      items: [
        { path: "/supply-log", label: t("sidebar.supply.chain"), icon: "inventory_2" },
        { path: "/incident-report", label: t("sidebar.incident.rep"), icon: "report_problem" },
        { path: "/trend-insights", label: t("sidebar.trend.risk"), icon: "analytics" }
      ]
    },
    {
      title: t("sidebar.communication"),
      items: [
        { path: "/messaging", label: t("sidebar.secure.msg"), icon: "chat" },
        { path: "/nurse-messaging", label: t("sidebar.nurse.group.chat"), icon: "groups" },
        { path: "/notifications", label: t("sidebar.notif.center"), icon: "notifications" }
      ]
    }
  ];

  const linkStyle = ({ isActive }) =>
    `flex items-center gap-md px-md py-2 rounded-lg transition-all active:scale-95 duration-150 text-[13px] ${
      isActive
        ? "bg-primary-container text-on-primary-container font-semibold shadow-soft"
        : "text-on-surface-variant hover:bg-surface-container-low dark:hover:bg-surface-container-highest"
    }`;

  return (
    <>
      {/* Mobile Drawer Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={toggleMobileMenu}
        />
      )}

      {/* Sidebar Panel */}
      <nav
        className={`fixed ${isRtl ? "right-0 border-l" : "left-0 border-r"} top-0 h-full w-[280px] bg-white dark:bg-on-background border-border-subtle dark:border-outline-variant flex flex-col py-lg z-50 transition-transform duration-300 md:translate-x-0 ${
          isOpen ? "translate-x-0" : (isRtl ? "translate-x-full" : "-translate-x-full")
        }`}
      >
        {/* Brand Header */}
        <div className="flex items-center justify-between px-md mb-md">
          <div className="flex items-center gap-md">
            <div className="p-1 bg-primary/10 rounded-lg text-primary">
              <span className="material-symbols-outlined font-bold text-2xl">healing</span>
            </div>
            <div>
              <h1 className="font-headline-md text-headline-md font-bold text-primary leading-tight">{t("sidebar.brand.name")}</h1>
              <p className="font-label-caps text-label-caps text-on-surface-variant text-[10px]">{t("sidebar.brand.subtitle")}</p>
            </div>
          </div>
          <button className="md:hidden text-on-surface-variant hover:bg-surface-container-low p-sm rounded-full" onClick={toggleMobileMenu}>
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Scrollable Links Container */}
        <div className="flex-1 overflow-y-auto px-md space-y-md pb-xl">
          {categories.map((cat, idx) => (
            <div key={idx} className="space-y-1">
              <h3 className="font-label-caps text-label-caps text-[10px] text-outline px-sm uppercase tracking-wider mb-1">
                {cat.title}
              </h3>
              <ul className="space-y-[2px]">
                {cat.items.map((item, key) => (
                  <li key={key}>
                    <NavLink to={item.path} onClick={() => isOpen && toggleMobileMenu()} className={linkStyle}>
                      <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                      <span>{item.label}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* User Card Profile Footer */}
        <div className="mt-auto px-md pt-sm border-t border-border-subtle bg-surface-muted/50 dark:bg-transparent">
          <div className="flex items-center gap-sm p-sm rounded-lg border border-border-subtle bg-white dark:bg-inverse-surface">
            <img
              className="w-8 h-8 rounded-full object-cover"
              alt={t("common.loading")}
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB4U1n6IBJjrvDnLhTEeJYWpdRf520kwX6mcOykzuHRiRJA-x6wsFV_hKGvfDuyo6jgU5zU15qB1WcHGjaxDeFPRUtlu2SC_KuxD1uSQEMRyNzSoFrzNrIjryBjAmkAI1R5tAJY0Ey3F9pznR0do1Sy-ctpG-v4LlWGjGlP81Jx4JUeppP3HrCuTfua0xHdcSjA2PIqg60YUR4_mHnKMxrpwx-zygaEbZztaBqVxrBR4xlabFizJ8MA"
            />
            <div>
              <p className="font-label-caps text-label-caps text-on-surface font-semibold text-xs leading-tight">
                {isRtl ? "الممرضة ديفيس" : "Nurse Davis"}
              </p>
              <p className="font-body-md text-[10px] text-on-surface-variant leading-none mt-1">
                {isRtl ? "الوردية: 07:00 - 15:00" : "Shift: 07:00 - 15:00"}
              </p>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
