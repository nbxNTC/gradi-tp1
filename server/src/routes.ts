import { Router }  from 'express';
import UserController from './controllers/UserController';
const routes = Router();

routes.post('/users', UserController.create);

routes.get('/users', UserController.index);

routes.get('/users/:id', UserController.show);

export default routes;