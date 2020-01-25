
import React from 'react';
import Overlay from '../components/Overlay.hoc'

import './AutocompleteManager.styles.css';
import hashtags from '../constants/hashtags';

class AutocompleteManager extends React.Component {

  isOverlayActive = (autocomplete) => {
    const editorSelection = this.props.editorState.getSelection();
    return autocomplete.decorator &&
      autocomplete.decorator.blockKey === editorSelection.focusKey &&
      editorSelection.focusOffset >= autocomplete.decorator.start &&
      editorSelection.focusOffset <= autocomplete.decorator.end;
  }
  
  render() {
    const { props } = this;
    
    return (
      <div className="AutocompleteManager">
        {
          props.autocompletes
          && props.autocompletes.map((autocomplete) => (
            autocomplete.text
            && <Overlay
              editorState={this.props.editorState}
              setEditorState={this.props.setEditorState}
              active={this.isOverlayActive(autocomplete)}
              key={autocomplete.uuid}
              autocomplete={autocomplete}
              options={hashtags}
            />  
          ))}
      </div>
    );
  } 
}

export default AutocompleteManager;