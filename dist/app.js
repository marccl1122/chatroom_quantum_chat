"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.groups = exports.users = void 0;
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const clerk_sdk_node_1 = require("@clerk/clerk-sdk-node");
const app = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(httpServer);
exports.users = new Map();
exports.groups = new Map();
const messages = new Map();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
app.set('view engine', 'ejs');
app.set('views', path_1.default.join(__dirname, 'views'));
app.get('/', (_, res) => {
    res.render('home');
});
app.get('/login', (_, res) => {
    res.render('login');
});
app.get('/register', (_, res) => {
    res.render('register');
});
app.get('/chat', (0, clerk_sdk_node_1.ClerkExpressRequireAuth)(), (req, res) => {
    res.render('chat', {
        messages: Array.from(messages.values()),
        user: req.auth
    });
});
app.post('/register', (req, res) => {
    const { username, email, password } = req.body;
    const userId = Date.now().toString();
    exports.users.set(userId, { id: userId, username, email, password });
    res.redirect('/chat');
});
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const user = Array.from(exports.users.values()).find(u => u.email === email && u.password === password);
    if (user) {
        res.redirect('/chat');
    }
    else {
        res.redirect('/?error=invalid');
    }
});
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
exports.default = app;
//# sourceMappingURL=app.js.map