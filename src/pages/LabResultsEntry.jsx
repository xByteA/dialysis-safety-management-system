import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { getPatients, savePatient } from "../data/mock-data";
import { LanguageContext } from "../context/LanguageContext";
import { useTranslationNew } from "../utils/i18n";

export default function LabResultsEntry() {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [selectedPatientId, setSelectedPatientId] = useState("");
  const [bun, setBun] = useState("");
  const [creatinine, setCreatinine] = useState("");
  const [potassium, setPotassium] = useState("");
  const [calcium, setCalcium] = useState("");
  const [pth, setPth] = useState("");
  const [vitamind, setVitamind] = useState("");
  const [albumin, setAlbumin] = useState("");
  const [hemoglobin, setHemoglobin] = useState("");
  const { language } = useContext(LanguageContext);
  const t = useTranslationNew(language);

  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const list = getPatients();
    setPatients(list);
    if (list.length > 0) {
      setSelectedPatientId(list[0].id); // default patient
    }
  }, []);

  const selectedPatient = patients.find(p => p.id === selectedPatientId) || {};

  const handleSave = () => {
    if (!selectedPatientId) return;

    const newLab = {
      date: new Date().toISOString().split("T")[0],
      potassium: parseFloat(potassium) || 0,
      creatinine: parseFloat(creatinine) || 0,
      bun: parseFloat(bun) || 0,
      hemoglobin: parseFloat(hemoglobin) || 0,
      phosphorus: 4.5, // placeholder fallback
      calcium: parseFloat(calcium) || 0,
      pth: parseInt(pth) || 0,
      vitamind: parseInt(vitamind) || 0,
      albumin: parseFloat(albumin) || 0
    };

    const updatedPatient = {
      ...selectedPatient,
      labsHistory: [newLab, ...selectedPatient.labsHistory]
    };

    savePatient(updatedPatient);
    setIsSuccess(true);
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

  return (
    <div className="max-w-6xl mx-auto pb-12 text-start">
      {/* Patient Selection Dropdown */}
      <div className="bg-white dark:bg-on-background rounded-xl p-md shadow-soft border border-border-subtle dark:border-outline-variant mb-gutter text-start">
        <label className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant mb-2 text-start">
          {language === "ar" ? "اختر مريضاً لإدخال نتائج المختبر" : "Select Patient for Lab Intake"}
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
        <div className="flex flex-col md:flex-row gap-gutter text-start">
          {/* Left Column: Patient Context */}
          <aside className="md:w-1/3 flex flex-col gap-gutter text-start">
            <div className="bg-white dark:bg-on-background rounded-xl shadow-soft p-lg border border-border-subtle dark:border-outline-variant text-start">
              <div className="flex items-center gap-md mb-md text-start">
                <div className="w-12 h-12 rounded-full bg-primary-container text-white flex items-center justify-center font-bold text-sm border border-primary-container/20 shrink-0">
                  {selectedPatient.initials}
                </div>
                <div className="text-start">
                  <h2 className="font-headline-md text-headline-md text-on-surface dark:text-white font-bold leading-tight text-start">
                    {selectedPatient.name}
                  </h2>
                  <p className="font-body-md text-body-md text-on-surface-variant mt-1 text-xs text-start">
                    {language === "ar" ? "تاريخ الميلاد" : "DOB"}: {selectedPatient.dob} • {language === "ar" ? "المعرف" : "ID"}: {selectedPatient.id}
                  </p>
                </div>
              </div>
              <div className="border-t border-border-subtle dark:border-outline-variant pt-md mt-md space-y-sm text-sm text-start">
                <div className="flex justify-between items-center text-start">
                  <span className="text-on-surface-variant text-start">{t("patient.access.status")}</span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-status-badge font-status-badge bg-tertiary-container/10 text-tertiary-container text-[10px] font-bold">
                    {translateAccess(selectedPatient.vascularAccess)}
                  </span>
                </div>
                <div className="flex justify-between items-center text-start">
                  <span className="text-on-surface-variant text-start">{t("patient.dry.weight")}</span>
                  <span className="font-medium text-on-surface dark:text-white text-start">{selectedPatient.dryWeight} {language === "ar" ? "كجم" : "kg"}</span>
                </div>
              </div>
            </div>

            {(selectedPatient.riskLevel === "Critical" || selectedPatient.riskLevel === "High") && (
              <div className="bg-white dark:bg-on-background rounded-xl shadow-soft p-lg border border-error/20 bg-error-container/10 text-start">
                <h3 className="font-headline-md text-headline-md mb-md flex items-center gap-sm font-semibold text-error text-sm text-start">
                  <span className="material-symbols-outlined text-critical-alert">warning</span>
                  {language === "ar" ? "التنبيهات الأخيرة" : "Recent Alerts"}
                </h3>
                <ul className="flex flex-col gap-sm text-xs text-start">
                  <li className="p-sm rounded bg-error-container/20 text-on-surface dark:text-white text-start">
                    <span>
                      {language === "ar"
                        ? `المريض لديه خطر مرتفع (درجة الخطر ${selectedPatient.riskScore}%). يرجى مراقبة البوتاسيوم بدقة.`
                        : `Patient has elevated risk (${selectedPatient.riskScore}% score). Monitor potassium closely.`}
                    </span>
                  </li>
                </ul>
              </div>
            )}
          </aside>

          {/* Right Column: Lab Entry Form */}
          <section className="md:w-2/3 flex flex-col text-start">
            {!isSuccess ? (
              <form className="bg-white dark:bg-on-background rounded-xl shadow-soft flex flex-col h-full border border-border-subtle dark:border-outline-variant text-start">
                <div className="p-lg border-b border-border-subtle dark:border-outline-variant text-start">
                  <h2 className="font-headline-lg text-headline-lg mb-xs text-on-surface dark:text-white font-bold text-start">
                    {language === "ar" ? "إدخال نتائج مخبرية جديدة" : "Enter New Lab Results"}
                  </h2>
                  <p className="font-body-md text-body-md text-on-surface-variant text-xs text-start">
                    {language === "ar" ? "تاريخ الجمع: اليوم" : "Collection Date: Today"} ({new Date().toLocaleDateString()})
                  </p>
                </div>
                <div className="p-lg flex-grow flex flex-col gap-lg space-y-6 text-start">
                  {/* Kidney Panel */}
                  <div className="text-start">
                    <h4 className="font-label-caps text-label-caps text-primary uppercase mb-md text-xs tracking-wider text-start">
                      {language === "ar" ? "لوحة وظائف الكلى" : "Kidney Panel"}
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-md text-start">
                      <div className="flex flex-col gap-xs text-start">
                        <label className="font-body-md text-body-md font-semibold text-on-surface text-sm text-start">{t("labs.bun")}</label>
                        <div className="relative flex items-center text-start">
                          <input
                            value={bun}
                            onChange={(e) => setBun(e.target.value)}
                            className="w-full h-12 px-sm border border-border-subtle dark:border-outline-variant dark:bg-inverse-surface rounded-md focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none text-sm text-on-surface dark:text-white text-start"
                            placeholder={language === "ar" ? "المرجع: ٧ - ٢٠" : "Ref: 7 - 20"}
                            type="number"
                          />
                          <span className="absolute end-sm text-on-surface-variant text-xs">{language === "ar" ? "ملغ/دسل" : "mg/dL"}</span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-xs text-start">
                        <label className="font-body-md text-body-md font-semibold text-on-surface text-sm text-start">{t("labs.creatinine")}</label>
                        <div className="relative flex items-center text-start">
                          <input
                            value={creatinine}
                            onChange={(e) => setCreatinine(e.target.value)}
                            className="w-full h-12 px-sm border border-border-subtle dark:border-outline-variant dark:bg-inverse-surface rounded-md focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none text-sm text-on-surface dark:text-white text-start"
                            placeholder={language === "ar" ? "المرجع: ٠.٦ - ١.٢" : "Ref: 0.6 - 1.2"}
                            step="0.1"
                            type="number"
                          />
                          <span className="absolute end-sm text-on-surface-variant text-xs">{language === "ar" ? "ملغ/دسل" : "mg/dL"}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Electrolytes */}
                  <div className="text-start">
                    <h4 className="font-label-caps text-label-caps text-primary uppercase mb-md text-xs tracking-wider text-start">
                      {language === "ar" ? "الشوارد / الإلكتروليتات" : "Electrolytes"}
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-md text-start">
                      <div className="flex flex-col gap-xs text-start">
                        <label className="font-body-md text-body-md font-semibold text-on-surface text-sm text-start">{t("labs.potassium")}</label>
                        <div className="relative flex items-center text-start">
                          <input
                            value={potassium}
                            onChange={(e) => setPotassium(e.target.value)}
                            className="w-full h-12 px-sm border border-border-subtle dark:border-outline-variant dark:bg-inverse-surface rounded-md focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none text-sm text-on-surface dark:text-white text-start"
                            placeholder={language === "ar" ? "المرجع: ٣.٥ - ٥.٠" : "Ref: 3.5 - 5.0"}
                            step="0.1"
                            type="number"
                          />
                          <span className="absolute end-sm text-on-surface-variant text-xs">{language === "ar" ? "ملي مكافئ/لتر" : "mEq/L"}</span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-xs text-start">
                        <label className="font-body-md text-body-md font-semibold text-on-surface text-sm text-start">{t("labs.calcium")}</label>
                        <div className="relative flex items-center text-start">
                          <input
                            value={calcium}
                            onChange={(e) => setCalcium(e.target.value)}
                            className="w-full h-12 px-sm border border-border-subtle dark:border-outline-variant dark:bg-inverse-surface rounded-md focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none text-sm text-on-surface dark:text-white text-start"
                            placeholder={language === "ar" ? "المرجع: ٨.٥ - ١٠.٥" : "Ref: 8.5 - 10.5"}
                            step="0.1"
                            type="number"
                          />
                          <span className="absolute end-sm text-on-surface-variant text-xs">{language === "ar" ? "ملغ/دسل" : "mg/dL"}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bone & Nutrition Markers */}
                  <div className="text-start">
                    <h4 className="font-label-caps text-label-caps text-primary uppercase mb-md text-xs tracking-wider text-start">
                      {language === "ar" ? "مؤشرات العظام والتغذية" : "Bone & Nutrition Markers"}
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-md text-start">
                      <div className="flex flex-col gap-xs text-start">
                        <label className="font-body-md text-body-md font-semibold text-on-surface text-sm text-start">{t("labs.pth")}</label>
                        <div className="relative flex items-center text-start">
                          <input
                            value={pth}
                            onChange={(e) => setPth(e.target.value)}
                            className="w-full h-12 px-sm border border-border-subtle dark:border-outline-variant dark:bg-inverse-surface rounded-md focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none text-sm text-on-surface dark:text-white text-start"
                            placeholder={language === "ar" ? "المرجع: ١٥ - ٦٥" : "Ref: 15 - 65"}
                            type="number"
                          />
                          <span className="absolute end-sm text-on-surface-variant text-xs">{language === "ar" ? "بيكوغرام/مل" : "pg/mL"}</span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-xs text-start">
                        <label className="font-body-md text-body-md font-semibold text-on-surface text-sm text-start">{t("labs.vitamin.d")}</label>
                        <div className="relative flex items-center text-start">
                          <input
                            value={vitamind}
                            onChange={(e) => setVitamind(e.target.value)}
                            className="w-full h-12 px-sm border border-border-subtle dark:border-outline-variant dark:bg-inverse-surface rounded-md focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none text-sm text-on-surface dark:text-white text-start"
                            placeholder={language === "ar" ? "المرجع: ٢٠ - ٥٠" : "Ref: 20 - 50"}
                            type="number"
                          />
                          <span className="absolute end-sm text-on-surface-variant text-xs">{language === "ar" ? "نانوغرام/مل" : "ng/mL"}</span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-xs text-start">
                        <label className="font-body-md text-body-md font-semibold text-on-surface text-sm text-start">{t("labs.albumin")}</label>
                        <div className="relative flex items-center text-start">
                          <input
                            value={albumin}
                            onChange={(e) => setAlbumin(e.target.value)}
                            className="w-full h-12 px-sm border border-border-subtle dark:border-outline-variant dark:bg-inverse-surface rounded-md focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none text-sm text-on-surface dark:text-white text-start"
                            placeholder={language === "ar" ? "المرجع: ٣.٤ - ٥.٤" : "Ref: 3.4 - 5.4"}
                            step="0.1"
                            type="number"
                          />
                          <span className="absolute end-sm text-on-surface-variant text-xs">{language === "ar" ? "غ/دسل" : "g/dL"}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* CBC */}
                  <div className="text-start">
                    <h4 className="font-label-caps text-label-caps text-primary uppercase mb-md text-xs tracking-wider text-start">
                      {language === "ar" ? "تعداد الدم الكامل" : "Complete Blood Count"}
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-md text-start">
                      <div className="flex flex-col gap-xs text-start">
                        <label className="font-body-md text-body-md font-semibold text-on-surface text-sm text-start">{t("labs.hemoglobin")}</label>
                        <div className="relative flex items-center text-start">
                          <input
                            value={hemoglobin}
                            onChange={(e) => setHemoglobin(e.target.value)}
                            className="w-full h-12 px-sm border border-border-subtle dark:border-outline-variant dark:bg-inverse-surface rounded-md focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none text-sm text-on-surface dark:text-white text-start"
                            placeholder={language === "ar" ? "المرجع: ١٢.٠ - ١٥.٥" : "Ref: 12.0 - 15.5"}
                            step="0.1"
                            type="number"
                          />
                          <span className="absolute end-sm text-on-surface-variant text-xs">{language === "ar" ? "غ/دسل" : "g/dL"}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-lg border-t border-border-subtle dark:border-outline-variant bg-surface-muted dark:bg-surface-container-highest rounded-b-xl flex justify-end gap-md text-start">
                  <button
                    onClick={() => navigate("/")}
                    type="button"
                    className="px-md py-sm rounded-md border border-border-subtle dark:border-outline-variant text-on-surface dark:text-white font-semibold text-sm hover:bg-surface-container-low transition-colors text-start"
                  >
                    {t("common.cancel")}
                  </button>
                  <button
                    onClick={handleSave}
                    type="button"
                    className="px-lg py-sm rounded-md bg-primary-container text-white font-semibold text-sm hover:bg-primary transition-colors flex items-center gap-xs active:scale-95 duration-150 text-start"
                  >
                    <span className="material-symbols-outlined text-[18px]">check_circle</span>
                    {language === "ar" ? "حفظ إدخال المختبر" : "Save Lab Intake"}
                  </button>
                </div>
              </form>
            ) : (
              /* Success confirmation state */
              <div className="bg-white dark:bg-on-background rounded-xl p-8 card-shadow border border-success-medical flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-success-medical/10 rounded-full flex items-center justify-center mb-md border border-success-medical/20">
                  <span className="material-symbols-outlined text-success-medical text-3xl font-bold">check_circle</span>
                </div>
                <h3 className="font-headline-lg text-headline-lg text-on-surface dark:text-white font-bold mb-sm">
                  {language === "ar" ? "تم تسجيل إدخال المختبر بنجاح" : "Lab Intake Logged Successfully"}
                </h3>
                <p className="font-body-lg text-body-lg text-on-surface-variant mb-lg">
                  {language === "ar"
                    ? `تم تسجيل نتائج مختبر المريض ${selectedPatient.name} في السجلات التاريخية.`
                    : `Lab results for ${selectedPatient.name} have been committed to history records.`}
                </p>
                <div className="flex gap-sm">
                  <button
                    onClick={() => {
                      setBun("");
                      setCreatinine("");
                      setPotassium("");
                      setCalcium("");
                      setPth("");
                      setVitamind("");
                      setAlbumin("");
                      setHemoglobin("");
                      setIsSuccess(false);
                    }}
                    className="px-lg py-sm h-12 font-semibold text-primary border border-border-subtle rounded-lg hover:bg-surface-container-low transition-colors text-xs uppercase tracking-wider"
                  >
                    {language === "ar" ? "إدخال آخر" : "Enter Another"}
                  </button>
                  <button
                    onClick={() => navigate("/doctor-dashboard")}
                    className="px-lg py-sm h-12 font-semibold text-white bg-primary-container rounded-lg hover:opacity-90 transition-colors flex items-center gap-sm text-xs uppercase tracking-wider"
                  >
                    {language === "ar" ? "العودة إلى لوحة التحكم" : "Return to Dashboard"}
                  </button>
                </div>
              </div>
            )}
          </section>
        </div>
      )}
    </div>
  );
}
