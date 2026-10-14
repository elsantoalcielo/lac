# Context map

Index of where project knowledge lives. Read the file you need by explicit path; do not load everything.

| Need | Where |
|---|---|
| How to work here (language, sources of truth, workflow, definition of done) | `.ai/rules/workflow.md` |
| General behavior rules for agents | `.ai/rules/best-practices.md` |
| Per-turn working log rules | `.ai/rules/logging_instructions.md` |
| Coding conventions | `.ai/rules/coding.md` |
| Mistakes the user corrected twice, and the right behavior | `.ai/lessons-learned.md` |
| Starting requirements and the stakeholders' original requests | `.docs/00-context/initial-requirements.md` (create if the project has one) |
| Current requirements, questions, decisions, feedback | <external tracker; link in `workflow.md` §3> |
| Domain terms and their identifiers | `.docs/00-context/glossary.md` |
| Agreed business decisions | `.docs/00-context/business-decisions.md` |
| Constraints (compliance, platform) | `.docs/00-context/constraints.md` |
| Stack, data model, project structure | `.docs/02-architecture/architecture.md` |
| Architecture decisions (ADRs) and their template | `.docs/02-architecture/adr/` |
| UI notes | `.docs/02-architecture/ui/README.md` |
| Git permissions, branches and commits | `.ai/rules/workflow.md` §5.6 (permissions), §5.3 (branches), §2 (commit format) |
| Canonical code examples | `.docs/03-development/patterns/README.md` |
| Security requirements | `.docs/06-operations/security.md` |

Notes:

- Stubs say what they are for and what is still undecided. Do not treat an empty stub as a decision.
- Add a row for every new place where project knowledge lives, and remove rows for files that no longer exist.
