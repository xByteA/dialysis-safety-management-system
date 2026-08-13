import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { getPatients } from "../data/mock-data";
import { LanguageContext } from "../context/LanguageContext";
import { useTranslationNew } from "../utils/i18n";

export default function PatientProfileOverview() {
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

  // Calculate age
  const getAge = (dob) => {
    if (!dob) return "";
    return new Date().getFullYear() - new Date(dob).getFullYear();
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

  const translateRemarks = (rem) => {
    if (!rem) return "";
    if (language !== "ar") return rem;
    if (rem === "Pre-treatment vitals") return "العلامات الحيوية قبل العلاج";
    if (rem === "Hour 1 check") return "فحص الساعة الأولى";
    if (rem === "Hour 2 check") return "فحص الساعة الثانية";
    if (rem === "Elevated pre-treatment blood pressure") return "ارتفاع ضغط الدم قبل العلاج";
    if (rem === "Pre-dialysis") return "قبل غسيل الكلى";
    if (rem === "Slight blood pressure decrease") return "انخفاض طفيف في ضغط الدم";
    if (rem === "Critical blood pressure drop during hour 2") return "انخفاض حرج في ضغط الدم خلال الساعة الثانية";
    if (rem === "Stable pre-treatment") return "مستقر قبل العلاج";
    if (rem === "Routine baseline") return "خط الأساس الروتيني";
    if (rem === "Pre-treatment checks normal") return "فحوصات ما قبل العلاج طبيعية";
    if (rem === "Stable baseline") return "خط أساس مستقر";
    return rem;
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
                  onClick={() => navigate("/patient-registration")}
                  className="bg-primary text-white font-semibold py-2 px-4 rounded-lg hover:opacity-95 transition-opacity h-12 flex items-center justify-center text-xs active:scale-95 duration-150 shrink-0"
                >
                  {t("patient.edit.profile")}
                </button>
              </div>
            </div>
          </section>

          {/* Contextual Tabs */}
          <nav className="border-b border-border-subtle dark:border-outline-variant overflow-x-auto text-start">
            <ul className="flex gap-lg min-w-max px-sm text-sm text-start">
              <li className="pb-md border-b-2 border-primary-container text-primary font-semibold cursor-pointer">
                {t("sidebar.profile.overview")}
              </li>
              <li 
                onClick={() => navigate("/patient-profile-vitals-trends")}
                className="pb-md border-b-2 border-transparent text-on-surface-variant hover:text-on-surface hover:border-border-subtle cursor-pointer transition-colors"
              >
                {language === "ar" ? "اتجاهات العلامات الحيوية" : "Vitals Trends"}
              </li>
              <li 
                onClick={() => navigate("/patient-profile-lab-results")}
                className="pb-md border-b-2 border-transparent text-on-surface-variant hover:text-on-surface hover:border-border-subtle cursor-pointer transition-colors"
              >
                {t("sidebar.patient.lab.results")}
              </li>
            </ul>
          </nav>

          {/* Overview Tab Content */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter text-start">
            {/* Left Column: Sessions History */}
            <div className="md:col-span-8 flex flex-col gap-gutter text-start">
              <div className="bg-white dark:bg-on-background rounded-xl shadow-soft p-lg border border-border-subtle dark:border-outline-variant flex flex-col h-full text-start">
                <h2 className="font-headline-md text-headline-md text-on-background dark:text-white mb-md border-b border-border-subtle dark:border-outline-variant pb-sm font-semibold text-base text-start">
                  {language === "ar" ? "جلسات غسيل الكلى الأخيرة" : "Recent Dialysis Sessions"}
                </h2>
                <div className="space-y-md text-start">
                  {selectedPatient.vitalsHistory?.length > 0 ? (
                    selectedPatient.vitalsHistory.map((vital, idx) => (
                      <div key={idx} className="flex items-center justify-between p-md bg-surface dark:bg-inverse-surface rounded-lg border border-border-subtle dark:border-outline-variant text-sm text-start">
                        <div className="flex items-center gap-md text-start">
                          <div className="w-12 h-12 rounded-full bg-surface-container-low dark:bg-surface-container-highest flex items-center justify-center text-primary shrink-0">
                            <span className="material-symbols-outlined text-lg">water_drop</span>
                          </div>
                          <div className="text-start">
                            <p className="font-semibold text-on-surface dark:text-white text-start">
                              {language === "ar" ? "فحص أثناء جلسة غسيل الكلى" : "Intradilaytic Check"} - {vital.time}
                            </p>
                            <p className="text-on-surface-variant text-xs mt-0.5 text-start">
                              {language === "ar" ? `الضغط: ${vital.bp} • الوزن: ${vital.weight} كجم` : `BP: ${vital.bp} • Weight: ${vital.weight} kg`}
                            </p>
                          </div>
                        </div>
                        <div className="text-end">
                          <div className="px-2 py-0.5 rounded bg-success-medical/10 text-success-medical font-status-badge text-[9px] uppercase font-bold border border-success-medical/20 mb-1 inline-block shrink-0">
                            {t("status.completed")}
                          </div>
                          <p className="text-[10px] text-outline italic block text-end">{translateRemarks(vital.remarks)}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-lg text-center text-on-surface-variant border border-dashed border-border-subtle rounded-lg text-sm bg-surface-muted">
                      {language === "ar" ? "لم يتم تسجيل أي سجل لجلسات غسيل الكلى في ورقة العمل هذه." : "No dialysis session history logged in this flowsheet."}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column: Vitals and Notes */}
            <div className="md:col-span-4 flex flex-col gap-gutter text-start">
              {/* Vital Snapshot */}
              <div className="bg-white dark:bg-on-background rounded-xl shadow-soft p-lg border border-border-subtle dark:border-outline-variant text-start">
                <h2 className="font-headline-md text-headline-md text-on-background dark:text-white mb-md border-b border-border-subtle dark:border-outline-variant pb-sm font-semibold text-base text-start">
                  {language === "ar" ? "أحدث لقطة للعلامات الحيوية" : "Latest Vitals Snapshot"}
                </h2>
                {selectedPatient.vitalsHistory?.length > 0 ? (
                  <div className="grid grid-cols-2 gap-md text-sm text-start">
                    <div className="p-sm bg-surface dark:bg-inverse-surface rounded-lg border border-border-subtle dark:border-outline-variant text-start">
                      <p className="font-label-caps text-label-caps text-outline mb-1 text-[10px] uppercase font-bold text-start">{t("vitals.blood.pressure")}</p>
                      <p className="font-body-lg text-body-lg font-bold text-on-surface dark:text-white text-start">{selectedPatient.vitalsHistory[0].bp}</p>
                    </div>
                    <div className="p-sm bg-surface dark:bg-inverse-surface rounded-lg border border-border-subtle dark:border-outline-variant text-start">
                      <p className="font-label-caps text-label-caps text-outline mb-1 text-[10px] uppercase font-bold text-start">{t("vitals.heart.rate")}</p>
                      <p className="font-body-lg text-body-lg font-bold text-on-surface dark:text-white text-start">{selectedPatient.vitalsHistory[0].hr} {language === "ar" ? "نبضة/د" : "bpm"}</p>
                    </div>
                    <div className="p-sm bg-surface dark:bg-inverse-surface rounded-lg border border-border-subtle dark:border-outline-variant text-start">
                      <p className="font-label-caps text-label-caps text-outline mb-1 text-[10px] uppercase font-bold text-start">{t("vitals.temperature")}</p>
                      <p className="font-body-lg text-body-lg font-bold text-on-surface dark:text-white text-start">{selectedPatient.vitalsHistory[0].temp}</p>
                    </div>
                    <div className="p-sm bg-surface dark:bg-inverse-surface rounded-lg border border-border-subtle dark:border-outline-variant text-start">
                      <p className="font-label-caps text-label-caps text-outline mb-1 text-[10px] uppercase font-bold text-start">{t("vitals.weight")}</p>
                      <p className="font-body-lg text-body-lg font-bold text-on-surface dark:text-white text-start">{selectedPatient.vitalsHistory[0].weight} {language === "ar" ? "كجم" : "kg"}</p>
                    </div>
                  </div>
                ) : (
                  <div className="p-sm text-center text-xs text-on-surface-variant">
                    {language === "ar" ? "لا توجد علامات حيوية مسجلة. يرجى استخدام 'إدخال العلامات الحيوية'." : 'No recorded vitals. Use "Record Vitals" to add logs.'}
                  </div>
                )}
              </div>

              {/* Clinical Notes */}
              <div className="bg-white dark:bg-on-background rounded-xl shadow-soft p-lg border border-border-subtle dark:border-outline-variant text-start">
                <div className="flex justify-between items-center mb-md border-b border-border-subtle dark:border-outline-variant pb-sm text-start">
                  <h2 className="font-headline-md text-headline-md text-on-background dark:text-white font-semibold text-base text-start">
                    {language === "ar" ? "الملاحظات السريرية" : "Clinical Notes"}
                  </h2>
                  <button className="text-primary hover:bg-surface-container-low p-xs rounded transition-colors active:opacity-75">
                    <span className="material-symbols-outlined font-bold text-[18px]">add</span>
                  </button>
                </div>
                <div className="relative ps-6 border-s-2 border-primary-fixed text-xs space-y-1 text-start">
                  <div className="absolute w-3 h-3 bg-primary rounded-full start-[-7px] top-1"></div>
                  <p className="font-bold text-on-surface dark:text-white text-start">
                    {language === "ar" ? "أخصائي أمراض الكلى المعالج" : "Attending Nephrologist"}
                  </p>
                  <p className="text-on-surface-variant leading-relaxed text-start">
                    {language === "ar"
                      ? "تمت مراقبة المريض لمتابعة تقدم جلسة غسيل الكلى. تم التحقق من الديناميكا الدموية. الوزن الجاف الأساسي مستقر. تقييم نتائج المختبر عند السحب القادم."
                      : "Patient monitored for dialysis session progression. Hemodynamics checked. Baseline dry weight is stable. Evaluate labs next draw."}
                  </p>
                  <p className="text-[10px] text-outline font-semibold uppercase mt-2 text-start">
                    {language === "ar" ? "٢٦ أكتوبر، ١٢:١٥ مساءً" : "Oct 26, 12:15 PM"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
