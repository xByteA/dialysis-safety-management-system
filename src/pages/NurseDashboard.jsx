import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { getSessions, getPatients } from "../data/mock-data";
import { LanguageContext } from "../context/LanguageContext";
import { useTranslationNew } from "../utils/i18n";

export default function NurseDashboard() {
  const navigate = useNavigate();
  const [sessions, setSessions] = useState([]);
  const [patients, setPatients] = useState([]);
  const { language } = useContext(LanguageContext);
  const t = useTranslationNew(language);

  useEffect(() => {
    setSessions(getSessions());
    setPatients(getPatients());
  }, []);

  const getStatusBadgeClass = (statusType) => {
    switch (statusType) {
      case "error":
        return "bg-error-container text-error border-error/20";
      case "success":
        return "bg-success-medical/10 text-success-medical border-success-medical/20";
      case "primary":
        return "bg-primary-container/10 text-primary border-primary-container/20";
      default:
        return "bg-surface-variant text-on-surface-variant border-border-subtle";
    }
  };

  return (
    <div className="flex flex-col gap-lg max-w-7xl mx-auto w-full">
      {/* Summary Metrics Bento Box */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
        <div className="bg-white dark:bg-on-background rounded-xl shadow-soft p-lg border border-border-subtle dark:border-outline-variant">
          <h3 className="font-label-caps text-label-caps text-on-surface-variant mb-sm">{t("dashboard.active.sessions")}</h3>
          <div className="flex items-end gap-sm">
            <span className="font-display-metrics text-display-metrics text-primary">
              {sessions.filter(s => s.status === "In Progress" || s.status === "Attn Req").length}
            </span>
            <span className="font-body-md text-body-md text-on-surface-variant mb-1">/ 24 {t("dashboard.beds")}</span>
          </div>
        </div>
        <div className="bg-white dark:bg-on-background rounded-xl shadow-soft p-lg border border-border-subtle dark:border-outline-variant">
          <h3 className="font-label-caps text-label-caps text-on-surface-variant mb-sm">{t("dashboard.pending.meds")}</h3>
          <div className="flex items-end gap-sm">
            <span className="font-display-metrics text-display-metrics text-tertiary-container">4</span>
            <span className="font-body-md text-body-md text-on-surface-variant mb-1">{t("dashboard.due")}</span>
          </div>
        </div>
        <div className="bg-white dark:bg-on-background rounded-xl shadow-soft p-lg border border-border-subtle dark:border-outline-variant flex flex-col justify-center">
          <button 
            onClick={() => navigate("/patient-registration")}
            className="bg-primary-container text-white w-full h-12 rounded-lg font-semibold text-body-md flex items-center justify-center gap-sm hover:opacity-90 transition-opacity active:scale-95 duration-150"
          >
            <span className="material-symbols-outlined text-[20px]">add</span>
            {t("dashboard.admit.new.patient")}
          </button>
        </div>
      </section>

      {/* Session Queue Timeline */}
      <section className="flex flex-col gap-md">
        <div className="flex justify-between items-center border-b border-border-subtle dark:border-outline-variant pb-xs">
          <h2 className="font-headline-md text-headline-md text-on-surface dark:text-white font-bold">{t("dashboard.session.queue")}</h2>
          <div className="flex gap-sm">
            <span className="font-label-caps text-[10px] flex items-center gap-xs text-on-surface-variant">
              <span className="w-2 h-2 rounded-full bg-success-medical block"></span> {t("dashboard.on.time")}
            </span>
            <span className="font-label-caps text-[10px] flex items-center gap-xs text-on-surface-variant">
              <span className="w-2 h-2 rounded-full bg-[#EAB308] block"></span> {t("dashboard.due.soon")}
            </span>
            <span className="font-label-caps text-[10px] flex items-center gap-xs text-on-surface-variant">
              <span className="w-2 h-2 rounded-full bg-critical-alert block"></span> {t("dashboard.overdue")}
            </span>
          </div>
        </div>

        {/* Timeline List */}
        <div className="bg-white dark:bg-on-background rounded-xl shadow-soft border border-border-subtle dark:border-outline-variant overflow-hidden divide-y divide-border-subtle dark:divide-outline-variant">
          {sessions.map((session) => {
            // Find patient details for avatar if we want
            const patientObj = patients.find(p => p.id === session.patientId) || {};
            const alertColor = session.status === "Attn Req" ? "border-critical-alert" : "border-border-subtle";
            
            return (
              <div 
                key={session.id} 
                className={`flex flex-col md:flex-row md:items-center justify-between p-md hover:bg-surface-container-low dark:hover:bg-surface-container-highest transition-colors relative ${
                  session.status === "Attn Req" ? "bg-[#FEF2F2] dark:bg-red-950/20" : ""
                }`}
              >
                {/* Left indicators */}
                <div className={`absolute ${language === "ar" ? "right-0" : "left-0"} top-0 bottom-0 w-1 ${
                  session.status === "Attn Req" 
                    ? "bg-critical-alert" 
                    : session.status === "In Progress" 
                    ? "bg-success-medical" 
                    : "bg-outline"
                }`} />

                <div className="flex items-center gap-md mb-sm md:mb-0 pl-sm">
                  <div className="w-12 h-12 rounded-full bg-primary-container/10 text-primary flex items-center justify-center font-bold text-sm border border-primary-container/20">
                    {session.initials}
                  </div>
                  <div>
                    <button 
                      onClick={() => navigate("/patient-profile-overview")}
                      className={`font-headline-md text-body-lg text-on-surface dark:text-white hover:text-primary hover:underline transition-all ${language === "ar" ? "text-right" : "text-left"} font-semibold`}
                    >
                      {session.patientName}
                    </button>
                    <div className="flex items-center gap-xs text-on-surface-variant mt-1 text-xs">
                      <span className="material-symbols-outlined text-[14px]">schedule</span>
                      <span>{session.time}</span>
                      <span className="mx-1">•</span>
                      <span className="font-semibold">{t(session.bed)}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-md self-start md:self-auto ml-12 md:ml-0">
                  {session.medicationAlert && (
                    <button 
                      onClick={() => navigate("/vitals-entry")}
                      className={`inline-flex items-center justify-center rounded-full px-sm py-1 font-status-badge text-status-badge gap-xs transition-colors cursor-pointer shadow-sm text-xs ${
                        session.status === "Attn Req" 
                          ? "bg-error text-white" 
                          : "bg-amber-100 text-amber-800 border border-amber-300"
                      }`}
                    >
                      <span className="material-symbols-outlined text-[14px]">warning</span>
                      {t(session.medicationAlert)}
                    </button>
                  )}

                  <span className={`px-2 py-1 rounded-full font-status-badge text-status-badge border text-[10px] ${getStatusBadgeClass(session.statusType)}`}>
                    {t(session.status)}
                  </span>

                  <button 
                    onClick={() => navigate("/patient-risk-summary")}
                    className="text-primary hover:bg-surface-container-low p-sm rounded-full active:opacity-75"
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>more_vert</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
