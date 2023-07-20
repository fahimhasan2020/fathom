import { SET_AUTH_TOKEN } from '../../../common/Constants';

const initialState = {
  authToken: null,
};

const loginState = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH_TOKEN:
      return {
        ...state,
        authToken: action.authToken,
        authInfo: action.authInfo
      };
    default:
      return state;
  }
};

export default loginState;
