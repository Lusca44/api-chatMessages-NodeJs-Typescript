import { Request, Response } from "express";
import messageModel from "../models/message.model";
import userModel from "../models/user.model";
import messageService from "../services/message.service";

class UserController {

    public async register(req: Request, res: Response): Promise<Response> {
        
        const user = await userModel.create(req.body);

        const response = {
            message: "User created!!",
            _id: user._id,
            name: user.name,
        }
        
        return res.status(201).json(user);
    }

    public async delete(req: Request, res: Response): Promise<Response>{
        const { id } = req.params;

        if(!await userModel.findById(id)){
            return res.status(400).json({
                message: "User not found! Incorrect ID"
            });
        }

        await userModel.findByIdAndDelete(id);
        return res.status(204).json()
    }

    public async authenticate(req: Request, res: Response): Promise<Response> {
        const {name , password} = req.body;
        
        const user = await userModel.findOne({ name });
        if(!user){
            return res.status(400).json({
                message: "User name not exists!"
            })
        }

        const validPassword = await user.comparePasswords(password);
        if(!validPassword){
            return res.status(400).json({
                message: "Invalid password!"
            })
        }
        
        return res.status(200).json({
            message: `Welcome ${user.name}!`,
            user,
            token : user.generateToken()
        });
    }

    public getById(req: Request, res: Response) {
        return res.json(req.userChat);
    }

    public async list(req: Request, res: Response) {
        const idLoggedUser = req.user?._id;

        const users = await userModel.find({
            _id: { $ne: idLoggedUser }
        });

        const usersMessage = await Promise.all(
            users.map(user => { 
                return messageModel.findChat(idLoggedUser, user._id)
                    .sort("-createdAt")
                    .limit(1)
                    .map(message => {
                        return messageService.getResultUserMessage(message, user);
                })
            })
        );

        const sortMessages = messageService.getSortMessage(usersMessage);

        return res.json(sortMessages);
    }

}

export default new UserController();