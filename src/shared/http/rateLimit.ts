import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { config } from "@config/config";
import { CustomError } from "@shared/errors/CustomError";
import { ERROR_CODES } from "@shared/errors/errorCodes";

const redis = new Redis({
  url: config.upstash.URL,
  token: config.upstash.TOKEN,
});

const ipLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, "1 m"),
  prefix: "ratelimit:auth:ip",
});

const emailLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "15 m"),
  prefix: "ratelimit:auth:email",
});

const rateLimitError = () =>
  new CustomError(
    "Too many attempts. Please try again later.",
    429,
    "Too Many Requests",
    ERROR_CODES.RATE_LIMIT_EXCEEDED,
  );

/**
 * Enforces both an IP-wide and an email-scoped limit so a distributed
 * attacker (rotating IPs) is still capped per target account.
 */
export const enforceAuthRateLimit = async (
  clientAddress: string,
  email: string,
): Promise<void> => {
  const [ipResult, emailResult] = await Promise.all([
    ipLimiter.limit(clientAddress),
    emailLimiter.limit(email.trim().toLowerCase()),
  ]);

  if (!ipResult.success || !emailResult.success) {
    throw rateLimitError();
  }
};
