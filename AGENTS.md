# AGENTS.md — react-api-app

## Dev commands

```bash
npm run dev      # Vite dev server at http://localhost:5173
npm run build    # production build
npm run preview  # preview production build
npm test         # vitest --environment jsdom
```

## Architecture

```
src/
  api/
    client.js       — axios instance; baseURL from import.meta.env.VITE_API_BASE_URL
    animeService.js — one async function per API endpoint
  hooks/useFetch.js — generic loading/error/data/refetch hook
  utils/normalize.js — extractAnimeList() + normalizeAnimeItem() to unify response shapes
  components/       — one file per UI unit, no router (tab state + selectedId in App.jsx)
  main.jsx          — entrypoint
```

## Key conventions

- **Search uses path param, not query**: `GET /anime/search/:keyword` — callers must `encodeURIComponent(keyword)` before passing to `searchAnime()`.
- **Response normalization**: always pass raw API response through `extractAnimeList(data).map(normalizeAnimeItem)` before using in UI.
- **All endpoints under `/anime/...`**: no `/otakudesu/` prefix anywhere.
- **`useFetch(fetchFn, deps)`**: call refetch for retry. Used in pages; not used in SearchPage (which does manual state).
- No router library — tab-based navigation via `useState` in `App.jsx`. `selectedId` drives detail view.
- `.env` is gitignored; copy `.env.example` to `.env` and adjust `VITE_API_BASE_URL`.

## Testing

- Vitest + jsdom + `@testing-library/react` + `@testing-library/user-event`.
- Mock `../api/client` (axios instance) for service tests, or `../api/animeService` for component tests.
- Tests in `src/__tests__/`.

## Known gotchas

- API is a third-party scraper; response shapes vary — the normalize layer exists to handle this. Adjust normalizers when endpoint field names differ.
- `instruction.md` and `prd.md` contain detailed endpoint mapping and feature roadmap — consult when adding/repairing API calls.
- **`/anime/home` returns a single anime detail** at `data.*` (title, poster, synopsis, genreList, episodeList, recommendedAnimeList), **not** an ongoing/completed list. The `recommendedAnimeList` sub-array at `data.recommendedAnimeList` is the usable list from this endpoint.
- **`/anime/ongoing-anime` and `/anime/complete-anime`** return lists wrapped as `{ data: { ongoing: { animeList: [...] }, completed: { animeList: [...] } } }` — extract via `extractAnimeList()`.
- **Search** (`/anime/search/:keyword`) returns a flat array or `{ data: [...] }` — both handled by `extractAnimeList()`. Verify actual response shapes via Network tab when adapting normalizers.
