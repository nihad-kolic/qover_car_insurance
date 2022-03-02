import express from 'express';
import cors from 'cors';
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
app.use(cors({ origin: config.frontOfficeAllowCors }));

connectToDatabase();

const server = app.listen(config.port as number, () => {
  logger.info(`Server up and running  on - ${config.host}:${config.port}`);
  routes(app);
});
