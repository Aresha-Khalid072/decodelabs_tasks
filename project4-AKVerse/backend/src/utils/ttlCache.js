

class TTLCache {
  constructor(ttlMs = 60_000) {
    this.ttlMs = ttlMs;
    this.store = new Map();
  }

  get(key) {
    const entry = this.store.get(key);
    if (!entry) return undefined;

    const isExpired = Date.now() - entry.storedAt > this.ttlMs;
    if (isExpired) {
      this.store.delete(key);
      return undefined;
    }
    return entry.value;
  }

  set(key, value) {
    this.store.set(key, { value, storedAt: Date.now() });
  }

  clear() {
    this.store.clear();
  }
}

export default TTLCache;