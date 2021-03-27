import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import config from '../config';

const saltRounds = 10;

export interface IUser extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  token: string;
  role: number;
  comparePassword(pwd: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema<IUser>({
  name: { type: String, require: true },
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  token: { type: String },
  role: { type: Number, default: 1 },
})

// user를 save할 때, 무조건 password를 암호화 처리하도록 해줌
userSchema.pre('save', function (next) {
  const user = this;

  if (user.isModified('password')) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err)

      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err)
        user.password = hash
        next();
      })
    })
  } else next();
})

// user의 password를 암호화된 비번으로 비교해줌
userSchema.methods.comparePassword = function (plainPwd: string): Promise<boolean> {
  return bcrypt.compare(plainPwd, this.password)
}

userSchema.statics.findByToken = async function (token) {
  const decode = jwt.verify(token, config.secretToken)

  const user = await this.findOne({ _id: decode, token }).exec()

  return user
}

export default mongoose.model<IUser>('User', userSchema)
