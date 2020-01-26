
import React from 'react';
import Overlay from '../components/Overlay.hoc'

import './AutocompleteManager.styles.css';
import hashtags from '../constants/hashtags';

class AutocompleteManager extends React.Component {
    
  setActive = (uuid, active) => {
    this.props.setActiveOverlay(uuid, active);
  }
  
  componentWillReceiveProps() {
    const text = this.props.editorState.toJS().currentContent.blockMap[this.props.editorState.toJS().currentContent.selectionAfter.anchorKey].text
    
    this.forceUpdate();
    
  }
  
  render() {
    const { props } = this;
    
    return (
      <div className="AutocompleteManager">
        {
          props.autocompletes.map((autocomplete) => (
            <Overlay
              key={autocomplete.uuid}
              active={autocomplete.overlayActive}
              setActive={this.setActive}
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