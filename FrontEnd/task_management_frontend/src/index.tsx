import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ToastProvider from './components/ToastProvider';
import { Provider } from 'react-redux'; // Import Provider
import { store } from './store'; // Import your Redux store

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}> {/* Wrap App with Provider */}
      <ToastProvider />
      <App />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();