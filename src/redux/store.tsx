import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import ReducerContainer from './reducers';
import SagaContainer from './sagas';

const middlewares = [];
if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}
const sagaMiddleware = createSagaMiddleware();

const store = createStore(ReducerContainer, applyMiddleware(...middlewares, sagaMiddleware));

sagaMiddleware.run(SagaContainer);

export default store;
