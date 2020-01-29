import ACTIONS from "./actions";
import _ from "lodash";
import produce from "immer";

const defaultState = {
  ui: {
    autocompletes: []
  },
};

const flowReducer = (state = defaultState, action) => {
  console.log(action);
  
  switch (action.type) {

    case ACTIONS.Types.CREATE_AUTOCOMPLETE: {

      let newItem = { ...action.payload, overlayActive: true };
      
      var newState = produce(state.ui.autocompletes, draftState => {
        newItem.filteredOptions = newItem.options.filter((option) => {
          return option.value.toLowerCase() !== newItem.decorator.decoratedText.toLowerCase() && option.value.toLowerCase().includes(newItem.decorator.decoratedText.toLowerCase().replace(/#/g, '').replace(/@/g, '').replace(/</g, '').replace(/>/g, ''))
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

      let index = _.findIndex(state.ui.autocompletes, { uuid: action.payload.uuid });

      if(index === -1) {
        return state;
      }
      
      var newState = produce(state.ui.autocompletes, draftState => {
        draftState[index].overlayActive = action.payload.overlayActive;
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

      if(index === -1) {
        return state;
      }

      var newState = produce(state.ui.autocompletes, draftState => {
        draftState[index] = {
          ...draftState[index],
          ...action.payload
        };
        
        draftState[index].filteredOptions = draftState[index].options.filter((option) => {
          return option.value.toLowerCase() !== draftState[index].decorator.decoratedText.toLowerCase() && option.value.toLowerCase().includes(draftState[index].decorator.decoratedText.toLowerCase().replace(/#/g, '').replace(/@/g, '').replace(/</g, '').replace(/>/g, ''))
        });
        
        draftState[index].activeOption = draftState[index].activeOption
          ? draftState[index].filteredOptions.find(opt => opt.value === draftState[index].activeOption.value) || draftState[index].filteredOptions[0]
          : draftState[index].filteredOptions[0];
        
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

      if(index === -1) {
        return state;
      }

      var newState = produce(state.ui.autocompletes, draftState => {
        draftState[index].activeOption = action.payload.option;
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

      if(index === -1) {
        return state;
      }

      var newState = produce(state.ui.autocompletes, draftState => {
        draftState[index].selectedOption = action.payload.option;
        draftState[index].activeOption = action.payload.option;
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