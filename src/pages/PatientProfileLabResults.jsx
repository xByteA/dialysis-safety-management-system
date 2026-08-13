import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { getPatients } from "../data/mock-data";
import { LanguageContext } from "../context/LanguageContext";
import { useTranslationNew } from "../utils/i18n";

export default function PatientProfileLabResults() {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [selectedPatientId, setSelectedPatientId] = useState("");
  const { language } = useContext(LanguageContext);
  const t = useTranslationNew(language);

  useEffect(() => {
    const list = getPatients();
    setPatients(list);
    if (list.length > 0) {
      setSelectedPatientId(list[0].id);
    }
  }, []);

  const selectedPatient = patients.find(p => p.id === selectedPatientId) || {};

  const getAge = (dob) => {
    if (!dob) return "";
    return new Date().getFullYear() - new Date(dob).getFullYear();
  };

  const getPotassiumStatus = (val) => {
    if (val > 5.0) return { label: language === "ar" ? "مرتفع" : "High", badge: "bg-error-container text-on-error-container border-error/20", icon: "warning", color: "text-error" };
    if (val < 3.5) return { label: language === "ar" ? "منخفض" : "Low", badge: "bg-tertiary-fixed text-on-tertiary-fixed-variant border-tertiary-fixed-dim", icon: "arrow_downward", color: "text-tertiary-container" };
    return { label: language === "ar" ? "طبيعي" : "Normal", badge: "bg-green-100 text-green-800 border-green-200", icon: "check_circle", color: "text-success-medical" };
  };

  const translateRisk = (risk) => {
    if (language !== "ar") return risk;
    if (risk === "Critical") return "حرجة";
    if (risk === "High") return "مرتفعة";
    if (risk === "Moderate") return "متوسطة";
    if (risk === "Stable" || risk === "Low") return "مستقرة";
    return risk;
  };

  const translateAccess = (access) => {
    if (!access) return "";
    if (language !== "ar") return access;
    return access.replace("AV Fistula", "ناسور شرياني وريدي (AV Fistula)")
                 .replace("AV Graft", "رقعة شريانية وريدية (AV Graft)")
                 .replace("PermCath", "قسطرة دائمة (PermCath)")
                 .replace("Left Forearm", "الساعد الأيسر")
                 .replace("Right Upper Arm", "الذراع الأيمن العلوي")
                 .replace("Right Internal Jugular", "الوريد الوداجي الداخلي الأيمن");
  };

  const translateDiagnosis = (dx) => {
    if (!dx) return "";
    if (language !== "ar") return dx;
    if (dx.includes("End Stage Renal Disease")) return "مرض الكلى في المرحلة الأخيرة (ESRD)";
    if (dx.includes("ESRD secondary to Hypertensive")) return "الفشل الكلوي في المرحلة النهائية الثانوي للتصلب العصبي الكبيبي الكلوي الناجم عن ارتفاع ضغط الدم";
    if (dx.includes("ESRD secondary to Polycystic Kidney")) return "الفشل الكلوي في المرحلة النهائية الثانوي لمرض الكلى المتعدد الكيسات";
    if (dx.includes("Chronic Kidney Disease Stage 5")) return "مرض الكلى المزمن (المرحلة الخامسة)";
    if (dx.includes("Lupus Nephritis")) return "التهاب الكلية الذئبي، ESRD";
    if (dx.includes("IgA Nephropathy")) return "اعتلال الكلية بالغلوبولين المناعي (IgA)";
    return dx;
  };

  return (
    <div className="max-w-6xl mx-auto pb-12 space-y-lg text-start">
      {/* Patient Selector */}
      <div className="bg-white dark:bg-on-background rounded-xl p-md shadow-soft border border-border-subtle dark:border-outline-variant text-start">
        <label className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant mb-2 text-start">
          {language === "ar" ? "اختر ملف المريض" : "Select Patient Profile"}
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
          {/* Patient Header Card */}
          <section className="bg-white dark:bg-on-background rounded-xl shadow-soft p-lg border border-border-subtle dark:border-outline-variant text-start">
            <div className="flex flex-col md:flex-row gap-xl items-start md:items-center text-start">
              <div className="w-24 h-24 rounded-full overflow-hidden shrink-0 border-4 border-surface-container-low flex items-center justify-center bg-primary-container/10 text-primary font-bold text-4xl border-primary-container/20">
                {selectedPatient.initials}
              </div>
              <div className="flex-grow text-start">
                <div className="flex flex-wrap items-center gap-md mb-sm text-start">
                  <h1 className="font-headline-lg text-headline-lg text-on-background dark:text-white font-bold leading-tight text-start">
                    {selectedPatient.name}
                  </h1>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                    selectedPatient.riskLevel === "Critical"
                      ? "bg-red-100 text-red-800 border border-red-200"
                      : selectedPatient.riskLevel === "High"
                      ? "bg-amber-100 text-amber-800 border border-amber-200"
                      : "bg-green-100 text-green-800 border border-green-200"
                  }`}>
                    {language === "ar" ? "مخاطر" : "Risk"} {translateRisk(selectedPatient.riskLevel)}
                  </span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-md mt-4 text-start">
                  <div className="text-start">
                    <p className="font-label-caps text-label-caps text-outline uppercase text-[10px] text-start">{t("patient.age")}</p>
                    <p className="font-body-lg text-body-lg text-on-surface dark:text-white font-semibold text-start">{getAge(selectedPatient.dob)} {language === "ar" ? "سنة" : ""}</p>
                  </div>
                  <div className="text-start">
                    <p className="font-label-caps text-label-caps text-outline uppercase text-[10px] text-start">{t("patient.dry.weight")}</p>
                    <p className="font-body-lg text-body-lg text-on-surface dark:text-white font-semibold text-start">{selectedPatient.dryWeight} {language === "ar" ? "كجم" : "kg"}</p>
                  </div>
                  <div className="text-start">
                    <p className="font-label-caps text-label-caps text-outline uppercase text-[10px] text-start">{language === "ar" ? "موضع الوصول الوعائي" : "Vascular Access"}</p>
                    <p className="font-body-lg text-body-lg text-on-surface dark:text-white font-semibold text-start">{translateAccess(selectedPatient.vascularAccess)}</p>
                  </div>
                  <div className="text-start">
                    <p className="font-label-caps text-label-caps text-outline uppercase text-[10px] text-start">{language === "ar" ? "التشخيص الرئيسي" : "Primary Dx"}</p>
                    <p className="font-body-lg text-body-lg text-on-surface dark:text-white font-semibold text-start" title={translateDiagnosis(selectedPatient.diagnosis)}>
                      {translateDiagnosis(selectedPatient.diagnosis)?.substring(0, 20)}...
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex gap-md shrink-0 text-start">
                <button 
                  onClick={() => navigate("/lab-results-entry")}
                  className="bg-primary-container text-white font-semibold py-2 px-4 rounded-lg hover:opacity-95 transition-opacity h-12 flex items-center justify-center text-xs active:scale-95 duration-150 shrink-0"
                >
                  {language === "ar" ? "جدولة مختبر" : "Schedule Lab"}
                </button>
              </div>
            </div>
          </section>

          {/* Contextual Tabs */}
          <nav className="border-b border-border-subtle dark:border-outline-variant overflow-x-auto text-start">
            <ul className="flex gap-lg min-w-max px-sm text-sm text-start">
              <li 
                onClick={() => navigate("/patient-profile-overview")}
                className="pb-md border-b-2 border-transparent text-on-surface-variant hover:text-on-surface hover:border-border-subtle cursor-pointer transition-colors"
              >
                {t("sidebar.profile.overview")}
              </li>
              <li 
                onClick={() => navigate("/patient-profile-vitals-trends")}
                className="pb-md border-b-2 border-transparent text-on-surface-variant hover:text-on-surface hover:border-border-subtle cursor-pointer transition-colors"
              >
                {language === "ar" ? "اتجاهات العلامات الحيوية" : "Vitals Trends"}
              </li>
              <li className="pb-md border-b-2 border-primary-container text-primary font-semibold cursor-pointer">
                {t("sidebar.patient.lab.results")}
              </li>
            </ul>
          </nav>

          {/* Lab Results Table */}
          <div className="bg-white dark:bg-on-background rounded-xl shadow-soft overflow-hidden border border-border-subtle dark:border-outline-variant text-start">
            <div className="p-lg border-b border-border-subtle dark:border-outline-variant flex justify-between items-center bg-surface-muted dark:bg-surface-container-highest text-start">
              <h3 className="font-headline-md text-headline-md text-on-background dark:text-white font-semibold text-base text-start">
                {language === "ar" ? "لوحات نتائج المختبر الأخيرة" : "Recent Lab Panels"}
              </h3>
              <span className="text-xs text-on-surface-variant font-semibold shrink-0">
                {language === "ar" ? "أحدث سجلات المدخلات" : "Latest Intake Logs"}
              </span>
            </div>
            
            <div className="overflow-x-auto w-full text-start">
              {selectedPatient.labsHistory?.length > 0 ? (
                <table className="w-full text-start border-collapse text-sm">
                  <thead>
                    <tr className="bg-surface-muted dark:bg-surface-container-highest border-b border-border-subtle dark:border-outline-variant">
                      <th className="p-md font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider text-xs text-start">{t("labs.test.name")}</th>
                      <th className="p-md font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider text-xs text-start">{t("labs.result")}</th>
                      <th className="p-md font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider text-xs text-start">{t("labs.reference.range")}</th>
                      <th className="p-md font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider text-xs text-start">{t("labs.status")}</th>
                      <th className="p-md font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider text-xs text-start">{t("labs.date")}</th>
                      <th className="p-md font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider text-xs text-end">{language === "ar" ? "الاتجاه" : "Trend"}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-subtle dark:divide-outline-variant text-start">
                    {selectedPatient.labsHistory.map((lab, i) => {
                      const kStatus = getPotassiumStatus(lab.potassium);
                      const crStatus = lab.creatinine > 1.2 
                        ? { label: language === "ar" ? "مرتفع" : "High", badge: "bg-error-container text-on-error-container border-error/20", icon: "warning", color: "text-error" }
                        : { label: language === "ar" ? "طبيعي" : "Normal", badge: "bg-green-100 text-green-800 border-green-200", icon: "check_circle", color: "text-success-medical" };
                      const hbStatus = lab.hemoglobin < 12.0
                        ? { label: language === "ar" ? "منخفض" : "Low", badge: "bg-tertiary-fixed text-on-tertiary-fixed-variant border-tertiary-fixed-dim", icon: "arrow_downward", color: "text-tertiary-container" }
                        : { label: language === "ar" ? "طبيعي" : "Normal", badge: "bg-green-100 text-green-800 border-green-200", icon: "check_circle", color: "text-success-medical" };

                      return (
                        <React.Fragment key={i}>
                          {/* Potassium */}
                          <tr className="hover:bg-surface-container-low dark:hover:bg-surface-container-highest/50 transition-colors text-start">
                            <td className="p-md font-semibold text-on-surface dark:text-white text-start">{language === "ar" ? "البوتاسيوم (Potassium - K)" : "Potassium (K)"}</td>
                            <td className={`p-md font-bold text-start ${kStatus.color}`}>{lab.potassium} {language === "ar" ? "ملي مكافئ/لتر" : "mEq/L"}</td>
                            <td className="p-md text-on-surface-variant text-start">3.5 - 5.0 {language === "ar" ? "ملي مكافئ/لتر" : "mEq/L"}</td>
                            <td className="p-md text-start">
                              <span className={`inline-flex items-center gap-xs px-2 py-0.5 rounded-full font-status-badge text-[10px] font-bold border ${kStatus.badge}`}>
                                <span className="material-symbols-outlined text-[12px]">{kStatus.icon}</span>
                                {kStatus.label}
                              </span>
                            </td>
                            <td className="p-md text-on-surface-variant text-xs text-start">{lab.date}</td>
                            <td className="p-md text-end">
                              <span className="material-symbols-outlined text-outline text-[20px]">{lab.potassium > 5.0 ? "trending_up" : "trending_flat"}</span>
                            </td>
                          </tr>
                          {/* Creatinine */}
                          <tr className="hover:bg-surface-container-low dark:hover:bg-surface-container-highest/50 transition-colors text-start">
                            <td className="p-md font-semibold text-on-surface dark:text-white text-start">{language === "ar" ? "الكرياتينين (Creatinine)" : "Creatinine"}</td>
                            <td className={`p-md font-bold text-start ${crStatus.color}`}>{lab.creatinine} {language === "ar" ? "ملغ/دسل" : "mg/dL"}</td>
                            <td className="p-md text-on-surface-variant text-start">0.6 - 1.2 {language === "ar" ? "ملغ/دسل" : "mg/dL"}</td>
                            <td className="p-md text-start">
                              <span className={`inline-flex items-center gap-xs px-2 py-0.5 rounded-full font-status-badge text-[10px] font-bold border ${crStatus.badge}`}>
                                <span className="material-symbols-outlined text-[12px]">{crStatus.icon}</span>
                                {crStatus.label}
                              </span>
                            </td>
                            <td className="p-md text-on-surface-variant text-xs text-start">{lab.date}</td>
                            <td className="p-md text-end">
                              <span className="material-symbols-outlined text-outline text-[20px]">trending_flat</span>
                            </td>
                          </tr>
                          {/* Hemoglobin */}
                          <tr className="hover:bg-surface-container-low dark:hover:bg-surface-container-highest/50 transition-colors text-start">
                            <td className="p-md font-semibold text-on-surface dark:text-white text-start">{language === "ar" ? "الهيموجلوبين (Hemoglobin - Hb)" : "Hemoglobin (Hb)"}</td>
                            <td className={`p-md font-bold text-start ${hbStatus.color}`}>{lab.hemoglobin} {language === "ar" ? "غ/دسل" : "g/dL"}</td>
                            <td className="p-md text-on-surface-variant text-start">12.0 - 15.5 {language === "ar" ? "غ/دسل" : "g/dL"}</td>
                            <td className="p-md text-start">
                              <span className={`inline-flex items-center gap-xs px-2 py-0.5 rounded-full font-status-badge text-[10px] font-bold border ${hbStatus.badge}`}>
                                <span className="material-symbols-outlined text-[12px]">{hbStatus.icon}</span>
                                {hbStatus.label}
                              </span>
                            </td>
                            <td className="p-md text-on-surface-variant text-xs text-start">{lab.date}</td>
                            <td className="p-md text-end">
                              <span className="material-symbols-outlined text-outline text-[20px]">{lab.hemoglobin < 12.0 ? "trending_down" : "trending_flat"}</span>
                            </td>
                          </tr>
                        </React.Fragment>
                      );
                    })}
                  </tbody>
                </table>
              ) : (
                <div className="p-lg text-center text-on-surface-variant border-t border-border-subtle bg-surface-muted dark:bg-inverse-surface text-sm">
                  {language === "ar" ? "لم يتم تسجيل أي نتائج مخبرية. يرجى استخدام 'إدخال نتائج المختبر' لتسجيل التفاصيل." : 'No laboratory results logged. Use "Lab Results Entry" to record details.'}
                </div>
              )}
            </div>
            <div className="p-md border-t border-border-subtle dark:border-outline-variant bg-surface-muted dark:bg-surface-container-highest text-center">
              <button 
                onClick={() => navigate("/lab-results-entry")}
                className="text-primary font-semibold text-xs hover:underline uppercase tracking-wider text-center"
              >
                {language === "ar" ? "تسجيل مدخلات مختبر جديدة" : "Log New Lab Intake"}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
