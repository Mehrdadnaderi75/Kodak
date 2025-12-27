
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// اطمینان از تعریف process در سطح ماژول
if (typeof (window as any).process === 'undefined') {
  (window as any).process = { env: { API_KEY: "" } };
}

const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error("Root element not found!");
} else {
  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );

    // بعد از رندر موفق، لودر را مخفی می‌کنیم
    if (typeof (window as any).hideMainLoader === 'function') {
      (window as any).hideMainLoader();
    }
  } catch (err) {
    console.error("React Rendering Error:", err);
    const errDisplay = document.getElementById('error-display');
    const errMsg = document.getElementById('error-message');
    if (errDisplay && errMsg) {
      errDisplay.style.display = 'flex';
      errMsg.innerText = err instanceof Error ? err.stack : String(err);
    }
  }
}
