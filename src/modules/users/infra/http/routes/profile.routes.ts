import { Router } from 'express';

import ProfileController from '../controllers/ProfileController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(ensureAuthenticated); // assim faz com que todas as rotas de atualização de perfil exija que o usuario esteja autenticado

profileRouter.get('/', profileController.show);
profileRouter.put('/', profileController.update);

export default profileRouter;
