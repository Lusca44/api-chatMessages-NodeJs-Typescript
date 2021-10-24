export interface UserInterface {
    _id: any | string;
    name?: string;
    password?: string;
    avatar?: string;
}

export interface MessageUser extends UserInterface{
    lastMessage: string;
    dateLastMessage: Date | any;
}