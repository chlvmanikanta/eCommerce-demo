import { ADD_PRODUCT, UPDATE_PRODUCT, REMOVE_PRODUCT } from "../constants";
import products from '../../demo-data/products.json';


const initialState = {
  cart: [],
  cartByIds: [],
  products: products.products
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_PRODUCT: {
      const { id } = action.payload;
      if(state.cartByIds.indexOf(id) != -1) return state;
      return {
        ...state,
        cartByIds: [...state.cartByIds, id],
        cart: [
          ...state.cart,
          action.payload
        ]
      };
    }
    case UPDATE_PRODUCT: {
      const { id } = action.payload;
      let index = state.cartByIds.indexOf(id);
      return {
        ...state,
        cartByIds: state.cartByIds.splice(index, 1),
        cart: state.cart.splice(index, 1),
      };
    }
    case REMOVE_PRODUCT: {
      const { id } = action.payload;
      let index = state.cartByIds.indexOf(id);
      state.cartByIds.splice(index, 1);
      state.cart.splice(index, 1);
      return {
        ...state,
        cartByIds: [...state.cartByIds],
        cart: [...state.cart],
      };
    }
    default:
      return state;
  }
}
