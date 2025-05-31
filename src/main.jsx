import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './index.css';
import { PrivyProvider } from '@privy-io/react-auth';
import { StateContextProvider } from './context/Index';

// ✅ Add these two lines for Buffer support in browser
import { Buffer } from 'buffer';
window.Buffer = Buffer;

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <PrivyProvider
    appId="cm900q9at010vju0m6dw295zd"
    config={{
      appearance: {
        theme: 'dark',
      },
    }}
  >
    <Router>
      <StateContextProvider>
        <App />
      </StateContextProvider>
    </Router>
  </PrivyProvider>
);
