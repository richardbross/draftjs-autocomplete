
import React from 'react';
import {Editor, EditorState} from 'draft-js';

import 'draft-js/dist/Draft.css'
import { FlowDecorator } from '../decorators';

class FlowEditor extends React.Component {
  
  constructor(props) {
    super(props);
  }

  render() {
    // console.log('render', this.props.editorState);

    return (
      <Editor
        editorState={this.props.editorState}
        onChange={this.props.setEditorState}
      />
    );
  }
  
}

export default FlowEditor;