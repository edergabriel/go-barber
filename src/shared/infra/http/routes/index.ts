import { Router } from 'express';
import appoinmentsRouter from '../../../../modules/appointments/infra/http/routes/appointments.routes';
import sessionsRouter from '../../../../modules/users/infra/http/routes/sessions.router';
import usersRouter from '../../../../modules/users/infra/http/routes/users.routes';
const routes = Router();

routes.use('/appointments', appoinmentsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
