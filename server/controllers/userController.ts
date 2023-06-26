import { NextFunction, Request, Response } from 'express';
import User from '../models/userModel';
import createAsync from '../utils/createAsync';
import AppError from '../utils/AppError';
export const addUser = createAsync(async (req: Request, res: Response) => {
  const addedUser = await User.create(req.body);
  res.status(200).json({
    status: 'success',
    data: {
      user: addedUser,
    },
  });
});

export const getUser = createAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.params.email);
    const user = await User.findOne({ email: req.params.email });
    if (!user) return next(new AppError("User with email doesn't exists", 404));
    res.status(200).json({
      status: 'success',
      data: user,
    });
  }
);
