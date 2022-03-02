import jwt from 'jsonwebtoken';
import config from './../../config/config';

export async function sign (user: any) {
  return jwt.sign(user, config.jwt.secret, { issuer: config.jwt.issuer, algorithm: 'HS256', expiresIn: config.jwt.expiration });
}
