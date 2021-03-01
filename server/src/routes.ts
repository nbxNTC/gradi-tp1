import { Router }  from 'express';
import RecordController from './controllers/RecordController';
import UserController from './controllers/UserController';
import EquipmentController from './controllers/EquipmentController';
import ExerciseController from './controllers/ExerciseController';
const routes = Router();

routes.post('/users', UserController.create);

routes.get('/users', UserController.index);

routes.get('/users/:id', UserController.show);

routes.post('/records', RecordController.create);

routes.get('/users/:id/records', UserController.records);

routes.post('/equipments', EquipmentController.create);

routes.get('/equipments', EquipmentController.index);

routes.post('/exercises', ExerciseController.create);

routes.get('/exercises', ExerciseController.index);

routes.get('/exercises/:id/records', ExerciseController.getExercisesByRecord);

export default routes;