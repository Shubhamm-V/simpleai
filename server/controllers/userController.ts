import { Request, Response } from 'express';
import User from '../models/userModel';
import createAsync from '../utils/createAsync';
export const addUser = createAsync(async (req: Request, res: Response) => {
  const addedUser = await User.create(req.body);
  res.status(200).json({
    status: 'success',
    data: {
      user: addedUser,
    },
  });
});
