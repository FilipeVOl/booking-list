import { Router } from "express";
import RoomingListController from "../controllers/RoomingListController";
import Token from "../middlewares/Token";

export const roomingListRoutes = Router();

roomingListRoutes.get("/", Token.authorize.bind(Token) as any, RoomingListController.getAll.bind(RoomingListController) as any);