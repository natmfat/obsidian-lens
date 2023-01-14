import Redis from "ioredis";

const redis = new Redis({
    host: "redis-18410.c253.us-central1-1.gce.cloud.redislabs.com",
    port: 18410,
    password: process.env.REDIS_PASSWORD,
});

export default redis;
