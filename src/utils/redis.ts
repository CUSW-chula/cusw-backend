import Redis from "ioredis";

// Connect to Redis (using default localhost:6379)
export const redis = new Redis({
	host: "localhost", // Update this if Redis runs on a different host
	port: 6379, // Default Redis port
});
