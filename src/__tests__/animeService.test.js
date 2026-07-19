import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('../api/client', () => {
  const mockGet = vi.fn(() => Promise.resolve({ data: {} }))
  return { default: { get: mockGet } }
})

import * as service from '../api/animeService'
import client from '../api/client'

describe('animeService endpoints', () => {
  beforeEach(() => {
    client.get.mockClear()
  })

  it('calls /anime/home for getHome', async () => {
    await service.getHome()
    expect(client.get).toHaveBeenCalledWith('/anime/home')
  })

  it('calls /anime/ongoing-anime with page param for getOngoing', async () => {
    await service.getOngoing(2)
    expect(client.get).toHaveBeenCalledWith('/anime/ongoing-anime', { params: { page: 2 } })
  })

  it('calls /anime/search/:keyword for searchAnime', async () => {
    await service.searchAnime('boruto')
    expect(client.get).toHaveBeenCalledWith('/anime/search/boruto')
  })

  it('calls /anime/anime/:slug for getAnimeDetail', async () => {
    await service.getAnimeDetail('some-slug')
    expect(client.get).toHaveBeenCalledWith('/anime/anime/some-slug')
  })

  it('calls /anime/episode/:slug for getEpisode', async () => {
    await service.getEpisode('ep-slug')
    expect(client.get).toHaveBeenCalledWith('/anime/episode/ep-slug')
  })

  it('calls /anime/server/:id for getStreamServer', async () => {
    await service.getStreamServer('187226-0-720p')
    expect(client.get).toHaveBeenCalledWith('/anime/server/187226-0-720p')
  })
})
