import React, { useState } from 'react';
import { Provider as ReduxProvider } from "react-redux";
import FlowEditor from './components/FlowEditor';
import { EditorState } from 'draft-js';
import './App.css';

import configureStore from "./modules/store";
import AutocompleteManager from './components/AutocompleteManager.hoc';
import { FlowDecorator } from './decorators';

const reduxStore = configureStore(window.REDUX_INITIAL_DATA);

function App() {

  const [editorState, setEditorState] = useState(EditorState.createEmpty(FlowDecorator))
  
  return (
    <div className="App">
      <ReduxProvider store={reduxStore}>
        <FlowEditor
          editorState={editorState}
          setEditorState={setEditorState}
        ></FlowEditor>
        <AutocompleteManager
          editorState={editorState}
          setEditorState={setEditorState}
        ></AutocompleteManager>
      </ReduxProvider>
    </div>
  );
}

export default App;
