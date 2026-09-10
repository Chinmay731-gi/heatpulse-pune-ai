# ThermalPune AI Dashboard

## Goal
Build a polished, frontend-only single-page civic climate dashboard using realistic Pune mock data. The experience will prioritize the heat map, AI-assisted interpretation, and the intervention simulator while remaining clearly labeled as a prototype.

## What will be built
- A compact anchored sidebar and a dense top status header.
- Five animated KPI summaries with distinct micro-visualizations.
- A dominant stylized Pune heat-risk map with neighborhood geometry, roads, hotspot glows, layer controls, and a selected Kothrud detail panel.
- AI hotspot analysis with an animated risk gauge, factor bars, insight summary, intervention chips, and cooling-plan action.
- A premium cooling strategy section with estimated investment, benefits, impact ranges, and visible simulation disclaimers.
- Six live-looking sensor station tiles with simulated readings and pulsing status signals.
- Historical and seven-day forecast charts using Recharts.
- An interactive-looking what-if simulator whose intervention controls update the comparison results and whose Run Scenario action animates the outcome.
- A ranked priority table, citizen reports, and final city-impact strip.
- Desktop-first responsive behavior with a compact mobile navigation treatment.

## Visual system
- Use the supplied deep navy, electric orange, heat red, amber, leaf green, teal, sky blue, off-white, and white palette as semantic design tokens.
- Pair Inter body copy with a bold geometric display typeface.
- Use warm off-white page surfaces, crisp white data panels, thin technical borders, restrained shadows, and selective heat/cooling gradients.
- Use rounded panels selectively; larger sections remain open and editorial rather than becoming nested card grids.
- Add restrained number, gauge, chart, hotspot, and live-signal motion with reduced-motion support.

## Technical approach
- Implement the dashboard at `/` in React and TypeScript.
- Keep all data in a typed local mock-data module; no network requests, authentication, storage, AI calls, or backend services.
- Use Recharts for analytical charts and Lucide icons for controls and status cues.
- Build the map as a custom stylized Pune visualization rather than installing a tile service, avoiding external map requests while retaining realistic civic-map detail and interaction cues.
- Add route-specific title, description, Open Graph, and social metadata.
- Validate compilation and inspect the finished page at desktop and mobile widths, including interaction and overflow checks.
