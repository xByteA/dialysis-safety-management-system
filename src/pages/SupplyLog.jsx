import React, { useState, useEffect, useContext } from "react";
import { getSupplies } from "../data/mock-data";
import { LanguageContext } from "../context/LanguageContext";
import { useTranslationNew } from "../utils/i18n";

export default function SupplyLog() {
  const [supplies, setSupplies] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedItemId, setSelectedItemId] = useState("");
  const [adjustQty, setAdjustQty] = useState("");
  const [adjustType, setAdjustType] = useState("add"); // "add" or "deduct"
  const [successMsg, setSuccessMsg] = useState("");
  const { language } = useContext(LanguageContext);
  const t = useTranslationNew(language);

  useEffect(() => {
    setSupplies(getSupplies());
  }, []);

  const filteredSupplies = supplies.filter(item => {
    const term = search.toLowerCase();
    const itemName = translateItemName(item.name).toLowerCase();
    const itemCat = translateCategory(item.category).toLowerCase();
    return itemName.includes(term) || itemCat.includes(term) || item.id.toLowerCase().includes(term);
  });

  const translateItemName = (name) => {
    if (language !== "ar") return name;
    if (name.includes("High-Flux Dialyzer")) return "فلتر غسيل كلى عالي التدفق (High-Flux Dialyzer F180)";
    if (name.includes("AV Fistula Needle")) return "مجموعات إبر الناصور (AV Fistula Needle Sets 15G)";
    if (name.includes("Acid Concentrate")) return "محلول حمض مركز - أحمر (Acid Concentrate Red)";
    if (name.includes("Heparin Sodium")) return "هيبارين صوديوم ١٠٠٠ وحدة/مل (Heparin Sodium)";
    if (name.includes("Saline Bag")) return "كيس محلول ملحي ٠.٩٪ ١٠٠٠مل (Saline Bag)";
    return name;
  };

  const translateCategory = (cat) => {
    if (language !== "ar") return cat;
    if (cat === "Consumables") return "مستهلكات طبية";
    if (cat === "Solutions") return "محاليل سريرية";
    if (cat === "Medications") return "أدوية ومستحضرات";
    return cat;
  };

  const translateUnit = (unit) => {
    if (language !== "ar") return unit;
    if (unit === "pcs") return "قطعة";
    if (unit === "jugs") return "جالون";
    if (unit === "vials") return "أمبولة";
    return unit;
  };

  const translateStatus = (status) => {
    if (language !== "ar") return status;
    if (status === "In Stock") return "متوفر";
    if (status === "Low Stock") return "مخزون منخفض";
    return status;
  };

  const handleAdjust = (e) => {
    e.preventDefault();
    if (!selectedItemId || !adjustQty) {
      alert(language === "ar" ? "يرجى تحديد مادة التوريد وتحديد كمية التعديل." : "Please select an item and enter an adjustment amount.");
      return;
    }

    const qty = parseInt(adjustQty);
    if (isNaN(qty) || qty <= 0) {
      alert(language === "ar" ? "يرجى إدخال كمية صحيحة ومقبولة." : "Please enter a valid quantity.");
      return;
    }

    const updated = supplies.map(item => {
      if (item.id === selectedItemId) {
        let newStock = item.stock;
        if (adjustType === "add") {
          newStock += qty;
        } else {
          newStock = Math.max(0, newStock - qty);
        }

        const newStatus = newStock <= item.reorder ? "Low Stock" : "In Stock";
        return {
          ...item,
          stock: newStock,
          status: newStatus
        };
      }
      return item;
    });

    setSupplies(updated);
    localStorage.setItem("mercy_supplies", JSON.stringify(updated));

    const itemObj = supplies.find(i => i.id === selectedItemId);
    const itemName = itemObj ? translateItemName(itemObj.name) : selectedItemId;

    if (language === "ar") {
      setSuccessMsg(`تم بنجاح ${adjustType === "add" ? "إضافة وتوريد" : "صرف وسحب"} ${qty} وحدة من ${itemName}.`);
    } else {
      setSuccessMsg(`Successfully ${adjustType === "add" ? "added" : "deducted"} ${qty} units of ${itemName}.`);
    }
    setAdjustQty("");

    setTimeout(() => {
      setSuccessMsg("");
    }, 4000);
  };

  const lowStockCount = supplies.filter(s => s.stock <= s.reorder).length;

  return (
    <div className="max-w-6xl mx-auto pb-12 space-y-lg text-start">
      {/* Top Banner metrics */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-gutter text-start">
        <div className="bg-white dark:bg-on-background rounded-xl shadow-soft p-lg border border-border-subtle dark:border-outline-variant text-start">
          <h3 className="font-label-caps text-label-caps text-on-surface-variant mb-sm text-start">
            {language === "ar" ? "إجمالي وحدات المخزون (SKUs)" : "Total Supply SKUs"}
          </h3>
          <span className="font-display-metrics text-display-metrics text-primary font-bold text-start">{supplies.length}</span>
        </div>
        <div className="bg-white dark:bg-on-background rounded-xl shadow-soft p-lg border border-border-subtle dark:border-outline-variant text-start">
          <h3 className="font-label-caps text-label-caps text-on-surface-variant mb-sm text-start">
            {language === "ar" ? "تنبيهات انخفاض المخزون" : "Low Stock Alerts"}
          </h3>
          <span className={`font-display-metrics text-display-metrics font-bold text-start ${lowStockCount > 0 ? "text-error animate-pulse" : "text-success-medical"}`}>
            {lowStockCount}
          </span>
        </div>
        <div className="bg-white dark:bg-on-background rounded-xl shadow-soft p-lg border border-border-subtle dark:border-outline-variant text-start">
          <h3 className="font-label-caps text-label-caps text-on-surface-variant mb-sm text-start">
            {language === "ar" ? "آخر عمليات الجرد والتوريد" : "Last Stock Intake"}
          </h3>
          <span className="text-body-md text-on-surface dark:text-white font-medium block mt-sm text-start">
            {language === "ar" ? "اليوم - ٠٧:٤٥ صباحاً" : "Today - 07:45 AM"}
          </span>
          <span className="text-xs text-on-surface-variant text-start">
            {language === "ar" ? "بواسطة الفني راميريز" : "by Technician Ramirez"}
          </span>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="flex flex-col lg:flex-row gap-gutter text-start">
        {/* Left Column: Inventory List */}
        <section className="lg:w-2/3 bg-white dark:bg-on-background rounded-xl p-6 shadow-soft border border-border-subtle dark:border-outline-variant space-y-md text-start">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-sm border-b border-border-subtle dark:border-outline-variant pb-md mb-md text-start">
            <h2 className="text-headline-md font-headline-md font-bold text-on-surface dark:text-white text-start">
              {language === "ar" ? "حالة المخزون والإمدادات" : "Inventory Status"}
            </h2>
            <input
              type="text"
              placeholder={language === "ar" ? "البحث عن المواد، الفئات..." : "Search items, categories..."}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-border-subtle dark:border-outline-variant dark:bg-inverse-surface rounded-full px-4 py-2 text-xs focus:outline-none focus:border-primary max-w-xs text-on-surface dark:text-white w-full text-start"
            />
          </div>

          <div className="overflow-x-auto text-start">
            <table className="w-full text-start text-sm font-body-md">
              <thead className="bg-surface-muted dark:bg-surface-container-highest border-b border-border-subtle dark:border-outline-variant text-start">
                <tr className="text-start">
                  <th className="py-2.5 px-md text-on-surface-variant font-semibold text-xs text-start">{language === "ar" ? "رمز مادة" : "SKU"}</th>
                  <th className="py-2.5 px-md text-on-surface-variant font-semibold text-xs text-start">{language === "ar" ? "اسم مادة التوريد" : "Item Name"}</th>
                  <th className="py-2.5 px-md text-on-surface-variant font-semibold text-xs text-start">{language === "ar" ? "الفئة" : "Category"}</th>
                  <th className="py-2.5 px-md text-on-surface-variant font-semibold text-xs text-center">{language === "ar" ? "المتوفر بالمخزن" : "Stock"}</th>
                  <th className="py-2.5 px-md text-on-surface-variant font-semibold text-xs text-center">{language === "ar" ? "نقطة إعادة الطلب" : "Reorder"}</th>
                  <th className="py-2.5 px-md text-on-surface-variant font-semibold text-xs text-start">{language === "ar" ? "الحالة" : "Status"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle dark:divide-outline-variant text-start">
                {filteredSupplies.map(item => {
                  const isLow = item.stock <= item.reorder;
                  return (
                    <tr key={item.id} className="hover:bg-surface-muted/50 dark:hover:bg-surface-container-highest/50 transition-colors text-start">
                      <td className="py-3 px-md text-xs font-mono text-on-surface-variant text-start">{item.id}</td>
                      <td className="py-3 px-md font-semibold text-on-surface dark:text-white text-xs text-start">{translateItemName(item.name)}</td>
                      <td className="py-3 px-md text-xs text-on-surface-variant text-start">{translateCategory(item.category)}</td>
                      <td className="py-3 px-md text-center text-xs font-bold text-on-surface dark:text-white">
                        {item.stock} <span className="text-[10px] text-on-surface-variant font-normal">{translateUnit(item.unit)}</span>
                      </td>
                      <td className="py-3 px-md text-center text-xs text-on-surface-variant font-medium">
                        {item.reorder} {translateUnit(item.unit)}
                      </td>
                      <td className="py-3 px-md text-start">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                          isLow
                            ? "bg-error-container text-error border-error/20 animate-pulse"
                            : "bg-green-100 text-green-800 border-green-200"
                        }`}>
                          {isLow ? (language === "ar" ? "مخزون منخفض" : "Low Stock") : (language === "ar" ? "متوفر" : "In Stock")}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* Right Column: Inventory Adjustments */}
        <section className="lg:w-1/3 text-start">
          <form onSubmit={handleAdjust} className="bg-white dark:bg-on-background rounded-xl p-6 shadow-soft border border-border-subtle dark:border-outline-variant space-y-md text-start">
            <h2 className="text-headline-md font-headline-md font-bold text-on-surface dark:text-white border-b border-border-subtle dark:border-outline-variant pb-2 mb-4 text-start">
              {language === "ar" ? "تسجيل وتعديل المخزون" : "Log Stock Adjustment"}
            </h2>

            {successMsg && (
              <div className="bg-green-50 dark:bg-green-950/20 text-green-800 dark:text-green-200 p-sm rounded text-xs border border-green-200 flex items-center gap-xs font-semibold text-start">
                <span className="material-symbols-outlined text-sm">check_circle</span>
                {successMsg}
              </div>
            )}

            <div className="space-y-sm text-start">
              <label className="block text-sm font-semibold text-on-surface-variant text-start">{language === "ar" ? "اختر مادة التوريد *" : "Select Supply Item *"}</label>
              <select
                value={selectedItemId}
                onChange={(e) => setSelectedItemId(e.target.value)}
                className="w-full border border-border-subtle dark:border-outline-variant dark:bg-inverse-surface rounded-lg p-3 text-sm focus:outline-none focus:border-primary text-on-surface dark:text-white text-start"
                required
              >
                <option value="">{language === "ar" ? "اختر مادة التوريد السريرية..." : "Choose item..."}</option>
                {supplies.map(i => (
                  <option key={i.id} value={i.id}>
                    {translateItemName(i.name)} ({language === "ar" ? "رمز مادة" : "SKU"}: {i.id} - {language === "ar" ? "الحالي" : "Current"}: {i.stock} {translateUnit(i.unit)})
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-sm text-start">
              <label className="block text-sm font-semibold text-on-surface-variant text-start">{language === "ar" ? "إجراء التعديل بالمخزن" : "Adjustment Action"}</label>
              <div className="grid grid-cols-2 gap-sm text-start">
                <button
                  type="button"
                  onClick={() => setAdjustType("add")}
                  className={`py-2 rounded-lg font-semibold text-xs border transition-all ${
                    adjustType === "add"
                      ? "bg-primary-container text-white border-primary-container"
                      : "bg-white text-on-surface border-border-subtle hover:bg-surface-container-low"
                  }`}
                >
                  {language === "ar" ? "توريد واستلام مخزون (+)" : "Receive Stock (+)"}
                </button>
                <button
                  type="button"
                  onClick={() => setAdjustType("deduct")}
                  className={`py-2 rounded-lg font-semibold text-xs border transition-all ${
                    adjustType === "deduct"
                      ? "bg-error text-white border-error"
                      : "bg-white text-on-surface border-border-subtle hover:bg-surface-container-low"
                  }`}
                >
                  {language === "ar" ? "صرف وسحب مخزون (-)" : "Disburse Stock (-)"}
                </button>
              </div>
            </div>

            <div className="space-y-sm text-start">
              <label className="block text-sm font-semibold text-on-surface-variant text-start">{language === "ar" ? "الكمية لتعديلها *" : "Quantity to Adjust *"}</label>
              <input
                type="number"
                min="1"
                placeholder={language === "ar" ? "أدخل الكمية للتعديل" : "Enter quantity"}
                value={adjustQty}
                onChange={(e) => setAdjustQty(e.target.value)}
                className="w-full border border-border-subtle dark:border-outline-variant dark:bg-inverse-surface rounded-lg p-3 text-sm focus:outline-none focus:border-primary text-on-surface dark:text-white text-start"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-surface-tint transition-all active:scale-95 duration-150 text-sm uppercase font-bold tracking-wider text-center"
            >
              {language === "ar" ? "تسجيل ونشر التعديل" : "Post Adjustment"}
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
