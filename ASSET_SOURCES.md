# Content and asset sources

## Paper metadata and results

Source: `6ad098eb0f455bafd64b6076/`, selected by the project owner on 2026-10-19.
The manuscript source is unchanged.

| Content | Source |
| --- | --- |
| Title, 14 authors, five affiliations, contribution marks | `main.tex`, author block |
| Three capabilities and human-anchored full-process supervision | `section/0_abstract.tex`, `section/3_method.tex` |
| Detection, Plan/Finding, and ablation tables | `section/5_experiment.tex` |
| Semantic matching and metric interpretation | `section/appendix.tex`, evaluation protocol |

All 270 numerical table cells and their original ranking markers are transcribed
from the manuscript. The page labels these as paper-reported results; this
website change does not rerun or establish benchmark performance.

Experiment source SHA-256:
`59a83d462485ef05878ea92f4596e44ce5fa306927d6e9b90a05d4f611c844c7`.

Wenjing Yang has no affiliation marker in the source; no affiliation is inferred.

## Current benchmark release

The project owner selected the current Hugging Face release as the source of
public dataset statistics. Read-only counting of the actual `ground_truth.jsonl`
on 2026-10-19 verified:

- 192 records: 96 real and 96 generated.
- 320 findings; 17 unique `artifact_tag` values.
- All category counts sum to 320.

Source: <https://huggingface.co/datasets/Verus-Team/Verus-Bench/blob/main/ground_truth.jsonl>
at commit `35dc3e8e7e8f2b14a808dab1f1a7a453906586bc`.
Counts and provenance are retained in `data/benchmark-statistics.json` and copied
into `data/site-content.json` for rendering. Category counts are displayed as an
accessible table, ordered by count. No annotations or category names are invented.

The dataset card documents media for 166/192 samples and acquisition references
for the remaining 26. Full-benchmark and available-media runs remain distinct.

## Figures and branding

`assets/figures/verus_data_training.pdf` is byte-identical to
`6ad098eb0f455bafd64b6076/figures/verus_data_training.pdf`. Its adjacent PNG is
the existing rendering of that PDF. No scientific content is redrawn.

The header/footer use text and the existing original V favicon. The repository
banner is an original SVG using the same warm white, dark green, and copper
palette. No AI-generated scientific images or qualitative findings are used.

Unconfigured videos are not displayed. Original third-party media licenses and
attribution remain with their source materials.

## Resources and hosting

Code: <https://github.com/Verus-Team/Verus-Insight>.
Model and dataset URLs are supplied by the project owner. Model and dataset
licenses remain non-commercial research/evaluation terms; the inference code
retains its Apache-2.0 license. No license is reassigned by this website.

The resource buttons link to release pages without asserting anonymous access.
No real arXiv identifier was supplied; the Paper button stays pending.
Website repository: `Verus-Team/Verus-Insight-Preview`.

The initial layout reference was
<https://bxhsort.github.io/Thinking-Reward-Model/>. Verus text, layout code, and
research assets are independently maintained.
