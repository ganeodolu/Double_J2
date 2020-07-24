import Router from 'koa-router';
import * as searchCtrl from './search.ctrl';
// import checkLoggedIn from '../../lib/checkLoggedIn';

const search = new Router();

search.get('/', searchCtrl.list);

export default search;
