/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "outline": "#737686",
        "surface-variant": "#d3e4fe",
        "surface-dim": "#cbdbf5",
        "on-primary-fixed-variant": "#003ea8",
        "surface-bg": "#FFFFFF",
        "on-tertiary-fixed": "#360f00",
        "on-primary-fixed": "#00174b",
        "secondary": "#006b5f",
        "background": "#f8f9ff",
        "outline-variant": "#c3c6d7",
        "surface-tint": "#0053db",
        "surface-bright": "#f8f9ff",
        "inverse-primary": "#b4c5ff",
        "on-secondary-fixed-variant": "#005048",
        "surface": "#f8f9ff",
        "inverse-on-surface": "#eaf1ff",
        "surface-container-low": "#eff4ff",
        "on-tertiary-container": "#ffede6",
        "surface-container": "#e5eeff",
        "critical-alert": "#EF4444",
        "inverse-surface": "#213145",
        "on-error-container": "#93000a",
        "primary-fixed-dim": "#b4c5ff",
        "secondary-fixed-dim": "#4fdbc8",
        "primary": "#004ac6",
        "success-medical": "#10B981",
        "primary-container": "#2563eb",
        "error": "#ba1a1a",
        "tertiary": "#943700",
        "on-background": "#0b1c30",
        "on-secondary-container": "#006f64",
        "tertiary-container": "#bc4800",
        "primary-fixed": "#dbe1ff",
        "surface-container-high": "#dce9ff",
        "secondary-fixed": "#71f8e4",
        "on-tertiary-fixed-variant": "#7d2d00",
        "secondary-container": "#6df5e1",
        "on-tertiary": "#ffffff",
        "on-primary-container": "#eeefff",
        "border-subtle": "#E2E8F0",
        "tertiary-fixed": "#ffdbcd",
        "surface-container-lowest": "#ffffff",
        "on-surface-variant": "#434655",
        "error-container": "#ffdad6",
        "surface-container-highest": "#d3e4fe",
        "on-primary": "#ffffff",
        "on-surface": "#0b1c30",
        "on-secondary": "#ffffff",
        "surface-muted": "#F8FAFC",
        "on-error": "#ffffff",
        "on-secondary-fixed": "#00201c",
        "tertiary-fixed-dim": "#ffb596"
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      },
      spacing: {
        "xl": "32px",
        "gutter": "16px",
        "sm": "8px",
        "margin-desktop": "32px",
        "md": "16px",
        "base": "4px",
        "xs": "4px",
        "margin-mobile": "16px",
        "lg": "24px"
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        "display-metrics": ["Inter", "sans-serif"],
        "headline-lg": ["Inter", "sans-serif"],
        "headline-md": ["Inter", "sans-serif"],
        "body-lg": ["Inter", "sans-serif"],
        "body-md": ["Inter", "sans-serif"],
        "label-caps": ["Inter", "sans-serif"],
        "status-badge": ["Inter", "sans-serif"],
        "headline-lg-mobile": ["Inter", "sans-serif"],
      },
      fontSize: {
        "display-metrics": [
          "36px",
          {
            lineHeight: "44px",
            letterSpacing: "-0.02em",
            fontWeight: "700"
          }
        ],
        "headline-lg": [
          "24px",
          {
            lineHeight: "32px",
            fontWeight: "600"
          }
        ],
        "headline-md": [
          "20px",
          {
            lineHeight: "28px",
            fontWeight: "600"
          }
        ],
        "body-lg": [
          "16px",
          {
            lineHeight: "24px",
            fontWeight: "400"
          }
        ],
        "body-md": [
          "14px",
          {
            lineHeight: "20px",
            fontWeight: "400"
          }
        ],
        "label-caps": [
          "12px",
          {
            lineHeight: "16px",
            letterSpacing: "0.05em",
            fontWeight: "600"
          }
        ],
        "status-badge": [
          "12px",
          {
            lineHeight: "12px",
            fontWeight: "700"
          }
        ],
        "headline-lg-mobile": [
          "20px",
          {
            lineHeight: "28px",
            fontWeight: "600"
          }
        ]
      }
    },
  },
  plugins: [],
}
