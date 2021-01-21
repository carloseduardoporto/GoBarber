import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import ListProviderService from './ListProviderService';

let fakeUsersRepository: FakeUsersRepository;
let listProvider: ListProviderService;
let fakeCacheProvider: FakeCacheProvider;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeCacheProvider = new FakeCacheProvider();

    listProvider = new ListProviderService(
      fakeUsersRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to list providers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'Eduardo',
      email: 'eduardo@eduardo.com.br',
      password: '1234',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'Carlos',
      email: 'carlos@eduardo.com.br',
      password: '1234',
    });

    const loggedUser = await fakeUsersRepository.create({
      name: 'Dudu',
      email: 'dudu@dudu.com.br',
      password: '1234',
    });

    const providers = await listProvider.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([user1, user2]);
  });
});
