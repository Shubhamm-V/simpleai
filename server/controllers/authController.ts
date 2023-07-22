import jwt, { JwtPayload } from 'jsonwebtoken';
import mongoose from 'mongoose';
import crypto from 'crypto';
import { NextFunction, Request, Response } from 'express';
import User from '../models/userModel';
import createAsync from '../utils/createAsync';
import AppError from '../utils/AppError';
import sendEmail from '../utils/email';

//  Create JWT Token
const jwtSignIn = (id: mongoose.Types.ObjectId) => {
  const secretKey: any = process.env.JWT_SECERET;
  const expiresIn: any = process.env.JWT_EXPIRE;
  return jwt.sign({ id }, secretKey, {
    expiresIn: expiresIn,
  });
};

// Send Token
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

// User SignUP

export const signup = createAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    let user = {};
    if (req.body.loginType === 'google') {
      // strore userinfo in DB after google login
      user = await User.findOne({ email: req.body.email });

      // if user login with google first time
      if (!user) {
        const newUser = new User(req.body);
        const savedUser = await newUser.save({ validateBeforeSave: false });
        createAndSendToken(savedUser, 201, res); // reusing it because above user's scope within the block
      }
    } else if (req.body.loginType === 'facebook') {
      user = await User.findOne({ email: req.body.email });
      if (!user) {
        const newUser = new User(req.body);
        const savedUser = await newUser.save({ validateBeforeSave: false });
        createAndSendToken(savedUser, 201, res); // reusing it because above user's scope within the block
      }
    } else {
      user = await User.create(req.body);
    }
    createAndSendToken(user, 201, res);
    // console.log('Userrr : ', user);
  }
);

// User Login
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

// Protect for anly allowin authenticated users
declare module 'express-serve-static-core' {
  interface Request {
    user: {};
  }
}
export const protect = createAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    if (
      !req.headers.authorization ||
      !req.headers.authorization.startsWith('Bearer')
    )
      return next(new AppError('User not logged in', 401));

    const token = req.headers.authorization.split(' ')[1];

    const secret: any = process.env.JWT_SECERET;
    const data = jwt.verify(token, secret) as JwtPayload;
    const currentUser = await User.findById(data.id);

    if (!currentUser)
      return next(
        new AppError("User doesn't exists, use another account", 401)
      );

    req.user = currentUser;
    next();
  }
);

// To restrict user based on roles
export const restrictTo = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.body.user))
      return next(new AppError('You are not allowed to this route', 403));
    next();
  };
};

// Send email for forgot password
export const forgotPassword = createAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return next(new AppError('User with email does not exists', 401));
    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });

    console.log('Token =========> ', resetToken);
    const resetURL = `${req.protocol}://${req.get(
      'host'
    )}/api/v1/users/resetPassword/${resetToken}`;

    const message = `Forgot your message, please click on following linke to reset password ${resetURL}`;

    try {
      await sendEmail({
        email: user.email,
        subject: `Your password reset token (Valid for 10 mins) ${resetURL}`,
        message,
      });
    } catch (err) {
      console.log(err);
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save({ validateBeforeSave: false });
      return next(new AppError('There is error for sending email.', 500));
    }

    res.status(200).json({
      status: 'successs',
      message: 'Token send to your email',
    });
  }
);

// Reset password after clicking on link in email
export const resetPassword = createAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const hashCrypto = crypto
      .createHash('sha256')
      .update(req.params.token)
      .digest('hex');

    const user = await User.findOne({
      passwordResetToken: hashCrypto,
      passwordResetExpires: { $gt: Date.now() },
    });
    console.log('USERRRRR : ', user);
    if (!user) {
      return next(new AppError('Token is invaild or expired', 400));
    }

    user.password = req.body.password;
    user.confirmPassword = req.body.confirmPassword;
    user.passwordResetExpires = undefined;
    user.passwordResetToken = undefined;
    await user.save();

    createAndSendToken(user, 200, res);
  }
);
