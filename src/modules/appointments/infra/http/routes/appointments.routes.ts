import { Router } from 'express';
import { startOfHour, parseISO, isEqual } from 'date-fns';
import AppointmentsRepository from '../../typeorm/repositories/AppointmentRepository'
import CreateAppointmentService from '../../../services/CreateAppointmentService';
import  ensureAuthenticated from '../../../../users/infra/http/middlewares/ensureAuthenticated';

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.use(ensureAuthenticated);

//appointmentsRouter.get('/', async (request, response) => {
  //const appointmentsRepository = getCustomRepository(AppointmentsRepository);

 // const appointments = await appointmentsRepository.find()

//  return response.status(200).json(appointments)
//})

appointmentsRouter.post('/', async (request, response) => {

  const { provider_id, date } = request.body;

  const parsedDate = parseISO(date);

  const createAppointment = new CreateAppointmentService(
    appointmentsRepository,
  );

  const appointment = await createAppointment.execute({
    date: parsedDate,
    provider_id
  })

  return response.json(appointment);

});

export default appointmentsRouter;
