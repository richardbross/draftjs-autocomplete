
import React from 'react';
import Overlay from '../components/Overlay.hoc'

import './AutocompleteManager.styles.css';
import hashtags from '../constants/hashtags';

class AutocompleteManager extends React.Component {
    
  setActiveOverlay = (uuid, overlayActive) => {
    this.props.setActiveOverlay(uuid, overlayActive);
  }
  
  render() {
    const { props } = this;
    
    return (
      <div className="AutocompleteManager">
        {
          props.autocompletes.map((autocomplete) => (
            <Overlay
              key={autocomplete.uuid}
              overlayActive={autocomplete.overlayActive}
              setActiveOverlay={this.setActiveOverlay}
              editor={props.editor}
              editorState={props.editorState}
              setEditorState={props.setEditorState}
              autocomplete={autocomplete}
              options={hashtags}
            />
          ))}
      </div>
    );
  } 
}

export default AutocompleteManager;