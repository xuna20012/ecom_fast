import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { initializeAllAnimations } from './utils/animations';

// Initialize animations
initializeAllAnimations();

// Update page title
document.title = 'Nettoyeur oreilles';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);