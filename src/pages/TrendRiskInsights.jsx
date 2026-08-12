import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getPatients } from "../data/mock-data";

export default function TrendRiskInsights() {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    setPatients(getPatients());
  }, []);

  const getRiskScoreColor = (score) => {
    if (score >= 80) return "text-error border-error bg-error/5";
    if (score >= 50) return "text-tertiary-container border-tertiary-container bg-tertiary-container/5";
    return "text-success-medical border-success-medical bg-success-medical/5";
  };

  const insightsList = [
    {
      title: "AV Access Clotting Risk",
      metric: "Graft Stenosis Warning",
      desc: "Based on venous pressure trends during the last 3 sessions, there is an elevated probability of stenosis in Arthur Pendelton's AV graft.",
      actionText: "Access Site Details",
      path: "/patient-risk-summary"
    },
    {
      title: "Intradialytic Hypotension Predictor",
      metric: "Critical BP Drop Warning",
      desc: "Machine learning models indicate that Sarah Jenkins has a high probability of intradialytic hypotension during ultrafiltration rate peaks.",
      actionText: "Review Vitals History",
      path: "/patient-profile-vitals-trends"
    },
    {
      title: "Dry Weight Recommendation",
      metric: "Suggested Adjustment: -0.5kg",
      desc: "Robert Chang has shown post-treatment blood pressure elevations combined with slight fluid overload signs. Suggest reducing dry weight baseline.",
      actionText: "Manage Dry Weight",
      path: "/patient-registration"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto pb-12 space-y-lg">
      <div className="border-b border-border-subtle dark:border-outline-variant pb-md mb-md">
        <h1 className="text-headline-lg font-headline-lg text-on-surface dark:text-white font-bold">
          AI Trend &amp; Safety Risk Insights
        </h1>
        <p className="text-xs text-on-surface-variant mt-1">Predictive machine learning models evaluate clinical measurements to warn of potential complications.</p>
      </div>

      {/* Model Overview grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
        {insightsList.map((ins, idx) => (
          <div key={idx} className="bg-white dark:bg-on-background rounded-xl p-lg shadow-soft border border-border-subtle dark:border-outline-variant flex flex-col justify-between space-y-md">
            <div>
              <div className="flex items-center gap-xs text-[10px] font-bold text-primary uppercase tracking-wider mb-2">
                <span className="material-symbols-outlined text-sm font-bold">auto_awesome</span>
                <span>ML Predictor</span>
              </div>
              <h3 className="font-headline-md text-headline-md font-bold text-on-surface dark:text-white text-base leading-tight">
                {ins.title}
              </h3>
              <p className="text-xs text-on-surface-variant font-semibold mt-1 bg-surface-muted dark:bg-inverse-surface px-2 py-1 rounded inline-block">
                {ins.metric}
              </p>
              <p className="text-xs text-on-surface-variant mt-3 leading-relaxed">
                {ins.desc}
              </p>
            </div>
            <button
              onClick={() => navigate(ins.path)}
              className="w-full border border-primary-container text-primary-container font-semibold text-xs py-2.5 rounded-lg hover:bg-surface-container-low transition-colors active:scale-95 duration-150"
            >
              {ins.actionText}
            </button>
          </div>
        ))}
      </section>

      {/* Patients Risk Scores Summary */}
      <section className="bg-white dark:bg-on-background rounded-xl p-6 shadow-soft border border-border-subtle dark:border-outline-variant space-y-md">
        <h2 className="text-headline-md font-headline-md font-bold text-on-surface dark:text-white">
          Active Patient Risk Rankings
        </h2>
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left text-sm font-body-md">
            <thead className="bg-surface-muted dark:bg-surface-container-highest border-b border-border-subtle dark:border-outline-variant">
              <tr>
                <th className="py-3 px-md text-on-surface-variant font-semibold text-xs">Patient</th>
                <th className="py-3 px-md text-on-surface-variant font-semibold text-xs">Vascular Access</th>
                <th className="py-3 px-md text-on-surface-variant font-semibold text-xs">Risk Classification</th>
                <th className="py-3 px-md text-on-surface-variant font-semibold text-xs text-center">Score</th>
                <th className="py-3 px-md text-on-surface-variant font-semibold text-xs text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle dark:divide-outline-variant">
              {patients.map(p => (
                <tr key={p.id} className="hover:bg-surface-muted/50 dark:hover:bg-surface-container-highest/50 transition-colors">
                  <td className="py-4 px-md">
                    <div className="flex items-center gap-sm">
                      <div className="w-8 h-8 rounded-full bg-primary-container text-white flex items-center justify-center font-bold text-xs">
                        {p.initials}
                      </div>
                      <div>
                        <button 
                          onClick={() => navigate("/patient-profile-overview")}
                          className="font-semibold text-on-surface dark:text-white hover:text-primary hover:underline text-xs text-left"
                        >
                          {p.name}
                        </button>
                        <p className="text-[10px] text-on-surface-variant mt-0.5">ID: {p.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-md text-xs text-on-surface-variant">{p.vascularAccess}</td>
                  <td className="py-4 px-md">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                      p.riskLevel === "Critical"
                        ? "bg-red-100 text-red-800 border-red-200"
                        : p.riskLevel === "High"
                        ? "bg-amber-100 text-amber-800 border-amber-200"
                        : "bg-green-100 text-green-800 border-green-200"
                    }`}>
                      {p.riskLevel}
                    </span>
                  </td>
                  <td className="py-4 px-md text-center">
                    <span className={`px-3 py-1 rounded border font-mono text-xs font-bold ${getRiskScoreColor(p.riskScore)}`}>
                      {p.riskScore}%
                    </span>
                  </td>
                  <td className="py-4 px-md text-right">
                    <button 
                      onClick={() => navigate("/patient-risk-summary")}
                      className="text-primary hover:underline font-semibold text-xs"
                    >
                      View File
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
