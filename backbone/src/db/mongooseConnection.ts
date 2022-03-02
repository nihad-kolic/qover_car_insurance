import mongoose from 'mongoose';
import { logger } from '../logger';
import config from './../../config/config';

export const connectToDatabase = () => {
  logger.debug('Try to connect on MongoDB...');
  mongoose
    .connect('mongodb://' + config.db.uri + ':' + config.db.port + '/' + config.db.name)
    .then(() => logger.info('Successfully connected to DB.'))
    .catch((e) => {
      logger.error(`Failed to connect on MongoDB ${e} , start reconnection`);
      setTimeout(connectToDatabase, 5000);
    });

  mongoose.connection.on('disconnected', function () {
    logger.error('MongoDB connection closed');
    if (process.env.NODE_ENV !== 'test') {
      setTimeout(connectToDatabase, 5000);
    }
  });
};

export function stop () {
  mongoose.disconnect();
}
