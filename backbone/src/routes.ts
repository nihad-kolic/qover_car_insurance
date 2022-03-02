import { Express, Request, Response } from 'express';
import jwtValidator from './middleware/jwtValidationChecker';
import { createUserHandler, getUsersHandler, loginUserHandler } from './user/user.controller';
import { createCarHandler, getCarOfferHandler, getCarsHandler } from './cars/car.controller';

export default function (app: Express) {
  app.get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200));

  app.post('/api/users', createUserHandler);

  app.get('/api/users', jwtValidator, getUsersHandler);

  app.post('/login', loginUserHandler);

  app.post('/api/cars', jwtValidator, createCarHandler);

  app.get('/api/cars', jwtValidator, getCarsHandler);

  app.get('/api/cars/:carId/offer', jwtValidator, getCarOfferHandler);
}
