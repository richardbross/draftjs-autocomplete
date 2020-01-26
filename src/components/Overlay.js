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

    isOverlayActive = (autocomplete) => {
      const editorSelection = this.props.editorState.getSelection();
      return autocomplete.decorator && autocomplete.decorator &&
        autocomplete.decorator.blockKey === editorSelection.focusKey &&
        editorSelection.focusOffset >= autocomplete.decorator.start &&
        editorSelection.focusOffset <= autocomplete.decorator.end;
    }

    componentDidMount() {
        this.keypress = this.ref.addEventListener('keydown', this.handleKeypress);
    
        this.updateActiveOption(this.props.autocomplete.filteredOptions[0]);
    }

    componentWillReceiveProps(newProps) {
        
        this.props.setActive(this.props.autocomplete.uuid, this.isOverlayActive(newProps.autocomplete))
    }
    
    componentWillUpdate() {
        this.props.setActive(this.props.autocomplete.uuid, this.isOverlayActive(this.props.autocomplete))
    }

    componentDidUpdate(prevProps, newProps) {
        if(!prevProps.active && newProps.active) {
            this.ref.focus();
        }
    }

    componentWillUnmount() {
        if(this.props.editor && this.props.editor.current) {
            this.props.editor.current.focus();
        }
        this.ref.removeEventListener('keydown', this.keypress);
    }

    updateActiveOption = (option) => {
        this.props.updateActiveOption(this.props.autocomplete.uuid, option);
        
        this.setState({ focusedIndex: this.props.autocomplete.filteredOptions.indexOf(option) })
    }

    updateSelectedOption = (option) => {

        const { state, props } = this;

        this.setState({ focusedIndex: props.autocomplete.filteredOptions.indexOf(option) })   

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
            this.props.autocomplete.filteredOptions[this.state.focusedIndex]
        );

        this.props.setEditorState(EditorState.push(this.props.editorState, insertText, 'insert-characters'));
        
        this.props.setActive(this.props.autocomplete.uuid, false)
        
        setTimeout(() => {    
            this.props.editor.current.focus();
        }, 10);
    }

    handleArrowpress($event) {
        let newFocusedIndex;

        switch ($event.code) {
            case 'Tab':
                newFocusedIndex = $event.shiftKey
                    ? Math.max(0, this.state.focusedIndex-1) 
                    : Math.min(this.props.autocomplete.filteredOptions.length-1, this.state.focusedIndex+1);
            break;
            case 'ArrowUp':
                newFocusedIndex = Math.max(0, this.state.focusedIndex-1);
            break;
            case 'ArrowDown':
                newFocusedIndex = Math.min(this.props.autocomplete.filteredOptions.length-1, this.state.focusedIndex+1);
            break;  
            default:
            break;

        }
                
        $event.stopPropagation();
        $event.preventDefault();
        this.setState({focusedIndex: newFocusedIndex});
        this.updateActiveOption(this.props.autocomplete.filteredOptions[newFocusedIndex]);
    }

    handleKeypress = ($event) => {
        switch ($event.code) {
            case 'Tab':
            case 'ArrowUp':
            case 'ArrowDown':
                // console.log('handling keypress for', this.props.autocomplete.uuid)
                this.handleArrowpress($event);
                break;
            case 'Enter':
                $event.stopPropagation();
                $event.preventDefault();
                // console.log('handling enter for', this.props.autocomplete.uuid, this.props.autocomplete.filteredOptions[this.focusedIndex])
                this.updateSelectedOption(this.props.autocomplete.filteredOptions[this.focusedIndex]);
            default:
                break;
        }
    }

    render() {
        const { props } = this;
        // const autocompleteRef = props.autocomplete.ref;
        
        console.log(this.props.autocomplete);
        
        return (
            <ul tabIndex="1" ref={ref => this.ref = ref} style={{top: props.autocomplete.rect.bottom, left: props.autocomplete.rect.left}} className={classnames({'Overlay': true, active: props.active})}>
                {this.props.autocomplete.filteredOptions.length > 0 && this.props.autocomplete.filteredOptions
                    .map((option, i) => (
                        <OverlayOption
                            index={i}
                            key={option}
                            editor={this.props.editor}
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
