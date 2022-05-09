import { useContext } from "react";
import { API } from "../configs/api";
import { CartContext } from "../contexts/cart";

export default function useCart() {
  // eslint-disable-next-line no-unused-vars
  const [cartContext, cartDispatch] = useContext(CartContext);
  const fetchCarts = async () => {
    await API.get("/carts")
      .then((response) => {
        // console.log(response.data.data.carts);
        cartDispatch({
          type: "ADD_CART",
          payload: response.data.data.carts.length,
        });
      })
      .catch((error) => {
        cartDispatch({
          type: "CLEAR_CART",
        });
        console.log(error);
      });
  };

  const deleteCart = async (cartId) => {
    await API.delete("/cart/" + cartId)
      .then(() => {
        fetchCarts();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return { fetchCarts, deleteCart };
}
