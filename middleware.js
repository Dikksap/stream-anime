const SITE_NAME = "AniStream"
const SITE_URL = "https://www.dikksap.my.id"
const DEFAULT_IMAGE = `${SITE_URL}/og-image.png`

function toTitle(str) {
  return str.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
}

function cap(str, n) {
  return str.length > n ? str.slice(0, n) + "…" : str
}

function getMeta(pathname) {
  const p = pathname.replace(/\/$/, "") || "/"

  if (p === "/") {
    return {
      title: `${SITE_NAME} — Nonton Anime Subtitle Indonesia`,
      desc: "Nonton streaming dan download anime subtitle Indonesia gratis. Anime ongoing terbaru, anime completed, dan rekomendasi anime populer setiap hari.",
      url: SITE_URL,
    }
  }

  if (p === "/ongoing") {
    return {
      title: `Anime Ongoing — ${SITE_NAME}`,
      desc: "Daftar anime ongoing (tayang) terbaru — nonton streaming subtitle Indonesia.",
      url: `${SITE_URL}/ongoing`,
    }
  }

  if (p === "/complete") {
    return {
      title: `Anime Complete — ${SITE_NAME}`,
      desc: "Daftar anime complete (tamat) lengkap — nonton streaming subtitle Indonesia.",
      url: `${SITE_URL}/complete`,
    }
  }

  if (p === "/search") {
    return {
      title: `Cari Anime — ${SITE_NAME}`,
      desc: "Cari anime favoritmu berdasarkan judul. Temukan anime subtitle Indonesia terlengkap.",
      url: `${SITE_URL}/search`,
    }
  }

  if (p === "/genre") {
    return {
      title: `Genre Anime — ${SITE_NAME}`,
      desc: "Jelajahi anime berdasarkan genre. Temukan rekomendasi anime favoritmu.",
      url: `${SITE_URL}/genre`,
    }
  }

  if (p === "/schedule") {
    return {
      title: `Jadwal Rilis Anime — ${SITE_NAME}`,
      desc: "Lihat jadwal rilis anime mingguan lengkap dari Senin sampai Minggu.",
      url: `${SITE_URL}/schedule`,
    }
  }

  if (p === "/semua-anime") {
    return {
      title: `Semua Anime — ${SITE_NAME}`,
      desc: "Koleksi lengkap semua anime A-Z. Temukan dan nonton anime subtitle Indonesia dari berbagai genre.",
      url: `${SITE_URL}/semua-anime`,
    }
  }

  const genreMatch = p.match(/^\/genre\/(.+)$/)
  if (genreMatch) {
    const name = toTitle(genreMatch[1])
    return {
      title: `Genre ${name} — ${SITE_NAME}`,
      desc: `Daftar anime genre ${name} — nonton streaming subtitle Indonesia.`,
      url: `${SITE_URL}${p}`,
    }
  }

  const animeMatch = p.match(/^\/anime\/(.+)$/)
  if (animeMatch) {
    const name = toTitle(animeMatch[1])
    return {
      title: `Nonton ${cap(name, 60)} — ${SITE_NAME}`,
      desc: `Nonton streaming anime ${name} subtitle Indonesia. Informasi lengkap, episode, dan sinopsis.`,
      url: `${SITE_URL}${p}`,
    }
  }

  const episodeMatch = p.match(/^\/episode\/(.+)$/)
  if (episodeMatch) {
    const name = toTitle(episodeMatch[1])
    return {
      title: `Nonton ${cap(name, 60)} — ${SITE_NAME}`,
      desc: `Nonton streaming episode ${name} subtitle Indonesia gratis.`,
      url: `${SITE_URL}${p}`,
    }
  }

  return null
}

function injectMeta(html, meta) {
  if (!meta) return html

  return html
    .replace(/<title>.*?<\/title>/, `<title>${meta.title}</title>`)
    .replace(
      /<meta name="description" content=".*?"\s*\/?>/,
      `<meta name="description" content="${meta.desc}" />`
    )
    .replace(
      /<link rel="canonical".*?\/?>/,
      `<link rel="canonical" href="${meta.url}" />`
    )
    .replace(
      /<meta property="og:title".*?\/?>/,
      `<meta property="og:title" content="${meta.title}" />`
    )
    .replace(
      /<meta property="og:description".*?\/?>/,
      `<meta property="og:description" content="${meta.desc}" />`
    )
    .replace(
      /<meta property="og:url".*?\/?>/,
      `<meta property="og:url" content="${meta.url}" />`
    )
    .replace(
      /<meta name="twitter:title".*?\/?>/,
      `<meta name="twitter:title" content="${meta.title}" />`
    )
    .replace(
      /<meta name="twitter:description".*?\/?>/,
      `<meta name="twitter:description" content="${meta.desc}" />`
    )
}

export const config = {
  matcher: ["/((?!api|_next|_static|_vercel|assets|favicon|robots|sitemap|og-image|google).*)"],
}

export default async function middleware(request) {
  try {
    const accept = request.headers.get("accept") || ""
    if (!accept.includes("text/html")) return

    const url = new URL(request.url)
    const meta = getMeta(url.pathname)
    if (!meta) return

    const response = await fetch(url)
    if (!response.ok) return

    let html = await response.text()

    html = injectMeta(html, meta)

    return new Response(html, {
      status: response.status,
      headers: {
        "content-type": "text/html;charset=UTF-8",
        "x-robots-tag": "index, follow",
      },
    })
  } catch {
    return
  }
}
