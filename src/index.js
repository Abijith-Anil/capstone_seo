import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './App.css';

console.log("App is starting...");
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
console.log("App has been rendered to the DOM."); 