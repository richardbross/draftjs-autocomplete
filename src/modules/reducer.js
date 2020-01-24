import ACTIONS from "./actions";
import _ from "lodash";
import {EditorState} from 'draft-js';
import {FlowDecorator} from '../decorators/index'

const defaultState = {
  ui: {
    autocompletes: []
  },
  editor: EditorState.createEmpty(FlowDecorator),
};  

const flowReducer = (state = defaultState, action) => {
  console.log(action);
  
  switch (action.type) {

    case ACTIONS.Types.SET_EDITOR_STATE: {

      const newEditorState = action.payload;

      return {
        ...state,
        editor: newEditorState,
      };
    }

    case ACTIONS.Types.CREATE_AUTOCOMPLETE: {

      let newItem = { ...action.payload };
      let newAutocompletesState = _.cloneDeep(state.ui.autocompletes);
      newAutocompletesState.push(newItem);

      return {
        ...state,
        ui: {
          autocompletes: newAutocompletesState,
        }
      };
    }

    case ACTIONS.Types.UPDATE_AUTOCOMPLETE_REF: {
      
      let newAutocompletesState = _.cloneDeep(state.ui.autocompletes);
      let index = _.findIndex(newAutocompletesState, { uuid: action.payload.uuid });
      let updatedAutocomplete = _.cloneDeep(newAutocompletesState[index]);
      updatedAutocomplete.ref = action.payload.ref;
      newAutocompletesState.splice(index, 1, action.payload);

      return {
        ...state,
        ui: {
          autocompletes: newAutocompletesState,
        }
      };
    }

    case ACTIONS.Types.DELETE_AUTOCOMPLETE: {
      
      let newAutocompletesState = _.cloneDeep(state.ui.autocompletes);
      let index = _.findIndex(newAutocompletesState, { uuid: action.payload });
      newAutocompletesState.splice(index, 1);

      return {
        ...state,
        ui: {
          autocompletes: newAutocompletesState,
        }
      };
    }

    default:
      return state;
  }
};

export default flowReducer;