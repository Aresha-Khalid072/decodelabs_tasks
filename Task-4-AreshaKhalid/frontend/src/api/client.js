// Central API client.
// Backend ko har network call yahin se guzarti hai, taake components
// kabhi seedha fetch() call na karein. Har function: response ka wait
// karta hai, response.ok check karta hai, fail hone pe descriptive Error
// throw karta hai, aur success pe already-parsed JSON return karta hai.
// Components try/catch se decide karte hain error pe kya karna hai
// (loading spinner, toast message waghera).

const API_BASE = "http://localhost:4000/api";

async function request(path, options) {
  let response;
  try {
    response = await fetch(`${API_BASE}${path}`, options);
  } catch (networkError) {
    // fetch() khud sirf network-level failure pe throw karta hai
    // (server band ho, internet na ho, CORS block ho) - kabhi 4xx/5xx
    // HTTP responses pe nahi.
    throw new Error("Could not reach the server. Is the backend running on localhost:4000?");
  }

  const body = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(body.error || `Request failed with status ${response.status}`);
  }

  return body;
}

export function searchTitles(query, type) {
  return request(`/search?query=${encodeURIComponent(query)}&type=${type}`);
}

export function getDetails(type, sourceId) {
  return request(`/details/${type}/${sourceId}`);
}

export function getTrending(type) {
  return request(`/trending?type=${type}`);
}

export function getWatchlist() {
  return request("/watchlist");
}

export function addToWatchlist(item) {
  return request("/watchlist", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  });
}

export function removeFromWatchlist(id) {
  return request(`/watchlist/${id}`, { method: "DELETE" });
}