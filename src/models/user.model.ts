import { model, Schema } from "mongoose";
import { UserInterface } from "../interfaces/user.interface";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface UserModel extends UserInterface {
    comparePasswords(password: string): Promise<boolean>;
    generateToken();
}

const userSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required:false
    }
});

userSchema.pre<UserModel>("save", async function encryptyPassword(){
    this.password = await bcrypt.hash(this.password, 8);
});

userSchema.methods.comparePasswords = function(password: string): Promise<boolean>{
    return bcrypt.compare(password, this.password);
}

userSchema.methods.generateToken = function(): string {
    const decodedToken = {
        _id: String(this.id),
        name: this.name,
        avatar: this.avatar
    }

    return jwt.sign(decodedToken, "SECRET", {
        expiresIn: "1d"
    });
}

userSchema.pre<UserModel>("save", async function generateAvatar() {
    const randomId = Math.floor(Math.random() * (1000000)) + 1;

    this.avatar  = `https://api.adorable.io/avatars/285/${randomId}.png`
})


export default model<UserModel>("User", userSchema);