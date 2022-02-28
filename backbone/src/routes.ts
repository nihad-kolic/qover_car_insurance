import { Express, Request, Response } from 'express';
import jwtValidator from './middleware/jwtValidationChecker';
import { createUserHandler, getUsersHandler, loginUserHandler } from './user/user.controller';
import { createCarHandler, getCarOfferHandler, getCarsHandler } from './cars/car.controller';

export default function (app: Express) {
  /**
   * GET /healthcheck - Used by client service to ping server
   */
  app.get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200));
  /**
   * POST /api/users -
   */
  app.post('/api/users', createUserHandler);
  /**
   * GET /api/users -
   */
  app.get('/api/users', jwtValidator, getUsersHandler);
  /**
   * POST /login -
   */
  app.post('/login', loginUserHandler);

  /**
   * POST /api/cars -
   */
  app.post('/api/cars', jwtValidator, createCarHandler);
  /**
   * POST /api/cars -
   */
  app.get('/api/cars', jwtValidator, getCarsHandler);
  /**
   * GET /api/cars/offer -
   */
  app.get('/api/cars/:carId/offer', jwtValidator, getCarOfferHandler);
}
