import React, { useState, useRef } from 'react';
import classnames from 'classnames';
import './Overlay.styles.css';
import { render } from '@testing-library/react';

export default class Overlay extends React.Component {

    constructor(props) {
        super(props);
    }

    state = {
        focusedIndex: 0
    }

    render() {
        const { props } = this;
        const autocompleteRef = props.autocomplete.ref;
    
        if(this.ref && this.ref.current) {
            this.ref.current.focus();
        }
    
        const filteredOptions = props.options
            .filter(option => option.includes(props.autocomplete.text.toLowerCase().replace(/#/g, '')));
        
        return (
            <ul ref={ref => this.ref = ref} style={{top: props.autocomplete.rect.bottom, left: props.autocomplete.rect.left}} className={classnames({'Overlay': true, active: props.active})}>
                {filteredOptions.length > 0 && filteredOptions
                    .map((option, i) => (<li key={option} className={classnames({active: i === this.state.focusedIndex})}><button>{option}</button></li>))
                }
            </ul>
        )
    }   

}
