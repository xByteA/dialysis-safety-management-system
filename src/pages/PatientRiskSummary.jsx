import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { getPatients } from "../data/mock-data";
import { LanguageContext } from "../context/LanguageContext";
import { useTranslationNew } from "../utils/i18n";

export default function PatientRiskSummary() {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [selectedPatientId, setSelectedPatientId] = useState("");
  const { language } = useContext(LanguageContext);
  const t = useTranslationNew(language);

  useEffect(() => {
    const list = getPatients();
    setPatients(list);
    if (list.length > 0) {
      setSelectedPatientId(list[0].id); // Defaults to first patient
    }
  }, []);

  const selectedPatient = patients.find(p => p.id === selectedPatientId) || {};

  // Generate mock prescriptions based on patient records
  const getPrescriptions = (patient) => {
    if (!patient.medications) return [];
    return patient.medications.split(", ").map(m => {
      const parts = m.split(" ");
      const name = parts[0] || m;
      const dose = parts.slice(1).join(" ") || "As directed";
      return { name, dose, frequency: "Scheduled session" };
    });
  };

  const prescriptions = getPrescriptions(selectedPatient);

  const translateRisk = (risk) => {
    if (language !== "ar") return risk;
    if (risk === "Critical") return "حرجة";
    if (risk === "High") return "مرتفعة";
    if (risk === "Moderate") return "متوسطة";
    if (risk === "Stable" || risk === "Low") return "مستقرة";
    return risk;
  };

  const translateAllergy = (allergy) => {
    if (language !== "ar") return allergy;
    if (allergy === "Sulfa Drugs") return "أدوية السلفا (Sulfa Drugs)";
    if (allergy === "Penicillin") return "بنسلين (Penicillin)";
    if (allergy === "Latex") return "لاتكس (Latex)";
    if (allergy === "Iodine") return "اليود (Iodine)";
    if (allergy === "Contrast Dye") return "صبغة التباين (Contrast Dye)";
    if (allergy === "Codeine") return "كوديين (Codeine)";
    if (allergy === "Aspirin") return "أسبرين (Aspirin)";
    if (allergy === "None") return "لا يوجد";
    return allergy;
  };

  const translateMedName = (name) => {
    if (language !== "ar") return name;
    if (name.includes("Epogen")) return "إيبوجين (Epogen)";
    if (name.includes("Nehrovite") || name.includes("Nephrovite")) return "نيفروفيت (Nephrovite)";
    if (name.includes("Renvela")) return "رينفيلا (Renvela)";
    if (name.includes("Heparin")) return "هيبارين (Heparin)";
    if (name.includes("Lisinopril")) return "ليزينوبريل (Lisinopril)";
    if (name.includes("Sensipar")) return "سينسيبار (Sensipar)";
    if (name.includes("Hectorol")) return "هيكتورول (Hectorol)";
    if (name.includes("Phoslo")) return "فوسلو (Phoslo)";
    if (name.includes("Iron")) return "حديد (Iron)";
    if (name.includes("Calcitriol")) return "كالسيترول (Calcitriol)";
    if (name.includes("Lantus")) return "لانتوس (Lantus)";
    if (name.includes("Cozaar")) return "كوزار (Cozaar)";
    if (name.includes("Prednisone")) return "بريدنيزون (Prednisone)";
    if (name.includes("CellCept")) return "سيلسيبت (CellCept)";
    return name;
  };

  const translateDose = (dose) => {
    if (language !== "ar") return dose;
    return dose.replace("daily", "يومياً")
               .replace("with meals", "مع الوجبات")
               .replace("post-dialysis", "بعد غسيل الكلى")
               .replace("bid", "مرتين يومياً")
               .replace("tid", "ثلاث مرات يومياً")
               .replace("monthly", "شهرياً")
               .replace("nightly", "ليلاً")
               .replace("tab", "قرص")
               .replace("units", "وحدة");
  };

  const translateFrequency = (freq) => {
    if (language !== "ar") return freq;
    if (freq === "Scheduled session") return "جلسة مجدولة";
    return freq;
  };

  const translateFactor = (factor) => {
    if (language !== "ar") return factor;
    if (factor === "Diabetes") return "مرض السكري";
    if (factor === "AV Fistula Stenosis Risk") return "خطر تضيق الناصور الشرياني الوريدي";
    if (factor === "Mild Hypotension Episodes") return "نوبات هبوط ضغط الدم الخفيف";
    if (factor === "Severe Hypertension") return "ارتفاع ضغط الدم الشديد";
    if (factor === "Cardiovascular Disease") return "أمراض القلب والأوعية الدموية";
    if (factor === "Graft Clotting Susceptibility") return "قابلية تجلط رقعة الوصول";
    if (factor === "Intradialytic Hypotension") return "انخفاض ضغط الدم أثناء غسيل الكلى";
    if (factor === "Catheter Dysfunction") return "خلل في القسطرة";
    if (factor === "Latex Allergy") return "حساسية اللاتكس";
    if (factor === "Slightly Elevated Pre-treatment Potassium") return "ارتفاع طفيف في البوتاسيوم قبل العلاج";
    if (factor === "Glucose Fluctuations") return "تقلبات الغلوكوز";
    if (factor === "Hyperkalemia Risk") return "خطر فرط بوتاسيوم الدم";
    if (factor === "Immunosuppressed State") return "حالة تثبيط مناعي";
    if (factor === "None") return "لا يوجد";
    if (factor === "New Patient") return "مريض جديد";
    return factor;
  };

  return (
    <div className="max-w-6xl mx-auto pb-12 flex flex-col gap-lg text-start">
      {/* Patient Selector */}
      <div className="bg-white dark:bg-on-background rounded-xl p-md shadow-soft border border-border-subtle dark:border-outline-variant text-start">
        <label className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant mb-2 text-start">
          {language === "ar" ? "اختر ملف مخاطر المريض" : "Select Patient Risk File"}
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
          {/* Patient Header & Actions */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-md text-start">
            <div className="text-start">
              <h2 className="font-headline-lg text-headline-lg text-on-surface dark:text-white font-bold mb-xs text-start">
                {language === "ar" ? "مركز ملخص مخاطر المريض" : "Patient Risk Summary"}
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant flex items-center gap-sm text-xs text-start">
                <span className="material-symbols-outlined text-[18px]">person</span>
                <span>{selectedPatient.name} ({language === "ar" ? "المعرف" : "ID"}: {selectedPatient.id})</span>
              </p>
            </div>
            <div className="flex flex-wrap gap-sm w-full md:w-auto text-start">
              <button 
                onClick={() => navigate("/vitals-entry")}
                className="flex-1 md:flex-none bg-primary-container text-white font-semibold text-xs px-md py-sm rounded-lg flex items-center justify-center gap-xs hover:opacity-90 transition-opacity h-12 shrink-0"
              >
                <span className="material-symbols-outlined text-[18px]">monitor_heart</span>
                {t("vitals.record.vitals")}
              </button>
              <button 
                onClick={() => navigate("/medication-log")}
                className="flex-1 md:flex-none border border-outline-variant text-on-surface dark:text-white font-semibold text-xs px-md py-sm rounded-lg flex items-center justify-center gap-xs hover:bg-surface-container-low dark:hover:bg-surface-container-highest transition-colors h-12 shrink-0"
              >
                <span className="material-symbols-outlined text-[18px]">medical_services</span>
                {language === "ar" ? "تسجيل دواء" : "Log Medication"}
              </button>
              <button 
                onClick={() => navigate("/incident-report")}
                className="flex-1 md:flex-none bg-error text-white font-semibold text-xs px-md py-sm rounded-lg flex items-center justify-center gap-xs hover:opacity-90 transition-opacity h-12 shrink-0"
              >
                <span className="material-symbols-outlined text-[18px]">report_problem</span>
                {language === "ar" ? "الإبلاغ عن حادث" : "Report Incident"}
              </button>
            </div>
          </div>

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter text-start">
            {/* Risk Warnings Panel */}
            <div className="md:col-span-12 bg-error-container/20 border border-error/30 rounded-xl p-lg flex items-start gap-md shadow-soft text-start">
              <span className="material-symbols-outlined text-error text-[32px] mt-xs shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>
                warning
              </span>
              <div className="text-start">
                <h3 className="font-headline-md text-headline-md text-error mb-xs font-bold text-base text-start">
                  {language === "ar" ? "المخاطر المحددة من الذكاء الاصطناعي والأطباء: " : "AI & Doctor-Flagged Risks: "} {translateRisk(selectedPatient.riskLevel)}
                </h3>
                <div className="flex flex-wrap gap-sm mt-sm text-start">
                  {selectedPatient.riskFactors?.map((factor, i) => (
                    <span key={i} className="bg-error/10 text-error px-3 py-1 rounded-full text-xs font-semibold shrink-0">
                      {translateFactor(factor)}
                    </span>
                  ))}
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant text-sm mt-3 text-start">
                  {language === "ar"
                    ? `تم تمييز هذا المريض بنشاط بمستوى خطورة (${translateRisk(selectedPatient.riskLevel)}). تُقيّم مؤشرات وخوارزميات النظام القياسات الحيوية والسريرية لتوليد تحذيرات مسبقة لحماية المريض. يرجى التحقق من تطابق العلامات الحيوية قبل غسيل الكلى مع الحدود المحددة.`
                    : `This patient is flagged with ${selectedPatient.riskLevel} risk status. System indicators evaluate clinical measurements to compile safety warnings. Confirm pre-dialysis vitals match thresholds.`}
                </p>
              </div>
            </div>

            {/* Current Prescription Snapshot */}
            <div className="md:col-span-8 bg-white dark:bg-on-background rounded-xl shadow-soft overflow-hidden flex flex-col border border-border-subtle dark:border-outline-variant text-start">
              <div className="border-b border-border-subtle dark:border-outline-variant p-md bg-surface-container-lowest dark:bg-surface-container-highest text-start">
                <h3 className="font-headline-md text-headline-md text-on-surface dark:text-white flex items-center gap-sm font-semibold text-start">
                  <span className="material-symbols-outlined text-primary">prescriptions</span>
                  {language === "ar" ? "لقطة للوصفات الطبية الحالية للمريض" : "Current Prescription Snapshot"}
                </h3>
              </div>
              <div className="p-md flex-1 text-start">
                {prescriptions.length > 0 ? (
                  <table className="w-full text-start border-collapse text-sm">
                    <thead>
                      <tr className="border-b border-border-subtle dark:border-outline-variant">
                        <th className="font-label-caps text-label-caps text-on-surface-variant py-sm font-semibold text-xs text-start">{language === "ar" ? "الدواء" : "Medication"}</th>
                        <th className="font-label-caps text-label-caps text-on-surface-variant py-sm font-semibold text-xs text-start">{language === "ar" ? "الجرعة / التفاصيل" : "Dosage / Details"}</th>
                        <th className="font-label-caps text-label-caps text-on-surface-variant py-sm font-semibold text-xs text-start">{language === "ar" ? "موضع ومسار الإعطاء" : "Access Intake"}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border-subtle dark:divide-outline-variant text-start">
                      {prescriptions.map((presc, idx) => (
                        <tr key={idx} className="text-start">
                          <td className="font-body-md text-body-md text-on-surface dark:text-white py-md font-semibold text-start">{translateMedName(presc.name)}</td>
                          <td className="font-body-md text-body-md text-on-surface dark:text-white py-md text-start">{translateDose(presc.dose)}</td>
                          <td className="font-body-md text-body-md text-on-surface-variant py-md text-start">{translateFrequency(presc.frequency)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="p-lg text-center text-on-surface-variant text-sm">
                    {language === "ar" ? "لا توجد وصفات طبية مزمنة محملة في خط الأساس." : "No chronic prescriptions loaded in baseline."}
                  </div>
                )}
              </div>
            </div>

            {/* Known Allergies */}
            <div className="md:col-span-4 bg-white dark:bg-on-background rounded-xl shadow-soft overflow-hidden flex flex-col border border-border-subtle dark:border-outline-variant text-start">
              <div className="border-b border-border-subtle dark:border-outline-variant p-md bg-surface-container-lowest dark:bg-surface-container-highest text-start">
                <h3 className="font-headline-md text-headline-md text-on-surface dark:text-white flex items-center gap-sm font-semibold text-start">
                  <span className="material-symbols-outlined text-secondary">allergy</span>
                  {language === "ar" ? "الحساسية السريرية المعروفة" : "Known Allergies"}
                </h3>
              </div>
              <div className="p-md flex-1 flex flex-col gap-sm text-start">
                {selectedPatient.allergies ? (
                  selectedPatient.allergies.split(", ").map((allergy, index) => (
                    <div key={index} className="flex items-center gap-md p-sm rounded-lg bg-surface-container-low dark:bg-inverse-surface border border-border-subtle dark:border-outline-variant text-start">
                      <span className="material-symbols-outlined text-critical-alert font-bold shrink-0">block</span>
                      <div className="text-start">
                        <p className="font-body-md text-body-md font-semibold text-on-surface dark:text-white text-xs text-start">{translateAllergy(allergy)}</p>
                        <p className="font-label-caps text-label-caps text-on-surface-variant text-[10px] uppercase font-bold mt-0.5 text-start">
                          {language === "ar" ? "تنبيه حساسية حاد وحرج" : "Severe Alert Flag"}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-lg text-center text-on-surface-variant text-sm">
                    {language === "ar" ? "لا توجد حساسية موثقة للمريض." : "No documented allergies."}
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
