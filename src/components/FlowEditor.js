
import React from 'react';
import {Editor} from 'draft-js';

import 'draft-js/dist/Draft.css'

const FlowEditor = ({setDomEditorRef, editorState, setEditorState}) => (
  <Editor
    ref={ref => global.editor = ref}
    editorState={editorState}
    onChange={setEditorState}
  />
)

export default FlowEditor;