import React, { useState, useEffect } from "react";
import { getSupplies } from "../data/mock-data";

export default function SupplyLog() {
  const [supplies, setSupplies] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedItemId, setSelectedItemId] = useState("");
  const [adjustQty, setAdjustQty] = useState("");
  const [adjustType, setAdjustType] = useState("add"); // "add" or "deduct"
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    setSupplies(getSupplies());
  }, []);

  const filteredSupplies = supplies.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    item.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdjust = (e) => {
    e.preventDefault();
    if (!selectedItemId || !adjustQty) {
      alert("Please select an item and enter an adjustment amount.");
      return;
    }

    const qty = parseInt(adjustQty);
    if (isNaN(qty) || qty <= 0) {
      alert("Please enter a valid quantity.");
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

    const itemName = supplies.find(i => i.id === selectedItemId)?.name;
    setSuccessMsg(`Successfully ${adjustType === "add" ? "added" : "deducted"} ${qty} units of ${itemName}.`);
    setAdjustQty("");

    setTimeout(() => {
      setSuccessMsg("");
    }, 4000);
  };

  const lowStockCount = supplies.filter(s => s.stock <= s.reorder).length;

  return (
    <div className="max-w-6xl mx-auto pb-12 space-y-lg">
      {/* Top Banner metrics */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
        <div className="bg-white dark:bg-on-background rounded-xl shadow-soft p-lg border border-border-subtle dark:border-outline-variant">
          <h3 className="font-label-caps text-label-caps text-on-surface-variant mb-sm">Total Supply SKUs</h3>
          <span className="font-display-metrics text-display-metrics text-primary font-bold">{supplies.length}</span>
        </div>
        <div className="bg-white dark:bg-on-background rounded-xl shadow-soft p-lg border border-border-subtle dark:border-outline-variant">
          <h3 className="font-label-caps text-label-caps text-on-surface-variant mb-sm">Low Stock Alerts</h3>
          <span className={`font-display-metrics text-display-metrics font-bold ${lowStockCount > 0 ? "text-error" : "text-success-medical"}`}>
            {lowStockCount}
          </span>
        </div>
        <div className="bg-white dark:bg-on-background rounded-xl shadow-soft p-lg border border-border-subtle dark:border-outline-variant">
          <h3 className="font-label-caps text-label-caps text-on-surface-variant mb-sm">Last Stock Intake</h3>
          <span className="text-body-md text-on-surface dark:text-white font-medium block mt-sm">Today - 07:45 AM</span>
          <span className="text-xs text-on-surface-variant">by Technician Ramirez</span>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="flex flex-col lg:flex-row gap-gutter">
        {/* Left Column: Inventory List */}
        <section className="lg:w-2/3 bg-white dark:bg-on-background rounded-xl p-6 shadow-soft border border-border-subtle dark:border-outline-variant space-y-md">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-sm border-b border-border-subtle dark:border-outline-variant pb-md mb-md">
            <h2 className="text-headline-md font-headline-md font-bold text-on-surface dark:text-white">
              Inventory Status
            </h2>
            <input
              type="text"
              placeholder="Search items, categories..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-border-subtle dark:border-outline-variant dark:bg-inverse-surface rounded-full px-4 py-2 text-xs focus:outline-none focus:border-primary max-w-xs text-on-surface dark:text-white w-full"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm font-body-md">
              <thead className="bg-surface-muted dark:bg-surface-container-highest border-b border-border-subtle dark:border-outline-variant">
                <tr>
                  <th className="py-2.5 px-md text-on-surface-variant font-semibold text-xs">SKU</th>
                  <th className="py-2.5 px-md text-on-surface-variant font-semibold text-xs">Item Name</th>
                  <th className="py-2.5 px-md text-on-surface-variant font-semibold text-xs">Category</th>
                  <th className="py-2.5 px-md text-on-surface-variant font-semibold text-xs text-center">Stock</th>
                  <th className="py-2.5 px-md text-on-surface-variant font-semibold text-xs text-center">Reorder</th>
                  <th className="py-2.5 px-md text-on-surface-variant font-semibold text-xs">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle dark:divide-outline-variant">
                {filteredSupplies.map(item => (
                  <tr key={item.id} className="hover:bg-surface-muted/50 dark:hover:bg-surface-container-highest/50 transition-colors">
                    <td className="py-3 px-md text-xs font-mono text-on-surface-variant">{item.id}</td>
                    <td className="py-3 px-md font-semibold text-on-surface dark:text-white text-xs">{item.name}</td>
                    <td className="py-3 px-md text-xs text-on-surface-variant">{item.category}</td>
                    <td className="py-3 px-md text-center text-xs font-bold text-on-surface dark:text-white">
                      {item.stock} <span className="text-[10px] text-on-surface-variant font-normal">{item.unit}</span>
                    </td>
                    <td className="py-3 px-md text-center text-xs text-on-surface-variant font-medium">
                      {item.reorder} {item.unit}
                    </td>
                    <td className="py-3 px-md">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                        item.stock <= item.reorder
                          ? "bg-error-container text-error border-error/20 animate-pulse"
                          : "bg-green-100 text-green-800 border-green-200"
                      }`}>
                        {item.stock <= item.reorder ? "Low Stock" : "In Stock"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Right Column: Inventory Adjustments */}
        <section className="lg:w-1/3">
          <form onSubmit={handleAdjust} className="bg-white dark:bg-on-background rounded-xl p-6 shadow-soft border border-border-subtle dark:border-outline-variant space-y-md">
            <h2 className="text-headline-md font-headline-md font-bold text-on-surface dark:text-white border-b border-border-subtle dark:border-outline-variant pb-2 mb-4">
              Log Stock Adjustment
            </h2>

            {successMsg && (
              <div className="bg-green-50 dark:bg-green-950/20 text-green-800 dark:text-green-200 p-sm rounded text-xs border border-green-200 flex items-center gap-xs font-semibold">
                <span className="material-symbols-outlined text-sm">check_circle</span>
                {successMsg}
              </div>
            )}

            <div className="space-y-sm">
              <label className="block text-sm font-semibold text-on-surface-variant">Select Supply Item *</label>
              <select
                value={selectedItemId}
                onChange={(e) => setSelectedItemId(e.target.value)}
                className="w-full border border-border-subtle dark:border-outline-variant dark:bg-inverse-surface rounded-lg p-3 text-sm focus:outline-none focus:border-primary text-on-surface dark:text-white"
                required
              >
                <option value="">Choose item...</option>
                {supplies.map(i => (
                  <option key={i.id} value={i.id}>
                    {i.name} (SKU: {i.id} - Current: {i.stock} {i.unit})
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-sm">
              <label className="block text-sm font-semibold text-on-surface-variant">Adjustment Action</label>
              <div className="grid grid-cols-2 gap-sm">
                <button
                  type="button"
                  onClick={() => setAdjustType("add")}
                  className={`py-2 rounded-lg font-semibold text-xs border transition-all ${
                    adjustType === "add"
                      ? "bg-primary-container text-white border-primary-container"
                      : "bg-white text-on-surface border-border-subtle hover:bg-surface-container-low"
                  }`}
                >
                  Receive Stock (+)
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
                  Disburse Stock (-)
                </button>
              </div>
            </div>

            <div className="space-y-sm">
              <label className="block text-sm font-semibold text-on-surface-variant">Quantity to Adjust *</label>
              <input
                type="number"
                min="1"
                placeholder="Enter quantity"
                value={adjustQty}
                onChange={(e) => setAdjustQty(e.target.value)}
                className="w-full border border-border-subtle dark:border-outline-variant dark:bg-inverse-surface rounded-lg p-3 text-sm focus:outline-none focus:border-primary text-on-surface dark:text-white"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-surface-tint transition-all active:scale-95 duration-150 text-sm uppercase font-bold tracking-wider"
            >
              Post Adjustment
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
