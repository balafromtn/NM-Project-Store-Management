import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { InventoryProvider } from './context/InventoryContext';
import { CartProvider } from './context/CartContext';
import { SalesProvider } from './context/SalesContext';
import { Toaster } from 'react-hot-toast';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <InventoryProvider>
      <CartProvider>
        <SalesProvider>
          <App />
          <Toaster position="top-right" />
        </SalesProvider>
      </CartProvider>
    </InventoryProvider>
  </React.StrictMode>
);
