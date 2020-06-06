import Router from 'koa-router';
import products from './products';

const api = new Router();

api.use('/products', products.routes());

export default api;
