import { Container, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Image, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import useCrypto from "../hooks/crypto";
import bookUS from "../assets/image/sincerely-media-CXYPfveiuis-unsplash.jpg";
import useWindowDimensions from "../hooks/window";
import { makeStyles } from "@mui/styles";
import cartWhite from "../assets/icon/cartWhite.png";
import { API } from "../configs/api";
import toRupiah from "@develoka/angka-rupiah-js";
import useCart from "../hooks/cart";

const useStyles = makeStyles({
  btnAddChart: {
    borderRadius: 0,
    float: "right",
    marginBottom: 25,
    marginTop: 35,
    width: (width) => {
      if (width < 900) {
        return "100%";
      } else {
        return "auto";
      }
    },
  },
});

export default function BookDetail() {
  const { width } = useWindowDimensions();
  const { id } = useParams();
  const classes = useStyles(width);
  const { decryptId } = useCrypto();
  const decryptedId = decryptId(id);
  const [book, setBook] = useState([]);
  const { fetchCarts } = useCart();

  const handleClick = async () => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const body = JSON.stringify({
      bookId: decryptedId,
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

  useEffect(() => {
    fetchBooks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchBooks = async () => {
    await API.get("/book/" + decryptedId)
      .then((response) => {
        const book = response.data.data.book;
        setBook(book);
        console.log(book);
      })
      .catch((error) => console.log(error));
  };
  return (
    <Container>
      {/* BookDetail {decryptId(id)} */}
      <Stack
        direction={{ xs: "column", sm: "column", md: "row" }}
        spacing={{ xs: 1, sm: 2, md: 4 }}
        justifyContent="center"
        mb={5}
      >
        <Image
          alt="details"
          src={bookUS}
          width={270}
          className={width < 900 ? "m-auto" : ""}
          style={{ borderRadius: 5 }}
        />
        <Stack direction="column">
          <Typography fontSize={32} fontWeight={600} textTransform="capitalize">
            {book?.title}
          </Typography>
          <Typography
            textTransform="capitalize"
            fontWeight={500}
            color="gray"
            mb={3}
          >
            𝐵𝓎. {book?.author}
          </Typography>
          <Typography gutterBottom fontWeight={600}>
            Publication date
          </Typography>
          <Typography fontWeight={500} color="gray" mb={3} fontSize={14}>
            {book?.publicationDate}
          </Typography>
          <Typography gutterBottom fontWeight={600}>
            Pages
          </Typography>
          <Typography fontWeight={500} color="gray" mb={3} fontSize={14}>
            312
          </Typography>
          <Typography gutterBottom fontWeight={600} color="red">
            ISBN
          </Typography>
          <Typography fontWeight={500} color="gray" mb={3} fontSize={14}>
            {book?.isbn}
          </Typography>
          <Typography gutterBottom fontWeight={600}>
            Price
          </Typography>
          <Typography fontWeight={600} color="green">
            Rp.
            {book.price &&
              toRupiah(book?.price, { symbol: "", floatingPoint: 0 })}
          </Typography>
        </Stack>
      </Stack>
      <Typography
        fontSize={28}
        fontWeight={600}
        textTransform="capitalize"
        mb={2}
      >
        about this book
      </Typography>
      <Typography
        fontWeight={400}
        color="gray"
        mb={1}
        fontSize={14}
        textAlign="justify"
      >
        {book?.desc}
      </Typography>
      <Button
        onClick={handleClick}
        className={classes.btnAddChart}
        variant="dark"
      >
        Add Chart
        <Image src={cartWhite} className="mb-1 ms-3" />
      </Button>
    </Container>
  );
}
