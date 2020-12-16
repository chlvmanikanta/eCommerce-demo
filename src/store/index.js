import { createStore, combineReducers } from "redux";
import products from "./reducers/products";

export default createStore(combineReducers({ products }));
