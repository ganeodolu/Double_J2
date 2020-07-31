const Router = require('koa-router');

const books = new Router();
const booksCtrl = require('./books.controller');

books.get('/', booksCtrl.list);
books.get('/:type', booksCtrl.typeList);
// books.get('/:id', booksCtrl.get);
books.post('/', booksCtrl.create);
books.delete('/', booksCtrl.delete);
books.put('/:id', booksCtrl.replace);
books.patch('/', booksCtrl.update);

module.exports = books;