import { Request, Response } from "express";
import messageModel from "../models/message.model";

class MessageController {

    public async send(req: Request, res: Response): Promise<Response> {
        const message = await messageModel.create({
            text: req.body.text,
            sender: req.user?._id,
            recipient: req.userChat?._id
        });

        return res.status(200).json(message);
    }

    public async list(req: Request, res: Response) {
        const idLoggedUser = req.user?._id;
        const idUserChat = req.userChat?._id;

        const messages = await messageModel.findChat(idLoggedUser, idUserChat).sort("createdAt");

        const messagesChat = messages.map(message => {
            return {
                text: message.text,
                createdAt: message.createdAt,
                isSender: message.sender == String(idLoggedUser)
            }
        });
        return res.json(messagesChat);

    }
}

export default new MessageController();