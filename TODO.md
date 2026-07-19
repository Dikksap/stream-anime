# TODO — Implementasi DESIGN.md (AniStream)

> **Status**: ✅ SELESAI — semua task sudah dijalankan.

---

## 1. Setup TailwindCSS ✅
- [x] Configure `vite.config.js` with `@tailwindcss/vite` plugin
- [x] Create `src/styles/index.css` with `@import "tailwindcss"` and custom theme tokens
- [x] Import new stylesheet in `main.jsx`

## 2. Update `index.html` ✅
- [x] Change title to "AniStream — Streaming Anime"
- [x] Add Inter font from Google Fonts (weights 400–800)
- [x] Add dark `bg-bg text-text-primary` classes to body

## 3. Create Layout Components ✅
- [x] `Container.jsx` — max-w-[1280px] centered wrapper, responsive padding
- [x] `Section.jsx` — reusable section wrapper with title/spacing
- [x] `Navbar.jsx` — sticky, blur on scroll, nav links, hamburger mobile
- [x] `Footer.jsx` — company info, privacy, terms, copyright

## 4. Create UI Components ✅
- [x] `PrimaryButton.jsx` — 4 variants, framer-motion hover/tap
- [x] `GlassCard.jsx` — glassmorphism with backdrop blur
- [x] `Skeleton.jsx` — animate-pulse placeholder
- [x] `Spinner.jsx` — animated SVG
- [x] `Badge.jsx` — trending, new, exclusive, genre
- [x] `Pagination.jsx` — prev/next with chevrons, disabled state
- [x] `EmptyState.jsx` — icon + title + desc + action
- [x] `Modal.jsx` — AnimatePresence, backdrop blur, body scroll lock

## 5. Create Anime Components ✅
- [x] `AnimeCard.jsx` — hover scale(1.05), glow shadow, image zoom, 16:9
- [x] `AnimeGrid.jsx` — responsive grid, skeleton loading, error/empty states
- [x] `AnimeRow.jsx` — horizontal scroll with chevron buttons
- [x] `EpisodeCard.jsx` — episode list item with play icon
- [x] `GenreCard.jsx` — hover background merah

## 6. Create Hero Components ✅
- [x] `HeroBanner.jsx` — 800px/500px, gradient overlay, title, desc, buttons, framer-motion fade-up

## 7. Create Input Components ✅
- [x] `SearchInput.jsx` — styled search with magnifying glass icon

## 8. Create Pages ✅
- [x] `HomePage.jsx` — Hero + Trending + New Releases + Popular Genres
- [x] `OngoingPage.jsx` — AnimeGrid + Pagination
- [x] `CompletePage.jsx` — AnimeGrid + Pagination
- [x] `SearchPage.jsx` — SearchInput + AnimeGrid + EmptyState
- [x] `GenrePage.jsx` — genre grid + anime per genre + pagination
- [x] `SchedulePage.jsx` — grouped by day
- [x] `AnimeDetailPage.jsx` — cover, info, synopsis, episodes, recommendations
- [x] `EpisodePlayerPage.jsx` — server list, iframe player

## 9. Setup React Router ✅
- [x] `src/routes/index.jsx` — lazy-loaded routes with Suspense
- [x] Routes: `/`, `/ongoing`, `/complete`, `/search`, `/genre`, `/genre/:slug`, `/schedule`, `/anime/:slug`, `/episode/:slug`

## 10. Update Main Entry ✅
- [x] `main.jsx` — BrowserRouter + QueryClientProvider
- [x] `App.jsx` — Navbar + Routes + Footer

## 11. Cleanup ✅
- [x] Remove `App.css`, `PostList.jsx`, old component files
- [x] Global dark theme, scrollbar styling

## 12. Verify ✅
- [x] `npm run build` — sukses, 0 error, 575 modules transformed
/