import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

vi.mock("../api/animeService", () => {
  return {
    searchAnime: vi.fn(() =>
      Promise.resolve([{ title: "Boruto", slug: "boruto" }]),
    ),
  };
});

import SearchPage from "../pages/SearchPage";
import { searchAnime } from "../api/animeService";

describe("SearchPage", () => {
  it("encodes keyword and calls searchAnime with encoded segment", async () => {
    render(
      <HelmetProvider>
        <MemoryRouter>
          <SearchPage />
        </MemoryRouter>
      </HelmetProvider>,
    );

    const input = screen.getByPlaceholderText(/Cari judul anime/i);

    await userEvent.type(input, "one two{Enter}");

    // encoded space should become %20
    expect(searchAnime).toHaveBeenCalledWith(encodeURIComponent("one two"));
  });
});
