import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { users } from '../app';

// Extend Express Request type to include session
declare module 'express' {
  interface Request {
    session: {
      userId?: string;
    } | null;
  }
}

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    if (Array.from(users.values()).some(user => user.email === email)) {
      return res.render('register', { error: 'Email already registered' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const userId = Date.now().toString();
    const user = {
      id: userId,
      username,
      email,
      password: hashedPassword
    };

    users.set(userId, user);

    // Set session
    if (req.session) {
      req.session.userId = userId;
    }

    res.redirect('/chat');
  } catch (error) {
    res.render('register', { error: 'Registration failed' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = Array.from(users.values()).find(u => u.email === email);
    if (!user) {
      return res.render('login', { error: 'Invalid credentials' });
    }

    // Check password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.render('login', { error: 'Invalid credentials' });
    }

    // Set session
    if (req.session) {
      req.session.userId = user.id;
    }

    res.redirect('/chat');
  } catch (error) {
    res.render('login', { error: 'Login failed' });
  }
};

export const logout = (req: Request, res: Response) => {
  req.session = null;
  res.redirect('/login');
}; 