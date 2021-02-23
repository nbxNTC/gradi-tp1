import { Router }  from 'express';
import RecordController from './controllers/RecordController';
import UserController from './controllers/UserController';
import EquipmentController from './controllers/EquipmentController';
const routes = Router();

routes.post('/users', UserController.create);

routes.get('/users', UserController.index);

routes.get('/users/:id', UserController.show);

routes.post('/records', RecordController.create);

routes.get('/users/:id/records', UserController.records);

routes.post('/equipments', EquipmentController.create);

routes.get('/equipments', EquipmentController.index);

export default routes;