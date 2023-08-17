import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import App from './App';
import { BrowserRouter, Route, Router } from 'react-router-dom'
import { ContextProvider } from './contexts/ContextProvider';
import { LogInputContext } from './contexts/LogInputContext'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ContextProvider>
      <LogInputContext>
        <App />
      </LogInputContext>
    </ContextProvider>
  </React.StrictMode>
);

