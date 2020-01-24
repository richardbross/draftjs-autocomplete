import React from 'react';
import './Overlay.styles.css';

export default (props) => {
    const ref = props.autocomplete.ref;
    
    return (
        <ul className="Overlay" style={{top: props.autocomplete.rect.bottom, left: props.autocomplete.rect.left}}>
            {props.options
                .filter(option => option.includes(props.autocomplete.text.toLowerCase().replace(/#/g, '')))
                .map((option) => (<li key={option}>{option}</li>))
            }
        </ul>
    )
}   