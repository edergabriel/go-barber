import { Router } from 'express';
import UsersRepository from '../../typeorm/repositories/UsersRepository';
import SessionsController from '../controllers/SessionsController';

const sessionsRouter = Router();
const sessionsController = new SessionsController();

sessionsRouter.post('/', sessionsController.create);

export default sessionsRouter;
