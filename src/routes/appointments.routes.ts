import { Router } from 'express';
import { v4 as uuid } from 'uuid';
import { startOfHour, parseISO, isEqual } from 'date-fns';
import Appointment from '../model/Appointment';

const appointmentsRouter = Router();

const appointments: Appointment[] = [];

appointmentsRouter.post('/', (request, response) => {
    const { provider, date } = request.body;

    const dateAppointment = startOfHour(parseISO(date));

    const findAppointmentSameDate = appointments.find(appointment =>
      isEqual(dateAppointment, appointment.date),  
    );

    if(findAppointmentSameDate) {
        return response.status(400).json({ message: "Agendamento com horário marcado!"})
    } 

    const appointment = new Appointment(provider, dateAppointment);

    appointments.push(appointment)
 
    return response.json(appointment);
});

export default appointmentsRouter;