import React from 'react';
import './HashtagDecorator.styles.css';
import hashtags from '../constants/hashtags';
import uuid from 'uuid';


const options = hashtags;

export class HashtagDecorator extends React.Component {

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
            text: this.ref.current.innerText
        });
    }

    componentWillUnmount() {
        this.props.deleteAutocomplete(this.uuid);
    }

    componentDidUpdate() {
        var rect = this.ref.current.getBoundingClientRect();  
        const { start, end, blockKey, decoratedText } = this.props;
        if(this.ref) {
            this.props.updateAutocomplete(this.uuid, {
                rect,
                decorator: { start, end, blockKey, decoratedText },
                text: this.ref.current.innerText
            });
        }
    }

    render() {
        const {props} = this;
        
        return (
            <span ref={this.ref} className="HashtagDecorator">
                {props.children}
            </span>
        );
    }
};
