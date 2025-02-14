import ioRedis from 'ioredis';

export default class RedisClient {
  private client: ioRedis;

  constructor({ host, port }: { host: string; port: number }) {
    this.client = new ioRedis({
      host,
      port,
    });
  }

  async set(key: string, value: string): Promise<void> {
    await this.client.set(key, value);
  }

  async get(key: string): Promise<string | null> {
    return await this.client.get(key);
  }

  async del(key: string): Promise<void> {
    await this.client.del(key);
  }

  close(): void {
    this.client.disconnect();
  }

  async checkReadOnly(): Promise<boolean> {
    try {
      await this.set('test', 'test');
      await this.del('test');
      return false;
    } catch (error) {
      if (error instanceof Error && error.message &&
        (error.message.includes('READONLY') ||
          error.message.includes('read-only') ||
          error.message.includes('read only'))) {
        return true;
      }
      
      throw error;
    } finally {
      await this.close();
    }
  }
}
