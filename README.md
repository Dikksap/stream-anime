# Anime App — React + Vite

Konsumsi API anime dari Sanka Vollerei (sumber: Otakudesu), dengan fitur:
- Daftar anime **ongoing** (dengan pagination)
- **Search** anime berdasarkan judul
- Halaman **detail** anime (sinopsis, genre, daftar episode)

## ⚠️ Penting soal endpoint

Dokumentasi resmi di `https://www.sankavollerei.com/anime/` memblokir bot/crawler,
jadi saya tidak bisa memverifikasi path endpoint secara pasti. Path yang dipakai
di `src/api/animeService.js` adalah **asumsi** berdasarkan pola umum:

```
GET /otakudesu/home
GET /otakudesu/jadwal
GET /otakudesu/ongoing?page=1
GET /otakudesu/search?q=...
GET /otakudesu/anime/:animeId
GET /otakudesu/episode/:episodeId
```

**Cara pastikan path yang benar:**
1. Buka `https://www.sankavollerei.com/anime/` di browser.
2. Klik tombol coba endpoint (mis. "Coba Ongoing API", "Cari One Piece").
3. Buka DevTools → tab Network, lihat URL request yang sebenarnya dipanggil.
4. Sesuaikan path di `src/api/animeService.js` kalau berbeda dari yang di atas.

Bentuk response JSON juga bisa bervariasi antar endpoint. Sudah saya siapkan
helper `src/utils/normalize.js` yang mencoba beberapa kemungkinan struktur
(`data.animeList`, `data`, array langsung, dst) supaya UI tidak mudah error —
tapi kalau field-nya beda jauh, sesuaikan juga fungsi `normalizeAnimeItem`.

## Cara menjalankan

```bash
npm install
cp .env.example .env   # cek/​sesuaikan VITE_API_BASE_URL
npm run dev
```

Buka `http://localhost:5173`.

## Struktur folder

```
src/
  api/
    client.js           # instance axios + interceptor
    animeService.js      # fungsi-fungsi pemanggil API anime
  hooks/
    useFetch.js           # hook generik loading/error/data
  utils/
    normalize.js          # penyeragaman bentuk response
  components/
    SearchBar.jsx
    AnimeCard.jsx
    AnimeGrid.jsx
    OngoingPage.jsx
    SearchPage.jsx
    AnimeDetail.jsx
  App.jsx                 # navigasi tab: Ongoing / Cari
  main.jsx
```

## Build untuk produksi

```bash
npm run build
npm run preview
```
