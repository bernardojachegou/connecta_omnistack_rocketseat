import express from 'express';
const routes = express.Router();

import ClassesController from '../controllers/ClassesController';
const { index, create } = ClassesController;

routes.get('/', index);
routes.post('/', create);

export default routes;