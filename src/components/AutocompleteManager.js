
import React from 'react';
import Overlay from '../components/Overlay'

import './AutocompleteManager.styles.css';
import hashtags from '../constants/hashtags';

class AutocompleteManager extends React.Component {
  
  render() {
    const { props } = this;
    
    return (
      <div className="AutocompleteManager">
        {props.autocompletes && props.autocompletes.map((autocomplete) => (autocomplete.text && <Overlay key={autocomplete.uuid} autocomplete={autocomplete} options={hashtags} />))}
      </div>
    );
}
  
}

export default AutocompleteManager;