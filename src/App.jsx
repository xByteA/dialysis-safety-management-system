import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import { LanguageProvider } from "./context/LanguageContext";

// Importing Page Components
import NurseDashboard from "./pages/NurseDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import PatientRegistration from "./pages/PatientRegistration";
import VitalsEntry from "./pages/VitalsEntry";
import LabResultsEntry from "./pages/LabResultsEntry";
import MedicationLog from "./pages/MedicationLog";
import IncidentReport from "./pages/IncidentReport";
import SupplyLog from "./pages/SupplyLog";
import PatientRiskSummary from "./pages/PatientRiskSummary";
import SecureMessaging from "./pages/SecureMessaging";
import NurseSecureMessaging from "./pages/NurseSecureMessaging";
import PatientProfileOverview from "./pages/PatientProfileOverview";
import PatientProfileLabResults from "./pages/PatientProfileLabResults";
import PatientProfileVitalsTrends from "./pages/PatientProfileVitalsTrends";
import NotificationsCenter from "./pages/NotificationsCenter";
import TrendRiskInsights from "./pages/TrendRiskInsights";
import PrescribeMedication from "./pages/PrescribeMedication";

export default function App() {
  return (
    <LanguageProvider>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            {/* Dashboards */}
            <Route path="/" element={<NurseDashboard />} />
            <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
            
            {/* Patient Files */}
            <Route path="/patient-registration" element={<PatientRegistration />} />
            <Route path="/patient-risk-summary" element={<PatientRiskSummary />} />
            <Route path="/patient-profile-overview" element={<PatientProfileOverview />} />
            <Route path="/patient-profile-lab-results" element={<PatientProfileLabResults />} />
            <Route path="/patient-profile-vitals-trends" element={<PatientProfileVitalsTrends />} />
            
            {/* Forms & Flowsheets */}
            <Route path="/vitals-entry" element={<VitalsEntry />} />
            <Route path="/lab-results-entry" element={<LabResultsEntry />} />
            <Route path="/medication-log" element={<MedicationLog />} />
            <Route path="/prescribe-medication" element={<PrescribeMedication />} />
            
            {/* Operations & Logbooks */}
            <Route path="/supply-log" element={<SupplyLog />} />
            <Route path="/incident-report" element={<IncidentReport />} />
            <Route path="/trend-insights" element={<TrendRiskInsights />} />
            
            {/* Communication & Alerts */}
            <Route path="/messaging" element={<SecureMessaging />} />
            <Route path="/nurse-messaging" element={<NurseSecureMessaging />} />
            <Route path="/notifications" element={<NotificationsCenter />} />
          </Route>
        </Routes>
      </Router>
    </LanguageProvider>
  );
}
