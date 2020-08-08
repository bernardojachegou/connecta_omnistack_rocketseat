import express from 'express';
const routes = express.Router();

import ConnectionsController from '../controllers/ConnectionsController';
const { index, create } = ConnectionsController;

routes.get('/', index);
routes.post('/', create);

export default routes;