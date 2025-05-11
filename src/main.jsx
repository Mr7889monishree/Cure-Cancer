import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter as Router} from 'react-router-dom'
import App from './App'
import './index.css'
import {PrivyProvider} from '@privy-io/react-auth';
import { StateContextProvider } from './context/Index'


const root = ReactDOM.createRoot(document.getElementById("root"));
//rendering our app to root element
root.render(
    //adding privy provider code for authentication once our app starts
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
 
)