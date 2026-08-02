<div align="center">

# Frontend Craftsmanship

### Project 1 — Responsive Frontend Interface
**DecodeLabs Internship · Full-Stack Development Track**

`HTML5` · `CSS3` · `JavaScript (Vanilla)` · `No Frameworks`

</div>

---

## Table of Contents

- [Overview](#overview)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Design System](#design-system)
- [Accessibility](#accessibility)
- [Author](#author)

---

## Overview

This project is a responsive, accessible single-page interface built entirely with **HTML5, CSS3, and vanilla JavaScript** — no frameworks, no build tools, no external dependencies. It was developed as Project 1 of the DecodeLabs internship track, focused on the **interface phase**: translating a static wireframe into a fluid, semantic front end that adapts cleanly across screen sizes.

The goal was not just to make the layout "work," but to demonstrate deliberate engineering decisions — correct use of semantic landmarks, a defined responsive strategy (mobile-first, with two breakpoints), and lightweight, dependency-free interactivity.

## Getting Started

No installation or build step is required.

1. Download or clone the project files.
2. Keep `index.html`, `style.css`, and `script.js` in the same directory.
3. Open `index.html` in any modern browser.

```bash
# Optional: serve locally instead of opening the file directly
npx serve .
```

## Project Structure

```
.
├── index.html      # Semantic markup and page structure
├── style.css       # Design tokens, layout, and responsive breakpoints
├── script.js       # Navigation toggle and card-filtering logic
└── README.md
```

## Features

| Feature | Description |
|---|---|
| **Semantic HTML5** | `header`, `nav`, `main`, `article`, `footer` landmarks for accessibility and SEO |
| **Mobile-first responsive layout** | Single-column base layout, expanding via CSS Grid and Flexbox at `768px` and `1024px` breakpoints |
| **Fluid typography** | Headline and body text scale smoothly with `clamp()` across all viewport widths |
| **Interactive card filter** | Vanilla JS event delegation filters content by category — zero dependencies |
| **Responsive navigation** | Mobile menu toggles open/closed and dismisses on link click, outside click, or `Escape` |
| **Accessible by default** | Visible focus states, skip-to-content link, ARIA attributes, and `prefers-reduced-motion` support |

## Tech Stack

- **HTML5** — semantic structure and document outline
- **CSS3** — Grid for macro layout, Flexbox for micro components, custom properties for design tokens, `clamp()` for fluid type
- **JavaScript (ES6+)** — native DOM APIs and event delegation only

## Design System

Visual tokens are centralized as CSS custom properties in `style.css`, following a warm, grounded 2025-style palette:

| Token | Hex | Role |
|---|---|---|
| Mocha | `#A5785F` | Primary accent — stability |
| Ethereal Blue | `#A0D4E0` | Secondary accent — trust |
| Moonlit Grey | `#F2F0EA` | Background — refinement |
| Ink | `#2A2521` | Primary text |

Typography pairs **Montserrat** (display/headings) with **Open Sans** (body copy).

## Accessibility

This project treats accessibility as a baseline requirement rather than an enhancement:

- Visible keyboard focus outlines on all interactive elements
- A skip-to-content link for keyboard and screen-reader users
- `aria-expanded`, `aria-label`, and `aria-controls` on the navigation toggle
- `prefers-reduced-motion` respected globally
- Color contrast and touch-target sizing considered at every breakpoint

## Author

**Aresha Khalid**
Full-Stack Intern, DecodeLabs
📧 [areshakhalid072@gmail.com](mailto:areshakhalid072@gmail.com)