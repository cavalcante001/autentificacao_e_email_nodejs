import { Router } from "express";
import * as TarefaController from '../controller/tarefaController';

const router = Router();

router.get('/listar/tarefas', TarefaController.listarTarefas);  
router.post('/tarefa', TarefaController.adicionarTarefa);
router.put('/tarefa/:id', TarefaController.atualizarTarefa);
router.delete('/tarefa/:id', TarefaController.removerTarefa);

export default router;