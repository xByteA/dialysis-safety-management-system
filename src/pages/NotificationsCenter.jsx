import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { getAlerts, triggerAlert } from "../data/mock-data";
import { LanguageContext } from "../context/LanguageContext";
import { useTranslationNew } from "../utils/i18n";

export default function NotificationsCenter() {
  const navigate = useNavigate();
  const [alerts, setAlerts] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [newType, setNewType] = useState("warning");
  const { language } = useContext(LanguageContext);
  const t = useTranslationNew(language);

  useEffect(() => {
    setAlerts(getAlerts());
  }, []);

  const handleDismiss = (id) => {
    const updated = alerts.filter(a => a.id !== id);
    setAlerts(updated);
    localStorage.setItem("mercy_alerts", JSON.stringify(updated));
  };

  const handleClearAll = () => {
    setAlerts([]);
    localStorage.setItem("mercy_alerts", JSON.stringify([]));
  };

  const handleSimulateAlert = (e) => {
    e.preventDefault();
    if (!newTitle || !newMessage) {
      alert(language === "ar" ? "يرجى ملء العنوان والرسالة." : "Please fill out Title and Message.");
      return;
    }

    const payload = {
      type: newType,
      title: newTitle,
      time: language === "ar" ? "الآن" : "Just now",
      message: newMessage,
      actionable: false
    };

    const updated = triggerAlert(payload);
    setAlerts(updated);
    setNewTitle("");
    setNewMessage("");
  };

  const translateAlertTitle = (title) => {
    if (language !== "ar") return title;
    if (title === "Critical BP Drop - Bed 04") return "هبوط حاد في ضغط الدم - السرير ٠٤";
    if (title === "Risk Level Change - Arthur Pendelton") return "تغيير مستوى المخاطر - آرثر بندلتون";
    if (title === "Equipment Calibration Overdue - Machine 12") return "تأخرت معايرة الأجهزة - الآلة رقم ١٢";
    return title;
  };

  const translateAlertMessage = (msg) => {
    if (language !== "ar") return msg;
    if (msg === "BP dropped to 85/55 during hour 2 of dialysis.") return "انخفض ضغط الدم إلى ٥٥/٨٥ خلال الساعة الثانية من غسيل الكلى.";
    if (msg === "AI prediction indicates elevated risk for clotting in AV graft.") return "تشير توقعات الذكاء الاصطناعي إلى زيادة خطر التجلط في رقعة AV الوعائية.";
    if (msg === "Ultrafiltration module is past the scheduled calibration window.") return "تجاوزت وحدة الترشيح الفائق نافذة المعايرة المجدولة.";
    return msg;
  };

  const translateActionText = (txt) => {
    if (language !== "ar") return txt;
    if (txt === "Call Station") return "اتصل بالمحطة";
    if (txt === "Review Access Info") return "مراجعة معلومات الوصول";
    return txt;
  };

  const translateAlertTime = (time) => {
    if (language !== "ar") return time;
    return time.replace("min ago", "دقائق مضت").replace("hour ago", "ساعة مضت").replace("Just now", "الآن");
  };

  return (
    <div className="max-w-6xl mx-auto pb-12 flex flex-col gap-lg text-start">
      <div className="flex justify-between items-center border-b border-border-subtle dark:border-outline-variant pb-md mb-md text-start">
        <div className="text-start">
          <h1 className="text-headline-lg font-headline-lg text-on-surface dark:text-white font-bold text-start">
            {language === "ar" ? "مركز التنبيهات السريرية" : "Notifications Center"}
          </h1>
          <p className="text-xs text-on-surface-variant mt-1 text-start">
            {language === "ar" ? "مراجعة التنبيهات السريرية وتحذيرات الأنظمة وإدارتها وإلغائها." : "Review, action, or clear clinical alerts and system warnings."}
          </p>
        </div>
        {alerts.length > 0 && (
          <button
            onClick={handleClearAll}
            className="text-error font-semibold hover:underline text-sm uppercase tracking-wider"
          >
            {language === "ar" ? "مسح جميع التنبيهات" : "Clear All Alerts"}
          </button>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-gutter text-start">
        {/* Left: Alerts list */}
        <section className="lg:w-2/3 space-y-md text-start">
          {alerts.length > 0 ? (
            alerts.map((alert) => {
              const isCritical = alert.type === "heart_broken" || alert.type === "critical";
              const isWarning = alert.type === "warning" || alert.type === "trending_up";
              
              return (
                <div
                  key={alert.id}
                  className={`p-lg rounded-xl border shadow-soft flex gap-md transition-all text-start ${
                    isCritical
                      ? "bg-red-50/50 dark:bg-red-950/10 border-red-200"
                      : isWarning
                      ? "bg-amber-50/50 dark:bg-amber-950/10 border-amber-200"
                      : "bg-white dark:bg-on-background border-border-subtle dark:border-outline-variant"
                  }`}
                >
                  <div className={`p-sm rounded-full shrink-0 ${
                    isCritical 
                      ? "bg-red-100 text-red-700" 
                      : isWarning
                      ? "bg-amber-100 text-amber-700"
                      : "bg-blue-100 text-blue-700"
                  }`}>
                    <span className="material-symbols-outlined text-[20px]">
                      {alert.type === "heart_broken" ? "heart_broken" : alert.type === "warning" ? "warning" : "info"}
                    </span>
                  </div>
                  
                  <div className="flex-grow space-y-sm text-start">
                    <div className="flex justify-between items-start text-start">
                      <div className="text-start">
                        <h4 className="font-headline-md text-sm font-bold text-on-surface dark:text-white leading-tight text-start">
                          {translateAlertTitle(alert.title)}
                        </h4>
                        <span className="text-[10px] text-on-surface-variant font-semibold mt-1 block text-start">
                          {translateAlertTime(alert.time)}
                        </span>
                      </div>
                      <button
                        onClick={() => handleDismiss(alert.id)}
                        className="text-on-surface-variant hover:text-error"
                      >
                        <span className="material-symbols-outlined text-[18px]">close</span>
                      </button>
                    </div>

                    <p className="text-xs text-on-surface-variant leading-relaxed text-start">
                      {translateAlertMessage(alert.message)}
                    </p>

                    {alert.actionable && (
                      <div className="flex gap-sm pt-2 text-start">
                        <button
                          onClick={() => {
                            if (alert.actionType === "critical") {
                              navigate("/messaging");
                            } else {
                              navigate("/patient-risk-summary");
                            }
                          }}
                          className={`px-4 py-1.5 rounded text-xs font-bold uppercase transition-all shadow-sm ${
                            isCritical
                              ? "bg-critical-alert text-white hover:bg-red-600"
                              : "bg-primary-container text-white hover:opacity-90"
                          }`}
                        >
                          {translateActionText(alert.actionText) || (language === "ar" ? "استجابة" : "Respond")}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="p-xl bg-white dark:bg-on-background border border-border-subtle dark:border-outline-variant text-center rounded-xl text-on-surface-variant shadow-soft">
              <span className="material-symbols-outlined text-success-medical text-4xl mb-md font-bold">check_circle</span>
              <p className="font-semibold text-sm">
                {language === "ar" ? "صندوق الوارد فارغ! لا توجد إنذارات أو تنبيهات نشطة." : "Inbox cleared! No active warnings or alarms."}
              </p>
            </div>
          )}
        </section>

        {/* Right: Simulate Alerts Form */}
        <section className="lg:w-1/3 text-start">
          <form onSubmit={handleSimulateAlert} className="bg-white dark:bg-on-background rounded-xl p-6 shadow-soft border border-border-subtle dark:border-outline-variant space-y-md text-start">
            <h2 className="text-headline-md font-headline-md font-bold text-on-surface dark:text-white border-b border-border-subtle dark:border-outline-variant pb-2 mb-4 text-start">
              {language === "ar" ? "محاكاة إنذار السلامة" : "Simulate Safety Alarm"}
            </h2>

            <div className="space-y-sm text-start">
              <label className="block text-sm font-semibold text-on-surface-variant text-start">{t("alerts.alert.type")}</label>
              <select
                value={newType}
                onChange={(e) => setNewType(e.target.value)}
                className="w-full border border-border-subtle dark:border-outline-variant dark:bg-inverse-surface rounded-lg p-3 text-sm focus:outline-none focus:border-primary text-on-surface dark:text-white text-start"
              >
                <option value="heart_broken">{language === "ar" ? "حرج / تنبيه قلبي حاد" : "Critical / Cardiac Alert"}</option>
                <option value="warning">{language === "ar" ? "تحذير / إنذار النظام أو الحساس" : "System / Sensor Alarm"}</option>
                <option value="info">{language === "ar" ? "تحديث الحالة / معلومات" : "Status Update / Info"}</option>
              </select>
            </div>

            <div className="space-y-sm text-start">
              <label className="block text-sm font-semibold text-on-surface-variant text-start">{language === "ar" ? "عنوان التنبيه *" : "Alert Title *"}</label>
              <input
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder={language === "ar" ? "مثال: ارتفاع حرج في درجة الحرارة" : "e.g. Critical Temp Rise"}
                className="w-full border border-border-subtle dark:border-outline-variant dark:bg-inverse-surface rounded-lg p-3 text-sm focus:outline-none focus:border-primary text-on-surface dark:text-white text-start"
                type="text"
                required
              />
            </div>

            <div className="space-y-sm text-start">
              <label className="block text-sm font-semibold text-on-surface-variant text-start">{t("alerts.alert.message")} *</label>
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder={language === "ar" ? "تفاصيل مخاوف السلامة السريرية..." : "Details of safety concern..."}
                rows="3"
                className="w-full border border-border-subtle dark:border-outline-variant dark:bg-inverse-surface rounded-lg p-3 text-sm focus:outline-none focus:border-primary text-on-surface dark:text-white text-start"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-surface-tint transition-all active:scale-95 duration-150 text-sm uppercase font-bold tracking-wider text-center"
            >
              {language === "ar" ? "إطلاق إنذار الأمن والسلامة" : "Trigger Alert"}
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
