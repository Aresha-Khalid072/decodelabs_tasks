import ApiError from "../utils/ApiError.js";
import TTLCache from "../utils/ttlCache.js";

const BASE_URL = "https://api.jikan.moe/v4";
const cache = new TTLCache(2 * 60_000);

function normalizeAnime(anime) {
  return {
    id: `anime-${anime.mal_id}`,
    sourceId: anime.mal_id,
    type: "anime",
    title: anime.title,
    poster: anime.images?.jpg?.large_image_url || anime.images?.jpg?.image_url || null,
    rating: anime.score || null,
    year: anime.year || (anime.aired?.from ? anime.aired.from.slice(0, 4) : "N/A"),
    genres: (anime.genres || []).map((g) => g.name),
    summary: anime.synopsis || "No summary available.",
  };
}

async function searchAnime(query) {
  const cacheKey = `search:${query.toLowerCase()}`;
  const cached = cache.get(cacheKey);
  if (cached) return cached;

  let response;
  try {
    response = await fetch(`${BASE_URL}/anime?q=${encodeURIComponent(query)}&sfw=true&limit=20`);
  } catch (networkError) {
    throw new ApiError(502, "Could not reach Jikan. Check your internet connection.");
  }

  if (!response.ok) {
    throw new ApiError(502, `Jikan responded with status ${response.status}.`);
  }

  const data = await response.json();
  const results = (data.data || []).map(normalizeAnime);
  cache.set(cacheKey, results);
  return results;
}

async function getAnimeById(id) {
  const cacheKey = `details:${id}`;
  const cached = cache.get(cacheKey);
  if (cached) return cached;

  let response;
  try {
    response = await fetch(`${BASE_URL}/anime/${id}`);
  } catch (networkError) {
    throw new ApiError(502, "Could not reach Jikan. Check your internet connection.");
  }

  if (response.status === 404) {
    throw new ApiError(404, "Anime not found.");
  }
  if (!response.ok) {
    throw new ApiError(502, `Jikan responded with status ${response.status}.`);
  }

  const data = await response.json();
  const normalized = normalizeAnime(data.data);
  cache.set(cacheKey, normalized);
  return normalized;
}

async function getTrendingAnime() {
  const cacheKey = "trending";
  const cached = cache.get(cacheKey);
  if (cached) return cached;

  let response;
  try {
    response = await fetch(`${BASE_URL}/top/anime?filter=airing&limit=12`);
  } catch (networkError) {
    throw new ApiError(502, "Could not reach Jikan. Check your internet connection.");
  }

  if (!response.ok) {
    throw new ApiError(502, `Jikan responded with status ${response.status}.`);
  }

  const data = await response.json();
  const results = (data.data || []).map(normalizeAnime);
  cache.set(cacheKey, results);
  return results;
}

export { searchAnime, getAnimeById, getTrendingAnime };