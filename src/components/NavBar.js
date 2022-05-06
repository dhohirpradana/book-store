import {
  Avatar,
  Alert,
  Badge,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState, useRef } from "react";
import {
  Button,
  Container,
  Form,
  Image,
  Modal,
  Nav,
  Navbar,
  Stack,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/image/logo.png";
import manProfile from "../assets/icon/man.png";
import womanProfile from "../assets/icon/woman.png";
import user from "../assets/icon/user 2.png";
import complain from "../assets/icon/complain.png";
import cart from "../assets/icon/cart.png";
import logout from "../assets/icon/logout 1.png";
import useWindowDimensions from "../hooks/window";
import { CartContext } from "../contexts/cart";
import { UserContext } from "../contexts/user";
import { API } from "../configs/api";
import { useMutation } from "react-query";

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

export default function NavBar() {
  const { width } = useWindowDimensions();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [gender] = useState("male");
  const [modalOpen, setOpen] = useState(null);
  const [error, seterror] = useState(null);
  const [cartContext, cartDispatch] = useContext(CartContext);
  const [userContext, userDispatch] = useContext(UserContext);
  const loginRef = useRef();

  useEffect(() => {
    // console.log(cartContext);
  }, [cartContext]);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuSelect = (page) => {
    handleClose();
    navigate(page);
  };

  function openModal(modalTS) {
    setOpen(modalTS);
  }

  function closeModal() {
    setOpen(null);
  }

  const handleLogin = useMutation(async (e) => {
    seterror(null);
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const body = JSON.stringify({
        email: loginRef.current["email"].value,
        password: loginRef.current["password"].value,
      });

      const response = await API.post("/login", body, config);
      const user = response.data.data;

      if (response.status === 200) {
        closeModal();
        userDispatch({
          type: "LOGIN_SUCCESS",
          payload: user,
        });
        navigate("/");
      }
    } catch (error) {
      const msg = error.response.data.error.message;
      // console.log(error.response.data);
      seterror(msg);
    }
  });

  const handleLogout = () => {
    handleClose();
    userDispatch({ type: "LOGOUT" });
    cartDispatch({ type: "CLEAR_CART" });
    navigate("/");
  };

  return (
    <Container fluid className="px-5 py-3">
      {/* <Navbar fixed="top"> */}
      <Stack direction="horizontal" gap={2}>
        <Link to="/" style={styles.link}>
          <Navbar.Brand>
            <Image src={logo} />
          </Navbar.Brand>
        </Link>
        <Nav className="ms-auto menu-trigger">
          {userContext.isLogin ? (
            <>
              <IconButton
                hidden={userContext.user.role === "admin"}
                size="large"
                onClick={() => navigate("/cart")}
                color="inherit"
                className="p-2 me-3"
              >
                <Badge badgeContent={cartContext.cartCount} color="error">
                  <Image className="my-auto" src={cart} />
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                className="p-1"
              >
                <Avatar src={gender === "male" ? manProfile : womanProfile} />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={() => handleMenuSelect("profile")}>
                  <Image src={user} style={{ width: 25 }} className="me-3" />
                  Profile
                </MenuItem>
                <MenuItem
                  onClick={() => handleMenuSelect("complain")}
                  className="pe-4"
                >
                  <Image
                    src={complain}
                    style={{ width: 25 }}
                    className="me-3"
                  />
                  Complain
                </MenuItem>
                <hr className="solid"></hr>
                <MenuItem onClick={handleLogout}>
                  <Image src={logout} style={{ width: 25 }} className="me-3" />
                  Logout
                </MenuItem>
              </Menu>
            </>
          ) : (
            <div>
              <Stack direction="horizontal">
                <Button
                  variant="outline-light"
                  size="sm"
                  style={styles.btnAuth.login}
                  onClick={() => openModal("login")}
                  className="me-2"
                >
                  Login
                </Button>
                <Button
                  style={styles.btnAuth}
                  onClick={() => openModal("register")}
                  variant="dark"
                  size="sm"
                >
                  Register
                </Button>
              </Stack>

              {/* Register Modal*/}
              <Modal
                centered={width > 767}
                show={modalOpen === "register"}
                onHide={closeModal}
              >
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
                  <Form>
                    <Form.Group className="mb-3" controlId="email">
                      <Form.Control type="email" placeholder="Email" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="password">
                      <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="fullname">
                      <Form.Control type="text" placeholder="Full Name" />
                    </Form.Group>
                    <Button
                      style={styles.modal.btn}
                      onClick={() => seterror("error")}
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
                        setOpen("login");
                      }}
                    >
                      Here
                    </span>
                  </Typography>
                </Modal.Body>
              </Modal>

              {/* Login Modal */}
              <Modal
                centered={width > 767}
                show={modalOpen === "login"}
                onHide={closeModal}
              >
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
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="password">
                      <Form.Control
                        name="password"
                        type="password"
                        placeholder="Password"
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
                        setOpen("register");
                      }}
                    >
                      Here
                    </span>
                  </Typography>
                </Modal.Body>
              </Modal>
            </div>
          )}
        </Nav>
      </Stack>
      {/* </Navbar> */}
    </Container>
  );
}
