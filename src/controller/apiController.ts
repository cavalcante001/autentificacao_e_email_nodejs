import { Request, Response } from 'express';
import * as UserService from '../services/UserService';
import  JWT from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const register = async (req: Request, res: Response) => {
    if(req.body.email && req.body.password) {
        let { email, password } = req.body; 

        const newUser = await UserService.createUser(email, password);

        if(newUser instanceof Error) {
            res.json({ error: newUser.message });
        } else {
            const token = JWT.sign(
                {id: newUser.id, email: newUser.email},
                process.env.JWT_SECRET_KEY as string,
                { expiresIn: '2h' }
            );
            res.status(201);
            res.json({ id: newUser.id, token });
        }
        return;
    }

    res.json({ error: 'E-mail e/ou senha não enviados.' });
}

export const login = async (req: Request, res: Response) => {
    if(req.body.email && req.body.password) {
        let email: string = req.body.email;
        let password: string = req.body.password;

        const user = await UserService.findByEmail(email);  

        if(user && UserService.matchPassword(password, user.password)) {
            const token = JWT.sign(
                {id: user.id, email: user.email},
                process.env.JWT_SECRET_KEY as string,
                { expiresIn: '2h' }
            );
            res.json({status: true, token});
            return;
        }
    }

    res.json({ status: false });
}

export const list = async (req: Request, res: Response) => {
    let users = await UserService.allUsers();
    let list: string[] = [];

    for(let i in users) {
        list.push( users[i].email );
    }

    res.json({ list });
}