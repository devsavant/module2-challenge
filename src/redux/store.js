import { createStore, applyMiddleware, combineReducers } from "redux"
import { combineEpics, createEpicMiddleware } from "redux-observable";
import { composeWithDevTools } from 'redux-devtools-extension';
import appReducer, { showCartEpic, hideCartEpic, getItemsEpic } from './appDuck'
import { addItemEpic, substractItemEpic, removeItemEpic } from './cartDuck'

const rootEpic = combineEpics(
  addItemEpic,
  substractItemEpic,
  removeItemEpic,
  showCartEpic,
  hideCartEpic,
  getItemsEpic
);

const epicMiddleware = createEpicMiddleware();

const rootReducer = combineReducers({
  // items: itemsReducer,
  app: appReducer
});

export default () => {
  // const store = createStore(rootReducer, applyMiddleware(thunk))
  const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(epicMiddleware)));
  epicMiddleware.run(rootEpic);
  return store;
}