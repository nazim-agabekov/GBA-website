# CLAUDE.md — Project Instructions

---

## General Behavior (All Tasks)

### Mindset
- Prioritize **truth and accuracy** over being agreeable. Challenge flawed assumptions, point out risks and gaps.
- Say "I'm uncertain because..." when unsure. Never guess or hallucinate.
- Be proactive: anticipate follow-up needs and flag issues before they become problems.
- Default to **concise, high-signal responses**. Use structure (headings, bullets, code blocks) for readability.
- No filler, no unnecessary politeness, no restating what the user said — just act.

### Planning Before Acting
- For any non-trivial task: produce a brief **plan** (steps, assumptions, edge cases, risks) before executing.
- For coding: plan architecture and consider edge cases first, then write clean, modular, testable code.
- For writing/analysis: be evidence-based and structured, then critically evaluate the output.
- Match scope to what was asked — do not add unrequested features, refactors, or improvements.

### Response Structure (complex tasks)
1. **Summary** — 1–2 sentence takeaway or plan
2. **Reasoning / Plan** — step-by-step where needed
3. **Deliverable** — clean output (code, text, design, etc.)
4. **Next Steps** — up to 3 proactive suggestions or clarifying questions (only if truly needed)

### Critical Thinking
- If a request has a flaw, a better path, or a hidden risk — say so up front before executing.
- Do not validate bad ideas just because the user seems committed to them.
- After delivering output, briefly note weaknesses or improvements if relevant.

---

## Frontend — Always Do First
- **Invoke the `frontend-design` skill** before writing any frontend code, every session, no exceptions.

## Reference Images
- If a reference image is provided: match layout, spacing, typography, and color exactly. Swap in placeholder content (images via `https://placehold.co/`, generic copy). Do not improve or add to the design.
- If no reference image: design from scratch with high craft (see guardrails below).
- Screenshot your output, compare against reference, fix mismatches, re-screenshot. Do at least 2 comparison rounds. Stop only when no visible differences remain or user says so.

## Local Server
- **Always serve on localhost** — never screenshot a `file:///` URL.
- Start the dev server: `node serve.mjs` (serves the project root at `http://localhost:3000`)
- `serve.mjs` lives in the project root. Start it in the background before taking any screenshots.
- If the server is already running, do not start a second instance.

## Screenshot Workflow
- ⚠️ **Note:** Puppeteer paths below may need updating for this machine (macOS). Verify before use.
- **Always screenshot from localhost:** `node screenshot.mjs http://localhost:3000`
- Screenshots are saved automatically to `./temporary screenshots/screenshot-N.png` (auto-incremented, never overwritten).
- Optional label suffix: `node screenshot.mjs http://localhost:3000 label` → saves as `screenshot-N-label.png`
- `screenshot.mjs` lives in the project root. Use it as-is.
- After screenshotting, read the PNG from `temporary screenshots/` with the Read tool — Claude can see and analyze the image directly.
- When comparing, be specific: "heading is 32px but reference shows ~24px", "card gap is 16px but should be 24px"
- Check: spacing/padding, font size/weight/line-height, colors (exact hex), alignment, border-radius, shadows, image sizing

## Output Defaults
- Single `index.html` file, all styles inline, unless user says otherwise
- Tailwind CSS via CDN: `<script src="https://cdn.tailwindcss.com"></script>`
- Placeholder images: `https://placehold.co/WIDTHxHEIGHT`
- Mobile-first responsive

## Brand Assets
- Always check the `brand_assets/` folder before designing. It may contain logos, color guides, style guides, or images.
- If assets exist there, use them. Do not use placeholders where real assets are available.
- If a logo is present, use it. If a color palette is defined, use those exact values — do not invent brand colors.

## Anti-Generic Guardrails
- **Colors:** Never use default Tailwind palette (indigo-500, blue-600, etc.). Pick a custom brand color and derive from it.
- **Shadows:** Never use flat `shadow-md`. Use layered, color-tinted shadows with low opacity.
- **Typography:** Never use the same font for headings and body. Pair a display/serif with a clean sans. Apply tight tracking (`-0.03em`) on large headings, generous line-height (`1.7`) on body.
- **Gradients:** Layer multiple radial gradients. Add grain/texture via SVG noise filter for depth.
- **Animations:** Only animate `transform` and `opacity`. Never `transition-all`. Use spring-style easing.
- **Interactive states:** Every clickable element needs hover, focus-visible, and active states. No exceptions.
- **Images:** Add a gradient overlay (`bg-gradient-to-t from-black/60`) and a color treatment layer with `mix-blend-multiply`.
- **Spacing:** Use intentional, consistent spacing tokens — not random Tailwind steps.
- **Depth:** Surfaces should have a layering system (base → elevated → floating), not all sit at the same z-plane.

## Hard Rules
- Do not add sections, features, or content not in the reference
- Do not "improve" a reference design — match it
- Do not stop after one screenshot pass
- Do not use `transition-all`
- Do not use default Tailwind blue/indigo as primary color
