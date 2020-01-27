import React from 'react';
import './AutocompleteDecorator.styles.css';
import uuid from 'uuid';

export default class AutocompleteDecorator extends React.Component {

    constructor(props) {
        super(props)
    }

    ref = React.createRef();

    uuid;

    componentDidMount() {
        
        this.uuid = uuid();
        var rect = this.ref.current.getBoundingClientRect();    
        const { start, end, blockKey, decoratedText } = this.props;
        this.props.createAutocomplete(this.uuid, {
            rect,
            decorator: { start, end, blockKey, decoratedText },
            options: this.props.options,
            text: this.ref.current.innerText
        });
    }

    componentWillUnmount() {
        
        this.props.deleteAutocomplete(this.uuid);
    }

    componentDidUpdate() {

        this.updateAutocomplete(this.props);
    }

    updateAutocomplete(prevProps) {
        
        var rect = this.ref.current.getBoundingClientRect();  
        const { start, end, blockKey, decoratedText } = this.props;

        const editorSelection = this.props.contentState.get('selectionAfter').toJS();

        this.props.updateAutocomplete(this.uuid, {
            rect,
            decorator: { start, end, blockKey, decoratedText },
            options: this.props.options,
            text: decoratedText,
            overlayActive: (
                (prevProps && 
                    (
                        prevProps.start !== this.props.start
                        || prevProps.end !== this.props.end
                    )
                ) || (
                    this.props.blockKey === editorSelection.focusKey &&
                    editorSelection.focusOffset >= this.props.start &&
                    editorSelection.focusOffset <= this.props.end
                )
            ),
        });
    }
};
