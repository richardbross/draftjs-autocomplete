import React  from 'react';
import classnames from 'classnames';
import { EditorState, Modifier} from 'draft-js';
import { toJS } from 'immutable'
import './Overlay.styles.css';
import OverlayOption from './OverlayOption';

export default class Overlay extends React.Component {

    constructor(props) {
        super(props);

    }

    state = {
        focusedIndex: 0,
        filteredOptions: []
    }

    componentWillMount() {
        
        this.setState({filteredOptions: this.props.options
            .filter(option => option.includes(this.props.autocomplete.decorator.decoratedText.toLowerCase().replace(/#/g, ''))) });
            
    }

    componentDidMount() {
        this.keypress = window.addEventListener('keydown', this.handleKeypress);
    
        if(this.ref && this.ref.current) {
            this.ref.current.focus();
        }
        
        this.updateActiveOption(this.state.filteredOptions[0]);
    }

    componentWillReceiveProps(newProps) {

        console.log(newProps.autocomplete.decorator.decoratedText, this.state.filteredOptions);
        
        this.setState({filteredOptions: newProps.options
            .filter(option => option.includes(newProps.autocomplete.decorator.decoratedText.toLowerCase().replace(/#/g, ''))) });
    }

    componentWillUnmount() {
        if(this.keypress) {
            window.removeEventListener(this.keypress);
        }
    }

    updateActiveOption = (option) => {
        this.props.updateActiveOption(this.props.autocomplete.uuid, option);
        this.setState({ focusedIndex: this.state.filteredOptions.indexOf(option) })
    }

    updateSelectedOption = (option) => {

        const { state, setState, props } = this;

        this.setState({ focusedIndex: state.filteredOptions.indexOf(option) })   

        const currentContent = props.editorState.getCurrentContent();
        let currentSelection = props.editorState.getSelection();

        let contentState = props.editorState.getCurrentContent();
        // console.log(props.autocomplete.decorator);
        
        const blockText = props.editorState.getCurrentContent().getBlockMap().get(this.props.autocomplete.decorator.blockKey).get('text');
        
        const searchText = this.props.autocomplete.decorator;

        const { decorator } = props.autocomplete

        currentSelection = currentSelection.merge({
            focusOffset: decorator.end,
            anchorOffset: decorator.start,
        });
        
        const insertText = Modifier.replaceText(
            currentContent,
            currentSelection,
            this.state.filteredOptions[this.state.focusedIndex]
        );

        this.props.setEditorState(EditorState.push(this.props.editorState, insertText, 'insert-characters'));

    }

    handleArrowpress($event) {
        let newFocusedIndex;

        switch ($event.code) {
            case 'Tab':
                newFocusedIndex = $event.shiftKey
                    ? Math.max(0, this.state.focusedIndex-1) 
                    : Math.min(this.state.filteredOptions.length-1, this.state.focusedIndex+1);
            break;
            case 'ArrowUp':
                newFocusedIndex = Math.max(0, this.state.focusedIndex-1);
            break;
            case 'ArrowDown':
                newFocusedIndex = Math.min(this.state.filteredOptions.length-1, this.state.focusedIndex+1);
            break;
            default:
            break;

        }
                
        $event.stopPropagation();
        $event.preventDefault();
        this.updateActiveOption(this.state.filteredOptions[newFocusedIndex]);
    }

    handleKeypress = ($event) => {
        switch ($event.code) {
            case 'Tab':
            case 'ArrowUp':
            case 'ArrowDown':
                this.handleArrowpress($event);
                break;
            case 'Enter':
                $event.stopPropagation();
                $event.preventDefault();
                this.updateSelectedOption(this.state.filteredOptions[this.focusedIndex]);
            default:
                break;
        }
    }

    render() {
        const { props } = this;
        // const autocompleteRef = props.autocomplete.ref;
        
        return (
            <ul ref={ref => this.ref = ref} style={{top: props.autocomplete.rect.bottom, left: props.autocomplete.rect.left}} className={classnames({'Overlay': true, active: props.active})}>
                {this.state.filteredOptions.length > 0 && this.state.filteredOptions
                    .map((option, i) => (
                        <OverlayOption
                            index={i}
                            key={option}
                            updateActiveOption={this.updateActiveOption}
                            updateSelectedOption={this.updateSelectedOption}
                            option={option}
                            active={this.props.autocomplete.active === option}
                            selected={this.props.autocomplete.selected === option}
                            className={classnames({
                                active: i === this.state.focusedIndex
                        })}>
                            <button ref={ref => this.ref = ref}>{option}</button>
                        </OverlayOption>
                    ))
                }
            </ul>
        )
    }
}
