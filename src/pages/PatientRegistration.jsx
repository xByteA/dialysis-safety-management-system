import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { savePatient } from "../data/mock-data";
import { LanguageContext } from "../context/LanguageContext";
import { useTranslationNew } from "../utils/i18n";

export default function PatientRegistration() {
  const navigate = useNavigate();
  const { language } = useContext(LanguageContext);
  const t = useTranslationNew(language);

  const [formData, setFormData] = useState({
    name: "",
    nationalId: "",
    dob: "",
    gender: "",
    phone: "",
    emergencyContact: "",
    diagnosis: "",
    dryWeight: "",
    allergies: "",
    medications: "",
    vascularAccess: "",
    dialysisType: "",
    frequency: "",
    hepb: "pending",
    hepc: "pending",
    hiv: "pending"
  });

  const [step, setStep] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);
  const [newPatientId, setNewPatientId] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name) {
      alert(language === "ar" ? "يرجى تقديم الاسم الكامل للمريض." : "Please provide the Patient's Name.");
      return;
    }

    const initials = formData.name
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);

    const generatedId = `${Math.floor(10000 + Math.random() * 90000)}-${initials}`;

    const newPatient = {
      id: generatedId,
      initials,
      ...formData,
      dryWeight: parseFloat(formData.dryWeight) || 0,
      riskLevel: "Low",
      riskScore: 20,
      riskFactors: [language === "ar" ? "مريض جديد" : "New Patient"],
      bed: "Not Assigned",
      status: "Stable",
      vitalsHistory: [],
      labsHistory: []
    };

    savePatient(newPatient);
    setNewPatientId(generatedId);
    setIsSuccess(true);
  };

  return (
    <div className="max-w-4xl mx-auto pb-12 text-start">
      {/* Header & Progress */}
      <div className="mb-8 text-start">
        <h1 className="text-headline-lg font-headline-lg text-on-surface dark:text-white mb-6 font-bold text-start">
          {t("registration.register.new.patient")}
        </h1>
        <div className="flex items-center w-full max-w-2xl text-start">
          <div className="flex-1 flex flex-col items-center cursor-pointer text-start" onClick={() => setStep(1)}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 font-semibold ${
              step >= 1 ? "bg-success-medical text-white" : "bg-primary-container text-white"
            }`}>
              {step > 1 ? <span className="material-symbols-outlined text-sm">check</span> : "1"}
            </div>
            <span className="text-label-caps font-label-caps text-on-surface-variant text-[11px] text-center">
              {t("registration.step1.title")}
            </span>
          </div>
          <div className={`flex-1 h-1 mx-2 ${step > 1 ? "bg-success-medical" : "bg-primary-container/20"}`}></div>
          <div className="flex-1 flex flex-col items-center cursor-pointer text-start" onClick={() => setStep(2)}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 font-semibold ${
              step === 2 ? "bg-primary-container text-white" : "bg-surface-container-high text-on-surface-variant"
            }`}>
              2
            </div>
            <span className="text-label-caps font-label-caps text-on-surface-variant text-[11px] text-center">
              {t("registration.step2.title")}
            </span>
          </div>
        </div>
      </div>

      {!isSuccess ? (
        <form onSubmit={handleSubmit} className="space-y-6 text-start">
          {step === 1 ? (
            /* Step 1: Basic & Identity Info */
            <div className="bg-white dark:bg-on-background rounded-xl p-6 card-shadow border border-border-subtle dark:border-outline-variant text-start">
              <h2 className="text-headline-md font-headline-md font-semibold border-b border-border-subtle dark:border-outline-variant pb-2 mb-6 text-on-surface dark:text-white text-start">
                {language === "ar" ? "هوية المريض والبيانات الشخصية" : "Patient Identity & Contact"}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter text-start">
                <div className="text-start">
                  <label className="block text-sm font-semibold mb-1 text-on-surface-variant text-start">{language === "ar" ? "الاسم الكامل *" : "Full Name *"}</label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border border-border-subtle dark:border-outline-variant dark:bg-inverse-surface rounded-lg p-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary dark:text-white text-start"
                    placeholder={language === "ar" ? "مثال: جون دو" : "e.g. John Doe"}
                    type="text"
                    required
                  />
                </div>
                <div className="text-start">
                  <label className="block text-sm font-semibold mb-1 text-on-surface-variant text-start">{language === "ar" ? "الهوية الوطنية / جواز السفر" : "National ID / Passport"}</label>
                  <input
                    name="nationalId"
                    value={formData.nationalId}
                    onChange={handleChange}
                    className="w-full border border-border-subtle dark:border-outline-variant dark:bg-inverse-surface rounded-lg p-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary dark:text-white text-start"
                    placeholder={language === "ar" ? "مثال: NID-123456" : "e.g. NID-123456"}
                    type="text"
                  />
                </div>
                <div className="text-start">
                  <label className="block text-sm font-semibold mb-1 text-on-surface-variant text-start">{t("patient.date.of.birth")}</label>
                  <input
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    className="w-full border border-border-subtle dark:border-outline-variant dark:bg-inverse-surface rounded-lg p-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary dark:text-white text-start"
                    type="date"
                  />
                </div>
                <div className="text-start">
                  <label className="block text-sm font-semibold mb-1 text-on-surface-variant text-start">{language === "ar" ? "الجنس" : "Gender"}</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full border border-border-subtle dark:border-outline-variant dark:bg-inverse-surface rounded-lg p-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary dark:text-white text-start"
                  >
                    <option value="">{language === "ar" ? "اختر الجنس" : "Select Gender"}</option>
                    <option value="Male">{language === "ar" ? "ذكر" : "Male"}</option>
                    <option value="Female">{language === "ar" ? "أنثى" : "Female"}</option>
                    <option value="Other">{language === "ar" ? "آخر" : "Other"}</option>
                  </select>
                </div>
                <div className="text-start">
                  <label className="block text-sm font-semibold mb-1 text-on-surface-variant text-start">{t("patient.phone")}</label>
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full border border-border-subtle dark:border-outline-variant dark:bg-inverse-surface rounded-lg p-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary dark:text-white text-start"
                    placeholder="+1 (555) 000-0000"
                    type="tel"
                  />
                </div>
                <div className="text-start">
                  <label className="block text-sm font-semibold mb-1 text-on-surface-variant text-start">{language === "ar" ? "جهة الاتصال في حالات الطوارئ" : "Emergency Contact"}</label>
                  <input
                    name="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={handleChange}
                    className="w-full border border-border-subtle dark:border-outline-variant dark:bg-inverse-surface rounded-lg p-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary dark:text-white text-start"
                    placeholder={language === "ar" ? "الاسم، صلة القرابة والهاتف" : "Name, Relationship & Phone"}
                    type="text"
                  />
                </div>
              </div>
              <div className="flex justify-end mt-6 text-start">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="bg-primary-container text-white font-semibold py-3 px-8 rounded-lg shadow-sm hover:opacity-90 active:scale-95 transition-all text-sm text-center shrink-0"
                >
                  {t("common.next")}
                </button>
              </div>
            </div>
          ) : (
            /* Step 2: Medical Baseline */
            <div className="space-y-6 text-start">
              {/* Clinical Info Section */}
              <div className="bg-white dark:bg-on-background rounded-xl p-6 card-shadow border border-border-subtle dark:border-outline-variant text-start">
                <h2 className="text-headline-md font-headline-md font-semibold border-b border-border-subtle dark:border-outline-variant pb-2 mb-6 text-on-surface dark:text-white text-start">
                  {language === "ar" ? "المعلومات والتشخيص السريري" : "Clinical Information"}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter text-start">
                  <div className="md:col-span-2 text-start">
                    <label className="block text-sm font-semibold mb-1 text-on-surface-variant text-start">{language === "ar" ? "التشخيص الرئيسي" : "Primary Diagnosis"}</label>
                    <input
                      name="diagnosis"
                      value={formData.diagnosis}
                      onChange={handleChange}
                      className="w-full border border-border-subtle dark:border-outline-variant dark:bg-inverse-surface rounded-lg p-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary dark:text-white text-start"
                      placeholder={language === "ar" ? "مثال: الفشل الكلوي في المرحلة النهائية" : "e.g. End Stage Renal Disease"}
                      type="text"
                    />
                  </div>
                  <div className="text-start">
                    <label className="block text-sm font-semibold mb-1 text-on-surface-variant text-start">{t("patient.dry.weight")} ({language === "ar" ? "كجم" : "kg"})</label>
                    <input
                      name="dryWeight"
                      value={formData.dryWeight}
                      onChange={handleChange}
                      className="w-full border border-border-subtle dark:border-outline-variant dark:bg-inverse-surface rounded-lg p-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary dark:text-white text-start"
                      placeholder="0.0"
                      step="0.1"
                      type="number"
                    />
                  </div>
                  <div className="text-start">
                    <label className="block text-sm font-semibold mb-1 text-on-surface-variant text-start">{language === "ar" ? "الحساسية المعروفة" : "Known Allergies"}</label>
                    <input
                      name="allergies"
                      value={formData.allergies}
                      onChange={handleChange}
                      className="w-full border border-border-subtle dark:border-outline-variant dark:bg-inverse-surface rounded-lg p-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary dark:text-white text-start"
                      placeholder={language === "ar" ? "مثال: البنسلين" : "e.g. Penicillin"}
                      type="text"
                    />
                  </div>
                  <div className="md:col-span-2 text-start">
                    <label className="block text-sm font-semibold mb-1 text-on-surface-variant text-start">{language === "ar" ? "الأدوية الحالية" : "Current Medications"}</label>
                    <textarea
                      name="medications"
                      value={formData.medications}
                      onChange={handleChange}
                      className="w-full border border-border-subtle dark:border-outline-variant dark:bg-inverse-surface rounded-lg p-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary dark:text-white text-start"
                      placeholder={language === "ar" ? "أدرج الأدوية الحالية..." : "List medications..."}
                      rows="3"
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* Dialysis Details Section */}
              <div className="bg-white dark:bg-on-background rounded-xl p-6 card-shadow border border-border-subtle dark:border-outline-variant text-start">
                <h2 className="text-headline-md font-headline-md font-semibold border-b border-border-subtle dark:border-outline-variant pb-2 mb-6 text-on-surface dark:text-white text-start">
                  {language === "ar" ? "موضع الوصول وجدول غسيل الكلى" : "Dialysis Access & Schedule"}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter text-start">
                  <div className="text-start">
                    <label className="block text-sm font-semibold mb-1 text-on-surface-variant text-start">{language === "ar" ? "نوع الوصول الوعائي" : "Vascular Access Type"}</label>
                    <select
                      name="vascularAccess"
                      value={formData.vascularAccess}
                      onChange={handleChange}
                      className="w-full border border-border-subtle dark:border-outline-variant dark:bg-inverse-surface rounded-lg p-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary dark:text-white text-start"
                    >
                      <option value="">{language === "ar" ? "اختر نوع الوصول" : "Select Access Type"}</option>
                      <option value="AV Fistula">{language === "ar" ? "ناسور شرياني وريدي (AV Fistula)" : "AV Fistula"}</option>
                      <option value="AV Graft">{language === "ar" ? "رقعة شريانية وريدية (AV Graft)" : "AV Graft"}</option>
                      <option value="PermCath">{language === "ar" ? "قسطرة دائمة (PermCath)" : "PermCath"}</option>
                    </select>
                  </div>
                  <div className="text-start">
                    <label className="block text-sm font-semibold mb-1 text-on-surface-variant text-start">{language === "ar" ? "نوع غسيل الكلى" : "Dialysis Type"}</label>
                    <select
                      name="dialysisType"
                      value={formData.dialysisType}
                      onChange={handleChange}
                      className="w-full border border-border-subtle dark:border-outline-variant dark:bg-inverse-surface rounded-lg p-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary dark:text-white text-start"
                    >
                      <option value="">{language === "ar" ? "اختر نوع غسيل الكلى" : "Select Dialysis Type"}</option>
                      <option value="Hemodialysis">{language === "ar" ? "غسيل كلى دموي (Hemodialysis)" : "Hemodialysis"}</option>
                      <option value="Peritoneal Dialysis">{language === "ar" ? "غسيل كلى صفاقي (Peritoneal Dialysis)" : "Peritoneal Dialysis"}</option>
                    </select>
                  </div>
                  <div className="md:col-span-2 text-start">
                    <label className="block text-sm font-semibold mb-1 text-on-surface-variant text-start">{language === "ar" ? "تكرار الجلسات" : "Session Frequency"}</label>
                    <input
                      name="frequency"
                      value={formData.frequency}
                      onChange={handleChange}
                      className="w-full border border-border-subtle dark:border-outline-variant dark:bg-inverse-surface rounded-lg p-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary dark:text-white text-start"
                      placeholder={language === "ar" ? "مثال: ٣ مرات في الأسبوع" : "e.g. 3 times per week"}
                      type="text"
                    />
                  </div>
                </div>
              </div>

              {/* Virus Screening Section */}
              <div className="bg-white dark:bg-on-background rounded-xl p-6 card-shadow border border-border-subtle dark:border-outline-variant text-start">
                <h2 className="text-headline-md font-headline-md font-semibold border-b border-border-subtle dark:border-outline-variant pb-2 mb-6 text-on-surface dark:text-white text-start">
                  {language === "ar" ? "فحص الفيروسات والأمراض المعدية" : "Virus Screening"}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter text-start">
                  <div className="text-start">
                    <label className="block text-sm font-semibold mb-1 text-on-surface-variant text-start">{language === "ar" ? "التهاب الكبد ب (Hep B)" : "Hepatitis B"}</label>
                    <select
                      name="hepb"
                      value={formData.hepb}
                      onChange={handleChange}
                      className="w-full border border-border-subtle dark:border-outline-variant dark:bg-inverse-surface rounded-lg p-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary dark:text-white text-start"
                    >
                      <option value="pending">{language === "ar" ? "معلق" : "Pending"}</option>
                      <option value="Negative">{language === "ar" ? "سالب" : "Negative"}</option>
                      <option value="Positive">{language === "ar" ? "موجب" : "Positive"}</option>
                    </select>
                  </div>
                  <div className="text-start">
                    <label className="block text-sm font-semibold mb-1 text-on-surface-variant text-start">{language === "ar" ? "التهاب الكبد ج (Hep C)" : "Hepatitis C"}</label>
                    <select
                      name="hepc"
                      value={formData.hepc}
                      onChange={handleChange}
                      className="w-full border border-border-subtle dark:border-outline-variant dark:bg-inverse-surface rounded-lg p-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary dark:text-white text-start"
                    >
                      <option value="pending">{language === "ar" ? "معلق" : "Pending"}</option>
                      <option value="Negative">{language === "ar" ? "سالب" : "Negative"}</option>
                      <option value="Positive">{language === "ar" ? "موجب" : "Positive"}</option>
                    </select>
                  </div>
                  <div className="text-start">
                    <label className="block text-sm font-semibold mb-1 text-on-surface-variant text-start">{language === "ar" ? "فيروس نقص المناعة البشرية (HIV)" : "HIV"}</label>
                    <select
                      name="hiv"
                      value={formData.hiv}
                      onChange={handleChange}
                      className="w-full border border-border-subtle dark:border-outline-variant dark:bg-inverse-surface rounded-lg p-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary dark:text-white text-start"
                    >
                      <option value="pending">{language === "ar" ? "معلق" : "Pending"}</option>
                      <option value="Negative">{language === "ar" ? "سالب" : "Negative"}</option>
                      <option value="Positive">{language === "ar" ? "موجب" : "Positive"}</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-between items-center pt-4 text-start">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="border border-border-subtle dark:border-outline-variant text-on-surface dark:text-white font-semibold py-3 px-8 rounded-lg shadow-sm hover:bg-surface-container-low transition-all text-sm shrink-0"
                >
                  {t("common.back")}
                </button>
                <button
                  type="submit"
                  className="bg-primary text-white font-semibold py-3 px-8 rounded-lg shadow-sm hover:opacity-90 active:scale-95 transition-all text-sm shrink-0"
                >
                  {language === "ar" ? "إنهاء وتسجيل المريض" : "Register Patient"}
                </button>
              </div>
            </div>
          )}
        </form>
      ) : (
        /* Confirmation State */
        <div className="bg-white dark:bg-on-background rounded-xl p-8 card-shadow border border-success-medical flex flex-col items-center justify-center text-center max-w-xl mx-auto">
          <div className="w-16 h-16 bg-success-medical/10 rounded-full flex items-center justify-center mb-md border border-success-medical/20">
            <span className="material-symbols-outlined text-success-medical text-3xl font-bold">check_circle</span>
          </div>
          <h3 className="font-headline-lg text-headline-lg text-on-surface dark:text-white font-bold mb-sm">
            {language === "ar" ? "تم تسجيل المريض بنجاح" : "Patient Registered Successfully"}
          </h3>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-4">
            {language === "ar" ? (
              <>
                تم إدراج المريض <strong>{formData.name}</strong> بنجاح تحت معرف المريض: <span className="text-primary font-bold">{newPatientId}</span>.
              </>
            ) : (
              <>
                <strong>{formData.name}</strong> has been enrolled under Patient ID: <span className="text-primary font-bold">{newPatientId}</span>.
              </>
            )}
          </p>
          <div className="flex flex-col gap-2 w-full mt-4">
            <button
              onClick={() => navigate("/")}
              className="w-full bg-primary-container text-white py-3 rounded-lg font-semibold text-sm hover:opacity-95 active:scale-95 duration-150 transition-all text-center shrink-0"
            >
              {language === "ar" ? "الانتقال إلى قائمة جلسات الممرضة" : "Go to Nurse Session Queue"}
            </button>
            <button
              onClick={() => navigate("/doctor-dashboard")}
              className="w-full border border-border-subtle dark:border-outline-variant text-on-surface dark:text-white py-3 rounded-lg font-semibold text-sm hover:bg-surface-container-low text-center shrink-0"
            >
              {language === "ar" ? "الانتقال إلى لوحة تحكم الطبيب" : "Go to Doctor Dashboard"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
