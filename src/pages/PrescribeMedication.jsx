import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { getPatients, savePatient } from "../data/mock-data";
import { LanguageContext } from "../context/LanguageContext";
import { useTranslationNew } from "../utils/i18n";

export default function PrescribeMedication() {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [selectedPatientId, setSelectedPatientId] = useState("");
  const [medName, setMedName] = useState("");
  const [dose, setDose] = useState("");
  const [frequency, setFrequency] = useState("3 times per week");
  const [route, setRoute] = useState("IV Push");
  const [notes, setNotes] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!medName || !dose) {
      alert(language === "ar" ? "يرجى إدخال اسم الدواء والجرعة." : "Please enter a Medication Name and Dosage.");
      return;
    }

    const prescriptionString = `${medName} ${dose} (${route}, ${frequency})`;
    const updatedPatient = {
      ...selectedPatient,
      medications: selectedPatient.medications 
        ? `${selectedPatient.medications}, ${prescriptionString}` 
        : prescriptionString
    };

    savePatient(updatedPatient);
    setIsSuccess(true);
    setMedName("");
    setDose("");
    setNotes("");
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
    <div className="max-w-4xl mx-auto pb-12 text-start">
      {/* Patient Selector */}
      <div className="bg-white dark:bg-on-background rounded-xl p-md shadow-soft border border-border-subtle dark:border-outline-variant mb-gutter text-start">
        <label className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant mb-2 text-start">
          {language === "ar" ? "اختر المريض للوصفة الطبية" : "Select Patient"}
        </label>
        <select
          value={selectedPatientId}
          onChange={(e) => {
            setSelectedPatientId(e.target.value);
            setIsSuccess(false);
          }}
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
          {/* Patient Context Block */}
          <div className="bg-white dark:bg-on-background rounded-xl shadow-soft p-md md:p-lg mb-gutter flex items-center gap-lg border border-border-subtle dark:border-outline-variant text-start">
            <div className="w-12 h-12 rounded-full bg-primary-container text-white flex items-center justify-center font-bold text-sm shrink-0">
              {selectedPatient.initials}
            </div>
            <div className="text-start">
              <h2 className="font-headline-md text-headline-md font-bold text-on-surface dark:text-white leading-tight text-start">
                {selectedPatient.name}
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant text-xs mt-1 text-start">
                {language === "ar" ? "المعرف" : "ID"}: {selectedPatient.id} • {language === "ar" ? "التشخيص" : "Diagnosis"}: {translateDiagnosis(selectedPatient.diagnosis)}
              </p>
            </div>
          </div>

          {!isSuccess ? (
            /* Prescribing Form */
            <form onSubmit={handleSubmit} className="bg-white dark:bg-on-background rounded-xl p-6 shadow-soft border border-border-subtle dark:border-outline-variant space-y-md text-start">
              <h2 className="text-headline-md font-headline-md font-bold text-on-surface dark:text-white border-b border-border-subtle dark:border-outline-variant pb-2 mb-4 text-start">
                {language === "ar" ? "كتابة وصفة طبية جديدة لغسيل الكلى" : "Write New Dialysis Prescription"}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-md text-start">
                <div className="space-y-sm text-start">
                  <label className="block text-sm font-semibold text-on-surface-variant text-start">{t("forms.drug.name")} *</label>
                  <input
                    value={medName}
                    onChange={(e) => setMedName(e.target.value)}
                    placeholder={language === "ar" ? "مثل: إيبوجين، هيبارين، هيكتورول" : "e.g. Epogen, Heparin, Hectorol"}
                    className="w-full border border-border-subtle dark:border-outline-variant dark:bg-inverse-surface rounded-lg p-3 text-sm focus:outline-none focus:border-primary text-on-surface dark:text-white text-start"
                    type="text"
                    required
                  />
                </div>
                <div className="space-y-sm text-start">
                  <label className="block text-sm font-semibold text-on-surface-variant text-start">{t("forms.dosage")} *</label>
                  <input
                    value={dose}
                    onChange={(e) => setDose(e.target.value)}
                    placeholder={language === "ar" ? "مثل: ٤٠٠٠ وحدة، ٨٠٠ ملغ، ١.٥ ميكروغرام" : "e.g. 4000 units, 800 mg, 1.5 mcg"}
                    className="w-full border border-border-subtle dark:border-outline-variant dark:bg-inverse-surface rounded-lg p-3 text-sm focus:outline-none focus:border-primary text-on-surface dark:text-white text-start"
                    type="text"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-md text-start">
                <div className="space-y-sm text-start">
                  <label className="block text-sm font-semibold text-on-surface-variant text-start">{t("forms.route")}</label>
                  <select
                    value={route}
                    onChange={(e) => setRoute(e.target.value)}
                    className="w-full border border-border-subtle dark:border-outline-variant dark:bg-inverse-surface rounded-lg p-3 text-sm focus:outline-none focus:border-primary text-on-surface dark:text-white text-start"
                  >
                    <option value="IV Push">{language === "ar" ? "حقن وريدي مباشر (IV Push)" : "IV Push"}</option>
                    <option value="IV Slow Infusion">{language === "ar" ? "تسريب وريدي بطيء (IV Slow Infusion)" : "IV Slow Infusion"}</option>
                    <option value="Oral / Enteral">{language === "ar" ? "عن طريق الفم / معوي" : "Oral / Enteral"}</option>
                    <option value="Subcutaneous">{language === "ar" ? "تحت الجلد (Subcutaneous)" : "Subcutaneous"}</option>
                    <option value="Topical / Site Application">{language === "ar" ? "موضعي / تطبيق في موقع الوصول" : "Topical / Site Application"}</option>
                  </select>
                </div>
                <div className="space-y-sm text-start">
                  <label className="block text-sm font-semibold text-on-surface-variant text-start">{t("forms.frequency")}</label>
                  <select
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value)}
                    className="w-full border border-border-subtle dark:border-outline-variant dark:bg-inverse-surface rounded-lg p-3 text-sm focus:outline-none focus:border-primary text-on-surface dark:text-white text-start"
                  >
                    <option value="3 times per week">{language === "ar" ? "٣ مرات في الأسبوع" : "3 times per week"}</option>
                    <option value="Once during treatment">{language === "ar" ? "مرة واحدة أثناء العلاج" : "Once during treatment"}</option>
                    <option value="With meals">{language === "ar" ? "مع الوجبات" : "With meals"}</option>
                    <option value="Daily">{language === "ar" ? "يومياً" : "Daily"}</option>
                    <option value="As needed (PRN)">{language === "ar" ? "عند الحاجة (PRN)" : "As needed (PRN)"}</option>
                  </select>
                </div>
              </div>

              <div className="space-y-sm text-start">
                <label className="block text-sm font-semibold text-on-surface-variant text-start">{language === "ar" ? "تعليمات خاصة (شروط الإيقاف المؤقت، إلخ.)" : "Special Instructions (Hold conditions, etc.)"}</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={language === "ar" ? "مثل: أوقف الدواء إذا كان ضغط الدم الانقباضي قبل الغسيل أقل من ١٠٠ ملم زئبقي..." : "e.g. Hold if pre-dialysis systolic BP is under 100 mmHg..."}
                  rows="3"
                  className="w-full border border-border-subtle dark:border-outline-variant dark:bg-inverse-surface rounded-lg p-3 text-sm focus:outline-none focus:border-primary text-on-surface dark:text-white text-start"
                />
              </div>

              <div className="flex justify-end gap-sm pt-4 text-start">
                <button
                  type="button"
                  onClick={() => navigate("/doctor-dashboard")}
                  className="px-lg py-3 rounded-lg font-semibold text-xs border border-border-subtle dark:border-outline-variant hover:bg-surface-container-low transition-all text-on-surface dark:text-white uppercase text-center shrink-0"
                >
                  {t("common.cancel")}
                </button>
                <button
                  type="submit"
                  className="bg-primary text-white py-3 px-lg rounded-lg font-semibold hover:bg-surface-tint transition-all active:scale-95 duration-150 text-xs uppercase text-center shrink-0"
                >
                  {language === "ar" ? "تأكيد ووصف الدواء" : "Confirm & Prescribe"}
                </button>
              </div>
            </form>
          ) : (
            /* Success confirmation */
            <div className="bg-white dark:bg-on-background rounded-xl p-8 shadow-soft border border-success-medical flex flex-col items-center justify-center text-center max-w-xl mx-auto">
              <div className="w-12 h-12 bg-success-medical/10 rounded-full flex items-center justify-center mb-md border border-success-medical/20">
                <span className="material-symbols-outlined text-success-medical text-2xl font-bold">check_circle</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-on-surface dark:text-white font-bold mb-sm">
                {language === "ar" ? "تم تسجيل الوصفة بنجاح" : "Prescription Logged Successfully"}
              </h3>
              <p className="font-body-md text-sm text-on-surface-variant mb-6">
                {language === "ar"
                  ? `تم إرفاق الدواء بنجاح بالملف الطبي النشط للمريض ${selectedPatient.name}.`
                  : `The medication has been appended to ${selectedPatient.name}'s current active medical file.`}
              </p>
              <div className="flex flex-col gap-2 w-full mt-4">
                <button
                  onClick={() => setIsSuccess(false)}
                  className="w-full bg-primary-container text-white py-2 rounded-lg font-semibold text-xs uppercase tracking-wider hover:opacity-90 active:scale-95 duration-150 transition-all text-center shrink-0"
                >
                  {language === "ar" ? "كتابة وصفة طبية أخرى" : "Write Another Prescription"}
                </button>
                <button
                  onClick={() => navigate("/doctor-dashboard")}
                  className="w-full border border-border-subtle dark:border-outline-variant text-on-surface dark:text-white py-2 rounded-lg font-semibold text-xs uppercase hover:bg-surface-container-low text-center shrink-0"
                >
                  {language === "ar" ? "العودة إلى لوحة التحكم" : "Return to Dashboard"}
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
