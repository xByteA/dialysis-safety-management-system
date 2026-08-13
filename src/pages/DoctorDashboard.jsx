import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { getAlerts, getSessions, getLabReviews } from "../data/mock-data";
import { LanguageContext } from "../context/LanguageContext";
import { useTranslationNew } from "../utils/i18n";

export default function DoctorDashboard() {
  const navigate = useNavigate();
  const [alerts, setAlerts] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [labs, setLabs] = useState([]);
  const { language } = useContext(LanguageContext);
  const t = useTranslationNew(language);
  const isRtl = language === "ar";

  useEffect(() => {
    setAlerts(getAlerts());
    setSessions(getSessions());
    setLabs(getLabReviews());
  }, []);

  const handleDismissAlert = (id) => {
    const updated = alerts.filter(a => a.id !== id);
    setAlerts(updated);
    // Sync with localStorage
    localStorage.setItem("mercy_alerts", JSON.stringify(updated));
  };

  const handleDismissAll = () => {
    setAlerts([]);
    localStorage.setItem("mercy_alerts", JSON.stringify([]));
  };

  return (
    <div className="space-y-lg max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-md">
        <div>
          <h2 className="font-headline-lg md:font-headline-lg-mobile text-headline-lg md:text-headline-lg-mobile text-on-surface dark:text-white font-bold">
            {t("doctor.critical.alerts")}
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-xs">
            {t("header.default.title")}
          </p>
        </div>
        <button 
          onClick={() => navigate("/patient-registration")}
          className="bg-primary text-white font-semibold px-lg py-3 rounded-lg hover:bg-surface-tint transition-colors flex items-center gap-sm active:scale-95 duration-150"
        >
          <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>add</span>
          {t("dashboard.admit.new.patient")}
        </button>
      </div>

      {/* Summary Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
        {/* Card 1: Patients */}
        <div className="bg-white dark:bg-on-background rounded-xl shadow-soft p-lg border border-border-subtle dark:border-outline-variant flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider text-xs">
                {t("dashboard.active.sessions")}
              </p>
              <h3 className="font-display-metrics text-display-metrics text-on-surface dark:text-white mt-sm">
                42
              </h3>
            </div>
            <div className="p-sm bg-surface-container-low dark:bg-surface-container-highest rounded-full text-primary">
              <span className="material-symbols-outlined">ward</span>
            </div>
          </div>
          <div className="mt-md pt-md border-t border-border-subtle dark:border-outline-variant flex items-center justify-between">
            <span className="font-body-md text-body-md text-on-surface-variant">{t("doctor.8.active")}</span>
            <span className="font-status-badge text-status-badge bg-inverse-on-surface text-primary px-2 py-1 rounded-full text-[10px]">
              {t("Active")}
            </span>
          </div>
        </div>

        {/* Card 2: Labs */}
        <div className="bg-white dark:bg-on-background rounded-xl shadow-soft p-lg border border-border-subtle dark:border-outline-variant flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider text-xs">
                {t("doctor.pending.lab.reviews")}
              </p>
              <h3 className="font-display-metrics text-display-metrics text-on-surface dark:text-white mt-sm">
                {labs.length}
              </h3>
            </div>
            <div className="p-sm bg-surface-container-low dark:bg-surface-container-highest rounded-full text-secondary">
              <span className="material-symbols-outlined">science</span>
            </div>
          </div>
          <div className="mt-md pt-md border-t border-border-subtle dark:border-outline-variant">
            <button 
              onClick={() => navigate("/lab-results-entry")}
              className="font-body-md text-body-md text-primary font-semibold hover:underline flex items-center gap-xs"
            >
              {t("dashboard.review.now")} <span className={`material-symbols-outlined ${isRtl ? "rotate-180" : ""}`} style={{ fontSize: "16px" }}>arrow_forward</span>
            </button>
          </div>
        </div>

        {/* Card 3: Alerts */}
        <div className={`bg-white dark:bg-on-background rounded-xl shadow-soft p-lg border flex flex-col justify-between ${
          alerts.length > 0 ? "bg-error-container/20 border-error/30" : "border-border-subtle dark:border-outline-variant"
        }`}>
          <div className="flex justify-between items-start">
            <div>
              <p className={`font-label-caps text-label-caps uppercase tracking-wider text-xs ${alerts.length > 0 ? "text-error font-semibold" : "text-on-surface-variant"}`}>
                {t("Critical Alerts")}
              </p>
              <h3 className={`font-display-metrics text-display-metrics mt-sm ${alerts.length > 0 ? "text-error" : "text-on-surface dark:text-white"}`}>
                {alerts.filter(a => a.type === "heart_broken" || a.type === "warning").length}
              </h3>
            </div>
            <div className={`p-sm rounded-full ${alerts.length > 0 ? "bg-error/10 text-error" : "bg-surface-container-low text-outline"}`}>
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>warning</span>
            </div>
          </div>
          <div className="mt-md pt-md border-t border-border-subtle dark:border-outline-variant flex items-center justify-between">
            {alerts.length > 0 ? (
              <>
                <span className="font-status-badge text-status-badge bg-error text-white px-2 py-1 rounded-full animate-pulse text-[10px]">
                  {t("Action Req")}
                </span>
                <button onClick={() => navigate("/notifications")} className="text-xs text-primary font-semibold hover:underline">
                  {t("View Alerts")}
                </button>
              </>
            ) : (
              <span className="text-body-md text-on-surface-variant text-xs">{t("All systems nominal")}</span>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        {/* Left Column (Span 8) */}
        <div className="lg:col-span-8 space-y-gutter">
          {/* Critical Alerts Panel */}
          {alerts.length > 0 && (
            <div className="bg-white dark:bg-on-background rounded-xl shadow-soft border border-error/30 overflow-hidden">
              <div className="bg-error-container/40 dark:bg-red-950/20 px-lg py-md border-b border-error/20 flex justify-between items-center">
                <h3 className="font-headline-md text-headline-md text-error flex items-center gap-sm font-semibold">
                  <span className="material-symbols-outlined">vital_signs</span>
                  {t("High-Priority Notifications")}
                </h3>
                <button onClick={handleDismissAll} className="text-error font-body-md text-sm hover:underline">
                  {t("Dismiss All")}
                </button>
              </div>
              <div className="divide-y divide-border-subtle dark:divide-outline-variant">
                {alerts.map((alert) => (
                  <div key={alert.id} className="p-lg hover:bg-surface-muted dark:hover:bg-surface-container-highest transition-colors flex items-start gap-md">
                    <div className={`p-sm rounded-full shrink-0 mt-1 ${alert.type === "heart_broken" ? "bg-error/10 text-error" : "bg-tertiary-container/20 text-tertiary"}`}>
                      <span className="material-symbols-outlined">
                        {alert.type === "heart_broken" ? "heart_broken" : alert.type === "warning" ? "warning" : "trending_up"}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h4 className={`font-headline-md text-headline-md text-on-surface dark:text-white text-base font-semibold ${isRtl ? "text-right" : "text-left"}`}>
                          {t(alert.title)}
                        </h4>
                        <div className="flex items-center gap-sm">
                          <span className="text-xs text-on-surface-variant">{t(alert.time)}</span>
                          <button onClick={() => handleDismissAlert(alert.id)} className="text-on-surface-variant hover:text-error">
                            <span className="material-symbols-outlined text-[16px]">close</span>
                          </button>
                        </div>
                      </div>
                      <p className={`font-body-md text-body-md text-on-surface-variant mt-xs ${isRtl ? "text-right" : "text-left"}`}>
                        {t(alert.message)}
                      </p>
                      {alert.actionable && (
                        <div className="mt-md flex gap-sm">
                          {alert.actionType === "critical" ? (
                            <button 
                              onClick={() => navigate("/messaging")}
                              className="bg-critical-alert text-white font-body-md text-sm px-4 py-2 rounded flex items-center gap-xs hover:opacity-90 active:scale-95 transition-transform"
                            >
                              <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>call</span>
                              {t(alert.actionText)}
                            </button>
                          ) : (
                            <button 
                              onClick={() => navigate("/patient-risk-summary")}
                              className="bg-primary-container text-white font-body-md text-sm px-4 py-2 rounded flex items-center gap-xs hover:opacity-90 active:scale-95 transition-transform"
                            >
                              {t(alert.actionText)}
                            </button>
                          )}
                          <button 
                            onClick={() => navigate("/patient-profile-overview")}
                            className="border border-border-subtle dark:border-outline-variant text-on-surface dark:text-white font-body-md text-sm px-4 py-2 rounded hover:bg-surface-container-low dark:hover:bg-surface-container-highest"
                          >
                            {t("View Chart")}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Today's Scheduled Sessions */}
          <div className="bg-white dark:bg-on-background rounded-xl shadow-soft overflow-hidden border border-border-subtle dark:border-outline-variant">
            <div className="px-lg py-md border-b border-border-subtle dark:border-outline-variant flex justify-between items-center">
              <h3 className="font-headline-md text-headline-md text-on-surface dark:text-white font-semibold">{t("Today's Scheduled Sessions")}</h3>
              <button 
                onClick={() => navigate("/")}
                className="text-primary font-body-md text-sm hover:underline flex items-center gap-xs font-semibold"
              >
                {t("Full Schedule")} <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>open_in_new</span>
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className={`w-full ${isRtl ? "text-right" : "text-left"} font-body-md`}>
                <thead className="bg-surface-muted dark:bg-surface-container-highest border-b border-border-subtle dark:border-outline-variant">
                  <tr>
                    <th className="py-3 px-lg text-on-surface-variant font-semibold text-sm">{t("Time")}</th>
                    <th className="py-3 px-lg text-on-surface-variant font-semibold text-sm">{t("Patient")}</th>
                    <th className="py-3 px-lg text-on-surface-variant font-semibold text-sm">{t("Bed")}</th>
                    <th className="py-3 px-lg text-on-surface-variant font-semibold text-sm">{t("Status")}</th>
                    <th className={`py-3 px-lg ${isRtl ? "text-left" : "text-right"}`}></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-subtle dark:divide-outline-variant">
                  {sessions.slice(0, 4).map((session) => (
                    <tr key={session.id} className="hover:bg-surface-muted/50 dark:hover:bg-surface-container-highest/50 transition-colors">
                      <td className="py-4 px-lg text-on-surface dark:text-white text-sm">{t(session.time)}</td>
                      <td className="py-4 px-lg">
                        <div className="flex items-center gap-sm">
                          <div className="w-8 h-8 rounded-full bg-primary-container text-white flex items-center justify-center font-bold text-xs">
                            {session.initials}
                          </div>
                          <button 
                            onClick={() => navigate("/patient-profile-overview")}
                            className={`font-medium text-on-surface dark:text-white hover:text-primary hover:underline text-sm ${isRtl ? "text-right" : "text-left"}`}
                          >
                            {session.patientName}
                          </button>
                        </div>
                      </td>
                      <td className={`py-4 px-lg text-sm ${session.status === "Attn Req" ? "font-bold text-error" : "text-on-surface-variant"}`}>
                        {t(session.bed)}
                      </td>
                      <td className="py-4 px-lg">
                        <span className={`px-2 py-0.5 rounded-full font-status-badge text-[10px] border ${
                          session.status === "Attn Req" 
                            ? "bg-error-container text-error border-error/20" 
                            : session.status === "In Progress"
                            ? "bg-inverse-on-surface text-primary border-primary-container/20"
                            : "bg-surface-variant text-on-surface-variant border-border-subtle"
                        }`}>
                          {t(session.status)}
                        </span>
                      </td>
                      <td className={`py-4 px-lg ${isRtl ? "text-left" : "text-right"}`}>
                        <button 
                          onClick={() => navigate("/patient-risk-summary")}
                          className="text-primary hover:bg-surface-container-low dark:hover:bg-surface-container-highest p-sm rounded-full"
                        >
                          <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>more_vert</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column (Span 4) */}
        <div className="lg:col-span-4 space-y-gutter">
          {/* Pending Lab Results Widget */}
          <div className="bg-white dark:bg-on-background rounded-xl shadow-soft overflow-hidden border border-border-subtle dark:border-outline-variant">
            <div className="px-lg py-md border-b border-border-subtle dark:border-outline-variant bg-surface-muted dark:bg-surface-container-highest">
              <h3 className="font-headline-md text-headline-md text-on-surface dark:text-white flex items-center gap-sm font-semibold">
                <span className="material-symbols-outlined text-secondary">biotech</span>
                {t("Pending Lab Reviews")}
              </h3>
            </div>
            <div className="p-lg space-y-md">
              {labs.map((lab) => (
                <div key={lab.id} className="border border-border-subtle dark:border-outline-variant rounded-lg p-md hover:border-secondary transition-colors bg-white dark:bg-inverse-surface">
                  <div className="flex justify-between items-start mb-sm">
                    <span className="font-semibold text-on-surface dark:text-white text-sm">{t(lab.panelName)}</span>
                    <span className="text-[10px] text-on-surface-variant bg-surface-muted dark:bg-surface-container-highest px-2 py-0.5 rounded font-semibold uppercase">
                      {t(lab.priority)}
                    </span>
                  </div>
                  <p className="text-xs text-on-surface-variant mb-md">
                    {t("Patient")}: <span className="font-medium text-on-surface dark:text-white">{lab.patientName}</span>
                  </p>
                  {lab.outOfRange && (
                    <div className="flex items-center gap-sm">
                      <span className="font-status-badge text-[10px] bg-tertiary-container/10 text-tertiary px-2 py-0.5 rounded-full flex items-center gap-xs border border-tertiary-container/20">
                        {lab.trend && <span className="material-symbols-outlined text-[12px]">{lab.trend}</span>}
                        {t(lab.outOfRange)}
                      </span>
                    </div>
                  )}
                  <div className="mt-md pt-md border-t border-border-subtle dark:border-outline-variant grid grid-cols-2 gap-sm">
                    <button 
                      onClick={() => navigate("/lab-results-entry")}
                      className="bg-secondary text-white font-semibold text-xs py-2 rounded hover:bg-on-secondary-fixed-variant transition-colors active:scale-95 duration-150"
                    >
                      {t("Review")}
                    </button>
                    <button 
                      onClick={() => {
                        const updated = labs.filter(l => l.id !== lab.id);
                        setLabs(updated);
                        localStorage.setItem("mercy_labs", JSON.stringify(updated));
                      }}
                      className="border border-border-subtle dark:border-outline-variant text-on-surface dark:text-white font-semibold text-xs py-2 rounded hover:bg-surface-container-low dark:hover:bg-surface-container-highest transition-colors"
                    >
                      {t("Acknowledge")}
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-md bg-surface-muted dark:bg-surface-container-highest border-t border-border-subtle dark:border-outline-variant text-center">
              <button onClick={() => navigate("/lab-results-entry")} className="text-secondary font-semibold text-sm hover:underline">
                {t("View All Pending Labs")}
              </button>
            </div>
          </div>

          {/* Quick Actions / AI Insight Placeholder */}
          <div className="bg-white dark:bg-on-background rounded-xl shadow-soft p-lg border border-border-subtle dark:border-outline-variant relative overflow-hidden">
            <div className={`absolute ${isRtl ? "-left-4" : "-right-4"} -top-4 text-primary/10 select-none pointer-events-none`}>
              <span className="material-symbols-outlined" style={{ fontSize: "100px" }}>auto_awesome</span>
            </div>
            <h3 className="font-headline-md text-headline-md text-on-surface dark:text-white mb-sm relative z-10 font-semibold">
              {t("AI Clinical Insights")}
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant mb-md relative z-10 text-sm">
              {t("Based on recent flowsheets, 2 patients may require dry weight adjustments.")}
            </p>
            <button 
              onClick={() => navigate("/trend-insights")}
              className="text-primary font-semibold font-body-md flex items-center gap-xs hover:underline relative z-10 text-sm"
            >
              {t("View Recommendations")} <span className={`material-symbols-outlined ${isRtl ? "rotate-180" : ""}`} style={{ fontSize: "16px" }}>arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
