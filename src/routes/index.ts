import { Router } from 'express';
import appoinmentsRouter from './appointments.routes';
import usersRouter from './users.routes';
const routes = Router();

routes.use('/appointments', appoinmentsRouter);
routes.use('/users', usersRouter);

export default routes;