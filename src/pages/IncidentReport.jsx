import React, { useState, useEffect } from "react";
import { getIncidents, reportIncident } from "../data/mock-data";

export default function IncidentReport() {
  const [incidents, setIncidents] = useState([]);
  const [equipmentId, setEquipmentId] = useState("");
  const [severity, setSeverity] = useState("Medium");
  const [type, setType] = useState("Air Leak Detected");
  const [reporter, setReporter] = useState("Nurse Davis");
  const [details, setDetails] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    setIncidents(getIncidents());
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!equipmentId || !details) {
      alert("Please provide the Equipment ID and incident details.");
      return;
    }

    const newIncident = {
      equipmentId,
      severity,
      type,
      reporter,
      details
    };

    const updated = reportIncident(newIncident);
    setIncidents(updated);
    setIsSuccess(true);

    // Reset form fields
    setEquipmentId("");
    setDetails("");
  };

  const getSeverityBadge = (sev) => {
    switch (sev) {
      case "High":
        return "bg-red-100 text-red-800 border border-red-200";
      case "Medium":
        return "bg-amber-100 text-amber-800 border border-amber-200";
      default:
        return "bg-blue-100 text-blue-800 border border-blue-200";
    }
  };

  return (
    <div className="max-w-6xl mx-auto pb-12 flex flex-col gap-lg">
      <div className="flex flex-col md:flex-row gap-gutter">
        {/* Left Column: Form */}
        <section className="md:w-1/2">
          {!isSuccess ? (
            <form onSubmit={handleSubmit} className="bg-white dark:bg-on-background rounded-xl p-6 shadow-soft border border-border-subtle dark:border-outline-variant space-y-md">
              <h2 className="text-headline-md font-headline-md font-bold text-on-surface dark:text-white border-b border-border-subtle dark:border-outline-variant pb-2 mb-4">
                File Incident / Damage Report
              </h2>

              <div className="space-y-sm">
                <label className="block text-sm font-semibold text-on-surface-variant">Equipment / Machine ID *</label>
                <input
                  value={equipmentId}
                  onChange={(e) => setEquipmentId(e.target.value)}
                  placeholder="e.g. Dialysis Machine #12"
                  className="w-full border border-border-subtle dark:border-outline-variant dark:bg-inverse-surface rounded-lg p-3 text-sm focus:outline-none focus:border-primary text-on-surface dark:text-white"
                  type="text"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-sm">
                <div className="space-y-sm">
                  <label className="block text-sm font-semibold text-on-surface-variant">Severity</label>
                  <select
                    value={severity}
                    onChange={(e) => setSeverity(e.target.value)}
                    className="w-full border border-border-subtle dark:border-outline-variant dark:bg-inverse-surface rounded-lg p-3 text-sm focus:outline-none focus:border-primary text-on-surface dark:text-white"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
                <div className="space-y-sm">
                  <label className="block text-sm font-semibold text-on-surface-variant">Incident Type</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full border border-border-subtle dark:border-outline-variant dark:bg-inverse-surface rounded-lg p-3 text-sm focus:outline-none focus:border-primary text-on-surface dark:text-white"
                  >
                    <option value="Air Leak Detected">Air Leak Detected</option>
                    <option value="Conductivity Spike">Conductivity Spike</option>
                    <option value="UF Module Failure">UF Module Failure</option>
                    <option value="Vascular Access Infiltration">Access Site Incident</option>
                    <option value="Power Failure / Reset">Power Failure / Reset</option>
                    <option value="Other Mechanical Issue">Other Mechanical Issue</option>
                  </select>
                </div>
              </div>

              <div className="space-y-sm">
                <label className="block text-sm font-semibold text-on-surface-variant">Logged By</label>
                <input
                  value={reporter}
                  onChange={(e) => setReporter(e.target.value)}
                  className="w-full border border-border-subtle dark:border-outline-variant dark:bg-inverse-surface rounded-lg p-3 text-sm focus:outline-none focus:border-primary text-on-surface dark:text-white"
                  type="text"
                />
              </div>

              <div className="space-y-sm">
                <label className="block text-sm font-semibold text-on-surface-variant">Incident Details / Description *</label>
                <textarea
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="Describe what occurred, any alarms triggered, and actions taken..."
                  rows="4"
                  className="w-full border border-border-subtle dark:border-outline-variant dark:bg-inverse-surface rounded-lg p-3 text-sm focus:outline-none focus:border-primary text-on-surface dark:text-white"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-surface-tint transition-all active:scale-95 duration-150 text-sm"
              >
                Submit Report
              </button>
            </form>
          ) : (
            <div className="bg-white dark:bg-on-background rounded-xl p-8 shadow-soft border border-success-medical flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 bg-success-medical/10 rounded-full flex items-center justify-center mb-md border border-success-medical/20">
                <span className="material-symbols-outlined text-success-medical text-2xl font-bold">check_circle</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-on-surface dark:text-white font-bold mb-sm">
                Report Submitted Successfully
              </h3>
              <p className="font-body-md text-sm text-on-surface-variant mb-6">
                Clinical engineering has been alerted. This incident has been appended to the dashboard logs.
              </p>
              <button
                onClick={() => setIsSuccess(false)}
                className="bg-primary-container text-white py-2 px-lg rounded-lg font-semibold text-xs uppercase tracking-wider hover:opacity-90 active:scale-95 duration-150 transition-all"
              >
                Log New Incident
              </button>
            </div>
          )}
        </section>

        {/* Right Column: Incident History Logs */}
        <section className="md:w-1/2 flex flex-col">
          <div className="bg-white dark:bg-on-background rounded-xl p-6 shadow-soft border border-border-subtle dark:border-outline-variant flex-grow">
            <h2 className="text-headline-md font-headline-md font-bold text-on-surface dark:text-white border-b border-border-subtle dark:border-outline-variant pb-2 mb-4 flex items-center gap-sm">
              <span className="material-symbols-outlined text-outline">assignment</span>
              Active Incident Logs
            </h2>
            <div className="space-y-md max-h-[500px] overflow-y-auto pr-1">
              {incidents.map((inc) => (
                <div key={inc.id} className="border border-border-subtle dark:border-outline-variant rounded-lg p-md space-y-sm hover:bg-surface-muted/50 transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-on-surface dark:text-white text-sm">
                        {inc.equipmentId} - <span className="text-on-surface-variant font-normal">{inc.type}</span>
                      </h4>
                      <p className="text-[10px] text-on-surface-variant mt-0.5">
                        Log ID: {inc.id} • {inc.date} • Reporter: {inc.reporter}
                      </p>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${getSeverityBadge(inc.severity)}`}>
                      {inc.severity} Severity
                    </span>
                  </div>
                  <p className="text-xs text-on-surface-variant bg-surface-muted dark:bg-surface-container-highest p-sm rounded italic">
                    "{inc.details}"
                  </p>
                  <div className="flex items-center gap-sm text-[10px] text-on-surface-variant font-semibold">
                    <span className="w-2 h-2 rounded-full bg-[#EAB308]"></span>
                    <span>Status: {inc.status || "Under Review"}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
