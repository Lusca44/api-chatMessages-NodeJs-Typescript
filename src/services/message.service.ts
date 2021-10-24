import { MessageInterface } from "../interfaces/message.iterface";
import { MessageUser, UserInterface } from "../interfaces/user.interface";

class MessageService {
    
    public getResultUserMessage(message: MessageInterface[], user: UserInterface): MessageUser{
        return {
            _id: user._id,
            name: user.name,
            avatar: user.avatar,
            lastMessage: message[0] ? String(message[0].text) : String(null),
            dateLastMessage: message[0] ? message[0].createdAt : null
        }
    }

    public getSortMessage(usersMessage: MessageUser[]): MessageUser[] {
        return usersMessage.sort((a, b) => {
            return (a.dateLastMessage ? 0 : 1) - (b.dateLastMessage ? 0 : 1) 
            || - (a.dateLastMessage > b.dateLastMessage) 
            || + (a.dateLastMessage < b.dateLastMessage)
        })
    }

}

export default new MessageService();