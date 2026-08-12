import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getPatients, savePatient } from "../data/mock-data";

export default function LabResultsEntry() {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [selectedPatientId, setSelectedPatientId] = useState("");
  const [bun, setBun] = useState("");
  const [creatinine, setCreatinine] = useState("");
  const [potassium, setPotassium] = useState("");
  const [calcium, setCalcium] = useState("");
  const [pth, setPth] = useState("");
  const [vitamind, setVitamind] = useState("");
  const [albumin, setAlbumin] = useState("");
  const [hemoglobin, setHemoglobin] = useState("");

  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const list = getPatients();
    setPatients(list);
    if (list.length > 0) {
      setSelectedPatientId(list[0].id); // default patient
    }
  }, []);

  const selectedPatient = patients.find(p => p.id === selectedPatientId) || {};

  const handleSave = () => {
    if (!selectedPatientId) return;

    const newLab = {
      date: new Date().toISOString().split("T")[0],
      potassium: parseFloat(potassium) || 0,
      creatinine: parseFloat(creatinine) || 0,
      bun: parseFloat(bun) || 0,
      hemoglobin: parseFloat(hemoglobin) || 0,
      phosphorus: 4.5, // placeholder fallback
      calcium: parseFloat(calcium) || 0,
      pth: parseInt(pth) || 0,
      vitamind: parseInt(vitamind) || 0,
      albumin: parseFloat(albumin) || 0
    };

    const updatedPatient = {
      ...selectedPatient,
      labsHistory: [newLab, ...selectedPatient.labsHistory]
    };

    savePatient(updatedPatient);
    setIsSuccess(true);
  };

  return (
    <div className="max-w-6xl mx-auto pb-12">
      {/* Patient Selection Dropdown */}
      <div className="bg-white dark:bg-on-background rounded-xl p-md shadow-soft border border-border-subtle dark:border-outline-variant mb-gutter">
        <label className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant mb-2">
          Select Patient for Lab Intake
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
        <div className="flex flex-col md:flex-row gap-gutter">
          {/* Left Column: Patient Context */}
          <aside className="md:w-1/3 flex flex-col gap-gutter">
            <div className="bg-white dark:bg-on-background rounded-xl shadow-soft p-lg border border-border-subtle dark:border-outline-variant">
              <div className="flex items-center gap-md mb-md">
                <div className="w-12 h-12 rounded-full bg-primary-container text-white flex items-center justify-center font-bold text-sm border border-primary-container/20">
                  {selectedPatient.initials}
                </div>
                <div>
                  <h2 className="font-headline-md text-headline-md text-on-surface dark:text-white font-bold leading-tight">
                    {selectedPatient.name}
                  </h2>
                  <p className="font-body-md text-body-md text-on-surface-variant mt-1 text-xs">
                    DOB: {selectedPatient.dob} • ID: {selectedPatient.id}
                  </p>
                </div>
              </div>
              <div className="border-t border-border-subtle dark:border-outline-variant pt-md mt-md space-y-sm text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-on-surface-variant">Access Status</span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-status-badge font-status-badge bg-tertiary-container/10 text-tertiary-container text-[10px] font-bold">
                    {selectedPatient.vascularAccess}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-on-surface-variant">Dry Weight</span>
                  <span className="font-medium text-on-surface dark:text-white">{selectedPatient.dryWeight} kg</span>
                </div>
              </div>
            </div>

            {selectedPatient.riskLevel === "Critical" || selectedPatient.riskLevel === "High" ? (
              <div className="bg-white dark:bg-on-background rounded-xl shadow-soft p-lg border border-error/20 bg-error-container/10">
                <h3 className="font-headline-md text-headline-md mb-md flex items-center gap-sm font-semibold text-error text-sm">
                  <span className="material-symbols-outlined text-critical-alert">warning</span>
                  Recent Alerts
                </h3>
                <ul className="flex flex-col gap-sm text-xs">
                  <li className="p-sm rounded bg-error-container/20 text-on-surface dark:text-white">
                    <span>Patient has elevated risk ({selectedPatient.riskScore}% score). Monitor potassium closely.</span>
                  </li>
                </ul>
              </div>
            ) : null}
          </aside>

          {/* Right Column: Lab Entry Form */}
          <section className="md:w-2/3 flex flex-col">
            {!isSuccess ? (
              <form className="bg-white dark:bg-on-background rounded-xl shadow-soft flex flex-col h-full border border-border-subtle dark:border-outline-variant">
                <div className="p-lg border-b border-border-subtle dark:border-outline-variant">
                  <h2 className="font-headline-lg text-headline-lg mb-xs text-on-surface dark:text-white font-bold">
                    Enter New Lab Results
                  </h2>
                  <p className="font-body-md text-body-md text-on-surface-variant text-xs">
                    Collection Date: Today ({new Date().toLocaleDateString()})
                  </p>
                </div>
                <div className="p-lg flex-grow flex flex-col gap-lg space-y-6">
                  {/* Kidney Panel */}
                  <div>
                    <h4 className="font-label-caps text-label-caps text-primary uppercase mb-md text-xs tracking-wider">
                      Kidney Panel
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                      <div className="flex flex-col gap-xs">
                        <label className="font-body-md text-body-md font-semibold text-on-surface text-sm">BUN (Blood Urea Nitrogen)</label>
                        <div className="relative flex items-center">
                          <input
                            value={bun}
                            onChange={(e) => setBun(e.target.value)}
                            className="w-full h-12 px-sm border border-border-subtle dark:border-outline-variant dark:bg-inverse-surface rounded-md focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none text-sm text-on-surface dark:text-white"
                            placeholder="Ref: 7 - 20"
                            type="number"
                          />
                          <span className="absolute right-sm text-on-surface-variant text-xs">mg/dL</span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-xs">
                        <label className="font-body-md text-body-md font-semibold text-on-surface text-sm">Creatinine</label>
                        <div className="relative flex items-center">
                          <input
                            value={creatinine}
                            onChange={(e) => setCreatinine(e.target.value)}
                            className="w-full h-12 px-sm border border-border-subtle dark:border-outline-variant dark:bg-inverse-surface rounded-md focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none text-sm text-on-surface dark:text-white"
                            placeholder="Ref: 0.6 - 1.2"
                            step="0.1"
                            type="number"
                          />
                          <span className="absolute right-sm text-on-surface-variant text-xs">mg/dL</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Electrolytes */}
                  <div>
                    <h4 className="font-label-caps text-label-caps text-primary uppercase mb-md text-xs tracking-wider">
                      Electrolytes
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                      <div className="flex flex-col gap-xs">
                        <label className="font-body-md text-body-md font-semibold text-on-surface text-sm">Potassium</label>
                        <div className="relative flex items-center">
                          <input
                            value={potassium}
                            onChange={(e) => setPotassium(e.target.value)}
                            className="w-full h-12 px-sm border border-border-subtle dark:border-outline-variant dark:bg-inverse-surface rounded-md focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none text-sm text-on-surface dark:text-white"
                            placeholder="Ref: 3.5 - 5.0"
                            step="0.1"
                            type="number"
                          />
                          <span className="absolute right-sm text-on-surface-variant text-xs">mEq/L</span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-xs">
                        <label className="font-body-md text-body-md font-semibold text-on-surface text-sm">Calcium</label>
                        <div className="relative flex items-center">
                          <input
                            value={calcium}
                            onChange={(e) => setCalcium(e.target.value)}
                            className="w-full h-12 px-sm border border-border-subtle dark:border-outline-variant dark:bg-inverse-surface rounded-md focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none text-sm text-on-surface dark:text-white"
                            placeholder="Ref: 8.5 - 10.5"
                            step="0.1"
                            type="number"
                          />
                          <span className="absolute right-sm text-on-surface-variant text-xs">mg/dL</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bone & Nutrition Markers */}
                  <div>
                    <h4 className="font-label-caps text-label-caps text-primary uppercase mb-md text-xs tracking-wider">
                      Bone &amp; Nutrition Markers
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
                      <div className="flex flex-col gap-xs">
                        <label className="font-body-md text-body-md font-semibold text-on-surface text-sm">PTH Intact</label>
                        <div className="relative flex items-center">
                          <input
                            value={pth}
                            onChange={(e) => setPth(e.target.value)}
                            className="w-full h-12 px-sm border border-border-subtle dark:border-outline-variant dark:bg-inverse-surface rounded-md focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none text-sm text-on-surface dark:text-white"
                            placeholder="Ref: 15 - 65"
                            type="number"
                          />
                          <span className="absolute right-sm text-on-surface-variant text-xs">pg/mL</span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-xs">
                        <label className="font-body-md text-body-md font-semibold text-on-surface text-sm">Vitamin D</label>
                        <div className="relative flex items-center">
                          <input
                            value={vitamind}
                            onChange={(e) => setVitamind(e.target.value)}
                            className="w-full h-12 px-sm border border-border-subtle dark:border-outline-variant dark:bg-inverse-surface rounded-md focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none text-sm text-on-surface dark:text-white"
                            placeholder="Ref: 20 - 50"
                            type="number"
                          />
                          <span className="absolute right-sm text-on-surface-variant text-xs">ng/mL</span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-xs">
                        <label className="font-body-md text-body-md font-semibold text-on-surface text-sm">Albumin</label>
                        <div className="relative flex items-center">
                          <input
                            value={albumin}
                            onChange={(e) => setAlbumin(e.target.value)}
                            className="w-full h-12 px-sm border border-border-subtle dark:border-outline-variant dark:bg-inverse-surface rounded-md focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none text-sm text-on-surface dark:text-white"
                            placeholder="Ref: 3.4 - 5.4"
                            step="0.1"
                            type="number"
                          />
                          <span className="absolute right-sm text-on-surface-variant text-xs">g/dL</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* CBC */}
                  <div>
                    <h4 className="font-label-caps text-label-caps text-primary uppercase mb-md text-xs tracking-wider">
                      Complete Blood Count
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                      <div className="flex flex-col gap-xs">
                        <label className="font-body-md text-body-md font-semibold text-on-surface text-sm">Hemoglobin</label>
                        <div className="relative flex items-center">
                          <input
                            value={hemoglobin}
                            onChange={(e) => setHemoglobin(e.target.value)}
                            className="w-full h-12 px-sm border border-border-subtle dark:border-outline-variant dark:bg-inverse-surface rounded-md focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none text-sm text-on-surface dark:text-white"
                            placeholder="Ref: 12.0 - 15.5"
                            step="0.1"
                            type="number"
                          />
                          <span className="absolute right-sm text-on-surface-variant text-xs">g/dL</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-lg border-t border-border-subtle dark:border-outline-variant bg-surface-muted dark:bg-surface-container-highest rounded-b-xl flex justify-end gap-md">
                  <button
                    onClick={() => navigate("/")}
                    type="button"
                    className="px-md py-sm rounded-md border border-border-subtle dark:border-outline-variant text-on-surface dark:text-white font-semibold text-sm hover:bg-surface-container-low transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    type="button"
                    className="px-lg py-sm rounded-md bg-primary-container text-white font-semibold text-sm hover:bg-primary transition-colors flex items-center gap-xs active:scale-95 duration-150"
                  >
                    <span className="material-symbols-outlined text-[18px]">check_circle</span>
                    Save Lab Intake
                  </button>
                </div>
              </form>
            ) : (
              /* Success confirmation state */
              <div className="bg-white dark:bg-on-background rounded-xl p-8 card-shadow border border-success-medical flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-success-medical/10 rounded-full flex items-center justify-center mb-md border border-success-medical/20">
                  <span className="material-symbols-outlined text-success-medical text-3xl font-bold">check_circle</span>
                </div>
                <h3 className="font-headline-lg text-headline-lg text-on-surface dark:text-white font-bold mb-sm">
                  Lab Intake Logged Successfully
                </h3>
                <p className="font-body-lg text-body-lg text-on-surface-variant mb-lg">
                  Lab results for {selectedPatient.name} have been committed to history records.
                </p>
                <div className="flex gap-sm">
                  <button
                    onClick={() => {
                      setBun("");
                      setCreatinine("");
                      setPotassium("");
                      setCalcium("");
                      setPth("");
                      setVitamind("");
                      setAlbumin("");
                      setHemoglobin("");
                      setIsSuccess(false);
                    }}
                    className="px-lg py-sm h-12 font-semibold text-primary border border-border-subtle rounded-lg hover:bg-surface-container-low transition-colors text-xs uppercase tracking-wider"
                  >
                    Enter Another
                  </button>
                  <button
                    onClick={() => navigate("/doctor-dashboard")}
                    className="px-lg py-sm h-12 font-semibold text-white bg-primary-container rounded-lg hover:opacity-90 transition-colors flex items-center gap-sm text-xs uppercase tracking-wider"
                  >
                    Return to Dashboard
                  </button>
                </div>
              </div>
            )}
          </section>
        </div>
      )}
    </div>
  );
}
