import { useContext, useState } from "react";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import rightIcon from "../assets/icon/angle-right-solid.png";
import letfIcon from "../assets/icon/angle-left-solid.png";
import bookUS from "../assets/image/sincerely-media-CXYPfveiuis-unsplash.jpg";
import { Card, CardContent, CardMedia, Stack, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Button, Image } from "react-bootstrap";
import useWindowDimensions from "../hooks/window";

export default function Home() {
  const { width } = useWindowDimensions();

  const useStyles = makeStyles(() => {
    return {
      root: {
        width:
          width < 768 ? width * 0.7 : width > 767 && width < 992 ? 500 : 450,
        marginInline: 10,
      },
      btnAddChart: { width: "100%", borderRadius: 0 },
      productRight: {
        alignItems: "center",
        width: "100%",
      },
    };
  });

  const getItems = (h) =>
    Array(150)
      .fill(0)
      .map((_, ind) => ({
        id: `${ind + 1}`,
        title: `habis gelap terbitlah terang vol ${ind + 1}`,
        author: `Kartini`,
        sold: Math.floor(Math.random() * 99) + 1,
      }));

  // eslint-disable-next-line no-unused-vars
  const [items, setItems] = useState(getItems);
  const [selected, setSelected] = useState([]);

  const isItemSelected = (id) => !!selected.find((el) => el === id);

  const handleClick =
    (id) =>
    ({ getItemById, scrollToItem }) => {
      const itemSelected = isItemSelected(id);
      setSelected((currentSelected) =>
        itemSelected
          ? currentSelected.filter((el) => el !== id)
          : currentSelected.concat(id)
      );
    };

  return (
    <>
      <ScrollMenu
        wrapperClassName="listview"
        scrollContainerClassName="listview"
        LeftArrow={LeftArrow}
        RightArrow={RightArrow}
      >
        {items.map(({ id, title, sold, author }) => (
          <CardPromo
            itemId={id}
            title={title}
            author={author}
            sold={sold}
            key={id}
            onClick={handleClick(id)}
            selected={isItemSelected(id)}
          />
        ))}
      </ScrollMenu>
    </>
  );

  function CardPromo({ onClick, selected, title, itemId, sold, author }) {
    const classes = useStyles();
    return (
      <Card elevation={0} className={classes.root}>
        <CardContent>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            alignItems="center"
            spacing={{ xs: 1, sm: 2, md: 2 }}
          >
            <div>
              <Image width={185} src={bookUS} />
            </div>
            <div className={classes.productRight}>
              <Typography
                fontSize={20}
                fontWeight="bold"
                textTransform="capitalize"
              >
                {title}
              </Typography>
              <Typography gutterBottom color="textSecondary">
                𝐵𝓎. {author}
              </Typography>
              <Typography gutterBottom>
                Habis Gelap Terbitlah Terang adalah buku kumpulan surat yang
                ditulis oleh Kartini...
              </Typography>
              <Typography
                gutterBottom
                color="green"
                fontWeight="bold"
                fontSize={18}
              >
                Rp.58.000
              </Typography>
              <Button variant="dark" className={classes.btnAddChart}>
                Add to Chart
              </Button>
            </div>
          </Stack>
        </CardContent>
      </Card>
    );
  }

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
