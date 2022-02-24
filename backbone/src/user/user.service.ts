import userModel from './user.model';
import { sign } from '../utils/jwtUtils';

export async function createUser (username: string, password: string) {
  return await userModel.create({ username, password });
}

export async function validateCredentials (username: string, password: string) {
  const user = await userModel.findOne({ username });
  if (!user) {
    return false;
  }

  const isValid = await user.comparePassword(password);
  if (!isValid) {
    return false;
  }
  return user.toJSON();
}

export async function createUserToken (user: any) {
  return sign(user);
}

export async function getUsers () {
  return userModel.find({});
}
