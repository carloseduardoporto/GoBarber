import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to update profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Eduardo',
      email: 'eduardo@eduardo.com.br',
      password: '1234',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Porto',
      email: 'porto@porto.com.br',
    });

    expect(updatedUser.name).toBe('Porto');
    expect(updatedUser.email).toBe('porto@porto.com.br');
  });

  it('should not be able to change to an existed email', async () => {
    await fakeUsersRepository.create({
      name: 'Eduardo',
      email: 'eduardo@eduardo.com.br',
      password: '1234',
    });

    const user = await fakeUsersRepository.create({
      name: 'Carlos',
      email: 'carlos@carlos.com.br',
      password: '1234',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Carlos',
        email: 'eduardo@eduardo.com.br',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Eduardo',
      email: 'eduardo@eduardo.com.br',
      password: '1234',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Porto',
      email: 'porto@porto.com.br',
      old_password: '1234',
      password: '123123',
    });

    expect(updatedUser.password).toBe('123123');
  });

  it('should not be able to update password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Eduardo',
      email: 'eduardo@eduardo.com.br',
      password: '1234',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Porto',
        email: 'porto@porto.com.br',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Eduardo',
      email: 'eduardo@eduardo.com.br',
      password: '1234',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Porto',
        email: 'porto@porto.com.br',
        old_password: 'wrong-old-password',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update an non-existing user', async () => {
    await expect(
      updateProfile.execute({
        user_id: 'non-existing-user',
        name: 'test',
        email: 'teste@teste.com.br',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
