import { Router } from 'express';
import { v4 as uuid } from 'uuid';
import { startOfHour, parseISO, isEqual } from 'date-fns';
import Appointment from '../model/Appointment';
import AppointmentsRepository from '../repositories/AppointmentRepository'
import AppointmentRepository from '../repositories/AppointmentRepository';

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.get('/', (request, response) => {
  const appointments = appointmentsRepository.all()

  return response.status(200).json(appointments)
})

appointmentsRouter.post('/', (request, response) => {
    const { provider, date } = request.body;

    const dateAppointment = startOfHour(parseISO(date));

    const findAppointmentSameDate = appointmentsRepository.findByDate(dateAppointment)

    if(findAppointmentSameDate) {
        return response.status(400).json({ message: "Agendamento com horário marcado!"})
    } 

    const appointment = appointmentsRepository.create(provider, dateAppointment);
 
    return response.json(appointment);
});

export default appointmentsRouter;