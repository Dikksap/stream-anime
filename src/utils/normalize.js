/**
 * API scraper seperti ini kadang membungkus data dengan bentuk berbeda-beda,
 * misalnya { data: { animeList: [...] } } atau { data: [...] } atau
 * langsung array. Helper ini mencoba menemukan array anime dari beberapa
 * kemungkinan struktur, supaya komponen tidak gampang error kalau bentuknya
 * sedikit berbeda dari dugaan kita.
 */
export function extractAnimeList(response) {
  if (!response) return [];
  if (Array.isArray(response)) return response;
  if (Array.isArray(response.data)) return response.data;
  if (Array.isArray(response.data?.genreList)) return response.data.genreList;
  if (Array.isArray(response.data?.ongoing?.animeList))
    return response.data.ongoing.animeList;
  if (Array.isArray(response.data?.completed?.animeList))
    return response.data.completed.animeList;
  if (Array.isArray(response.data?.recommendedAnimeList)) return response.data.recommendedAnimeList;
  if (Array.isArray(response.data?.animeList)) return response.data.animeList;
  if (Array.isArray(response.data?.anime)) return response.data.anime;
  if (Array.isArray(response.animeList)) return response.animeList;
  if (Array.isArray(response.results)) return response.results;
  return [];
}

export function normalizeAnimeItem(item) {
  return {
    id: item.animeId || item.slug || item.id || item.episodeId || item.genreId || "",
    title: item.title || item.name || item.judul || "Tanpa judul",
    poster: item.poster || item.image || item.thumbnail || item.img || "",
    episodes: item.episodes || item.episodeCount || null,
    releaseDay: item.releaseDay || item.day || null,
    status: item.status || null,
  };
}
