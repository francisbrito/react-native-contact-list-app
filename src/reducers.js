import ActionTypes from "./actionTypes";
import cuid from "cuid";

const createContact = ({ firstName, lastName, picture }) => ({
  id: cuid(),
  fullName: `${firstName} ${lastName}`.toLowerCase(),
  picture
});

export default function reducer(state = { newContact: {} }, action) {
  switch (action.type) {
    case ActionTypes.START_SEARCH:
      return { ...state, isSearching: true };
    case ActionTypes.END_SEARCH:
      return { ...state, isSearching: false, query: null };
    case ActionTypes.UPDATE_SEARCH_QUERY:
      return { ...state, query: action.payload.query };
    case ActionTypes.REFRESH_CONTACTS:
      return { ...state, contacts: action.payload.contacts };
    case ActionTypes.START_FETCHING:
      return { ...state, fetching: true };
    case ActionTypes.DONE_FETCHING:
      return { ...state, fetching: false };
    case ActionTypes.SET_FIRST_NAME:
      return {
        ...state,
        newContact: { ...state.newContact, firstName: action.payload.firstName }
      };
    case ActionTypes.SET_LAST_NAME:
      return {
        ...state,
        newContact: { ...state.newContact, lastName: action.payload.lastName }
      };
    case ActionTypes.SET_PICTURE:
      return {
        ...state,
        newContact: { ...state.newContact, picture: action.payload.picture }
      };
    case ActionTypes.SAVE_CONTACT:
      return {
        ...state,
        contacts: [createContact(state.newContact)].concat(state.contacts),
        newContact: {}
      };
    case ActionTypes.CANCEL_NEW_CONTACT:
      return {
        ...state,
        newContact: {}
      };
    default:
      return state;
  }
}
