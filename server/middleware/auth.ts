import express from 'express';
import UserSchema, { IUser } from '../models/UserSchema';

export const auth = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  let token = req.cookies.x_auth as string;
  console.log('hello')

  const user = await UserSchema.findByToken(token)
  console.log(user)
  
  if (!user) next(Error('no user with token'))

  req.token = token;
  req.user = user;
  next();
}
