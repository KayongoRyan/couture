import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import AdminApp from './AdminApp';
import './index.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

// Logic to switch between Client Storefront and Admin Panel
// In production, this would be handled by subdomain routing (admin.couturelafleur.com)
// For this demo, accessing /admin triggers the dashboard
const isAdmin = window.location.pathname.startsWith('/admin');

try {
  const root = ReactDOM.createRoot(rootElement);
  
  if (isAdmin) {
    // Admin Dashboard App
    root.render(
      <React.StrictMode>
        <AdminApp />
      </React.StrictMode>
    );
  } else {
    // Public Client App
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  }
} catch (error) {
  console.error("Application failed to render:", error);
  if (rootElement) {
    rootElement.innerHTML = `<div style="padding: 40px; text-align: center; font-family: sans-serif;">
      <h1>Application Error</h1>
      <p>Unable to load the application. Please check the console for details.</p>
    </div>`;
  }
}