import { createAction } from "redux-actions";

import ActionTypes from "./actionTypes";

export const startSearch = createAction(ActionTypes.START_SEARCH);
export const endSearch = createAction(ActionTypes.END_SEARCH);
export const updateSearchQuery = createAction(
  ActionTypes.UPDATE_SEARCH_QUERY,
  query => ({ query })
);
export const refreshContacts = createAction(
  ActionTypes.REFRESH_CONTACTS,
  contacts => ({ contacts })
);
