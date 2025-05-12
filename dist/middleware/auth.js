"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireGuest = exports.requireAuth = void 0;
const requireAuth = (req, res, next) => {
    var _a;
    if (!((_a = req.session) === null || _a === void 0 ? void 0 : _a.userId)) {
        return res.redirect('/login');
    }
    next();
};
exports.requireAuth = requireAuth;
const requireGuest = (req, res, next) => {
    var _a;
    if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.userId) {
        return res.redirect('/chat');
    }
    next();
};
exports.requireGuest = requireGuest;
//# sourceMappingURL=auth.js.map