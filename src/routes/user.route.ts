import { Router } from "express";
import userController from "../controllers/user.controller";
import authMiddleware from "../middlewares/auth.middleware";

const userRoute = Router();

userRoute.post("/", userController.register);
userRoute.post("/login", userController.authenticate);
userRoute.delete("/delete/:id", userController.delete);

userRoute.get("/", authMiddleware.autorizeUserByToken, userController.list);
userRoute.get("/:id", authMiddleware.autorizeUserByParams, authMiddleware.autorizeUserByToken, userController.getById);
export default userRoute;