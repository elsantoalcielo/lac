---
name: propose-commit
description: Propose a brief commit message that groups all currently uncommitted files. Use when the owner asks for a commit message, a combined commit message or "what do I commit". It only proposes; it never commits.
---

# Propose a commit message for the uncommitted files

The project owner makes every commit (`.ai/rules/workflow.md` §2 and the git permissions table in §5.6). This skill only reads and proposes. Never run `git add`, `git commit` or `git push`.

## Steps

1. Run `git status --short` (read-only git commands are allowed). If the tree is clean, say so and stop.
2. Group the files by concern, so the proposal can say what each group is for: application code, tests, documentation or ADRs, dependencies and lockfile, and the working log (`.ai/log/`).
3. Check the list for files that must never be committed: `.env` files other than `.env.example`, the stakeholders' data files (see `workflow.md` §12) and anything with credentials. If one appears, say so before proposing anything.
4. Pick the type and scope by the dominant change: `feat`, `fix`, `refactor`, `test`, `docs`, `chore`, `build` or `ci`; the scope is the package or area (for example `api`, `web`, `adr`).
5. If the project uses an issue tracker, find the closest issue id, in this conversation or with the tracker's tools, and put it at the end of the subject, for example `(<KEY>-7)`. Always suggest one, even when the match is weak or none exists: say which it is and that the owner decides whether to use it. The id is required for `feat`, `fix`, `refactor` and `test`, and optional for the other types.
6. Write the message:
   - Subject: `type(scope): imperative summary (<KEY>-n)`, in the technical language of the project, at most 72 characters in total, counting the type, scope and id.
   - A body of two to three short lines on what changed, wrapped at 72 characters.
7. The log goes in its own commit, never mixed with the others, with the message `Log Entry <n>: <what the turn did>` (or `Log Entries <n>-<m>: ...` for a range). It has no type and no issue id. Offer it as a separate message and say what the main message loses if the owner splits it.
8. Keep it brief: the main message in a code block, the optional log message in a second code block, and one line naming the closest issue and how strong the match is. Mention files that are already committed only if the owner might expect them in the list.

## Do not

- Do not commit, stage, amend or push.
- Do not invent an issue id; check it.
- Do not write the log entry for this turn unless a file was changed (a proposal alone changes nothing).
