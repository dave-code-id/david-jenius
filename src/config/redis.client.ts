// @ts-ignore
import Redis from 'ioredis';

export const connectRedis = () => {
    return new Redis({
        retryStrategy(times) {
            return Math.min(times * 50, 2000);
        },
    });
};
