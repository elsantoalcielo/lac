# AGENTS.md

This `.ai/` directory is the project's working memory for AI-assisted development. Read from it whenever the current task needs that context; don't proceed on assumptions or guesses about prior decisions when an answer already lives there.

The instructions in this directory and in `.docs/` are written for agents. The project owner may deviate from them at their own responsibility; that does not change what agents must follow.

- **`.ai/rules/workflow.md`** — the project-specific directives: language, sources of truth, workflow, git permissions, sensitive data and the term mapping. Read this before making any changes. When it and `best-practices.md` cover the same topic, `workflow.md` wins. Coding conventions live in `.ai/rules/coding.md`. It is very important to follow these directives, so this file has to be fully read when first meeting with these files.
- **`.ai/rules/logging_instructions.md`** — how to write and maintain the per-turn working log (entry template, numbering and time, trivial-turn rule, grep-only reading, size-based archiving into per-range files, commit rules). Read it before logging your first turn.
- **`.ai/log/`** — the working log (`LOG_DIR`): `log.ai.md` is the live log, `log_template.ai.md` is the entry template, and closed archives are named `log_archive_<first>-<last>.ai.md`. Never read it wholesale; search it with grep (see `logging_instructions.md` §5).
- **`.ai/rules/best-practices.md`** — general behavioral best practices for any agent working here (planning, scope discipline, verification, security, destructive-action confirmation, handling uncertainty, reporting format). Read it fully on first contact, together with `workflow.md`, and apply it to every task.
- **`.ai/context-map.md`** — index of where project knowledge lives (`.docs/` and external systems).
- **`.ai/lessons-learned.md`** — mistakes the owner corrected twice, and the right behavior.
- **`.ai/prompts/`** — a directory where the project owner stores frequently used prompts. Agents do not need to read it.

## Reading order

1. `.ai/rules/workflow.md` (full read)
2. `.ai/rules/best-practices.md` (full read)
3. `.ai/rules/logging_instructions.md` (before logging your first turn)
4. Anything else under `.ai/` or `.docs/` that the current task needs, loaded on demand and referenced by explicit path (search tools often skip dot-directories, so don't rely on discovery). Do not read `.ai/prompts/`.

## Precedence

When instructions conflict, follow this order (highest first):

1. The user's explicit instruction in the current conversation
2. A nested `AGENTS.md` in the package being edited (none exist by default; this level applies only if the repo has packages with their own instructions)
3. `.ai/rules/workflow.md` (project-specific directives)
4. `.ai/rules/logging_instructions.md`
5. `.ai/rules/best-practices.md` (general practices; it fills the gaps and sets the defaults)
6. General conventions and your own defaults

The root `AGENTS.md` only imports this file, so it is not a separate level.

Project-specific directives always override the general best practices. Where `workflow.md` is silent, apply `best-practices.md`. **Hard rules** are every rule worded with "NEVER" or "never" in `best-practices.md` and `workflow.md`, and every item of `workflow.md` §14 ("What not to do"). If a user instruction would break a hard rule, stop and ask before proceeding.

## How to apply the best practices on every task

- **Before starting:** read the relevant context first and check for prior decisions. Don't guess what is already documented.
- **Non-trivial changes:** state a short plan and get confirmation before editing.
- **While working:** stay in scope, match existing patterns, and report unrelated issues instead of fixing them.
- **Before declaring done:** run the project's build, lint, and relevant tests, and say plainly what was and wasn't verified. Never imply a check passed that you didn't run.
- **Destructive or irreversible actions:** ask for explicit confirmation, unless `workflow.md` explicitly grants the permission (for example git/push permissions).
- **Uncertainty:** say so. Don't invent APIs, paths, or behavior; check the code or docs.
- **Reporting:** end with what changed, how it was verified, what was not done, assumptions made, and out-of-scope issues noticed.
- **Logging:** write the per-turn log entry as specified in `logging_instructions.md`.

## Keeping this directory healthy

- Don't duplicate content between files. Link to the canonical source instead.
- If a rule is outdated or contradicts the code, flag it to the user rather than silently ignoring it.
- Don't edit the files in `.ai/` unless the user asks, or the change is an update the user has approved. When corrected twice for the same kind of mistake, propose an entry in the appropriate file instead of adding it unilaterally.
