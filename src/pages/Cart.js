import React, { useContext, useEffect, useState, useCallback } from "react";
import { Container, Divider, Stack, Typography } from "@mui/material";
import { Button } from "react-bootstrap";
import toRupiah from "@develoka/angka-rupiah-js";
import { CartContext } from "../contexts/cart";
import { API } from "../configs/api";
import Order from "../components/Cart/Order";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/user";
const { v4: uuidv4 } = require("uuid");

export default function Cart() {
  const [subtotal, setSubtotal] = useState(0);
  const [qty, setQty] = useState(0);
  const [withOngkir, setWithOngkir] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [cartContext, cartDispatch] = useContext(CartContext);
  const [userContext] = useContext(UserContext);
  const [carts, setcarts] = useState([]);
  const navigate = useNavigate();

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

  // useEffect(() => {}, []);

  useEffect(() => {
    fetchCarts();
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    const myMidtransClientKey =
      process.env.REACT_APP_MIDTRANS_CLIENT_KEY ||
      "SB-Mid-client-hPSqcfwJkY6Qc8ky";

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;
    scriptTag.setAttribute("data-client-key", myMidtransClientKey);

    document.body.appendChild(scriptTag);
    return () => {
      document.body.removeChild(scriptTag);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCheckOut = () => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const uuid = uuidv4();
    carts.map(async (cart, index) => {
      await API.get("/book/" + cart.book.id, config).then(async (response) => {
        const b = response.data.data.book;
        console.log(b);
        console.log(userContext.user.address.cityId);
        const data = {
          bookId: b.id,
          sellerId: b.userId,
          price: b.price,
          courier: "jne",
          destination: userContext.user.address.cityId,
          origin: b.address.city.id,
          courierCost: 21000,
          transactionId: userContext.user.id + "b" + uuid + "s" + b.userId,
          subTotal: subtotal,
        };

        const body = JSON.stringify(data);

        const config = {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
        };
        await API.post("/transaction", body, config)
          .then(async (response) => {
            const token = response.data.payment.token;
            if (index === carts.length - 1)
              window.snap.pay(token, {
                onSuccess: function (result) {
                  console.log(result);
                  navigate("/profile");
                },
                onPending: function (result) {
                  console.log(result);
                  navigate("/profile");
                },
                onError: function (result) {
                  console.log(result);
                },
                onClose: function () {
                  alert("you closed the popup without finishing the payment");
                },
              });
            await API.delete("/carts")
              .then((response) => {})
              .catch((error) => {
                console.log(error.response);
              });
          })
          .catch((error) => {
            console.log(error.response.data);
          });
      });
    });
  };

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
                  onClick={() => fetchCarts()}
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
          <Button
            disabled={cartContext.cartCount === 0}
            variant="dark"
            onClick={handleCheckOut}
          >
            Check Out
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
}
