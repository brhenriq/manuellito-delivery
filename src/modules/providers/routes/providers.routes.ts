import { Router } from 'express';
import UsersController from '../controllers/ProvidersController';

const providersRouter = Router();

const providersController = new UsersController();

providersRouter.get('/', providersController.index);
providersRouter.get('/:id', providersController.show);
providersRouter.post('/', providersController.create);
providersRouter.put('/', providersController.update);
providersRouter.delete('/:id', providersController.delete);

export default providersRouter;
