import React from 'react';
import { Provider as ReduxProvider } from "react-redux";
import './App.css';
import 'draft-js/dist/Draft.css'

import configureStore from "./modules/store";
import FlowEditor from './components/FlowEditor.hoc';

const reduxStore = configureStore(window.REDUX_INITIAL_DATA);

function App() {

  return (
    <ReduxProvider store={reduxStore}>
      <FlowEditor>
      </FlowEditor>
    </ReduxProvider>
  );
}

export default App;
