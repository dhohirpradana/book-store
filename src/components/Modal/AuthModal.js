import { Alert, Typography } from "@mui/material";
import React, { useState, useRef, useContext } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useMutation } from "react-query";
import { API } from "../../configs/api";
import { ModalContext } from "../../contexts/authModal";
import { CartContext } from "../../contexts/cart";
import { UserContext } from "../../contexts/user";
import useWindowDimensions from "../../hooks/window";

const styles = {
  link: { textDecoration: "none", color: "black" },
  btnAuth: {
    width: "100px",
    login: { color: "black", borderColor: "black", width: "100px" },
  },
  modal: {
    btn: { width: "100%" },
    content: {
      width: "300px",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  },
};
export default function AuthModal() {
  const { width } = useWindowDimensions();
  const [error, seterror] = useState(null);
  const [modalContext, modalDispatch] = useContext(ModalContext);
  // eslint-disable-next-line no-unused-vars
  const [userContext, userDispatch] = useContext(UserContext);
  const loginRef = useRef();
  const registerRef = useRef();
  // eslint-disable-next-line no-unused-vars
  const [cartContext, cartDispatch] = useContext(CartContext);

  function openModal(modalTS) {
    modalDispatch({
      type: "MODAL_OPEN",
      payload: modalTS,
    });
  }

  function closeModal() {
    modalDispatch({
      type: "MODAL_CLOSE",
    });
  }

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

  const handleLogin = useMutation(async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const body = JSON.stringify({
      email: loginRef.current.email.value,
      password: loginRef.current.password.value,
    });

    await API.post("/login", body, config)
      .then((response) => {
        const user = response.data.data;
        if (response.status === 200) {
          closeModal();
          userDispatch({
            type: "LOGIN_SUCCESS",
            payload: user,
          });
          fetchCarts();
        }
      })
      .catch((error) => {
        const msg = error.response.data.error.message;
        // console.log(error.response.data);
        seterror(msg);
      });
  });

  const handleRegister = useMutation(async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const body = JSON.stringify({
      name: registerRef.current.fullname.value,
      email: registerRef.current.email.value,
      password: registerRef.current.password.value,
    });

    await API.post("/register", body, config)
      .then((response) => {
        if (response.status === 201) {
          closeModal();
        }
      })
      .catch((error) => {
        const msg = error.response.data.error.message;
        console.log(error.response);
        seterror(msg);
      });
  });
  return (
    <div>
      {modalContext.modalOpen === "register" ? (
        <Modal show={true} centered={width > 767} onHide={closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Register</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {error ? (
              <Alert severity="error" className="mb-3">
                {error}
              </Alert>
            ) : (
              <></>
            )}
            <Form ref={registerRef} onSubmit={(e) => handleRegister.mutate(e)}>
              <Form.Group className="mb-3" controlId="fullname">
                <Form.Control
                  name="fullname"
                  type="text"
                  placeholder="Full Name"
                  onChange={() => seterror(null)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="email">
                <Form.Control
                  name="email"
                  type="email"
                  placeholder="Email"
                  onChange={() => seterror(null)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="password">
                <Form.Control
                  name="password"
                  type="password"
                  placeholder="Password"
                  onChange={() => seterror(null)}
                />
              </Form.Group>
              <Button
                type="submit"
                style={styles.modal.btn}
                variant="dark"
                size="sm"
              >
                Register
              </Button>
            </Form>
            <Typography fontSize={14} mt={2} textAlign="center">
              <span>Already have an account? Click </span>
              <span
                style={{ cursor: "pointer", fontWeight: "600" }}
                onClick={() => {
                  seterror(null);
                  openModal("login");
                }}
              >
                Here
              </span>
            </Typography>
          </Modal.Body>
        </Modal>
      ) : modalContext.modalOpen === "login" ? (
        <Modal show={true} centered={width > 767} onHide={closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Login</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {error ? (
              <Alert severity="error" className="mb-3">
                {error}
              </Alert>
            ) : (
              <></>
            )}
            <Form ref={loginRef} onSubmit={(e) => handleLogin.mutate(e)}>
              <Form.Group className="mb-3" controlId="email">
                <Form.Control
                  name="email"
                  type="email"
                  placeholder="Email"
                  onChange={() => seterror(null)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="password">
                <Form.Control
                  name="password"
                  type="password"
                  placeholder="Password"
                  onChange={() => seterror(null)}
                />
              </Form.Group>
              <Button
                style={styles.modal.btn}
                // onClick={handleLogin}
                type="submit"
                variant="dark"
                size="sm"
              >
                Login
              </Button>
            </Form>
            <Typography fontSize={14} mt={2} textAlign="center">
              <span>Don't have an account? Click </span>
              <span
                style={{ cursor: "pointer", fontWeight: "600" }}
                onClick={() => {
                  seterror(null);
                  openModal("register");
                }}
              >
                Here
              </span>
            </Typography>
          </Modal.Body>
        </Modal>
      ) : (
        <></>
      )}
    </div>
  );
}
