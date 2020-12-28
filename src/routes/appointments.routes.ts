import { Router } from 'express';
import { startOfHour, parseISO, isEqual } from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentRepository'
import CreateAppointmentService from '../services/CreateAppointmentService';
import { getCustomRepository } from 'typeorm';

const appointmentsRouter = Router();

appointmentsRouter.get('/', async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
 
  const appointments = await appointmentsRepository.find()

  return response.status(200).json(appointments)
})

appointmentsRouter.post('/', async (request, response) => {
try {
  const { provider_id, date } = request.body;

  const parsedDate = parseISO(date);

  const createAppointment = new CreateAppointmentService();

  const appointment = await createAppointment.execute({
    date: parsedDate,
    provider_id
  })

  return response.json(appointment);
} catch(err) {
  return response.status(400).json({ error: err.message })
}
});

export default appointmentsRouter;