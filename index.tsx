
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// جلوگیری از خطای ReferenceError: process is not defined در محیط GitHub Pages
if (typeof (window as any).process === 'undefined') {
  (window as any).process = { env: { API_KEY: "" } };
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

try {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );

  // اطلاع به سیستم برای حذف لودر HTML
  if ((window as any).hideMainLoader) {
    (window as any).hideMainLoader();
  }
} catch (err) {
  console.error("Mounting Error:", err);
  const errDisplay = document.getElementById('error-display');
  const errMsg = document.getElementById('error-message');
  if (errDisplay && errMsg) {
    errDisplay.style.display = 'flex';
    errMsg.innerText = String(err);
  }
}
