import "./App.css";
import Home from "./pages/Home.js";
import About from "./pages/About.js";
import Complain from "./pages/Complain.js";
import { Route, Routes } from "react-router-dom";
import Profile from "./pages/Profile";
import { Container } from "react-bootstrap";
import NavBar from "./components/NavBar";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Cart from "./pages/Cart";
import BookDetail from "./pages/BookDetail";
import { useContext, useEffect } from "react";
import { UserContext } from "./contexts/user";
import { Box } from "@mui/material";
import Transaction from "./pages/Transaction";
import { API, setAuthToken } from "./configs/api";
import PrivateRoute from "./pages/PrivateRoute";
const bgImage = require("./assets/image/background.png");

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  const [userContext, userDispatch] = useContext(UserContext);

  const checkUser = async () => {
    try {
      const response = await API.get("/me");

      if (response.status === 404) {
        return userDispatch({
          type: "AUTH_ERROR",
        });
      }

      let payload = response.data.data.user;
      payload.token = localStorage.token;

      userDispatch({
        type: "AUTH_SUCCESS",
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (localStorage.token) {
      checkUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box
      sx={{
        backgroundImage: `url(${bgImage})`,
        width: "100%",
        height: "100vh",
      }}
    >
      <NavBar />
      <Container fluid>
        <Routes>
          <Route
            exact
            path="/"
            element={
              userContext.user.role === "admin" ? <Transaction /> : <Home />
            }
          />
          <Route element={<PrivateRoute />}>
            <Route exact path="/profile" element={<Profile />} />
            <Route exact path="/book-detail/:id" element={<BookDetail />} />
            <Route exact path="/cart" element={<Cart />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/complain" element={<Complain />} />
          </Route>
        </Routes>
      </Container>
    </Box>
  );
}

export default App;
