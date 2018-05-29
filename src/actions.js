import { createAction } from "redux-actions";
import ImagePicker from "react-native-image-picker";

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

export const saveContact = createAction(ActionTypes.SAVE_CONTACT);
export const setFirstName = createAction(ActionTypes.SET_FIRST_NAME, firstName => ({ firstName }));
export const setLastName = createAction(ActionTypes.SET_LAST_NAME, lastName => ({ lastName }));
export const setPicture = createAction(ActionTypes.SET_PICTURE, picture => ({ picture }));

export const pickPicture = () => (dispatch) => {
  ImagePicker.showImagePicker(null, (response) => {
    if (response.didCancel) {
      return;
    }

    if (response.error) {
      // TODO: handle error
    }

    dispatch(setPicture(response.uri));
  });
}
