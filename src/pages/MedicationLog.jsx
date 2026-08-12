import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getPatients, savePatient } from "../data/mock-data";

export default function MedicationLog() {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [selectedPatientId, setSelectedPatientId] = useState("");
  const [medsList, setMedsList] = useState([]);

  useEffect(() => {
    const list = getPatients();
    setPatients(list);
    if (list.length > 0) {
      setSelectedPatientId(list[0].id); // Robert Chang
    }
  }, []);

  useEffect(() => {
    if (!selectedPatientId) return;

    // Build standard list for this simulation
    setMedsList([
      { id: "heparin", name: "Heparin", dosage: "1000 units", route: "IV Push", time: "09:00 AM", overdue: true, given: false },
      { id: "epogen", name: "Erythropoietin (Epogen)", dosage: "4000 units", route: "IV Push", time: "11:30 AM", overdue: false, given: false },
      { id: "iron", name: "Iron Sucrose (Venofer)", dosage: "100 mg", route: "IV Slow Push", time: "12:00 PM", overdue: false, given: false }
    ]);
  }, [selectedPatientId]);

  const selectedPatient = patients.find(p => p.id === selectedPatientId) || {};

  const handleMarkGiven = (medId) => {
    setMedsList(prev => prev.map(m => m.id === medId ? { ...m, given: true } : m));

    // Append to patient record in database
    const medName = medsList.find(m => m.id === medId)?.name || medId;
    const updatedPatient = {
      ...selectedPatient,
      medications: `${selectedPatient.medications || ""}, administered ${medName} on ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
    };
    savePatient(updatedPatient);
  };

  const overdueMeds = medsList.filter(m => m.overdue && !m.given);
  const scheduledMeds = medsList.filter(m => !m.overdue && !m.given);
  const givenMeds = medsList.filter(m => m.given);

  return (
    <div className="max-w-4xl mx-auto pb-12">
      {/* Patient Selector */}
      <div className="bg-white dark:bg-on-background rounded-xl p-md shadow-soft border border-border-subtle dark:border-outline-variant mb-gutter">
        <label className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant mb-2">
          Select Patient
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
          {/* Header & Patient Context */}
          <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-xl gap-md">
            <div>
              <button 
                onClick={() => navigate("/patient-risk-summary")}
                className="inline-flex items-center gap-xs text-primary font-body-md text-body-md hover:underline mb-sm text-sm"
              >
                <span className="material-symbols-outlined text-sm">arrow_back</span>
                Back to Patient Risk Summary
              </button>
              <h1 className="font-headline-lg text-headline-lg md:text-[32px] md:leading-[40px] font-bold text-on-surface dark:text-white">
                Medication Administration
              </h1>
              <p className="font-body-md text-body-md text-on-surface-variant mt-xs">
                Session ID: #88241 • Room 4B
              </p>
            </div>
            <div className="bg-white dark:bg-on-background border border-border-subtle dark:border-outline-variant rounded-xl p-md flex items-center gap-md shadow-sm w-full md:w-auto">
              <div className="w-12 h-12 rounded-full bg-surface-container text-primary flex items-center justify-center font-bold text-lg border border-primary-container/20">
                {selectedPatient.initials}
              </div>
              <div>
                <h2 className="font-headline-md text-headline-md font-semibold text-on-surface dark:text-white leading-tight">
                  {selectedPatient.name}
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant text-xs mt-1">
                  DOB: {selectedPatient.dob} ({new Date().getFullYear() - new Date(selectedPatient.dob).getFullYear()}y)
                </p>
              </div>
            </div>
          </header>

          {/* Quick Actions */}
          <div className="flex gap-md mb-lg">
            <button 
              onClick={() => navigate("/messaging")}
              className="bg-white dark:bg-on-background border border-border-subtle dark:border-outline-variant text-on-surface dark:text-white px-md py-sm rounded-lg shadow-sm font-semibold text-xs flex items-center gap-xs hover:bg-surface-container-low transition-colors"
            >
              <span className="material-symbols-outlined text-primary text-[18px]">message</span>
              Message Doctor
            </button>
            <button 
              onClick={() => navigate("/patient-profile-overview")}
              className="bg-white dark:bg-on-background border border-border-subtle dark:border-outline-variant text-on-surface dark:text-white px-md py-sm rounded-lg shadow-sm font-semibold text-xs flex items-center gap-xs hover:bg-surface-container-low transition-colors"
            >
              <span className="material-symbols-outlined text-primary text-[18px]">history</span>
              View Med History
            </button>
          </div>

          {/* Overdue Medications Section */}
          {overdueMeds.length > 0 && (
            <section className="mb-xl">
              <h3 className="font-label-caps text-label-caps text-critical-alert flex items-center gap-xs mb-sm uppercase font-bold text-xs">
                <span className="material-symbols-outlined text-sm font-bold">warning</span>
                Overdue Medications
              </h3>
              <div className="bg-white dark:bg-on-background rounded-xl shadow-soft border-l-4 border-critical-alert overflow-hidden">
                {overdueMeds.map((med) => (
                  <div key={med.id} className="p-md md:p-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-md border-b border-border-subtle dark:border-outline-variant last:border-0 bg-error-container/10">
                    <div className="flex items-start gap-md flex-1">
                      <input 
                        type="checkbox" 
                        onChange={() => handleMarkGiven(med.id)} 
                        id={`med-${med.id}`}
                        className="mt-1 w-5 h-5 rounded border-critical-alert text-critical-alert focus:ring-critical-alert"
                      />
                      <div>
                        <label htmlFor={`med-${med.id}`} className="font-headline-md text-headline-md font-bold text-on-surface dark:text-white cursor-pointer">
                          {med.name}
                        </label>
                        <p className="font-body-md text-body-md text-on-surface dark:text-white mt-xs">{med.dosage} • {med.route}</p>
                        <p className="font-label-caps text-label-caps text-critical-alert mt-sm text-xs font-semibold">Due: {med.time} (Overdue)</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleMarkGiven(med.id)}
                      className="w-full md:w-auto bg-critical-alert text-white px-lg py-sm rounded-lg font-semibold shadow-sm hover:bg-red-600 transition-colors h-12 md:h-auto text-xs uppercase"
                    >
                      Mark as Given
                    </button>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Scheduled Medications Section */}
          <section className="mb-xl">
            <h3 className="font-label-caps text-label-caps text-on-surface-variant mb-sm uppercase text-xs">
              Scheduled Medications (Current Session)
            </h3>
            <div className="bg-white dark:bg-on-background rounded-xl shadow-soft overflow-hidden border border-border-subtle dark:border-outline-variant divide-y divide-border-subtle dark:divide-outline-variant">
              {scheduledMeds.length > 0 ? (
                scheduledMeds.map((med) => (
                  <div key={med.id} className="p-md md:p-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-md hover:bg-surface-muted dark:hover:bg-surface-container-highest transition-colors">
                    <div className="flex items-start gap-md flex-1">
                      <input 
                        type="checkbox" 
                        onChange={() => handleMarkGiven(med.id)} 
                        id={`med-${med.id}`}
                        className="mt-1 w-5 h-5 rounded border-outline text-primary-container focus:ring-primary-container"
                      />
                      <div>
                        <label htmlFor={`med-${med.id}`} className="font-headline-md text-headline-md font-bold text-on-surface dark:text-white cursor-pointer">
                          {med.name}
                        </label>
                        <p className="font-body-md text-body-md text-on-surface dark:text-white mt-xs">{med.dosage} • {med.route}</p>
                        <p className="font-label-caps text-label-caps text-on-surface-variant mt-sm text-xs">Due: {med.time}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleMarkGiven(med.id)}
                      className="w-full md:w-auto bg-white dark:bg-inverse-surface border border-primary-container text-primary-container px-lg py-sm rounded-lg font-semibold shadow-sm hover:bg-surface-container-low transition-colors h-12 md:h-auto text-xs uppercase"
                    >
                      Mark as Given
                    </button>
                  </div>
                ))
              ) : (
                <div className="p-lg text-center text-on-surface-variant text-sm">
                  No pending scheduled medications for this session.
                </div>
              )}
            </div>
          </section>

          {/* Administered Medications Section */}
          {givenMeds.length > 0 && (
            <section>
              <h3 className="font-label-caps text-label-caps text-success-medical mb-sm uppercase text-xs font-bold">
                Administered Today
              </h3>
              <div className="bg-white dark:bg-on-background rounded-xl shadow-soft overflow-hidden border border-border-subtle dark:border-outline-variant divide-y divide-border-subtle dark:divide-outline-variant opacity-80">
                {givenMeds.map((med) => (
                  <div key={med.id} className="p-md md:p-lg flex items-center justify-between gap-md bg-green-50/50 dark:bg-green-950/10">
                    <div className="flex items-center gap-md">
                      <span className="material-symbols-outlined text-success-medical">check_circle</span>
                      <div>
                        <h4 className="font-headline-md text-headline-md font-semibold text-on-surface dark:text-white line-through">
                          {med.name}
                        </h4>
                        <p className="font-body-md text-xs text-on-surface-variant">{med.dosage} • Administered recently</p>
                      </div>
                    </div>
                    <span className="text-xs text-success-medical font-bold uppercase">Given</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}
