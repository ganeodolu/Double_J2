import Router from 'koa-router';
import * as productsCtrl from './products.ctrl';

const products = new Router();

products.get('/', productsCtrl.list);
products.post('/', productsCtrl.create);

const product = new Router();

product.get('/', productsCtrl.read);
product.delete('/', productsCtrl.remove);
product.patch('/', productsCtrl.update);

products.use('/:id', productsCtrl.checkObjectId, product.routes())

export default products;
