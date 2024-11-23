import { create, getAllTasks, taskDelete, update } from '@controllers/task.controller';
import authentication from '@middlewares/auth.middleware';
import { Router } from 'express';

const router = Router();
router.post('/',authentication, create);
router.get('/',authentication,getAllTasks );
router.put('/:id',authentication,update)
router.delete('/:id',authentication,taskDelete)

export default router;
