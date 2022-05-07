import {
  Avatar,
  Badge,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Container,
  Image,
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
import { CartContext } from "../contexts/cart";
import { UserContext } from "../contexts/user";
import { ModalContext } from "../contexts/authModal";
import AuthModal from "./Modal/AuthModal";

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
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [cartContext, cartDispatch] = useContext(CartContext);
  const [userContext, userDispatch] = useContext(UserContext);
  // eslint-disable-next-line no-unused-vars
  const [modalContext, modalDispatch] = useContext(ModalContext);

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
    modalDispatch({
      type: "MODAL_OPEN",
      payload: modalTS,
    });
  }

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
                <Avatar
                  src={
                    userContext.user.gender === "male"
                      ? manProfile
                      : womanProfile
                  }
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
              <AuthModal />
            </div>
          )}
        </Nav>
      </Stack>
      {/* </Navbar> */}
    </Container>
  );
}
