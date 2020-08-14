const Router = require('koa-router');

const api = new Router();
const auth = require('./auth');
const books = require('./books');

api.use('/auth', auth.routes());
api.use('/books', books.routes());

module.exports = api;