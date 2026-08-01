import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from '@/App';
import ScrollToTop from '@/components/ScrollToTop';
import '@/index.css';

const routerBase = import.meta.env.BASE_URL === './' ? '/' : import.meta.env.BASE_URL;

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <BrowserRouter basename={routerBase}>
      <ScrollToTop />
      <App />
    </BrowserRouter>
  </>
);
