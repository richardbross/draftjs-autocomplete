import { createStore } from "redux";

import flowReducer from "./reducer";

export default function configureStore(initialState) {
  const store = createStore(flowReducer, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
  return store;
}