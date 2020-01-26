import React, { useState, useRef } from 'react';
import { Provider as ReduxProvider } from "react-redux";
import { Editor, EditorState } from 'draft-js';
import './App.css';
import 'draft-js/dist/Draft.css'

import configureStore from "./modules/store";
import AutocompleteManager from './components/AutocompleteManager.hoc';
import { FlowDecorator } from './decorators';

const reduxStore = configureStore(window.REDUX_INITIAL_DATA);

function App() {

  const [editorState, setEditorState] = useState(EditorState.createEmpty(FlowDecorator))
  
  let editorRef = useRef(null);

  return (
    <div className="App">
      <ReduxProvider store={reduxStore}>
        <Editor
          ref={editorRef}
          editorState={editorState}
          onChange={setEditorState}
        ></Editor>
        <AutocompleteManager
          editor={editorRef}
          editorState={editorState}
          setEditorState={setEditorState}
        ></AutocompleteManager>
      </ReduxProvider>
    </div>
  );
}

export default App;
