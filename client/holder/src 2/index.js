import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import './index.css';
import registerServiceWorker from "./registerServiceWorker";
import { creatStore } from 'redux';
import { Provider } from 'redux';
import rootReducer from './reducers'

const store = creatStore(rootReducer)

ReactDOM.render(
    <Provider store={store}>
        <App /> 
    </Provider>,
    document.getElementById("root"));
registerServiceWorker();
