import { Router } from 'express';
import { register, login } from '../controllers/auth.controller';
import validateRequest from '@middlewares/validateRequest.middleware';
import { registerValidationSchema } from '../validations/auth/register.validation';
import { loginValidationSchema } from '../validations/auth/login.validation';
import authentication from '@middlewares/auth.middleware';

const router = Router();
router.post('/login', validateRequest(loginValidationSchema), login);
router.post('/register', validateRequest(registerValidationSchema), register);

export default router;
