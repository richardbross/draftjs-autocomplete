import React from 'react';

export default class NameDecorator extends React.Component {

    render() {
        const {props} = this;
        
        return (
            <span className="AutocompleteDecorator NameDecorator">
                {props.children}
            </span>
        );
    }
};
