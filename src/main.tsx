import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { BrowserRouter } from "react-router-dom";
import RootStore from "./stores/root";
import { RootStoreContex } from "./stores/root-context";
import './index.css';
import './firebase.ts';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    supportedLngs: ['en', 'ru'],
    fallbackLng: 'ru',
    detection: {
      order: ['cookie', 'localStorage', 'htmlTag', 'path', 'subdomain'],
      caches: ['cookie']
    },
    backend: {
      loadPath: '/locales/{{lng}}/translation.json'
    }
  })

ReactDOM.createRoot(document.getElementById('root')!).render(

      <RootStoreContex.Provider value={new RootStore}>
        <BrowserRouter>
          <App/>
        </BrowserRouter>
      </RootStoreContex.Provider>

)
