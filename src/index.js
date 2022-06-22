import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as atatus from 'atatus-spa';
atatus.config('d40b3bc0ebac406cb8cde0eb660e934f').install();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

atatus.notify(new Error('Test Atatus Setup'));
