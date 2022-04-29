import { useContext, useState } from "react";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import rightIcon from "../assets/icon/angle-right-solid.png";
import letfIcon from "../assets/icon/angle-left-solid.png";
import { CardMedia, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import useWindowDimensions from "../hooks/window";
import PromoCard from "../components/Home/PromoCard";

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
      textJustify: { textJustify: "center" },
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
            useStyles={useStyles}
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
