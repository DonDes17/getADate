import React from 'react';
import { Provider } from 'react-redux';
import { logger } from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import EStyleSheet from 'react-native-extended-stylesheet';
import Router from './config/router';
import rootSaga from './redux/sagas/characterSagas';
import characterReducer from './redux/reducers/characterReducer';


EStyleSheet.build({
  $primaryColor: '#3C4550',
  $secondaryColor: '#87CB8F',
  $lightBG: '#fefefe',
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  characterReducer,
  applyMiddleware(sagaMiddleware, logger),
);

sagaMiddleware.run(rootSaga);

export default () => (
  <Provider store={store}>
    <Router />
  </Provider>
);
