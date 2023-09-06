import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';
import App from './App.jsx'
import store from './RedaxSTORE/RedaxStor.js';
import './index.scss'

import { BrowserRouter as Router } from 'react-router-dom'; // Импортируйте BrowserRouter

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);
