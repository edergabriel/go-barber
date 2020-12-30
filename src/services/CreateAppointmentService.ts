import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentRepository';
import AppError from '../errors/AppError';

interface Request {
    provider_id: string;
    date: Date;
}

class CreateAppointmentService {
    public async execute({ date, provider_id }: Request): Promise<Appointment> {
        const appointmentsRepository = getCustomRepository(AppointmentsRepository);

        const dateAppointment = startOfHour(date);

        const findAppointmentSameDate = await appointmentsRepository.findByDate(dateAppointment)

        if(findAppointmentSameDate) {
            throw new AppError("Agendamento com horário marcado!")
        }

        const appointment = appointmentsRepository.create({
            provider_id,
            date: dateAppointment
        })

        await appointmentsRepository.save(appointment);

        return appointment
    }
}

export default CreateAppointmentService;
