import { User } from "../models/User";

export const createUser = async (email: string, password: string) => {
    const hasUser = await User.findOne({where: { email }});
    if(!hasUser) {

    } else {
        return new Error('E-mail já existe');
    }
}

export const findByEmail = async (email: string) => {

}

export const matchPassword = (passwordText: string, encrypted: string) => {

}

export const allUsers = async () => {
    
}