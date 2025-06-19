
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { HashRouter} from "react-router-dom";
import {store} from "./redux/store.ts";
import {Provider} from "react-redux";


createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
      <HashRouter>
          <App />
      </HashRouter>
  </Provider>

)
