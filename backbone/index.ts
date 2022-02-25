import express from 'express';
import helmet from 'helmet';
import config from './config/config';
import { logger } from './src/logger';
import { connectToDatabase } from './src/db/mongooseConnection';
import routes from './src/routes';
export const app = express();
export function stopServer () {
  server.close();
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());

connectToDatabase();
/**
 * middleware that logs out the request url
 * app.use(
 *   (req: express.Request, res: express.Response, next: express.NextFunction) => {
 *     logger.info(req.originalUrl);
 *     next();
 *   }
 * );
 */

const server = app.listen(config.port as number, config.host as string, () => {
  logger.info(`Server up and running  on - ${config.host}:${config.port}`);
  routes(app);
});
