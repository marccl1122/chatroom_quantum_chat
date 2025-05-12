"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGroup = exports.getChatPage = void 0;
const app_1 = require("../app");
const getChatPage = async (req, res) => {
    var _a;
    try {
        if (!((_a = req.session) === null || _a === void 0 ? void 0 : _a.userId)) {
            return res.redirect('/login');
        }
        const userGroups = Array.from(app_1.groups.values()).filter((group) => group.members.some((member) => { var _a; return member.userId === ((_a = req.session) === null || _a === void 0 ? void 0 : _a.userId); }));
        res.render('chat', {
            groups: userGroups,
            userId: req.session.userId,
            users: Array.from(app_1.users.values())
        });
    }
    catch (error) {
        res.status(500).render('error', { error: 'Failed to load chat page' });
    }
};
exports.getChatPage = getChatPage;
const createGroup = async (req, res) => {
    var _a;
    try {
        const { name, description } = req.body;
        const userId = (_a = req.session) === null || _a === void 0 ? void 0 : _a.userId;
        if (!userId) {
            return res.status(401).json({ error: 'Not authenticated' });
        }
        const groupId = Date.now().toString();
        const group = {
            id: groupId,
            name,
            description,
            members: [{
                    userId,
                    role: 'ADMIN'
                }]
        };
        app_1.groups.set(groupId, group);
        res.redirect('/chat');
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to create group' });
    }
};
exports.createGroup = createGroup;
//# sourceMappingURL=chatController.js.map