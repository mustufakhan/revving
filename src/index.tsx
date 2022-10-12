import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';
import store from './redux/store';
import Routes from './routes';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <SnackbarProvider maxSnack={3}>
        <Routes />
      </SnackbarProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
