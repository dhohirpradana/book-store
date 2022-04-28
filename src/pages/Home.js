/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import { useDrag } from "../hooks/drag";
import rightIcon from "../assets/icon/angle-right-solid.png";
import letfIcon from "../assets/icon/angle-left-solid.png";
import { Button, Image } from "react-bootstrap";
import { Card, CardActions, CardContent, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    minWidth: 309,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  btnAddChart: { width: "100%" },
});

export default function Home() {
  const { dragMove, dragStart, dragStop } = useDrag();
  var handleDrag = function (_a) {
    var scrollContainer = _a.scrollContainer;
    return function (ev) {
      return dragMove(ev, function (posDiff) {
        if (scrollContainer.current) {
          scrollContainer.current.scrollLeft += posDiff;
        }
      });
    };
  };

  const getItems = () =>
    Array(20)
      .fill(0)
      .map((_, ind) => ({ id: `featured book ${ind + 1}` }));

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
        onMouseMove={handleDrag}
      >
        {items.map(({ id }) => (
          <CardPromo
            itemId={id} // NOTE: itemId is required for track items
            title={id}
            key={id}
            onClick={handleClick(id)}
            selected={isItemSelected(id)}
          />
        ))}
      </ScrollMenu>
    </>
  );

  function CardPromo({ onClick, selected, title, itemId }) {
    const visibility = useContext(VisibilityContext);
    const classes = useStyles();
    return (
      <Card className={classes.root}>
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
            textTransform="capitalize"
          >
            {title}
          </Typography>
          <Typography variant="h5" component="h2">
            Best Seller
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            visible: {JSON.stringify(!!visibility.isItemVisible(itemId))}
          </Typography>
          <Typography variant="body2" component="p">
            selected: {JSON.stringify(!!selected)}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            onClick={() => onClick(visibility)}
            variant="dark"
            className={classes.btnAddChart}
          >
            Add to Chart
          </Button>
        </CardActions>
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
        <Image src={children} style={{ height: 50 }} />
      </div>
    );
  }
}
