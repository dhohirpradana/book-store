import { Card, CardContent, Stack, Typography } from "@mui/material";
import React from "react";
import { Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
// import bookUS from "../../assets/image/sincerely-media-CXYPfveiuis-unsplash.jpg";
import noImage from "../../assets/image/no image.png";
import useCrypto from "../../hooks/crypto";
import toRupiah from "@develoka/angka-rupiah-js";

export default function PromoCard({
  width,
  classes,
  onClick,
  selected,
  image,
  desc,
  title,
  itemId,
  author,
  price,
}) {
  const { encryptId } = useCrypto();
  const encryptedId = encryptId(itemId);

  return (
    <Card elevation={0} className={classes.root}>
      <CardContent>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          alignItems="center"
          spacing={{ xs: 1, sm: 2, md: 2 }}
        >
          <div>
            <Image width={185} src={image || noImage} />
          </div>
          <div className={classes.productRight}>
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
            <Typography gutterBottom className="text" textAlign="justify">
              {desc}
            </Typography>
            <Typography
              gutterBottom
              color="green"
              fontWeight="bold"
              fontSize={18}
            >
              Rp. {toRupiah(price, { symbol: "", floatingPoint: 0 })}
            </Typography>
            <Button
              variant="dark"
              onClick={onClick}
              className={classes.btnAddChart}
            >
              Add to Chart
            </Button>
          </div>
        </Stack>
      </CardContent>
    </Card>
  );
}
