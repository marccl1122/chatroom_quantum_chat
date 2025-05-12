"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const chatController_1 = require("../controllers/chatController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.get('/chat', auth_1.requireAuth, chatController_1.getChatPage);
router.post('/groups', auth_1.requireAuth, chatController_1.createGroup);
exports.default = router;
//# sourceMappingURL=chatRoutes.js.map