// types of action
const Types = {
    CREATE_AUTOCOMPLETE: "CREATE_AUTOCOMPLETE",
    DELETE_AUTOCOMPLETE: "DELETE_AUTOCOMPLETE",
    UPDATE_AUTOCOMPLETE_REF: "UPDATE_AUTOCOMPLETE_REF",
    SET_EDITOR_STATE: "SET_EDITOR_STATE",
    UPDATE_ACTIVE_OPTION: "UPDATE_ACTIVE_OPTION",
    UPDATE_SELECTED_OPTION: "UPDATE_SELECTED_OPTION",
    MOVE_CURSOR: "MOVE_CURSOR",
  };
  // actions
  const createAutocomplete = (uuid, ref) => ({
    type: Types.CREATE_AUTOCOMPLETE,
    payload: { ...ref, uuid }
  });
  
  const deleteAutocomplete = uuid => ({
    type: Types.DELETE_AUTOCOMPLETE,
    payload: uuid
  });
  
  const setEditorState = state => ({
    type: Types.SET_EDITOR_STATE,
    payload: state
  });
  
  const updateAutocomplete = (uuid, state) => ({
    type: Types.UPDATE_AUTOCOMPLETE_REF,
    payload: {
      uuid,
      ...state,
    }
  });
  
  const updateSelectedOption = (uuid, option) => ({
    type: Types.UPDATE_SELECTED_OPTION,
    payload: {
      uuid,
      option,
    }
  });
  
  const updateActiveOption = (uuid, option) => ({
    type: Types.UPDATE_ACTIVE_OPTION,
    payload: {
      uuid,
      option,
    }
  });

  const moveCursor = (offset) => ({
    type: Types.MOVE_CURSOR,
    payload: {
      offset
    }
  });

  export default {
    createAutocomplete,
    deleteAutocomplete,
    updateAutocomplete,
    updateActiveOption,
    updateSelectedOption,
    setEditorState,
    moveCursor,
    Types
  };