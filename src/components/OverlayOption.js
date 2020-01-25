import React, { useState, useRef } from 'react';
import classnames from 'classnames';

export default class OverlayOption extends React.Component {

    constructor(props) {
        super(props);
    }

    buttonRef;

    state = {
        focusedIndex: 0,
        active: false
    }

    componentWillUpdate(props) {
        if(!this.props.active && props.active) {
            // console.log(this.props.index);
        }
        
    }

    componentDidMount() {
        // console.log(this.props.defaultActive);
        
        if(this.props.defaultActive) {
            this.props.updateActiveOption(this.props.option);
            this.buttonRef.current.focus()
        }
    }

    selectOption = () => {
        this.props.updateSelectedOption(this.props.option);
    }

    triggerFocus = () => {
        this.props.updateActiveOption(this.props.option);
    }

    render() {
        const { props } = this;
        // const autocompleteRef = props.autocomplete.ref;
        
        return (
            <li
                key={props.option}
                className={classnames({active: this.props.active || this.props.selected})}
            >
                <button
                    ref={ref => this.buttonRef = ref}
                    onClick={() => this.selectOption()}
                    onFocus={() => this.triggerFocus()}
                    onMouseEnter={() => this.triggerFocus()}
                >
                    {props.option}
                </button>
            </li>
        )
    }   

}
