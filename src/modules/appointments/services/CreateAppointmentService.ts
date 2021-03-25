import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import Appointment from '../infra/typeorm/entities/Appointment';
import AppointmentsRepository from '../infra/typeorm/repositories/AppointmentRepository';
import AppError from '../../../shared/errors/AppError';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
interface IRequest {
    provider_id: string;
    date: Date;
}

class CreateAppointmentService {
    constructor(private appointmentsRepository: IAppointmentsRepository) {}

    public async execute({ date, provider_id }: IRequest): Promise<Appointment> {
        const appointmentsRepository = getCustomRepository(AppointmentsRepository);

        const dateAppointment = startOfHour(date);

        const findAppointmentSameDate = await this.appointmentsRepository.findByDate(dateAppointment)

        if(findAppointmentSameDate) {
            throw new AppError("Agendamento com horário marcado!")
        }

        const appointment = await this.appointmentsRepository.create({
            provider_id,
            date: dateAppointment
        })

        return appointment
    }
}

export default CreateAppointmentService;
