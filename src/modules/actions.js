// types of action
const Types = {
    CREATE_AUTOCOMPLETE: "CREATE_AUTOCOMPLETE",
    DELETE_AUTOCOMPLETE: "DELETE_AUTOCOMPLETE",
    UPDATE_AUTOCOMPLETE_REF: "UPDATE_AUTOCOMPLETE_REF",
    SET_EDITOR_STATE: "SET_EDITOR_STATE",
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
  
  const updateAutocomplete = (uuid, ref) => ({
    type: Types.UPDATE_AUTOCOMPLETE_REF,
    payload: {
      uuid,
      ...ref,
    }
  });
  
  export default {
    createAutocomplete,
    deleteAutocomplete,
    updateAutocomplete,
    setEditorState,
    Types
  };