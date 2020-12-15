import { container } from 'tsyringe';

import IHashProvider from './HashProvider/models/IHashProvider';
import BCryptHashProvider from './HashProvider/implementations/BCryptHashProvider';

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);

// toda vez que ele estiver uma injeção de dependência com o nome 'hashprovider', ele vai retornar
// uma instancia da classe BCryptHashProvider
