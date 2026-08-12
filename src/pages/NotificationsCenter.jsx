import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAlerts, triggerAlert } from "../data/mock-data";

export default function NotificationsCenter() {
  const navigate = useNavigate();
  const [alerts, setAlerts] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [newType, setNewType] = useState("warning");

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
      alert("Please fill out Title and Message.");
      return;
    }

    const payload = {
      type: newType,
      title: newTitle,
      time: "Just now",
      message: newMessage,
      actionable: false
    };

    const updated = triggerAlert(payload);
    setAlerts(updated);
    setNewTitle("");
    setNewMessage("");
  };

  return (
    <div className="max-w-6xl mx-auto pb-12 flex flex-col gap-lg">
      <div className="flex justify-between items-center border-b border-border-subtle dark:border-outline-variant pb-md mb-md">
        <div>
          <h1 className="text-headline-lg font-headline-lg text-on-surface dark:text-white font-bold">
            Notifications Center
          </h1>
          <p className="text-xs text-on-surface-variant mt-1">Review, action, or clear clinical alerts and system warnings.</p>
        </div>
        {alerts.length > 0 && (
          <button
            onClick={handleClearAll}
            className="text-error font-semibold hover:underline text-sm uppercase tracking-wider"
          >
            Clear All Alerts
          </button>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-gutter">
        {/* Left: Alerts list */}
        <section className="lg:w-2/3 space-y-md">
          {alerts.length > 0 ? (
            alerts.map((alert) => {
              const isCritical = alert.type === "heart_broken" || alert.type === "critical";
              const isWarning = alert.type === "warning" || alert.type === "trending_up";
              
              return (
                <div
                  key={alert.id}
                  className={`p-lg rounded-xl border shadow-soft flex gap-md transition-all ${
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
                  
                  <div className="flex-grow space-y-sm">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-headline-md text-sm font-bold text-on-surface dark:text-white leading-tight">
                          {alert.title}
                        </h4>
                        <span className="text-[10px] text-on-surface-variant font-semibold mt-1 block">
                          {alert.time}
                        </span>
                      </div>
                      <button
                        onClick={() => handleDismiss(alert.id)}
                        className="text-on-surface-variant hover:text-error"
                      >
                        <span className="material-symbols-outlined text-[18px]">close</span>
                      </button>
                    </div>

                    <p className="text-xs text-on-surface-variant leading-relaxed">
                      {alert.message}
                    </p>

                    {alert.actionable && (
                      <div className="flex gap-sm pt-2">
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
                          {alert.actionText || "Respond"}
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
              <p className="font-semibold text-sm">Inbox cleared! No active warnings or alarms.</p>
            </div>
          )}
        </section>

        {/* Right: Simulate Alerts Form */}
        <section className="lg:w-1/3">
          <form onSubmit={handleSimulateAlert} className="bg-white dark:bg-on-background rounded-xl p-6 shadow-soft border border-border-subtle dark:border-outline-variant space-y-md">
            <h2 className="text-headline-md font-headline-md font-bold text-on-surface dark:text-white border-b border-border-subtle dark:border-outline-variant pb-2 mb-4">
              Simulate Safety Alarm
            </h2>

            <div className="space-y-sm">
              <label className="block text-sm font-semibold text-on-surface-variant">Alert Type</label>
              <select
                value={newType}
                onChange={(e) => setNewType(e.target.value)}
                className="w-full border border-border-subtle dark:border-outline-variant dark:bg-inverse-surface rounded-lg p-3 text-sm focus:outline-none focus:border-primary text-on-surface dark:text-white"
              >
                <option value="heart_broken">Critical / Cardiac Alert</option>
                <option value="warning">System / Sensor Alarm</option>
                <option value="info">Status Update / Info</option>
              </select>
            </div>

            <div className="space-y-sm">
              <label className="block text-sm font-semibold text-on-surface-variant">Alert Title *</label>
              <input
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g. Critical Temp Rise"
                className="w-full border border-border-subtle dark:border-outline-variant dark:bg-inverse-surface rounded-lg p-3 text-sm focus:outline-none focus:border-primary text-on-surface dark:text-white"
                type="text"
                required
              />
            </div>

            <div className="space-y-sm">
              <label className="block text-sm font-semibold text-on-surface-variant">Description / Message *</label>
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Details of safety concern..."
                rows="3"
                className="w-full border border-border-subtle dark:border-outline-variant dark:bg-inverse-surface rounded-lg p-3 text-sm focus:outline-none focus:border-primary text-on-surface dark:text-white"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-surface-tint transition-all active:scale-95 duration-150 text-sm uppercase font-bold tracking-wider"
            >
              Trigger Alert
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
