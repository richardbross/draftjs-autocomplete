
import React from 'react';
import {Editor} from 'draft-js';

import 'draft-js/dist/Draft.css'

class FlowEditor extends React.Component {
  
constructor(props) {
    super(props);
  }

  render() {
    console.log(this);
    
    return (
      <Editor
        editorState={this.props.editorState}
        onChange={this.props.setEditorState}
      />
    );
  }
  
}

export default FlowEditor;