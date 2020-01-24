
import React from 'react';

export const HandleDecorator = props => {
    return (
        <span {...props} className="HandleDecorator">
            {props.children}
        </span>
    );
};