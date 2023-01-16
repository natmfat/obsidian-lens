import Redis from "ioredis";

const createRedis = () => {
    const redis = new Redis({
        host: "redis-18410.c253.us-central1-1.gce.cloud.redislabs.com",
        port: 18410,
        password: process.env.REDIS_PASSWORD,
    });

    return redis;
};

export default createRedis;
