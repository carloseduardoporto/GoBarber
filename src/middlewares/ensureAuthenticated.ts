import { Request, Response, NextFunction } from 'express';
// eslint-disable-next-line import/no-extraneous-dependencies
import { verify } from 'jsonwebtoken';

import authConfig from '../config/auth';

interface tokenPayLoad {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  // validação do token jwt

  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new Error('JWT token is missing.');
  }

  // Bearer haushifaojsijdsa

  const [, token] = authHeader.split(' '); // separa o Beader do segredo

  try {
    const decoded = verify(token, authConfig.jwt.secret);

    const { sub } = decoded as tokenPayLoad; // forma de forçar tipagem no typescript

    /**
     * Como o request.user  não tem tipagem, a manha é criar uma pasta arrobaTypes, e adicionar uma tipagem para biblioteca.
     * com esse user, vamos ter
     */
    request.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new Error('Invalid JWT token');
  }
}
