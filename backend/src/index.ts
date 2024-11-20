import dotenv from 'dotenv';
import { Server } from 'http';
import app from './app';
import logger from './utils/logger';

dotenv.config();

const port = Number(process.env.PORT) || 3000

const server: Server = new Server(app);

server.listen(port, (): void => {
  logger.info(`Server started in http://localhost:${port}`);
});

const unexpectedErrorHandler = async (error: Error): Promise<void> => {
  logger.error(error);
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  }
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', async (error: Error) => {
  await unexpectedErrorHandler(error);
  process.exit(1);
});

process.on('SIGTERM', unexpectedErrorHandler);
process.on('SIGINT', unexpectedErrorHandler);
