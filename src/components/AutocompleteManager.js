
import React from 'react';
import Overlay from '../components/Overlay'

import './AutocompleteManager.styles.css';
import hashtags from '../constants/hashtags';

class AutocompleteManager extends React.Component {
  
  render() {
    const { props } = this;


    function isOverlayActive(autocomplete) {
      console.log(autocomplete, props.editorSelection.focusKey, props.editorSelection.focusOffset);

      return autocomplete.decorator &&
        autocomplete.decorator.blockKey === props.editorSelection.focusKey &&
        props.editorSelection.focusOffset >= autocomplete.decorator.start &&
        props.editorSelection.focusOffset <= autocomplete.decorator.end;
    }
    
    return (
      <div className="AutocompleteManager">
        {props.autocompletes && props.autocompletes.map((autocomplete) => (autocomplete.text && <Overlay active={isOverlayActive(autocomplete)} key={autocomplete.uuid} autocomplete={autocomplete} options={hashtags} />))}
      </div>
    );
  } 
}

export default AutocompleteManager;