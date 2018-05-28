import ActionTypes from "./actionTypes";

export default function reducer(state = {}, action) {
  switch (action.type) {
    case ActionTypes.START_SEARCH:
      return { ...state, isSearching: true };
    case ActionTypes.END_SEARCH:
      return { ...state, isSearching: false };
    case ActionTypes.UPDATE_SEARCH_QUERY:
      return { ...state, query: action.payload.query };
    case ActionTypes.REFRESH_CONTACTS:
      return { ...state, contacts: action.payload.contacts };
    default:
      return state;
  }
}
