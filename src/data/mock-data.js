// Initial mock database for the Mercy Dialysis Portal

const initialPatients = [
  {
    id: "49201-B",
    name: "Robert Chang",
    initials: "RC",
    dob: "1952-11-04",
    gender: "Male",
    phone: "+1 (555) 019-2831",
    emergencyContact: "Linda Chang (Wife) - +1 (555) 019-2832",
    nationalId: "NID-889102-X",
    diagnosis: "End Stage Renal Disease (ESRD) secondary to Type 2 Diabetes",
    dryWeight: 72.5,
    allergies: "Sulfa Drugs",
    medications: "Epogen 4000U IV, Nephrovite 1 tab daily, Renvela 800mg with meals",
    vascularAccess: "AV Fistula - Left Forearm",
    dialysisType: "Hemodialysis",
    frequency: "3 times per week (Mon/Wed/Fri)",
    hepb: "Negative",
    hepc: "Negative",
    hiv: "Negative",
    riskLevel: "Moderate",
    riskScore: 68,
    riskFactors: ["Diabetes", "AV Fistula Stenosis Risk", "Mild Hypotension Episodes"],
    bed: "Chair 07",
    status: "Stable",
    vitalsHistory: [
      { time: "08:15", bp: "128/76", weight: 73.1, hr: 72, temp: "36.6°C", remarks: "Pre-treatment vitals" },
      { time: "09:15", bp: "122/74", weight: 72.9, hr: 74, temp: "36.5°C", remarks: "Hour 1 check" },
      { time: "10:15", bp: "118/70", weight: 72.7, hr: 75, temp: "36.6°C", remarks: "Hour 2 check" }
    ],
    labsHistory: [
      { date: "2026-08-10", potassium: 5.1, creatinine: 8.4, bun: 54, hemoglobin: 11.2, phosphorus: 4.8 },
      { date: "2026-07-12", potassium: 4.9, creatinine: 8.6, bun: 58, hemoglobin: 10.9, phosphorus: 5.2 }
    ]
  },
  {
    id: "38920-C",
    name: "Arthur Pendelton",
    initials: "AP",
    dob: "1941-05-18",
    gender: "Male",
    phone: "+1 (555) 014-9922",
    emergencyContact: "Thomas Pendelton (Son) - +1 (555) 014-9923",
    nationalId: "NID-223145-Y",
    diagnosis: "ESRD secondary to Hypertensive Nephrosclerosis",
    dryWeight: 84.0,
    allergies: "Penicillin",
    medications: "Heparin 1000U/hr IV, Lisinopril 10mg daily, Sensipar 30mg daily",
    vascularAccess: "AV Graft - Right Upper Arm",
    dialysisType: "Hemodialysis",
    frequency: "3 times per week (Mon/Wed/Fri)",
    hepb: "Negative",
    hepc: "Negative",
    hiv: "Negative",
    riskLevel: "High",
    riskScore: 88,
    riskFactors: ["Severe Hypertension", "Cardiovascular Disease", "Graft Clotting Susceptibility"],
    bed: "Chair 04",
    status: "Attention Required",
    vitalsHistory: [
      { time: "08:05", bp: "162/95", weight: 85.8, hr: 82, temp: "36.8°C", remarks: "Elevated pre-treatment blood pressure" },
      { time: "09:05", bp: "155/90", weight: 85.2, hr: 84, temp: "36.7°C", remarks: "Hour 1 check" },
      { time: "10:05", bp: "148/88", weight: 84.7, hr: 80, temp: "36.8°C", remarks: "Hour 2 check" }
    ],
    labsHistory: [
      { date: "2026-08-08", potassium: 5.9, creatinine: 9.8, bun: 72, hemoglobin: 9.8, phosphorus: 6.4 },
      { date: "2026-07-08", potassium: 5.7, creatinine: 10.1, bun: 75, hemoglobin: 10.1, phosphorus: 6.1 }
    ]
  },
  {
    id: "27810-A",
    name: "Sarah Jenkins",
    initials: "SJ",
    dob: "1968-12-25",
    gender: "Female",
    phone: "+1 (555) 017-8833",
    emergencyContact: "Mark Jenkins (Husband) - +1 (555) 017-8834",
    nationalId: "NID-998811-A",
    diagnosis: "ESRD secondary to Polycystic Kidney Disease",
    dryWeight: 61.2,
    allergies: "Latex, Iodine",
    medications: "Epogen 3000U IV, Hectorol 2.5mcg post-dialysis, Phoslo 667mg",
    vascularAccess: "PermCath - Right Internal Jugular",
    dialysisType: "Hemodialysis",
    frequency: "3 times per week (Tue/Thu/Sat)",
    hepb: "Negative",
    hepc: "Negative",
    hiv: "Negative",
    riskLevel: "Critical",
    riskScore: 92,
    riskFactors: ["Intradialytic Hypotension", "Catheter Dysfunction", "Latex Allergy"],
    bed: "Bed 04",
    status: "Critical BP Drop",
    vitalsHistory: [
      { time: "09:35", bp: "118/72", weight: 62.4, hr: 78, temp: "36.7°C", remarks: "Pre-dialysis" },
      { time: "10:35", bp: "105/65", weight: 62.0, hr: 85, temp: "36.8°C", remarks: "Slight blood pressure decrease" },
      { time: "11:35", bp: "85/55", weight: 61.6, hr: 96, temp: "36.9°C", remarks: "Critical blood pressure drop during hour 2" }
    ],
    labsHistory: [
      { date: "2026-08-09", potassium: 4.8, creatinine: 7.1, bun: 48, hemoglobin: 10.5, phosphorus: 4.2 },
      { date: "2026-07-09", potassium: 5.2, creatinine: 7.5, bun: 52, hemoglobin: 10.2, phosphorus: 4.5 }
    ]
  },
  {
    id: "19023-F",
    name: "James Wilson",
    initials: "JW",
    dob: "1975-03-12",
    gender: "Male",
    phone: "+1 (555) 012-7711",
    emergencyContact: "Mary Wilson (Sister) - +1 (555) 012-7712",
    nationalId: "NID-554433-C",
    diagnosis: "Chronic Kidney Disease Stage 5, Focal Segmental Glomerulosclerosis",
    dryWeight: 78.0,
    allergies: "None",
    medications: "Iron Dextran 100mg IV monthly, Calcitriol 0.25mcg daily",
    vascularAccess: "AV Fistula - Right Forearm",
    dialysisType: "Hemodialysis",
    frequency: "3 times per week (Mon/Wed/Fri)",
    hepb: "Negative",
    hepc: "Negative",
    hiv: "Negative",
    riskLevel: "Low",
    riskScore: 35,
    riskFactors: ["Slightly Elevated Pre-treatment Potassium"],
    bed: "Chair 07",
    status: "Stable",
    vitalsHistory: [
      { time: "10:05", bp: "132/82", weight: 79.2, hr: 68, temp: "36.5°C", remarks: "Stable pre-treatment" }
    ],
    labsHistory: [
      { date: "2026-08-11", potassium: 5.3, creatinine: 9.1, bun: 62, hemoglobin: 11.5, phosphorus: 5.0 }
    ]
  },
  {
    id: "58291-D",
    name: "William Chen",
    initials: "WC",
    dob: "1960-07-29",
    gender: "Male",
    phone: "+1 (555) 015-3849",
    emergencyContact: "Grace Chen (Daughter) - +1 (555) 015-3850",
    nationalId: "NID-772299-W",
    diagnosis: "ESRD secondary to Diabetic Nephropathy",
    dryWeight: 68.5,
    allergies: "Aspirin",
    medications: "Lantus SoloStar 15U nightly, Cozaar 50mg daily, Renvela 1600mg with meals",
    vascularAccess: "AV Fistula - Left Upper Arm",
    dialysisType: "Hemodialysis",
    frequency: "3 times per week (Tue/Thu/Sat)",
    hepb: "Negative",
    hepc: "Negative",
    hiv: "Negative",
    riskLevel: "Moderate",
    riskScore: 59,
    riskFactors: ["Glucose Fluctuations", "Hyperkalemia Risk"],
    bed: "Bed 02",
    status: "Stable",
    vitalsHistory: [
      { time: "08:00", bp: "128/78", weight: 69.4, hr: 70, temp: "36.6°C", remarks: "Routine baseline" }
    ],
    labsHistory: [
      { date: "2026-08-12", potassium: 5.6, creatinine: 8.8, bun: 60, hemoglobin: 11.0, phosphorus: 5.5 }
    ]
  },
  {
    id: "68302-E",
    name: "Maria Garcia",
    initials: "MG",
    dob: "1983-09-14",
    gender: "Female",
    phone: "+1 (555) 016-1920",
    emergencyContact: "Jose Garcia (Father) - +1 (555) 016-1921",
    nationalId: "NID-339944-V",
    diagnosis: "Lupus Nephritis, ESRD",
    dryWeight: 54.0,
    allergies: "Contrast Dye",
    medications: "Prednisone 5mg daily, CellCept 500mg bid, Epogen 3000U IV",
    vascularAccess: "AV Fistula - Left Forearm",
    dialysisType: "Hemodialysis",
    frequency: "3 times per week (Tue/Thu/Sat)",
    hepb: "Negative",
    hepc: "Negative",
    hiv: "Negative",
    riskLevel: "Low",
    riskScore: 28,
    riskFactors: ["Immunosuppressed State"],
    bed: "Chair 12",
    status: "Stable",
    vitalsHistory: [
      { time: "09:30", bp: "114/70", weight: 54.6, hr: 72, temp: "36.7°C", remarks: "Pre-treatment checks normal" }
    ],
    labsHistory: [
      { date: "2026-08-12", potassium: 4.2, creatinine: 6.9, bun: 44, hemoglobin: 11.8, phosphorus: 4.0 }
    ]
  },
  {
    id: "77291-H",
    name: "Emma Lopez",
    initials: "EL",
    dob: "1990-11-01",
    gender: "Female",
    phone: "+1 (555) 018-4455",
    emergencyContact: "Carlos Lopez (Brother) - +1 (555) 018-4456",
    nationalId: "NID-102938-Q",
    diagnosis: "IgA Nephropathy, ESRD",
    dryWeight: 59.8,
    allergies: "Codeine",
    medications: "Hectorol 2mcg IV, Renvela 800mg tid",
    vascularAccess: "AV Fistula - Right Forearm",
    dialysisType: "Hemodialysis",
    frequency: "3 times per week (Mon/Wed/Fri)",
    hepb: "Negative",
    hepc: "Negative",
    hiv: "Negative",
    riskLevel: "Low",
    riskScore: 18,
    riskFactors: ["None"],
    bed: "Bed 02",
    status: "Stable",
    vitalsHistory: [
      { time: "14:00", bp: "120/75", weight: 60.5, hr: 68, temp: "36.4°C", remarks: "Stable baseline" }
    ],
    labsHistory: [
      { date: "2026-08-05", potassium: 4.5, creatinine: 7.2, bun: 42, hemoglobin: 12.1, phosphorus: 4.1 }
    ]
  }
];

const initialSessions = [
  {
    id: 1,
    time: "08:00 - 12:00",
    patientId: "49201-B",
    patientName: "Robert Chang",
    initials: "RC",
    bed: "Chair 07",
    status: "In Progress",
    statusType: "primary"
  },
  {
    id: 2,
    time: "08:00 - 12:00",
    patientId: "38920-C",
    patientName: "Arthur Pendelton",
    initials: "AP",
    bed: "Chair 04",
    status: "Attn Req",
    statusType: "error",
    medicationAlert: "Heparin: 15m Overdue"
  },
  {
    id: 3,
    time: "09:30 - 13:30",
    patientId: "27810-A",
    patientName: "Sarah Jenkins",
    initials: "SJ",
    bed: "Bed 04",
    status: "Attn Req",
    statusType: "error",
    medicationAlert: "Critical BP Drop"
  },
  {
    id: 4,
    time: "09:30 - 13:30",
    patientId: "68302-E",
    patientName: "Maria Garcia",
    initials: "MG",
    bed: "Chair 12",
    status: "In Progress",
    statusType: "primary",
    medicationAlert: "Epogen: Due in 10m"
  },
  {
    id: 5,
    time: "10:00 - 14:00",
    patientId: "19023-F",
    patientName: "James Wilson",
    initials: "JW",
    bed: "Chair 07",
    status: "In Progress",
    statusType: "success",
    medicationAlert: "Iron: Due 11:30"
  },
  {
    id: 6,
    time: "14:00 - 18:00",
    patientId: "77291-H",
    patientName: "Emma Lopez",
    initials: "EL",
    bed: "Bed 02",
    status: "Scheduled",
    statusType: "muted"
  }
];

const initialLabReviews = [
  {
    id: 1,
    panelName: "Comprehensive Metabolic Panel",
    patientId: "58291-D",
    patientName: "William Chen",
    priority: "Routine",
    outOfRange: "Potassium 5.6",
    trend: "arrow_upward",
    trendColor: "tertiary"
  },
  {
    id: 2,
    panelName: "CBC w/ Differential",
    patientId: "68302-E",
    patientName: "Maria Garcia",
    priority: "Urgent",
    outOfRange: "All Within Normal Limits",
    trend: "",
    trendColor: "success-medical"
  }
];

const initialAlerts = [
  {
    id: 1,
    type: "heart_broken",
    title: "Critical BP Drop - Bed 04",
    time: "2 min ago",
    patientId: "27810-A",
    patientName: "Sarah Jenkins",
    message: "BP dropped to 85/55 during hour 2 of dialysis.",
    actionable: true,
    actionText: "Call Station",
    actionType: "critical"
  },
  {
    id: 2,
    type: "trending_up",
    title: "Risk Level Change - Arthur Pendelton",
    time: "15 min ago",
    patientId: "38920-C",
    patientName: "Arthur Pendelton",
    message: "AI prediction indicates elevated risk for clotting in AV graft.",
    actionable: true,
    actionText: "Review Access Info",
    actionType: "standard"
  },
  {
    id: 3,
    type: "warning",
    title: "Equipment Calibration Overdue - Machine 12",
    time: "1 hour ago",
    message: "Ultrafiltration module is past the scheduled calibration window.",
    actionable: false
  }
];

const initialMessages = [
  { id: 1, sender: "Dr. Sarah Chen", recipient: "Nurse Davis", text: "Please monitor bed 4 BP every 15 mins.", time: "10:18 AM" },
  { id: 2, sender: "Nurse Davis", recipient: "Dr. Sarah Chen", text: "Understood. Trend is showing slow stabilization. Saline bolus administered.", time: "10:22 AM" },
  { id: 3, sender: "Dr. Sarah Chen", recipient: "Nurse Davis", text: "Excellent. Let me know if MAP drops below 60.", time: "10:24 AM" },
  { id: 4, sender: "Nurse Henderson", recipient: "Nurse Davis", text: "Do we have extra bloodline kits in cabinet B?", time: "09:45 AM" },
  { id: 5, sender: "Nurse Davis", recipient: "Nurse Henderson", text: "Yes, stocked this morning. Bottom shelf.", time: "09:47 AM" }
];

const initialSupplies = [
  { id: "S101", name: "High-Flux Dialyzer (F180)", category: "Consumables", stock: 45, reorder: 20, unit: "pcs", status: "In Stock" },
  { id: "S102", name: "AV Fistula Needle Sets (15G)", category: "Consumables", stock: 120, reorder: 50, unit: "pcs", status: "In Stock" },
  { id: "S103", name: "Acid Concentrate (Red)", category: "Solutions", stock: 8, reorder: 10, unit: "jugs", status: "Low Stock" },
  { id: "S104", name: "Heparin Sodium 1000U/mL", category: "Medications", stock: 35, reorder: 15, unit: "vials", status: "In Stock" },
  { id: "S105", name: "Saline Bag 0.9% (1000mL)", category: "Solutions", stock: 14, reorder: 25, unit: "pcs", status: "Low Stock" }
];

const initialIncidents = [
  { id: "INC-2026-089", equipmentId: "Dialysis Machine #08", severity: "Medium", type: "Air Leak Detected", reporter: "Nurse Davis", status: "Under Review", date: "2026-08-11", details: "Machine threw air bubble alarm multiple times during pre-run checks. Replaced cassette but error persists." },
  { id: "INC-2026-088", equipmentId: "Water Filtration RO System", severity: "High", type: "Conductivity Spike", reporter: "Tech Ramirez", status: "Resolved", date: "2026-08-10", details: "Conductivity alarm triggered at main water supply. Main filter backwashed and recalibrated. Water tests normal." }
];

// Initialize localStorage if not present
const getStored = (key, fallback) => {
  const value = localStorage.getItem(key);
  if (!value) {
    localStorage.setItem(key, JSON.stringify(fallback));
    return fallback;
  }
  return JSON.parse(value);
};

export const getPatients = () => getStored("mercy_patients", initialPatients);
export const savePatient = (patient) => {
  const patients = getPatients();
  const index = patients.findIndex(p => p.id === patient.id);
  if (index !== -1) {
    patients[index] = patient;
  } else {
    patients.push(patient);
  }
  localStorage.setItem("mercy_patients", JSON.stringify(patients));
  return patients;
};

export const getSessions = () => getStored("mercy_sessions", initialSessions);
export const getLabReviews = () => getStored("mercy_labs", initialLabReviews);
export const getAlerts = () => getStored("mercy_alerts", initialAlerts);
export const triggerAlert = (alert) => {
  const alerts = getAlerts();
  alerts.unshift({ id: Date.now(), ...alert });
  localStorage.setItem("mercy_alerts", JSON.stringify(alerts));
  return alerts;
};

export const getMessages = () => getStored("mercy_messages", initialMessages);
export const sendMessage = (msg) => {
  const messages = getMessages();
  messages.push({ id: Date.now(), ...msg });
  localStorage.setItem("mercy_messages", JSON.stringify(messages));
  return messages;
};

export const getSupplies = () => getStored("mercy_supplies", initialSupplies);
export const getIncidents = () => getStored("mercy_incidents", initialIncidents);
export const reportIncident = (incident) => {
  const incidents = getIncidents();
  incidents.unshift({ id: `INC-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`, date: new Date().toISOString().split("T")[0], ...incident });
  localStorage.setItem("mercy_incidents", JSON.stringify(incidents));
  return incidents;
};
