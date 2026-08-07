import mongoose from 'mongoose';
import redis  from './redis.js';
import { Server } from 'node:http';

export function registerShutdownHandlers(server: Server) {
  const shutdown = async () => {
    try {
      server.close();
      await mongoose.connection.close();
      await redis.quit();

      console.log('Shutdown complete.');
      process.exit(0);
    } catch (error) {
      console.error('Error during shutdown:', error);
      process.exit(1);
    }
  };

  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
}