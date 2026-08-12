import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getPatients } from "../data/mock-data";

export default function PatientRiskSummary() {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [selectedPatientId, setSelectedPatientId] = useState("");

  useEffect(() => {
    const list = getPatients();
    setPatients(list);
    if (list.length > 0) {
      setSelectedPatientId(list[0].id); // Defaults to first patient
    }
  }, []);

  const selectedPatient = patients.find(p => p.id === selectedPatientId) || {};

  // Generate mock prescriptions based on patient records
  const getPrescriptions = (patient) => {
    if (!patient.medications) return [];
    return patient.medications.split(", ").map(m => {
      const parts = m.split(" ");
      const name = parts[0] || m;
      const dose = parts.slice(1).join(" ") || "As directed";
      return { name, dose, frequency: "Scheduled session" };
    });
  };

  const prescriptions = getPrescriptions(selectedPatient);

  return (
    <div className="max-w-6xl mx-auto pb-12 flex flex-col gap-lg">
      {/* Patient Selector */}
      <div className="bg-white dark:bg-on-background rounded-xl p-md shadow-soft border border-border-subtle dark:border-outline-variant">
        <label className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant mb-2">
          Select Patient Risk File
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
          {/* Patient Header & Actions */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-md">
            <div>
              <h2 className="font-headline-lg text-headline-lg text-on-surface dark:text-white font-bold mb-xs">
                Patient Risk Summary
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant flex items-center gap-sm text-xs">
                <span className="material-symbols-outlined text-[18px]">person</span>
                <span>{selectedPatient.name} (ID: {selectedPatient.id})</span>
              </p>
            </div>
            <div className="flex flex-wrap gap-sm w-full md:w-auto">
              <button 
                onClick={() => navigate("/vitals-entry")}
                className="flex-1 md:flex-none bg-primary-container text-white font-semibold text-xs px-md py-sm rounded-lg flex items-center justify-center gap-xs hover:opacity-90 transition-opacity h-12"
              >
                <span className="material-symbols-outlined text-[18px]">monitor_heart</span>
                Enter Vitals
              </button>
              <button 
                onClick={() => navigate("/medication-log")}
                className="flex-1 md:flex-none border border-outline-variant text-on-surface dark:text-white font-semibold text-xs px-md py-sm rounded-lg flex items-center justify-center gap-xs hover:bg-surface-container-low dark:hover:bg-surface-container-highest transition-colors h-12"
              >
                <span className="material-symbols-outlined text-[18px]">medical_services</span>
                Log Medication
              </button>
              <button 
                onClick={() => navigate("/incident-report")}
                className="flex-1 md:flex-none bg-error text-white font-semibold text-xs px-md py-sm rounded-lg flex items-center justify-center gap-xs hover:opacity-90 transition-opacity h-12"
              >
                <span className="material-symbols-outlined text-[18px]">report_problem</span>
                Report Incident
              </button>
            </div>
          </div>

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
            {/* Risk Warnings Panel */}
            <div className="md:col-span-12 bg-error-container/20 border border-error/30 rounded-xl p-lg flex items-start gap-md shadow-soft">
              <span className="material-symbols-outlined text-error text-[32px] mt-xs" style={{ fontVariationSettings: "'FILL' 1" }}>
                warning
              </span>
              <div>
                <h3 className="font-headline-md text-headline-md text-error mb-xs font-bold text-base">
                  AI & Doctor-Flagged Risks: {selectedPatient.riskLevel}
                </h3>
                <div className="flex flex-wrap gap-sm mt-sm">
                  {selectedPatient.riskFactors?.map((factor, i) => (
                    <span key={i} className="bg-error/10 text-error px-3 py-1 rounded-full text-xs font-semibold">
                      {factor}
                    </span>
                  ))}
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant text-sm mt-3">
                  This patient is flagged with {selectedPatient.riskLevel} risk status. System indicators evaluate clinical measurements to compile safety warnings. Confirm pre-dialysis vitals match thresholds.
                </p>
              </div>
            </div>

            {/* Current Prescription Snapshot */}
            <div className="md:col-span-8 bg-white dark:bg-on-background rounded-xl shadow-soft overflow-hidden flex flex-col border border-border-subtle dark:border-outline-variant">
              <div className="border-b border-border-subtle dark:border-outline-variant p-md bg-surface-container-lowest dark:bg-surface-container-highest">
                <h3 className="font-headline-md text-headline-md text-on-surface dark:text-white flex items-center gap-sm font-semibold">
                  <span className="material-symbols-outlined text-primary">prescriptions</span>
                  Current Prescription Snapshot
                </h3>
              </div>
              <div className="p-md flex-1">
                {prescriptions.length > 0 ? (
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="border-b border-border-subtle dark:border-outline-variant">
                        <th className="font-label-caps text-label-caps text-on-surface-variant py-sm font-semibold text-xs">Medication</th>
                        <th className="font-label-caps text-label-caps text-on-surface-variant py-sm font-semibold text-xs">Dosage / Details</th>
                        <th className="font-label-caps text-label-caps text-on-surface-variant py-sm font-semibold text-xs">Access Intake</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border-subtle dark:divide-outline-variant">
                      {prescriptions.map((presc, idx) => (
                        <tr key={idx}>
                          <td className="font-body-md text-body-md text-on-surface dark:text-white py-md font-semibold">{presc.name}</td>
                          <td className="font-body-md text-body-md text-on-surface dark:text-white py-md">{presc.dose}</td>
                          <td className="font-body-md text-body-md text-on-surface-variant py-md">{presc.frequency}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="p-lg text-center text-on-surface-variant text-sm">
                    No chronic prescriptions loaded in baseline.
                  </div>
                )}
              </div>
            </div>

            {/* Known Allergies */}
            <div className="md:col-span-4 bg-white dark:bg-on-background rounded-xl shadow-soft overflow-hidden flex flex-col border border-border-subtle dark:border-outline-variant">
              <div className="border-b border-border-subtle dark:border-outline-variant p-md bg-surface-container-lowest dark:bg-surface-container-highest">
                <h3 className="font-headline-md text-headline-md text-on-surface dark:text-white flex items-center gap-sm font-semibold">
                  <span className="material-symbols-outlined text-secondary">allergy</span>
                  Known Allergies
                </h3>
              </div>
              <div className="p-md flex-1 flex flex-col gap-sm">
                {selectedPatient.allergies ? (
                  selectedPatient.allergies.split(", ").map((allergy, index) => (
                    <div key={index} className="flex items-center gap-md p-sm rounded-lg bg-surface-container-low dark:bg-inverse-surface border border-border-subtle dark:border-outline-variant">
                      <span className="material-symbols-outlined text-critical-alert font-bold">block</span>
                      <div>
                        <p className="font-body-md text-body-md font-semibold text-on-surface dark:text-white text-xs">{allergy}</p>
                        <p className="font-label-caps text-label-caps text-on-surface-variant text-[10px] uppercase font-bold mt-0.5">Severe Alert Flag</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-lg text-center text-on-surface-variant text-sm">
                    No documented allergies.
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
