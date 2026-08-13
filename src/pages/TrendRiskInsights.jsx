import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { getPatients } from "../data/mock-data";
import { LanguageContext } from "../context/LanguageContext";
import { useTranslationNew } from "../utils/i18n";

export default function TrendRiskInsights() {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const { language } = useContext(LanguageContext);
  const t = useTranslationNew(language);

  useEffect(() => {
    setPatients(getPatients());
  }, []);

  const getRiskScoreColor = (score) => {
    if (score >= 80) return "text-error border-error bg-error/5";
    if (score >= 50) return "text-tertiary-container border-tertiary-container bg-tertiary-container/5";
    return "text-success-medical border-success-medical bg-success-medical/5";
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

  const insightsList = [
    {
      title: language === "ar" ? "خطر تجلط منفذ الوصول الوعائي (AV Access)" : "AV Access Clotting Risk",
      metric: language === "ar" ? "تحذير تضيق الرقعة (Stenosis Warning)" : "Graft Stenosis Warning",
      desc: language === "ar"
        ? "بناءً على اتجاهات الضغط الوريدي خلال آخر ٣ جلسات، هناك احتمالية مرتفعة لحدوث تضيق في رقعة AV الوعائية للمريض آرثر بندلتون."
        : "Based on venous pressure trends during the last 3 sessions, there is an elevated probability of stenosis in Arthur Pendelton's AV graft.",
      actionText: language === "ar" ? "تفاصيل موضع الوصول الوعائي" : "Access Site Details",
      path: "/patient-risk-summary"
    },
    {
      title: language === "ar" ? "متنبئ انخفاض ضغط الدم أثناء غسيل الكلى" : "Intradialytic Hypotension Predictor",
      metric: language === "ar" ? "تحذير هبوط ضغط الدم الحرج" : "Critical BP Drop Warning",
      desc: language === "ar"
        ? "تشير نماذج التعلم الآلي إلى أن سارة جينكينز لديها احتمالية عالية للإصابة بانخفاض ضغط الدم الشرياني الحرج أثناء ذروة معدل الترشيح الفائق."
        : "Machine learning models indicate that Sarah Jenkins has a high probability of intradialytic hypotension during ultrafiltration rate peaks.",
      actionText: language === "ar" ? "مراجعة سجل العلامات الحيوية" : "Review Vitals History",
      path: "/patient-profile-vitals-trends"
    },
    {
      title: language === "ar" ? "توصيات الوزن الجاف السريري" : "Dry Weight Recommendation",
      metric: language === "ar" ? "التعديل المقترح: -٠.٥ كجم" : "Suggested Adjustment: -0.5kg",
      desc: language === "ar"
        ? "أظهر روبرت تشانغ ارتفاعات في ضغط الدم بعد العلاج بالتزامن مع علامات طفيفة لزيادة السوائل. يقترح تقليل الوزن الجاف المرجعي للسلامة."
        : "Robert Chang has shown post-treatment blood pressure elevations combined with slight fluid overload signs. Suggest reducing dry weight baseline.",
      actionText: language === "ar" ? "إدارة الوزن الجاف" : "Manage Dry Weight",
      path: "/patient-registration"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto pb-12 space-y-lg text-start">
      <div className="border-b border-border-subtle dark:border-outline-variant pb-md mb-md text-start">
        <h1 className="text-headline-lg font-headline-lg text-on-surface dark:text-white font-bold text-start">
          {language === "ar" ? "رؤى وتوقعات مخاطر سلامة المرضى بالذكاء الاصطناعي" : "AI Trend & Safety Risk Insights"}
        </h1>
        <p className="text-xs text-on-surface-variant mt-1 text-start">
          {language === "ar" ? "تقوم نماذج التعلم الآلي التنبؤية بتقييم المقاييس السريرية والبيانات الحيوية للتحذير المسبق من المضاعفات المحتملة." : "Predictive machine learning models evaluate clinical measurements to warn of potential complications."}
        </p>
      </div>

      {/* Model Overview grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter text-start">
        {insightsList.map((ins, idx) => (
          <div key={idx} className="bg-white dark:bg-on-background rounded-xl p-lg shadow-soft border border-border-subtle dark:border-outline-variant flex flex-col justify-between space-y-md text-start">
            <div className="text-start">
              <div className="flex items-center gap-xs text-[10px] font-bold text-primary uppercase tracking-wider mb-2 text-start">
                <span className="material-symbols-outlined text-sm font-bold">auto_awesome</span>
                <span>{language === "ar" ? "متنبئ التعلم الآلي" : "ML Predictor"}</span>
              </div>
              <h3 className="font-headline-md text-headline-md font-bold text-on-surface dark:text-white text-base leading-tight text-start">
                {ins.title}
              </h3>
              <p className="text-xs text-on-surface-variant font-semibold mt-1 bg-surface-muted dark:bg-inverse-surface px-2 py-1 rounded inline-block text-start">
                {ins.metric}
              </p>
              <p className="text-xs text-on-surface-variant mt-3 leading-relaxed text-start">
                {ins.desc}
              </p>
            </div>
            <button
              onClick={() => navigate(ins.path)}
              className="w-full border border-primary-container text-primary-container font-semibold text-xs py-2.5 rounded-lg hover:bg-surface-container-low transition-colors active:scale-95 duration-150 text-center shrink-0"
            >
              {ins.actionText}
            </button>
          </div>
        ))}
      </section>

      {/* Patients Risk Scores Summary */}
      <section className="bg-white dark:bg-on-background rounded-xl p-6 shadow-soft border border-border-subtle dark:border-outline-variant space-y-md text-start">
        <h2 className="text-headline-md font-headline-md font-bold text-on-surface dark:text-white text-start">
          {language === "ar" ? "تصنيفات وترتيب مخاطر المرضى النشطين" : "Active Patient Risk Rankings"}
        </h2>
        <div className="overflow-x-auto w-full text-start">
          <table className="w-full text-start text-sm font-body-md">
            <thead className="bg-surface-muted dark:bg-surface-container-highest border-b border-border-subtle dark:border-outline-variant text-start">
              <tr className="text-start">
                <th className="py-3 px-md text-on-surface-variant font-semibold text-xs text-start">{language === "ar" ? "المريض" : "Patient"}</th>
                <th className="py-3 px-md text-on-surface-variant font-semibold text-xs text-start">{language === "ar" ? "نوع الوصول الوعائي" : "Vascular Access"}</th>
                <th className="py-3 px-md text-on-surface-variant font-semibold text-xs text-start">{language === "ar" ? "تصنيف درجة الخطورة" : "Risk Classification"}</th>
                <th className="py-3 px-md text-on-surface-variant font-semibold text-xs text-center">{language === "ar" ? "النتيجة" : "Score"}</th>
                <th className="py-3 px-md text-on-surface-variant font-semibold text-xs text-end"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle dark:divide-outline-variant text-start">
              {patients.map(p => (
                <tr key={p.id} className="hover:bg-surface-muted/50 dark:hover:bg-surface-container-highest/50 transition-colors text-start">
                  <td className="py-4 px-md text-start">
                    <div className="flex items-center gap-sm text-start">
                      <div className="w-8 h-8 rounded-full bg-primary-container text-white flex items-center justify-center font-bold text-xs shrink-0">
                        {p.initials}
                      </div>
                      <div className="text-start">
                        <button 
                          onClick={() => navigate("/patient-profile-overview")}
                          className="font-semibold text-on-surface dark:text-white hover:text-primary hover:underline text-xs text-start block"
                        >
                          {p.name}
                        </button>
                        <p className="text-[10px] text-on-surface-variant mt-0.5 text-start">{language === "ar" ? "المعرف" : "ID"}: {p.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-md text-xs text-on-surface-variant text-start">{translateAccess(p.vascularAccess)}</td>
                  <td className="py-4 px-md text-start">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                      p.riskLevel === "Critical"
                        ? "bg-red-100 text-red-800 border-red-200"
                        : p.riskLevel === "High"
                        ? "bg-amber-100 text-amber-800 border-amber-200"
                        : "bg-green-100 text-green-800 border-green-200"
                    }`}>
                      {translateRisk(p.riskLevel)}
                    </span>
                  </td>
                  <td className="py-4 px-md text-center">
                    <span className={`px-3 py-1 rounded border font-mono text-xs font-bold ${getRiskScoreColor(p.riskScore)}`}>
                      {p.riskScore}%
                    </span>
                  </td>
                  <td className="py-4 px-md text-end">
                    <button 
                      onClick={() => navigate("/patient-risk-summary")}
                      className="text-primary hover:underline font-semibold text-xs"
                    >
                      {language === "ar" ? "عرض الملف" : "View File"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
