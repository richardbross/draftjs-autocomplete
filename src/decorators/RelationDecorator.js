import React from 'react';
import AutocompleteDecorator from './AutocompleteDecorator';

export default class RelationDecorator extends AutocompleteDecorator {

    ref = React.createRef();

    uuid;

    render() {
        const {props} = this;
        
        return (
            <span ref={this.ref} className="AutocompleteDecorator RelationDecorator">
                {props.children}
            </span>
        );
    }
};
