import ACTIONS from "./actions";
import _ from "lodash";
import produce from "immer";

const defaultState = {
  ui: {
    autocompletes: []
  },
};

const flowReducer = (state = defaultState, action) => {
  // console.log(action);
  
  switch (action.type) {

    case ACTIONS.Types.CREATE_AUTOCOMPLETE: {

      let newItem = { ...action.payload, overlayActive: true };
      
      var newState = produce(state.ui.autocompletes, draftState => {
        newItem.filteredOptions = newItem.options.filter((option) => {
          return option.includes(newItem.decorator.decoratedText.toLowerCase().replace(/#/g, ''))
        });
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

    case ACTIONS.Types.SET_ACTIVE_OVERLAY: {

      // console.log(action);
      
      
      let index = _.findIndex(state.ui.autocompletes, { uuid: action.payload.uuid });
      
      var newState = produce(state.ui.autocompletes, draftState => {
        draftState[index].overlayActive = action.payload.active;
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
      
      console.log(action.payload);
      

      var newState = produce(state.ui.autocompletes, draftState => {
        draftState[index] = action.payload;
        draftState[index].filteredOptions = draftState[index].options.filter((option) => {
          return option.includes(draftState[index].decorator.decoratedText.toLowerCase().replace(/#/g, ''))
        });
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