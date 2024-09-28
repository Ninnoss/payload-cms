import rateLimit from 'express-rate-limit';

export const formSubmissionLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 10 requests per windowMs
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  handler: (_, res) => {
    const retryAfter = Math.ceil((15 * 60) / 60); // Retry after 15 minutes in seconds
    res.set('Retry-After', retryAfter.toString());
    res.status(429).json({
      status: 429,
      error: 'Too many submissions, please try again later.',
      retryAfter: retryAfter,
    });
  },
});
