"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.roomingListRoutes = void 0;
const express_1 = require("express");
const RoomingListController_1 = __importDefault(require("../controllers/RoomingListController"));
const Token_1 = __importDefault(require("../middlewares/Token"));
exports.roomingListRoutes = (0, express_1.Router)();
exports.roomingListRoutes.get("/", Token_1.default.authorize.bind(Token_1.default), RoomingListController_1.default.getAll.bind(RoomingListController_1.default));
