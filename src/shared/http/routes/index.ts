import { Router } from 'express';
import productsRouter from '@modules/products/routes/products.routes';
import usersRouter from '@modules/users/routes/users.routes';
import categoriesRouter from '@modules/products/routes/categories.routes';
import providersRouter from '@modules/providers/routes/providers.routes';
import ordersRouter from '@modules/orders/routes/orders.routes';
import sessionsRouter from '@modules/users/routes/sessions.routes';

const routes = Router();

routes.use('/products', productsRouter);
routes.use('/users', usersRouter);
routes.use('/categories', categoriesRouter);
routes.use('/providers', providersRouter);
routes.use('/orders', ordersRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
