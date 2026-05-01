# LogiSaaS UI Guidelines & Design System

This document serves as the single source of truth for all UI decisions, styling, colors, and layout metrics for the **LogiSaaS** project.

**CRITICAL RULE:** Whenever creating a new page, component, or modifying the UI, you MUST strictly follow the specifications defined in this file. If the user explicitly requests a UI change (e.g., changing a button color), this file MUST be updated first to reflect the new rule before implementing the change in code.

---

## 1. Color Palette

All colors are implemented as Tailwind variables and mapped in `tailwind.config.ts` and `lib/design-tokens.ts`.

### Brand Colors
*   **Primary (Purple):** The main brand color used for primary actions, active states, and emphasis.
    *   `primary-50`: `#f7eef7` (Hover backgrounds)
    *   `primary-100`: `#eddbee` (Subtle backgrounds, badges)
    *   `primary-200`: `#dbb8db` (Borders, disabled states)
    *   `primary-500`: `#a767a7` (**Primary Brand Color** - Buttons, active tabs, main accents)
    *   `primary-600`: `#8f528f` (Hover states for primary buttons)
    *   `primary-800`: `#562d56` (Deep primary text)
*   **Accent (Amber/Orange):** Used for secondary emphasis, specific chart data, and warnings.
    *   `accent-100`: `#fdf3e3`
    *   `accent-500`: `#e8952e`

### Semantic Colors
*   **Success (Green):** `#22c55e` (Completed, Paid, Delivered) - Background: `#dcfce7`
*   **Danger (Red):** `#ef4444` (Error, Failed, Cancelled, Overdue) - Background: `#fee2e2`
*   **Warning (Yellow):** `#f59e0b` (Pending, Warning) - Background: `#fef9c3`
*   **Info (Blue):** `#3b82f6` (In Transit, Information) - Background: `#dbeafe`

### Neutral / Grayscale
*   `neutral-0` (White): `#ffffff` (Card backgrounds, input backgrounds)
*   `neutral-50`: `#f4f1f4` (**App Background Color**)
*   `neutral-100`: `#ebe6eb` (Borders, dividers, table headers)
*   `neutral-200`: `#d6cdd6` (Stronger borders, empty states)
*   `neutral-400`: `#9a8a9a` (Secondary text, subtitles, placeholders)
*   `neutral-600`: `#5a4d5a` (**Default Body Text Color**)
*   `neutral-800`: `#261e26` (**Heading Text Color**, strong emphasis)

---

## 2. Typography

*   **Font Family (Primary):** `Inter`, sans-serif (Used for all UI elements, headings, and body text).
*   **Font Family (Monospace):** `JetBrains Mono`, monospace (Used for Tracking IDs, Invoice IDs, and technical data).
*   **Base Text:** 15px size, 24px line-height, `neutral-600` color.
*   **Headings:**
    *   H1: 36px, Bold, `neutral-800`
    *   H2 (Page Heading): 24px, Bold, `neutral-800`
    *   H3 (Section Heading): 20px, Semibold, `neutral-800`
    *   H4 (Card Title): 16px, Semibold, `neutral-700`

---

## 3. Layout & Spacing

*   **Grid System:** Standard 4px baseline.
*   **Spacing Tokens:**
    *   `sm`: 16px (`gap-4`, `p-4`)
    *   `md`: 20px/24px (`gap-6`, `p-5`)
    *   `lg`: 32px (`gap-8`, `p-8`)
*   **App Layout:**
    *   Sidebar width: 240px (Expanded), 64px (Collapsed).
    *   Topbar height: 64px.
    *   Max content width: 1200px.

---

## 4. Component Standards

### Buttons
*   **Primary:** `bg-primary-500` text white. Hover: `bg-primary-600`.
*   **Secondary:** `bg-primary-50` text `primary-700` with `border-primary-200`. Hover: `bg-primary-100`.
*   **Ghost:** Transparent background, `neutral-600` text. Hover: `bg-neutral-50`.
*   **Border Radius:** `md` (8px).

### Cards
*   **Background:** `neutral-0` (White).
*   **Border:** 1px solid `neutral-100`.
*   **Border Radius:** `lg` (12px).
*   **Shadow:** Subtle custom purple-tinted shadow (`shadow-sm`).
*   **Padding:** Default `md` (20px).

### Data Tables
*   **Headers:** `neutral-25` background, `neutral-400` uppercase small text (12px), semi-bold.
*   **Rows:** Height 52px. Hover state: `bg-primary-50`. Border bottom: `neutral-100`.

### Status Badges
*   Pill shape (`rounded-full`), small text (11px), uppercase, bold, wide tracking.
*   Uses semantic color pairs (e.g., `bg-success-100` with `text-success-700`).

---

## 5. UI Workflows & Rules

1.  **Component Encapsulation:** All reusable UI elements MUST be created inside `/components/ui/kit` and exported from `index.ts`. Do not write raw Tailwind utility classes for complex, repeated UI patterns directly in pages; extract them into the kit.
2.  **No Arbitrary Colors:** Do not use arbitrary Tailwind colors like `bg-[#ff0000]` or generic colors like `bg-red-500` unless they map directly to the defined tokens. Always use `primary-500`, `danger-500`, etc.
3.  **Updating the System:** If the user requests a change (e.g., "Change the primary button color to blue"), you MUST first update this `UI_GUIDELINES.md` file, update `tailwind.config.ts` and `design-tokens.ts`, and ONLY THEN modify the components.
