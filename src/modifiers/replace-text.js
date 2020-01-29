import { EditorState, Modifier} from 'draft-js';

export function selectOption(editorState, setEditorState, autocomplete) {

    const currentContent = editorState.getCurrentContent();
    let currentSelection = editorState.getSelection();
    
    const blockText = currentContent.getBlockMap().get(autocomplete.decorator.blockKey).get('text');

    const { decorator } = autocomplete

    let needToAddLeadingSpace = decorator.start !== 0 && blockText.slice(decorator.start - 1, decorator.start) !== ' ';
    let needToAddTrailingSpace = decorator.end === blockText.length || blockText.slice(decorator.end, decorator.end + 1) !== ' ';

    currentSelection = currentSelection.merge({
        focusOffset: decorator.end,
        anchorOffset: decorator.start,
    });

    const focusedOption = (autocomplete.activeOption).value;

    const paddedReplaceString = 
        (needToAddLeadingSpace ? ' ' : '')
        + focusedOption
    
    const insertText = Modifier.replaceText(
        currentContent,
        currentSelection,
        paddedReplaceString,
    );

    let draftState = EditorState.push(editorState, insertText, 'insert-characters');
    
    var selectionState = editorState.getSelection();

    setEditorState(draftState);

    const newCursorPosition = decorator.start + paddedReplaceString.length

    draftState = EditorState.forceSelection(draftState, selectionState.merge({focusOffset:newCursorPosition, anchorOffset: newCursorPosition}));

    setEditorState(draftState);
}