require('dotenv').config();

const Koa = require('koa');
const Router = require('koa-router');
const { jwtMiddleware } = require('lib/token');

const app = new Koa();
const router = new Router();
const api = require('./api');

const mongoose = require('mongoose');
const bodyParser = require('koa-bodyparser');

mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}).then(
  (response) => {
    console.log('Successfully connected to mongodb');
  }
).catch(e => {
  console.log(e);
})

const port = process.env.PORT || 4000;

app.use(bodyParser());
app.use(jwtMiddleware);
router.use('/api', api.routes());
app.use(router.routes()).use(router.allowedMethods());

app.listen(4000, () => {
  console.log('backend server is listening to port' + port);
});
