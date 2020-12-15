import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const user = await createUser.execute({
      name: 'Eduardo',
      email: 'eduardo@eduardo.com.br',
      password: '1234',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create an already existed email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    await createUser.execute({
      name: 'Eduardo',
      email: 'eduardo@eduardo.com.br',
      password: '1234',
    });

    expect(
      createUser.execute({
        name: 'Eduardo',
        email: 'eduardo@eduardo.com.br',
        password: '1234',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
