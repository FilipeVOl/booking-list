import { Router } from "express";
import RoomingListController from "../controllers/RoomingListController";

export const roomingListRoutes = Router();

roomingListRoutes.get("/", RoomingListController.getAll.bind(RoomingListController) as any);