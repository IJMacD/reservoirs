import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './components/App'

const root = createRoot(document.getElementById('main'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);