import { Router } from 'express';
import appoinmentsRouter from './appointments.routes';
import sessionsRouter from './sessions.router';
import usersRouter from './users.routes';
const routes = Router();

routes.use('/appointments', appoinmentsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
