
import React, { useState, useRef } from 'react';
import { Editor, EditorState, getDefaultKeyBinding } from 'draft-js';
import AutocompleteManager from './AutocompleteManager.hoc';
import { FlowDecorator } from '../decorators';
import { selectOption } from '../modifiers/replace-text'

import 'draft-js/dist/Draft.css'

const FlowEditor = ({ autocompletes, setActiveOverlay, updateActiveOption }) => {

  const [editorState, setEditorState] = useState(EditorState.createEmpty(FlowDecorator))

  const setEditorStateMiddleman = (state) => {
    const selection = state.getSelection().toJS();
    
    autocompletes.forEach(auto => {
      const isFocused = selection.focusKey === auto.decorator.blockKey && auto.decorator.start <= selection.anchorOffset && auto.decorator.end >= selection.anchorOffset;

      if(!auto.activeOption) {
        updateActiveOption(
          auto.uuid,
          auto.filteredOptions[0]
        );
      }
      
      setActiveOverlay(auto.uuid, isFocused);
    });

    setEditorState(state);
  }

  const keyBindingFn = ($event) => {
    const selection = editorState.getSelection().toJS();
    const activeOverlay = autocompletes.find(auto => auto.overlayActive && auto.decorator.start <= selection.anchorOffset && auto.decorator.end >= selection.anchorOffset);
    
    switch ($event.key) {
      case 'ArrowDown':
        return activeOverlay ? {name: 'focus-next-option', payload: activeOverlay} : getDefaultKeyBinding($event);
      case 'ArrowUp':
        return activeOverlay ? {name: 'focus-prev-option', payload: activeOverlay} : getDefaultKeyBinding($event);
      case 'Enter':
      case 'Tab':
        return activeOverlay ? {name: 'select-option', payload: activeOverlay} : getDefaultKeyBinding($event);
    }
    
    return getDefaultKeyBinding($event);
  }

  function handleKeyCommand($event) {
    switch ($event.name) {
      case 'focus-prev-option':
      case 'focus-next-option':
          const activeIndex = $event.payload.filteredOptions.indexOf($event.payload.activeOption);
          let newIndex = activeIndex;

          newIndex = $event.name === 'focus-next-option' ? newIndex + 1 : newIndex - 1;
          newIndex = Math.max(Math.min(newIndex, $event.payload.filteredOptions.length-1), 0)
          
          updateActiveOption(
            $event.payload.uuid,
            $event.payload.filteredOptions[newIndex]
          );
        return 
      case 'select-option':
        selectOption(editorState, setEditorState, $event.payload)
      break;
    }
  }
  
  let editorRef = useRef(null);
  
  return (
    <div className="App">
      <Editor
          ref={editorRef}
          editorState={editorState}
          onChange={setEditorStateMiddleman}
          keyBindingFn={keyBindingFn}
          handleKeyCommand={handleKeyCommand}
      />
      <AutocompleteManager
        editor={editorRef}
        editorState={editorState}
        setEditorState={setEditorStateMiddleman}
      ></AutocompleteManager>
    </div>
  )
}

export default FlowEditor;