import Router from 'koa-router';
import products from './products';
import auth from './auth';
import search from './search';

const api = new Router();

api.use('/products', products.routes());
api.use('/auth', auth.routes());
api.use('/search', search.routes());

export default api;
