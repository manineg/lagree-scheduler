# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

A single-file React component (`file.jsx`) that generates weekly Lagree Megaformer class schedules using the Claude API. No build system or package.json is present — this is a standalone JSX component meant to be dropped into a React project.

## Architecture

The entire app lives in `file.jsx` as a single default export (`LagreePlanner`). It has three views controlled by a `step` state:

1. **configure** — User selects fitness level, number of days (3–6), and per-category exercise counts (Legs/Arms/Obliques/Core, total must be 8–14)
2. **loading** — Shown while awaiting the Claude API response
3. **results** — Tabbed day-by-day view of the generated schedule with exercise metadata lookups

## Claude API Integration

The component calls the Anthropic API directly from the browser at `https://api.anthropic.com/v1/messages` using `claude-sonnet-4-20250514`. The `generate()` function (line 92) builds a structured prompt and parses the JSON response. **Note:** The fetch call is missing an `x-api-key` header — this must be added (or proxied) for the app to work.

The API is instructed to return a strict JSON schema:
```
{ weekSummary, classes: [{ day, theme, coachingNote, exercises: [{ category, name, side, duration, cue }] }] }
```

## Key Data Structures

- `LAGREE_EXERCISES` — hardcoded list of ~57 exercises with `{ name, category, muscles, level, position }`
- `CATEGORY_CONFIG` — display config (color, label, icon) for the 4 categories
- `LEVEL_DOT` / `POSITION_ICON` — visual indicator maps for exercise metadata
- `usageCount` — computed from the full schedule to badge exercises that repeat across days

## Styling

All styles are inline with hardcoded values. Fonts are loaded via Google Fonts (`Playfair Display`, `IBM Plex Mono`). Print support is handled via `@media print` hiding `.no-print` elements. The color palette centers on `#1c1c1c` (near-black), `#faf9f6` (warm white), and `#c4a96c` (gold accent).
