# workflow.md — <PROJECT NAME>

Instructions for AI agents (Claude Code or others) working in this repository.
Fill in every `<PLACEHOLDER>` before first use. Sections marked **[OPTIONAL]** apply only if the project has that element (external stakeholders, an issue tracker, a domain glossary...); delete them if not, and renumber or keep the numbers stable (other files reference these section numbers).

## Pending setup (delete each item when done, and this block when empty)

If a task depends on an unresolved item below, ask the team instead of assuming a value.

- [ ] Fill in the placeholders in this file.
- [ ] Code conventions, folder structure and preferred libraries, in `.docs/02-architecture/architecture.md` (§13).

---

## 1. Project context

<One paragraph: what is being built, for whom and why.>

- **Stakeholders / clients:** <who they are, how technical they are>.
- **Project owner:** has the final say on technical decisions, authorises exceptions (for example on real data) and approves the actions that need approval in this file.
- **Development team:** the developers and the AI agents (<casual names the team uses for the agents>; in records write "the development team" or "the team").
- **Way of working:** <e.g. a continuous cycle of Requirements → Coding → User testing → Feedback → Requirements…>

**[OPTIONAL]** Before proposing a data model or a calculation, read the **Glossary** (see §3 and §10). Domain terms have a specific meaning for the stakeholders; do not reinterpret them.

---

## 2. Language

Define the language of each context and do not mix them.

**<TECHNICAL_LANGUAGE> (everything technical), by default English:**

- Code: variable, function, class, table, column, endpoint and route names.
- Code comments and log messages.
- File and folder names (including those in `.docs/`).
- Commit messages, branch names, PR titles and descriptions, and review comments.
- Technical issues (title, description, acceptance criteria).
- Technical documentation in `.docs/` (architecture, technical decisions, formulas).

**<UI_LANGUAGE> (the application's user interface):**

- All text shown to end users is in <UI_LANGUAGE>.
- <State how UI text is managed: written directly in templates, or via a translation library/files. If a second language is ever needed, a new ADR decides how to introduce it.>
- Use the domain terms from the glossary (§10); do not invent your own.

**<STAKEHOLDER_LANGUAGE> (communication with the stakeholders):**

- Everything the stakeholders read (requirements, questions, feedback, business decisions, test guides) and any message addressed to them, with no technical jargon (see §7).

**[OPTIONAL]** Domain terms may be spoken in one language and named in another in the code. The mapping lives in the glossary (see §10). **Do not invent new translations**: if a term is not in the glossary, add it with a proposal and ask the team to validate it.

**Exception:** files in `.docs/` that mirror an external system (the glossary, the business decisions) or quote the stakeholders verbatim keep the language of their source. Everything else written for `.docs/` is in <TECHNICAL_LANGUAGE>.

**Commit convention:** [Conventional Commits](https://www.conventionalcommits.org), in <TECHNICAL_LANGUAGE>, with the issue identifier at the end of the subject line when the rules below require it. Format: `type(scope): imperative summary (<KEY>-42)`.

- Allowed types: `feat`, `fix`, `docs`, `refactor`, `test`, `chore`, `build`, `ci`.
- Subject in the imperative mood, lower case, no trailing full stop, at most 72 characters in total (§5.6).
- The issue id is required for `feat`, `fix`, `refactor` and `test` commits. It is optional for `docs`, `chore`, `build` and `ci` commits and for the initial commit; without an id the subject is just `type(scope): imperative summary`.
- Examples:
  - `feat(billing): calculate invoice total including discounts (<KEY>-42)`
  - `fix(units): correct grams to kilograms conversion (<KEY>-57)`
  - `docs(adr): add ADR 0001 on storing money as integers`
- The PR title follows the same format as a commit subject.

The issue prefix is `<KEY>`, the key of the tracker project `<TRACKER PROJECT NAME>`. If the project has no issue tracker, remove the id from the format and from §5.3.

---

## 3. Sources of truth

Each kind of information lives in exactly one place. Do not duplicate content between systems: link instead. The only exceptions are the mirrors listed in §11: they copy an external system on purpose, state when they were last synced, and lose to it if they disagree.

If an external system has localized names (database names, status values), give the English name here with the localized name in parentheses, and **match those values exactly** when reading or writing.

| What | Where | Who writes |
|---|---|---|
| Requirements, as the stakeholders understand them | <system and database for requirements> | <Stakeholders, team, agent> |
| Questions and answers | <...> | <Everyone> |
| Test feedback | <...> | <Stakeholders> |
| Agreed business decisions | <...> | <Team, agent> |
| Domain glossary | <...> | <Team, agent> |
| Technical translation of a requirement and acceptance criteria | <e.g. issue tracker> | <Team, agent> |
| Tasks, bugs, technical debt | <issue tracker> | <Team, agent> |
| Architecture, stack, data model, conventions | **Repository** → `.docs/` | Team, agent |
| Technical decisions (ADRs) | **Repository** → `.docs/02-architecture/adr/` | Team, agent |
| Branches, PRs and code status | <issue tracker> + repository | Team, agent |

Link to the stakeholder workspace: <URL>
Issue tracker identifier (issue prefix): `<KEY>`

> <If the stakeholders have no access to the tracker:> The stakeholders **have no access to <tracker>** and must not need to know it exists. Nothing they need to read or answer may live only there.

**Who wins when sources disagree:**

- Business matters (glossary, business decisions, requirements): <the external system> wins.
- Technical matters (architecture, ADRs, conventions): the **repository** wins.

---

## 4. Statuses

There are two separate status scales. Do not mix them or sync them automatically.

**Stakeholder-visible status (property of the requirements):**
`<Proposed → Confirmed → In development → In testing → Done>` (and `<Discarded>`). Use the exact values of the external system.

**Technical status (issue tracker):** whatever the team's internal workflow uses.

The stakeholder-visible status changes only at the milestones described in §5. Do not move it on every technical step.

---

## 5. Workflow

### 5.1 Before starting a work session

1. Read the requirements with status **<Confirmed>**, the questions **answered** since the last session, and any new test feedback.
2. Read the relevant decisions and glossary entries, and in the repository `.docs/02-architecture/architecture.md` and any ADRs affecting the change.
3. Summarise for the team what has changed before writing code.

### 5.2 From requirement to task

- For each **<Confirmed>** requirement that does not yet have a technical issue, create one or more issues in the tracker, **written in <TECHNICAL_LANGUAGE>**.
- In each issue's description include the **link to the requirement**, the technical translation of the requirement, and verifiable **acceptance criteria**.
- In the requirement, fill in the technical-issue property with the issue link.
- Do not create tasks for requirements with status *<Proposed>*: they are not yet agreed with the stakeholders.

### 5.3 While coding

- Work on requirements and tasks from an issue and reference it in commits and in the PR. Housekeeping (`docs`, `chore`, `build`, `ci`) may be done without an issue.
- **Branching model:** <e.g. GitHub Flow: short-lived branches from `main`, merged back through review.> <State whom the protection of `main` binds: agents only, or everybody.>
- **Branch name:** `<type>/<issue-id>-<short-description>`, lower case, words separated by hyphens. `<type>` is one of the commit types in §2 (`feat`, `fix`, `docs`, `refactor`, `test`, `chore`, `build`, `ci`). Example: `feat/<key>-42-invoice-total`. Without an issue: `<type>/<short-description>`.
- The issue id is required in the branch name and the commit subject for `feat`, `fix`, `refactor` and `test` work, and optional for `docs`, `chore`, `build`, `ci` and the initial commit.
- When you start the first piece of work on a requirement, change its status to **<In development>**.
- **If you lack domain information, do not guess.** Create a question (see §6).
- If you find that a requirement is contradictory, ambiguous or infeasible, open a question; do not resolve it on your own.
- If you make a significant technical decision, record it as an ADR (see §8).

### 5.4 When finishing a requirement

1. Check that the **definition of done** is met (§9).
2. When all the technical issues of the requirement are completed, change the requirement to **<In testing>**.
3. Add or update the iteration entry with the "what to test" guide (§7) and the link to the test environment.

### 5.5 After the stakeholders have tested

- Read the new test feedback. If it is a clear bug, create the issue and link it from the feedback. If it is a change in behaviour, treat it as a new or modified requirement and **confirm it with the stakeholders** before developing it.
- A requirement moves to **<Done>** only when the stakeholders accept it, not when the code is finished.

### 5.6 Git and permissions

Project-specific permissions for every agent. The general prohibitions in `best-practices.md` §7 (no force-push, no history rewriting, no secrets in commits, no direct commits to protected branches) also apply and are not repeated here. Commit message format: §2. Branch naming: §5.3.

The table below is the **restrictive default**. The owner relaxes it by editing the table.

| Action | Permission |
|---|---|
| Commit anything (code, docs, configuration, log files, `*.ai.md` files) | **Never**, for now. The project owner reviews all changes and makes every commit. |
| Read-only git commands (`status`, `log`, `diff`, `show`, `ls-files`, `branch --show-current`) | Allowed. |
| Push to any remote | **Never**, for now. |
| Commit directly to `main` or `release/*` | **Never** for agents (`best-practices.md` §7). The project owner may. |
| Anything else (stage files, create or delete a branch, merge, rebase, amend, tag) | Ask first. |

**What agents do instead of committing:**

- When a change is ready, say which files changed and propose a commit message in the format of §2. The owner commits.
- This overrides `logging_instructions.md` §7 and §9 (step 6), which tell the agent to commit log changes: until this rule is lifted, the agent writes the log entry but does not commit it, and says so.
- The clause in `logging_instructions.md` §7 that bans every git command, even read-only ones, when committing is forbidden was written for setups where the log lives in a separate repository. It does not apply here: read-only git commands are allowed (table above).
- The owner may lift or relax this rule later. When that happens, change the table above.

**Suspended: automatic log commits.** These apply only if the table above is relaxed to let agents commit `*.ai.md` files. They do **not** apply while it says "Never":

- They go in this repository, not a separate one.
- Only `*.ai.md` files are covered. Other files in `.ai/` (for example `AGENTS.md` or the files in `rules/`) are not named `*.ai.md`.
- A log commit is its own commit, never mixed with other changes. It may include the other `*.ai.md` files changed in the same turn.
- Message: `Log Entry <n>: <what the turn did>`, as in `logging_instructions.md`. Log commits are exempt from the Conventional Commits format and the issue id in §2.
- If the current branch is a protected one (`main`, `release/*`), do not commit. Tell the owner instead.

**Commit subject length:** at most **72 characters in total**, counting the type, the scope, the summary and the issue id. Lines in the commit body wrap at 72 characters too.

---

## 6. How to ask the stakeholders questions  **[OPTIONAL]**

Questions are created in <the questions channel>, in <STAKEHOLDER_LANGUAGE>. Each question must include:

- **Question:** a single, concrete one, answerable in a few lines.
- **Context:** why we are asking and which part of the application it affects, in plain language.
- **Options, if any:** propose alternatives with a worked example using fictitious numbers, never real data (§12).
- **Who should answer.**
- **Related requirement:** link.
- **Status:** open.

Rules:

- Group related questions. <State any limit on open questions, or that there is none.>
- If a technical issue is blocked by the question, link both and mark the issue as blocked.
- When a question is answered, record it as a **decision** if it affects product behaviour, and unblock the issue.
- Do not treat silence as an answer. An unanswered question stays open.

### Technical questions to the project owner

The rules above are for the stakeholders. Technical questions go to the project owner, in <TECHNICAL_LANGUAGE>, through the channel that fits the question:

| Question type | Channel |
|---|---|
| Decision-sized (stack, libraries, hosting, data model) | An **ADR draft** in `.docs/02-architecture/adr/` with status `proposed` and an "Open questions" section. The owner's answer turns it into the accepted ADR. |
| Quick or session-level | **Chat**, asked directly. If the answer is a decision, record it in an ADR or the relevant doc in the same turn: chat is not a record. |
| Tied to a task | **Issue comments**. |
| Needs a stakeholder's input | Rewrite it as a stakeholder question (above), in plain <STAKEHOLDER_LANGUAGE>. The stakeholders never see the technical version. |

Do not create a technical database or list in a space the stakeholders can see, nor a separate list of open questions. For the owner, send questions in small batches per ADR.

---

## 7. How to write for the stakeholders  **[OPTIONAL]**

Applies to any text the stakeholders will read (questions, test guides, iteration notices). Always in <STAKEHOLDER_LANGUAGE> (§2).

- Short sentences, no technical terms (no "endpoint", "refactor", "migration", "bug"; say "fault" or "error" in plain words).
- Use their vocabulary from the glossary.
- Talk about what **they see and do**, not about what was programmed.
- **"What to test" guide:** a numbered list of concrete actions, with the expected result and a closing question such as "Does the result look right to you?".
- Always include the link to the test environment and where to leave feedback.
- Friendly, respectful tone. Never blame the stakeholders (the people who use the app) for a system fault. This rule covers text the stakeholders read only; it does not apply to the project owner (see `best-practices.md` §10).

---

## 8. Technical requirements and architecture decisions

Distinguish three cases:

1. **Technical requirement that originates in a stakeholder need** (e.g. "it must work on a tablet", "I want to export to Excel", "sometimes there is no network"):
   - It lives in the stakeholder system as a normal requirement, in <STAKEHOLDER_LANGUAGE>.
   - Its technical translation and acceptance criteria go in the **issue**, in <TECHNICAL_LANGUAGE>.
   - If a technical requirement has no origin there, it has not been agreed with the stakeholders and must not change what they see.
2. **Architecture decision or constraint** (stack, data model, authentication, project structure, conventions):
   - It lives in the **repository**, in `.docs/`, in <TECHNICAL_LANGUAGE>.
   - Decisions are recorded as **ADRs** (Architecture Decision Records): one file per decision in `.docs/02-architecture/adr/`, with a numbered name, e.g. `0001-store-money-as-integers.md`. Use `.docs/02-architecture/adr/template.md`.
   - Each ADR includes: context, decision, alternatives considered, and consequences. Once accepted it is not edited: it is superseded by a new ADR that references it.
   - They are reviewed in the PR, like code.
3. **Tasks, bugs and technical debt:** live in the **issue tracker**, in <TECHNICAL_LANGUAGE>, linked to the requirement when they originate from one.

A change that contradicts a current ADR needs a new ADR superseding it, approved by the project owner, before it is implemented.

---

## 9. Definition of done

A technical issue is done when:

- [ ] The behaviour matches the requirement, its acceptance criteria and related decisions.
- [ ] <Domain-critical logic (calculations, permissions, ...) has **automated tests** with verified cases.>
- [ ] Tests pass and the build succeeds (commands in §13); lint and format checks pass.
- [ ] The change is deployed to the test environment and works with realistic sample data.
- [ ] Affected documentation (`.docs/`) is up to date and, where relevant, an ADR exists.
- [ ] The PR references the issue and the requirement, when the work comes from them.
- [ ] Code, commits, file names and PR are in <TECHNICAL_LANGUAGE>, and UI text is in <UI_LANGUAGE> (§2).

---

## 10. Domain rules and glossary  **[OPTIONAL]**

<Describe the rules that are critical in this domain, for example:>

- <Never use binary floating-point numbers for money; define rounding and do not change it without a recorded decision.>
- <Every new formula comes with a worked numerical example in `.docs/02-architecture/formulas.md` and a test that reproduces it.>
- When in doubt about a business rule, ask the stakeholders (§6); do not choose on your own.

### Term mapping

| <Stakeholder term> | <UI term> | Identifier in code |
|---|---|---|
| <term> | <term> | `<snake_case_identifier>` |

The identifier column gives the canonical concept name, in snake_case. Each layer converts it to its own convention (for example database columns snake_case, variables and functions camelCase, classes PascalCase).

Keep this table in sync with `.docs/00-context/glossary.md`. Always use the same identifier for the same concept throughout the code.

---

## 11. Documentation in the repository

Structure of `.docs/` (this is the single docs root, shared with `best-practices.md`):

```
.docs/
├── 00-context/
│   ├── glossary.md              # domain terms and their identifiers (mirror of the external glossary, if any)
│   ├── business-decisions.md    # agreed business decisions (mirror of the external system, if any)
│   └── constraints.md           # compliance and platform constraints
├── 02-architecture/
│   ├── architecture.md          # stack, data model, project structure, conventions
│   ├── adr/                     # technical decisions, one per file
│   │   └── template.md
│   └── ui/README.md             # UI notes
├── 03-development/
│   └── patterns/README.md       # canonical code examples
└── 06-operations/
    └── security.md              # security requirements
```

Add files (for example `formulas.md`) as the project needs them.

- `architecture.md` and `adr/` are the **source of truth in the repository**. The team and agents edit them, and they are reviewed in PRs.
- **[OPTIONAL]** `glossary.md` and `business-decisions.md` are **mirrors of an external system**: if they disagree, the external system wins; update the mirror, not the other way round. State the date of the last sync in each file. If there is no external system, they are the source of truth.

---

## 12. Sensitive data

<Describe what is confidential in this project (customer data, prices, personal data, credentials...).>

- **Data files provided by the stakeholders are sensitive and must never be committed**, by anyone, to any branch. List the file types in `.gitignore` (for example `*.xlsx`, `*.csv`). A file of another type that holds the same kind of data (a PDF, a photo of a sheet) is covered by the same rule.
- <**Agents may read these files locally** to understand their structure, and must then work with fictitious samples: no real values or names in code, tests, docs, trackers or chat. If unsure whether something is real, ask the project owner.> Delete or adapt this line if agents may not read them at all.
- Real data must not go to external systems, public issues or the repository unless the project owner has explicitly authorised it.
- **Only the project owner** authorises exceptions, and manages and uploads real data into the application. Agents never load real data into any database or service.
- Use realistic but fictitious sample data for development and testing, unless explicitly told otherwise.
- Never include credentials, API keys or tokens in code, docs or trackers.

---

## 13. Environment and commands

Commands run from the repository root. <Runtime and package-manager versions and where they are pinned.> The reasons behind them are in `.docs/02-architecture/architecture.md`.

- Install dependencies: `<command>`
- Build: `<command>`
- Run locally: `<command>`
- Tests: `<command>`
- Linter and formatter: `<command>`
- CI: <where the workflow lives, what it runs, and what a failing run means: it is fixed or reported, never ignored.>
- Deploy to the test environment: <how, and who may trigger it. Agents deploy only when the project owner asks.>
- Test environment URL: <URL>

Code conventions, folder structure and preferred libraries: **[TO COMPLETE]** (record them in `.docs/02-architecture/architecture.md`).

---

## 14. What not to do

- Do not invent requirements or stakeholder answers. If it is not in the requirements system, it is not decided.
- Do not change user-visible behaviour without a confirmed requirement.
- Do not move a requirement to **<Done>** on your own.
- Do not duplicate information between the external systems, the tracker and the repository: link. The mirrors in §11 are the only exception.
- Do not mix languages: <TECHNICAL_LANGUAGE> in code, commits, PRs, file names and technical issues (the only exception is the <UI_LANGUAGE> UI text); do not write to the stakeholders in another language than <STAKEHOLDER_LANGUAGE>, nor with technical jargon.
- Do not delete or rewrite content the stakeholders have written; add comments or replies.
- Do not edit an accepted ADR: supersede it with a new one.
- Do not make destructive changes (mass deletions, history rewrites, irreversible migrations) without explicit confirmation from the project owner.
- Do not assume a bug is fixed without verifying it in the test environment.
- Never create an account of any type (cloud, hosting, database, identity provider, registry, SaaS, or any other service), even when a task seems to need one or a sign-up is free. Ask the project owner for the account and wait for them to create it.
