# Instructions: keep a per-turn working log

You are an AI coding agent. In addition to doing the work you are asked to do, you maintain a **turn-by-turn log** of that work. The log is the project's durable memory: it records *why* things were done, how they were checked, and what was not checked. Source control shows what changed; the log shows the reasoning and the verification. Follow these instructions exactly.

---

## 1. Layout

Everything log-related lives in one directory, here called `LOG_DIR` (for example `.ai/log/`). Adjust the path to the project, then keep it fixed.

```
LOG_DIR/
  log.ai.md                      <- the live log: recent entries only, append-only
  log_template.ai.md             <- the entry template (section 4)
  log_archive_0001-0500.ai.md    <- closed archive of entries 1-500
  log_archive_0501-0620.ai.md    <- closed archive of the next range, and so on
```

Create `log.ai.md` with a short header and an entry-1 heading when the log does not exist yet. Create `log_template.ai.md` from section 4 of this document.

Write down the location of the log, the template and the archives in the project's agent-instructions file (for example `AGENTS.md`), so any future session finds them without searching.

## 2. When to write an entry

- Write one entry **at the end of every turn in which you changed something**: code, configuration, documents. Do it in the same turn, before you give your final answer.
- Do **not** write one for pure questions, explanations, investigations, or proposals that changed nothing. (If you changed nothing, there is nothing to log.)
- **Trivial turns** (wording or label changes, reordering, a one-line tweak with no behavioral or architectural effect): do not decide alone. At the end of the turn, ask the user which they want: a **full entry**, a **short entry**, or **no entry**. Do what they answer.
- A turn can contain several small requests from the user. Log it as one entry unless the user's requests are clearly independent features, in which case write one entry per request.

## 3. How to write an entry

1. **Number.** Find the last entry number with `grep "^## Entry" LOG_DIR/log.ai.md | tail -1` and add one. Numbers never reset and are never reused, including across archive files.
2. **Time.** Run `TZ=<TIMEZONE> date "+%Y-%m-%d %H:%M"` at the start of the turn and use that value (set `<TIMEZONE>` to the project's IANA zone, for example `Europe/Madrid`, and keep it fixed). Never estimate or invent the time. Use an IANA zone name rather than a fixed offset so daylight saving is handled automatically; do not convert by hand and do not use `date -u`.
3. **Append only.** Add the entry at the end of `log.ai.md` (for example with `cat >> LOG_DIR/log.ai.md <<'EOF' ... EOF`). Never rewrite or reorder old entries. If an old entry turns out to be wrong, say so in the new entry ("supersedes Entry N's claim that ...") instead of editing the old one. The only exception is when the user explicitly asks you to fix an old entry; then edit only what they asked for and record the fix in the current turn's entry.
4. **Use the template** (section 4). Do not read old entries to recover the format.
5. **Be honest and tight.**
   - *Actions taken:* what changed and where (files, functions), plus decisions that are not obvious from the diff and anything you deliberately did not do.
   - *Verify:* what you actually ran (build, tests, manual checks) and the result, with counts. State plainly what you did **not** verify (for example "not tried in a browser"). When you wrote a test for a fix, say whether you confirmed it fails without the fix.
   - Say what failed, too. Never write "verified" about something you did not run.
   - No transcripts, no pasted command output, no restating the diff line by line.
6. **Work/time split.** Every entry ends with a line giving the percentage of the turn's effort across the project's architectural modules (for example `35% backend, 65% frontend`, or `100% process/docs`). The same split is also given to the user in chat. The two must match.
7. **Chat recap.** Give the user a short recap in chat (what changed, how it was verified, the work/time split). The entry's "Recap given to user" field holds that recap **verbatim**: the exact text of your final chat answer for the turn, copied character for character. Do not summarize, paraphrase, shorten or reformat it, and never write `See chat.` or any other pointer in its place. To make this possible, write the final answer first, put that same text in the entry, and then send it unchanged in chat. If you change the answer after writing the entry, update the field so the two still match.
8. **Environment tag.** If the project has multiple environments and a rule that entries are tagged with the environment name when it is not the main one, append the tag to the heading (for example `## Entry 12 — 2026-10-06 06:45 [e2e]`).

## 4. The template (`log_template.ai.md`)

### Full entry

```markdown
## Entry <n> — <YYYY-MM-DD HH:mm>

**Prompt:** <the user's request, quoted or closely paraphrased; one or two sentences>

**Actions taken:** <what changed and where: files/functions and the decisions that aren't obvious from the diff>

**Verify:** <what was run (build/tests/manual checks) and the result, with counts. Say plainly what was NOT verified>

**Recap given to user:**

<the final chat answer of the turn, copied verbatim (never "See chat." or a summary)>

**Work/time split this turn:** <percentages across architectural modules, e.g. 35% backend, 65% frontend>
```

### Short entry (trivial turns the user agreed to log briefly)

```markdown
## Entry <n> — <YYYY-MM-DD HH:mm>

**Prompt:** <one line>

**Actions taken:** <one or two lines>

**Work/time split this turn:** <percentages>
```

### No entry

A trivial turn the user agreed not to log gets no entry and no commit of the log. The chat recap with the work/time split is still given.

## 5. Reading the log

- **Never read the log or the archives wholesale.** They are large, and reading them wastes the context window. Search them: `grep -n "keyword" LOG_DIR/log.ai.md` and `grep -rn "keyword" LOG_DIR/log_archive_*`, or grep for a specific entry heading (`grep -n "^## Entry 421" ...`), then read only that range with an offset and limit.
- Look in the live log first. If a past decision is not there, grep the archives.
- Use the log when you need context: why something was done a certain way, whether something was already tried, what a past decision was. Do not guess when the answer is in the log.

## 6. Archiving

- Keep the live log small. When `log.ai.md` grows past roughly **150 KB**, **ask the user** whether to archive.
- When the user agrees, move the **oldest** entries into a **new** file named for the range moved, for example `log_archive_0501-0620.ai.md` (4-digit numbers, `<first>-<last>`). Keep the recent entries in the live log. Never append to an existing archive file: archive files are closed once written.
- Move entries verbatim. Do not rewrite or summarize them. Afterward, check that nothing was lost: the number of `## Entry` headings in the live log plus the archives equals the number before the move.
- Update the header of `log.ai.md` and the agent-instructions file so they name the new archive file.
- Give the archive file a one-line header saying which entries it holds and that it is closed.
- Archive references inside old entries are historical text; do not rewrite them.

## 7. Source control for the log

If the log directory is in its own repository, or in a directory that is tracked:

- Commit **after every change to a log file** (a new entry, an archive, a template edit), with a short message such as `Log Entry 549: <what the turn did>`, and push if the project's rules say you may.
- Never mix log commits with the application repository's commits unless the project's rules say so.
- Follow the project's rules about which repository you may commit to. When the rule forbids you from committing to the main code repository, do not run any git command against it, not even read-only ones.
- A trivial turn with no entry produces no commit.

If the log is not under source control, keep a backup copy of `log.ai.md` before any edit that is not a simple append (an archive move, a header change).

## 8. Habits that keep the log trustworthy

- Write the entry **after** you have verified the work, not before, so "Verify" reflects what happened.
- If a later turn shows an earlier entry was wrong or incomplete, add a correction in the new entry and mention which entry it supersedes.
- If you notice you broke one of these rules (an estimated time, a missing split, a forgotten commit), say so to the user in the same turn and fix it going forward. Do not silently rewrite history.
- Keep entries short enough that the log stays searchable. A typical entry is a few hundred words at most.
- Do not store secrets, credentials or personal data in the log.

## 9. Per-turn checklist

1. Run `TZ=<TIMEZONE> date "+%Y-%m-%d %H:%M"`.
2. Do the work and verify it.
3. Decide whether the turn is trivial; if so, ask the user (full, short or none).
4. Write the final chat answer (the recap, including the work/time split).
5. Find the last entry number, add one, and append the entry from the template, with the answer from step 4 copied verbatim into "Recap given to user".
6. Commit (and push, if allowed) the log change.
7. Send the answer from step 4 in chat, unchanged.
8. If the live log is over about 150 KB, ask the user whether to archive.
