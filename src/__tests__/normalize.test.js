import { describe, it, expect } from "vitest";
import { extractAnimeList, normalizeAnimeItem } from "../utils/normalize";

const homeResponse = {
  status: "success",
  creator: "Sanka Vollerei",
  statusCode: 200,
  statusMessage: "OK",
  message: "",
  ok: true,
  data: {
    ongoing: {
      href: "/anime/ongoing-anime",
      otakudesuUrl: "https://otakudesu.blog/ongoing-anime/",
      animeList: [
        {
          title: "Mao",
          poster: "https://otakudesu.blog/wp-content/uploads/2026/04/Mao.jpg",
          episodes: 16,
          releaseDay: "Minggu",
          latestReleaseDate: "19 Jul",
          animeId: "mao-sub-indo",
          href: "/anime/anime/mao-sub-indo",
          otakudesuUrl: "https://otakudesu.blog/anime/mao-sub-indo/",
        },
      ],
    },
    completed: {
      href: "/anime/complete-anime",
      otakudesuUrl: "https://otakudesu.blog/complete-anime/",
      animeList: [],
    },
  },
  pagination: null,
};

describe("normalize helpers", () => {
  it("extracts animeList from home response (ongoing)", () => {
    const list = extractAnimeList(homeResponse);
    expect(Array.isArray(list)).toBe(true);
    expect(list.length).toBeGreaterThan(0);
    expect(list[0].title).toBe("Mao");
  });

  it("normalizes anime item fields", () => {
    const list = extractAnimeList(homeResponse);
    const item = normalizeAnimeItem(list[0]);
    expect(item.id).toBe("mao-sub-indo");
    expect(item.title).toBe("Mao");
    expect(item.poster).toContain("Mao.jpg");
    expect(item.episodes).toBe(16);
    expect(item.releaseDay).toBe("Minggu");
  });
});
