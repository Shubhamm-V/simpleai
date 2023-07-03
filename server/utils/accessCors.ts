import { Request, Response, NextFunction } from 'express';
module.exports = (req: Request, res: Response, next: NextFunction) => {
  if (process.env.NODE_ENV === 'development') {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  } else {
    res.setHeader(
      'Access-Control-Allow-Origin',
      'https://simplleai.netlify.app'
    );
  }
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
};
