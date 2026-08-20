# Stitch Dialysis Safety Management System 🩺

[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

The **Stitch Dialysis Safety Management System** is a comprehensive, point-of-care clinical platform engineered specifically for renal care teams, hemodialysis centers, and nephrology departments. It bridges critical communication gaps between nurses, nephrologists, and technicians, providing real-time risk stratification, automated clinical alerts, session flowsheets, and supply chain tracking to maximize patient safety during dialysis treatments.

---

## 📌 Problem Statement

Hemodialysis is a high-acuity treatment requiring continuous monitoring of unstable patients with End-Stage Renal Disease (ESRD) and Chronic Kidney Disease (CKD). Clinical teams face several high-risk operational and clinical challenges:

1. **Intradialytic Complications & Late Detection**: Rapid drops in Blood Pressure (Intradialytic Hypotension - IDH), vascular access failure (AV fistula/graft stenosis, catheter clotting), and fluid overload can lead to sudden cardiovascular collapse. Traditional paper flowsheets or disconnected EHR systems slow response times.
2. **Medication & Dosing Risks**: High-alert medications like Heparin, Epogen, and IV Iron demand precise timing during active sessions. Overdue or incorrect dosing can lead to major thromboembolic or hemorrhagic events.
3. **Communication Silos**: Nurses at the chairside and attending nephrologists often lack real-time asynchronous and synchronous channels to escalate critical vitals or adjust prescriptions dynamically.
4. **Supply Chain & Equipment Downtime**: Dialysis requires specialized consumables (dialyzers, needle sets, acid concentrates). Stockouts or uncalibrated ultrafiltration modules compromise session schedules and patient safety.

**The Solution**: Stitch unifies real-time session tracking, automated risk-prediction algorithms, flowsheets, multi-tier messaging, incident management, and inventory tracking into an intuitive, role-tailored web application.

---

## ✨ Core Features & Functional Modules

### 1. 🏥 Nurse Dashboard & Session Queue
- **Live Session Monitoring**: Track active patient sessions across dialysis chairs and beds with time-elapsed indicators (`08:00 - 12:00`).
- **Urgent Action Badges**: Instant visual identification of patients requiring attention (`Attn Req`, `Critical BP Drop`, `Heparin Overdue`).
- **Quick Actions**: One-click shortcuts to record vitals, log lab results, or initiate direct messages with attending physicians.

### 2. 👨‍⚕️ Doctor Dashboard & Risk Hub
- **Unit Risk Summary**: Categorized patient risk overview (Critical, High, Moderate, Low) driven by automated risk-scoring models.
- **Risk Factor Breakdown**: Deep-dive analysis of risk drivers such as IDH susceptibility, vascular access stenosis, or hyperkalemia.
- **Lab Review Center**: Prioritized view of out-of-range metabolic panels, potassium spikes, and hemoglobin trends requiring physician sign-off.

### 3. 📊 Patient Profiles & Clinical Flowsheets
- **Overview & Demographics**: Complete medical history, dry weight targets, primary diagnosis, allergies, and vascular access details (e.g., Left Forearm AV Fistula).
- **Vitals & Trends Entry**: Interactive entry forms and real-time trend charts for blood pressure, heart rate, temperature, and ultrafiltration/weight change.
- **Lab Results Hub**: Historical lab panels with visual trend indicators (Potassium, Creatinine, BUN, Hemoglobin, Phosphorus).

### 4. 💊 Medication Management & Prescribing
- **Medication Administration Log**: Session-based logging of scheduled IV and oral medications with status tagging (Administered, Due, Overdue).
- **Prescribe & Manage**: Physician interface to add, adjust, or discontinue medications with automatic alert integration.

### 5. 🛠️ Operations, Logistics & Safety Reporting
- **Supply Chain Log**: Real-time inventory tracking for dialyzers, fistula needle sets, saline bags, and acid concentrates with automated reorder thresholds.
- **Incident & Damage Reporting**: Technical logging for equipment malfunctions (e.g., air leak alarms, RO water conductivity spikes) with severity ratings and review workflows.
- **Trend & Risk Insights**: Analytics on unit-wide incident patterns, equipment failure rates, and safety compliance metrics.

### 6. 💬 Secure Messaging & Communication
- **Contextual Chat**: Role-based messaging between nurses and doctors to discuss chairside interventions and obtain verbal order confirmations.
- **Alert Escalation**: Automated notifications convert directly into message threads for rapid clinical coordination.

### 7. 🔔 Central Notifications Center
- **Severity-based Alerts**: Categorized alerts (Critical, Warning, Informational) covering clinical drops, risk level changes, and calibration deadlines.
- **Direct Action Triggers**: Instant buttons to jump directly to patient chairs or technical logs.

### 8. 🌐 Multi-Language Support (i18n)
- Seamless bilingual interface switching between **English** and **Spanish** (`LanguageContext`).

---

## 🎯 Scope & System Boundary

### In-Scope (Current Capabilities)
- **Frontend SPA Application**: Full client-side application built with React 18 and React Router v6.
- **Persistent Mock State**: Built-in state management backed by `localStorage` (`src/data/mock-data.js`) enabling realistic CRUD operations across sessions, vitals, labs, supplies, and messaging.
- **Responsive Healthcare UI**: Styled using Tailwind CSS and Google Material Symbols for clean clinical usability on desktops and clinical tablets.

### Out-of-Scope (Future Enhancements)
- **FHIR / HL7 EHR Integration**: Direct API connection to institutional Electronic Health Record systems (Epic, Cerner).
- **IoT Device Telemetry**: Direct Bluetooth / serial integration with dialysis hardware (e.g., Fresenius, Baxter machines) for automated real-time ultrafiltration data ingestion.
- **Backend Infrastructure**: Production database (PostgreSQL), server-side authentication (OAuth2/OIDC), and HIPAA-compliant Audit Logging.

---

## 🏗️ Technical Architecture & Tech Stack

- **Framework**: [React 18](https://reactjs.org/)
- **Build Tool / Bundler**: [Vite 5](https://vitejs.dev/)
- **Routing**: [React Router DOM v6](https://reactrouter.com/)
- **Styling**: [Tailwind CSS v3](https://tailwindcss.com/), [PostCSS](https://postcss.org/), [Autoprefixer](https://github.com/postcss/autoprefixer)
- **Icons**: Google Material Symbols Outlined
- **State Persistence**: Browser `localStorage` with initial seed data

---

## 📁 Directory Structure

```
stitch-dialysis-safety-management-system/
├── public/                     # Static assets and index HTML template
├── src/
│   ├── components/             # Reusable UI components
│   │   ├── Header.jsx          # Top navigation bar, language switcher, alerts trigger
│   │   ├── Sidebar.jsx         # Navigation menu grouped by clinical workflows
│   │   └── Layout.jsx          # Root layout shell wrapper
│   ├── context/
│   │   └── LanguageContext.jsx # i18n context provider for English / Spanish
│   ├── data/
│   │   ├── mock-data.js        # Seed data and localStorage persistence service
│   │   └── translations.js     # Translation dictionaries
│   ├── pages/                  # Application views & clinical screens
│   │   ├── NurseDashboard.jsx
│   │   ├── DoctorDashboard.jsx
│   │   ├── PatientProfileOverview.jsx
│   │   ├── PatientProfileVitalsTrends.jsx
│   │   ├── PatientProfileLabResults.jsx
│   │   ├── VitalsEntry.jsx
│   │   ├── LabResultsEntry.jsx
│   │   ├── MedicationLog.jsx
│   │   ├── PrescribeMedication.jsx
│   │   ├── PatientRegistration.jsx
│   │   ├── PatientRiskSummary.jsx
│   │   ├── SupplyLog.jsx
│   │   ├── IncidentReport.jsx
│   │   ├── TrendRiskInsights.jsx
│   │   ├── SecureMessaging.jsx
│   │   ├── NurseSecureMessaging.jsx
│   │   └── NotificationsCenter.jsx
│   ├── App.jsx                 # Route definitions and provider context setup
│   ├── index.css               # Global styles & Tailwind directives
│   └── main.jsx                # Application entry point
├── package.json                # Project dependencies and npm scripts
├── vite.config.js              # Vite configuration
├── tailwind.config.js          # Tailwind CSS design system configuration
└── README.md                   # Project documentation
```

---

## 🚀 Getting Started & Development Setup

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### Installation & Running Locally

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-org/stitch-dialysis-safety-management-system.git
   cd stitch-dialysis-safety-management-system
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start Development Server**:
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:5173` to access the portal.

4. **Build for Production**:
   ```bash
   npm run build
   ```
   The compiled static assets will be generated in the `dist/` directory.

5. **Preview Production Build**:
   ```bash
   npm run preview
   ```

---

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.
