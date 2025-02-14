import RedisClient from './lib/RedisClient';

const host = process.env.REDIS_HOST || 'localhost';
const port = parseInt(process.env.REDIS_PORT || '6379', 10);

const redisClient = new RedisClient({
  host,
  port,
});

(async () => {

  while (true) {
    console.log(new Date().toLocaleString(), 'Checking whether redis is readonly:', await redisClient.checkReadOnly());
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }

})();
