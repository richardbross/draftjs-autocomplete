import React, { useState } from 'react';
import classnames from 'classnames';
import './Overlay.styles.css';

export default (props) => {
    const ref = props.autocomplete.ref;

    const [focusedIndex, setFocusedIndex] = useState(0);

    const filteredOptions = props.options
        .filter(option => option.includes(props.autocomplete.text.toLowerCase().replace(/#/g, '')));
    
    return (
        <ul style={{top: props.autocomplete.rect.bottom, left: props.autocomplete.rect.left}} className={classnames({'Overlay': true, active: props.active})}>
            {filteredOptions.length > 0 && filteredOptions
                .map((option, i) => (<li key={option} className={classnames({active: i === focusedIndex})}><button>{option}</button></li>))
            }
        </ul>
    )
}   