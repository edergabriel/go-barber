import { startOfHour } from 'date-fns';
import Appointment from '../model/Appointment';
import AppointmentsRepository from '../repositories/AppointmentRepository';

interface Request {
    provider: string;
    date: Date;
}

class CreateAppoinmentService {
    private appointmentsRepository: AppointmentsRepository;

    constructor(appointmentsRepository: AppointmentsRepository) {
        this.appointmentsRepository = appointmentsRepository
    }

    public execute({ date, provider }: Request): Appointment {
        const dateAppointment = startOfHour(date);

        const findAppointmentSameDate = this.appointmentsRepository.findByDate(dateAppointment)
    
        if(findAppointmentSameDate) {
            throw Error("Agendamento com horário marcado!") 
        } 
    
        const appointment = this.appointmentsRepository.create({provider, date: dateAppointment});
        return appointment
    }
}

export default CreateAppoinmentService;