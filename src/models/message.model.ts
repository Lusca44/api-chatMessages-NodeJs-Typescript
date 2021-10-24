import { Model, model, Schema, Document, DocumentQuery} from "mongoose";
import { MessageInterface } from "../interfaces/message.iterface";

interface MessageModel extends MessageInterface, Document {
}

interface StaticMessage extends Model<MessageModel> {
    findChat(idLoggedUser: string, idUserChat: string): DocumentQuery<MessageModel[], MessageModel>;
}
const messageSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    sender: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    recipient: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});

messageSchema.statics.findChat = function(idLoggedUser: string, idUserChat: string): DocumentQuery<MessageModel[], MessageModel> {
    return this.find({
        $or: [
            { $and: [ { sender: idLoggedUser },  { recipient: idUserChat } ]},
            { $and: [ { recipient: idUserChat },  { sender: idLoggedUser } ]}
        ]
    })
}
export default model<MessageModel, StaticMessage>("Message", messageSchema);