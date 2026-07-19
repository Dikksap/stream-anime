import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";

vi.mock("../api/animeService", () => {
  return {
    searchAnime: vi.fn(() =>
      Promise.resolve([{ title: "Boruto", slug: "boruto" }]),
    ),
  };
});

import SearchPage from "../components/SearchPage";
import { searchAnime } from "../api/animeService";

describe("SearchPage", () => {
  it("encodes keyword and calls searchAnime with encoded segment", async () => {
    render(<SearchPage onSelect={() => {}} />);

    const input = screen.getByPlaceholderText(/Cari judul anime/i);
    const button = screen.getByRole("button", { name: /Cari/i });

    await userEvent.type(input, "one two");
    await userEvent.click(button);

    // encoded space should become %20
    expect(searchAnime).toHaveBeenCalledWith(encodeURIComponent("one two"));
  });
});
