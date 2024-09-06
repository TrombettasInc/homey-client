import { StrictMode } from 'react';
import { AuthProviderWrapper } from "./context/auth.context";
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <AuthProviderWrapper>      
        <App />
      </AuthProviderWrapper>     
    </Router>
  </StrictMode>,
);
