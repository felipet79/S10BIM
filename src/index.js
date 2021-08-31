import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'devextreme/dist/css/dx.light.css';
import './styles/main.css';

import { Provider } from "react-redux";
import store from "./store";

//import config from 'devextreme-react/core/config';
//config({ useLegacyTemplateEngine: false });

ReactDOM.render(
  <React.StrictMode enabled={false}>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
