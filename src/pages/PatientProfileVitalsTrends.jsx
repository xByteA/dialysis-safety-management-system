import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getPatients } from "../data/mock-data";

export default function PatientProfileVitalsTrends() {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [selectedPatientId, setSelectedPatientId] = useState("");
  const [filterPeriod, setFilterPeriod] = useState("1M");

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

  // SVG dimensions for dynamic drawing
  const width = 1000;
  const height = 220;

  // Render BP lines if history exists
  const vitals = selectedPatient.vitalsHistory || [];

  const getBPCrossPoint = (bpStr, type) => {
    // parse "120/80" -> systolic=120, diastolic=80
    if (!bpStr) return 0;
    const parts = bpStr.split("/");
    const sys = parseInt(parts[0]) || 120;
    const dia = parseInt(parts[1]) || 80;
    const value = type === "sys" ? sys : dia;

    // Scale mapping value: y-coords [20, 200] corresponds to [180, 40]
    // y = 20 + ((180 - value) / (180 - 40)) * (200 - 20)
    const y = 20 + ((180 - value) / 140) * 180;
    return Math.max(20, Math.min(200, y));
  };

  const getWeightPoint = (wtVal, dryWt) => {
    const ref = dryWt || 70;
    // weight values from ref-3 to ref+5
    // y-coords [20, 200] maps to [ref+5, ref-3]
    const maxVal = ref + 5;
    const minVal = ref - 3;
    const y = 20 + ((maxVal - wtVal) / 8) * 180;
    return Math.max(20, Math.min(200, y));
  };

  // SVG paths builder
  let sysPath = "";
  let diaPath = "";
  let wtPath = "";

  if (vitals.length > 1) {
    const step = width / (vitals.length - 1);
    vitals.forEach((v, idx) => {
      const x = idx * step;
      const sysY = getBPCrossPoint(v.bp, "sys");
      const diaY = getBPCrossPoint(v.bp, "dia");
      const wtY = getWeightPoint(v.weight, selectedPatient.dryWeight);

      if (idx === 0) {
        sysPath = `M ${x} ${sysY}`;
        diaPath = `M ${x} ${diaY}`;
        wtPath = `M ${x} ${wtY}`;
      } else {
        sysPath += ` L ${x} ${sysY}`;
        diaPath += ` L ${x} ${diaY}`;
        wtPath += ` L ${x} ${wtY}`;
      }
    });
  }

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
                  onClick={() => navigate("/vitals-entry")}
                  className="bg-primary text-white font-semibold py-2 px-4 rounded-lg hover:opacity-95 transition-opacity h-12 flex items-center justify-center text-xs active:scale-95 duration-150"
                >
                  Record Vitals
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
              <li className="pb-md border-b-2 border-primary-container text-primary font-semibold cursor-pointer">
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

          {/* Vitals Trends View */}
          <div className="flex flex-col gap-lg">
            {/* Filter Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-md">
              <div>
                <h3 className="font-headline-md text-headline-md text-on-surface dark:text-white font-bold">Trend Analysis</h3>
                <p className="font-body-md text-body-md text-on-surface-variant text-xs mt-1">Review historical vitals data to identify long-term patterns.</p>
              </div>
              <div className="flex items-center bg-surface-container-low dark:bg-inverse-surface p-xs rounded-lg border border-border-subtle dark:border-outline-variant text-xs">
                {["1W", "1M", "3M", "1Y"].map((period) => (
                  <button
                    key={period}
                    onClick={() => setFilterPeriod(period)}
                    className={`px-3 py-1 rounded-md font-semibold ${
                      filterPeriod === period
                        ? "bg-white dark:bg-on-background text-primary shadow-sm ring-1 ring-border-subtle dark:ring-outline-variant"
                        : "text-on-surface-variant hover:text-on-surface"
                    }`}
                  >
                    {period}
                  </button>
                ))}
              </div>
            </div>

            {/* SVG Charts */}
            <div className="grid grid-cols-1 gap-lg">
              {/* Blood Pressure Chart */}
              <div className="bg-white dark:bg-on-background rounded-xl shadow-soft border border-border-subtle dark:border-outline-variant overflow-hidden flex flex-col">
                <div className="p-lg border-b border-border-subtle dark:border-outline-variant flex justify-between items-center bg-white dark:bg-on-background">
                  <div className="flex items-center gap-sm">
                    <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined text-[20px]">favorite</span>
                    </div>
                    <div>
                      <h4 className="font-headline-md text-headline-md text-on-surface dark:text-white font-bold text-sm">Blood Pressure</h4>
                      <p className="font-label-caps text-label-caps text-on-surface-variant text-[9px] uppercase tracking-wider mt-0.5">Vitals Log Readings (mmHg)</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-md text-xs text-on-surface-variant font-medium">
                    <span className="flex items-center gap-xs"><span className="w-2.5 h-2.5 rounded-full bg-primary" /> Systolic</span>
                    <span className="flex items-center gap-xs"><span className="w-2.5 h-2.5 rounded-full bg-secondary" /> Diastolic</span>
                  </div>
                </div>

                <div className="p-lg w-full h-[260px] bg-surface-muted dark:bg-inverse-surface relative">
                  {vitals.length > 1 ? (
                    <svg className="w-full h-full overflow-visible" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
                      {/* Grid Lines */}
                      <line stroke="#E2E8F0" strokeDasharray="4" strokeWidth="1" x1="0" x2={width} y1={20} y2={20} />
                      <line stroke="#E2E8F0" strokeDasharray="4" strokeWidth="1" x1="0" x2={width} y1={110} y2={110} />
                      <line stroke="#E2E8F0" strokeDasharray="4" strokeWidth="1" x1="0" x2={width} y1={200} y2={200} />
                      
                      <text fill="#737686" fontSize="10" x="-10" y="24" textAnchor="end">180</text>
                      <text fill="#737686" fontSize="10" x="-10" y="114" textAnchor="end">110</text>
                      <text fill="#737686" fontSize="10" x="-10" y="204" textAnchor="end">40</text>

                      {/* Diastolic Path */}
                      <path d={diaPath} fill="none" stroke="#006b5f" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                      {/* Systolic Path */}
                      <path d={sysPath} fill="none" stroke="#004ac6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

                      {/* Render Nodes */}
                      {vitals.map((v, i) => {
                        const step = width / (vitals.length - 1);
                        const x = i * step;
                        const sysY = getBPCrossPoint(v.bp, "sys");
                        const diaY = getBPCrossPoint(v.bp, "dia");
                        return (
                          <g key={i}>
                            <circle cx={x} cy={sysY} r="4" fill="#004ac6" stroke="#fff" strokeWidth="2" />
                            <circle cx={x} cy={diaY} r="4" fill="#006b5f" stroke="#fff" strokeWidth="2" />
                          </g>
                        );
                      })}
                    </svg>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-on-surface-variant text-sm font-semibold">
                      Insufficient logs to draw BP trends. Log multiple vitals checks.
                    </div>
                  )}
                </div>
              </div>

              {/* Weight Chart */}
              <div className="bg-white dark:bg-on-background rounded-xl shadow-soft border border-border-subtle dark:border-outline-variant overflow-hidden flex flex-col">
                <div className="p-lg border-b border-border-subtle dark:border-outline-variant flex justify-between items-center bg-white dark:bg-on-background">
                  <div className="flex items-center gap-sm">
                    <div className="w-8 h-8 rounded-md bg-secondary/10 flex items-center justify-center text-secondary">
                      <span className="material-symbols-outlined text-[20px]">scale</span>
                    </div>
                    <div>
                      <h4 className="font-headline-md text-headline-md text-on-surface dark:text-white font-bold text-sm">Weight Tracking</h4>
                      <p className="font-label-caps text-label-caps text-on-surface-variant text-[9px] uppercase tracking-wider mt-0.5">Dry Weight Reference: {selectedPatient.dryWeight} kg</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-md text-xs text-on-surface-variant font-medium">
                    <span className="flex items-center gap-xs"><span className="w-2.5 h-2.5 rounded-full bg-secondary" /> Weight (kg)</span>
                    <span className="flex items-center gap-xs"><span className="w-3 h-0 border-t-2 border-dashed border-outline" /> Dry Weight Target</span>
                  </div>
                </div>

                <div className="p-lg w-full h-[260px] bg-surface-muted dark:bg-inverse-surface relative">
                  {vitals.length > 1 ? (
                    <svg className="w-full h-full overflow-visible" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
                      {/* Grid Lines */}
                      <line stroke="#E2E8F0" strokeDasharray="4" strokeWidth="1" x1="0" x2={width} y1={20} y2={20} />
                      <line stroke="#E2E8F0" strokeDasharray="4" strokeWidth="1" x1="0" x2={width} y1={110} y2={110} />
                      <line stroke="#E2E8F0" strokeDasharray="4" strokeWidth="1" x1="0" x2={width} y1={200} y2={200} />

                      {/* Dry weight target line */}
                      <line stroke="#737686" strokeDasharray="6,4" strokeWidth="2" x1="0" x2={width} y1={getWeightPoint(selectedPatient.dryWeight, selectedPatient.dryWeight)} y2={getWeightPoint(selectedPatient.dryWeight, selectedPatient.dryWeight)} />

                      {/* Weight Line */}
                      <path d={wtPath} fill="none" stroke="#006b5f" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

                      {/* Nodes */}
                      {vitals.map((v, i) => {
                        const step = width / (vitals.length - 1);
                        const x = i * step;
                        const wtY = getWeightPoint(v.weight, selectedPatient.dryWeight);
                        return (
                          <circle key={i} cx={x} cy={wtY} r="4" fill="#006b5f" stroke="#fff" strokeWidth="2" />
                        );
                      })}
                    </svg>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-on-surface-variant text-sm font-semibold">
                      Insufficient logs to draw weight trends. Log multiple vitals checks.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
