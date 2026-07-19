# PRD: Anime Streaming Info App

## 1. Ringkasan

Aplikasi web berbasis React + Vite yang mengonsumsi REST API publik dari
Sanka Vollerei (`https://www.sankavollerei.web.id`) untuk menampilkan
informasi anime — jadwal rilis, anime ongoing/tamat, pencarian, detail
anime, daftar episode, link streaming per server, dan link download batch.

Aplikasi ini murni **client-side consumer** dari API pihak ketiga (tidak
ada backend sendiri, tidak ada autentikasi user, tidak ada database).

## 2. Latar Belakang & Tujuan

- Menyediakan antarmuka yang ringan dan cepat untuk menjelajah data anime
  tanpa iklan/gangguan seperti kebanyakan situs streaming.
- Jadi contoh implementasi konsumsi REST API di React (arsitektur
  service/hook yang reusable) yang bisa dipakai ulang untuk API lain.
- Target awal: personal project / portofolio, bukan produk komersial.

## 3. Target Pengguna

- Penggemar anime yang ingin cek jadwal rilis mingguan, cari judul
  tertentu, atau lihat anime yang sedang tayang.
- Developer yang ingin belajar pola konsumsi API scraper (response tidak
  selalu konsisten, perlu normalisasi data).

## 4. Ruang Lingkup (Scope)

### 4.1 In-scope (MVP)

| # | Fitur | Endpoint API | Prioritas |
|---|---|---|---|
| 1 | Halaman Home (highlight/rekomendasi) | `GET /anime/home` | Must |
| 2 | Daftar anime Ongoing + pagination | `GET /anime/ongoing-anime?page=` | Must |
| 3 | Pencarian anime by keyword | `GET /anime/search/:keyword` | Must |
| 4 | Detail lengkap anime (sinopsis, genre, daftar episode) | `GET /anime/anime/:slug` | Must |
| 5 | Detail episode + pilihan server streaming | `GET /anime/episode/:slug` | Must |
| 6 | Ambil URL stream dari server tertentu | `GET /anime/server/:serverId` | Must |
| 7 | Daftar anime Complete (tamat) + pagination | `GET /anime/complete-anime?page=` | Should |
| 8 | Jadwal rilis anime per hari | `GET /anime/schedule` | Should |
| 9 | Daftar semua genre | `GET /anime/genre` | Should |
| 10 | Anime berdasarkan genre + pagination | `GET /anime/genre/:slug?page=` | Should |
| 11 | Download batch per anime | `GET /anime/batch/:slug` | Could |
| 12 | Semua anime tanpa filter (unlimited) | `GET /anime/unlimited` | Could |

### 4.2 Out-of-scope

- Login/akun pengguna, riwayat tontonan, watchlist tersimpan (tidak ada
  backend penyimpanan).
- Upload/kustom subtitle.
- Rating/komentar dari pengguna.
- Native mobile app (fokus web responsive saja).
- Monetisasi/iklan.

## 5. User Stories

- **Sebagai pengunjung**, saya ingin melihat daftar anime yang sedang
  tayang minggu ini supaya saya tidak ketinggalan episode baru.
- **Sebagai pengunjung**, saya ingin mencari anime berdasarkan judul
  supaya saya bisa langsung ke halaman detailnya.
- **Sebagai pengunjung**, saya ingin melihat sinopsis dan daftar episode
  sebuah anime sebelum memutuskan menonton.
- **Sebagai pengunjung**, saya ingin memilih server streaming yang
  berbeda kalau server pertama lambat/error.
- **Sebagai pengunjung**, saya ingin memfilter anime berdasarkan genre
  favorit saya.
- **Sebagai pengunjung**, saya ingin download batch semua episode sebuah
  anime sekaligus lewat link yang disediakan.

## 6. Alur Navigasi (Information Architecture)

```
Home (tab default)
 ├─ Ongoing (tab)
 │   └─ klik card → Detail Anime
 ├─ Complete (tab)
 │   └─ klik card → Detail Anime
 ├─ Cari (tab)
 │   └─ hasil pencarian → Detail Anime
 ├─ Genre (tab)
 │   └─ pilih genre → daftar anime per genre → Detail Anime
 └─ Jadwal (tab)
     └─ list per hari → Detail Anime

Detail Anime
 ├─ Info: poster, judul, sinopsis, genre, status
 ├─ Daftar Episode → klik → Halaman Episode
 └─ Tombol Download Batch (kalau tersedia) → daftar link per resolusi

Halaman Episode
 ├─ Info episode
 ├─ Pilihan server (list)
 │   └─ pilih server → tampilkan player/embed dari getStreamServer
 └─ Navigasi episode sebelumnya/berikutnya (kalau data tersedia)
```

## 7. Requirement Fungsional Detail

### 7.1 Ongoing / Complete Anime
- Tampilkan grid card (poster, judul, jumlah episode, hari rilis bila ada).
- Pagination dengan tombol Prev/Next, disable Prev di halaman 1.
- Klik card → pindah ke Detail Anime dengan slug terkait.

### 7.2 Pencarian
- Input teks + tombol submit (dan submit via Enter).
- Keyword dikirim sebagai path segment (`/anime/search/:keyword`), harus
  di-encode dengan benar (`encodeURIComponent`).
- Tampilkan state: belum mencari, loading, kosong (0 hasil), error, hasil.

### 7.3 Detail Anime
- Tampilkan poster, judul, sinopsis, genre (badge/tag), status
  (ongoing/complete), dan daftar episode.
- Kalau field tertentu tidak tersedia dari API, sembunyikan bagian
  tersebut (jangan tampilkan label kosong).

### 7.4 Episode & Streaming
- Dari detail episode, tampilkan daftar server yang tersedia sebagai
  pilihan (tombol/tab per server).
- Setelah server dipilih, panggil endpoint server untuk dapat URL
  embed/stream, render di `<iframe>` (sandbox) atau `<video>` sesuai
  format yang dikembalikan API.
- Sediakan navigasi ke episode sebelumnya/berikutnya bila API
  menyediakan info tersebut.

### 7.5 Genre
- Halaman daftar semua genre (chip/list).
- Klik genre → daftar anime dengan genre tsb + pagination.

### 7.6 Jadwal Rilis
- Kelompokkan hasil per hari (Senin–Minggu).
- Tiap item anime bisa diklik ke Detail Anime.

### 7.7 Download Batch
- Di halaman Detail Anime, kalau anime punya batch, tampilkan tombol
  "Download Batch" yang mengambil data dari endpoint batch dan
  menampilkan daftar link per resolusi/provider.

## 8. Requirement Non-Fungsional

| Aspek | Requirement |
|---|---|
| Performa | Halaman list & detail harus tampilkan loading state < 100ms setelah klik (skeleton/spinner), tidak boleh blank screen. |
| Resiliency | Semua pemanggilan API dibungkus try/catch; error ditampilkan dengan pesan jelas + tombol "Coba lagi". Tidak boleh crash seluruh app kalau 1 endpoint gagal. |
| Data shape tidak konsisten | Karena ini API scraper, bentuk response bisa berbeda antar endpoint. Wajib pakai layer normalisasi (`utils/normalize.js`) sebelum data dipakai di UI. |
| Responsif | Layout grid harus tetap rapi di mobile (1-2 kolom) sampai desktop (4-6 kolom). |
| Aksesibilitas dasar | Gambar punya `alt`, tombol punya label yang jelas, kontras warna cukup. |
| Rate limit | API punya rate limit; hindari pemanggilan berlebihan (mis. tidak auto-refetch tanpa alasan, debounce search kalau nanti dibuat live-search). |
| Environment config | Base URL API disimpan di `.env` (`VITE_API_BASE_URL`), tidak boleh di-hardcode di banyak tempat — hanya di `src/api/client.js`. |

## 9. Arsitektur Teknis (ringkas)

- **Stack**: React 18 + Vite, axios untuk HTTP client.
- **Struktur folder**:
  - `src/api/client.js` — instance axios + interceptor.
  - `src/api/animeService.js` — semua fungsi pemanggil endpoint (1 fungsi
    = 1 endpoint).
  - `src/hooks/useFetch.js` — hook generik loading/error/data/refetch.
  - `src/utils/normalize.js` — penyeragaman bentuk response API.
  - `src/components/` — 1 file per unit UI (SearchBar, AnimeCard,
    AnimeGrid, OngoingPage, SearchPage, AnimeDetail, dst).
- Tidak pakai state management library eksternal (cukup `useState` lokal
  per halaman) karena aplikasinya tidak kompleks — bisa dipertimbangkan
  ulang kalau nanti ada fitur watchlist/state global.
- Tidak pakai router library di versi awal (navigasi via state tab), bisa
  upgrade ke `react-router` kalau butuh URL yang bisa di-bookmark/share
  per anime.

## 10. Metrik Keberhasilan (untuk versi personal project)

- Semua 12 endpoint di atas bisa dipanggil dan datanya tampil benar di UI.
- Tidak ada state error yang tidak tertangani (selalu ada pesan +
  retry).
- Waktu dari klik card sampai detail anime tampil terasa responsif (tidak
  ada delay tanpa indikator loading).

## 11. Risiko & Mitigasi

| Risiko | Mitigasi |
|---|---|
| API scraper down/berubah struktur sewaktu-waktu | Isolasi semua pemanggilan di `animeService.js` + normalizer, supaya perbaikan cukup di 1-2 file. |
| Rate limit terkena saat development | Cache sederhana / hindari refetch berulang saat testing; gunakan data dummy saat UI-only work. |
| Konten di-takedown oleh pemegang hak cipta | Di luar kendali app ini — app hanya menampilkan apa yang API kembalikan, tidak menyimpan/mendistribusikan konten sendiri. |
| Field response tidak konsisten antar anime | Normalizer selalu punya fallback/default value, UI menyembunyikan field yang kosong alih-alih menampilkan "undefined". |

## 12. Roadmap Bertahap

1. **V1 (MVP)** — Ongoing, Search, Detail, Episode + Server streaming.
2. **V2** — Complete Anime, Genre, Jadwal Rilis.
3. **V3** — Download Batch, halaman "All Anime" (unlimited) dengan
   infinite scroll/pagination.
4. **V4 (opsional, di luar scope saat ini)** — watchlist lokal
   (localStorage/IndexedDB, bukan browser storage di artifact), dark/light
   theme toggle, riwayat pencarian.
