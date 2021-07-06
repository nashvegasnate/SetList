import firebase from 'firebase/app';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import firebaseConfig from './helpers/apiKeys';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.scss';

firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.Fragment>
    <App />
  </React.Fragment>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
