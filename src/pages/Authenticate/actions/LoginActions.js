import {
  SET_AUTH_TOKEN,
  SET_LOGGED_IN_USER,
  SET_FLAGAS_VALUES,
  SET_PRIVACY_VALUES
} from '../../../common/Constants';

export function setAuthToken(authToken, authInfo) {
  return {
    type: SET_AUTH_TOKEN,
    authToken,
    authInfo
  };
}

export function setLoggedInUser(user) {
  return {
    type: SET_LOGGED_IN_USER,
    user,
  };
}

export function setFlagasValues(FlagasOptions) {
  return {
    type: SET_FLAGAS_VALUES,
    FlagasOptions,
  };
}

export function setPrivacyValues(PrivacyOptions) {
  return {
    type: SET_PRIVACY_VALUES,
    PrivacyOptions
  };
}
