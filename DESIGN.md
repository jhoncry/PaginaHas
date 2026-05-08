# Design System Document: The Neon Pulse

## 1. Overview & Creative North Star

### Creative North Star: "The Sonic Nocturne"
This design system is engineered to feel like a high-end digital lounge—dark, immersive, and vibrating with energy. We are moving away from the "corporate dark mode" and toward a **High-End Editorial** experience that captures the kinetic energy of a modern radio station.

The system breaks standard template rigidness through **Intentional Asymmetry** and **Tonal Depth**. Navigation isn't just a bar; it’s a high-contrast anchor. Content isn't just in a grid; it floats in a curated space defined by light and shadow rather than lines. We lean into the bold, neon-accented aesthetics of futuristic interfaces while maintaining the professional clarity of luxury typography.

---

## 2. Colors

The palette is a sophisticated blend of deep obsidians and nocturnal purples, punctuated by high-frequency neon pinks and cyans.

### Color Tokens (Material Design Convention)
*   **Background:** `#0e0e0e` (The Deep Base)
*   **Primary (Neon Pink):** `#ff80e4` | **Container:** `#ff61e3`
*   **Secondary (Electric Blue):** `#00eefc` | **Container:** `#006970`
*   **Tertiary (Vivid Purple):** `#d674ff` | **Container:** `#be0dff`
*   **Surface Tiers:**
    *   `surface-container-low`: `#131313`
    *   `surface-container`: `#1a1919`
    *   `surface-container-high`: `#201f1f`

### The "No-Line" Rule
**Explicit Instruction:** Use of 1px solid borders for sectioning is strictly prohibited. Boundaries must be defined solely through background color shifts or tonal transitions. Use `surface-container-low` for secondary sections and `surface` for the main body.

### The "Glass & Gradient" Rule
To achieve a premium feel, floating elements (like the music player) must use **Glassmorphism**. Combine `surface-variant` at 60% opacity with a `backdrop-blur` of 20px. For main CTAs, use a subtle linear gradient transitioning from `primary` to `primary-container` at a 135-degree angle to provide a "pulsing" visual depth.

---

## 3. Typography

The typography strategy pairs technical precision with editorial flair.

*   **Display & Headline (Plus Jakarta Sans):** This is our "Voice." It is professional, clean, and carries an architectural weight. Use `display-lg` (3.5rem) for hero statements to create an immediate impact.
*   **Body & Titles (Inter):** Our "Information." Inter provides maximum readability against dark backgrounds. Its neutral character allows the vibrant neon accents to shine without competition.
*   **Labels (Space Grotesk):** Our "Technical Edge." Used for metadata, timestamps, and player controls. The monospaced lean of Space Grotesk feels like a digital readout, reinforcing the radio/tech vibe.

---

## 4. Elevation & Depth

We eschew traditional drop shadows for **Tonal Layering**.

*   **The Layering Principle:** Depth is achieved by stacking surface-container tiers. A `surface-container-highest` card should sit atop a `surface-container-low` background. This creates a "soft lift" that feels integrated into the environment.
*   **Ambient Shadows:** For floating headers or players, use an extra-diffused shadow: `box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4)`. The shadow must never be pure grey; it should feel like an absence of light in the deep purple/black space.
*   **The Ghost Border Fallback:** If a boundary is required for accessibility, use the `outline-variant` token at 15% opacity. It should be felt, not seen.
*   **Light Bleed:** Occasionally, use a very large, low-opacity (5%) radial gradient of `primary` or `secondary` in the background corners to mimic the glow of a neon sign off-screen.

---

## 5. Components

### Music Player Controls (Signature Component)
The player is the heart of the experience. It must feel like a sleek, integrated dashboard.
*   **Container:** `surface-container-highest` with a 20px backdrop blur.
*   **Progress Bar:** Use `secondary` (Cyan) for the active track and `outline-variant` (at 20%) for the rail.
*   **Icons:** High-contrast `on-surface` (White). The "Play" button should be a `primary` (Pink) circle.

### Buttons
*   **Primary:** Bold neon (`primary`). No border. `label-md` uppercase text. Roundedness: `full`.
*   **Secondary:** `surface-bright` with a `secondary` (Cyan) "Ghost Border."
*   **Tertiary:** Transparent background, `on-surface` text with a `primary` glow on hover.

### Cards & Lists
*   **The Divider Rule:** Strictly forbid the use of horizontal divider lines. Separate list items (e.g., tracklists) using a `8px` vertical gap and a subtle background shift to `surface-container` on hover.
*   **Visual Interest:** Images within cards should have a subtle `primary` tint overlay that disappears on hover to "wake up" the content.

### Inputs & Fields
*   **State:** Understated `surface-container-highest` backgrounds.
*   **Focus:** A 2px glow of `secondary` (Cyan) rather than a hard border.

---

## 6. Do's and Don'ts

### Do:
*   **Do** embrace negative space. Large typography needs room to breathe to feel "Editorial."
*   **Do** use asymmetrical layouts. Place a large `display-md` heading on the left and a smaller content block offset to the right.
*   **Do** use `primary` (Neon Pink) sparingly as a "laser pointer" to guide the user's eye to the most important action.

### Don't:
*   **Don't** use 100% white for body text. Use `on-surface-variant` (#adaaaa) for long-form content to reduce eye strain on the dark background.
*   **Don't** use sharp corners. Stick to the `md` (0.75rem) and `lg` (1rem) roundedness scale to keep the tech feeling "approachable."
*   **Don't** use standard "Drop Shadows." If it looks like a 2010 web element, it’s too heavy. Stick to Tonal Layering.