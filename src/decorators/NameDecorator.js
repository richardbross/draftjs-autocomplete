import React from 'react';
import AutocompleteDecorator from './AutocompleteDecorator';

export default class NameDecorator extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        const {props} = this;
        
        return (
            <span className="AutocompleteDecorator NameDecorator">
                {props.children}
            </span>
        );
    }
};
