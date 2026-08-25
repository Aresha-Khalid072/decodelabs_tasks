import ApiError from "../utils/ApiError.js";
import TTLCache from "../utils/ttlCache.js";

const BASE_URL = "https://api.tvmaze.com";
const cache = new TTLCache(2 * 60_000); // 2 minute cache

function normalizeShow(show) {
  return {
    id: `movie-${show.id}`,
    sourceId: show.id,
    type: "movie",
    title: show.name,
    poster: show.image ? show.image.original || show.image.medium : null,
    rating: show.rating && show.rating.average ? show.rating.average : null,
    year: show.premiered ? show.premiered.slice(0, 4) : "N/A",
    genres: show.genres || [],
    summary: show.summary ? show.summary.replace(/<[^>]+>/g, "") : "No summary available.",
  };
}

async function searchShows(query) {
  const cacheKey = `search:${query.toLowerCase()}`;
  const cached = cache.get(cacheKey);
  if (cached) return cached;

  let response;
  try {
    response = await fetch(`${BASE_URL}/search/shows?q=${encodeURIComponent(query)}`);
  } catch (networkError) {
    throw new ApiError(502, "Could not reach TVMaze. Check your internet connection.");
  }

  if (!response.ok) {
    throw new ApiError(502, `TVMaze responded with status ${response.status}.`);
  }

  const data = await response.json();
  const results = data.map((entry) => normalizeShow(entry.show));
  cache.set(cacheKey, results);
  return results;
}

async function getShowById(id) {
  const cacheKey = `details:${id}`;
  const cached = cache.get(cacheKey);
  if (cached) return cached;

  let response;
  try {
    response = await fetch(`${BASE_URL}/shows/${id}`);
  } catch (networkError) {
    throw new ApiError(502, "Could not reach TVMaze. Check your internet connection.");
  }

  if (response.status === 404) {
    throw new ApiError(404, "Show not found.");
  }
  if (!response.ok) {
    throw new ApiError(502, `TVMaze responded with status ${response.status}.`);
  }

  const show = await response.json();
  const normalized = normalizeShow(show);
  cache.set(cacheKey, normalized);
  return normalized;
}

async function getTrendingShows() {
  const cacheKey = "trending";
  const cached = cache.get(cacheKey);
  if (cached) return cached;

  // TVMaze ka koi dedicated "trending" endpoint nahi hai, isliye hum
  // aaj ka schedule use karte hain "abhi kya popular hai" ke andaze ke liye.
  const today = new Date().toISOString().slice(0, 10);

  let response;
  try {
    response = await fetch(`${BASE_URL}/schedule?country=US&date=${today}`);
  } catch (networkError) {
    throw new ApiError(502, "Could not reach TVMaze. Check your internet connection.");
  }

  if (!response.ok) {
    throw new ApiError(502, `TVMaze responded with status ${response.status}.`);
  }

  const data = await response.json();
  const uniqueShows = new Map();
  data.forEach((episode) => {
    if (episode.show && !uniqueShows.has(episode.show.id)) {
      uniqueShows.set(episode.show.id, episode.show);
    }
  });

  const results = Array.from(uniqueShows.values())
    .sort((a, b) => (b.rating?.average || 0) - (a.rating?.average || 0))
    .slice(0, 12)
    .map(normalizeShow);

  cache.set(cacheKey, results);
  return results;
}

export { searchShows, getShowById, getTrendingShows };