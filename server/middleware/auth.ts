import express from 'express';
import UserSchema, { IUser } from '../models/UserSchema';

export const auth = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  let token = req.cookies.x_auth as string;

  UserSchema.findByToken(token, (err: Error, user: IUser) => {
    if (err) throw err
    if (!user) throw Error('no User with token')

    req.token = token;
    req.user = user;
    next();
  })
}
