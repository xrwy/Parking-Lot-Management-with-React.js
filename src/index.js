import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import CarParkingProvider from './contexts/CarParkingProvider';
import BodyProvider from './contexts/BodyProvider';
import './index.css';
import ThemeProvider from './contexts/ThemeProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CarParkingProvider>
    <ThemeProvider>
      <BodyProvider>
        <App />
      </BodyProvider> 
    </ThemeProvider>
  </CarParkingProvider>
);

reportWebVitals();
