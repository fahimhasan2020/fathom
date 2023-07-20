import { SET_FLAGAS_VALUES, SET_PRIVACY_VALUES } from '../Constants';

const initialState = {};

const masterData = (state = initialState, action) => {
  switch (action.type) {
    case SET_FLAGAS_VALUES:
      return {
        ...state,
        FlagasOptions: action.FlagasOptions,
      };
    case SET_PRIVACY_VALUES:
      return {
        ...state,
        PrivacyOptions: action.PrivacyOptions
      };
    default:
      return state;
  }
};
export default masterData;
