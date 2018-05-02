import {
  INIT__FETCH,
  COMPLETE_FETCH,
  ALL_CONTACTS,
  INIT__FULL_CONTACT,
  COMPLETE_FULL_CONTACT,
  FULL_CONTACT,
  SINGLE_CONTACT
} from "../actions/types";
const initialState = {
  contacts: null,
  isFetching: false,
  fullContact: null,
  singleContact: null,
  isFullContactLoaded: false
};
export default function(state = initialState, action) {
  switch (action.type) {
    case SINGLE_CONTACT:
      return {
        ...state,
        singleContact: action.payload,
        isFetching: true
      };
    case ALL_CONTACTS:
      return {
        ...state,
        contacts: action.payload,
        isFullContactLoaded: false,
        fullContact: null
      };
    case FULL_CONTACT:
      return {
        ...state,
        fullContact: action.payload
      };

    case INIT__FETCH:
      return { ...state, isFetching: true };
    case COMPLETE_FETCH:
      return { ...state, isFetching: false };

    case INIT__FULL_CONTACT:
      return { ...state, isFullContactLoaded: false, isFetching: true };
    case COMPLETE_FULL_CONTACT:
      return { ...state, isFullContactLoaded: true, isFetching: false };

    default:
      return state;
  }
}
