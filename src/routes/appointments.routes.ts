import { Router } from 'express';
import { startOfHour, parseISO, isEqual } from 'date-fns';
import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentRepository'
import CreateAppointmentService from '../services/CreateAppointmentService';
import { getCustomRepository } from 'typeorm';

const appointmentsRouter = Router();

appointmentsRouter.get('/', (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
 
  const appointments = appointmentsRepository.find()

  return response.status(200).json(appointments)
})

appointmentsRouter.post('/', async (request, response) => {
try {
  const { provider, date } = request.body;

  const parsedDate = parseISO(date);

  const createAppointment = new CreateAppointmentService();

  const appointment = await createAppointment.execute({
    date: parsedDate,
    provider
  })

  return response.json(appointment);
} catch(err) {
  return response.status(400).json({ error: err.message })
}
});

export default appointmentsRouter;