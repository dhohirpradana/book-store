import { createContext, useReducer } from "react";

export const ModalContext = createContext();

const initialState = {
  modalOpen: null,
};

const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "MODAL_OPEN":
      return {
        modalOpen: payload,
      };
    case "MODAL_CLOSE":
      return {
        modalOpen: null,
      };
    default:
      throw new Error();
  }
};

export const ModalContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ModalContext.Provider value={[state, dispatch]}>
      {children}
    </ModalContext.Provider>
  );
};
