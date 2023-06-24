import jwt, { JwtPayload } from 'jsonwebtoken';
import mongoose from 'mongoose';
import { promisify } from 'util';
import { NextFunction, Request, Response } from 'express';
import User from '../models/userModel';
import createAsync from '../utils/createAsync';
import AppError from '../utils/AppError';

const jwtSignIn = (id: mongoose.Types.ObjectId) => {
  const secretKey: any = process.env.JWT_SECERET;
  const expiresIn: any = process.env.JWT_EXPIRE;
  return jwt.sign({ id }, secretKey, {
    expiresIn: expiresIn,
  });
};

const createAndSendToken = (user: any, statusCode: number, res: Response) => {
  const token = jwtSignIn(user._id);
  user.password = undefined;
  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

export const signup = createAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
      passwordChangeAt: req.body.passwordChangeAt,
      role: req.body.role,
    });

    createAndSendToken(newUser, 201, res);
  }
);

export const login = createAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if (!user)
      return next(new AppError('User with entered email doesnt exists', 401));

    const correctPassword = await user.comparePassword(password, user.password);

    if (!correctPassword)
      return next(new AppError('Invalid Email or Password', 401));

    createAndSendToken(user, 200, res);
  }
);

export const protect = createAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    if (
      !req.headers.authorization ||
      !req.headers.authorization.startsWith('Bearer')
    )
      return next(new AppError('User not logged in', 401));

    const token = req.headers.authorization.split(' ')[1];

    const secret: any = process.env.SECERET;
    const data = jwt.verify(token, secret) as JwtPayload;

    const currentUser = await User.findById(data.id);

    if (!currentUser)
      return next(
        new AppError("User doesn't exists, use another account", 401)
      );

    (req as any).user = currentUser;
    next();
  }
);

export const restrictTo = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.body.user))
      return next(new AppError('You are not allowed to this route', 403));
    next();
  };
};
