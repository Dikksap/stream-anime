import apiClient from "./client";

// Official Sanka Vollerei endpoints (paths are under /anime/...)
export const getHome = async () => {
  const { data } = await apiClient.get("/anime/home");
  return data;
};

export const getJadwal = async () => {
  const { data } = await apiClient.get("/anime/schedule");
  return data;
};

export const getAnimeDetail = async (slug) => {
  const { data } = await apiClient.get(`/anime/anime/${slug}`);
  return data;
};

export const getCompleteAnime = async (page = 1) => {
  const { data } = await apiClient.get("/anime/complete-anime", {
    params: { page },
  });
  return data;
};

export const getOngoing = async (page = 1) => {
  const { data } = await apiClient.get("/anime/ongoing-anime", {
    params: { page },
  });
  return data;
};

export const getGenreList = async () => {
  const { data } = await apiClient.get("/anime/genre");
  return data;
};

export const getAnimeByGenre = async (slug, page = 1) => {
  const { data } = await apiClient.get(`/anime/genre/${slug}`, {
    params: { page },
  });
  return data;
};

export const getEpisode = async (slug) => {
  const { data } = await apiClient.get(`/anime/episode/${slug}`);
  return data;
};

// Search uses path param (keyword) not query string
export const searchAnime = async (keywordPathSegment) => {
  const { data } = await apiClient.get(`/anime/search/${keywordPathSegment}`);
  return data;
};

export const getBatchDownload = async (slug) => {
  const { data } = await apiClient.get(`/anime/batch/${slug}`);
  return data;
};

export const getStreamServer = async (serverId) => {
  const { data } = await apiClient.get(`/anime/server/${serverId}`);
  return data;
};

export const getAllAnime = async () => {
  const { data } = await apiClient.get("/anime/unlimited");
  return data;
};
