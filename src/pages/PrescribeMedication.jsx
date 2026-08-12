import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getPatients, savePatient } from "../data/mock-data";

export default function PrescribeMedication() {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [selectedPatientId, setSelectedPatientId] = useState("");
  const [medName, setMedName] = useState("");
  const [dose, setDose] = useState("");
  const [frequency, setFrequency] = useState("3 times per week");
  const [route, setRoute] = useState("IV Push");
  const [notes, setNotes] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const list = getPatients();
    setPatients(list);
    if (list.length > 0) {
      setSelectedPatientId(list[0].id);
    }
  }, []);

  const selectedPatient = patients.find(p => p.id === selectedPatientId) || {};

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!medName || !dose) {
      alert("Please enter a Medication Name and Dosage.");
      return;
    }

    const prescriptionString = `${medName} ${dose} (${route}, ${frequency})`;
    const updatedPatient = {
      ...selectedPatient,
      medications: selectedPatient.medications 
        ? `${selectedPatient.medications}, ${prescriptionString}` 
        : prescriptionString
    };

    savePatient(updatedPatient);
    setIsSuccess(true);
    setMedName("");
    setDose("");
    setNotes("");
  };

  return (
    <div className="max-w-4xl mx-auto pb-12">
      {/* Patient Selector */}
      <div className="bg-white dark:bg-on-background rounded-xl p-md shadow-soft border border-border-subtle dark:border-outline-variant mb-gutter">
        <label className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant mb-2">
          Select Patient
        </label>
        <select
          value={selectedPatientId}
          onChange={(e) => {
            setSelectedPatientId(e.target.value);
            setIsSuccess(false);
          }}
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
          {/* Patient Context Block */}
          <div className="bg-white dark:bg-on-background rounded-xl shadow-soft p-md md:p-lg mb-gutter flex items-center gap-lg border border-border-subtle dark:border-outline-variant">
            <div className="w-12 h-12 rounded-full bg-primary-container text-white flex items-center justify-center font-bold text-sm">
              {selectedPatient.initials}
            </div>
            <div>
              <h2 className="font-headline-md text-headline-md font-bold text-on-surface dark:text-white leading-tight">
                {selectedPatient.name}
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant text-xs mt-1">
                ID: {selectedPatient.id} • Diagnosis: {selectedPatient.diagnosis}
              </p>
            </div>
          </div>

          {!isSuccess ? (
            /* Prescribing Form */
            <form onSubmit={handleSubmit} className="bg-white dark:bg-on-background rounded-xl p-6 shadow-soft border border-border-subtle dark:border-outline-variant space-y-md">
              <h2 className="text-headline-md font-headline-md font-bold text-on-surface dark:text-white border-b border-border-subtle dark:border-outline-variant pb-2 mb-4">
                Write New Dialysis Prescription
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                <div className="space-y-sm">
                  <label className="block text-sm font-semibold text-on-surface-variant">Medication Name *</label>
                  <input
                    value={medName}
                    onChange={(e) => setMedName(e.target.value)}
                    placeholder="e.g. Epogen, Heparin, Hectorol"
                    className="w-full border border-border-subtle dark:border-outline-variant dark:bg-inverse-surface rounded-lg p-3 text-sm focus:outline-none focus:border-primary text-on-surface dark:text-white"
                    type="text"
                    required
                  />
                </div>
                <div className="space-y-sm">
                  <label className="block text-sm font-semibold text-on-surface-variant">Dosage / Strength *</label>
                  <input
                    value={dose}
                    onChange={(e) => setDose(e.target.value)}
                    placeholder="e.g. 4000 units, 800 mg, 1.5 mcg"
                    className="w-full border border-border-subtle dark:border-outline-variant dark:bg-inverse-surface rounded-lg p-3 text-sm focus:outline-none focus:border-primary text-on-surface dark:text-white"
                    type="text"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                <div className="space-y-sm">
                  <label className="block text-sm font-semibold text-on-surface-variant">Access Route</label>
                  <select
                    value={route}
                    onChange={(e) => setRoute(e.target.value)}
                    className="w-full border border-border-subtle dark:border-outline-variant dark:bg-inverse-surface rounded-lg p-3 text-sm focus:outline-none focus:border-primary text-on-surface dark:text-white"
                  >
                    <option value="IV Push">IV Push</option>
                    <option value="IV Slow Infusion">IV Slow Infusion</option>
                    <option value="Oral / Enteral">Oral / Enteral</option>
                    <option value="Subcutaneous">Subcutaneous</option>
                    <option value="Topical / Site Application">Topical / Site Application</option>
                  </select>
                </div>
                <div className="space-y-sm">
                  <label className="block text-sm font-semibold text-on-surface-variant">Frequency</label>
                  <select
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value)}
                    className="w-full border border-border-subtle dark:border-outline-variant dark:bg-inverse-surface rounded-lg p-3 text-sm focus:outline-none focus:border-primary text-on-surface dark:text-white"
                  >
                    <option value="3 times per week">3 times per week</option>
                    <option value="Once during treatment">Once during treatment</option>
                    <option value="With meals">With meals</option>
                    <option value="Daily">Daily</option>
                    <option value="As needed (PRN)">As needed (PRN)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-sm">
                <label className="block text-sm font-semibold text-on-surface-variant">Special Instructions (Hold conditions, etc.)</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Hold if pre-dialysis systolic BP is under 100 mmHg..."
                  rows="3"
                  className="w-full border border-border-subtle dark:border-outline-variant dark:bg-inverse-surface rounded-lg p-3 text-sm focus:outline-none focus:border-primary text-on-surface dark:text-white"
                />
              </div>

              <div className="flex justify-end gap-sm pt-4">
                <button
                  type="button"
                  onClick={() => navigate("/doctor-dashboard")}
                  className="px-lg py-3 rounded-lg font-semibold text-xs border border-border-subtle dark:border-outline-variant hover:bg-surface-container-low transition-all text-on-surface dark:text-white uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-primary text-white py-3 px-lg rounded-lg font-semibold hover:bg-surface-tint transition-all active:scale-95 duration-150 text-xs uppercase"
                >
                  Confirm & Prescribe
                </button>
              </div>
            </form>
          ) : (
            /* Success confirmation */
            <div className="bg-white dark:bg-on-background rounded-xl p-8 shadow-soft border border-success-medical flex flex-col items-center justify-center text-center max-w-xl mx-auto">
              <div className="w-12 h-12 bg-success-medical/10 rounded-full flex items-center justify-center mb-md border border-success-medical/20">
                <span className="material-symbols-outlined text-success-medical text-2xl font-bold">check_circle</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-on-surface dark:text-white font-bold mb-sm">
                Prescription Logged Successfully
              </h3>
              <p className="font-body-md text-sm text-on-surface-variant mb-6">
                The medication has been appended to {selectedPatient.name}'s current active medical file.
              </p>
              <div className="flex flex-col gap-2 w-full">
                <button
                  onClick={() => setIsSuccess(false)}
                  className="w-full bg-primary-container text-white py-2 rounded-lg font-semibold text-xs uppercase tracking-wider hover:opacity-90 active:scale-95 duration-150 transition-all"
                >
                  Write Another Prescription
                </button>
                <button
                  onClick={() => navigate("/doctor-dashboard")}
                  className="w-full border border-border-subtle dark:border-outline-variant text-on-surface dark:text-white py-2 rounded-lg font-semibold text-xs uppercase hover:bg-surface-container-low"
                >
                  Return to Dashboard
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
