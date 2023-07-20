import {
  SET_LOGGED_IN_USER,
  SET_WORKSPACE_ID,
  SET_DEFAULT_CALENDAR
} from '../Constants';

const initialState = {};

const currentUser = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOGGED_IN_USER: {
      return {
        ...state,
        user: action.user,
      };
    }
    case SET_WORKSPACE_ID: {
      return {
        ...state,
        workspaceID: action.workspaceID,
      };
    }
    case SET_DEFAULT_CALENDAR: {
      return {
        ...state,
        calendar: action.calendar,
      };
    }
    default:
      return state;
  }
};

export default currentUser;
