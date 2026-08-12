import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getPatients } from "../data/mock-data";

export default function PatientProfileOverview() {
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

  // Calculate age
  const getAge = (dob) => {
    if (!dob) return "";
    return new Date().getFullYear() - new Date(dob).getFullYear();
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
                  onClick={() => navigate("/patient-registration")}
                  className="bg-primary text-white font-semibold py-2 px-4 rounded-lg hover:opacity-95 transition-opacity h-12 flex items-center justify-center text-xs active:scale-95 duration-150"
                >
                  Edit Profile
                </button>
              </div>
            </div>
          </section>

          {/* Contextual Tabs */}
          <nav className="border-b border-border-subtle dark:border-outline-variant overflow-x-auto">
            <ul className="flex gap-lg min-w-max px-sm text-sm">
              <li className="pb-md border-b-2 border-primary-container text-primary font-semibold cursor-pointer">
                Overview
              </li>
              <li 
                onClick={() => navigate("/patient-profile-vitals-trends")}
                className="pb-md border-b-2 border-transparent text-on-surface-variant hover:text-on-surface hover:border-border-subtle cursor-pointer transition-colors"
              >
                Vitals Trends
              </li>
              <li 
                onClick={() => navigate("/patient-profile-lab-results")}
                className="pb-md border-b-2 border-transparent text-on-surface-variant hover:text-on-surface hover:border-border-subtle cursor-pointer transition-colors"
              >
                Lab Results
              </li>
            </ul>
          </nav>

          {/* Overview Tab Content */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
            {/* Left Column: Sessions History */}
            <div className="md:col-span-8 flex flex-col gap-gutter">
              <div className="bg-white dark:bg-on-background rounded-xl shadow-soft p-lg border border-border-subtle dark:border-outline-variant flex flex-col h-full">
                <h2 className="font-headline-md text-headline-md text-on-background dark:text-white mb-md border-b border-border-subtle dark:border-outline-variant pb-sm font-semibold text-base">
                  Recent Dialysis Sessions
                </h2>
                <div className="space-y-md">
                  {selectedPatient.vitalsHistory?.length > 0 ? (
                    selectedPatient.vitalsHistory.map((vital, idx) => (
                      <div key={idx} className="flex items-center justify-between p-md bg-surface dark:bg-inverse-surface rounded-lg border border-border-subtle dark:border-outline-variant text-sm">
                        <div className="flex items-center gap-md">
                          <div className="w-12 h-12 rounded-full bg-surface-container-low dark:bg-surface-container-highest flex items-center justify-center text-primary">
                            <span className="material-symbols-outlined text-lg">water_drop</span>
                          </div>
                          <div>
                            <p className="font-semibold text-on-surface dark:text-white">Intradilaytic Check - {vital.time}</p>
                            <p className="text-on-surface-variant text-xs mt-0.5">BP: {vital.bp} • Weight: {vital.weight} kg</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="px-2 py-0.5 rounded bg-success-medical/10 text-success-medical font-status-badge text-[9px] uppercase font-bold border border-success-medical/20 mb-1 inline-block">
                            Completed
                          </div>
                          <p className="text-[10px] text-outline italic">{vital.remarks}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-lg text-center text-on-surface-variant border border-dashed border-border-subtle rounded-lg text-sm bg-surface-muted">
                      No dialysis session history logged in this flowsheet.
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column: Vitals and Notes */}
            <div className="md:col-span-4 flex flex-col gap-gutter">
              {/* Vital Snapshot */}
              <div className="bg-white dark:bg-on-background rounded-xl shadow-soft p-lg border border-border-subtle dark:border-outline-variant">
                <h2 className="font-headline-md text-headline-md text-on-background dark:text-white mb-md border-b border-border-subtle dark:border-outline-variant pb-sm font-semibold text-base">
                  Latest Vitals Snapshot
                </h2>
                {selectedPatient.vitalsHistory?.length > 0 ? (
                  <div className="grid grid-cols-2 gap-md text-sm">
                    <div className="p-sm bg-surface dark:bg-inverse-surface rounded-lg border border-border-subtle dark:border-outline-variant">
                      <p className="font-label-caps text-label-caps text-outline mb-1 text-[10px] uppercase font-bold">Blood Pressure</p>
                      <p className="font-body-lg text-body-lg font-bold text-on-surface dark:text-white">{selectedPatient.vitalsHistory[0].bp}</p>
                    </div>
                    <div className="p-sm bg-surface dark:bg-inverse-surface rounded-lg border border-border-subtle dark:border-outline-variant">
                      <p className="font-label-caps text-label-caps text-outline mb-1 text-[10px] uppercase font-bold">Heart Rate</p>
                      <p className="font-body-lg text-body-lg font-bold text-on-surface dark:text-white">{selectedPatient.vitalsHistory[0].hr} bpm</p>
                    </div>
                    <div className="p-sm bg-surface dark:bg-inverse-surface rounded-lg border border-border-subtle dark:border-outline-variant">
                      <p className="font-label-caps text-label-caps text-outline mb-1 text-[10px] uppercase font-bold">Temperature</p>
                      <p className="font-body-lg text-body-lg font-bold text-on-surface dark:text-white">{selectedPatient.vitalsHistory[0].temp}</p>
                    </div>
                    <div className="p-sm bg-surface dark:bg-inverse-surface rounded-lg border border-border-subtle dark:border-outline-variant">
                      <p className="font-label-caps text-label-caps text-outline mb-1 text-[10px] uppercase font-bold">Weight</p>
                      <p className="font-body-lg text-body-lg font-bold text-on-surface dark:text-white">{selectedPatient.vitalsHistory[0].weight} kg</p>
                    </div>
                  </div>
                ) : (
                  <div className="p-sm text-center text-xs text-on-surface-variant">
                    No recorded vitals. Use "Record Vitals" to add logs.
                  </div>
                )}
              </div>

              {/* Clinical Notes */}
              <div className="bg-white dark:bg-on-background rounded-xl shadow-soft p-lg border border-border-subtle dark:border-outline-variant">
                <div className="flex justify-between items-center mb-md border-b border-border-subtle dark:border-outline-variant pb-sm">
                  <h2 className="font-headline-md text-headline-md text-on-background dark:text-white font-semibold text-base">
                    Clinical Notes
                  </h2>
                  <button className="text-primary hover:bg-surface-container-low p-xs rounded transition-colors active:opacity-75">
                    <span className="material-symbols-outlined font-bold text-[18px]">add</span>
                  </button>
                </div>
                <div className="relative pl-6 border-l-2 border-primary-fixed text-xs space-y-1">
                  <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px] top-1"></div>
                  <p className="font-bold text-on-surface dark:text-white">Attending Nephrologist</p>
                  <p className="text-on-surface-variant leading-relaxed">
                    Patient monitored for dialysis session progression. Hemodynamics checked. Baseline dry weight is stable. Evaluate labs next draw.
                  </p>
                  <p className="text-[10px] text-outline font-semibold uppercase mt-2">Oct 26, 12:15 PM</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
