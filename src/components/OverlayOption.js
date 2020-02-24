import React from 'react';

export default class OverlayOption extends React.Component {

    buttonRef;

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
                className={this.props.className}
            >
                {this.props.option.image &&
                    <img alt="" src={this.props.option.image} />
                }
                <span
                    ref={ref => this.buttonRef = ref}
                    onClick={() => this.selectOption()}
                    onFocus={() => this.triggerFocus()}
                    onMouseEnter={() => this.triggerFocus()}
                >
                    {props.option.value}
                </span>
            </li>
        )
    }   

}
