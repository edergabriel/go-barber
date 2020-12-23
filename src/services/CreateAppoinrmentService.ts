import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import Appointment from '../model/Appointment';
import AppointmentsRepository from '../repositories/AppointmentRepository';

interface Request {
    provider: string;
    date: Date;
}

class CreateAppointmentService {
    public async execute({ date, provider }: Request): Promise<Appointment> {
        const appointmentsRepository = getCustomRepository(AppointmentsRepository);

        const dateAppointment = startOfHour(date);

        const findAppointmentSameDate = await appointmentsRepository.findByDate(dateAppointment)
    
        if(findAppointmentSameDate) {
            throw Error("Agendamento com horário marcado!") 
        } 

        const appointment = appointmentsRepository.create({
            provider,
            date: dateAppointment
        })

        await appointmentsRepository.save(appointment);
    
        return appointment
    }
}

export default CreateAppointmentService;