
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { BrowserRouter } from "react-router-dom";
import RootStore from "./stores/root";
import { RootStoreContex } from "./stores/root-context";
import './index.css';
import './firebase.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(

      <RootStoreContex.Provider value={new RootStore}>
        <BrowserRouter>
          <App/>
        </BrowserRouter>
      </RootStoreContex.Provider>

)
