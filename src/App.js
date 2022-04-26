import "./App.css";
import Home from "./pages/Home.js";
import About from "./pages/About.js";
import Complain from "./pages/Complain.js";
import { Route, Routes } from "react-router-dom";
import Profile from "./pages/Profile";
import { Container, Image, Nav, Navbar, Stack } from "react-bootstrap";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignIn from "./pages/SignIn";
import manProfile from "./assets/icon/man.png";
import womanProfile from "./assets/icon/woman.png";

const styles = {
  link: { textDecoration: "none", color: "black" },
};

function App() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [gender, setgender] = useState("male");

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
  return (
    <>
      <Container fluid className="px-5 py-3">
        <Stack direction="horizontal" gap={3}>
          <Link to="/" style={styles.link}>
            <Navbar.Brand>Books</Navbar.Brand>
          </Link>
          <Nav className="ms-auto menu-trigger">
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
              className="p-0"
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
                Profile
              </MenuItem>
              <MenuItem onClick={() => handleMenuSelect("complain")}>
                Complain
              </MenuItem>
              <MenuItem onClick={() => handleMenuSelect("signin")}>
                Logout
              </MenuItem>
            </Menu>
          </Nav>
        </Stack>
      </Container>
      <Container>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/complain" element={<Complain />} />
          <Route exact path="/signin" element={<SignIn />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
