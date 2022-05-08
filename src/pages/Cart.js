import React, { useContext, useEffect, useState, useCallback } from "react";
import { Container, Divider, Stack, Typography } from "@mui/material";
import { Button } from "react-bootstrap";
import toRupiah from "@develoka/angka-rupiah-js";
import { CartContext } from "../contexts/cart";
import { API } from "../configs/api";
import Order from "../components/Cart/Order";

export default function Cart() {
  const [subtotal, setSubtotal] = useState(0);
  const [qty, setQty] = useState(0);
  const [withOngkir, setWithOngkir] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [cartContext, cartDispatch] = useContext(CartContext);
  const [carts, setcarts] = useState([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchCarts = useCallback(async () => {
    await API.get("/carts")
      .then((response) => {
        cartDispatch({
          type: "ADD_CART",
          payload: response.data.data.carts.length,
        });
        setcarts(response.data.data.carts);

        let q = 0;
        let ro = 0;
        let st = 0;
        response.data.data.carts.map((cart) => {
          const withOngkir = () => {
            if (!cart.book.isEbook) ro += cart.book.price * cart.count;
          };
          return [
            (st += cart.book.price * cart.count),
            (q += cart.count),
            withOngkir(),
          ];
        });
        setQty(q);
        setWithOngkir(ro);
        setSubtotal(st);
      })
      .catch((error) => {
        cartDispatch({
          type: "CLEAR_CART",
        });
        console.log(error);
      });
  });

  useEffect(() => {
    fetchCarts();
  }, [fetchCarts]);

  return (
    <Container sx={{ paddingX: 2 }}>
      <Typography
        marginTop={2}
        marginBottom={3}
        fontSize={20}
        fontWeight="bold"
        textTransform="capitalize"
      >
        my cart
      </Typography>
      <Stack direction={{ xs: "column", md: "row" }}>
        <Stack spacing={2} width={{ xs: "100%", md: "70%" }}>
          <Typography textTransform="capitalize">review your order</Typography>
          <Divider orientation="horizontal" flexItem />
          {cartContext.cartCount === 0 ? (
            <Typography textAlign="center" fontWeight={500} color="#929292">
              Empty Cart
            </Typography>
          ) : (
            carts.map((cart) => {
              return (
                <Order
                  id={cart.id}
                  image={cart.book.image}
                  author={cart.book.author}
                  title={cart.book.title}
                  count={cart.count}
                  price={cart.book.price}
                  isEbook={cart.book.isEbook}
                  key={cart.id}
                  onClick={fetchCarts}
                />
              );
            })
          )}
          <Divider orientation="horizontal" flexItem />
        </Stack>
        <Stack
          spacing={2}
          width={{ xs: "100%", md: "30%" }}
          pt={{ xs: 1, md: 7 }}
          pl={{ xs: 0, md: 2 }}
          pb={2}
        >
          <Divider orientation="horizontal" flexItem />
          <Stack direction="row" justifyContent="space-between">
            <Typography textTransform="capitalize">subtotal</Typography>
            <Typography textTransform="capitalize">
              {toRupiah(subtotal, { symbol: "", floatingPoint: 0 })}
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography textTransform="capitalize">qty</Typography>
            <Typography textTransform="capitalize">{qty}</Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography textTransform="capitalize">withouth courier</Typography>
            <Typography textTransform="capitalize">
              {toRupiah(subtotal - withOngkir, {
                symbol: "",
                floatingPoint: 0,
              })}
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography textTransform="capitalize">with courier</Typography>
            <Typography textTransform="capitalize">
              {toRupiah(withOngkir, { symbol: "", floatingPoint: 0 })}
            </Typography>
          </Stack>
          <Divider orientation="horizontal" flexItem />
          <Stack direction="row" justifyContent="space-between">
            <Typography
              textTransform="capitalize"
              fontWeight={500}
              color="#44B200"
            >
              total
            </Typography>
            <Typography
              textTransform="capitalize"
              fontWeight={500}
              color="#44B200"
            >
              {toRupiah(subtotal, { symbol: "", floatingPoint: 0 })}
            </Typography>
          </Stack>
          <Button disabled={cartContext.cartCount === 0} variant="dark">
            Pay
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
}
