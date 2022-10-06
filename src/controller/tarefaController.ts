import { Request, Response } from 'express';
import { Tarefa } from '../models/Tarefa';

export const listarTarefas = async (req: Request, res: Response) => {
    const lista = await Tarefa.findAll();
    res.json({lista});
}

export const adicionarTarefa = async (req: Request, res: Response) => {
    if(req.body.titulo) {
        let novaTarefa = await Tarefa.create({
            titulo: req.body.titulo,
            feito: req.body.feito ? true : false
        });

        res.status(201).json({item: novaTarefa});
        return; 
    }     
    res.json({error: 'Dados não enviados'})
}

export const atualizarTarefa = async (req: Request, res: Response) => {
    let id: string = req.params.id;

    let tarefa = await Tarefa.findByPk(id);
    if(tarefa) {
        if(req.body.titulo) {
            tarefa.titulo = req.body.titulo;
        } 
        if(req.body.feito) {
            switch(req.body.feito.toLowerCase()) {
                case 'true':
                case '1':
                    tarefa.feito = true;
                    break;
                case 'false':
                case '0':
                    tarefa.feito = false;
            }
        }

        await tarefa.save();
        res.json({item: tarefa});
    } else {
        res.json({error: 'Item não encontrado'});
    }
}

export const removerTarefa = async (req: Request, res: Response) => {
    let id: string = req.params.id;
    
    let tarefa = await Tarefa.findByPk(id);
    if(tarefa) {
        await tarefa.destroy();
    }

    res.json({});
}