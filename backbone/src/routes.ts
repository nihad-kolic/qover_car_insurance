import { Express, Request, Response } from 'express';
import jwtValidator from './middleware/jwtValidationChecker';

export default function (app: Express) {
  /**
   * GET /healthcheck - Used by client service to ping server
   */
  app.get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200));
  /**
   * POST /api/auth -
   */
  app.post('/api/auth', jwtValidator, (req: Request, res: Response) => {
    //
  });
}
