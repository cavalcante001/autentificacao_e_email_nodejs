import { Router } from 'express';
import  { Auth } from '../middlewares/auth';

import * as ApiController from '../controller/apiController';
import * as EmailController from '../controller/emailController';

const router = Router();

router.post('/register', ApiController.register);
router.post('/login', ApiController.login);
router.post('/contato', EmailController.contato);

router.get('/list', Auth.private ,ApiController.list);

export default router;