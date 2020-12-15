import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import Appointment from '../infra/typeorm/entities/Appointment';

// começou a letra I, então, sua responsabilidade vai ser uma interface;
// essa interface vai operar em conformidade com o SOLID, no caso, o L
// LISKOV SUBSTITUTION PRINCIPLE, que relata que as camadas do nosso programa que tem contato com outras bibliotecas,
// devem poder ser substituiveis

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>; // não precisor desustruturar e colcar { provider_id, date}, aqui não vai ser usado nada

  findByDate(date: Date): Promise<Appointment | undefined>;
}
