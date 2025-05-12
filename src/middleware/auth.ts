import { Request, Response, NextFunction, RequestHandler } from 'express';

export const requireAuth: RequestHandler = (req, res, next) => {
  if (!req.session?.userId) {
    return res.redirect('/login');
  }
  next();
};

export const requireGuest = (req: Request, res: Response, next: NextFunction) => {
  if (req.session?.userId) {
    return res.redirect('/chat');
  }
  next();
}; 