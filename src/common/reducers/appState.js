import { SET_ROOT_NAVIGATION, SET_PREVIOUS_PAGE } from '../Constants';

const initialState = {
  rootNavigation: null,
  page: ''
};

const appState = (state = initialState, action) => {
  switch (action.type) {
    case SET_ROOT_NAVIGATION:
      return {
        ...state,
        rootNavigation: action.navigation,
      };
    case SET_PREVIOUS_PAGE:
      return {
        ...state,
        page: action.page,
      };
    default:
      return state;
  }
};
export default appState;
