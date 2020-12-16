import { ADD_PRODUCT, UPDATE_PRODUCT, REMOVE_PRODUCT } from "../constants";

export const addProduct = content => ({
  type: ADD_PRODUCT,
  payload: {
    ...content
  }
});

export const updateProduct = content => ({
  type: UPDATE_PRODUCT,
  payload: { content }
});

export const removeProduct = id => ({
  type: REMOVE_PRODUCT,
  payload: { id }
});