import { Request, Response } from 'express';
import { createUser } from '../service/user.service';
import { logger } from '../logger';

export async function createUserHandler (req: Request, res: Response) {
  try {
    const user = await createUser(req.body.username, req.body.password);
    return res.send(user);
  } catch (e: any) {
    logger.error(`userController::createUserHandler - error while creating user: ${e}`);
    return res.status(409).send(e.message);
  }
}
