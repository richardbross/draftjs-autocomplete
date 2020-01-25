import ACTIONS from "./actions";
import _ from "lodash";
import {EditorState, Modifier} from 'draft-js';
import {FlowDecorator} from '../decorators/index'
import produce from "immer";
import { fromJS } from "immutable";

const defaultState = {
  ui: {
    autocompletes: []
  },
};

const flowReducer = (state = defaultState, action) => {
  console.log(action);
  
  switch (action.type) {

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

    case ACTIONS.Types.UPDATE_ACTIVE_OPTION: {
      
      let index = _.findIndex(state.ui.autocompletes, { uuid: action.payload.uuid });

      var newState = produce(state.ui.autocompletes, draftState => {
        draftState[index].active = action.payload.option;
      });

      return {
        ...state,
        ui: {
          ...state.ui,
          autocompletes: newState,
        }
      };
    }

    case ACTIONS.Types.UPDATE_SELECTED_OPTION: {
      
      let index = _.findIndex(state.ui.autocompletes, { uuid: action.payload.uuid });

      var newState = produce(state.ui.autocompletes, draftState => {
        draftState[index].selected = action.payload.option;
        draftState[index].active = action.payload.option;
      });

      return {
        ...state,
        editor: newState,
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