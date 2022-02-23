import { Request, Response, NextFunction } from 'express';
import { logger } from '../logger';
import jwt from 'jsonwebtoken';
import config from './../../config/config';

const validateJWT = (req: Request, res: Response, next: NextFunction) => {
  logger.debug('jwtValidationChecker::validateJWT - Validating json web token started...');
  const token = req.headers.authorization?.split(' ')[1];
  if (token) {
    jwt.verify(token, config.jwt.secret, (error, decoded) => {
      if (error) {
        logger.error('jwtValidationChecker::validateJWT - Error while validating json web token: ', error);
        res.status(401).json({
          message: 'Unauthorized'
        });
      } else {
        res.locals.jwt = decoded;
        next();
      }
    });
  } else {
    res.status(401).json({
      message: 'Unauthorized'
    });
  }
};

export default validateJWT;
