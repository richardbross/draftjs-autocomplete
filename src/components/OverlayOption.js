import React from 'react';
import classnames from 'classnames';

export default class OverlayOption extends React.Component {

    constructor(props) {
        super(props);
    }

    buttonRef;

    selectOption = () => {
        console.log('select');
        
        this.props.updateSelectedOption(this.props.option);
    }

    triggerFocus = () => {
        this.props.updateActiveOption(this.props.option);
    }

    render() {
        const { props } = this;
        // const autocompleteRef = props.autocomplete.ref;

        console.log(this.props.option);
        
        return (
            <li
                key={props.option}
                className={this.props.className}
            >
                {this.props.option.image &&
                    <img src={this.props.option.image} />
                }
                <button
                    ref={ref => this.buttonRef = ref}
                    onClick={() => this.selectOption()}
                    onFocus={() => this.triggerFocus()}
                    onMouseEnter={() => this.triggerFocus()}
                >
                    {props.option.value}
                </button>
            </li>
        )
    }   

}
