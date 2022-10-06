import { Request, Response } from 'express';
import nodemailer from 'nodemailer';


export const contato = async (req: Request, res: Response) => {
    // Passo 1: Configurar o transporter
    let transport = nodemailer.createTransport({
        host: "",
        port: 465,
        auth: {
            user: '',
            pass: ''
        }
    });
    // Passo 2: Configurar a mensagem
    let message = {
        from: '',
        to: '',
        subject: '',
        html: '',
        text: ''
    }
    // passo 3: Enviar a mensagem
    let info = await transport.sendMail(message);
    console.log(info);

    res.json({success: true});
}