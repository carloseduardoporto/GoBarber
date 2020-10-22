// RESPONSAVEL SÓ E SOMENTE SÓ PELA CRIAÇÃO DE AGENDAMENTO
import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface RequestDTO {
  provider_id: string;
  date: Date;
}

/**
 * RECEBER INFORMAÇÃO - NO CASO DESSE SERVICE, PRECISO RECEBER O DATE E O PROVIDER LÁ NO ROUTES DO REQUEST BODY
 * TRATAR ERROS -
 * ACESSAR REPOSITÓRIO - PARA RECEBER O VETOR AppointmentsRepository dos repositórios, não podemos simplesmente instanciar a classe aqui
 * pq se fosse fazer isso daria conflito nos outros cantos do código que instaciaram também,
 * então utilizamos o principio do SOLID - dependency inversion, que traz a classe como um parâmetro do construtor
 *
 */

class CreateAppointmentService {
  public async execute({
    date,
    provider_id,
  }: RequestDTO): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw Error('This appointment is already booked!');
    }

    const appointment = appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
