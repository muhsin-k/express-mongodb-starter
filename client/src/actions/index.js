import axios from "axios";
import {
  INIT__FETCH,
  COMPLETE_FETCH,
  ALL_CONTACTS,
  INIT__FULL_CONTACT,
  COMPLETE_FULL_CONTACT,
  FULL_CONTACT,
  ADD_CONTACT,
  SINGLE_CONTACT,
  UPDATE_CONTACT,
  DELETE_CONTACT
} from "./types";
const baseUrl = "http://localhost:7000/api/";
const fullContactUrl = "https://api.fullcontact.com/v3/person.enrich";
const fullContactToken = "dsh1ULCJbICxW6a5nXuQrGd1G3JZFCQc";
export const searchContacts = obj => async dispatch => {
  dispatch({ type: INIT__FETCH });
  try {
    const res = await axios.post(baseUrl + "contact/search", obj);
    dispatch({ type: ALL_CONTACTS, payload: res.data });
    dispatch({ type: COMPLETE_FETCH });
  } catch (error) {
    dispatch({ type: COMPLETE_FETCH });
  }
};
export const getSingleContact = obj => async dispatch => {
  try {
    const res = await axios.post(baseUrl + "contact/details", obj);
    dispatch({ type: SINGLE_CONTACT, payload: res.data });
  } catch (error) {}
};
export const fetchContacts = obj => async dispatch => {
  dispatch({ type: INIT__FETCH });
  try {
    const res = await axios.get(baseUrl + "contact");
    dispatch({ type: ALL_CONTACTS, payload: res.data });
    dispatch({ type: COMPLETE_FETCH });
  } catch (error) {
    dispatch({ type: COMPLETE_FETCH });
  }
};

export const addContact = obj => async dispatch => {
  dispatch({ type: INIT__FETCH });
  const res = await axios.post(baseUrl + "contact", obj);

  dispatch({ type: ADD_CONTACT, payload: res.data });
  dispatch({ type: COMPLETE_FETCH });
  dispatch(fetchContacts());
};
export const updateContact = obj => async dispatch => {
  const res = await axios.post(baseUrl + "contact/update", obj);

  dispatch({ type: UPDATE_CONTACT, payload: res.data });
  dispatch(fetchContacts());
};
export const deleteContact = obj => async dispatch => {
  const res = await axios.post(baseUrl + "contact/delete", obj);

  dispatch({ type: DELETE_CONTACT, payload: res.data });
  dispatch(fetchContacts());
};
export const fetchFullContact = obj => async dispatch => {
  dispatch({ type: INIT__FULL_CONTACT });
  try {
    const res = await axios.post(fullContactUrl, obj, {
      headers: { Authorization: "Bearer " + fullContactToken }
    });
    dispatch({ type: FULL_CONTACT, payload: res.data });
    dispatch({ type: COMPLETE_FULL_CONTACT });
  } catch (error) {
    dispatch({ type: COMPLETE_FULL_CONTACT });
  }
};
