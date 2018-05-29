import { createAction } from "redux-actions";

import ActionTypes from "./actionTypes";
import createContactProvider from "./ContactListProvider";

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
export const startFetching = createAction(ActionTypes.START_FETCHING);
export const endFetching = createAction(ActionTypes.DONE_FETCHING);

const contactProvider = createContactProvider();

export const fetchContacts = () => async (dispatch) => {
  dispatch(startFetching());
  await contactProvider.refreshCache();
  dispatch(refreshContacts(await contactProvider.getContacts()));
  dispatch(endFetching());
}
