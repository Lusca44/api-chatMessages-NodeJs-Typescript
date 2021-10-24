import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserInterface } from "../interfaces/user.interface";
import userModel from "../models/user.model";

class AuthMiddleware {

    public async autorizeUserByToken(req: Request, res: Response, next: NextFunction) {

        const token = req.query.token || req.headers["x-access-token"];

        if(!token) {
            return res.status(401).send({message: "Restrict Access!!"})
        }

        try{
            const userToken = jwt.verify(String(token), "SECRET") as UserInterface;
            const user = await userModel.findById(userToken._id);
            if(!user){
                return res.status(400).send({message: "User not exists!"});
            }

            req.user = user;
            return next();

        }catch(error){
            return res.status(401).send({message: "Invalid Token!!"});
        }
    }

    public async autorizeUserByParams(req: Request, res: Response, next: NextFunction) {

        try{
            const user = await userModel.findById(req.params.id);
            if(!user){
                return res.status(400).send({message: "User not exists!"});
            }

            req.userChat = user;
            return next();

        }catch(error){
            return res.status(401).send({message: "Invalid User!!"});
        }
    }

}

export default new AuthMiddleware();