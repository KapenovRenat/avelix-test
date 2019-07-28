import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './app';
import { Provider } from 'react-redux';
import Store from './store';
import { SnackbarProvider } from 'notistack';

ReactDOM.render(<Provider store={Store}><SnackbarProvider maxSnack={5}><App /></SnackbarProvider></Provider>, document.getElementById('app'));
