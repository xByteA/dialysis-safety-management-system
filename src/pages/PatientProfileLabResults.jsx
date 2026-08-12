import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getPatients } from "../data/mock-data";

export default function PatientProfileLabResults() {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [selectedPatientId, setSelectedPatientId] = useState("");

  useEffect(() => {
    const list = getPatients();
    setPatients(list);
    if (list.length > 0) {
      setSelectedPatientId(list[0].id);
    }
  }, []);

  const selectedPatient = patients.find(p => p.id === selectedPatientId) || {};

  const getAge = (dob) => {
    if (!dob) return "";
    return new Date().getFullYear() - new Date(dob).getFullYear();
  };

  const getPotassiumStatus = (val) => {
    if (val > 5.0) return { label: "High", badge: "bg-error-container text-on-error-container border-error/20", icon: "warning", color: "text-error" };
    if (val < 3.5) return { label: "Low", badge: "bg-tertiary-fixed text-on-tertiary-fixed-variant border-tertiary-fixed-dim", icon: "arrow_downward", color: "text-tertiary-container" };
    return { label: "Normal", badge: "bg-green-100 text-green-800 border-green-200", icon: "check_circle", color: "text-success-medical" };
  };

  return (
    <div className="max-w-6xl mx-auto pb-12 space-y-lg">
      {/* Patient Selector */}
      <div className="bg-white dark:bg-on-background rounded-xl p-md shadow-soft border border-border-subtle dark:border-outline-variant">
        <label className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant mb-2">
          Select Patient Profile
        </label>
        <select
          value={selectedPatientId}
          onChange={(e) => setSelectedPatientId(e.target.value)}
          className="w-full border border-border-subtle dark:border-outline-variant dark:bg-inverse-surface rounded-lg p-3 text-sm focus:outline-none focus:border-primary text-on-surface dark:text-white"
        >
          {patients.map(p => (
            <option key={p.id} value={p.id}>
              {p.name} (ID: {p.id})
            </option>
          ))}
        </select>
      </div>

      {selectedPatient.id && (
        <>
          {/* Patient Header Card */}
          <section className="bg-white dark:bg-on-background rounded-xl shadow-soft p-lg border border-border-subtle dark:border-outline-variant">
            <div className="flex flex-col md:flex-row gap-xl items-start md:items-center">
              <div className="w-24 h-24 rounded-full overflow-hidden shrink-0 border-4 border-surface-container-low flex items-center justify-center bg-primary-container/10 text-primary font-bold text-4xl border-primary-container/20">
                {selectedPatient.initials}
              </div>
              <div className="flex-grow">
                <div className="flex flex-wrap items-center gap-md mb-sm">
                  <h1 className="font-headline-lg text-headline-lg text-on-background dark:text-white font-bold leading-tight">
                    {selectedPatient.name}
                  </h1>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                    selectedPatient.riskLevel === "Critical"
                      ? "bg-red-100 text-red-800 border border-red-200"
                      : selectedPatient.riskLevel === "High"
                      ? "bg-amber-100 text-amber-800 border border-amber-200"
                      : "bg-green-100 text-green-800 border border-green-200"
                  }`}>
                    {selectedPatient.riskLevel} Risk
                  </span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-md mt-4">
                  <div>
                    <p className="font-label-caps text-label-caps text-outline uppercase text-[10px]">Age</p>
                    <p className="font-body-lg text-body-lg text-on-surface dark:text-white font-semibold">{getAge(selectedPatient.dob)}</p>
                  </div>
                  <div>
                    <p className="font-label-caps text-label-caps text-outline uppercase text-[10px]">Dry Weight</p>
                    <p className="font-body-lg text-body-lg text-on-surface dark:text-white font-semibold">{selectedPatient.dryWeight} kg</p>
                  </div>
                  <div>
                    <p className="font-label-caps text-label-caps text-outline uppercase text-[10px]">Vascular Access</p>
                    <p className="font-body-lg text-body-lg text-on-surface dark:text-white font-semibold">{selectedPatient.vascularAccess}</p>
                  </div>
                  <div>
                    <p className="font-label-caps text-label-caps text-outline uppercase text-[10px]">Primary Dx</p>
                    <p className="font-body-lg text-body-lg text-on-surface dark:text-white font-semibold">{selectedPatient.diagnosis?.substring(0, 15)}...</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-md shrink-0">
                <button 
                  onClick={() => navigate("/lab-results-entry")}
                  className="bg-primary-container text-white font-semibold py-2 px-4 rounded-lg hover:opacity-95 transition-opacity h-12 flex items-center justify-center text-xs active:scale-95 duration-150"
                >
                  Schedule Lab
                </button>
              </div>
            </div>
          </section>

          {/* Contextual Tabs */}
          <nav className="border-b border-border-subtle dark:border-outline-variant overflow-x-auto">
            <ul className="flex gap-lg min-w-max px-sm text-sm">
              <li 
                onClick={() => navigate("/patient-profile-overview")}
                className="pb-md border-b-2 border-transparent text-on-surface-variant hover:text-on-surface hover:border-border-subtle cursor-pointer transition-colors"
              >
                Overview
              </li>
              <li 
                onClick={() => navigate("/patient-profile-vitals-trends")}
                className="pb-md border-b-2 border-transparent text-on-surface-variant hover:text-on-surface hover:border-border-subtle cursor-pointer transition-colors"
              >
                Vitals Trends
              </li>
              <li className="pb-md border-b-2 border-primary-container text-primary font-semibold cursor-pointer">
                Lab Results
              </li>
            </ul>
          </nav>

          {/* Lab Results Table */}
          <div className="bg-white dark:bg-on-background rounded-xl shadow-soft overflow-hidden border border-border-subtle dark:border-outline-variant">
            <div className="p-lg border-b border-border-subtle dark:border-outline-variant flex justify-between items-center bg-surface-muted dark:bg-surface-container-highest">
              <h3 className="font-headline-md text-headline-md text-on-background dark:text-white font-semibold text-base">
                Recent Lab Panels
              </h3>
              <span className="text-xs text-on-surface-variant font-semibold">Latest Intake Logs</span>
            </div>
            
            <div className="overflow-x-auto w-full">
              {selectedPatient.labsHistory?.length > 0 ? (
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="bg-surface-muted dark:bg-surface-container-highest border-b border-border-subtle dark:border-outline-variant">
                      <th className="p-md font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider text-xs">Test Name</th>
                      <th className="p-md font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider text-xs">Result</th>
                      <th className="p-md font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider text-xs">Reference Range</th>
                      <th className="p-md font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider text-xs">Status</th>
                      <th className="p-md font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider text-xs">Date</th>
                      <th className="p-md font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider text-xs text-right">Trend</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-subtle dark:divide-outline-variant">
                    {selectedPatient.labsHistory.map((lab, i) => {
                      const kStatus = getPotassiumStatus(lab.potassium);
                      const crStatus = lab.creatinine > 1.2 
                        ? { label: "High", badge: "bg-error-container text-on-error-container border-error/20", icon: "warning", color: "text-error" }
                        : { label: "Normal", badge: "bg-green-100 text-green-800 border-green-200", icon: "check_circle", color: "text-success-medical" };
                      const hbStatus = lab.hemoglobin < 12.0
                        ? { label: "Low", badge: "bg-tertiary-fixed text-on-tertiary-fixed-variant border-tertiary-fixed-dim", icon: "arrow_downward", color: "text-tertiary-container" }
                        : { label: "Normal", badge: "bg-green-100 text-green-800 border-green-200", icon: "check_circle", color: "text-success-medical" };

                      return (
                        <React.Fragment key={i}>
                          {/* Potassium */}
                          <tr className="hover:bg-surface-container-low dark:hover:bg-surface-container-highest/50 transition-colors">
                            <td className="p-md font-semibold text-on-surface dark:text-white">Potassium (K)</td>
                            <td className={`p-md font-bold ${kStatus.color}`}>{lab.potassium} mEq/L</td>
                            <td className="p-md text-on-surface-variant">3.5 - 5.0 mEq/L</td>
                            <td className="p-md">
                              <span className={`inline-flex items-center gap-xs px-2 py-0.5 rounded-full font-status-badge text-[10px] font-bold border ${kStatus.badge}`}>
                                <span className="material-symbols-outlined text-[12px]">{kStatus.icon}</span>
                                {kStatus.label}
                              </span>
                            </td>
                            <td className="p-md text-on-surface-variant text-xs">{lab.date}</td>
                            <td className="p-md text-right">
                              <span className="material-symbols-outlined text-outline text-[20px]">{lab.potassium > 5.0 ? "trending_up" : "trending_flat"}</span>
                            </td>
                          </tr>
                          {/* Creatinine */}
                          <tr className="hover:bg-surface-container-low dark:hover:bg-surface-container-highest/50 transition-colors">
                            <td className="p-md font-semibold text-on-surface dark:text-white">Creatinine</td>
                            <td className={`p-md font-bold ${crStatus.color}`}>{lab.creatinine} mg/dL</td>
                            <td className="p-md text-on-surface-variant">0.6 - 1.2 mg/dL</td>
                            <td className="p-md">
                              <span className={`inline-flex items-center gap-xs px-2 py-0.5 rounded-full font-status-badge text-[10px] font-bold border ${crStatus.badge}`}>
                                <span className="material-symbols-outlined text-[12px]">{crStatus.icon}</span>
                                {crStatus.label}
                              </span>
                            </td>
                            <td className="p-md text-on-surface-variant text-xs">{lab.date}</td>
                            <td className="p-md text-right">
                              <span className="material-symbols-outlined text-outline text-[20px]">trending_flat</span>
                            </td>
                          </tr>
                          {/* Hemoglobin */}
                          <tr className="hover:bg-surface-container-low dark:hover:bg-surface-container-highest/50 transition-colors">
                            <td className="p-md font-semibold text-on-surface dark:text-white">Hemoglobin (Hb)</td>
                            <td className={`p-md font-bold ${hbStatus.color}`}>{lab.hemoglobin} g/dL</td>
                            <td className="p-md text-on-surface-variant">12.0 - 15.5 g/dL</td>
                            <td className="p-md">
                              <span className={`inline-flex items-center gap-xs px-2 py-0.5 rounded-full font-status-badge text-[10px] font-bold border ${hbStatus.badge}`}>
                                <span className="material-symbols-outlined text-[12px]">{hbStatus.icon}</span>
                                {hbStatus.label}
                              </span>
                            </td>
                            <td className="p-md text-on-surface-variant text-xs">{lab.date}</td>
                            <td className="p-md text-right">
                              <span className="material-symbols-outlined text-outline text-[20px]">{lab.hemoglobin < 12.0 ? "trending_down" : "trending_flat"}</span>
                            </td>
                          </tr>
                        </React.Fragment>
                      );
                    })}
                  </tbody>
                </table>
              ) : (
                <div className="p-lg text-center text-on-surface-variant border-t border-border-subtle bg-surface-muted dark:bg-inverse-surface text-sm">
                  No laboratory results logged. Use "Lab Results Entry" to record details.
                </div>
              )}
            </div>
            <div className="p-md border-t border-border-subtle dark:border-outline-variant bg-surface-muted dark:bg-surface-container-highest text-center">
              <button 
                onClick={() => navigate("/lab-results-entry")}
                className="text-primary font-semibold text-xs hover:underline uppercase tracking-wider"
              >
                Log New Lab Intake
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
