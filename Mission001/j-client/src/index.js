import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Root from './Root';
import configureStore from 'redux/configureStore';
import * as serviceWorker from './serviceWorker';

const store = configureStore();

ReactDOM.render(<Root store={store} />, document.getElementById('root'));

serviceWorker.unregister();
