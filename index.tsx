
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');

if (rootElement) {
  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    
    // Attempt to hide loader if successfully rendered
    if (typeof (window as any).hideAppLoader === 'function') {
      (window as any).hideAppLoader();
    }
  } catch (err) {
    console.error("React mounting error:", err);
    if (typeof (window as any).showAppError === 'function') {
      (window as any).showAppError(err instanceof Error ? err.stack : String(err));
    }
  }
}
