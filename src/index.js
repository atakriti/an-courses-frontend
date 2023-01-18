import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter} from "react-router-dom"
import Context from './Context';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Context>
  <BrowserRouter>
    <App />
    </BrowserRouter>
    </Context>
);

reportWebVitals();
serviceWorkerRegistration.register();