import 'express';
import 'cookie-session';
import { Request as ExpressRequest } from 'express';
import { AuthObject } from '@clerk/clerk-sdk-node';

declare module 'express' {
  interface Request {
    session: {
      userId?: string;
    } | null;
    auth?: AuthObject;
  }
} 