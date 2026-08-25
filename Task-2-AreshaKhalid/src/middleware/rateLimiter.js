

const WINDOW_MS = 60 * 1000; // 1 minute window
const MAX_REQUESTS = 100; // per window, per IP

const requestLog = new Map();

function rateLimiter(req, res, next) {
  const ip = req.ip;
  const now = Date.now();

  const timestamps = (requestLog.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  timestamps.push(now);
  requestLog.set(ip, timestamps);

  if (timestamps.length > MAX_REQUESTS) {
    return res.status(429).json({
      error: "Too Many Requests",
      message: `Rate limit exceeded. Max ${MAX_REQUESTS} requests per minute.`
    });
  }

  next();
}

module.exports = rateLimiter;