import { Router }  from 'express';
import UserController from './controllers/UserController';
const routes = Router();

routes.post('/users', UserController.create);

routes.get('/users', UserController.list);

export default routes;