import Router from 'koa-router';
import products from './products';
import auth from './auth';

const api = new Router();

api.use('/products', products.routes());
api.use('/auth', auth.routes());

export default api;
