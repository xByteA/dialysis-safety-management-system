---
name: Clinical Vitality
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#434655'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#737686'
  outline-variant: '#c3c6d7'
  surface-tint: '#0053db'
  primary: '#004ac6'
  on-primary: '#ffffff'
  primary-container: '#2563eb'
  on-primary-container: '#eeefff'
  inverse-primary: '#b4c5ff'
  secondary: '#006b5f'
  on-secondary: '#ffffff'
  secondary-container: '#6df5e1'
  on-secondary-container: '#006f64'
  tertiary: '#943700'
  on-tertiary: '#ffffff'
  tertiary-container: '#bc4800'
  on-tertiary-container: '#ffede6'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b4c5ff'
  on-primary-fixed: '#00174b'
  on-primary-fixed-variant: '#003ea8'
  secondary-fixed: '#71f8e4'
  secondary-fixed-dim: '#4fdbc8'
  on-secondary-fixed: '#00201c'
  on-secondary-fixed-variant: '#005048'
  tertiary-fixed: '#ffdbcd'
  tertiary-fixed-dim: '#ffb596'
  on-tertiary-fixed: '#360f00'
  on-tertiary-fixed-variant: '#7d2d00'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
  success-medical: '#10B981'
  critical-alert: '#EF4444'
  surface-bg: '#FFFFFF'
  surface-muted: '#F8FAFC'
  border-subtle: '#E2E8F0'
typography:
  display-metrics:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  status-badge:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 12px
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  gutter: 16px
  margin-mobile: 16px
  margin-desktop: 32px
---

## Brand & Style

The design system is engineered for high-stakes medical environments, specifically dialysis management where precision and cognitive load management are critical. The brand personality is **clinical, authoritative, and responsive**, balancing the sterility of medical software with the fluid usability of a modern SaaS platform.

### Design Style: Corporate / Modern (Healthcare Optimized)
The visual language adopts a **Corporate Modern** approach with a strong emphasis on **Accessibility and Safety-First Utility**. 
- **Clarity over Decoration:** Every visual element serves a functional purpose, prioritizing "glanceable" data over aesthetic flair.
- **High-Density Legibility:** Information is organized into distinct logical containers to prevent clinician fatigue.
- **Safety Signaling:** A rigorous color-coded status system ensures that critical alerts (Danger) are immediately distinguishable from standard operational data (Primary/Success).

## Colors

The palette is anchored by **Primary Blue (#2563EB)** to convey reliability and trust. **Teal (#14B8A6)** is utilized for clinical stability and secondary technical actions, providing a calming counterpoint to the primary blue.

### Functional Logic
- **Success/Healthy:** Use `#10B981` for normal vitals and completed medication logs.
- **Critical/Alert:** Use `#EF4444` exclusively for high-priority risk factors, emergency actions, and life-critical warnings.
- **Neutral Hierarchy:** Utilize `Surface Muted (#F8FAFC)` for dashboard backgrounds to let `White (#FFFFFF)` cards pop, creating a clear physical separation of patient data modules.

## Typography

This design system uses **Inter** exclusively to ensure maximum legibility across different device resolutions. The typeface's tall x-height and neutral character make it ideal for dense medical tables and patient logs.

### Typographic Principles
- **Display Metrics:** Used specifically for AI risk scores and vital sign numbers (e.g., Blood Pressure) to ensure they are readable from a distance in a clinical setting.
- **Hierarchy:** Use `label-caps` for table headers and section metadata to provide structural clarity without competing with patient data.
- **Mobile Scaling:** Headlines downscale for mobile viewports to maintain vertical space for data-heavy cards.

## Layout & Spacing

The system uses a **4px base increment** following an 8pt grid logic to ensure rigorous alignment.

### Grid & Responsiveness
- **Desktop:** A fixed-width left sidebar (280px) with a fluid main content area. Data cards should follow a 12-column grid system.
- **Mobile-First:** On handheld devices, the layout collapses into a single-column stack. Sidebars transition into a bottom navigation bar or a hamburger menu to prioritize the patient observation area.
- **Gaps:** Maintain a consistent `16px (md)` gutter between data cards to ensure the "Soft Shadow" depth is visible and distinct.

## Elevation & Depth

Hierarchy is established through **Tonal Layering** and **Ambient Shadows**.

- **Level 0 (Background):** `Surface Muted` (#F8FAFC).
- **Level 1 (Cards/Content):** `White` (#FFFFFF) with a soft, highly diffused shadow: `0px 4px 12px rgba(0, 0, 0, 0.05)`.
- **Level 2 (Modals/Popovers):** `White` (#FFFFFF) with a more pronounced shadow to indicate focus: `0px 10px 25px rgba(0, 0, 0, 0.1)`.

Avoid heavy borders; use the contrast between the white card and the muted background to define boundaries. Use `Border Subtle` (#E2E8F0) only for internal card dividers or table rows.

## Shapes

The design system uses a **Rounded** shape language to soften the clinical experience while maintaining a professional SaaS structure.

- **Cards:** Use `rounded-lg` (16px) for patient summary containers and dashboards.
- **Buttons & Inputs:** Use `rounded-md` (8px) to provide a distinct, interactive feel.
- **Status Badges:** Use a full pill shape (999px radius) for medical status indicators (e.g., "Stable," "In Treatment") to differentiate them from actionable buttons.

## Components

### Buttons
- **Primary:** Solid `#2563EB` with white text. High-contrast, 48px height for mobile accessibility.
- **Secondary:** Outlined or subtle Teal tint.
- **Emergency Action:** Solid `#EF4444` with white text, always positioned in a consistent, high-reach area on mobile.

### Medical Status Badges
Pill-shaped containers with low-opacity backgrounds and high-contrast text.
- *Example:* "High Risk" uses a light red background with dark red text.

### Cards
All cards must have a white surface, 16px corner radius, and the standard soft shadow. Header areas within cards should have a 1px bottom border of `#E2E8F0`.

### Input Fields
Bordered with `#E2E8F0` when inactive, and `#2563EB` with a subtle outer glow when focused. Labels must always be visible (never placeholder-only) to meet medical safety standards.

### AI Risk Indicators
Specialized components using circular gauges or progress bars to visualize AI-calculated safety scores. Use color-coding (Green to Red) to indicate risk levels immediately.