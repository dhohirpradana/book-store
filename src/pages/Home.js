import { useContext, useState, useEffect } from "react";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import rightIcon from "../assets/icon/angle-right-solid.png";
import letfIcon from "../assets/icon/angle-left-solid.png";
import { CardMedia, Container, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import useWindowDimensions from "../hooks/window";
import PromoCard from "../components/Home/PromoCard";
import * as Scroll from "react-scroll";
import BookCard from "../components/Home/BookCard";
import { CartContext } from "../contexts/cart";
import AuthModal from "../components/Modal/AuthModal";
import { ModalContext } from "../contexts/authModal";
import { UserContext } from "../contexts/user";
import { API } from "../configs/api";
import useCart from "../hooks/cart";

const useStyles = makeStyles(() => {
  return {
    root: {
      width: (width) => {
        // console.log(width);
        if (width < 768) {
          return width * 0.7;
        } else if (width > 767 && width < 992) {
          return 620;
        } else {
          return 500;
        }
      },
      marginInline: 10,
    },
    btnAddChart: { width: "100%", borderRadius: 0 },
    productRight: {
      alignItems: "center",
      width: "100%",
    },
    textJustify: { textJustify: "center" },
  };
});

export default function Home() {
  const { fetchCarts } = useCart();
  const { width } = useWindowDimensions();
  const classes = useStyles(width);
  // const getItems = () =>
  //   Array(24)
  //     .fill(0)
  //     .map((_, ind) => ({
  //       id: `${ind + 1}`,
  //       title: `habis gelap terbitlah terang vol ${ind + 1}`,
  //       author: `Kartini`,
  //       sold: Math.floor(Math.random() * 99) + 1,
  //     }));

  // const [items] = useState(getItems);
  const [books, setBooks] = useState([]);
  // const [cartContext, cartDispatch] = useContext(CartContext);
  // const [userContext] = useContext(UserContext);
  // eslint-disable-next-line no-unused-vars
  const [modalContext, modalDispatch] = useContext(ModalContext);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    await API.get("/books")
      .then((response) => {
        const books = response.data.data.books;
        setBooks(books);
        // console.log(books)
      })
      .catch((error) => console.log(error));
  };

  const handleClick = async (id) => {
    // if (!userContext.isLogin)
    //   return modalDispatch({
    //     type: "MODAL_OPEN",
    //     payload: "login",
    //   });
    // cartDispatch({ type: "ADD_CART", payload: cartContext.cartCount + 1 });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const body = JSON.stringify({
      bookId: id,
    });

    await API.post("/cart", body, config)
      .then((response) => {
        if (response.status === 201) {
          console.log("first");
          fetchCarts();
        }
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  var Element = Scroll.Element;

  return (
    <>
      <Typography
        textAlign="center"
        fontWeight="500"
        mx="auto"
        fontSize={18}
        mb={3}
      >
        With us , you can shop online & help save your high street at the same
        time
      </Typography>
      <ScrollMenu
        wrapperClassName="listview"
        scrollContainerClassName="listview"
        LeftArrow={LeftArrow}
        RightArrow={RightArrow}
      >
        {books.map(({ id, title, image, author, desc,price }) => (
          <PromoCard
            width={width}
            classes={classes}
            itemId={id}
            title={title}
            author={author}
            image={image}
            desc={desc}
            price={price}
            key={id}
            onClick={() => handleClick(id)}
          />
        ))}
      </ScrollMenu>
      <Container>
        <Typography
          marginTop={2}
          marginBottom={1}
          fontSize={20}
          fontWeight="bold"
          textTransform="capitalize"
        >
          List Book
        </Typography>
        <Element>
          <Grid container spacing={2}>
            {books.map(({ id, title, author, price, image }) => (
              <Grid
                key={id}
                justifyContent="center"
                textAlign="center"
                item
                xs={6}
                sm={6}
                md={3}
                lg={3}
              >
                <BookCard
                  width={width}
                  useStyles={useStyles}
                  itemId={id}
                  title={title}
                  author={author}
                  price={price}
                  image={image}
                  key={id}
                  onClick={() => handleClick(id)}
                ></BookCard>
              </Grid>
            ))}
          </Grid>
        </Element>
        <AuthModal />
      </Container>
    </>
  );

  function LeftArrow() {
    const { isFirstItemVisible, scrollPrev } = useContext(VisibilityContext);

    return (
      <Arrow disabled={isFirstItemVisible} onClick={() => scrollPrev()}>
        {letfIcon}
      </Arrow>
    );
  }

  function RightArrow() {
    const { isLastItemVisible, scrollNext } = useContext(VisibilityContext);

    return (
      <Arrow disabled={isLastItemVisible} onClick={() => scrollNext()}>
        {rightIcon}
      </Arrow>
    );
  }

  function Arrow({ disabled, onClick, children }) {
    return (
      <div
        disabled={disabled}
        onClick={onClick}
        style={{
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          right: "1%",
          opacity: disabled ? "0" : "1",
          userSelect: "none",
        }}
      >
        <CardMedia component="img" height={50} image={children} />
      </div>
    );
  }
}
