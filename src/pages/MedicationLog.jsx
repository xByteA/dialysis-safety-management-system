import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { getPatients, savePatient } from "../data/mock-data";
import { LanguageContext } from "../context/LanguageContext";
import { useTranslationNew } from "../utils/i18n";

export default function MedicationLog() {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [selectedPatientId, setSelectedPatientId] = useState("");
  const [medsList, setMedsList] = useState([]);
  const { language } = useContext(LanguageContext);
  const t = useTranslationNew(language);

  useEffect(() => {
    const list = getPatients();
    setPatients(list);
    if (list.length > 0) {
      setSelectedPatientId(list[0].id); // Robert Chang
    }
  }, []);

  useEffect(() => {
    if (!selectedPatientId) return;

    // Build standard list for this simulation
    setMedsList([
      { id: "heparin", name: "Heparin", dosage: "1000 units", route: "IV Push", time: "09:00 AM", overdue: true, given: false },
      { id: "epogen", name: "Erythropoietin (Epogen)", dosage: "4000 units", route: "IV Push", time: "11:30 AM", overdue: false, given: false },
      { id: "iron", name: "Iron Sucrose (Venofer)", dosage: "100 mg", route: "IV Slow Push", time: "12:00 PM", overdue: false, given: false }
    ]);
  }, [selectedPatientId]);

  const selectedPatient = patients.find(p => p.id === selectedPatientId) || {};

  const handleMarkGiven = (medId) => {
    setMedsList(prev => prev.map(m => m.id === medId ? { ...m, given: true } : m));

    // Append to patient record in database
    const medName = medsList.find(m => m.id === medId)?.name || medId;
    const updatedPatient = {
      ...selectedPatient,
      medications: `${selectedPatient.medications || ""}, administered ${medName} on ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
    };
    savePatient(updatedPatient);
  };

  const translateMedName = (name) => {
    if (language !== "ar") return name;
    if (name === "Heparin") return "هيبارين (Heparin)";
    if (name === "Erythropoietin (Epogen)") return "إريثروبويتين (إيبوجين)";
    if (name === "Iron Sucrose (Venofer)") return "سكروز الحديد (فينوفر)";
    return name;
  };

  const translateDosage = (dosage) => {
    if (language !== "ar") return dosage;
    return dosage.replace("units", "وحدة").replace("mg", "ملغ");
  };

  const translateRoute = (route) => {
    if (language !== "ar") return route;
    if (route === "IV Push") return "حقن وريدي مباشر (IV Push)";
    if (route === "IV Slow Push") return "حقن وريدي بطيء (IV Slow Push)";
    return route;
  };

  const translateTime = (time) => {
    if (language !== "ar") return time;
    return time.replace("AM", "صباحاً").replace("PM", "مساءً");
  };

  const overdueMeds = medsList.filter(m => m.overdue && !m.given);
  const scheduledMeds = medsList.filter(m => !m.overdue && !m.given);
  const givenMeds = medsList.filter(m => m.given);

  return (
    <div className="max-w-4xl mx-auto pb-12 text-start">
      {/* Patient Selector */}
      <div className="bg-white dark:bg-on-background rounded-xl p-md shadow-soft border border-border-subtle dark:border-outline-variant mb-gutter text-start">
        <label className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant mb-2 text-start">
          {language === "ar" ? "اختر مريضاً" : "Select Patient"}
        </label>
        <select
          value={selectedPatientId}
          onChange={(e) => setSelectedPatientId(e.target.value)}
          className="w-full border border-border-subtle dark:border-outline-variant dark:bg-inverse-surface rounded-lg p-3 text-sm focus:outline-none focus:border-primary text-on-surface dark:text-white text-start"
        >
          {patients.map(p => (
            <option key={p.id} value={p.id}>
              {p.name} ({language === "ar" ? "المعرف" : "ID"}: {p.id})
            </option>
          ))}
        </select>
      </div>

      {selectedPatient.id && (
        <>
          {/* Header & Patient Context */}
          <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-xl gap-md text-start">
            <div className="text-start">
              <button 
                onClick={() => navigate("/patient-risk-summary")}
                className="inline-flex items-center gap-xs text-primary font-body-md text-body-md hover:underline mb-sm text-sm text-start"
              >
                <span className="material-symbols-outlined text-sm">arrow_back</span>
                {language === "ar" ? "العودة إلى ملخص مخاطر المريض" : "Back to Patient Risk Summary"}
              </button>
              <h1 className="font-headline-lg text-headline-lg md:text-[32px] md:leading-[40px] font-bold text-on-surface dark:text-white text-start">
                {language === "ar" ? "إدارة وجدولة الأدوية" : "Medication Administration"}
              </h1>
              <p className="font-body-md text-body-md text-on-surface-variant mt-xs text-start">
                {language === "ar" ? "معرف الجلسة" : "Session ID"}: #88241 • {language === "ar" ? "الغرفة" : "Room"} 4B
              </p>
            </div>
            <div className="bg-white dark:bg-on-background border border-border-subtle dark:border-outline-variant rounded-xl p-md flex items-center gap-md shadow-sm w-full md:w-auto text-start">
              <div className="w-12 h-12 rounded-full bg-surface-container text-primary flex items-center justify-center font-bold text-lg border border-primary-container/20 shrink-0">
                {selectedPatient.initials}
              </div>
              <div className="text-start">
                <h2 className="font-headline-md text-headline-md font-semibold text-on-surface dark:text-white leading-tight text-start">
                  {selectedPatient.name}
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant text-xs mt-1 text-start">
                  {language === "ar" ? "تاريخ الميلاد" : "DOB"}: {selectedPatient.dob} ({new Date().getFullYear() - new Date(selectedPatient.dob).getFullYear()} {language === "ar" ? "سنة" : "y"})
                </p>
              </div>
            </div>
          </header>

          {/* Quick Actions */}
          <div className="flex gap-md mb-lg text-start">
            <button 
              onClick={() => navigate("/messaging")}
              className="bg-white dark:bg-on-background border border-border-subtle dark:border-outline-variant text-on-surface dark:text-white px-md py-sm rounded-lg shadow-sm font-semibold text-xs flex items-center gap-xs hover:bg-surface-container-low transition-colors"
            >
              <span className="material-symbols-outlined text-primary text-[18px]">message</span>
              {language === "ar" ? "مراسلة الطبيب" : "Message Doctor"}
            </button>
            <button 
              onClick={() => navigate("/patient-profile-overview")}
              className="bg-white dark:bg-on-background border border-border-subtle dark:border-outline-variant text-on-surface dark:text-white px-md py-sm rounded-lg shadow-sm font-semibold text-xs flex items-center gap-xs hover:bg-surface-container-low transition-colors"
            >
              <span className="material-symbols-outlined text-primary text-[18px]">history</span>
              {language === "ar" ? "عرض سجل الأدوية" : "View Med History"}
            </button>
          </div>

          {/* Overdue Medications Section */}
          {overdueMeds.length > 0 && (
            <section className="mb-xl text-start">
              <h3 className="font-label-caps text-label-caps text-critical-alert flex items-center gap-xs mb-sm uppercase font-bold text-xs text-start">
                <span className="material-symbols-outlined text-sm font-bold">warning</span>
                {language === "ar" ? "أدوية متأخرة عن موعدها" : "Overdue Medications"}
              </h3>
              <div className="bg-white dark:bg-on-background rounded-xl shadow-soft border-l-4 border-critical-alert overflow-hidden text-start">
                {overdueMeds.map((med) => (
                  <div key={med.id} className="p-md md:p-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-md border-b border-border-subtle dark:border-outline-variant last:border-0 bg-error-container/10 text-start">
                    <div className="flex items-start gap-md flex-1 text-start">
                      <input 
                        type="checkbox" 
                        onChange={() => handleMarkGiven(med.id)} 
                        id={`med-${med.id}`}
                        className="mt-1 w-5 h-5 rounded border-critical-alert text-critical-alert focus:ring-critical-alert"
                      />
                      <div className="text-start">
                        <label htmlFor={`med-${med.id}`} className="font-headline-md text-headline-md font-bold text-on-surface dark:text-white cursor-pointer text-start">
                          {translateMedName(med.name)}
                        </label>
                        <p className="font-body-md text-body-md text-on-surface dark:text-white mt-xs text-start">
                          {translateDosage(med.dosage)} • {translateRoute(med.route)}
                        </p>
                        <p className="font-label-caps text-label-caps text-critical-alert mt-sm text-xs font-semibold text-start">
                          {language === "ar" ? "مستحق" : "Due"}: {translateTime(med.time)} ({language === "ar" ? "متأخر" : "Overdue"})
                        </p>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleMarkGiven(med.id)}
                      className="w-full md:w-auto bg-critical-alert text-white px-lg py-sm rounded-lg font-semibold shadow-sm hover:bg-red-600 transition-colors h-12 md:h-auto text-xs uppercase text-start"
                    >
                      {language === "ar" ? "تحديد كممنوح" : "Mark as Given"}
                    </button>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Scheduled Medications Section */}
          <section className="mb-xl text-start">
            <h3 className="font-label-caps text-label-caps text-on-surface-variant mb-sm uppercase text-xs text-start">
              {language === "ar" ? "الأدوية المجدولة (الجلسة الحالية)" : "Scheduled Medications (Current Session)"}
            </h3>
            <div className="bg-white dark:bg-on-background rounded-xl shadow-soft overflow-hidden border border-border-subtle dark:border-outline-variant divide-y divide-border-subtle dark:divide-outline-variant text-start">
              {scheduledMeds.length > 0 ? (
                scheduledMeds.map((med) => (
                  <div key={med.id} className="p-md md:p-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-md hover:bg-surface-muted dark:hover:bg-surface-container-highest transition-colors text-start">
                    <div className="flex items-start gap-md flex-1 text-start">
                      <input 
                        type="checkbox" 
                        onChange={() => handleMarkGiven(med.id)} 
                        id={`med-${med.id}`}
                        className="mt-1 w-5 h-5 rounded border-outline text-primary-container focus:ring-primary-container"
                      />
                      <div className="text-start">
                        <label htmlFor={`med-${med.id}`} className="font-headline-md text-headline-md font-bold text-on-surface dark:text-white cursor-pointer text-start">
                          {translateMedName(med.name)}
                        </label>
                        <p className="font-body-md text-body-md text-on-surface dark:text-white mt-xs text-start">
                          {translateDosage(med.dosage)} • {translateRoute(med.route)}
                        </p>
                        <p className="font-label-caps text-label-caps text-on-surface-variant mt-sm text-xs text-start">
                          {language === "ar" ? "مستحق" : "Due"}: {translateTime(med.time)}
                        </p>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleMarkGiven(med.id)}
                      className="w-full md:w-auto bg-white dark:bg-inverse-surface border border-primary-container text-primary-container px-lg py-sm rounded-lg font-semibold shadow-sm hover:bg-surface-container-low transition-colors h-12 md:h-auto text-xs uppercase text-start"
                    >
                      {language === "ar" ? "تحديد كممنوح" : "Mark as Given"}
                    </button>
                  </div>
                ))
              ) : (
                <div className="p-lg text-center text-on-surface-variant text-sm">
                  {language === "ar" ? "لا توجد أدوية مجدولة معلقة لهذه الجلسة." : "No pending scheduled medications for this session."}
                </div>
              )}
            </div>
          </section>

          {/* Administered Medications Section */}
          {givenMeds.length > 0 && (
            <section className="text-start">
              <h3 className="font-label-caps text-label-caps text-success-medical mb-sm uppercase text-xs font-bold text-start">
                {language === "ar" ? "الأدوية الممنوحة اليوم" : "Administered Today"}
              </h3>
              <div className="bg-white dark:bg-on-background rounded-xl shadow-soft overflow-hidden border border-border-subtle dark:border-outline-variant divide-y divide-border-subtle dark:divide-outline-variant opacity-80 text-start">
                {givenMeds.map((med) => (
                  <div key={med.id} className="p-md md:p-lg flex items-center justify-between gap-md bg-green-50/50 dark:bg-green-950/10 text-start">
                    <div className="flex items-center gap-md text-start">
                      <span className="material-symbols-outlined text-success-medical">check_circle</span>
                      <div className="text-start">
                        <h4 className="font-headline-md text-headline-md font-semibold text-on-surface dark:text-white line-through text-start">
                          {translateMedName(med.name)}
                        </h4>
                        <p className="font-body-md text-xs text-on-surface-variant text-start">
                          {translateDosage(med.dosage)} • {language === "ar" ? "تم منحه مؤخراً" : "Administered recently"}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs text-success-medical font-bold uppercase">{language === "ar" ? "تم الإعطاء" : "Given"}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}
