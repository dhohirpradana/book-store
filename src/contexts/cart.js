import { createContext, useReducer } from "react";

export const CartContext = createContext();

const initialState = {
  cartCount: 0,
};

const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "ADD_CART":
      return {
        cartCount: payload,
      };
    case "CLEAR_CART":
      return {
        cartCount: 0,
      };
    default:
      throw new Error();
  }
};

export const CartContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <CartContext.Provider value={[state, dispatch]}>
      {children}
    </CartContext.Provider>
  );
};
