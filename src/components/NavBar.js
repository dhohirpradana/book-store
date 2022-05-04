import {
  Alert,
  Badge,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
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
  const [cartContext] = useContext(CartContext);
  const [userContext, userDispatch] = useContext(UserContext);

  useEffect(() => {
    console.log(cartContext);
  },[cartContext]);

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

  const handleLogin = () => {
    userDispatch({ type: "LOGIN_SUCCESS", payload: "ACCESS_TOKEN" });
    closeModal();
  };

  const handleLogout = () => {
    handleClose();
    userDispatch({ type: "LOGOUT" });
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
                size="large"
                onClick={() => navigate("/cart")}
                color="inherit"
                className="p-2 me-3"
              >
                <Badge badgeContent={cartContext.cartCount} color="error">
                  <Image
                    className="my-auto"
                    src={cart}
                    style={{ height: 30 }}
                  />
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
                <Image
                  className="p-0"
                  src={gender === "male" ? manProfile : womanProfile}
                  roundedCircle
                  style={{ height: 40 }}
                />
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
                    <Alert severity="warning" className="mb-3">
                      This is a warning alert — check it out!
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
                  <Modal.Title>Register</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {error ? (
                    <Alert severity="warning" className="mb-3">
                      This is a warning alert — check it out!
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
                    <Button
                      style={styles.modal.btn}
                      onClick={handleLogin}
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
