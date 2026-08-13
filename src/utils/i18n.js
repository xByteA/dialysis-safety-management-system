import enTranslations from '../locales/en.json';
import arTranslations from '../locales/ar.json';

const translations = {
  en: enTranslations,
  ar: arTranslations
};

const dynamicTranslations = {
  ar: {
    // Statuses
    "In Progress": "قيد التنفيذ",
    "Attn Req": "مطلوب اهتمام",
    "Scheduled": "مجدول",
    "Stable": "مستقر",
    "Attention Required": "مطلوب اهتمام",
    "Active": "نشط",
    "Inactive": "غير نشط",
    "Resolved": "تم الحل",
    "Under Review": "قيد المراجعة",
    "Routine": "روتيني",
    "Urgent": "عاجل",

    // Alerts / Med Alerts
    "Heparin: 15m Overdue": "هيبارين: متأخر 15 دقيقة",
    "Critical BP Drop": "انخفاض حرج في ضغط الدم",
    "Epogen: Due in 10m": "إيبوجين: مستحق خلال 10 دقائق",
    "Iron: Due 11:30": "الحديد: مستحق 11:30",
    "Critical BP Drop - Bed 04": "انخفاض حرج في ضغط الدم - سرير 04",
    "Risk Level Change - Arthur Pendelton": "تغيير مستوى المخاطر - آرثر بندلتون",
    "Equipment Calibration Overdue - Machine 12": "تأخر معايرة المعدات - جهاز 12",
    "All Within Normal Limits": "كل شيء ضمن الحدود الطبيعية",
    "Potassium 5.6": "البوتاسيوم 5.6",

    // Supplies
    "High-Flux Dialyzer (F180)": "جهاز غسيل الكلى عالي التدفق (F180)",
    "AV Fistula Needle Sets (15G)": "مجموعات إبرة الناسور الشرياني الوريدي (15G)",
    "Acid Concentrate (Red)": "تركيز الحمض (الأحمر)",
    "Heparin Sodium 1000U/mL": "هيبارين الصوديوم 1000 وحدة/مل",
    "Saline Bag 0.9% (1000mL)": "كيس محلول ملحي 0.9٪ (1000 مل)",
    "In Stock": "متوفر",
    "Low Stock": "مخزون منخفض",
    "Consumables": "المواد الاستهلاكية",
    "Solutions": "المحاليل",
    "Medications": "الأدوية",

    // Severity / Risk levels
    "Medium": "متوسط",
    "High": "مرتفع",
    "Critical": "حرج",
    "Low": "منخفض",
    "Moderate": "متوسط",
    "None": "لا يوجد",

    // Incidents
    "Air Leak Detected": "تم الكشف عن تسرب هواء",
    "Conductivity Spike": "ارتفاع الموصلية",

    // Genders
    "Male": "ذكر",
    "Female": "أنثى",

    // Doctor Dashboard Dynamic Translations
    "Action Req": "مطلوب إجراء",
    "All systems nominal": "جميع الأنظمة تعمل بشكل طبيعي",
    "High-Priority Notifications": "إشعارات عالية الأولوية",
    "Dismiss All": "تجاهل الكل",
    "Today's Scheduled Sessions": "جلسات اليوم المجدولة",
    "Full Schedule": "الجدول الكامل",
    "Time": "الوقت",
    "Patient": "المريض",
    "Bed": "السرير",
    "Status": "الحالة",
    "Pending Lab Reviews": "مراجعات المختبر المعلقة",
    "Review": "مراجعة",
    "Acknowledge": "إقرار",
    "View All Pending Labs": "عرض جميع المختبرات المعلقة",
    "AI Clinical Insights": "رؤى سريرية بالذكاء الاصطناعي",
    "Based on recent flowsheets, 2 patients may require dry weight adjustments.": "بناءً على مخططات التدفق الأخيرة، قد يحتاج مريضان إلى تعديلات الوزن الجاف.",
    "View Recommendations": "عرض التوصيات",
    "View Alerts": "عرض التنبيهات",
    "View Chart": "عرض المخطط",
    "Review Now": "راجع الآن",
    "Critical Alerts": "تنبيهات حرجة"
  }
};

export const translateDynamic = (text, language) => {
  if (!text) return text;
  if (language !== "ar") return text;

  const textStr = String(text).trim();

  // Direct match
  if (dynamicTranslations.ar[textStr]) {
    return dynamicTranslations.ar[textStr];
  }

  // Chair/Bed pattern matching
  let replaced = textStr;
  replaced = replaced.replace(/\bChair\b/gi, "كرسي");
  replaced = replaced.replace(/\bBed\b/gi, "سرير");

  // Shift pattern
  replaced = replaced.replace(/\bShift:\b/gi, "الوردية:");

  if (replaced !== textStr) {
    return replaced;
  }

  return textStr;
};

export const useTranslationNew = (language) => {
  return (key) => {
    const dotIndex = key.indexOf('.');
    if (dotIndex === -1) {
      // First check dynamic lookup
      if (language === 'ar') {
        const dyn = translateDynamic(key, 'ar');
        if (dyn !== key) return dyn;
      }
      const activeTranslations = translations[language] || translations['en'];
      return activeTranslations[key] || key;
    }

    const category = key.substring(0, dotIndex);
    const subKey = key.substring(dotIndex + 1);

    const lang = language === 'ar' ? 'ar' : 'en';
    const activeDict = translations[lang] || translations['en'];

    if (activeDict[category] && subKey in activeDict[category]) {
      return activeDict[category][subKey];
    }

    // Fallback to English if not found in active language
    const fallbackDict = translations['en'];
    if (fallbackDict[category] && subKey in fallbackDict[category]) {
      return fallbackDict[category][subKey];
    }

    return key;
  };
};

// Shorthand function
export const t = (language, key) => {
  const translator = useTranslationNew(language);
  return translator(key);
};
