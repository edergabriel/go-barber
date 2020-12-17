import { Router } from 'express';
import { v4 as uuid } from 'uuid';
import { startOfHour, parseISO, isEqual } from 'date-fns';
import Appointment from '../model/Appointment';
import AppointmentsRepository from '../repositories/AppointmentRepository'
import AppointmentRepository from '../repositories/AppointmentRepository';
import CreateAppoinmentService from '../services/CreateAppoinrmentService';

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.get('/', (request, response) => {
  const appointments = appointmentsRepository.all()

  return response.status(200).json(appointments)
})

appointmentsRouter.post('/', (request, response) => {
try {
  const { provider, date } = request.body;

  const parsedDate = parseISO(date);

  const createAppointment = new CreateAppoinmentService(appointmentsRepository);

  const appointment = createAppointment.execute({
    date: parsedDate,
    provider
  })

  return response.json(appointment);
} catch(err) {
  return response.status(400).json({ error: err.message })
}
});

export default appointmentsRouter;