import { Express, Request, Response } from 'express';
import jwtValidator from './middleware/jwtValidationChecker';
import { createUserHandler } from './controller/user.controller';

export default function (app: Express) {
  /**
   * GET /healthcheck - Used by client service to ping server
   */
  app.get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200));
  /**
   * POST /login -
   */
  app.post('/login', (req: Request, res: Response) => {
    //
  });
  /**
   * POST /api/users -
   */
  app.post('/api/users', createUserHandler);
  /**
   * POST /cars -
   */
  app.post('/cars/offer', jwtValidator, (req: Request, res: Response) => {
    //
  });
}
