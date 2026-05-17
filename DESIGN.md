---
name: Qadam
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  title-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: 0.01em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1200px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 32px
---

## Brand & Style

The brand personality is academic, structured, and goal-oriented. It is designed to act as a reliable companion for Uzbek students, guiding them through their educational journey "step by step" (Qadam ba qadam). The visual language avoids clutter to reduce cognitive load, prioritizing clarity and focus.

The design style is **Corporate / Modern** with a lean toward **Minimalism**. It utilizes heavy whitespace to separate different academic subjects and tasks, combined with a systematic approach to hierarchy. The emotional response should be one of calm productivity and professional growth.

## Colors

The palette is centered around a professional **Education Blue** (Primary) which evokes trust and institutional stability. **Success Green** (Secondary) is used exclusively for completed tasks, progress indicators, and positive reinforcement to motivate the student.

The system supports two modes:
- **Light Mode:** Uses a clean "Slate" grayscale for text and borders, with off-white surfaces to reduce eye strain during long study sessions.
- **Dark Mode:** Deep navy backgrounds with subtle tonal shifts to maintain depth without high-contrast glare.

Status colors:
- **Primary:** #1D4ED8 (Bilim/Education)
- **Success:** #059669 (Muvaffaqiyat/Success)
- **Warning:** #F59E0B (Diqqat/Warning)
- **Danger:** #DC2626 (Xato/Error)

## Typography

The typography system uses **Inter**, a highly legible sans-serif font that excels in data-heavy environments like planners and schedules. It supports both Latin and Cyrillic characters required for the Uzbek language.

Hierarchy is established through weight rather than just size. Headlines are bold and compact, while body text uses a generous line height (1.6) to ensure readability of notes and task descriptions. Labels use a slightly tighter leading and medium weight for quick scanning of metadata like dates and tags.

## Layout & Spacing

This design system utilizes a **12-column fluid grid** compatible with Bootstrap 5. The spacing rhythm is based on an **8px linear scale**, ensuring consistent alignment across all components.

- **Desktop:** 12 columns, 24px gutters, 32px side margins.
- **Tablet:** 8 columns, 16px gutters, 24px side margins.
- **Mobile:** 4 columns, 16px gutters, 16px side margins.

Vertical spacing should be generous between sections (e.g., 48px or 64px) to maintain the minimalist and organized feel, preventing the student from feeling overwhelmed by too much information at once.

## Elevation & Depth

Visual hierarchy is primarily achieved through **Tonal Layers** and **Low-contrast outlines**. 

In light mode, surfaces are distinguished by slight shifts in background color (e.g., a white card on a light gray background). In dark mode, higher-elevation elements use lighter shades of navy. 

Shadows are used sparingly, limited to floating action buttons or active modal overlays. These shadows should be extra-diffused with low opacity (e.g., `box-shadow: 0 4px 20px rgba(0,0,0,0.05)`) to maintain a flat, professional aesthetic.

## Shapes

The shape language is **Soft**, reflecting a modern yet disciplined academic environment. 

- Standard components (buttons, inputs) use a **0.25rem (4px)** corner radius.
- Larger containers like cards and modals use **0.5rem (8px)**.
- Specific motivational elements, such as progress pills or "Add Task" buttons, may use fully rounded (pill-shaped) ends to stand out as interactive objects.

## Components

### Buttons
- **Primary:** Solid Blue (#1D4ED8) with white text. Used for main actions like "Vazifa qo'shish" (Add task).
- **Success:** Solid Green (#059669). Used for completion actions like "Yakunlash" (Finish).
- **Secondary:** Outlined Slate with subtle hover states.

### Cards
Cards are the primary container for tasks. They should have a 1px border (`#E2E8F0`) and no shadow. The header of the card should clearly display the subject name in `label-sm` weight.

### Input Fields
Inputs use a clean 1px border. On focus, the border transitions to Primary Blue with a subtle 3px outer glow (ring) for accessibility. Placeholders should be in a light gray to remain unobtrusive.

### Progress Bars
Used for tracking course completion. They should use a light gray track and a Success Green fill.

### Chips/Tags
Small, low-contrast pills used for categorizing subjects (e.g., "Matematika", "Tarix"). Use a background tint of the primary color with 10% opacity for a modern, "soft" look.
