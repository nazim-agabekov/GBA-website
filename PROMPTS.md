# Power Prompt Templates

Ready-to-use templates for complex tasks. Copy, fill in the blanks, paste into chat.

---

## Universal Template (Any Task)

```
<task>
[Describe your goal clearly and specifically]
</task>

<constraints>
- Think step by step before acting
- Point out weaknesses, risks, or better alternatives
- Output in clear, structured format
- End with next steps or questions (max 3)
</constraints>

<context>
[Optional: paste relevant code, text, file contents, or prior decisions]
</context>
```

---

## Frontend Build

```
Build [component / page / full site] for [purpose/audience].

Design direction: [e.g., luxury minimal, brutalist editorial, soft organic, retro-futuristic]
Brand assets: check brand_assets/ folder first
Reference: [paste image path or describe layout]

Constraints:
- Single index.html, Tailwind CDN, mobile-first
- Follow all rules in CLAUDE.md
- Plan the aesthetic direction before writing any code
- Screenshot → compare → fix → re-screenshot (minimum 2 rounds)
```

---

## Debugging / Code Fix

```
<task>
Fix this bug: [describe the symptom]
</task>

<context>
[paste code, error message, or file path]
</context>

<constraints>
- Diagnose the root cause first, do not just patch the symptom
- If there's a better architectural fix, say so
- Only change what's necessary — no refactors or extras
- Explain the fix in one sentence
</constraints>
```

---

## Deep Analysis / Research

```
Research and analyze: [topic]

Structure your response as:
1. Executive Summary (3-5 bullets)
2. Key Findings (with reasoning)
3. Weaknesses / Gaps / Risks
4. Recommendation
5. Open questions (max 3)

Be critical. Challenge assumptions. Say what you're uncertain about.
```

---

## Writing / Editing

```
Rewrite/improve this text:
[paste text]

Goals: [e.g., more concise, more persuasive, more professional, match my tone]

Deliver:
1. Rewritten version
2. What changed and why (brief)
3. One suggestion I haven't considered
```

---

## Architecture / Planning

```
Plan the implementation for: [feature or system]

Before writing any code:
1. Outline the architecture (components, data flow, dependencies)
2. List assumptions and open questions
3. Flag edge cases and risks
4. Propose the simplest approach that works

Only after I approve the plan, proceed to implementation.
```

---

## Tips

- The more specific your `<task>`, the better the output. Vague in = vague out.
- Paste the actual file contents or error messages — don't describe them.
- If the first output isn't right, point to exactly what's wrong rather than saying "redo it."
- For frontend work, always include the design direction — it's the single biggest lever on output quality.
