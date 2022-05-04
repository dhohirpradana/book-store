import "./App.css";
import Home from "./pages/Home.js";
import About from "./pages/About.js";
import Complain from "./pages/Complain.js";
import { Route, Routes } from "react-router-dom";
import Profile from "./pages/Profile";
import { Container } from "react-bootstrap";
import SignIn from "./pages/SignIn";
import NavBar from "./components/NavBar";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Cart from "./pages/Cart";
import BookDetail from "./pages/BookDetail";
import { useContext, useEffect } from "react";
import { UserContext } from "./contexts/user";

const bgImage = require("./assets/image/background.png");
const divStyle = {
  width: "100%",
  height: "100vh",
  backgroundImage: `url(${bgImage})`,
  backgroundSize: "cover",
};

function App() {
  // eslint-disable-next-line no-unused-vars
  const [userContext, userDispatch] = useContext(UserContext);
  
  useEffect(() => {
    if (localStorage.token) {
      userDispatch({ type: "LOGIN_SUCCESS", payload: "ACCESS_TOKEN" });
    }
  });
  return (
    <div style={divStyle}>
      <NavBar />
      <Container fluid>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/book-detail/:id" element={<BookDetail />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/complain" element={<Complain />} />
          <Route exact path="/signin" element={<SignIn />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
