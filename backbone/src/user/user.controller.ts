import { Request, Response } from 'express';
import { createUser, createUserToken, validateCredentials, getUsers } from './user.service';
import { logger } from '../logger';
import { UserLoginInputDto } from './dto/user.login.input.dto';
import { UserLoginOutputDto } from './dto/user.login.output.dto';
import { validateOrReject } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { UserDto } from './dto/user.dto';

export async function createUserHandler (req: Request, res: Response) {
  try {
    const user = await createUser(req.body.username, req.body.password);
    return res.send(user);
  } catch (e) {
    logger.error(`userController::createUserHandler - error while creating user: ${e}`);
    return res.status(409).send(e);
  }
}

export async function loginUserHandler (req: Request, res: Response) {
  try {
    // validate input parameters
    const userDto: UserLoginInputDto = plainToInstance(UserLoginInputDto, req.body as object);
    await validateOrReject(userDto);

    // validate credentials
    const user = await validateCredentials(userDto.username, userDto.password);
    if (!user) {
      return res.status(401).send({ message: 'Bad credentials' });
    }

    // Sign token
    const accessToken = await createUserToken(user);

    const userToReturn = new UserLoginOutputDto(accessToken, new UserDto(user.username, user.createdAt, user.updatedAt));
    return res.send(userToReturn);
  } catch (e) {
    logger.error(`userController::loginUserHandler - error while login: ${e}`);
    return res.status(400).send(e);
  }
}

export async function getUsersHandler (req: Request, res: Response) {
  try {
    const users = await getUsers();
    return res.send(users);
  } catch (e) {
    logger.error(`userController::getUsersHandler - error while creating user: ${e}`);
    return res.status(409).send(e);
  }
}
