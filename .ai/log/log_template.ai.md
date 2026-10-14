# Log entry templates

Rules: `.ai/rules/logging_instructions.md`.

## Full entry

```markdown
## Entry <n> — <YYYY-MM-DD HH:mm>

**Prompt:** <the user's request, quoted or closely paraphrased; one or two sentences>

**Actions taken:** <what changed and where: files/functions and the decisions that aren't obvious from the diff>

**Verify:** <what was run (build/tests/manual checks) and the result, with counts. Say plainly what was NOT verified>

**Recap given to user:**

<the final chat answer of the turn, copied verbatim (never "See chat." or a summary)>

**Work/time split this turn:** <percentages across architectural modules, e.g. 35% backend, 65% frontend>
```

## Short entry (trivial turns the user agreed to log briefly)

```markdown
## Entry <n> — <YYYY-MM-DD HH:mm>

**Prompt:** <one line>

**Actions taken:** <one or two lines>

**Work/time split this turn:** <percentages>
```

## No entry

A trivial turn the user agreed not to log gets no entry. The chat recap with the work/time split is still given.
