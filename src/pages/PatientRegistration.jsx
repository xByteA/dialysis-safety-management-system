import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { savePatient } from "../data/mock-data";

export default function PatientRegistration() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    nationalId: "",
    dob: "",
    gender: "",
    phone: "",
    emergencyContact: "",
    diagnosis: "",
    dryWeight: "",
    allergies: "",
    medications: "",
    vascularAccess: "",
    dialysisType: "",
    frequency: "",
    hepb: "pending",
    hepc: "pending",
    hiv: "pending"
  });

  const [step, setStep] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);
  const [newPatientId, setNewPatientId] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name) {
      alert("Please provide the Patient's Name.");
      return;
    }

    const initials = formData.name
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);

    const generatedId = `${Math.floor(10000 + Math.random() * 90000)}-${initials}`;

    const newPatient = {
      id: generatedId,
      initials,
      ...formData,
      dryWeight: parseFloat(formData.dryWeight) || 0,
      riskLevel: "Low",
      riskScore: 20,
      riskFactors: ["New Patient"],
      bed: "Not Assigned",
      status: "Stable",
      vitalsHistory: [],
      labsHistory: []
    };

    savePatient(newPatient);
    setNewPatientId(generatedId);
    setIsSuccess(true);
  };

  return (
    <div className="max-w-4xl mx-auto pb-12">
      {/* Header & Progress */}
      <div className="mb-8">
        <h1 className="text-headline-lg font-headline-lg text-on-surface dark:text-white mb-6 font-bold">
          Patient Registration
        </h1>
        <div className="flex items-center w-full max-w-2xl">
          <div className="flex-1 flex flex-col items-center cursor-pointer" onClick={() => setStep(1)}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 font-semibold ${
              step >= 1 ? "bg-success-medical text-white" : "bg-primary-container text-white"
            }`}>
              {step > 1 ? <span className="material-symbols-outlined text-sm">check</span> : "1"}
            </div>
            <span className="text-label-caps font-label-caps text-on-surface-variant text-[11px]">Basic Info</span>
          </div>
          <div className={`flex-1 h-1 mx-2 ${step > 1 ? "bg-success-medical" : "bg-primary-container/20"}`}></div>
          <div className="flex-1 flex flex-col items-center cursor-pointer" onClick={() => setStep(2)}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 font-semibold ${
              step === 2 ? "bg-primary-container text-white" : "bg-surface-container-high text-on-surface-variant"
            }`}>
              2
            </div>
            <span className="text-label-caps font-label-caps text-on-surface-variant text-[11px]">Medical Baseline</span>
          </div>
        </div>
      </div>

      {!isSuccess ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          {step === 1 ? (
            /* Step 1: Basic & Identity Info */
            <div className="bg-white dark:bg-on-background rounded-xl p-6 card-shadow border border-border-subtle dark:border-outline-variant">
              <h2 className="text-headline-md font-headline-md font-semibold border-b border-border-subtle dark:border-outline-variant pb-2 mb-6 text-on-surface dark:text-white">
                Patient Identity & Contact
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
                <div>
                  <label className="block text-sm font-semibold mb-1 text-on-surface-variant">Full Name *</label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border border-border-subtle dark:border-outline-variant dark:bg-inverse-surface rounded-lg p-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary dark:text-white"
                    placeholder="e.g. John Doe"
                    type="text"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1 text-on-surface-variant">National ID / Passport</label>
                  <input
                    name="nationalId"
                    value={formData.nationalId}
                    onChange={handleChange}
                    className="w-full border border-border-subtle dark:border-outline-variant dark:bg-inverse-surface rounded-lg p-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary dark:text-white"
                    placeholder="e.g. NID-123456"
                    type="text"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1 text-on-surface-variant">Date of Birth</label>
                  <input
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    className="w-full border border-border-subtle dark:border-outline-variant dark:bg-inverse-surface rounded-lg p-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary dark:text-white"
                    type="date"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1 text-on-surface-variant">Gender</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full border border-border-subtle dark:border-outline-variant dark:bg-inverse-surface rounded-lg p-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary dark:text-white"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1 text-on-surface-variant">Phone Number</label>
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full border border-border-subtle dark:border-outline-variant dark:bg-inverse-surface rounded-lg p-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary dark:text-white"
                    placeholder="+1 (555) 000-0000"
                    type="tel"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1 text-on-surface-variant">Emergency Contact</label>
                  <input
                    name="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={handleChange}
                    className="w-full border border-border-subtle dark:border-outline-variant dark:bg-inverse-surface rounded-lg p-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary dark:text-white"
                    placeholder="Name, Relationship & Phone"
                    type="text"
                  />
                </div>
              </div>
              <div className="flex justify-end mt-6">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="bg-primary-container text-white font-semibold py-3 px-8 rounded-lg shadow-sm hover:opacity-90 active:scale-95 transition-all text-sm"
                >
                  Next Step
                </button>
              </div>
            </div>
          ) : (
            /* Step 2: Medical Baseline */
            <div className="space-y-6">
              {/* Clinical Info Section */}
              <div className="bg-white dark:bg-on-background rounded-xl p-6 card-shadow border border-border-subtle dark:border-outline-variant">
                <h2 className="text-headline-md font-headline-md font-semibold border-b border-border-subtle dark:border-outline-variant pb-2 mb-6 text-on-surface dark:text-white">
                  Clinical Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold mb-1 text-on-surface-variant">Primary Diagnosis</label>
                    <input
                      name="diagnosis"
                      value={formData.diagnosis}
                      onChange={handleChange}
                      className="w-full border border-border-subtle dark:border-outline-variant dark:bg-inverse-surface rounded-lg p-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary dark:text-white"
                      placeholder="e.g. End Stage Renal Disease"
                      type="text"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1 text-on-surface-variant">Dry Weight (kg)</label>
                    <input
                      name="dryWeight"
                      value={formData.dryWeight}
                      onChange={handleChange}
                      className="w-full border border-border-subtle dark:border-outline-variant dark:bg-inverse-surface rounded-lg p-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary dark:text-white"
                      placeholder="0.0"
                      step="0.1"
                      type="number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1 text-on-surface-variant">Known Allergies</label>
                    <input
                      name="allergies"
                      value={formData.allergies}
                      onChange={handleChange}
                      className="w-full border border-border-subtle dark:border-outline-variant dark:bg-inverse-surface rounded-lg p-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary dark:text-white"
                      placeholder="e.g. Penicillin"
                      type="text"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold mb-1 text-on-surface-variant">Current Medications</label>
                    <textarea
                      name="medications"
                      value={formData.medications}
                      onChange={handleChange}
                      className="w-full border border-border-subtle dark:border-outline-variant dark:bg-inverse-surface rounded-lg p-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary dark:text-white"
                      placeholder="List medications..."
                      rows="3"
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* Dialysis Details Section */}
              <div className="bg-white dark:bg-on-background rounded-xl p-6 card-shadow border border-border-subtle dark:border-outline-variant">
                <h2 className="text-headline-md font-headline-md font-semibold border-b border-border-subtle dark:border-outline-variant pb-2 mb-6 text-on-surface dark:text-white">
                  Dialysis Access & Schedule
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
                  <div>
                    <label className="block text-sm font-semibold mb-1 text-on-surface-variant">Vascular Access Type</label>
                    <select
                      name="vascularAccess"
                      value={formData.vascularAccess}
                      onChange={handleChange}
                      className="w-full border border-border-subtle dark:border-outline-variant dark:bg-inverse-surface rounded-lg p-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary dark:text-white"
                    >
                      <option value="">Select Access Type</option>
                      <option value="AV Fistula">AV Fistula</option>
                      <option value="AV Graft">AV Graft</option>
                      <option value="PermCath">PermCath</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1 text-on-surface-variant">Dialysis Type</label>
                    <select
                      name="dialysisType"
                      value={formData.dialysisType}
                      onChange={handleChange}
                      className="w-full border border-border-subtle dark:border-outline-variant dark:bg-inverse-surface rounded-lg p-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary dark:text-white"
                    >
                      <option value="">Select Dialysis Type</option>
                      <option value="Hemodialysis">Hemodialysis</option>
                      <option value="Peritoneal Dialysis">Peritoneal Dialysis</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold mb-1 text-on-surface-variant">Session Frequency</label>
                    <input
                      name="frequency"
                      value={formData.frequency}
                      onChange={handleChange}
                      className="w-full border border-border-subtle dark:border-outline-variant dark:bg-inverse-surface rounded-lg p-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary dark:text-white"
                      placeholder="e.g. 3 times per week"
                      type="text"
                    />
                  </div>
                </div>
              </div>

              {/* Virus Screening Section */}
              <div className="bg-white dark:bg-on-background rounded-xl p-6 card-shadow border border-border-subtle dark:border-outline-variant">
                <h2 className="text-headline-md font-headline-md font-semibold border-b border-border-subtle dark:border-outline-variant pb-2 mb-6 text-on-surface dark:text-white">
                  Virus Screening
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
                  <div>
                    <label className="block text-sm font-semibold mb-1 text-on-surface-variant">Hepatitis B</label>
                    <select
                      name="hepb"
                      value={formData.hepb}
                      onChange={handleChange}
                      className="w-full border border-border-subtle dark:border-outline-variant dark:bg-inverse-surface rounded-lg p-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary dark:text-white"
                    >
                      <option value="pending">Pending</option>
                      <option value="Negative">Negative</option>
                      <option value="Positive">Positive</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1 text-on-surface-variant">Hepatitis C</label>
                    <select
                      name="hepc"
                      value={formData.hepc}
                      onChange={handleChange}
                      className="w-full border border-border-subtle dark:border-outline-variant dark:bg-inverse-surface rounded-lg p-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary dark:text-white"
                    >
                      <option value="pending">Pending</option>
                      <option value="Negative">Negative</option>
                      <option value="Positive">Positive</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1 text-on-surface-variant">HIV</label>
                    <select
                      name="hiv"
                      value={formData.hiv}
                      onChange={handleChange}
                      className="w-full border border-border-subtle dark:border-outline-variant dark:bg-inverse-surface rounded-lg p-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary dark:text-white"
                    >
                      <option value="pending">Pending</option>
                      <option value="Negative">Negative</option>
                      <option value="Positive">Positive</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-between items-center pt-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="border border-border-subtle dark:border-outline-variant text-on-surface dark:text-white font-semibold py-3 px-8 rounded-lg shadow-sm hover:bg-surface-container-low transition-all text-sm"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="bg-primary text-white font-semibold py-3 px-8 rounded-lg shadow-sm hover:opacity-90 active:scale-95 transition-all text-sm"
                >
                  Register Patient
                </button>
              </div>
            </div>
          )}
        </form>
      ) : (
        /* Confirmation State */
        <div className="bg-white dark:bg-on-background rounded-xl p-8 card-shadow border border-success-medical flex flex-col items-center justify-center text-center max-w-xl mx-auto">
          <div className="w-16 h-16 bg-success-medical/10 rounded-full flex items-center justify-center mb-md border border-success-medical/20">
            <span className="material-symbols-outlined text-success-medical text-3xl font-bold">check_circle</span>
          </div>
          <h3 className="font-headline-lg text-headline-lg text-on-surface dark:text-white font-bold mb-sm">
            Patient Registered Successfully
          </h3>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-4">
            <strong>{formData.name}</strong> has been enrolled under Patient ID: <span className="text-primary font-bold">{newPatientId}</span>.
          </p>
          <div className="flex flex-col gap-2 w-full mt-4">
            <button
              onClick={() => navigate("/")}
              className="w-full bg-primary-container text-white py-3 rounded-lg font-semibold text-sm hover:opacity-95 active:scale-95 duration-150 transition-all"
            >
              Go to Nurse Session Queue
            </button>
            <button
              onClick={() => navigate("/doctor-dashboard")}
              className="w-full border border-border-subtle dark:border-outline-variant text-on-surface dark:text-white py-3 rounded-lg font-semibold text-sm hover:bg-surface-container-low"
            >
              Go to Doctor Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
