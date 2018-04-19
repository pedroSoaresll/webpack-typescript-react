import * as React from 'react';
import * as ReactDOM from 'react-dom';

// dependencias
import 'jquery'
import 'bootstrap';
import './../styles/app.scss';

// componentes
import App from './components/App';

// react render
ReactDOM.render(<App />, document.getElementById('app'));
