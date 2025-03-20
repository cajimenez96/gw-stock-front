import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App.tsx';
import { persistor, store } from './redux/store.ts';
import './index.css';
import { Toaster } from 'sonner';
import { I18nextProvider } from 'react-i18next';
import { i18n } from './lib/i18n.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <I18nextProvider i18n={i18n}>
          <App />
          <Toaster
            duration={2000}
            toastOptions={{
              style: {
                background: 'rgba(22, 72, 99, 0.7)',
                color: '#fff',
                fontWeight: 900,
                padding: '1rem',
              },
            }}
          />
        </I18nextProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
