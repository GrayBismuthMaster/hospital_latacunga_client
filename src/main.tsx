import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

//REDUX

import { Provider } from 'react-redux';
//Creamos un middleware para redux thunk y manejar async await 
import {compose, createStore, applyMiddleware, combineReducers } from 'redux';
//Reducer de redux
import * as reducers from '../redux/reducers';

//Redux persist para el manejo en localStorage

import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';  
//Allow us to use persistor in app 
import { PersistGate } from 'redux-persist/integration/react';
import thunk from 'redux-thunk';

//IMPORT DE FORM REDUCER 
import {reducer as formReducer} from 'redux-form';

const userPersistConfig = {
  key:'auth',
  storage
};



const rootReducer = combineReducers({
  users: reducers.usersReducer ,
  auth : persistReducer(userPersistConfig, reducers.authReducer),
  profesionales : reducers.profesionalesReducer,
  consultorios : reducers.consultoriosReducer,
  especialidades : reducers.especialidadesReducer,
  historiasClinicas : reducers.historiasClinicasReducer,
  //FORM REDUCER
  form : formReducer
})


//In order to add redux dev tools on firefox we create a variable
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ;'
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose || compose
//In order to do code cleaner we are going to a variable called store

const store = createStore(rootReducer,composeEnhancers( applyMiddleware(thunk)));
// const store = createStore(rootReducer,applyMiddleware(thunk));
//Store persist
export const persistor = persistStore(store);



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />  
      </PersistGate>
    </Provider>
  </React.StrictMode>
)

