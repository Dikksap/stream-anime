# Instruksi Perbaikan: Anime React App — Sesuaikan dengan Endpoint API Asli

## Konteks

Project React + Vite ini awalnya dibuat dengan ASUMSI path endpoint API
(`/otakudesu/home`, `/otakudesu/search?q=...`, dst) karena dokumentasi resmi
tidak bisa diakses saat itu. Sekarang path endpoint yang **benar dan resmi**
sudah didapat dari screenshot dokumentasi. Tugas kamu adalah memperbaiki
seluruh layer API (`src/api/`) dan komponen terkait supaya sesuai dengan
endpoint asli di bawah, tanpa merusak struktur project yang sudah ada
(`useFetch` hook, pola komponen, styling).

## 1. Base URL

Base URL API **tidak** menyertakan `/anime` di akhir. Semua path endpoint
sudah termasuk prefix `/anime/...`. Perbaiki `.env.example` dan `.env`:

```
VITE_API_BASE_URL=https://www.sankavollerei.web.id
```

Cek `src/api/client.js` — pastikan `baseURL` diambil dari
`import.meta.env.VITE_API_BASE_URL` tanpa tambahan path lain (jangan ada
hardcode `/otakudesu` atau `/anime` tambahan di file lain).

## 2. Daftar Endpoint Resmi (ganti seluruh isi `src/api/animeService.js`)

| Fungsi | Method | Path | Query/Param | Contoh |
|---|---|---|---|---|
| Halaman Home | GET | `/anime/home` | - | `/anime/home` |
| Jadwal Rilis | GET | `/anime/schedule` | - | `/anime/schedule` |
| Detail Lengkap Anime | GET | `/anime/anime/:slug` | - | `/anime/anime/enen-shouboutai-season-3-p2-sub-indo` |
| Anime Tamat (Complete) | GET | `/anime/complete-anime` | `?page=1` (opsional) | `/anime/complete-anime?page=1` |
| Anime Ongoing | GET | `/anime/ongoing-anime` | `?page=1` (opsional) | `/anime/ongoing-anime?page=1` |
| Semua Genre | GET | `/anime/genre` | - | `/anime/genre` |
| Anime per Genre | GET | `/anime/genre/:slug` | `?page=1` (opsional) | `/anime/genre/action?page=1` |
| Detail & Link Nonton Episode | GET | `/anime/episode/:slug` | - | `/anime/episode/mebsn-episode-1-sub-indo` |
| Pencarian Anime | GET | `/anime/search/:keyword` | - (keyword di path, BUKAN query) | `/anime/search/boruto` |
| Download Batch | GET | `/anime/batch/:slug` | - | `/anime/batch/jshk-s2-batch-sub-indo` |
| URL Stream Server | GET | `/anime/server/:serverId` | - | `/anime/server/187226-0-720p` |
| Semua Anime (unlimited) | GET | `/anime/unlimited` | - | `/anime/unlimited` |

### Perubahan penting dari versi sebelumnya

- **Search pakai path param, bukan query string.** Sebelumnya
  `searchAnime` memanggil `GET /otakudesu/search?q=...`. Ganti jadi
  `GET /anime/search/${encodeURIComponent(keyword)}`.
- Tidak ada lagi prefix `/otakudesu/`. Semua path langsung di bawah `/anime/`.
- `getOngoing` sekarang ke `/anime/ongoing-anime` (bukan `/anime/otakudesu/ongoing`).
- Ada endpoint baru yang belum diimplementasi di UI: `getJadwal` (sudah ada
  tapi path-nya salah, betulkan ke `/anime/schedule`), `getGenreList`,
  `getAnimeByGenre`, `getCompleteAnime`, `getBatchDownload`,
  `getStreamServer`, `getAllAnime` (unlimited).

## 3. Update `src/api/animeService.js`

Tulis ulang semua fungsi dengan path yang benar. Struktur fungsi yang
dibutuhkan minimal:

```js
getHome()                    // GET /anime/home
getJadwal()                  // GET /anime/schedule
getAnimeDetail(slug)         // GET /anime/anime/:slug
getCompleteAnime(page)       // GET /anime/complete-anime?page=
getOngoing(page)             // GET /anime/ongoing-anime?page=
getGenreList()                // GET /anime/genre
getAnimeByGenre(slug, page)  // GET /anime/genre/:slug?page=
getEpisode(slug)             // GET /anime/episode/:slug
searchAnime(keyword)         // GET /anime/search/:keyword  (path param!)
getBatchDownload(slug)       // GET /anime/batch/:slug
getStreamServer(serverId)    // GET /anime/server/:serverId
getAllAnime()                 // GET /anime/unlimited
```

Hapus konstanta `SOURCE = 'otakudesu'` yang sudah tidak relevan.

## 4. Update komponen yang terdampak

- **`SearchPage.jsx`**: ganti pemanggilan `searchAnime(query)` — pastikan
  keyword di-encode dengan benar untuk URL (spasi, karakter khusus) sebelum
  dikirim sebagai path segment.
- **`OngoingPage.jsx`**: sudah benar strukturnya, tinggal pastikan
  memanggil `getOngoing` yang path-nya sudah diperbaiki.
- **`AnimeDetail.jsx`**: setelah dapat detail anime, biasanya ada daftar
  episode dengan slug — pastikan klik episode bisa memanggil
  `getEpisode(slug)` (tambahkan handler `onSelectEpisode` kalau belum ada).

## 5. Fitur baru yang perlu ditambahkan (opsional tapi disarankan)

Karena endpoint-nya jauh lebih lengkap dari asumsi awal, tambahkan halaman
konsumsi berikut kalau memungkinkan (ikuti pola komponen yang sudah ada:
`useFetch` + `AnimeGrid` + `extractAnimeList`):

1. **Halaman Genre** — dropdown/list dari `getGenreList()`, klik genre
   menampilkan hasil `getAnimeByGenre(slug, page)` dengan pagination.
2. **Halaman Jadwal Rilis** (`getJadwal`) — tampilkan per hari.
3. **Halaman Complete Anime** (`getCompleteAnime`) — mirip `OngoingPage`
   tapi untuk anime tamat, bisa reuse komponen `AnimeGrid` +
   pagination yang sama.
4. **Halaman Episode / Player** — saat user klik episode di
   `AnimeDetail`, tampilkan halaman baru berisi info episode dari
   `getEpisode(slug)`, lalu render pilihan server. Saat user pilih server,
   panggil `getStreamServer(serverId)` untuk dapat URL embed/stream, lalu
   render di `<iframe>` atau `<video>`.
5. **Tombol Download Batch** — di halaman detail anime, kalau ada
   `batchSlug`, tampilkan tombol yang memanggil `getBatchDownload(slug)`
   dan menampilkan daftar link download per resolusi.

## 6. Cek bentuk response aktual

Response JSON dari tiap endpoint belum diverifikasi bentuknya (nama field
`animeList` vs `data` vs array langsung, dll). Setelah endpoint diperbaiki:

1. Jalankan `npm run dev`, buka DevTools → Network, panggil tiap endpoint
   lewat UI.
2. Sesuaikan `src/utils/normalize.js` (`extractAnimeList`,
   `normalizeAnimeItem`) supaya field yang diambil (`title`, `poster`,
   `episodes`, dll) cocok dengan nama field asli di response.
3. Untuk endpoint baru (genre, episode, server, batch) yang belum punya
   normalizer, tambahkan helper serupa kalau bentuk datanya berbeda dari
   daftar anime biasa (mis. `normalizeEpisodeDetail`,
   `normalizeServerList`).

## 7. Testing checklist

- [ ] `GET /anime/home` tampil di halaman awal (kalau dipakai)
- [ ] `GET /anime/ongoing-anime?page=1` tampil di tab Ongoing, pagination jalan
- [ ] `GET /anime/search/:keyword` — coba cari "boruto", hasil muncul
- [ ] `GET /anime/anime/:slug` — klik salah satu card, detail muncul
- [ ] `GET /anime/episode/:slug` — dari detail, klik episode, data episode muncul
- [ ] `GET /anime/server/:serverId` — pilih server, URL stream/embed muncul
- [ ] `GET /anime/genre` dan `GET /anime/genre/:slug?page=1` — halaman genre jalan
- [ ] `GET /anime/complete-anime?page=1` — halaman anime tamat jalan
- [ ] `GET /anime/batch/:slug` — tombol download batch menampilkan link
- [ ] Error state (loading/error) tetap muncul dengan baik kalau salah satu
      endpoint gagal atau path masih salah
