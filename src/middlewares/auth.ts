import {Request, Response, NextFunction} from 'express';
import dotenv from 'dotenv';
import JWT from 'jsonwebtoken';
import { User } from '../models/User';

export const Auth = {
    private: (req: Request, res: Response, next: NextFunction) => {
        let success = false;

        if(req.headers.authorization) {
            const [authType, token] = req.headers.authorization.split(' ');
            if(authType === 'Bearer') {
                try {
                    const decoded = JWT.verify(
                        token, process.env.JWT_SECRET_KEY as string
                    );

                    success = true;
                } catch(e) {}
            }
        }

        if(success) {
            next();
        } else {
            res.status(403); // Not authorized
            res.json({ error: 'Não autorizado' });
        }
    }
}