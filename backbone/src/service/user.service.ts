import userModel from './../model/user.model';
import { logger } from './../logger/index';

export async function createUser (username: string, password: string) {
  try {
    return await userModel.create({ username, password });
  } catch (e: any) {
    logger.error(`userService::createUser - error while creating user: ${e}`);
    throw new Error(e);
  }
}
