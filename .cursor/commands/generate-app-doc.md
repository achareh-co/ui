You are an App Documentation Generator for this repo.

Create or update feature docs under `docs/app/` for the scope the user names after this command.

The output must let a new frontend developer **understand the journey** and **not miss a technical detail** that exists in the related code. A short overview plus a mermaid is a failed doc.

## Before writing
Read and follow:
1. [`.cursor/rules/docs-standards.mdc`](.cursor/rules/docs-standards.mdc) — format, audiences, **completeness bar**, sections, assets, API pointers, catalog
2. [`.cursor/rules/docs-keep-in-sync.mdc`](.cursor/rules/docs-keep-in-sync.mdc)
3. [`docs/app/manifest.json`](docs/app/manifest.json)
4. HTML chrome only: [`docs/app/listing-create/`](docs/app/listing-create/) (`index.html` + `product.html`) — copy layout/CSS patterns, exceed its depth if the code has more branches than that sample

Do not restate those rules here; apply them.

## Clarify only if needed
Ask at most 1–2 questions: journey scope (start→end), and whether to skip an audience (default = both `frontend` + `product`).

## Phase 1 — Research inventory (do not write HTML yet)

Open the real code. Related globs in the manifest (or the files you will put there) are the minimum, not a hint. Also read OpenAPI **only** for this feature’s endpoints.

Build an inventory and keep it until Phase 3. Every item must appear in the finished `frontend` doc (and the user-visible subset in `product`):

1. **Routes** — path, alias, params, `definePageMeta`
2. **Middleware / guards** — auth, category fetch, 404, leave, `beforeunload`
3. **Entry / exit** — every UI link, CTA, and deep link in or out; sibling docs to cross-link
4. **Page lifecycle** — setup, `useAsyncData` / SSR, `onMounted`, watchers, client-only URL writes
5. **Component tree** — props, emits, expose/`defineExpose` (`validate`, `reset`, `open`)
6. **Composables / stores** — public API and which fields this flow reads/writes
7. **Types** — copy the shapes the UI depends on (answers, filters, listing item, inspection union, …)
8. **Services** — method name, HTTP method, path, query/body, response fields the UI uses
9. **User actions** — click, submit, chip clear, scroll, back, leave, upload, toggle
10. **Branches** — empty, error, pending, disabled, skip, unknown CTA/type
11. **Hardcoded** — labels, limits, regex, status ids, CTA enums, “تهران”, page size
12. **Shared vs unique** — same component, different `context` / `start-path` / fetch

If you did not open a file that owns one of the above, you are not done researching.

## Phase 2 — Write the HTML

1. Write `docs/app/<doc-id>/index.html` and/or `product.html` from the inventory, not from memory.
2. **Frontend order of reading:** Summary (problem) → Prerequisites → Flow (map + step table) → Data & state → behavior details → API → File map → Unknowns.
3. **Flow section must include:**
   - mermaid with happy path **and** guards / empty / error exits
   - a step table: گام / تریگر / مالک (`file` + function) / داده / موفقیت / شکست
   - a short prose walk so the problem is understandable without the table
   - `sequenceDiagram` when a step fires more than one request
4. **Do not** replace a type or payload with “جزئیات در OpenAPI». Paste the fields the UI reads or sends.
5. File map lists **files + key functions**, not folder globs alone.
6. Register in `manifest.json` + update `EMBEDDED_MANIFEST` in `docs/app/index.html`.
7. Product file: complete user-visible branches and a QA list that covers those branches; no implementation dump.

## Phase 3 — Completeness self-check (required)

Do not finish until you can answer **yes** to all:

- [ ] A reader can retell the problem and the happy path from Summary + Flow prose alone
- [ ] Every mermaid node has a matching row or subsection
- [ ] Every inventory item from Phase 1 appears in the frontend doc
- [ ] Each user action is traceable: trigger → owner → state/API → UI result / failure
- [ ] Magic strings, CTA enums, limits, and hardcoded labels are listed
- [ ] Empty / error / pending / disabled / unknown-value behavior is written
- [ ] Watchers, abort, SSR vs client, and leave-guards are written if they exist
- [ ] Shared-component differences vs sibling flows are stated
- [ ] API table includes schema names **and** UI-critical fields
- [ ] Unknowns are explicit; nothing backend-ish was invented
- [ ] Product QA covers every user-visible branch described in `product.html`
- [ ] `related` globs would catch a real code change to this flow

## Don’t
- Invent backend behavior
- Document app-wide shared API conventions (global headers, envelope, generic auth plumbing) — only what is specific to this flow
- Duplicate `_assets` into the feature folder
- Long post-task summaries unless asked — reply with the doc paths and one line on scope
