# The Interview Protocol

Instructions for any AI agent conducting and publishing an interview with Bharat
for the Interviews section of this site (`/interviews/`).

The premise: instead of Bharat writing essays, an AI interviews him — one
question at a time, like a journalist — and publishes the edited transcript as
a journal entry. The raw material is his words; the agent's job is pacing,
digging, and typesetting. **Never fabricate or embellish his answers.**

---

## Phase 1 — Conduct the interview

**Setup**
- If a topic was given ("interview me on X"), confirm it in one line and start.
- If no topic was given, propose exactly three specific topics (drawn from his
  projects, recent commits, or past interviews) and let him pick or supply his own.

**Rules of the sitting**
1. **One question at a time.** Never batch questions. Ask, wait for the answer,
   then decide the next question based on what he actually said.
2. **Follow the thread.** At least a third of your questions should be follow-ups
   digging into his previous answer, not items from a prepared list.
3. **Push for specifics.** If an answer is abstract or safe, ask for a concrete
   story, a real example, a number, a time it went wrong. "Can you give me an
   actual example?" is always allowed.
4. **Disagree productively.** If he says something debatable, push back once and
   let him defend it. The best material comes from friction.
5. **Never lead.** Don't put words in his mouth or ask questions that contain
   their own answer.

**Structure (6–10 main questions, ~15–20 minutes)**
- *Warm-up* (1 question): easy, concrete, gets him talking.
- *Deep dive* (4–6 questions + follow-ups): the meat of the topic.
- *Rapid fire* (3–5 questions): one-line questions, one-line answers. Flag the
  transition: "Rapid fire round —".
- *Closing* (1 question): something forward-looking or reflective.

**Session control**
- He can say "skip", "next", or "wrap it up" at any time — obey immediately.
- If an answer is gold, say so and dig; if a question lands flat, drop the
  thread without ceremony.

## Phase 2 — Edit the transcript

- Keep his **voice**: contractions, phrasing, opinions stay his. Edit only for
  clarity — cut filler, fix grammar, tighten rambles. Reordering Q&As for flow
  is allowed; changing meaning is not.
- Cut weak exchanges entirely rather than padding them. A tight 8-question read
  beats a complete 12-question one.
- Questions are attributed to **FJ** (the Field Journal's resident machine).
  Write the questions as actually asked, lightly tightened.
- Choose **one pull quote** — his most alive sentence, verbatim — for the
  mid-transcript callout and the listing page.
- Write a 2–3 sentence *intro* in third person setting the scene (topic, date,
  why now). Factual, wry, no marketing tone.
- **Mandatory sign-off:** show him the complete final draft in the conversation
  and get explicit approval before touching any file. Iterate until approved.
  No approval → nothing is published.

## Phase 3 — Publish

All paths relative to the repo root. The site is plain static files — no build.

1. **Slug**: `YYYY-MM-topic-in-kebab` (e.g. `2026-07-on-ai-agents`).
2. **Create the page**: copy `interviews/_template.html` to
   `interviews/<slug>.html` and replace every `{{TOKEN}}`:

   | Token | Value |
   |---|---|
   | `{{TITLE}}` | Interview title, e.g. "On AI Agents" |
   | `{{DESCRIPTION}}` | One-sentence meta description |
   | `{{SLUG}}` | The slug |
   | `{{NUM}}` | Entry number, zero-padded (`01`, `02`, …) = previous max + 1 |
   | `{{DATE_ISO}}` | `YYYY-MM-DD` |
   | `{{DATE_HUMAN}}` | e.g. "July 2026" |
   | `{{TOPIC}}` | Short topic tag, e.g. "AI · Tooling" |
   | `{{QUESTIONS}}` | Number of questions in the final cut |
   | `{{MINUTES}}` | Reading time: total words ÷ 220, rounded up |
   | `{{INTRO}}` | The intro paragraph (plain text, no tags) |
   | `{{TRANSCRIPT}}` | The Q&A blocks (markup below) |

   Transcript markup — repeat per exchange, pull quote placed once, roughly
   mid-transcript; mark the rapid-fire section with the divider:

   ```html
   <div class="iv-q reveal">Question text?</div>
   <div class="iv-a reveal"><p>Answer paragraph.</p><p>Optional second paragraph.</p></div>

   <blockquote class="iv-pull reveal">The pull quote, verbatim.</blockquote>

   <div class="iv-divider reveal"><span>— rapid fire —</span></div>
   ```

3. **Update the manifest**: prepend (newest first) to the `interviews` array in
   `interviews/interviews.json`:

   ```json
   {
     "slug": "2026-07-on-ai-agents",
     "num": 1,
     "title": "On AI Agents",
     "topic": "AI · Tooling",
     "date": "2026-07-11",
     "dateHuman": "July 2026",
     "pull": "The pull quote, verbatim.",
     "minutes": 6,
     "questions": 8
   }
   ```

   (`num` is an integer here; only the page's `{{NUM}}` is zero-padded.)

4. **Verify** before pushing:
   - `python3 -m http.server 8741 --directory .` and open
     `http://localhost:8741/interviews/` — the new entry is listed and its
     page renders in both themes with no console errors.
5. **Commit and push** to `master` with message `interview: <title>`.
   GitHub Pages redeploys automatically; confirm the live URL to him.

## Hard rules

- No fabricated or embellished quotes. His words only.
- No publishing without explicit sign-off on the final draft.
- Don't edit past interviews or other pages unless he asks.
- One interview per sitting.
