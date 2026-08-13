import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { getPatients, savePatient } from "../data/mock-data";
import { LanguageContext } from "../context/LanguageContext";
import { useTranslationNew } from "../utils/i18n";

export default function VitalsEntry() {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [selectedPatientId, setSelectedPatientId] = useState("");
  const [systolic, setSystolic] = useState("");
  const [diastolic, setDiastolic] = useState("");
  const [weight, setWeight] = useState("");
  const [remarks, setRemarks] = useState("Routine intradialytic check");
  const { language } = useContext(LanguageContext);
  const t = useTranslationNew(language);

  const [currentTime, setCurrentTime] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const list = getPatients();
    setPatients(list);
    if (list.length > 0) {
      setSelectedPatientId(list[0].id); // Defaults to Robert Chang
    }

    const updateClock = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) +
          " - " +
          now.toLocaleDateString()
      );
    };
    updateClock();
    const interval = setInterval(updateClock, 30000);
    return () => clearInterval(interval);
  }, []);

  const selectedPatient = patients.find(p => p.id === selectedPatientId) || {};

  const handleSave = () => {
    if (!systolic || !diastolic || !weight) {
      alert(language === "ar" ? "يرجى ملء ضغط الدم والوزن." : "Please fill in Blood Pressure and Weight.");
      return;
    }

    const timeString = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const bpString = `${systolic}/${diastolic}`;

    // Add vital record
    const updatedPatient = {
      ...selectedPatient,
      vitalsHistory: [
        {
          time: timeString,
          bp: bpString,
          weight: parseFloat(weight),
          hr: 75, // Default/random simulation
          temp: "36.6°C",
          remarks: remarks
        },
        ...selectedPatient.vitalsHistory
      ]
    };

    savePatient(updatedPatient);
    setIsSuccess(true);
  };

  const translateRisk = (risk) => {
    if (language !== "ar") return risk;
    if (risk === "Critical") return "حرجة";
    if (risk === "High") return "مرتفعة";
    if (risk === "Moderate") return "متوسطة";
    if (risk === "Stable" || risk === "Low") return "مستقرة";
    return risk;
  };

  const translateRemarksDefault = (rem) => {
    if (language !== "ar") return rem;
    if (rem === "Routine intradialytic check") return "فحص روتيني أثناء غسيل الكلى";
    return rem;
  };

  return (
    <div className="max-w-4xl mx-auto text-start">
      {/* Patient Selection Dropdown */}
      <div className="bg-white dark:bg-on-background rounded-xl p-md shadow-soft border border-border-subtle dark:border-outline-variant mb-gutter text-start">
        <label className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant mb-2 text-start">
          {language === "ar" ? "اختر مريض غسيل الكلى السريري" : "Select Active Dialysis Patient"}
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
          {/* Patient Header Block */}
          <div 
            onClick={() => navigate("/patient-profile-overview")}
            className="bg-white dark:bg-on-background rounded-xl shadow-soft p-md md:p-lg mb-gutter flex items-center gap-lg border border-border-subtle dark:border-outline-variant hover:bg-surface-container-low dark:hover:bg-surface-container-highest transition-colors cursor-pointer text-start"
          >
            <div className="w-16 h-16 rounded-full bg-primary-container text-white flex items-center justify-center font-bold text-lg shrink-0 border border-primary-container/20">
              {selectedPatient.initials}
            </div>
            <div className="flex-1 text-start">
              <h2 className="font-headline-lg text-headline-lg text-on-surface dark:text-white font-bold leading-tight text-start">
                {selectedPatient.name}
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant flex items-center gap-sm mt-1 text-xs text-start">
                {language === "ar" ? "المعرف" : "ID"}: {selectedPatient.id} • {language === "ar" ? "تاريخ الميلاد" : "DOB"}: {selectedPatient.dob}
                <span className="material-symbols-outlined text-outline text-sm">arrow_forward</span>
              </p>
            </div>
            <div className="hidden sm:block text-start">
              <span className={`px-3 py-1 rounded-full text-xs font-bold shrink-0 ${
                selectedPatient.riskLevel === "Critical" 
                  ? "bg-red-100 text-red-800 border border-red-200" 
                  : selectedPatient.riskLevel === "High"
                  ? "bg-amber-100 text-amber-800 border border-amber-200"
                  : "bg-green-100 text-green-800 border border-green-200"
              }`}>
                {language === "ar" ? "مخاطر" : "Risk"} {translateRisk(selectedPatient.riskLevel)}
              </span>
            </div>
          </div>

          {!isSuccess ? (
            /* Vitals Entry Form */
            <div className="bg-white dark:bg-on-background rounded-xl shadow-soft p-md md:p-lg border border-border-subtle dark:border-outline-variant text-start">
              <div className="flex justify-between items-center mb-lg border-b border-border-subtle dark:border-outline-variant pb-md text-start">
                <h3 className="font-headline-md text-headline-md text-on-surface dark:text-white font-semibold text-start">
                  {language === "ar" ? "تسجيل العلامات الحيوية للغسيل" : "Record Vitals"}
                </h3>
                <div className="font-body-md text-body-md text-on-surface-variant flex items-center gap-xs text-xs shrink-0">
                  <span className="material-symbols-outlined text-sm">schedule</span>
                  <span>{currentTime}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-xl mb-xl text-start">
                {/* Blood Pressure */}
                <div className="space-y-sm text-start">
                  <label className="font-label-caps text-label-caps text-on-surface-variant block uppercase text-xs tracking-wider text-start">
                    {language === "ar" ? "ضغط الدم (ملم زئبقي) *" : "Blood Pressure (mmHg) *"}
                  </label>
                  <div className="flex items-center gap-sm text-start">
                    <input
                      value={systolic}
                      onChange={(e) => setSystolic(e.target.value)}
                      className="w-full h-16 text-center font-display-metrics text-display-metrics text-on-surface dark:text-white bg-surface-muted dark:bg-inverse-surface border border-border-subtle dark:border-outline-variant rounded-lg focus:outline-none focus:border-primary-container focus:ring-2 focus:ring-primary-container/20 transition-all font-bold text-2xl"
                      placeholder={language === "ar" ? "الانقباضي (مثل: ١٢٠)" : "Systolic (e.g. 120)"}
                      type="number"
                      required
                    />
                    <span className="font-headline-md text-headline-md text-outline">/</span>
                    <input
                      value={diastolic}
                      onChange={(e) => setDiastolic(e.target.value)}
                      className="w-full h-16 text-center font-display-metrics text-display-metrics text-on-surface dark:text-white bg-surface-muted dark:bg-inverse-surface border border-border-subtle dark:border-outline-variant rounded-lg focus:outline-none focus:border-primary-container focus:ring-2 focus:ring-primary-container/20 transition-all font-bold text-2xl"
                      placeholder={language === "ar" ? "الانبساطي (مثل: ٨٠)" : "Diastolic (e.g. 80)"}
                      type="number"
                      required
                    />
                  </div>
                </div>

                {/* Weight */}
                <div className="space-y-sm text-start">
                  <label className="font-label-caps text-label-caps text-on-surface-variant block uppercase text-xs tracking-wider text-start">
                    {language === "ar" ? "الوزن الحالي (كجم) *" : "Weight (kg) *"}
                  </label>
                  <input
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="w-full h-16 text-center font-display-metrics text-display-metrics text-on-surface dark:text-white bg-surface-muted dark:bg-inverse-surface border border-border-subtle dark:border-outline-variant rounded-lg focus:outline-none focus:border-primary-container focus:ring-2 focus:ring-primary-container/20 transition-all font-bold text-2xl"
                    placeholder={language === "ar" ? `مرجع الوزن الجاف: ${selectedPatient.dryWeight}` : `Dry wt reference: ${selectedPatient.dryWeight}`}
                    step="0.1"
                    type="number"
                    required
                  />
                </div>
              </div>

              {/* Remarks/Notes */}
              <div className="mb-xl space-y-sm text-start">
                <label className="font-label-caps text-label-caps text-on-surface-variant block uppercase text-xs tracking-wider text-start">
                  {language === "ar" ? "ملاحظات سريرية وملاحظات المتابعة" : "Remarks / Observations"}
                </label>
                <input
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  className="w-full border border-border-subtle dark:border-outline-variant dark:bg-inverse-surface rounded-lg p-3 text-sm focus:outline-none focus:border-primary text-on-surface dark:text-white text-start"
                  placeholder={language === "ar" ? "ملاحظات حول حالة المريض واستقراره..." : "Notes about patient state..."}
                  type="text"
                />
              </div>

              <div className="flex justify-end gap-md text-start">
                <button
                  onClick={() => navigate("/")}
                  className="px-lg py-sm h-12 font-label-caps text-label-caps text-primary border border-primary rounded-lg hover:bg-surface-container-low transition-colors text-xs font-bold uppercase tracking-wider text-center shrink-0"
                >
                  {t("common.cancel")}
                </button>
                <button
                  onClick={handleSave}
                  className="px-lg py-sm h-12 font-label-caps text-label-caps text-white bg-primary-container rounded-lg hover:bg-primary-container/90 active:scale-95 transition-all flex items-center gap-sm text-xs font-bold uppercase tracking-wider text-center shrink-0"
                >
                  <span className="material-symbols-outlined">save</span>
                  {language === "ar" ? "حفظ وإدخال العلامات الحيوية" : "Save Vitals"}
                </button>
              </div>
            </div>
          ) : (
            /* Confirmation State */
            <div className="bg-white dark:bg-on-background rounded-xl shadow-soft p-xl border border-success-medical flex flex-col items-center justify-center text-center mt-gutter text-start">
              <div className="w-16 h-16 bg-success-medical/10 rounded-full flex items-center justify-center mb-md border border-success-medical/20">
                <span className="material-symbols-outlined text-success-medical text-3xl font-bold">check_circle</span>
              </div>
              <h3 className="font-headline-lg text-headline-lg text-on-surface dark:text-white font-bold mb-sm text-center">
                {language === "ar" ? "تم حفظ العلامات الحيوية بنجاح" : "Vitals Saved Successfully"}
              </h3>
              <p className="font-body-lg text-body-lg text-on-surface-variant mb-lg text-center">
                {language === "ar"
                  ? `تم تحديث السجل الطبي للمريض ${selectedPatient.name} بنجاح في البوابة السريرية.`
                  : `${selectedPatient.name}'s record has been updated in the clinical portal.`}
              </p>
              <div className="flex gap-sm justify-center text-start">
                <button
                  onClick={() => setIsSuccess(false)}
                  className="px-lg py-sm h-12 font-label-caps text-label-caps text-primary border border-border-subtle rounded-lg hover:bg-surface-container-low transition-colors font-bold uppercase tracking-wider text-xs shrink-0 text-center"
                >
                  {language === "ar" ? "تسجيل آخر" : "Log Another"}
                </button>
                <button
                  onClick={() => navigate("/")}
                  className="px-lg py-sm h-12 font-label-caps text-label-caps text-white bg-primary-container rounded-lg hover:opacity-90 transition-colors flex items-center gap-sm font-bold uppercase tracking-wider text-xs shrink-0 text-center"
                >
                  <span className="material-symbols-outlined">arrow_back</span>
                  {language === "ar" ? "العودة للرئيسية" : "Return to Dashboard"}
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
