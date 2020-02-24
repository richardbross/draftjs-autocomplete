import React  from 'react';
import classnames from 'classnames';
import { selectOption } from '../modifiers/replace-text'
import './Overlay.styles.css';
import OverlayOption from './OverlayOption';

export default class Overlay extends React.Component {

    state = {
        focusedIndex: 0,
        filteredOptions: []
    }

    componentDidMount() { this.updateActiveOption(this.props.autocomplete.filteredOptions[0]) }

    componentDidUpdate(prevProps, newProps) {
        if(!prevProps.overlayActive && newProps.overlayActive) {
            this.ref.focus();
        }
    }

    componentWillUnmount() {
        if(this.props.editor && this.props.editor.current) {
            this.props.editor.current.focus();
        }
    }

    updateActiveOption = (option) => {
        this.props.updateActiveOption(this.props.autocomplete.uuid, option);
    }

    updateSelectedOption = (option) => {

        const { props: {editorState, setEditorState, autocomplete, editor} } = this;

        selectOption(editorState, setEditorState, autocomplete);
        
        setTimeout(() => {    
            editor.current.focus();
        }, 10);
    }

    render() {
        const { props } = this;
        
        return (
            <ul
                ref={ref => this.ref = ref}
                style={{top: props.autocomplete.rect.bottom, left: props.autocomplete.rect.left}}
                className={classnames({
                    'Overlay': true,
                    active: props.overlayActive && this.props.autocomplete.filteredOptions.length
                })}
            >
               {this.props.autocomplete.filteredOptions.length > 0 && this.props.autocomplete.filteredOptions
                    .map((option, i) => (
                        <OverlayOption
                            index={i}
                            key={option.value}
                            editor={this.props.editor}
                            updateActiveOption={this.updateActiveOption}
                            updateSelectedOption={this.updateSelectedOption}
                            option={option}
                            active={this.props.autocomplete.activeOption === option}
                            selected={this.props.autocomplete.selected === option}
                            className={classnames({
                                active: this.props.autocomplete.activeOption && option.value === this.props.autocomplete.activeOption.value
                        })}>
                            <span ref={ref => this.ref = ref}>{option}</span>
                        </OverlayOption>
                    ))
                }
            </ul>
        )
    }
}
