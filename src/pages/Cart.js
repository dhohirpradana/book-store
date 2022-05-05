import React, { useContext, useEffect, useState } from "react";
import { Container, Divider, Stack, Typography } from "@mui/material";
import { Button } from "react-bootstrap";
import toRupiah from "@develoka/angka-rupiah-js";
import { CartContext } from "../contexts/cart";

export default function Cart() {
  const [cartContext] = useContext(CartContext);
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    if (cartContext.cartCount !== 0) {
      setSubtotal(cartContext.cartCount * 58000);
    }
  }, [cartContext.cartCount]);

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
            <Typography textAlign="center" fontWeight={500} color="#929292">
              Ada {cartContext.cartCount} Item
            </Typography>
          )}
          <Divider orientation="horizontal" flexItem />
        </Stack>
        <Stack spacing={2} width={{ xs: "100%", md: "30%" }} pt={1} pl={2}>
          <Divider orientation="horizontal" flexItem />
          <Stack direction="row" justifyContent="space-between">
            <Typography textTransform="capitalize">subtotal</Typography>
            <Typography textTransform="capitalize">
              {toRupiah(subtotal, { symbol: "", floatingPoint: 0 })}
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography textTransform="capitalize">qty</Typography>
            <Typography textTransform="capitalize">
              {cartContext.cartCount}
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
