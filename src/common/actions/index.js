import {
  SET_WORKSPACE_ID,
  SET_DEFAULT_CALENDAR,
  SET_ROOT_NAVIGATION,
  SET_PREVIOUS_PAGE
} from '../Constants';

export function setWorkspaceID(workspaceID) {
  return {
    type: SET_WORKSPACE_ID,
    workspaceID,
  };
}

export function setDefaultCalendar(calendar) {
  return {
    type: SET_DEFAULT_CALENDAR,
    calendar
  };
}

export function setRootNavigation(navigation) {
  return {
    type: SET_ROOT_NAVIGATION,
    navigation,
  };
}

export function setPreviousPage(page) {
  return {
    type: SET_PREVIOUS_PAGE,
    page,
  };
}
