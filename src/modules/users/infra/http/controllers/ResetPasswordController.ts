// index, show, create, update, delete = o controller só pode esses 5.
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ResetPasswordService from '@modules/users/services/ResetPasswordService';

export default class ResetPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { password, token } = request.body;

    const resetPasswordController = container.resolve(ResetPasswordService);

    await resetPasswordController.execute({
      password,
      token,
    });

    return response.status(204).json();
  }
}
