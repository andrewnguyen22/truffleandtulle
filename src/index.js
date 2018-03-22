import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Router} from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';
import history from './history/History'
ReactDOM.render(
    <Router history={history}>
    <App />
    </Router>
    , document.getElementById('root'));
registerServiceWorker();
