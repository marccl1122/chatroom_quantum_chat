"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const app_1 = require("../app");
const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (Array.from(app_1.users.values()).some(user => user.email === email)) {
            return res.render('register', { error: 'Email already registered' });
        }
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const userId = Date.now().toString();
        const user = {
            id: userId,
            username,
            email,
            password: hashedPassword
        };
        app_1.users.set(userId, user);
        if (req.session) {
            req.session.userId = userId;
        }
        res.redirect('/chat');
    }
    catch (error) {
        res.render('register', { error: 'Registration failed' });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = Array.from(app_1.users.values()).find(u => u.email === email);
        if (!user) {
            return res.render('login', { error: 'Invalid credentials' });
        }
        const validPassword = await bcrypt_1.default.compare(password, user.password);
        if (!validPassword) {
            return res.render('login', { error: 'Invalid credentials' });
        }
        if (req.session) {
            req.session.userId = user.id;
        }
        res.redirect('/chat');
    }
    catch (error) {
        res.render('login', { error: 'Login failed' });
    }
};
exports.login = login;
const logout = (req, res) => {
    req.session = null;
    res.redirect('/login');
};
exports.logout = logout;
//# sourceMappingURL=authController.js.map