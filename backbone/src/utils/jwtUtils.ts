import jwt from 'jsonwebtoken';
import config from './../../config/config';
import { logger } from '../logger';

export async function sign (user: any) {
  const token = jwt.sign(user, config.jwt.secret, { issuer: config.jwt.issuer, algorithm: 'HS256', expiresIn: config.jwt.expiration });
  return token;
}
