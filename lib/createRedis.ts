import invariant from "tiny-invariant";
import Redis from "ioredis";

const createRedis = () => {
  invariant(process.env.REDIS_HOST, "expected redis host");
  invariant(process.env.REDIS_PORT, "expected redis port");
  invariant(process.env.REDIS_PASSWORD, "expected redis password");

  const redis = new Redis({
    username: "default",
    password: process.env.REDIS_PASSWORD,
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT),
  });

  return redis;
};

export default createRedis;
