import { useContext, useState } from "react";
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

const useStyles = makeStyles(() => {
  return {
    root: {
      width: (width) => {
        console.log(width);
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
  const { width } = useWindowDimensions();
  const classes = useStyles(width);
  const getItems = () =>
    Array(24)
      .fill(0)
      .map((_, ind) => ({
        id: `${ind + 1}`,
        title: `habis gelap terbitlah terang vol ${ind + 1}`,
        author: `Kartini`,
        sold: Math.floor(Math.random() * 99) + 1,
      }));

  const getBooks = () =>
    Array(50)
      .fill(0)
      .map((_, ind) => ({
        id: `${ind + 1}`,
        title: `harry potter eps.${ind + 1}`,
        author: `Charles Dickens`,
        sold: Math.floor(Math.random() * 27) + 1,
      }));

  const [items] = useState(getItems);
  const [books] = useState(getBooks);
  const [cartContext, cartDispatch] = useContext(CartContext);

  const handleClick = (id) => {
    cartDispatch({ type: "ADD_CART", payload: cartContext.cartCount + 1 });
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
        {items.map(({ id, title, sold, author }) => (
          <PromoCard
            width={width}
            classes={classes}
            itemId={id}
            title={title}
            author={author}
            sold={sold}
            key={id}
            onClick={() => handleClick(id)}
          />
        ))}
      </ScrollMenu>
      <Container>
        <Typography
          marginTop={2}
          marginBottom={1}
          marginLeft={2}
          fontSize={20}
          fontWeight="bold"
          textTransform="capitalize"
        >
          List Book
        </Typography>
        <Element>
          <Grid container spacing={2}>
            {books.map(({ id, title, sold, author }) => (
              <Grid
                key={id}
                justifyContent="center"
                textAlign="center"
                item
                xs={6}
                sm={6}
                md={3}
                lg={2}
              >
                <BookCard
                  width={width}
                  useStyles={useStyles}
                  itemId={id}
                  title={title}
                  author={author}
                  sold={sold}
                  key={id}
                  onClick={() => handleClick(id)}
                ></BookCard>
              </Grid>
            ))}
          </Grid>
        </Element>
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
