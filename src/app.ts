import express from 'express';
import path from 'path';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

// Simple in-memory storage
export const users = new Map();
export const groups = new Map();
const messages = new Map();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.get('/', (_, res) => {
  res.render('home');
});

app.get('/login', (_, res) => {
  res.render('login');
});

app.get('/register', (_, res) => {
  res.render('register');
});

app.get('/chat', ClerkExpressRequireAuth(), (req, res) => {
  res.render('chat', { 
    messages: Array.from(messages.values()),
    user: (req as any).auth
  });
});

app.post('/register', (req, res) => {
  const { username, email, password } = req.body;
  const userId = Date.now().toString();
  users.set(userId, { id: userId, username, email, password });
  res.redirect('/chat');
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = Array.from(users.values()).find(u => u.email === email && u.password === password);
  if (user) {
    res.redirect('/chat');
  } else {
    res.redirect('/?error=invalid');
  }
});

// Socket.io
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('sendMessage', (data) => {
    const { message, username } = data;
    const newMessage = {
      id: Date.now().toString(),
      content: message,
      username,
      timestamp: new Date()
    };
    
    messages.set(newMessage.id, newMessage);
    io.emit('newMessage', newMessage);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

export default app; 