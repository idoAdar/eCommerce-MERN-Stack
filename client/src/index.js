import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

// BootstrapWatch:
import './bootstrap.min.css';

// Router:
import { BrowserRouter } from 'react-router-dom';

// Redux:
import { createStore, compose ,applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import productsReducer from './store/reducers/productsReducer';
import cartReducer from './store/reducers/cartReducer';
import userReducer from './store/reducers/userReducer';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  productsReducer,
  cartReducer,
  userReducer
})

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
  document.getElementById('root')
);

reportWebVitals();