import { Card, CardContent, Stack, Typography } from "@mui/material";
import React from "react";
import { Image } from "react-bootstrap";
import noImage from "../../assets/image/no image.png";
import toRupiah from "@develoka/angka-rupiah-js";
import { Link } from "react-router-dom";
import useCrypto from "../../hooks/crypto";

export default function BookCard({
  width,
  useStyles,
  onClick,
  selected,
  image,
  title,
  price,
  itemId,
  sold,
  author,
}) {
  const { encryptId } = useCrypto();
  const encryptedId = encryptId(itemId);
  return (
    <Card elevation={0}>
      <CardContent>
        <Stack
          direction="column"
          alignItems="start"
          textAlign="start"
          spacing={{ xs: 1, sm: 1, md: 1 }}
        >
          <Image width={185} src={image || noImage} />
          <div>
            <Link
              to={"/book-detail/" + encryptedId}
              style={{ textDecoration: "none", color: "black" }}
            >
              <Typography
                fontSize={20}
                fontWeight="bold"
                textTransform="capitalize"
              >
                {title}
              </Typography>
            </Link>
            <Typography gutterBottom color="textSecondary">
              𝐵𝓎. {author}
            </Typography>
            <Typography
              gutterBottom
              color="green"
              fontWeight="bold"
              fontSize={18}
            >
              Rp.{toRupiah(price, { symbol: "", floatingPoint: 0 })}
            </Typography>
          </div>
        </Stack>
      </CardContent>
    </Card>
  );
}
