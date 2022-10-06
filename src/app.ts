import express, { Request, Response, ErrorRequestHandler } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import apiRoutes from './routes/api';
import cors from 'cors';

dotenv.config();

const server = express();

server.use(cors());

server.use(express.static(path.join(__dirname, '../public')));
server.use(express.urlencoded({extended: true}));

server.get('/ping', (req: Request, res: Response) => {
    res.json({pong:true});
})

server.use('/api', apiRoutes);
server.use((req: Request, res: Response) => {
    res.status(404);
    res.json({error: 'Endpoint não encontrado'});
});

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    res.status(400);
    console.log(err);
    res.json({error: 'Requisição ruim.'});
}

server.use(errorHandler);

export default server;