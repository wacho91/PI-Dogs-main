import { legacy_createStore as createStore, applyMiddleware } from 'redux';//funciones de redux para crear la store y para aplicarle los middlewares
import { composeWithDevTools } from 'redux-devtools-extension'; //permite en el navegador ver las devtools
import thunk from 'redux-thunk'; //middleware para hacer peticiones asincronas
import rootReducer from './reducer'; //traemos el reducer

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;