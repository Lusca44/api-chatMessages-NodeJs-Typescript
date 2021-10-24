import { UserInterface } from "./interfaces/user.interface";

declare global {
    namespace Express {
        interface Request {
            user?: UserInterface,
            userChat?: UserInterface
        }
    }
}
