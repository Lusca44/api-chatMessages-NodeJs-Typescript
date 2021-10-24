import { Router } from "express";
import messageController from "../controllers/message.controller";
import authMiddleware from "../middlewares/auth.middleware";

const messageRoute = Router();

messageRoute.post("/:id", authMiddleware.autorizeUserByParams, authMiddleware.autorizeUserByToken ,messageController.send);
messageRoute.get("/:id", authMiddleware.autorizeUserByParams, authMiddleware.autorizeUserByToken ,messageController.list);

export default messageRoute;