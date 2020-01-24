import ACTIONS from "./actions";
import _ from "lodash";
import {EditorState} from 'draft-js';
import {FlowDecorator} from '../decorators/index'
import produce from "immer";

const defaultState = {
  ui: {
    autocompletes: []
  },
  editor: EditorState.createEmpty(FlowDecorator),
};  

const flowReducer = (state = defaultState, action) => {
  
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
      
      var newState = produce(state.ui.autocompletes, draftState => {
        draftState.push(newItem)
      });

      return {
        ...state,
        ui: {
          ...state.ui,
          autocompletes: newState,
        }
      };
    }

    case ACTIONS.Types.UPDATE_AUTOCOMPLETE_REF: {
      
      let index = _.findIndex(state.ui.autocompletes, { uuid: action.payload.uuid });
      
      var newState = produce(state.ui.autocompletes, draftState => {
        draftState[index].ref = action.payload.ref;
      });

      return {
        ...state,
        ui: {
          ...state.ui,
          autocompletes: newState,
        }
      };
    }

    case ACTIONS.Types.DELETE_AUTOCOMPLETE: {
      let index = _.findIndex(state.ui.autocompletes, { uuid: action.payload });
      
      var newState = produce(state.ui.autocompletes, draftState => {
        draftState.splice(index, 1);
      });

      return {
        ...state,
        ui: {
          ...state.ui,
          autocompletes: newState,
        }
      };
    }

    default:
      return state;
  }
};

export default flowReducer;