import Router from 'koa-router';
import * as productsCtrl from './products.ctrl';
import checkLoggedIn from '../../lib/checkLoggedIn';

const products = new Router();

products.get('/', productsCtrl.list);
products.post('/', checkLoggedIn, productsCtrl.create);

const product = new Router();

product.get('/', productsCtrl.read);
product.delete(
  '/',
  checkLoggedIn,
  // productsCtrl.checkOwnProduct,
  productsCtrl.remove,
);
product.patch(
  '/',
  checkLoggedIn,
  // productsCtrl.checkOwnProduct,
  productsCtrl.update,
);

products.use('/:id', productsCtrl.getProductById, product.routes());

export default products;
