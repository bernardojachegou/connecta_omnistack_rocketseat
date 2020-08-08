import express from 'express';
const routes = express.Router();

import classes from './classes';
import connections from './connections';

routes.use('/classes', classes);
routes.use('/connections', connections);

export default routes;