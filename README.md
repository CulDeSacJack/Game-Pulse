# PulseCast

PulseCast is a curated gaming news dashboard built with Next.js. It pulls together major gaming headlines, deal coverage, and Bluesky chatter into a single fast-moving feed with filtering, saving, muting, and feed health built in.

## What It Does

- Aggregates headlines from 12 gaming news RSS sources.
- Tracks posts from 57 Bluesky accounts across press, platform, dev, and deal channels.
- Filters out off-topic content with tunable gaming relevance rules.
- Highlights top stories, trending topics, and live deals.
- Lets you save stories, mute noisy sources/accounts, and tune filters in a settings drawer.
- Surfaces feed failures instead of silently hiding them.

## Stack

- Next.js 16.2.1
- React 19
- Plain CSS in `src/app/globals.css`
- Playwright for browser smoke tests
- ESLint with `eslint-config-next`

## Getting Started

Requirements:

- Node.js 22+ recommended
- npm

Install dependencies:

```bash
npm install
```

Start the app locally:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Scripts

- `npm run dev` starts the local dev server.
- `npm run build` creates a production build.
- `npm run start` runs the production build locally.
- `npm run lint` runs ESLint.
- `npm run test:e2e` runs the Playwright smoke suite against the production build.
- `npm run test:e2e:headed` runs the same smoke suite with a visible browser.
- `npm run test:e2e:ui` opens the Playwright UI runner.

## Testing

PulseCast includes a lightweight Playwright smoke suite in [`tests/e2e/pulsecast.spec.mjs`](tests/e2e/pulsecast.spec.mjs).

Those tests intentionally mock the RSS and Bluesky requests so they stay deterministic and do not fail because of third-party feed outages. The mocked payloads live in [`tests/e2e/helpers/mockFeeds.mjs`](tests/e2e/helpers/mockFeeds.mjs).

Run the main checks locally:

```bash
npm run lint
npm run test:e2e
```

## Project Structure

- [`src/app/page.js`](src/app/page.js) contains the main client-side dashboard shell and state wiring.
- [`src/app/lib/feed-utils.js`](src/app/lib/feed-utils.js) contains source lists, relevance filtering, parsing helpers, and feed utilities.
- [`src/app/components`](src/app/components) contains the UI building blocks for cards, status bars, settings, and empty/loading states.
- [`src/app/hooks`](src/app/hooks) contains the small reusable hooks for persisted state and the app clock.

## Continuous Integration

GitHub Actions runs two checks on pushes and pull requests:

- `lint`
- `e2e` smoke tests

The workflow lives at [`.github/workflows/ci.yml`](.github/workflows/ci.yml).

## Notes

- Production data depends on external RSS feeds and Bluesky availability, so live content can occasionally be incomplete even when the app itself is healthy.
- The smoke tests do not hit live feeds; they verify the browser flows with mocked data.
