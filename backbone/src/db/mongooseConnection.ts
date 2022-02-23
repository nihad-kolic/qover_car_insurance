import mongoose from 'mongoose';
import { logger } from '../logger';
import config from './../../config/config';

export const connectToDatabase = () => {
  mongoose
    .connect('mongodb://' + config.db.uri + ':' + config.db.port + '/' + config.db.name)
    .then(() => logger.info('Successfully connected to DB.'))
    .catch((e) => {
      logger.error(e);
      setTimeout(connectToDatabase, 5000);
    });
};
