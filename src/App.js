import React from 'react';
import { Provider as ReduxProvider } from "react-redux";
import FlowEditor from './components/FlowEditor.hoc';
import './App.css';

import configureStore from "./modules/store";
import AutocompleteManager from './components/AutocompleteManager.hoc';

const reduxStore = configureStore(window.REDUX_INITIAL_DATA);

function App() {
  return (
    <div className="App">
      <ReduxProvider store={reduxStore}>
        <FlowEditor></FlowEditor>
        <AutocompleteManager></AutocompleteManager>
      </ReduxProvider>
    </div>
  );
}

export default App;
