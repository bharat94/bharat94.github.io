---
name: interview
description: Conducts a structured AI interview with Bharat and publishes it to the site's Interviews section. Use whenever the user says "interview me", "interview me on <topic>", "interview me about <topic>", "start an interview", "new interview", or asks to add an interview/journal entry to the site's interviews page.
---

Read `INTERVIEWS.md` at the repo root and follow it exactly. It defines the
three phases:

1. **Conduct** — one question at a time, follow the thread, push for concrete
   stories, 6–10 questions with a rapid-fire round.
2. **Edit** — preserve his voice, cut weak exchanges, pick one verbatim pull
   quote, and get his **explicit sign-off on the full draft** before touching
   any file.
3. **Publish** — copy `interviews/_template.html`, fill every `{{TOKEN}}`,
   prepend the entry to `interviews/interviews.json`, verify locally in a
   browser, then commit (`interview: <title>`) and push.

Hard rules: his words only — never fabricate or embellish; no publish without
sign-off; one interview per sitting.
